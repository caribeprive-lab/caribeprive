// ============================================================
//  PRESUPUESTO DEL LEAD PARA GHL (app/api/chat-lead/route.js)
//
//  presupuesto_del_lead (campo Monetary de GHL) se guarda SIEMPRE en MXN:
//   - MXN → el importe tal cual.
//   - USD → convertido con la misma cotización que usa el chatbot para
//     buscar (lib/fxRate.js: FIX de Banxico, o la tasa manual de respaldo).
//   - USD sin tasa utilizable, o moneda no confirmada → se omite el campo
//     (mejor vacío que un número en la moneda equivocada).
//
//  El importe y la moneda ORIGINALES del cliente se conservan siempre en
//  el resumen (datos_informativos), junto con el equivalente en MXN y la
//  tasa usada, para que el asesor tenga ambos datos.
// ============================================================

import { toMXN, parseRate } from "./currency.js";
import { formatFixDate } from "./fxRate.js";

const fmt = (n) => `$${Number(n).toLocaleString("en-US")}`;

// GHL rechaza el upsert COMPLETO si el campo Monetary recibe algo que no
// puede castear — solo se manda un entero positivo.
function sanitizeAmount(value) {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? Math.round(n) : null;
}

function rateLabel(fx) {
  if (fx?.source === "banxico_fix") return `FIX Banxico ${fx.rate} del ${formatFixDate(fx.fixDate)}`;
  if (fx?.source === "manual") return `tasa manual de referencia ${fx.rate}, no es el FIX oficial`;
  return null;
}

/** ¿Este criterio necesita tipo de cambio para calcular el presupuesto del lead? */
export function leadBudgetNeedsFx(criteria) {
  const hasBudget = criteria?.budgetMax != null || criteria?.budgetMin != null;
  return hasBudget && String(criteria?.budgetCurrency || "").toUpperCase() === "USD";
}

/**
 * @param {object|null} criteria - criterios de búsqueda del chat (importe en la moneda del cliente)
 * @param {import("./fxRate.js").FxQuote|null} fx - cotización (solo se usa si la moneda es USD)
 * @returns {{ presupuestoMXN: number|null, summaryLines: string[] }}
 */
export function computeLeadBudget(criteria, fx = null) {
  const hasBudget = criteria?.budgetMax != null || criteria?.budgetMin != null;
  if (!hasBudget) return { presupuestoMXN: null, summaryLines: [] };

  const currency = String(criteria.budgetCurrency || "").toUpperCase();
  const min = sanitizeAmount(criteria.budgetMin);
  const max = sanitizeAmount(criteria.budgetMax);
  const range = (a, b) => [a != null ? fmt(a) : null, b != null ? fmt(b) : null].filter(Boolean).join(" – ");
  const original = range(min, max);
  // Mismo criterio de siempre para el campo numérico: el máximo, o el mínimo si no hay máximo.
  const primary = max ?? min;

  if (currency === "MXN") {
    return { presupuestoMXN: primary, summaryLines: [`Presupuesto: ${original} MXN`] };
  }

  if (currency === "USD") {
    const lines = [`Presupuesto: USD ${original} (importe original del cliente)`];
    const rate = parseRate(fx?.rate);
    if (rate == null) {
      lines.push("Equivalente en MXN: no disponible (sin tipo de cambio confiable en este momento)");
      return { presupuestoMXN: null, summaryLines: lines };
    }
    const minMXN = min != null ? toMXN(min, "USD", rate) : null;
    const maxMXN = max != null ? toMXN(max, "USD", rate) : null;
    lines.push(`Equivalente: ${range(minMXN, maxMXN)} MXN (${rateLabel(fx)})`);
    return { presupuestoMXN: sanitizeAmount(maxMXN ?? minMXN), summaryLines: lines };
  }

  return {
    presupuestoMXN: null,
    summaryLines: [`Presupuesto: ${original} (moneda no confirmada por el cliente)`],
  };
}
