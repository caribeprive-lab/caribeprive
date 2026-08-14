// ============================================================
//  PRUEBAS DEL MOTOR DE MATCHING (lib/matching.js + lib/currency.js)
//
//  Corren contra los datos REALES de lib/properties.js / lib/developments.js
//  (no fixtures) — si el inventario cambia, estas pruebas pueden necesitar
//  ajustarse. Sin dependencias nuevas: usa node:assert.
//
//  Este proceso corre SIN USD_TO_MXN_RATE configurada (el estado por
//  default, sin importar el shell del usuario — ver el `delete` abajo),
//  para probar que las búsquedas en MXN y las validaciones de moneda
//  funcionan igual sin esa variable. El caso "CON tasa configurada"
//  (prueba B) corre en un proceso hijo aparte con USD_TO_MXN_RATE=18 —
//  ver scripts/_test-with-rate.mjs para el porqué.
//
//  Uso: node scripts/test-matching.mjs   (o: npm test)
// ============================================================

import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passed++;
  } catch (err) {
    console.log(`  ✗ ${name}`);
    console.log(`      ${err.message}`);
    failed++;
  }
}

// Nos aseguramos de que ESTE proceso no la tenga, sin importar el entorno
// del usuario, para que el grupo "sin tasa" sea determinista.
delete process.env.USD_TO_MXN_RATE;

const { searchInventory } = await import("../lib/matching.js");
const { properties } = await import("../lib/properties.js");
const { developments } = await import("../lib/developments.js");
const { USD_TO_MXN_RATE } = await import("../lib/currency.js");

console.log("\n=== Grupo 1: USD_TO_MXN_RATE NO configurada (estado por default) ===\n");

assert.equal(USD_TO_MXN_RATE, null, "precondición: USD_TO_MXN_RATE debía ser null en este proceso");

// A) Puerto Morelos + departamento + 4.5 MDP (MXN)
test("A) budgetMax:4500000 + budgetCurrency:MXN, Puerto Morelos + departamento → Selva Escondida, NO Puerto 369", () => {
  const { matches } = searchInventory({
    city: "Puerto Morelos",
    category: ["departamento"],
    budgetMax: 4500000,
    budgetCurrency: "MXN",
  });
  const slugs = matches.map((m) => m.slug);
  assert.ok(slugs.includes("departamento-selva-escondida"), `esperaba incluir departamento-selva-escondida, obtuve: [${slugs.join(", ")}]`);
  assert.ok(!slugs.includes("puerto-369"), `NO debía incluir puerto-369 (vende lotes, no departamentos), obtuve: [${slugs.join(", ")}]`);
});

// C) budgetMax presente, budgetCurrency ausente → NO asumir MXN → needsClarification
test("C) budgetMax presente, budgetCurrency ausente → NO asume MXN, pide aclaración (needsClarification)", () => {
  const result = searchInventory({ city: "Puerto Morelos", category: ["departamento"], budgetMax: 4500000 });
  assert.equal(result.needsClarification, true, "debía pedir aclaración de moneda en vez de asumir MXN");
  assert.equal(result.clarificationField, "budgetCurrency");
  assert.ok(typeof result.message === "string" && result.message.length > 0, "debía traer un mensaje explicando qué preguntar");
  assert.ok(!result.matches, "no debía devolver matches sin haber confirmado la moneda");
});

// D) sin budgetMax/budgetMin, budgetCurrency ausente → búsqueda normal sin filtro presupuestal
test("D) sin presupuesto (budgetMax/budgetMin y budgetCurrency ausentes) → búsqueda normal, sin pedir aclaración", () => {
  const result = searchInventory({ city: "Puerto Morelos", category: ["departamento"] });
  assert.ok(!result.needsClarification, "no debía pedir aclaración de moneda cuando no hay presupuesto en absoluto");
  const slugs = result.matches.map((m) => m.slug);
  assert.ok(slugs.includes("departamento-selva-escondida"), `esperaba incluir departamento-selva-escondida, obtuve: [${slugs.join(", ")}]`);
});

