// ============================================================
//  PRUEBAS DEL TIPO DE CAMBIO (lib/fxRate.js, lib/currency.js,
//  lib/chatTools.js)
//
//  No hacen llamadas reales a Banxico: inyectan un fetch simulado y un
//  reloj controlado, para probar de forma determinista la caché, los
//  fines de semana, los fallos de la API y los respaldos.
//
//  Uso: node scripts/test-fx.mjs   (o: npm test)
// ============================================================

import assert from "node:assert/strict";
import {
  BANXICO_FIX_URL,
  MAX_FIX_AGE_DAYS,
  cdmxNow,
  createFxRateProvider,
  describeQuoteForChat,
  fetchBanxicoFix,
  latestExpectedFixDate,
  nextPublicationAt,
  parseBanxicoOportuno,
} from "../lib/fxRate.js";
import { toMXN, parseRate } from "../lib/currency.js";
import { executeTool, lazyFx } from "../lib/chatTools.js";

let passed = 0;
let failed = 0;
async function test(name, fn) {
  try {
    await fn();
    console.log(`  ✓ ${name}`);
    passed++;
  } catch (err) {
    console.log(`  ✗ ${name}`);
    console.log(`      ${err.message}`);
    failed++;
  }
}

// Instante en hora de la Ciudad de México (UTC−6).
const cdmx = (ymd, hh = 9, mm = 0) => {
  const [y, m, d] = ymd.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d, hh + 6, mm));
};
// Respuesta con la forma real del endpoint "oportuno" de la API SIE.
const banxicoJson = (fecha, dato) => ({
  bmx: { series: [{ idSerie: "SF43718", titulo: "Tipo de cambio ... (FIX)", datos: [{ fecha, dato }] }] },
});
const silentLogger = { warn: () => {} };
const TOKEN = "token-secreto-de-prueba";

// Calendario de referencia (noviembre 2026):
//   lun 09 · mar 10 · mié 11 · jue 12 · vie 13 · sáb 14 · dom 15 · lun 16
function harness({ token = TOKEN, manual = undefined, start }) {
  let clock = start;
  const calls = [];
  let respond = () => { throw new Error("sin respuesta configurada"); };
  const provider = createFxRateProvider({
    getToken: () => token,
    getManualRate: () => manual,
    now: () => clock,
    logger: silentLogger,
    fetchFix: async ({ token: t }) => {
      calls.push({ at: clock, token: t });
      return respond();
    },
  });
  return {
    provider,
    calls,
    setClock: (d) => { clock = d; },
    respondWith: (fn) => { respond = fn; },
    fix: (fixDate, rate) => () => ({ rate, fixDate }),
    fail: (msg = "HTTP 503") => () => { throw new Error(msg); },
  };
}

console.log("\n=== Conversión USD → MXN ===\n");

await test("toMXN convierte USD con la tasa recibida y redondea a pesos", () => {
  assert.equal(toMXN(250000, "USD", 18.4321), 4608025);
  assert.equal(toMXN(1, "usd", 18.5), 19);
});
await test("toMXN en MXN no depende de la tasa", () => {
  assert.equal(toMXN(4500000, "MXN"), 4500000);
  assert.equal(toMXN(4500000, "MXN", null), 4500000);
});
await test("toMXN sin tasa, con tasa absurda o moneda desconocida → null (nunca inventa)", () => {
  assert.equal(toMXN(250000, "USD"), null);
  assert.equal(toMXN(250000, "USD", 0), null);
  assert.equal(toMXN(250000, "USD", 185), null);
  assert.equal(toMXN(250000, "EUR", 18.5), null);
});
await test("parseRate acepta \"18.5\" y rechaza vacíos, texto y valores fuera de 10–40", () => {
  assert.equal(parseRate("18.5"), 18.5);
  assert.equal(parseRate(" 18.4512 "), 18.4512);
  for (const bad of [undefined, null, "", "abc", "N/E", "1.85", "185", "-18"]) assert.equal(parseRate(bad), null, String(bad));
});

