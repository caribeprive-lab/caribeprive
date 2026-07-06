// ============================================================
//  PUENTE ENTRE PROPIEDADES Y DESARROLLOS
//
//  getPublicListings() combina:
//    - propiedades individuales reales publicadas (lib/properties.js)
//    - desarrollos publicados, adaptados a forma de card (lib/developments.js)
//
//  Cada card resultante trae `kind` ("property" | "development") y
//  `href` ya resuelto a su URL canónica:
//    - kind "property"    → /propiedades/[slug]
//    - kind "development" → /desarrollos/[slug]
//
//  Esto permite que /propiedades y el home sigan mostrando inventario
//  (los desarrollos) mientras no haya suficientes propiedades reales,
//  sin que ninguna de las dos entidades duplique su URL canónica.
// ============================================================

import { properties } from "@/lib/properties";
import { developments } from "@/lib/developments";

function toCard(item, kind) {
  return {
    slug: item.slug,
    kind,
    href: kind === "development" ? `/desarrollos/${item.slug}` : `/propiedades/${item.slug}`,
    cardImage: item.cardImage,
    name: item.name,
    zone: item.zone,
    type: item.type,
    cardDesc: item.cardDesc,
    appreciation: item.appreciation,
    featured: !!item.featured,
  };
}

/**
 * @param {{ zone?: string }} filters
 */
export function getPublicListings(filters = {}) {
  const { zone } = filters;

  const propertyCards = properties
    .filter((p) => p.published !== false)
    .map((p) => toCard(p, "property"));

  const developmentCards = developments
    .filter((d) => d.published !== false)
    .map((d) => toCard(d, "development"));

  let all = [...developmentCards, ...propertyCards];

  if (zone && zone !== "all") {
    all = all.filter((item) => item.zone === zone);
  }

  return all;
}
