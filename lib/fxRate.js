// ============================================================
//  TIPO DE CAMBIO USD→MXN — FIX oficial de Banco de México
//
//  Fuente: API SIE de Banxico, serie SF43718 ("Tipo de cambio para
//  solventar obligaciones denominadas en moneda extranjera — Fecha de
//  determinación (FIX)"), endpoint de dato oportuno (último disponible).
//
//  SOLO SERVIDOR: lo usan app/api/chat (vía lib/chatTools.js). El token
//  BANXICO_TOKEN se manda en el header Bmx-Token (nunca en la URL ni en
//  logs) y no lleva prefijo NEXT_PUBLIC_, así que no llega al navegador.
//
//  CACHÉ (por instancia de servidor, más el Data Cache de Next/Vercel):
//  Banxico publica el FIX después de las 12:00 (hora CDMX) en días
//  hábiles bancarios. Si ya tenemos el FIX más reciente esperado, no se
//  vuelve a consultar hasta la siguiente publicación (12:15 del siguiente
//  día hábil). Si a esa hora aún no aparece (retraso o día inhábil), se
//  reintenta cada 30 min solo entre 12:15 y 18:00; fuera de esa ventana se
//  espera a la siguiente publicación. Si la API falla, se reintenta en 10 min.
//
//  RESPALDO, en este orden:
//   1. Última cotización FIX válida, si su fecha tiene ≤ MAX_FIX_AGE_DAYS
//      días naturales (cubre fines de semana largos y días inhábiles).
//   2. USD_TO_MXN_RATE: tasa MANUAL configurada en Vercel. Se identifica
//      siempre como tasa manual de referencia, nunca como FIX oficial.
//   3. Ninguna: no se filtra por presupuesto en USD y el chatbot pide que
//      el asesor confirme el presupuesto (budgetCurrencyUnavailable).
//
//  Limitación conocida: no se modela el calendario de días inhábiles de
//  Banxico (solo fines de semana). En un día festivo simplemente no aparece
//  un FIX nuevo y se sigue usando el anterior mientras sea reciente.
// ============================================================

import { parseRate } from "./currency.js";

export const BANXICO_FIX_URL =
  "https://www.banxico.org.mx/SieAPIRest/service/v1/series/SF43718/datos/oportuno";

export const MAX_FIX_AGE_DAYS = 5;
const PUBLISH_MINUTES = 12 * 60 + 15; // 12:15 CDMX: margen tras la publicación de las 12:00
const PENDING_WINDOW_END_MINUTES = 18 * 60; // reintentos "aún no publica" solo hasta las 18:00
const RETRY_PENDING_MS = 30 * 60 * 1000;
const RETRY_ERROR_MS = 10 * 60 * 1000;
const RETRY_NO_TOKEN_MS = 60 * 60 * 1000;
const FETCH_TIMEOUT_MS = 4000;
const DATA_CACHE_SECONDS = 15 * 60;

// Ciudad de México no tiene horario de verano desde oct-2022: UTC−6 fijo.
const CDMX_UTC_OFFSET_HOURS = -6;
const TZ = "America/Mexico_City";

// ── Calendario (todo en hora de la Ciudad de México) ─────────────────

const partsFmt = new Intl.DateTimeFormat("en-US", {
  timeZone: TZ,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

/** @returns {{ ymd: string, minutes: number }} fecha "YYYY-MM-DD" y minuto del día en CDMX */
export function cdmxNow(date) {
  const p = Object.fromEntries(partsFmt.formatToParts(date).map((x) => [x.type, x.value]));
  return { ymd: `${p.year}-${p.month}-${p.day}`, minutes: Number(p.hour) * 60 + Number(p.minute) };
}

function ymdToUTC(ymd) {
  const [y, m, d] = ymd.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
}

function addDays(ymd, n) {
  return new Date(ymdToUTC(ymd) + n * 86400000).toISOString().slice(0, 10);
}

/** Días naturales de `fromYmd` a `toYmd`. */
export function daysBetween(fromYmd, toYmd) {
  return Math.round((ymdToUTC(toYmd) - ymdToUTC(fromYmd)) / 86400000);
}

export function isBusinessDay(ymd) {
  const wd = new Date(ymdToUTC(ymd)).getUTCDay();
  return wd !== 0 && wd !== 6;
}

function prevBusinessDay(ymd) {
  let d = addDays(ymd, -1);
  while (!isBusinessDay(d)) d = addDays(d, -1);
  return d;
}

function nextBusinessDay(ymd) {
  let d = addDays(ymd, 1);
  while (!isBusinessDay(d)) d = addDays(d, 1);
  return d;
}

/** Fecha del FIX más reciente que debería existir en el instante `date`. */
export function latestExpectedFixDate(date) {
  const { ymd, minutes } = cdmxNow(date);
  if (isBusinessDay(ymd) && minutes >= PUBLISH_MINUTES) return ymd;
  return prevBusinessDay(ymd);
}

/** Siguiente instante de publicación (12:15 CDMX de un día hábil) posterior a `date`. */
export function nextPublicationAt(date) {
  const { ymd, minutes } = cdmxNow(date);
  const day = isBusinessDay(ymd) && minutes < PUBLISH_MINUTES ? ymd : nextBusinessDay(ymd);
  const [y, m, d] = day.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d, 12 - CDMX_UTC_OFFSET_HOURS, 15));
}

