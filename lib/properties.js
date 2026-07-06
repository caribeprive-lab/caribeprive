// ============================================================
//  ARCHIVO DE DATOS DE PROPIEDADES INDIVIDUALES
//  (reventa, renta, o unidades sueltas dentro de un desarrollo)
//
//  Para un proyecto/desarrollo completo (Mukta, Vellmari, Puerto
//  369...) usa lib/developments.js en su lugar. Este archivo es
//  para UNA casa, UN depto o UN lote específico en venta o renta.
//
//  URL canónica: /propiedades/[slug] — nunca /desarrollos/[slug].
//
//  published:false → oculta la propiedad de TODA vista pública
//  (grids y acceso directo a /propiedades/[slug], que devuelve 404),
//  sin borrar el registro ni romper referencias.
//
//  Mientras este array esté vacío, /propiedades y el home muestran
//  los desarrollos publicados de lib/developments.js en su lugar,
//  vía lib/listings.js::getPublicListings(). En cuanto haya
//  propiedades reales aquí, aparecen mezcladas automáticamente.
//
//  CAMPOS DE TEXTO BILINGÜE: { es: "...", en: "..." }
//
//  TEMPLATE DE CAMPOS DISPONIBLES:
//  ─────────────────────────────────────────────────────────
//  slug            → URL: /propiedades/[slug]
//  kind            → siempre "property" (discrimina de "development")
//  published       → true (visible) | false (oculta sin borrar)
//  name            → Nombre / título del listado
//
//  ── Taxonomía ──────────────────────────────────────────────
//  operation       → "venta" | "renta"
//  saleType        → "reventa" | "preventa" | null (null si operation="renta")
//  category        → string[] → ["casa"] | ["departamento"] | ["lote"]
//                    (array por si aplica a más de una, ej. desarrollos mixtos)
//  city            → Ciudad (ej. "Cancún", "Puerto Morelos")
//  zoneSlug        → FK → lib/zones.js (ej. "puerto-cancun")
//  developmentSlug → FK → lib/developments.js, o null si es standalone
//  bedrooms        → number | null
//  bathrooms       → number | null
//  area            → { built: number|null, lot: number|null, unit: "m2" }
//  status          → "disponible" | "apartado" | "vendido" | "rentado"
//  featured        → boolean (aparece priorizado en home)
//  seo             → { title: {es,en}|null, description: {es,en}|null }
//                    (null → se deriva de `name` / `cardDesc`)
//
//  ── Card (home / listados) ──────────────────────────────────
//  zone            → Zona corta (display, para filtros)
//  region          → Texto de zona completo (badge en hero)
//  type            → Tipo corto (para card)
//  appreciation    → Plusvalía estimada (ej. "18%")
//
//  ── Hero landing ──────────────────────────────────────────
//  price           → { amount: number|null, currency: "MXN"|"USD"|null,
//                       display: { es, en } }
//  deliveryStatus  → { es, en } "Preventa" | "Entrega Inmediata" | etc.
//  projectType     → { es, en } Tipo de producto (display)
//
//  ── Desarrollador (si aplica) ───────────────────────────────
//  developer: { name, logo, description: {es,en} }
//
//  ── Imágenes ──────────────────────────────────────────────
//  cardImage       → Imagen para la card en home/listados
//  heroImage       → Imagen de fondo del hero en landing
//  gallery         → Array de imágenes para la galería
//
//  ── Contenido del landing ─────────────────────────────────
//  cardDesc        → { es, en } Descripción corta (card)
//  headline        → { es, en } Título de la sección principal
//  body            → { es: [...párrafos], en: [...párrafos] }
//  stats           → Array de { value, label: { es, en } } (máx. 4)
//  features        → Array de { es, en } (checklist de características)
//  amenities       → Array de { id, title:{es,en}, desc:{es,en}, image } (opcional)
//  location        → { lat, lng, address, description:{es,en} } (opcional)
// ============================================================

export const properties = [];

export function getProperty(slug) {
  return properties.find((p) => p.slug === slug);
}