// E) price.amount:null → budgetStatus "unknown" → después de matches verificables → nunca "dentro del presupuesto"
test('E) price.amount:null → budgetStatus "unknown", listado DESPUÉS de matches con precio verificado, nunca "within"', () => {
  const p369 = developments.find((d) => d.slug === "puerto-369");
  assert.equal(p369.price.amount, null, "fixture inesperado: puerto-369 debía tener price.amount null en los datos reales");

  // Presupuesto absurdamente bajo: aun así, precio "a solicitud" no se
  // excluye ni se marca como si cumpliera el presupuesto.
  const low = searchInventory({ city: "Puerto Morelos", category: ["lote"], budgetMax: 1, budgetCurrency: "MXN" });
  const foundLow = low.matches.find((m) => m.slug === "puerto-369");
  assert.ok(foundLow, "puerto-369 debía seguir apareciendo como alternativa de precio por confirmar, no excluirse silenciosamente");
  assert.equal(foundLow.budgetStatus, "unknown", "puerto-369 debía quedar marcado 'unknown', nunca 'within'");

  // Con presupuesto suficiente para ambos, el de precio conocido va primero.
  const withBudget = searchInventory({ city: "Puerto Morelos", category: ["lote"], budgetMax: 4500000, budgetCurrency: "MXN" });
  const slugs = withBudget.matches.map((m) => m.slug);
  const mukta = withBudget.matches.find((m) => m.slug === "mukta-residencial");
  const p369Match = withBudget.matches.find((m) => m.slug === "puerto-369");
  assert.equal(mukta?.budgetStatus, "within", "mukta-residencial (1.4M ≤ 4.5M) debía tener budgetStatus 'within'");
  assert.equal(p369Match?.budgetStatus, "unknown");
  assert.ok(
    slugs.indexOf("mukta-residencial") < slugs.indexOf("puerto-369"),
    "el match con precio confirmado debe listarse antes que el de precio desconocido"
  );
});

// F) Puerto 369 + departamento → excluido
test("F) Puerto 369 + category:['departamento'] → excluido", () => {
  const { matches } = searchInventory({ city: "Puerto Morelos", category: ["departamento"] });
  assert.ok(!matches.some((m) => m.slug === "puerto-369"), "puerto-369 NO debe aparecer en una búsqueda de category:['departamento']");
});

// G) Puerto 369 + lote → permitido
test("G) Puerto 369 + category:['lote'] → permitido", () => {
  const { matches } = searchInventory({ city: "Puerto Morelos", category: ["lote"] });
  assert.ok(matches.some((m) => m.slug === "puerto-369"), "puerto-369 SÍ debe aparecer en una búsqueda de category:['lote']");
});

// Adicional (no es letra pedida explícitamente, pero exigida por el punto 2:
// "comportamiento exacto si USD_TO_MXN_RATE no existe" cuando el usuario SÍ dio USD)
test("(extra) USD con budgetCurrency dado pero SIN USD_TO_MXN_RATE → budgetCurrencyUnavailable, sigue buscando sin aplicar el filtro de presupuesto", () => {
  const result = searchInventory({ city: "Puerto Morelos", category: ["departamento"], budgetMax: 250000, budgetCurrency: "USD" });
  assert.ok(!result.needsClarification, "la moneda SÍ se especificó (USD) — no debía pedir aclaración de moneda");
  assert.equal(result.budgetCurrencyUnavailable, true, "debía señalar que no pudo normalizar USD por falta de tasa configurada");
  const slugs = result.matches.map((m) => m.slug);
  assert.ok(
    slugs.includes("departamento-selva-escondida"),
    "debía seguir buscando (sin aplicar el filtro de presupuesto que no puede verificar), no bloquearse por completo"
  );
  const item = result.matches.find((m) => m.slug === "departamento-selva-escondida");
  assert.equal(item.budgetStatus, null, "sin poder normalizar el presupuesto, no se debe afirmar ningún budgetStatus");
});

