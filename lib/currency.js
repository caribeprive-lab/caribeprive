// ============================================================
//  MONEDA — normalización de presupuestos para el matching
//
//  Todo el inventario (lib/properties.js, lib/developments.js) está
//  expresado en MXN. Cuando un prospecto da su presupuesto en USD,
//  este es el ÚNICO lugar donde se normaliza a MXN antes de comparar
//  contra price.amount en lib/matching.js.
//
//  El LLM NUNCA decide ni calcula esta conversión — solo reporta el
//  importe y la moneda tal cual los dijo el usuario (ver budgetCurrency
//  en app/api/chat/route.js). El servidor es quien convierte.
//
//  La tasa USD→MXN NO se lee aquí: llega como parámetro (`fx`) desde
//  lib/fxRate.js, que obtiene el FIX oficial de Banxico y, solo si no hay
//  una cotización válida y reciente, la tasa manual USD_TO_MXN_RATE.
//  Sin tasa, toMXN() devuelve null para USD — nunca se inventa una — y
//  lib/matching.js lo reporta explícitamente en vez de aplicar un filtro
//  de presupuesto que no puede verificar. Las búsquedas en MXN nunca
//  dependen de la tasa.
// ============================================================

// Rango de cordura para una tasa USD→MXN. Cualquier valor fuera de aquí
// (un error de captura en Vercel, una respuesta corrupta de la API) se
// descarta como si no existiera, en vez de filtrar con una tasa absurda.
export const MIN_SANE_USD_MXN = 10;
export const MAX_SANE_USD_MXN = 40;

/** @returns {number|null} la tasa como número si es válida y razonable, si no null. */
export function parseRate(raw) {
  if (raw == null || raw === "") return null;
  const n = Number(String(raw).replace(/,/g, "").trim());
  if (!Number.isFinite(n) || n < MIN_SANE_USD_MXN || n > MAX_SANE_USD_MXN) return null;
  return n;
}

/**
 * Normaliza un importe a MXN. Devuelve null cuando NO se puede normalizar
 * con certeza (moneda desconocida, o USD sin una tasa válida) — nunca
 * asume ni inventa una moneda o tasa.
 * @param {number|null|undefined} amount
 * @param {"MXN"|"USD"|string|null|undefined} currency
 * @param {number|null|undefined} usdMxnRate - pesos por dólar (de lib/fxRate.js)
 * @returns {number|null}
 */
export function toMXN(amount, currency, usdMxnRate = null) {
  if (amount == null) return null;
  const n = Number(amount);
  if (!Number.isFinite(n)) return null;
  const cur = (currency || "").toString().toUpperCase();
  if (cur === "MXN") return Math.round(n);
  if (cur === "USD") {
    const rate = parseRate(usdMxnRate);
    if (rate == null) return null;
    return Math.round(n * rate);
  }
  return null;
}
