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
// ============================================================

import { properties } from "@/lib/properties";
import { developments } from "@/lib/developments";

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

// Monto relevante para comparar contra presupuesto, según la operación pedida.
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
 * Filtros DUROS: si alguno no pasa, el item queda fuera.
 * Cada criterio es opcional — si no viene, no filtra por ese campo.
 */
function passesHardFilters(item, c) {
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

  if (c.budgetMax != null || c.budgetMin != null) {
    const amount = relevantAmount(item, c.operation);
    // Si no hay precio numérico (ej. "precio a solicitud"), no se descarta por presupuesto.
    if (amount != null) {
      if (c.budgetMax != null && amount > c.budgetMax) return false;
      if (c.budgetMin != null && amount < c.budgetMin) return false;
    }
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

// Orden de relevancia entre los que ya pasaron los filtros duros (no excluye nada).
function score(item, c) {
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

  if (c.budgetMax != null) {
    const amount = relevantAmount(item, c.operation);
    if (amount != null) {
      // Más cerca del tope del presupuesto (sin pasarse) = mejor.
      const distance = c.budgetMax - amount;
      if (distance >= 0) s += Math.max(0, 1 - distance / c.budgetMax);
    }
  }

  return s;
}

function toMatchCard(item, kind) {
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
  };
}

function getAllPublished() {
  return [
    ...properties.filter((p) => p.published !== false).map((p) => ({ raw: p, kind: "property" })),
    ...developments.filter((d) => d.published !== false).map((d) => ({ raw: d, kind: "development" })),
  ];
}

function countMatches(all, criteria) {
  return all.filter(({ raw }) => passesHardFilters(raw, criteria)).length;
}

// Prueba relajar UN criterio a la vez (en este orden de prioridad) y
// devuelve el primero que sí produce resultados. Nunca relaja más de uno.
function findRelaxSuggestion(all, criteria) {
  const attempts = [];

  if (criteria.bedroomsMin != null) {
    attempts.push({ field: "bedroomsMin", next: { ...criteria, bedroomsMin: undefined } });
  }
  if (criteria.bathroomsMin != null) {
    attempts.push({ field: "bathroomsMin", next: { ...criteria, bathroomsMin: undefined } });
  }
  if (criteria.budgetMax != null) {
    attempts.push({
      field: "budgetMax",
      value: Math.round(criteria.budgetMax * 1.25),
      next: { ...criteria, budgetMax: Math.round(criteria.budgetMax * 1.25) },
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
 * @param {number} [criteria.budgetMin]
 * @param {number} [criteria.budgetMax]
 * @param {number} [criteria.bedroomsMin]
 * @param {number} [criteria.bathroomsMin]
 * @param {"vivir"|"inversion"|"segunda_residencia"} [criteria.purpose]
 * @param {"inmediata"|"preventa"|"cualquiera"} [criteria.deliveryPreference]
 * @returns {{ matches: object[], totalBeforeCap: number, relaxSuggestion: object|null }}
 */
export function searchInventory(criteria = {}) {
  const all = getAllPublished();

  const filtered = all.filter(({ raw }) => passesHardFilters(raw, criteria));
  filtered.sort((a, b) => score(b.raw, criteria) - score(a.raw, criteria));

  const matches = filtered.slice(0, MAX_RESULTS).map(({ raw, kind }) => toMatchCard(raw, kind));

  const relaxSuggestion = matches.length === 0 ? findRelaxSuggestion(all, criteria) : null;

  return {
    matches,
    totalBeforeCap: filtered.length,
    relaxSuggestion,
  };
}