console.log("\n=== Calendario de publicación (hora CDMX) ===\n");

await test("cdmxNow usa la hora de la Ciudad de México, no UTC", () => {
  // 03:00 UTC del viernes 13 = 21:00 del jueves 12 en CDMX
  assert.deepEqual(cdmxNow(new Date(Date.UTC(2026, 10, 13, 3, 0))), { ymd: "2026-11-12", minutes: 21 * 60 });
});
await test("FIX esperado: antes de las 12:15 el del día hábil anterior; después, el del día", () => {
  assert.equal(latestExpectedFixDate(cdmx("2026-11-12", 9)), "2026-11-11");
  assert.equal(latestExpectedFixDate(cdmx("2026-11-12", 12, 14)), "2026-11-11");
  assert.equal(latestExpectedFixDate(cdmx("2026-11-12", 12, 15)), "2026-11-12");
});
await test("fin de semana y lunes temprano: el FIX esperado es el del viernes", () => {
  assert.equal(latestExpectedFixDate(cdmx("2026-11-14", 15)), "2026-11-13"); // sábado
  assert.equal(latestExpectedFixDate(cdmx("2026-11-15", 23)), "2026-11-13"); // domingo
  assert.equal(latestExpectedFixDate(cdmx("2026-11-16", 8)), "2026-11-13"); // lunes 08:00
});
await test("siguiente publicación: viernes tarde y sábado → lunes 12:15 CDMX", () => {
  assert.equal(nextPublicationAt(cdmx("2026-11-13", 13)).toISOString(), cdmx("2026-11-16", 12, 15).toISOString());
  assert.equal(nextPublicationAt(cdmx("2026-11-14", 10)).toISOString(), cdmx("2026-11-16", 12, 15).toISOString());
  assert.equal(nextPublicationAt(cdmx("2026-11-12", 9)).toISOString(), cdmx("2026-11-12", 12, 15).toISOString());
});

console.log("\n=== Respuesta de la API SIE de Banxico ===\n");

await test("interpreta la serie SF43718 (fecha dd/mm/aaaa → aaaa-mm-dd)", () => {
  assert.deepEqual(parseBanxicoOportuno(banxicoJson("12/11/2026", "18.4512")), { rate: 18.4512, fixDate: "2026-11-12" });
});
await test("rechaza dato \"N/E\", fecha inválida y respuestas sin datos", () => {
  assert.throws(() => parseBanxicoOportuno(banxicoJson("12/11/2026", "N/E")));
  assert.throws(() => parseBanxicoOportuno(banxicoJson("2026-11-12", "18.45")));
  assert.throws(() => parseBanxicoOportuno(banxicoJson("31/02/2026", "18.45")));
  assert.throws(() => parseBanxicoOportuno({ bmx: { series: [] } }));
  assert.throws(() => parseBanxicoOportuno({ error: "Token inválido" }));
});
await test("fetchBanxicoFix: endpoint oportuno de SF43718, token SOLO en el header Bmx-Token", async () => {
  let seen;
  const fetchImpl = async (url, init) => {
    seen = { url, init };
    return { ok: true, status: 200, json: async () => banxicoJson("12/11/2026", "18.4512") };
  };
  const q = await fetchBanxicoFix({ token: TOKEN, fetchImpl });
  assert.deepEqual(q, { rate: 18.4512, fixDate: "2026-11-12" });
  assert.equal(seen.url, BANXICO_FIX_URL);
  assert.ok(BANXICO_FIX_URL.endsWith("/series/SF43718/datos/oportuno"));
  assert.ok(!seen.url.includes(TOKEN), "el token no debe ir en la URL");
  assert.equal(seen.init.headers["Bmx-Token"], TOKEN);
});
await test("fetchBanxicoFix: HTTP de error lanza un mensaje que NO contiene el token", async () => {
  const fetchImpl = async () => ({ ok: false, status: 401, json: async () => ({}) });
  await assert.rejects(fetchBanxicoFix({ token: TOKEN, fetchImpl }), (err) => {
    assert.ok(!err.message.includes(TOKEN));
    assert.match(err.message, /401/);
    return true;
  });
});

