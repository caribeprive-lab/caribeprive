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
  {
    slug: "residencial-campestre",
    name: "Residencial Campestre",
    city: "Cancún",
    region: { es: "Residencial Campestre · Cancún", en: "Residencial Campestre · Cancún" },
    description: {
      es: "Residencial Campestre es una colonia residencial de Cancún.",
      en: "Residencial Campestre is a residential neighborhood in Cancún.",
    },
    heroImage: "/propiedades/casa-residencial-campestre/exterior-01.webp",
  },
  {
    slug: "selva-escondida",
    name: "Selva Escondida",
    city: "Puerto Morelos",
    region: { es: "Selva Escondida · Puerto Morelos", en: "Selva Escondida · Puerto Morelos" },
    description: {
      es: "Selva Escondida es un desarrollo residencial de Puerto Morelos rodeado de selva.",
      en: "Selva Escondida is a residential development in Puerto Morelos surrounded by jungle.",
    },
    heroImage: "/propiedades/departamento-selva-escondida/jardines-01.webp",
  },
  {
    slug: "selvamar",
    name: "Selvamar",
    city: "Playa del Carmen",
    region: { es: "Selvamar · Playa del Carmen", en: "Selvamar · Playa del Carmen" },
    description: {
      es: "Selvamar es un desarrollo residencial de Playa del Carmen rodeado de selva.",
      en: "Selvamar is a residential development in Playa del Carmen surrounded by jungle.",
    },
    heroImage: "/propiedades/departamento-parque-real/fachada-01.webp",
  },
  {
    slug: "arbolada",
    name: "Arbolada",
    city: "Cancún",
    region: { es: "Arbolada · Cancún", en: "Arbolada · Cancún" },
    description: {
      es: "Arbolada es un desarrollo residencial de Cancún.",
      en: "Arbolada is a residential development in Cancún.",
    },
    heroImage: "/propiedades/casa-ciruelo/fachada-01.webp",
  },
  {
    slug: "valle-real",
    name: "Valle Real",
    city: "Cancún",
    region: { es: "Valle Real · Cancún", en: "Valle Real · Cancún" },
    description: {
      es: "Valle Real es un desarrollo residencial de Cancún.",
      en: "Valle Real is a residential development in Cancún.",
    },
    heroImage: "/propiedades/casa-valle-real/fachada-01.webp",
  },
  {
    slug: "solai",
    name: "Solai",
    city: "Cancún",
    region: { es: "Solai · Cancún", en: "Solai · Cancún" },
    description: {
      es: "Solai es un desarrollo residencial de Cancún.",
      en: "Solai is a residential development in Cancún.",
    },
    heroImage: "/propiedades/departamento-solai-c1/fachada-01.webp",
  },
  {
    slug: "venado",
    name: "Venado",
    city: "Cancún",
    region: { es: "Venado · Cancún", en: "Venado · Cancún" },
    description: {
      es: "Venado es una colonia de Cancún con uso mixto residencial y comercial.",
      en: "Venado is a neighborhood in Cancún with mixed residential and commercial use.",
    },
    heroImage: "/propiedades/edificio-venado/fachada-01.webp",
  },
];

export function getZone(slug) {
  return zones.find((z) => z.slug === slug);
}
