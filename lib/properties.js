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
        "El condominio cuenta con jardines, espacios para convivencias y asadores, además de acceso a Club de Playa y roof-top en el Hotel Mvngata, a 2.5 km.",
      ],
      en: [
        "Departamento Parque Real is located in Selvamar, Playa del Carmen, inside a condominium surrounded by vegetation with natural ponds and three pools.",
        "118.78 m² of construction on the first floor, with 2 bedrooms with full bathrooms, a lock-off staff room with bathroom, laundry room, 2 parking spaces and 2 storage units.",
        "The condominium features gardens, spaces for gatherings and grills, plus access to the Beach Club and roof-top at Hotel Mvngata, 2.5 km away.",
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
      { es: "Acceso a Club de Playa y Roof-top en Hotel Mvngata (2.5 km)", en: "Access to Beach Club and roof-top at Hotel Mvngata (2.5 km)" },
    ],
  },
  {
    slug: "departamento-selva-escondida",
    kind: "property",
    published: true,
    name: "Departamento Selva Escondida I",

    // ── Taxonomía ──────────────────────────────────────────────
    operation: "venta",
    saleType: "reventa",
    category: ["departamento"],
    city: "Puerto Morelos",
    zoneSlug: "selva-escondida",
    developmentSlug: null,
    bedrooms: 2,
    bathrooms: 1,
    area: { built: 66, lot: null, unit: "m2" },
    status: "disponible",
    featured: false,
    seo: { title: null, description: null },

    zone: "Selva Escondida",
    region: { es: "Selva Escondida · Puerto Morelos", en: "Selva Escondida · Puerto Morelos" },
    type: { es: "Departamento · Primer piso", en: "Apartment · First floor" },
    appreciation: null,

    // ── Hero info ────────────────────────────────────────────────
    price: {
      amount: 2300000,
      currency: "MXN",
      display: { es: "$2,300,000 MXN", en: "$2,300,000 MXN" },
    },
    deliveryStatus: { es: "Entrega Inmediata", en: "Immediate Delivery" },
    projectType: { es: "Departamento", en: "Apartment" },

    // ── Imágenes ─────────────────────────────────────────────────
    cardImage: "/propiedades/departamento-selva-escondida/edificio-01.webp",
    heroImage: "/propiedades/departamento-selva-escondida/jardines-01.webp",
    gallery: [
      "/propiedades/departamento-selva-escondida/sala-comedor-01.webp",
      "/propiedades/departamento-selva-escondida/sala-comedor-02.webp",
      "/propiedades/departamento-selva-escondida/cocina-01.webp",
      "/propiedades/departamento-selva-escondida/recamara-principal-01.webp",
      "/propiedades/departamento-selva-escondida/recamara-principal-02.webp",
      "/propiedades/departamento-selva-escondida/recamara-secundaria-01.webp",
      "/propiedades/departamento-selva-escondida/recamara-secundaria-02.webp",
      "/propiedades/departamento-selva-escondida/bano-01.webp",
      "/propiedades/departamento-selva-escondida/cuarto-lavado-01.webp",
    ],

    cardDesc: {
      es: "Departamento amueblado de 2 recámaras en primer piso, dentro de Selva Escondida I, Puerto Morelos, con alberca, palapa y jardines.",
      en: "Furnished 2-bedroom, first-floor apartment inside Selva Escondida I, Puerto Morelos, with a pool, palapa and gardens.",
    },
    headline: {
      es: "Departamento amueblado y listo para entrar a vivir, rodeado de selva en Puerto Morelos.",
      en: "Furnished apartment, move-in ready, surrounded by jungle in Puerto Morelos.",
    },
    body: {
      es: [
        "Departamento Selva Escondida I se ubica en la 2da Sección de este condominio en Puerto Morelos, con 66 m² de construcción en primer piso.",
        "2 recámaras, 1 baño completo, sala-comedor, cocina equipada, cuarto de lavado y 1 lugar de estacionamiento. Se entrega amueblado.",
        "El condominio cuenta con alberca, área de asadores, palapa y jardines.",
      ],
      en: [
        "Departamento Selva Escondida I is located in the 2nd Section of this condominium in Puerto Morelos, with 66 m² of construction on the first floor.",
        "2 bedrooms, 1 full bathroom, living-dining room, equipped kitchen, laundry room and 1 parking space. Delivered furnished.",
        "The condominium features a pool, grill area, palapa and gardens.",
      ],
    },
    stats: [
      { value: "2", label: { es: "Recámaras", en: "Bedrooms" } },
      { value: "1", label: { es: "Baño", en: "Bathroom" } },
      { value: "66m²", label: { es: "Construcción", en: "Built area" } },
      { value: "1", label: { es: "Estacionamiento", en: "Parking space" } },
    ],
    features: [
      { es: "Departamento amueblado", en: "Furnished apartment" },
      { es: "En primer piso", en: "First floor" },
      { es: "Sala-comedor", en: "Living-dining room" },
      { es: "Cocina equipada", en: "Equipped kitchen" },
      { es: "Cuarto de lavado", en: "Laundry room" },
      { es: "1 lugar de estacionamiento", en: "1 parking space" },
      { es: "Alberca", en: "Pool" },
      { es: "Área de asadores", en: "Grill area" },
      { es: "Palapa", en: "Palapa" },
      { es: "Jardines", en: "Gardens" },
    ],
  },
  {
    slug: "departamento-cancun-towers",
    kind: "property",
    published: false,
    name: "Cancún Towers",

    // ── Taxonomía ──────────────────────────────────────────────
    operation: "venta",
    saleType: "reventa",
    category: ["departamento"],
    city: "Cancún",
    zoneSlug: "puerto-cancun",
    developmentSlug: null,
    bedrooms: 3,
    bathrooms: 5,
    area: { built: 307, lot: null, unit: "m2" },
    status: "disponible",
    featured: false,
    seo: { title: null, description: null },

    zone: "Puerto Cancún",
    region: { es: "Puerto Cancún · Cancún", en: "Puerto Cancún · Cancún" },
    type: { es: "Departamento · Vista al mar y campo de golf", en: "Apartment · Ocean & golf course views" },
    appreciation: null,

    // ── Hero info ────────────────────────────────────────────────
    price: {
      amount: 13700000,
      currency: "MXN",
      display: { es: "$13,700,000 MXN", en: "$13,700,000 MXN" },
    },
    deliveryStatus: { es: "Entrega Inmediata", en: "Immediate Delivery" },
    projectType: { es: "Departamento", en: "Apartment" },

    // ── Imágenes ─────────────────────────────────────────────────
    cardImage: "/propiedades/departamento-cancun-towers/torres-01.webp",
    heroImage: "/propiedades/departamento-cancun-towers/alberca-01.webp",
    gallery: [
      "/propiedades/departamento-cancun-towers/alberca-02.webp",
      "/propiedades/departamento-cancun-towers/gym-01.webp",
      "/propiedades/departamento-cancun-towers/sala-01.webp",
      "/propiedades/departamento-cancun-towers/comedor-01.webp",
      "/propiedades/departamento-cancun-towers/cocina-01.webp",
      "/propiedades/departamento-cancun-towers/recamara-01.webp",
      "/propiedades/departamento-cancun-towers/bano-01.webp",
      "/propiedades/departamento-cancun-towers/balcon-01.webp",
      "/propiedades/departamento-cancun-towers/vista-01.webp",
    ],

    cardDesc: {
      es: "Departamento de 3 recámaras y 307 m² con vista al mar y campo de golf, en Puerto Cancún.",
      en: "3-bedroom, 307 m² apartment with ocean and golf course views, in Puerto Cancún.",
    },
    headline: {
      es: "Vive con vista al mar y al campo de golf, en la zona de mayor plusvalía de Cancún.",
      en: "Live with ocean and golf course views, in Cancún's highest-appreciation area.",
    },
    body: {
      es: [
        "Departamento Cancún Towers se ubica en Puerto Cancún, la zona residencial de mayor plusvalía de Cancún, con 307 m² de construcción y vista al mar y al campo de golf.",
        "3 recámaras y 5 baños completos, cuarto de servicio con baño, 4 lugares de estacionamiento, bodega, cerraduras electrónicas y acceso directo al ascensor.",
        "El edificio cuenta con alberca, jardín, spa, cancha de tenis y gimnasio.",
      ],
      en: [
        "Departamento Cancún Towers is located in Puerto Cancún, Cancún's highest-appreciation residential area, with 307 m² of construction and ocean and golf course views.",
        "3 bedrooms and 5 full bathrooms, a staff room with bathroom, 4 parking spaces, a storage unit, electronic locks and direct elevator access.",
        "The building features a pool, garden, spa, tennis court and gym.",
      ],
    },
    stats: [
      { value: "3", label: { es: "Recámaras", en: "Bedrooms" } },
      { value: "5", label: { es: "Baños", en: "Bathrooms" } },
      { value: "307m²", label: { es: "Construcción", en: "Built area" } },
      { value: "4", label: { es: "Estacionamientos", en: "Parking spaces" } },
    ],
    features: [
      { es: "Vista al mar y al campo de golf", en: "Ocean and golf course views" },
      { es: "Cuarto de servicio con baño", en: "Staff room with bathroom" },
      { es: "Bodega", en: "Storage unit" },
      { es: "Cerraduras electrónicas", en: "Electronic locks" },
      { es: "Acceso directo al ascensor", en: "Direct elevator access" },
      { es: "Alberca", en: "Pool" },
      { es: "Jardín", en: "Garden" },
      { es: "Spa", en: "Spa" },
      { es: "Cancha de tenis", en: "Tennis court" },
      { es: "Gimnasio", en: "Gym" },
    ],
  },
  {
    slug: "departamento-cancun-towers-8a-torre-1",
    kind: "property",
    published: true,
    name: "Cancún Towers 8-A, Torre 1",

    // ── Taxonomía ──────────────────────────────────────────────
    operation: "venta",
    saleType: "reventa",
    category: ["departamento"],
    city: "Cancún",
    zoneSlug: "puerto-cancun",
    developmentSlug: null,
    bedrooms: 2,
    bathrooms: 2.5,
    area: { built: 168, lot: null, unit: "m2" },
    status: "disponible",
    featured: false,
    seo: { title: null, description: null },

    zone: "Puerto Cancún",
    region: { es: "Puerto Cancún · Cancún", en: "Puerto Cancún · Cancún" },
    type: { es: "Departamento · Amueblado, vista al mar y campo de golf", en: "Apartment · Furnished, ocean & golf course views" },
    appreciation: null,

    // ── Hero info ────────────────────────────────────────────────
    price: {
      amount: 8500000,
      currency: "MXN",
      display: {
        es: "$8,500,000 MXN (venta) · $45,000 MXN/mes (renta)",
        en: "$8,500,000 MXN (sale) · $45,000 MXN/month (rent)",
      },
    },
    deliveryStatus: { es: "Entrega Inmediata", en: "Immediate Delivery" },
    projectType: { es: "Departamento", en: "Apartment" },

    // ── Imágenes ─────────────────────────────────────────────────
    cardImage: "/propiedades/departamento-cancun-towers-8a-torre-1/sala-01.webp",
    heroImage: "/propiedades/departamento-cancun-towers-8a-torre-1/terraza-vista-01.webp",
    gallery: [
      "/propiedades/departamento-cancun-towers-8a-torre-1/comedor-01.webp",
      "/propiedades/departamento-cancun-towers-8a-torre-1/cocina-01.webp",
      "/propiedades/departamento-cancun-towers-8a-torre-1/cocina-02.webp",
      "/propiedades/departamento-cancun-towers-8a-torre-1/recamara-01.webp",
      "/propiedades/departamento-cancun-towers-8a-torre-1/recamara-02.webp",
      "/propiedades/departamento-cancun-towers-8a-torre-1/bano-01.webp",
      "/propiedades/departamento-cancun-towers-8a-torre-1/bano-02.webp",
      "/propiedades/departamento-cancun-towers-8a-torre-1/sala-02.webp",
    ],

    cardDesc: {
      es: "Departamento amueblado de 2 recámaras y 168 m², unidad 8-A Torre 1, con vista al mar y campo de golf, en venta o renta en Puerto Cancún.",
      en: "Furnished 2-bedroom, 168 m² apartment, unit 8-A Tower 1, with ocean and golf course views, for sale or rent in Puerto Cancún.",
    },
    headline: {
      es: "Departamento amueblado en venta o renta, con vista al mar y al campo de golf.",
      en: "Furnished apartment for sale or rent, with ocean and golf course views.",
    },
    body: {
      es: [
        "Departamento Cancún Towers, unidad 8-A en Torre 1, piso 8, se ubica en Puerto Cancún, la zona residencial de mayor plusvalía de Cancún, con 168 m² de construcción y vista al mar y al campo de golf.",
        "2 recámaras, 2.5 baños, área de servicio y 1 lugar de estacionamiento. Se entrega amueblado, con mantenimiento incluido.",
        "Disponible en venta ($8,500,000 MXN) o en renta ($45,000 MXN/mes). El edificio cuenta con alberca, palapa, jardín, seguridad 24 horas, spa, cancha de tenis y gimnasio.",
      ],
      en: [
        "Departamento Cancún Towers, unit 8-A in Tower 1, 8th floor, is located in Puerto Cancún, Cancún's highest-appreciation residential area, with 168 m² of construction and ocean and golf course views.",
        "2 bedrooms, 2.5 bathrooms, a service area and 1 parking space. Delivered furnished, with maintenance fees included.",
        "Available for sale ($8,500,000 MXN) or for rent ($45,000 MXN/month). The building features a pool, palapa, garden, 24-hour security, spa, tennis court and gym.",
      ],
    },
    stats: [
      { value: "2", label: { es: "Recámaras", en: "Bedrooms" } },
      { value: "2.5", label: { es: "Baños", en: "Bathrooms" } },
      { value: "168m²", label: { es: "Construcción", en: "Built area" } },
      { value: "1", label: { es: "Estacionamiento", en: "Parking space" } },
    ],
    features: [
      { es: "Unidad 8-A, Torre 1, piso 8", en: "Unit 8-A, Tower 1, 8th floor" },
      { es: "En venta o en renta", en: "For sale or for rent" },
      { es: "Amueblado", en: "Furnished" },
      { es: "Vista al mar y al campo de golf", en: "Ocean and golf course views" },
      { es: "Área de servicio", en: "Service area" },
      { es: "1 lugar de estacionamiento", en: "1 parking space" },
      { es: "Mantenimiento incluido", en: "Maintenance fees included" },
      { es: "Alberca", en: "Pool" },
      { es: "Palapa", en: "Palapa" },
      { es: "Jardín", en: "Garden" },
      { es: "Seguridad 24 horas", en: "24-hour security" },
      { es: "Spa", en: "Spa" },
      { es: "Cancha de tenis", en: "Tennis court" },
      { es: "Gimnasio", en: "Gym" },
    ],
  },
  {
    slug: "casa-ciruelo",
    kind: "property",
    published: true,
    name: "Casa Ciruelo",

    // ── Taxonomía ──────────────────────────────────────────────
    operation: "venta",
    saleType: "reventa",
    category: ["casa"],
    city: "Cancún",
    zoneSlug: "arbolada",
    developmentSlug: null,
    bedrooms: 4,
    bathrooms: 4,
    area: { built: 224, lot: 110, unit: "m2" },
    status: "disponible",
    featured: false,
    seo: { title: null, description: null },

    zone: "Arbolada",
    region: { es: "Arbolada · Cancún", en: "Arbolada · Cancún" },
    type: { es: "Casa · 3 niveles", en: "House · 3 levels" },
    appreciation: null,

    // ── Hero info ────────────────────────────────────────────────
    price: {
      amount: 4600000,
      currency: "MXN",
      display: { es: "$4,600,000 MXN", en: "$4,600,000 MXN" },
    },
    deliveryStatus: { es: "Entrega Inmediata", en: "Immediate Delivery" },
    projectType: { es: "Casa", en: "House" },

    // ── Imágenes ─────────────────────────────────────────────────
    cardImage: "/propiedades/casa-ciruelo/patio-trasero-01.webp",
    heroImage: "/propiedades/casa-ciruelo/fachada-01.webp",
    gallery: [
      "/propiedades/casa-ciruelo/sala-01.webp",
      "/propiedades/casa-ciruelo/estancia-01.webp",
      "/propiedades/casa-ciruelo/cocina-01.webp",
      "/propiedades/casa-ciruelo/recamara-01.webp",
      "/propiedades/casa-ciruelo/recamara-02.webp",
      "/propiedades/casa-ciruelo/vestidor-01.webp",
      "/propiedades/casa-ciruelo/bano-01.webp",
      "/propiedades/casa-ciruelo/medio-bano-01.webp",
      "/propiedades/casa-ciruelo/cuarto-lavado-01.webp",
      "/propiedades/casa-ciruelo/terraza-01.webp",
    ],

    cardDesc: {
      es: "Casa de 4 recámaras y 3 niveles, sin amueblar, en Residencial Arbolada, Cancún.",
      en: "4-bedroom, 3-level unfurnished house in Residencial Arbolada, Cancún.",
    },
    headline: {
      es: "Casa de 3 niveles lista para hacerla tuya, en Residencial Arbolada.",
      en: "A 3-level house ready to make your own, in Residencial Arbolada.",
    },
    body: {
      es: [
        "Casa Ciruelo se ubica en Residencial Arbolada, Cancún, con 224 m² de construcción sobre un terreno de 110 m², distribuidos en 3 niveles.",
        "4 recámaras y 4 baños, 2 lugares de estacionamiento y cuarto de lavado. Se entrega sin muebles.",
      ],
      en: [
        "Casa Ciruelo is located in Residencial Arbolada, Cancún, with 224 m² of construction on a 110 m² lot, across 3 levels.",
        "4 bedrooms and 4 bathrooms, 2 parking spaces and a laundry room. Delivered unfurnished.",
      ],
    },
    stats: [
      { value: "4", label: { es: "Recámaras", en: "Bedrooms" } },
      { value: "4", label: { es: "Baños", en: "Bathrooms" } },
      { value: "224m²", label: { es: "Construcción", en: "Built area" } },
      { value: "110m²", label: { es: "Terreno", en: "Lot size" } },
    ],
    features: [
      { es: "3 niveles", en: "3 levels" },
      { es: "Cuarto de lavado", en: "Laundry room" },
      { es: "Vestidor", en: "Walk-in closet" },
      { es: "Terraza", en: "Terrace" },
      { es: "2 lugares de estacionamiento", en: "2 parking spaces" },
      { es: "Se entrega sin muebles", en: "Delivered unfurnished" },
    ],
  },
  {
    slug: "casa-valle-real",
    kind: "property",
    published: true,
    name: "Casa Valle Real",

    // ── Taxonomía ──────────────────────────────────────────────
    operation: "venta",
    saleType: "reventa",
    category: ["casa"],
    city: "Cancún",
    zoneSlug: "valle-real",
    developmentSlug: null,
    bedrooms: 3,
    bathrooms: 4,
    area: { built: 260, lot: 200, unit: "m2" },
    status: "disponible",
    featured: false,
    seo: { title: null, description: null },

    zone: "Valle Real",
    region: { es: "Valle Real · Cancún", en: "Valle Real · Cancún" },
    type: { es: "Casa · Alberca privada", en: "House · Private pool" },
    appreciation: null,

    // ── Hero info ────────────────────────────────────────────────
    price: {
      amount: 5300000,
      currency: "MXN",
      display: { es: "$5,300,000 MXN", en: "$5,300,000 MXN" },
    },
    deliveryStatus: { es: "Entrega Inmediata", en: "Immediate Delivery" },
    projectType: { es: "Casa", en: "House" },

    // ── Imágenes ─────────────────────────────────────────────────
    cardImage: "/propiedades/casa-valle-real/alberca-01.webp",
    heroImage: "/propiedades/casa-valle-real/fachada-01.webp",
    gallery: [
      "/propiedades/casa-valle-real/patio-01.webp",
      "/propiedades/casa-valle-real/sala-01.webp",
      "/propiedades/casa-valle-real/comedor-01.webp",
      "/propiedades/casa-valle-real/cocina-01.webp",
      "/propiedades/casa-valle-real/recamara-01.webp",
      "/propiedades/casa-valle-real/recamara-02.webp",
      "/propiedades/casa-valle-real/bano-jacuzzi-01.webp",
      "/propiedades/casa-valle-real/bano-01.webp",
      "/propiedades/casa-valle-real/escalera-01.webp",
      "/propiedades/casa-valle-real/terraza-01.webp",
    ],

    cardDesc: {
      es: "Casa de 3 recámaras con alberca privada y recámara principal con jacuzzi, en Valle Real, Cancún.",
      en: "3-bedroom house with a private pool and a jacuzzi in the primary suite, in Valle Real, Cancún.",
    },
    headline: {
      es: "Amplitud y luz natural, con alberca privada y recámara principal con jacuzzi.",
      en: "Space and natural light, with a private pool and a jacuzzi primary suite.",
    },
    body: {
      es: [
        "Casa Valle Real se ubica en Valle Real, Cancún, con 260 m² de construcción sobre un terreno de 200 m², distribuidos en 2 plantas.",
        "3 recámaras, cada una con baño completo; la principal cuenta con jacuzzi y acceso a amplias terrazas. Cocina abierta integrada a una espaciosa sala a desnivel.",
        "En planta baja: baño completo, cuarto de servicio, patio trasero con alberca privada y estacionamiento para 2 vehículos.",
      ],
      en: [
        "Casa Valle Real is located in Valle Real, Cancún, with 260 m² of construction on a 200 m² lot, across 2 stories.",
        "3 bedrooms, each with a full bathroom; the primary suite has a jacuzzi and access to spacious terraces. Open kitchen integrated with a spacious sunken living room.",
        "On the ground floor: a full bathroom, staff room, backyard with a private pool and parking for 2 vehicles.",
      ],
    },
    stats: [
      { value: "3", label: { es: "Recámaras", en: "Bedrooms" } },
      { value: "4", label: { es: "Baños", en: "Bathrooms" } },
      { value: "260m²", label: { es: "Construcción", en: "Built area" } },
      { value: "200m²", label: { es: "Terreno", en: "Lot size" } },
    ],
    features: [
      { es: "Alberca privada", en: "Private pool" },
      { es: "Recámara principal con jacuzzi", en: "Primary suite with jacuzzi" },
      { es: "2 terrazas de gran tamaño", en: "2 large terraces" },
      { es: "Cocina abierta", en: "Open kitchen" },
      { es: "Amplia sala a desnivel", en: "Spacious sunken living room" },
      { es: "Cuarto de servicio", en: "Staff room" },
      { es: "Baño completo en planta baja", en: "Full bathroom on ground floor" },
      { es: "Patio trasero", en: "Backyard" },
      { es: "Estacionamiento para 2 vehículos", en: "Parking for 2 vehicles" },
    ],
  },
  {
    slug: "departamento-solai-c1",
    kind: "property",
    published: true,
    name: "Departamento Solai C-1",

    // ── Taxonomía ──────────────────────────────────────────────
    operation: "venta",
    saleType: "reventa",
    category: ["departamento"],
    city: "Cancún",
    zoneSlug: "solai",
    developmentSlug: null,
    bedrooms: 3,
    bathrooms: 3,
    area: { built: 158, lot: null, unit: "m2" },
    status: "disponible",
    featured: false,
    seo: { title: null, description: null },

    zone: "Solai",
    region: { es: "Solai · Cancún", en: "Solai · Cancún" },
    type: { es: "Departamento · Planta baja con jardín", en: "Apartment · Ground floor with garden" },
    appreciation: null,

    // ── Hero info ────────────────────────────────────────────────
    price: {
      amount: 5500000,
      currency: "MXN",
      display: { es: "$5,500,000 MXN", en: "$5,500,000 MXN" },
    },
    deliveryStatus: { es: "Rentado hasta sept. 2026", en: "Leased through Sept. 2026" },
    projectType: { es: "Departamento", en: "Apartment" },

    // ── Imágenes ─────────────────────────────────────────────────
    cardImage: "/propiedades/departamento-solai-c1/alberca-01.webp",
    heroImage: "/propiedades/departamento-solai-c1/fachada-01.webp",
    gallery: [
      "/propiedades/departamento-solai-c1/terraza-01.webp",
      "/propiedades/departamento-solai-c1/sala-01.webp",
      "/propiedades/departamento-solai-c1/cocina-01.webp",
      "/propiedades/departamento-solai-c1/recamara-01.webp",
      "/propiedades/departamento-solai-c1/vestidor-01.webp",
      "/propiedades/departamento-solai-c1/bano-01.webp",
      "/propiedades/departamento-solai-c1/patio-01.webp",
      "/propiedades/departamento-solai-c1/entrada-01.webp",
      "/propiedades/departamento-solai-c1/closet-01.webp",
    ],

    cardDesc: {
      es: "Departamento de 3 recámaras en planta baja con jardín privado, amueblado, en Residencial Solai, Cancún.",
      en: "Furnished 3-bedroom, ground-floor apartment with a private garden, in Residencial Solai, Cancún.",
    },
    headline: {
      es: "Departamento en planta baja con jardín propio, amueblado y listo para invertir.",
      en: "Ground-floor apartment with its own garden, furnished and investment-ready.",
    },
    body: {
      es: [
        "Departamento Solai C-1 se ubica en Residencial Solai, Cancún, en planta baja con jardín privado, con 158 m² de construcción.",
        "3 recámaras y 3 baños, 2 lugares de estacionamiento. Se entrega amueblado.",
        "Actualmente rentado hasta septiembre de 2026, ideal para inversión con renta garantizada. El condominio cuenta con alberca, palapa, jardín y seguridad 24 horas.",
      ],
      en: [
        "Departamento Solai C-1 is located in Residencial Solai, Cancún, on the ground floor with a private garden, with 158 m² of construction.",
        "3 bedrooms and 3 bathrooms, 2 parking spaces. Delivered furnished.",
        "Currently leased through September 2026, ideal for investment with guaranteed rental income. The condominium features a pool, palapa, garden and 24-hour security.",
      ],
    },
    stats: [
      { value: "3", label: { es: "Recámaras", en: "Bedrooms" } },
      { value: "3", label: { es: "Baños", en: "Bathrooms" } },
      { value: "158m²", label: { es: "Construcción", en: "Built area" } },
      { value: "2", label: { es: "Estacionamientos", en: "Parking spaces" } },
    ],
    features: [
      { es: "Planta baja con jardín privado", en: "Ground floor with private garden" },
      { es: "Amueblado", en: "Furnished" },
      { es: "2 lugares de estacionamiento", en: "2 parking spaces" },
      { es: "Rentado hasta septiembre 2026", en: "Leased through September 2026" },
      { es: "Alberca", en: "Pool" },
      { es: "Palapa", en: "Palapa" },
      { es: "Jardín", en: "Garden" },
      { es: "Seguridad 24 horas", en: "24-hour security" },
    ],
  },
  {
    slug: "departamento-cancun-towers-9b-torre-1",
    kind: "property",
    published: true,
    name: "Cancún Towers 9-B, Torre 1",

    // ── Taxonomía ──────────────────────────────────────────────
    operation: "venta",
    saleType: "reventa",
    category: ["departamento"],
    city: "Cancún",
    zoneSlug: "puerto-cancun",
    developmentSlug: null,
    bedrooms: 2,
    bathrooms: 2,
    area: { built: 168, lot: null, unit: "m2" },
    status: "disponible",
    featured: false,
    seo: { title: null, description: null },

    zone: "Puerto Cancún",
    region: { es: "Puerto Cancún · Cancún", en: "Puerto Cancún · Cancún" },
    type: { es: "Departamento · Amueblado, vista al mar y campo de golf", en: "Apartment · Furnished, ocean & golf course views" },
    appreciation: null,

    // ── Hero info ────────────────────────────────────────────────
    price: {
      amount: 8500000,
      currency: "MXN",
      display: { es: "$8,500,000 MXN", en: "$8,500,000 MXN" },
    },
    deliveryStatus: { es: "Entrega Inmediata", en: "Immediate Delivery" },
    projectType: { es: "Departamento", en: "Apartment" },

    // ── Imágenes ─────────────────────────────────────────────────
    cardImage: "/propiedades/departamento-cancun-towers-9b-torre-1/sala-01.webp",
    heroImage: "/propiedades/departamento-cancun-towers-9b-torre-1/terraza-01.webp",
    gallery: [
      "/propiedades/departamento-cancun-towers-9b-torre-1/sala-cocina-01.webp",
      "/propiedades/departamento-cancun-towers-9b-torre-1/recamara-01.webp",
      "/propiedades/departamento-cancun-towers-9b-torre-1/bano-01.webp",
      "/propiedades/departamento-cancun-towers-9b-torre-1/recamara-02.webp",
      "/propiedades/departamento-cancun-towers-9b-torre-1/bano-02.webp",
      "/propiedades/departamento-cancun-towers-9b-torre-1/terraza-02.webp",
    ],

    cardDesc: {
      es: "Departamento amueblado de 2 recámaras y 168 m², unidad 9-B Torre 1, con vista al mar y campo de golf, en Puerto Cancún.",
      en: "Furnished 2-bedroom, 168 m² apartment, unit 9-B Tower 1, with ocean and golf course views, in Puerto Cancún.",
    },
    headline: {
      es: "Departamento amueblado con vista al mar y al campo de golf, listo para entrar a vivir.",
      en: "Furnished apartment with ocean and golf course views, move-in ready.",
    },
    body: {
      es: [
        "Departamento Cancún Towers, unidad 9-B en Torre 1, se ubica en Puerto Cancún, la zona residencial de mayor plusvalía de Cancún, con 168 m² de construcción y vista al mar y al campo de golf.",
        "2 recámaras y 2 baños completos, sala y comedor integrados a la cocina, terraza con área de asador y 1 lugar de estacionamiento. Se entrega amueblado.",
        "El edificio cuenta con alberca, jardín, spa, cancha de tenis y gimnasio.",
      ],
      en: [
        "Departamento Cancún Towers, unit 9-B in Tower 1, is located in Puerto Cancún, Cancún's highest-appreciation residential area, with 168 m² of construction and ocean and golf course views.",
        "2 bedrooms and 2 full bathrooms, living and dining area integrated with the kitchen, a terrace with a grill area and 1 parking space. Delivered furnished.",
        "The building features a pool, garden, spa, tennis court and gym.",
      ],
    },
    stats: [
      { value: "2", label: { es: "Recámaras", en: "Bedrooms" } },
      { value: "2", label: { es: "Baños", en: "Bathrooms" } },
      { value: "168m²", label: { es: "Construcción", en: "Built area" } },
      { value: "1", label: { es: "Estacionamiento", en: "Parking space" } },
    ],
    features: [
      { es: "Unidad 9-B, Torre 1", en: "Unit 9-B, Tower 1" },
      { es: "Amueblado", en: "Furnished" },
      { es: "Vista al mar y al campo de golf", en: "Ocean and golf course views" },
      { es: "Terraza con área de asador", en: "Terrace with grill area" },
      { es: "1 lugar de estacionamiento", en: "1 parking space" },
      { es: "Alberca", en: "Pool" },
      { es: "Jardín", en: "Garden" },
      { es: "Spa", en: "Spa" },
      { es: "Cancha de tenis", en: "Tennis court" },
      { es: "Gimnasio", en: "Gym" },
    ],
  },
];

export function getProperty(slug) {
  return properties.find((p) => p.slug === slug);
}