console.log("\n=== Caché ===\n");

await test("dentro del mismo periodo de publicación no vuelve a consultar a Banxico", async () => {
  const h = harness({ start: cdmx("2026-11-12", 9) });
  h.respondWith(h.fix("2026-11-11", 18.4));
  for (const hh of [9, 10, 11]) {
    h.setClock(cdmx("2026-11-12", hh, 30));
    const q = await h.provider.getUsdMxnRate();
    assert.equal(q.rate, 18.4);
  }
  assert.equal(h.calls.length, 1, "solo una consulta antes del mediodía");
});
await test("a partir de las 12:15 consulta una vez y toma el FIX nuevo", async () => {
  const h = harness({ start: cdmx("2026-11-12", 9) });
  h.respondWith(h.fix("2026-11-11", 18.4));
  await h.provider.getUsdMxnRate();
  h.setClock(cdmx("2026-11-12", 12, 16));
  h.respondWith(h.fix("2026-11-12", 18.55));
  const q = await h.provider.getUsdMxnRate();
  assert.equal(q.rate, 18.55);
  assert.equal(q.fixDate, "2026-11-12");
  h.setClock(cdmx("2026-11-12", 17));
  await h.provider.getUsdMxnRate();
  assert.equal(h.calls.length, 2);
});
await test("búsquedas simultáneas comparten una sola consulta", async () => {
  const h = harness({ start: cdmx("2026-11-12", 9) });
  h.respondWith(async () => {
    await new Promise((r) => setTimeout(r, 20));
    return { rate: 18.4, fixDate: "2026-11-11" };
  });
  const qs = await Promise.all(Array.from({ length: 5 }, () => h.provider.getUsdMxnRate()));
  assert.ok(qs.every((q) => q.rate === 18.4));
  assert.equal(h.calls.length, 1);
});
await test("FIX aún no publicado a las 12:20 → usa el anterior y reintenta en 30 min (no antes)", async () => {
  const h = harness({ start: cdmx("2026-11-12", 12, 20) });
  h.respondWith(h.fix("2026-11-11", 18.4));
  const q = await h.provider.getUsdMxnRate();
  assert.equal(q.source, "banxico_fix");
  assert.equal(q.fixDate, "2026-11-11");
  h.setClock(cdmx("2026-11-12", 12, 40));
  await h.provider.getUsdMxnRate();
  assert.equal(h.calls.length, 1, "no debía reintentar a los 20 min");
  h.setClock(cdmx("2026-11-12", 12, 51));
  h.respondWith(h.fix("2026-11-12", 18.5));
  assert.equal((await h.provider.getUsdMxnRate()).fixDate, "2026-11-12");
  assert.equal(h.calls.length, 2);
});
await test("día inhábil entre semana: después de las 18:00 deja de reintentar hasta la siguiente publicación", async () => {
  const h = harness({ start: cdmx("2026-11-16", 19) }); // lunes festivo: Banxico sigue mostrando el viernes
  h.respondWith(h.fix("2026-11-13", 18.4));
  assert.equal((await h.provider.getUsdMxnRate()).fixDate, "2026-11-13");
  for (const [d, hh] of [["2026-11-16", 22], ["2026-11-17", 3], ["2026-11-17", 12]]) {
    h.setClock(cdmx(d, hh));
    await h.provider.getUsdMxnRate();
  }
  assert.equal(h.calls.length, 1);
  h.setClock(cdmx("2026-11-17", 12, 16));
  await h.provider.getUsdMxnRate();
  assert.equal(h.calls.length, 2);
});
await test("una respuesta con fecha anterior no reemplaza un FIX más reciente ya guardado", async () => {
  const h = harness({ start: cdmx("2026-11-12", 13) });
  h.respondWith(h.fix("2026-11-12", 18.5));
  await h.provider.getUsdMxnRate();
  h.setClock(cdmx("2026-11-13", 12, 20));
  h.respondWith(h.fix("2026-11-11", 17.9)); // caché vieja intermedia
  const q = await h.provider.getUsdMxnRate();
  assert.equal(q.rate, 18.5);
  assert.equal(q.fixDate, "2026-11-12");
});
await test("rechaza un FIX con fecha futura (no lo guarda)", async () => {
  const h = harness({ start: cdmx("2026-11-12", 13), manual: "18.5" });
  h.respondWith(h.fix("2026-11-20", 18.9));
  const q = await h.provider.getUsdMxnRate();
  assert.equal(q.source, "manual");
  assert.equal(h.provider._state.lastValid, null);
});

