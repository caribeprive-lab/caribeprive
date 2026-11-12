// ============================================================
//  EJECUCIÓN DE HERRAMIENTAS DEL CHATBOT (app/api/chat/route.js)
//
//  Separado del route para poder probarlo con node directo
//  (scripts/test-fx.mjs) inyectando una cotización simulada.
//
//  La cotización USD→MXN se pide de forma perezosa: solo si en el turno
//  hay una búsqueda con presupuesto en USD o el cliente pregunta por el
//  tipo de cambio — una búsqueda en MXN nunca consulta a Banxico.
// ============================================================

import { searchInventory } from "./matching.js";
import { describeQuoteForChat } from "./fxRate.js";

export const EXCHANGE_RATE_TOOL = {
  name: "get_exchange_rate",
  description:
    "Devuelve el tipo de cambio USD→MXN que usa el sistema para convertir presupuestos en dólares: " +
    "valor, fecha y fuente. Llámala SOLO cuando el usuario pregunte qué tipo de cambio se usa o cuánto está el dólar. " +
    "Nunca des un tipo de cambio que no venga de esta herramienta.",
  input_schema: { type: "object", properties: {} },
};

/** Memoiza la cotización durante un turno del chat (una sola consulta por request). */
export function lazyFx(getUsdMxnRate) {
  let p = null;
  return () => (p ??= getUsdMxnRate());
}

/**
 * Ejecuta una llamada de herramienta de Claude.
 * @returns {Promise<{ result: object, debug: object|null, criteria: object|null }>}
 */
export async function executeTool(block, { getFx }) {
  if (block.name === "get_exchange_rate") {
    const quote = await getFx();
    return { result: describeQuoteForChat(quote), debug: { fxSource: quote.source, fxReason: quote.reason }, criteria: null };
  }

  if (block.name === "search_inventory") {
    const criteria = block.input || {};
    const needsFx =
      (criteria.budgetMax != null || criteria.budgetMin != null) &&
      String(criteria.budgetCurrency || "").toUpperCase() === "USD";
    const fx = needsFx ? await getFx() : null;
    const { debug, ...result } = searchInventory(criteria, { fx });
    return { result, debug, criteria };
  }

  return { result: { error: `Herramienta desconocida: ${block.name}` }, debug: null, criteria: null };
}
