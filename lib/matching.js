// ============================================================
//  MOTOR DE MATCHING DEL CHATBOT (Property Matchmaker)
//
//  searchInventory(criteria) es la ÚNICA función autorizada para
//  decidir qué propiedades/desarrollos son coincidencias reales.
//  Opera directamente sobre lib/properties.js + lib/developments.js
//  (los datos completos, no la proyección recortada de lib/listings.js
//  que usan las páginas de grid — esa no trae bedrooms/bathrooms/
//  zoneSlug/saleType/deliveryStatus, que aquí sí hacen falta).
//
//  Claude NUNCA decide qué es un match: solo llama a esta función
//  (vía la tool search_inventory) y redacta su respuesta a partir de
//  lo que aquí se le devuelve. Esto es lo que impide que el chatbot
//  invente inventario.
//
//  PRESUPUESTO Y MONEDA: criteria.budgetMin/budgetMax vienen en la
//  moneda ORIGINAL que dijo el usuario (criteria.budgetCurrency).
//  Este archivo es el ÚNICO lugar donde se normalizan a MXN (moneda
//  del inventario) vía lib/currency.js — el LLM nunca convierte.
// ============================================================

// Imports relativos con extensión explícita (en vez del alias "@/") a
// propósito: así lib/matching.js se puede ejecutar tanto por el bundler de
// Next.js como con `node` directo (scripts/test-matching.mjs), sin loaders
// adicionales. Ver lib/package.json para la resolución ESM bajo Node.
import { properties } from "./properties.js";
import { developments } from "./developments.js";
import { toMXN, USD_TO_MXN_RATE } from "./currency.js";

const MAX_RESULTS = 6;