console.log("\n=== Fines de semana ===\n");

await test("sábado y domingo usan el FIX del viernes sin consultar de nuevo; el lunes 12:15 se actualiza", async () => {
  const h = harness({ start: cdmx("2026-11-13", 14) }); // viernes 14:00
  h.respondWith(h.fix("2026-11-13", 18.4));
  await h.provider.getUsdMxnRate();
  for (const [d, hh] of [["2026-11-14", 10], ["2026-11-15", 20], ["2026-11-16", 9]]) {
    h.setClock(cdmx(d, hh));
    const q = await h.provider.getUsdMxnRate();
    assert.equal(q.source, "banxico_fix");
    assert.equal(q.fixDate, "2026-11-13");
    assert.equal(q.stale, false);
  }
  assert.equal(h.calls.length, 1, "sin consultas en todo el fin de semana");
  h.setClock(cdmx("2026-11-16", 12, 20));
  h.respondWith(h.fix("2026-11-16", 18.6));
  assert.equal((await h.provider.getUsdMxnRate()).fixDate, "2026-11-16");
  assert.equal(h.calls.length, 2);
});
await test("domingo sin caché (instancia nueva): consulta y acepta el FIX del viernes", async () => {
  const h = harness({ start: cdmx("2026-11-15", 11) });
  h.respondWith(h.fix("2026-11-13", 18.4));
  const q = await h.provider.getUsdMxnRate();
  assert.equal(q.source, "banxico_fix");
  assert.equal(q.fixDate, "2026-11-13");
});

console.log("\n=== Fallos de la API ===\n");

await test("API caída con FIX guardado reciente → usa ese FIX (stale) y reintenta en 10 min", async () => {
  const h = harness({ start: cdmx("2026-11-12", 13), manual: "18.5" });
  h.respondWith(h.fix("2026-11-12", 18.45));
  await h.provider.getUsdMxnRate();
  h.setClock(cdmx("2026-11-13", 12, 20));
  h.respondWith(h.fail());
  const q = await h.provider.getUsdMxnRate();
  assert.equal(q.source, "banxico_fix");
  assert.equal(q.rate, 18.45);
  assert.equal(q.fixDate, "2026-11-12");
  assert.equal(q.stale, true);
  h.setClock(cdmx("2026-11-13", 12, 25));
  await h.provider.getUsdMxnRate();
  assert.equal(h.calls.length, 2, "no debía reintentar antes de 10 min");
  h.setClock(cdmx("2026-11-13", 12, 31));
  h.respondWith(h.fix("2026-11-13", 18.5));
  const q2 = await h.provider.getUsdMxnRate();
  assert.equal(q2.fixDate, "2026-11-13");
  assert.equal(q2.stale, false);
});
await test(`API caída y FIX guardado con más de ${MAX_FIX_AGE_DAYS} días → tasa manual, identificada como manual`, async () => {
  const h = harness({ start: cdmx("2026-11-12", 13), manual: "18.5" });
  h.respondWith(h.fix("2026-11-12", 18.45));
  await h.provider.getUsdMxnRate();
  h.setClock(cdmx("2026-11-18", 13)); // 6 días después
  h.respondWith(h.fail());
  const q = await h.provider.getUsdMxnRate();
  assert.equal(q.source, "manual");
  assert.equal(q.rate, 18.5);
  assert.equal(q.fixDate, null);
  assert.equal(q.reason, "fix_too_old");
  assert.deepEqual(q.lastFix, { rate: 18.45, fixDate: "2026-11-12" }, "conserva el último FIX válido y su fecha");
});
await test(`FIX de hace exactamente ${MAX_FIX_AGE_DAYS} días (puente largo) todavía se acepta`, async () => {
  const h = harness({ start: cdmx("2026-11-11", 13), manual: "18.5" });
  h.respondWith(h.fix("2026-11-11", 18.45));
  await h.provider.getUsdMxnRate();
  h.setClock(cdmx("2026-11-16", 13));
  h.respondWith(h.fail());
  assert.equal((await h.provider.getUsdMxnRate()).source, "banxico_fix");
});
await test("API caída sin ningún FIX previo → tasa manual (reason api_error)", async () => {
  const h = harness({ start: cdmx("2026-11-12", 13), manual: "18.5" });
  h.respondWith(h.fail("timeout"));
  const q = await h.provider.getUsdMxnRate();
  assert.equal(q.source, "manual");
  assert.equal(q.reason, "api_error");
});
await test("respuesta corrupta de la API cuenta como fallo", async () => {
  const h = harness({ start: cdmx("2026-11-12", 13), manual: "18.5" });
  h.respondWith(() => parseBanxicoOportuno(banxicoJson("12/11/2026", "N/E")));
  assert.equal((await h.provider.getUsdMxnRate()).source, "manual");
});