// ── API de Banxico ──────────────────────────────────────────────────

/**
 * Interpreta la respuesta del endpoint "oportuno".
 * Forma esperada: { bmx: { series: [{ idSerie: "SF43718", datos: [{ fecha: "dd/mm/yyyy", dato: "18.4512" }] }] } }
 * @returns {{ rate: number, fixDate: string }} o lanza Error si no es válida.
 */
export function parseBanxicoOportuno(json) {
  const serie = json?.bmx?.series?.find?.((s) => s?.idSerie === "SF43718") ?? json?.bmx?.series?.[0];
  const dato = serie?.datos?.[serie.datos.length - 1];
  if (!dato) throw new Error("Respuesta de Banxico sin datos para SF43718");

  const rate = parseRate(dato.dato);
  if (rate == null) throw new Error(`Valor de FIX inválido: ${JSON.stringify(dato.dato)}`);

  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(String(dato.fecha || "").trim());
  if (!m) throw new Error(`Fecha de FIX inválida: ${JSON.stringify(dato.fecha)}`);
  const fixDate = `${m[3]}-${m[2]}-${m[1]}`;
  if (Number.isNaN(ymdToUTC(fixDate)) || addDays(fixDate, 0) !== fixDate) {
    throw new Error(`Fecha de FIX inválida: ${JSON.stringify(dato.fecha)}`);
  }
  return { rate, fixDate };
}

/** Consulta el último FIX publicado. Lanza Error (sin incluir el token) si falla. */
export async function fetchBanxicoFix({ token, fetchImpl = fetch, timeoutMs = FETCH_TIMEOUT_MS }) {
  const res = await fetchImpl(BANXICO_FIX_URL, {
    headers: { "Bmx-Token": token, Accept: "application/json" },
    signal: AbortSignal.timeout(timeoutMs),
    // Data Cache de Next/Vercel: comparte la respuesta entre instancias del
    // servidor y la conserva si una revalidación falla. Fuera de Next se ignora.
    next: { revalidate: DATA_CACHE_SECONDS },
  });
  if (!res.ok) throw new Error(`Banxico respondió HTTP ${res.status}`);
  return parseBanxicoOportuno(await res.json());
}

// ── Proveedor con caché y respaldo ──────────────────────────────────

/**
 * @typedef {Object} FxQuote
 * @property {number|null} rate       - pesos por dólar; null si no hay ninguna tasa utilizable
 * @property {"banxico_fix"|"manual"|null} source
 * @property {string|null} fixDate    - "YYYY-MM-DD" del FIX (solo source "banxico_fix")
 * @property {boolean} stale          - true si la última consulta a Banxico falló y se usa la cotización guardada
 * @property {string|null} reason     - por qué no se usa el FIX: "no_token" | "api_error" | "fix_too_old" | "no_fix_yet"
 * @property {{rate:number, fixDate:string}|null} lastFix - último FIX válido conocido (aunque ya no se use)
 */

