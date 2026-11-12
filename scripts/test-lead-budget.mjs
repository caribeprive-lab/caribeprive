// ============================================================
//  PRUEBAS DEL PRESUPUESTO DEL LEAD PARA GHL (lib/leadBudget.js)
//
//  presupuesto_del_lead siempre en MXN; importe y moneda originales en
//  el resumen. Sin red: las cotizaciones son objetos simulados.
//
//  Uso: node scripts/test-lead-budget.mjs   (o: npm test)
// ============================================================

import assert from "node:assert/strict";
import { computeLeadBudget, leadBudgetNeedsFx } from "../lib/leadBudget.js";
import { searchInventory } from "../lib/matching.js";

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

const FIX = { rate: 18.6188, source: "banxico_fix", fixDate: "2026-11-12", stale: false };
const MANUAL = { rate: 18.5, source: "manual", fixDate: null, stale: false, reason: "api_error" };
const NONE = { rate: null, source: null, fixDate: null, stale: false, reason: "api_error" };

console.log("\n=== Presupuestos en MXN (sin cambios) ===\n");

test("MXN: el campo guarda el importe tal cual y el resumen igual que antes", () => {
  const r = computeLeadBudget({ budgetMax: 4500000, budgetCurrency: "MXN" });
  assert.equal(r.presupuestoMXN, 4500000);
  assert.deepEqual(r.summaryLines, ["Presupuesto: $4,500,000 MXN"]);
});
test("MXN con rango: el campo usa el máximo; el resumen muestra el rango", () => {
  const r = computeLeadBudget({ budgetMin: 3000000, budgetMax: 5000000, budgetCurrency: "MXN" });
  assert.equal(r.presupuestoMXN, 5000000);
  assert.deepEqual(r.summaryLines, ["Presupuesto: $3,000,000 – $5,000,000 MXN"]);
});
test("MXN con solo mínimo: el campo usa el mínimo", () => {
  assert.equal(computeLeadBudget({ budgetMin: 2000000, budgetCurrency: "MXN" }).presupuestoMXN, 2000000);
});
test("MXN nunca consulta ni usa el tipo de cambio", () => {
  assert.equal(leadBudgetNeedsFx({ budgetMax: 4500000, budgetCurrency: "MXN" }), false);
  const r = computeLeadBudget({ budgetMax: 4500000, budgetCurrency: "MXN" }, { rate: 30, source: "manual" });
  assert.equal(r.presupuestoMXN, 4500000);
});
test("MXN con importe decimal o en texto (Claude a veces lo manda así) → entero válido para el campo Monetary", () => {
  assert.equal(computeLeadBudget({ budgetMax: "4500000.6", budgetCurrency: "MXN" }).presupuestoMXN, 4500001);
});
test("importe inválido (0, negativo, texto) → no se manda el campo", () => {
  for (const v of [0, -5, "abc"]) {
    assert.equal(computeLeadBudget({ budgetMax: v, budgetCurrency: "MXN" }).presupuestoMXN, null, String(v));
  }
});

console.log("\n=== Presupuestos en USD ===\n");

test("USD con FIX: el campo guarda el equivalente en MXN (250,000 × 18.6188 = 4,654,700)", () => {
  const r = computeLeadBudget({ budgetMax: 250000, budgetCurrency: "USD" }, FIX);
  assert.equal(r.presupuestoMXN, 4654700);
});
test("USD con FIX: el resumen conserva importe y moneda originales + equivalente y tasa con fecha", () => {
  const r = computeLeadBudget({ budgetMax: 250000, budgetCurrency: "USD" }, FIX);
  assert.deepEqual(r.summaryLines, [
    "Presupuesto: USD $250,000 (importe original del cliente)",
    "Equivalente: $4,654,700 MXN (FIX Banxico 18.6188 del 12/11/2026)",
  ]);
});
test("USD con rango: convierte ambos extremos; el campo usa el máximo", () => {
  const r = computeLeadBudget({ budgetMin: 200000, budgetMax: 300000, budgetCurrency: "USD" }, FIX);
  assert.equal(r.presupuestoMXN, Math.round(300000 * 18.6188));
  assert.equal(r.summaryLines[0], "Presupuesto: USD $200,000 – $300,000 (importe original del cliente)");
  assert.equal(r.summaryLines[1], "Equivalente: $3,723,760 – $5,585,640 MXN (FIX Banxico 18.6188 del 12/11/2026)");
});
test("USD con la misma cotización que la búsqueda → mismo tope en MXN que usó el chatbot", () => {
  const criteria = { city: "Cancún", category: ["departamento"], budgetMax: 250000, budgetCurrency: "USD" };
  const { debug } = searchInventory(criteria, { fx: FIX });
  assert.equal(computeLeadBudget(criteria, FIX).presupuestoMXN, debug.budgetMaxNormalizedMXN);
});
test("USD con tasa manual de respaldo: convierte y lo identifica como NO oficial", () => {
  const r = computeLeadBudget({ budgetMax: 250000, budgetCurrency: "USD" }, MANUAL);
  assert.equal(r.presupuestoMXN, 4625000);
  assert.equal(r.summaryLines[1], "Equivalente: $4,625,000 MXN (tasa manual de referencia 18.5, no es el FIX oficial)");
  assert.ok(!/Banxico/.test(r.summaryLines[1]));
});
test("USD sin tipo de cambio: se omite el campo (nunca se guardan dólares como pesos) y el resumen lo indica", () => {
  for (const fx of [NONE, null, { rate: 1.85, source: "manual" }]) {
    const r = computeLeadBudget({ budgetMax: 250000, budgetCurrency: "USD" }, fx);
    assert.equal(r.presupuestoMXN, null);
    assert.equal(r.summaryLines[0], "Presupuesto: USD $250,000 (importe original del cliente)");
    assert.match(r.summaryLines[1], /no disponible/);
  }
});
test("leadBudgetNeedsFx: solo con presupuesto en USD (acepta \"usd\" en minúsculas)", () => {
  assert.equal(leadBudgetNeedsFx({ budgetMax: 250000, budgetCurrency: "USD" }), true);
  assert.equal(leadBudgetNeedsFx({ budgetMax: 250000, budgetCurrency: "usd" }), true);
  assert.equal(leadBudgetNeedsFx({ budgetCurrency: "USD" }), false);
  assert.equal(leadBudgetNeedsFx(null), false);
});

console.log("\n=== Sin presupuesto o moneda no confirmada ===\n");

test("sin presupuesto: no hay campo ni línea de presupuesto", () => {
  assert.deepEqual(computeLeadBudget({ city: "Cancún" }), { presupuestoMXN: null, summaryLines: [] });
  assert.deepEqual(computeLeadBudget(null), { presupuestoMXN: null, summaryLines: [] });
});
test("moneda no confirmada: se omite el campo (no se asume MXN) y el resumen lo aclara", () => {
  const r = computeLeadBudget({ budgetMax: 4500000 });
  assert.equal(r.presupuestoMXN, null);
  assert.deepEqual(r.summaryLines, ["Presupuesto: $4,500,000 (moneda no confirmada por el cliente)"]);
});

console.log(`\n${passed} pasaron, ${failed} fallaron.\n`);
if (failed > 0) process.exit(1);