console.log("\n=== Sin cotización válida ===\n");

await test("API caída, sin FIX previo y sin tasa manual → sin tasa (no se filtra por presupuesto en USD)", async () => {
  const h = harness({ start: cdmx("2026-11-12", 13) });
  h.respondWith(h.fail());
  const q = await h.provider.getUsdMxnRate();
  assert.equal(q.rate, null);
  assert.equal(q.source, null);
  const { result } = await executeTool(
    { name: "search_inventory", input: { city: "Puerto Morelos", category: ["departamento"], budgetMax: 250000, budgetCurrency: "USD" } },
    { getFx: async () => q },
  );
  assert.equal(result.budgetCurrencyUnavailable, true);
  assert.ok(result.matches.every((m) => m.budgetStatus === null), "no debe afirmar que algo entra en el presupuesto");
});
await test("FIX viejo y sin tasa manual → sin tasa, pero conserva el último FIX conocido", async () => {
  const h = harness({ start: cdmx("2026-11-02", 13) });
  h.respondWith(h.fix("2026-11-02", 18.2));
  await h.provider.getUsdMxnRate();
  h.setClock(cdmx("2026-11-12", 13));
  h.respondWith(h.fail());
  const q = await h.provider.getUsdMxnRate();
  assert.equal(q.rate, null);
  assert.equal(q.reason, "fix_too_old");
  assert.equal(q.lastFix.fixDate, "2026-11-02");
});
await test("sin BANXICO_TOKEN → nunca llama a la API; usa la tasa manual si existe", async () => {
  const h = harness({ token: null, start: cdmx("2026-11-12", 13), manual: "18.5" });
  const q = await h.provider.getUsdMxnRate();
  assert.equal(h.calls.length, 0);
  assert.equal(q.source, "manual");
  assert.equal(q.reason, "no_token");
});
await test("tasa manual inválida (\"abc\", \"185\") se ignora → sin tasa", async () => {
  for (const manual of ["abc", "185", ""]) {
    const h = harness({ token: null, start: cdmx("2026-11-12", 13), manual });
    assert.equal((await h.provider.getUsdMxnRate()).rate, null, manual);
  }
});

console.log("\n=== Chatbot (lib/chatTools.js) ===\n");

const banxicoQuote = { rate: 18.4512, source: "banxico_fix", fixDate: "2026-11-12", stale: false, reason: null, lastFix: null };
const manualQuote = { rate: 18.5, source: "manual", fixDate: null, stale: false, reason: "api_error", lastFix: null };

