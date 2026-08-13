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
//  ÚNICA fuente de la tasa: la variable de entorno USD_TO_MXN_RATE.
//  Si no está configurada (o no es un número válido), el sistema NO
//  inventa una tasa por default — toMXN() devuelve null para USD en
//  ese caso, y lib/matching.js lo reporta explícitamente en vez de
//  aplicar un filtro de presupuesto que no puede verificar. Las
//  búsquedas en MXN nunca dependen de esta variable.
// ============================================================

const RAW_RATE = process.env.USD_TO_MXN_RATE;
const PARSED_RATE = RAW_RATE != null && RAW_RATE !== "" ? Number(RAW_RATE) : NaN;

export const USD_TO_MXN_RATE = Number.isFinite(PARSED_RATE) && PARSED_RATE > 0 ? PARSED_RATE : null;

/**
 * Normaliza un importe a MXN. Devuelve null cuando NO se puede normalizar
 * con certeza (moneda desconocida, o USD sin USD_TO_MXN_RATE configurada) —
 * nunca asume ni inventa una moneda o tasa.
 * @param {number|null|undefined} amount
 * @param {"MXN"|"USD"|string|null|undefined} currency
 * @returns {number|null}
 */
export function toMXN(amount, currency) {
  if (amount == null) return null;
  const n = Number(amount);
  if (!Number.isFinite(n)) return null;
  const cur = (currency || "").toString().toUpperCase();
  if (cur === "MXN") return Math.round(n);
  if (cur === "USD") {
    if (USD_TO_MXN_RATE == null) return null;
    return Math.round(n * USD_TO_MXN_RATE);
  }
  return null;
}