// Ciudad fuera de inventario: NUNCA se relaja "city" en findRelaxSuggestion,
// sin importar si Mérida, CDMX, Miami, etc. son o no zonas cubiertas — no
// hay ninguna lista de zonas permitidas, la regla es genérica.
test("city fuera de inventario (Mérida) → 0 matches y relaxSuggestion NUNCA sugiere cambiar de ciudad", () => {
  const result = searchInventory({
    city: "Mérida",
    category: ["departamento"],
    budgetMax: 4500000,
    budgetCurrency: "MXN",
  });
  assert.equal(result.matches.length, 0, "no debía haber matches en Mérida (no hay inventario ahí)");
  assert.ok(
    !result.relaxSuggestion || result.relaxSuggestion.field !== "city",
    `relaxSuggestion nunca debe sugerir cambiar de ciudad, obtuve: ${JSON.stringify(result.relaxSuggestion)}`
  );
  // En este caso ninguna otra relajación (presupuesto, categoría) encuentra
  // nada tampoco dentro de Mérida — por eso el resultado correcto es null,
  // no una sugerencia de otra ciudad.
  assert.equal(result.relaxSuggestion, null, `esperaba relaxSuggestion null, obtuve: ${JSON.stringify(result.relaxSuggestion)}`);
});

test("cualquier ciudad sin match (CDMX, Miami) → relaxSuggestion nunca es field:'city'", () => {
  for (const city of ["CDMX", "Miami", "Madrid", "Guadalajara"]) {
    const result = searchInventory({ city, category: ["casa"] });
    assert.ok(
      !result.relaxSuggestion || result.relaxSuggestion.field !== "city",
      `[${city}] relaxSuggestion nunca debe sugerir cambiar de ciudad, obtuve: ${JSON.stringify(result.relaxSuggestion)}`
    );
  }
});

// searchInventory no debe mutar el objeto criteria que recibe — la ciudad
// que llega del prospecto se conserva exactamente igual después de la
// búsqueda. (La preservación end-to-end hacia GHL/el frontend depende de
// que app/api/chat/route.js reenvíe `criteria` tal cual — ver route.js:166,
// sin cambios en esta ronda — esto prueba que matching.js no le da motivo
// para hacer lo contrario.)
test("searchInventory conserva intacto el criteria.city original (no lo muta)", () => {
  const criteria = { city: "Mérida", category: ["departamento"], budgetMax: 4500000, budgetCurrency: "MXN" };
  searchInventory(criteria);
  assert.equal(criteria.city, "Mérida", "el objeto criteria original no debía modificarse");
});

console.log("\n--- D-F de la ronda anterior (interpretación de lenguaje natural: \"4.5 millones de pesos\", \"250,000 dólares\", \"$4.5M\" ambiguo) ---");
console.log("    No aplican a lib/matching.js — Claude nunca manda texto libre a search_inventory, solo {budgetMax, budgetCurrency}");
console.log("    ya estructurados. Se validan con pruebas de conversación real (fuera del alcance de este script).");

console.log("\n=== Grupo 2: USD_TO_MXN_RATE = 18 (proceso hijo con su propio entorno) ===\n");
try {
  const out = execFileSync(process.execPath, [path.join(__dirname, "_test-with-rate.mjs")], {
    env: { ...process.env, USD_TO_MXN_RATE: "18" },
    encoding: "utf8",
  });
  process.stdout.write(out);
  passed++;
} catch (err) {
  failed++;
  console.log("  ✗ Grupo 2 (proceso hijo con USD_TO_MXN_RATE=18) falló:");
  process.stdout.write(err.stdout || "");
  if (err.stderr) console.log(err.stderr);
}

console.log("\n--- Integridad del inventario ---\n");

test("category.length > 1 solo permitido para desarrollos explícitamente confirmados por el negocio", () => {
  // Lista blanca de slugs confirmados como legítimamente multi-categoría
  // (venden MÁS DE UN tipo de producto real, no solo palabras similares en
  // la descripción). Vacía hoy: Puerto 369 se corrigió a ["lote"] tras
  // confirmarse que no vende departamentos. Si agregas un desarrollo mixto
  // real, primero confírmalo con el negocio y añádelo aquí a propósito.
  const ALLOWED_MULTI_CATEGORY_SLUGS = [];

  const all = [...properties, ...developments];
  const offenders = all.filter(
    (item) => (item.category || []).length > 1 && !ALLOWED_MULTI_CATEGORY_SLUGS.includes(item.slug)
  );

  assert.equal(
    offenders.length,
    0,
    `Listings con múltiples categorías sin allowlist explícita: ${offenders
      .map((o) => `${o.slug} (${JSON.stringify(o.category)})`)
      .join(", ")}`
  );
});

console.log(`\n${passed} pasaron, ${failed} fallaron.\n`);
if (failed > 0) process.exit(1);