await test("get_exchange_rate con FIX: valor, fecha dd/mm/aaaa y fuente Banxico", async () => {
  const { result } = await executeTool({ name: "get_exchange_rate", input: {} }, { getFx: async () => banxicoQuote });
  assert.equal(result.available, true);
  assert.equal(result.usdMxn, 18.4512);
  assert.equal(result.date, "12/11/2026");
  assert.equal(result.officialBanxicoFix, true);
  assert.match(result.source, /Banco de México \(Banxico\)/);
  assert.match(result.source, /FIX/);
});
await test("get_exchange_rate con tasa manual: nunca se presenta como FIX oficial", async () => {
  const { result } = await executeTool({ name: "get_exchange_rate", input: {} }, { getFx: async () => manualQuote });
  assert.equal(result.officialBanxicoFix, false);
  assert.equal(result.date, null);
  assert.match(result.source, /manual/i);
  assert.match(result.source, /NO es el FIX oficial/);
  assert.ok(result.note);
});
await test("get_exchange_rate sin tasa: available false y nota para que confirme el asesor", async () => {
  const result = describeQuoteForChat({ rate: null, source: null });
  assert.equal(result.available, false);
  assert.equal(result.usdMxn, null);
  assert.match(result.note, /asesor/);
});
await test("búsqueda con presupuesto en MXN NO consulta el tipo de cambio", async () => {
  let asked = 0;
  const { result } = await executeTool(
    { name: "search_inventory", input: { city: "Puerto Morelos", category: ["departamento"], budgetMax: 4500000, budgetCurrency: "MXN" } },
    { getFx: async () => { asked++; return banxicoQuote; } },
  );
  assert.equal(asked, 0);
  assert.ok(result.matches.some((m) => m.slug === "departamento-selva-escondida"));
});
await test("búsqueda en USD usa el FIX y reporta la tasa usada (sin exponer debug)", async () => {
  const { result, debug } = await executeTool(
    { name: "search_inventory", input: { city: "Puerto Morelos", category: ["departamento"], budgetMax: 250000, budgetCurrency: "USD" } },
    { getFx: async () => banxicoQuote },
  );
  assert.ok(result.matches.some((m) => m.slug === "departamento-selva-escondida"));
  assert.equal(result.exchangeRate.usdMxn, 18.4512);
  assert.equal(result.exchangeRate.officialBanxicoFix, true);
  assert.equal(result.debug, undefined, "debug nunca va a Claude");
  assert.equal(debug.budgetMaxNormalizedMXN, Math.round(250000 * 18.4512));
  assert.equal(debug.fxSource, "banxico_fix");
});
await test("lazyFx: varias herramientas en un turno → una sola consulta de tipo de cambio", async () => {
  let n = 0;
  const getFx = lazyFx(async () => { n++; return banxicoQuote; });
  await executeTool({ name: "get_exchange_rate", input: {} }, { getFx });
  await executeTool({ name: "search_inventory", input: { budgetMax: 300000, budgetCurrency: "USD" } }, { getFx });
  assert.equal(n, 1);
});
await test("el token nunca aparece en cotizaciones, respuestas al chatbot ni logs", async () => {
  const logs = [];
  const provider = createFxRateProvider({
    getToken: () => TOKEN,
    getManualRate: () => "18.5",
    now: () => cdmx("2026-11-12", 13),
    logger: { warn: (...a) => logs.push(a.join(" ")) },
    fetchFix: ({ token }) => fetchBanxicoFix({ token, fetchImpl: async () => ({ ok: false, status: 403, json: async () => ({}) }) }),
  });
  const q = await provider.getUsdMxnRate();
  const everything = JSON.stringify([q, describeQuoteForChat(q), logs, provider._state]);
  assert.ok(logs.length > 0, "debía registrar el fallo");
  assert.ok(!everything.includes(TOKEN));
});

console.log(`\n${passed} pasaron, ${failed} fallaron.\n`);
if (failed > 0) process.exit(1);
