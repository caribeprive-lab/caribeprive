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

export const properties = [
  {
    slug: "casa-puerto-loreto",
    kind: "property",
    published: true,
    name: "Casa Puerto Loreto",

    // ── Taxonomía ──────────────────────────────────────────────
    operation: "renta",
    saleType: null,
    category: ["casa"],
    city: "Cancún",
    zoneSlug: "puerto-cancun",
    developmentSlug: null,
    bedrooms: 4,
    bathrooms: 4.5,
    area: { built: 515, lot: 458, unit: "m2" },
    status: "disponible",
    featured: false,
    seo: { title: null, description: null },

    zone: "Puerto Cancún",
    region: { es: "Puerto Cancún · Cancún", en: "Puerto Cancún · Cancún" },
    type: { es: "Casa · Muelle privado", en: "House · Private dock" },
    appreciation: null,

    // ── Hero info ────────────────────────────────────────────────
    price: {
      amount: 200000,
      currency: "MXN",
      display: { es: "$200,000 MXN /mes", en: "$200,000 MXN /month" },
    },
    deliveryStatus: { es: "Disponible para renta", en: "Available for rent" },
    projectType: { es: "Casa", en: "House" },

    // ── Imágenes ─────────────────────────────────────────────────
    cardImage: "/propiedades/casa-puerto-loreto/terraza-01.webp",
    heroImage: "/propiedades/casa-puerto-loreto/vista-alberca-canal-01.webp",
    gallery: [
      "/propiedades/casa-puerto-loreto/vista-alberca-canal-02.webp",
      "/propiedades/casa-puerto-loreto/sala-comedor-01.webp",
      "/propiedades/casa-puerto-loreto/terraza-02.webp",
      "/propiedades/casa-puerto-loreto/sala-comedor-02.webp",
      "/propiedades/casa-puerto-loreto/terraza-03.webp",
      "/propiedades/casa-puerto-loreto/recamara-01.webp",
      "/propiedades/casa-puerto-loreto/recamara-02.webp",
    ],

    cardDesc: {
      es: "Casa de 4 recámaras con muelle privado directo al canal, diseño de Artigas e infinity pool en Puerto Cancún.",
      en: "4-bedroom home with a private dock directly on the canal, Artigas design and infinity pool in Puerto Cancún.",
    },
    headline: {
      es: "Vive frente al canal, con muelle propio y diseño de autor.",
      en: "Live on the canal, with your own dock and signature design.",
    },
    body: {
      es: [
        "Casa Puerto Loreto se ubica en Puerto Cancún, la zona residencial de mayor plusvalía de Cancún, con 515 m² de construcción sobre un terreno de 458 m².",
        "4 recámaras, 4.5 baños y 4 estacionamientos, con muelle privado directo al canal, infinity pool, cuarto de lavado y cuarto de servicio completo, en un proyecto diseñado por Artigas.",
      ],
      en: [
        "Casa Puerto Loreto is located in Puerto Cancún, Cancún's highest-appreciation residential area, with 515 m² of construction on a 458 m² lot.",
        "4 bedrooms, 4.5 bathrooms and 4 parking spaces, with a private dock directly on the canal, infinity pool, laundry room and full staff quarters, in a project designed by Artigas.",
      ],
    },
    stats: [
      { value: "4", label: { es: "Recámaras", en: "Bedrooms" } },
      { value: "4.5", label: { es: "Baños", en: "Bathrooms" } },
      { value: "515m²", label: { es: "Construcción", en: "Built area" } },
      { value: "458m²", label: { es: "Terreno", en: "Lot size" } },
    ],
    features: [
      { es: "Muelle privado directo al canal", en: "Private dock directly on the canal" },
      { es: "Proyecto diseñado por Artigas", en: "Designed by Artigas" },
      { es: "Infinity pool", en: "Infinity pool" },
      { es: "Cuarto de lavado", en: "Laundry room" },
      { es: "Cuarto de servicio completo", en: "Full staff quarters" },
    ],
  },
  {
    slug: "casa-residencial-campestre",
    kind: "property",
    published: true,
    name: "Casa Residencial Campestre",

    // ── Taxonomía ──────────────────────────────────────────────
    operation: "venta",
    saleType: "reventa",
    category: ["casa"],
    city: "Cancún",
    zoneSlug: "residencial-campestre",
    developmentSlug: null,
    bedrooms: 5,
    bathrooms: 5,
    area: { built: 480, lot: 830, unit: "m2" },
    status: "disponible",
    featured: false,
    seo: { title: null, description: null },

    zone: "Residencial Campestre",
    region: { es: "Residencial Campestre · Cancún", en: "Residencial Campestre · Cancún" },
    type: { es: "Casa · Alberca y palapa", en: "House · Pool & palapa" },
    appreciation: null,

    // ── Hero info ────────────────────────────────────────────────
    price: {
      amount: 12200000,
      currency: "MXN",
      display: { es: "$12,200,000 MXN", en: "$12,200,000 MXN" },
    },
    deliveryStatus: { es: "Entrega Inmediata", en: "Immediate Delivery" },
    projectType: { es: "Casa", en: "House" },

    // ── Imágenes ─────────────────────────────────────────────────
    cardImage: "/propiedades/casa-residencial-campestre/alberca-01.webp",
    heroImage: "/propiedades/casa-residencial-campestre/exterior-01.webp",
    gallery: [
      "/propiedades/casa-residencial-campestre/sala-01.webp",
      "/propiedades/casa-residencial-campestre/comedor-01.webp",
      "/propiedades/casa-residencial-campestre/cocina-01.webp",
      "/propiedades/casa-residencial-campestre/desayunador-01.webp",
      "/propiedades/casa-residencial-campestre/recamara-01.webp",
      "/propiedades/casa-residencial-campestre/bano-01.webp",
      "/propiedades/casa-residencial-campestre/palapa-01.webp",
      "/propiedades/casa-residencial-campestre/pasillo-01.webp",
    ],

    cardDesc: {
      es: "Casa de 5 recámaras con alberca, palapa y jardín en Residencial Campestre, Cancún.",
      en: "5-bedroom home with pool, palapa and garden in Residencial Campestre, Cancún.",
    },
    headline: {
      es: "Espacio, naturaleza y vida al aire libre, en el corazón de Cancún.",
      en: "Space, nature and outdoor living, in the heart of Cancún.",
    },
    body: {
      es: [
        "Casa Residencial Campestre se ubica en la colonia Residencial Campestre, Cancún, con 830 m² de terreno y 480 m² de construcción distribuidos en 2 plantas.",
        "5 recámaras, 5 baños, estudio y cuarto de servicio completo, con alberca, palapa, jardín y seguridad 24 horas.",
      ],
      en: [
        "Casa Residencial Campestre is located in the Residencial Campestre neighborhood, Cancún, with 830 m² of land and 480 m² of construction across 2 stories.",
        "5 bedrooms, 5 bathrooms, a study and full staff quarters, with a pool, palapa, garden and 24-hour security.",
      ],
    },
    stats: [
      { value: "5", label: { es: "Recámaras", en: "Bedrooms" } },
      { value: "5", label: { es: "Baños", en: "Bathrooms" } },
      { value: "480m²", label: { es: "Construcción", en: "Built area" } },
      { value: "830m²", label: { es: "Terreno", en: "Lot size" } },
    ],
    features: [
      { es: "Alberca", en: "Pool" },
      { es: "Palapa", en: "Palapa" },
      { es: "Jardín", en: "Garden" },
      { es: "Seguridad 24 hrs", en: "24-hour security" },
      { es: "Estudio", en: "Study" },
      { es: "Cuarto de servicio", en: "Staff quarters" },
      { es: "4 estacionamientos", en: "4 parking spaces" },
      { es: "2 plantas", en: "2 stories" },
    ],
  },
  {
    slug: "departamento-parque-real",
    kind: "property",
    published: true,
    name: "Departamento Parque Real",

    // ── Taxonomía ──────────────────────────────────────────────
    operation: "venta",
    saleType: "reventa",
    category: ["departamento"],
    city: "Playa del Carmen",
    zoneSlug: "selvamar",
    developmentSlug: null,
    bedrooms: 2,
    bathrooms: 2,
    area: { built: 118.78, lot: null, unit: "m2" },
    status: "disponible",
    featured: false,
    seo: { title: null, description: null },

    zone: "Selvamar",
    region: { es: "Selvamar · Playa del Carmen", en: "Selvamar · Playa del Carmen" },
    type: { es: "Departamento · Primer piso", en: "Apartment · First floor" },
    appreciation: null,

    // ── Hero info ────────────────────────────────────────────────
    price: {
      amount: 4200000,
      currency: "MXN",
      display: { es: "$4,200,000 MXN", en: "$4,200,000 MXN" },
    },
    deliveryStatus: { es: "Entrega Inmediata", en: "Immediate Delivery" },
    projectType: { es: "Departamento", en: "Apartment" },

    // ── Imágenes ─────────────────────────────────────────────────
    cardImage: "/propiedades/departamento-parque-real/alberca-isla-01.webp",
    heroImage: "/propiedades/departamento-parque-real/fachada-01.webp",
    gallery: [
      "/propiedades/departamento-parque-real/estancia-01.webp",
      "/propiedades/departamento-parque-real/cocina-01.webp",
      "/propiedades/departamento-parque-real/balcon-01.webp",
      "/propiedades/departamento-parque-real/alberca-01.webp",
      "/propiedades/departamento-parque-real/alberca-02.webp",
      "/propiedades/departamento-parque-real/estanque-01.webp",
      "/propiedades/departamento-parque-real/bano-01.webp",
      "/propiedades/departamento-parque-real/asador-01.webp",
    ],

    cardDesc: {
      es: "Departamento de 2 recámaras en primer piso, dentro de Parque Real, Selvamar, rodeado de selva y con tres albercas.",
      en: "2-bedroom, first-floor apartment inside Parque Real, Selvamar, surrounded by jungle with three pools.",
    },
    headline: {
      es: "Vive rodeado de selva, a minutos de la playa, con tres albercas y acceso a Club de Playa.",
      en: "Live surrounded by jungle, minutes from the beach, with three pools and beach club access.",
    },
    body: {
      es: [
        "Departamento Parque Real se ubica en Selvamar, Playa del Carmen, dentro de un condominio rodeado de vegetación con estanques naturales y tres albercas.",
        "118.78 m² de construcción en primer piso, con 2 recámaras con baños completos, cuarto de servicio con baño tipo lock-off, cuarto de lavado, 2 lugares de estacionamiento y 2 bodegas.",
        "El condominio cuenta con jardines, espacios para convivencias y asadores, además de acceso a Club de Playa y roof-top en el Hotel The Fives, a 2.5 km.",
      ],
      en: [
        "Departamento Parque Real is located in Selvamar, Playa del Carmen, inside a condominium surrounded by vegetation with natural ponds and three pools.",
        "118.78 m² of construction on the first floor, with 2 bedrooms with full bathrooms, a lock-off staff room with bathroom, laundry room, 2 parking spaces and 2 storage units.",
        "The condominium features gardens, spaces for gatherings and grills, plus access to the Beach Club and roof-top at Hotel The Fives, 2.5 km away.",
      ],
    },
    stats: [
      { value: "2", label: { es: "Recámaras", en: "Bedrooms" } },
      { value: "2", label: { es: "Baños", en: "Bathrooms" } },
      { value: "118.78m²", label: { es: "Construcción", en: "Built area" } },
      { value: "2", label: { es: "Estacionamientos", en: "Parking spaces" } },
    ],
    features: [
      { es: "En primer piso", en: "First floor" },
      { es: "2 recámaras con baños completos", en: "2 bedrooms with full bathrooms" },
      { es: "Cuarto de servicio con baño (tipo lock-off)", en: "Staff room with bathroom (lock-off)" },
      { es: "Cuarto de lavado", en: "Laundry room" },
      { es: "2 lugares de estacionamiento", en: "2 parking spaces" },
      { es: "2 bodegas", en: "2 storage units" },
      { es: "Tres albercas", en: "Three pools" },
      { es: "Jardines", en: "Gardens" },
      { es: "Espacios para convivencias y asadores", en: "Gathering spaces and grills" },
      { es: "Acceso a Club de Playa y Roof-top en Hotel The Fives (2.5 km)", en: "Access to Beach Club and roof-top at Hotel The Fives (2.5 km)" },
    ],
  },
];

export function getProperty(slug) {
  return properties.find((p) => p.slug === slug);
}