export function createFxRateProvider({
  getToken = () => process.env.BANXICO_TOKEN,
  getManualRate = () => process.env.USD_TO_MXN_RATE,
  fetchFix = fetchBanxicoFix,
  now = () => new Date(),
  logger = console,
} = {}) {
  const state = {
    lastValid: null, // { rate, fixDate, fetchedAt }
    nextCheckAt: 0,
    lastError: null, // "no_token" | "api_error" | null
    inflight: null,
    fetchCount: 0,
  };

  function scheduleAfterSuccess(t, fixDate) {
    if (fixDate >= latestExpectedFixDate(t)) return nextPublicationAt(t).getTime();
    // Aún no aparece el FIX esperado (retraso o día inhábil).
    const { ymd, minutes } = cdmxNow(t);
    const inPendingWindow =
      isBusinessDay(ymd) && minutes >= PUBLISH_MINUTES && minutes < PENDING_WINDOW_END_MINUTES;
    return inPendingWindow ? t.getTime() + RETRY_PENDING_MS : nextPublicationAt(t).getTime();
  }

  async function refresh(t) {
    const token = getToken();
    if (!token) {
      state.lastError = "no_token";
      state.nextCheckAt = t.getTime() + RETRY_NO_TOKEN_MS;
      return;
    }
    state.fetchCount++;
    try {
      const q = await fetchFix({ token });
      if (q.fixDate > cdmxNow(t).ymd) throw new Error(`Fecha de FIX en el futuro: ${q.fixDate}`);
      if (!state.lastValid || q.fixDate >= state.lastValid.fixDate) {
        state.lastValid = { rate: q.rate, fixDate: q.fixDate, fetchedAt: t.toISOString() };
      }
      state.lastError = null;
      state.nextCheckAt = scheduleAfterSuccess(t, state.lastValid.fixDate);
    } catch (err) {
      state.lastError = "api_error";
      state.nextCheckAt = t.getTime() + RETRY_ERROR_MS;
      logger.warn?.("[fx] No se pudo obtener el FIX de Banxico:", err?.message || err);
    }
  }

  /** @returns {Promise<FxQuote>} */
  async function getUsdMxnRate() {
    const t = now();
    if (t.getTime() >= state.nextCheckAt) {
      // Varias búsquedas simultáneas comparten una sola consulta a Banxico.
      state.inflight ??= refresh(t).finally(() => {
        state.inflight = null;
      });
      await state.inflight;
    }

    const today = cdmxNow(t).ymd;
    const lv = state.lastValid;
    const lastFix = lv ? { rate: lv.rate, fixDate: lv.fixDate } : null;

    if (lv && daysBetween(lv.fixDate, today) <= MAX_FIX_AGE_DAYS) {
      return {
        rate: lv.rate,
        source: "banxico_fix",
        fixDate: lv.fixDate,
        stale: state.lastError === "api_error",
        reason: null,
        lastFix,
      };
    }

    const reason = lv ? "fix_too_old" : state.lastError || "no_fix_yet";
    const manual = parseRate(getManualRate());
    if (manual != null) {
      return { rate: manual, source: "manual", fixDate: null, stale: false, reason, lastFix };
    }
    return { rate: null, source: null, fixDate: null, stale: false, reason, lastFix };
  }

  return { getUsdMxnRate, _state: state };
}

// Instancia compartida del servidor (la caché vive mientras la instancia esté activa).
const defaultProvider = createFxRateProvider();
export const getUsdMxnRate = defaultProvider.getUsdMxnRate;

/** "2026-11-12" → "12/11/2026" (formato de Banxico, día/mes/año). */
export function formatFixDate(ymd) {
  if (!ymd) return null;
  const [y, m, d] = ymd.split("-");
  return `${d}/${m}/${y}`;
}

/**
 * Lo que el chatbot puede decirle al cliente sobre el tipo de cambio.
 * Nunca presenta la tasa manual como FIX oficial.
 */
export function describeQuoteForChat(quote) {
  if (quote?.source === "banxico_fix") {
    return {
      available: true,
      usdMxn: quote.rate,
      date: formatFixDate(quote.fixDate),
      source: "Banco de México (Banxico) — tipo de cambio FIX oficial (serie SF43718)",
      officialBanxicoFix: true,
    };
  }
  if (quote?.source === "manual") {
    return {
      available: true,
      usdMxn: quote.rate,
      date: null,
      source: "Tasa manual de referencia de Caribe Privé (NO es el FIX oficial de Banxico)",
      officialBanxicoFix: false,
      note: "El FIX de Banxico no está disponible en este momento; un asesor confirma el tipo de cambio exacto.",
    };
  }
  return {
    available: false,
    usdMxn: null,
    date: null,
    source: null,
    officialBanxicoFix: false,
    note: "No hay un tipo de cambio confiable disponible en este momento; un asesor lo confirma.",
  };
}
