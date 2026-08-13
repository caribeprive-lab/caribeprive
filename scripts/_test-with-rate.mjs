// ============================================================
//  Sub-proceso de pruebas que SÍ requiere USD_TO_MXN_RATE configurada.
//
//  lib/currency.js lee process.env.USD_TO_MXN_RATE una sola vez, al
//  cargarse el módulo — y Node solo evalúa un módulo ES una vez por
//  proceso. Por eso el escenario "con tasa" y el escenario "sin tasa"
//  (scripts/test-matching.mjs) corren en procesos de node separados,
//  cada uno con su propio env — es la única forma determinista de
//  probar ambos estados sin un test runner que soporte mockear módulos.
//
//  No se ejecuta directo — lo invoca scripts/test-matching.mjs vía
//  child_process con USD_TO_MXN_RATE=18 en el entorno.
// ============================================================

import assert from "node:assert/strict";
import { searchInventory } from "../lib/matching.js";
import { USD_TO_MXN_RATE } from "../lib/currency.js";

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

assert.equal(USD_TO_MXN_RATE, 18, "precondición: se esperaba USD_TO_MXN_RATE=18 en este proceso hijo");

test("B) Puerto Morelos + departamento + 250,000 USD con USD_TO_MXN_RATE=18 → normaliza y encuentra Selva Escondida", () => {
  const result = searchInventory({
    city: "Puerto Morelos",
    category: ["departamento"],
    budgetMax: 250000,
    budgetCurrency: "USD",
  });
  assert.ok(!result.needsClarification, "la moneda SÍ estaba dada — no debía pedir aclaración");
  assert.ok(!result.budgetCurrencyUnavailable, "con la tasa configurada, USD sí debía poder normalizarse");
  assert.equal(result.debug.budgetMaxNormalizedMXN, 250000 * 18, "debía normalizar 250,000 USD a MXN con la tasa configurada");
  const slugs = result.matches.map((m) => m.slug);
  assert.ok(
    slugs.includes("departamento-selva-escondida"),
    `tras normalizar (250k USD = ${(250000 * 18).toLocaleString()} MXN), debía incluir departamento-selva-escondida, obtuve: [${slugs.join(", ")}]`
  );
});

console.log(`  (${passed} pasaron, ${failed} fallaron en este proceso hijo)`);
if (failed > 0) process.exitCode = 1;