function norm(s) {
  return (s || "")
    .toString()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

function textMatch(itemValue, criteriaValue) {
  if (!criteriaValue) return true;
  const a = norm(itemValue);
  const b = norm(criteriaValue);
  if (!a) return false;
  return a.includes(b) || b.includes(a);
}

// "MXN" | "USD" si viene una moneda válida y reconocida; null en cualquier
// otro caso (ausente, vacía, o un valor que no es ninguna de las dos).
function normalizedCurrency(raw) {
  const cur = (raw || "").toString().toUpperCase();
  return cur === "MXN" || cur === "USD" ? cur : null;
}

// Monto relevante para comparar contra presupuesto, según la operación pedida.
// Siempre en MXN — así está expresado el 100% del inventario hoy.
function relevantAmount(item, operation) {
  if (operation === "renta") {
    if (item.rentPrice?.amount != null) return item.rentPrice.amount;
    if (item.operation === "renta") return item.price?.amount ?? null;
    return null;
  }
  // venta (o sin especificar): usar el precio de venta si existe
  if (item.operation === "venta") return item.price?.amount ?? null;
  return null;
}

function deliveryMatches(item, pref) {
  if (!pref || pref === "cualquiera") return true;
  const statusEs = norm(item.deliveryStatus?.es || "");
  const isPreventa = item.saleType === "preventa" || statusEs.includes("preventa");
  if (pref === "preventa") return isPreventa;
  if (pref === "inmediata") return !isPreventa;
  return true;
}

/**
 * Filtros DUROS que NO son presupuesto: si alguno no pasa, el item queda
 * fuera sin excepción. El presupuesto se evalúa aparte (ver budgetStatus)
 * porque un precio "a solicitud" (null) necesita un trato distinto a un
 * simple pass/fail — nunca puede afirmarse que está dentro de presupuesto,
 * pero tampoco debe desaparecer silenciosamente del inventario.
 */
function passesNonBudgetFilters(item, c) {
  if (c.operation) {
    const opOk =
      item.operation === c.operation ||
      (c.operation === "renta" && !!item.rentPrice);
    if (!opOk) return false;
  }

  if (c.saleType && item.saleType !== c.saleType) return false;

  if (c.category?.length) {
    const itemCats = item.category || [];
    if (!c.category.some((cat) => itemCats.includes(cat))) return false;
  }

  if (c.city && !textMatch(item.city, c.city)) return false;

  if (c.zone) {
    const zoneOk = textMatch(item.zone, c.zone) || textMatch(item.zoneSlug, c.zone.replace(/\s+/g, "-"));
    if (!zoneOk) return false;
  }

  if (c.bedroomsMin != null && typeof item.bedrooms === "number" && item.bedrooms < c.bedroomsMin) {
    return false;
  }

  if (c.bathroomsMin != null && typeof item.bathrooms === "number" && item.bathrooms < c.bathroomsMin) {
    return false;
  }

  if (!deliveryMatches(item, c.deliveryPreference)) return false;

  return true;
}

/**
 * Evalúa el presupuesto de un item YA con los límites normalizados a MXN.
 *   "n/a"     → el prospecto no dio presupuesto; no aplica.
 *   "within"  → precio conocido y dentro del rango pedido.
 *   "unknown" → precio "a solicitud" (price.amount null): NO se puede
 *               afirmar que está dentro del presupuesto, pero tampoco se
 *               descarta — se ofrece aparte como alternativa sin verificar.
 *   "over"/"under" → precio conocido y fuera de rango → se excluye.
 */
function budgetStatus(item, c, budgetMaxMXN, budgetMinMXN) {
  if (budgetMaxMXN == null && budgetMinMXN == null) return "n/a";
  const amount = relevantAmount(item, c.operation);
  if (amount == null) return "unknown";
  if (budgetMaxMXN != null && amount > budgetMaxMXN) return "over";
  if (budgetMinMXN != null && amount < budgetMinMXN) return "under";
  return "within";
}

// Orden de relevancia entre los que ya pasaron los filtros (no excluye nada).
function score(item, c, budgetMaxMXN) {
  let s = 0;
  if (item.featured) s += 1;

  if (c.purpose === "inversion") {
    if (item.rentPrice) s += 2;
    if (item.saleType === "preventa") s += 1;
  }
  if (c.purpose === "vivir") {
    const statusEs = norm(item.deliveryStatus?.es || "");
    if (statusEs.includes("inmediata")) s += 2;
  }

  if (c.bedroomsMin != null && item.bedrooms === c.bedroomsMin) s += 1;

  if (budgetMaxMXN != null) {
    const amount = relevantAmount(item, c.operation);
    if (amount != null) {
      // Más cerca del tope del presupuesto (sin pasarse) = mejor.
      const distance = budgetMaxMXN - amount;
      if (distance >= 0) s += Math.max(0, 1 - distance / budgetMaxMXN);
    }
  }

  return s;
}

function toMatchCard(item, kind, status) {
  return {
    slug: item.slug,
    kind, // "property" | "development"
    url: kind === "development" ? `/desarrollos/${item.slug}` : `/propiedades/${item.slug}`,
    name: item.name,
    city: item.city,
    zone: item.zone,
    operation: item.operation,
    saleType: item.saleType,
    category: item.category || [],
    bedrooms: item.bedrooms,
    bathrooms: item.bathrooms,
    builtArea: item.area?.built ?? null,
    priceDisplay: item.price?.display?.es ?? null,
    priceAmount: item.price?.amount ?? null,
    rentPriceDisplay: item.rentPrice?.display?.es ?? null,
    rentPriceAmount: item.rentPrice?.amount ?? null,
    deliveryStatus: item.deliveryStatus?.es ?? null,
    type: item.type?.es ?? null,
    features: (item.features || []).slice(0, 6).map((f) => f.es),
    // "within" | "unknown" — solo presente cuando el prospecto dio presupuesto.
    // "unknown" = precio a solicitud: nunca afirmar que está dentro de presupuesto.
    budgetStatus: status === "n/a" ? null : status,
  };
}

function getAllPublished() {
  return [
    ...properties.filter((p) => p.published !== false).map((p) => ({ raw: p, kind: "property" })),
    ...developments.filter((d) => d.published !== false).map((d) => ({ raw: d, kind: "development" })),
  ];
}

// "Pasa" para efectos de conteo/relajación = pasa filtros duros y el
// presupuesto no lo excluye explícitamente (over/under). "unknown" cuenta
// como resultado posible, igual que en el resultado final de searchInventory.
function countMatches(all, criteria) {
  const budgetMaxMXN = toMXN(criteria.budgetMax, criteria.budgetCurrency);
  const budgetMinMXN = toMXN(criteria.budgetMin, criteria.budgetCurrency);
  return all.filter(({ raw }) => {
    if (!passesNonBudgetFilters(raw, criteria)) return false;
    const status = budgetStatus(raw, criteria, budgetMaxMXN, budgetMinMXN);
    return status !== "over" && status !== "under";
  }).length;
}

// Prueba relajar UN criterio a la vez (en este orden de prioridad) y
// devuelve el primero que sí produce resultados. Nunca relaja más de uno.
// Esto solo SUGIERE una relajación — nunca se aplica en silencio a `matches`;
// el chatbot debe explicitarla al usuario (ver system prompt en app/api/chat).
function findRelaxSuggestion(all, criteria) {
  const attempts = [];

  if (criteria.bedroomsMin != null) {
    attempts.push({ field: "bedroomsMin", next: { ...criteria, bedroomsMin: undefined } });
  }
  if (criteria.bathroomsMin != null) {
    attempts.push({ field: "bathroomsMin", next: { ...criteria, bathroomsMin: undefined } });
  }
  if (criteria.budgetMax != null) {
    const relaxedMax = Math.round(criteria.budgetMax * 1.25);
    attempts.push({
      field: "budgetMax",
      value: relaxedMax,
      next: { ...criteria, budgetMax: relaxedMax },
    });
  }
  if (criteria.zone) {
    attempts.push({ field: "zone", next: { ...criteria, zone: undefined } });
  }
  if (criteria.deliveryPreference && criteria.deliveryPreference !== "cualquiera") {
    attempts.push({ field: "deliveryPreference", next: { ...criteria, deliveryPreference: "cualquiera" } });
  }
  if (criteria.city) {
    attempts.push({ field: "city", next: { ...criteria, city: undefined, zone: undefined } });
  }
  if (criteria.category?.length) {
    attempts.push({ field: "category", next: { ...criteria, category: undefined } });
  }

  for (const attempt of attempts) {
    const count = countMatches(all, attempt.next);
    if (count > 0) {
      return { field: attempt.field, suggestedValue: attempt.value ?? null, resultCount: count };
    }
  }
  return null;
}

/**
 * @param {Object} criteria
 * @param {"venta"|"renta"} [criteria.operation]
 * @param {"reventa"|"preventa"} [criteria.saleType]
 * @param {string[]} [criteria.category]           - "casa"|"departamento"|"lote"|"comercial"
 * @param {string} [criteria.city]
 * @param {string} [criteria.zone]
 * @param {number} [criteria.budgetMin]             - en la moneda ORIGINAL del usuario
 * @param {number} [criteria.budgetMax]             - en la moneda ORIGINAL del usuario
 * @param {"MXN"|"USD"} [criteria.budgetCurrency]   - moneda de budgetMin/budgetMax. Si hay presupuesto
 *                                                     y esta falta o no es "MXN"/"USD", NO se asume nada:
 *                                                     ver needsClarification en el valor de retorno.
 * @param {number} [criteria.bedroomsMin]
 * @param {number} [criteria.bathroomsMin]
 * @param {"vivir"|"inversion"|"segunda_residencia"} [criteria.purpose]
 * @param {"inmediata"|"preventa"|"cualquiera"} [criteria.deliveryPreference]
 * @returns {
 *   { needsClarification: true, clarificationField: "budgetCurrency", message: string } |
 *   { matches: object[], totalBeforeCap: number, relaxSuggestion: object|null, budgetCurrencyUnavailable?: true, debug: object }
 * }
 */
export function searchInventory(criteria = {}) {
  const hasBudget = criteria.budgetMax != null || criteria.budgetMin != null;
  const currency = normalizedCurrency(criteria.budgetCurrency);

  // Segunda barrera de seguridad (la primera es el system prompt): si hay
  // presupuesto pero no una moneda MXN/USD reconocida, el backend NUNCA
  // asume — le devuelve al modelo una señal explícita para que pregunte.
  if (hasBudget && !currency) {
    return {
      needsClarification: true,
      clarificationField: "budgetCurrency",
      message:
        "El presupuesto tiene un importe pero no se especificó si es en pesos mexicanos (MXN) o dólares (USD). " +
        "Antes de buscar, pregúntale directamente al usuario cuál de las dos es — nunca asumas ni conviertas tú mismo.",
    };
  }

  // Si es USD pero no hay tasa configurada (USD_TO_MXN_RATE), no inventamos
  // una — se busca igual, pero SIN aplicar el filtro de presupuesto (que no
  // podemos verificar), y se reporta explícitamente vía budgetCurrencyUnavailable.
  const budgetCurrencyUnavailable = hasBudget && currency === "USD" && USD_TO_MXN_RATE == null;
  const budgetMaxMXN = budgetCurrencyUnavailable ? null : toMXN(criteria.budgetMax, criteria.budgetCurrency);
  const budgetMinMXN = budgetCurrencyUnavailable ? null : toMXN(criteria.budgetMin, criteria.budgetCurrency);

  const all = getAllPublished();

  const withStatus = all
    .filter(({ raw }) => passesNonBudgetFilters(raw, criteria))
    .map(({ raw, kind }) => ({ raw, kind, status: budgetStatus(raw, criteria, budgetMaxMXN, budgetMinMXN) }))
    .filter(({ status }) => status !== "over" && status !== "under");

  // Precio confirmado dentro de presupuesto (o sin presupuesto pedido) va
  // SIEMPRE antes que precio "a solicitud" — nunca debe desplazar a un match
  // verificable un item cuyo precio no podemos confirmar que encaje.
  const exact = withStatus.filter((x) => x.status === "within" || x.status === "n/a");
  const unpriced = withStatus.filter((x) => x.status === "unknown");

  exact.sort((a, b) => score(b.raw, criteria, budgetMaxMXN) - score(a.raw, criteria, budgetMaxMXN));
  unpriced.sort((a, b) => score(b.raw, criteria, budgetMaxMXN) - score(a.raw, criteria, budgetMaxMXN));

  const combined = [...exact, ...unpriced];
  const matches = combined.slice(0, MAX_RESULTS).map(({ raw, kind, status }) => toMatchCard(raw, kind, status));

  const relaxSuggestion = matches.length === 0 ? findRelaxSuggestion(all, criteria) : null;

  return {
    matches,
    totalBeforeCap: combined.length,
    relaxSuggestion,
    // Presente solo cuando se pidió presupuesto en USD y no había tasa
    // configurada — el chatbot debe avisar que no pudo verificar ese
    // presupuesto, nunca afirmar que algo quedó dentro de rango.
    ...(budgetCurrencyUnavailable && { budgetCurrencyUnavailable: true }),
    // Solo para logging server-side (app/api/chat/route.js) — nunca se manda a Claude.
    debug: {
      candidatesBeforeFilters: all.length,
      budgetCurrency: criteria.budgetCurrency ?? null,
      budgetMaxOriginal: criteria.budgetMax ?? null,
      budgetMinOriginal: criteria.budgetMin ?? null,
      budgetMaxNormalizedMXN: budgetMaxMXN,
      budgetMinNormalizedMXN: budgetMinMXN,
      exactCount: exact.length,
      unpricedCount: unpriced.length,
    },
  };
}
