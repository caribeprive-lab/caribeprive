// ============================================================
//  CATÁLOGO DE ZONAS
//
//  Entidad ligera de referencia (no de listado): cada zona tiene su
//  propia descripción editorial e imagen, para alimentar en el
//  futuro /zonas/[slug]. Las propiedades y desarrollos apuntan aquí
//  vía su campo `zoneSlug`, en vez de repetir esta descripción en
//  cada uno.
// ============================================================

export const zones = [
  {
    slug: "puerto-morelos",
    name: "Puerto Morelos",
    city: "Puerto Morelos",
    region: { es: "Puerto Morelos · Riviera Maya", en: "Puerto Morelos · Riviera Maya" },
    description: {
      es: "Puerto Morelos es uno de los destinos con mayor plusvalía del Caribe Mexicano: un pueblo de pescadores frente al segundo arrecife más grande del mundo, a 25 minutos del aeropuerto de Cancún y con acceso directo al Tren Maya.",
      en: "Puerto Morelos is one of the highest-appreciation destinations in the Mexican Caribbean: a fishing village facing the second-largest reef in the world, 25 minutes from Cancún airport and with direct access to the Maya Train.",
    },
    heroImage: "/articulos/C.jpg",
  },
  {
    slug: "puerto-cancun",
    name: "Puerto Cancún",
    city: "Cancún",
    region: { es: "Puerto Cancún · Cancún", en: "Puerto Cancún · Cancún" },
    description: {
      es: "Puerto Cancún es la zona residencial de mayor plusvalía de Cancún: una marina privada con campo de golf, plaza comercial y acceso directo al mar, a minutos del aeropuerto internacional y del centro de la ciudad.",
      en: "Puerto Cancún is Cancún's highest-appreciation residential area: a private marina with a golf course, a shopping plaza and direct sea access, minutes from the international airport and city center.",
    },
    heroImage: "/articulos/A.jpg",
  },
];

export function getZone(slug) {
  return zones.find((z) => z.slug === slug);
}
