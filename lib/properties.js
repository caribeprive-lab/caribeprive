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
//  category        → string[] → ["casa"] | ["departamento"] | ["lote"] | ["comercial"]
//                    (array por si aplica a más de una, ej. desarrollos mixtos)
//                    "comercial" agrupa la propiedad en la sección Comercial
//                    de /propiedades, aparte de la grid residencial.
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
//  rentPrice       → (opcional) { amount, currency, display: {es,en} }
//                     Solo si operation:"venta" y la propiedad TAMBIÉN se
//                     renta (price.display ya combina ambos montos). Hace
//                     que la propiedad aparezca también en /rentas-de-lujo,
//                     mostrando ahí solo el monto de renta.
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
      amount: 10850000,
      currency: "MXN",
      display: { es: "$10,850,000 MXN", en: "$10,850,000 MXN" },
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
    rentPrice: {
      amount: 45000,
      currency: "MXN",
      display: { es: "$45,000 MXN /mes", en: "$45,000 MXN /month" },
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
      amount: 4850000,
      currency: "MXN",
      display: { es: "$4,850,000 MXN", en: "$4,850,000 MXN" },
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
      amount: 5100000,
      currency: "MXN",
      display: { es: "$5,100,000 MXN", en: "$5,100,000 MXN" },
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
    zoneSlug: "bonampak",
    developmentSlug: null,
    bedrooms: 3,
    bathrooms: 3,
    area: { built: 158, lot: null, unit: "m2" },
    status: "disponible",
    featured: false,
    seo: { title: null, description: null },

    zone: "Bonampak",
    region: { es: "Bonampak · Cancún", en: "Bonampak · Cancún" },
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
      es: "Departamento de 3 recámaras en planta baja con jardín privado, amueblado, en Residencial Solai, Bonampak, Cancún.",
      en: "Furnished 3-bedroom, ground-floor apartment with a private garden, in Residencial Solai, Bonampak, Cancún.",
    },
    headline: {
      es: "Departamento en planta baja con jardín propio, amueblado y listo para invertir.",
      en: "Ground-floor apartment with its own garden, furnished and investment-ready.",
    },
    body: {
      es: [
        "Departamento Solai C-1 se ubica en Residencial Solai, Bonampak, Cancún, en planta baja con jardín privado, con 158 m² de construcción.",
        "3 recámaras y 3 baños, 2 lugares de estacionamiento. Se entrega amueblado.",
        "Actualmente rentado hasta septiembre de 2026, ideal para inversión con renta garantizada. El condominio cuenta con alberca, palapa, jardín y seguridad 24 horas.",
      ],
      en: [
        "Departamento Solai C-1 is located in Residencial Solai, Bonampak, Cancún, on the ground floor with a private garden, with 158 m² of construction.",
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
  {
    slug: "edificio-venado",
    kind: "property",
    published: true,
    name: "Edificio Venado",

    // ── Taxonomía ──────────────────────────────────────────────
    operation: "venta",
    saleType: "reventa",
    category: ["comercial"],
    city: "Cancún",
    zoneSlug: "venado",
    developmentSlug: null,
    bedrooms: null,
    bathrooms: 2.5,
    area: { built: 518, lot: 272, unit: "m2" },
    status: "disponible",
    featured: false,
    seo: { title: null, description: null },

    zone: "Venado",
    region: { es: "Venado · Cancún", en: "Venado · Cancún" },
    type: { es: "Edificio comercial · 3 pisos, 17 salones privados", en: "Commercial building · 3 floors, 17 private rooms" },
    appreciation: null,

    // ── Hero info ────────────────────────────────────────────────
    price: {
      amount: 7900000,
      currency: "MXN",
      display: {
        es: "$7,900,000 MXN (venta) · $65,000 MXN/mes (renta)",
        en: "$7,900,000 MXN (sale) · $65,000 MXN/month (rent)",
      },
    },
    rentPrice: {
      amount: 65000,
      currency: "MXN",
      display: { es: "$65,000 MXN /mes", en: "$65,000 MXN /month" },
    },
    deliveryStatus: { es: "Entrega Inmediata", en: "Immediate Delivery" },
    projectType: { es: "Edificio Comercial", en: "Commercial Building" },

    // ── Imágenes ─────────────────────────────────────────────────
    cardImage: "/propiedades/edificio-venado/sala-espera-01.webp",
    heroImage: "/propiedades/edificio-venado/fachada-01.webp",
    gallery: [
      "/propiedades/edificio-venado/recepcion-01.webp",
      "/propiedades/edificio-venado/salon-privado-01.webp",
      "/propiedades/edificio-venado/salon-usos-multiples-01.webp",
      "/propiedades/edificio-venado/fachada-02.webp",
      "/propiedades/edificio-venado/pasillo-01.webp",
      "/propiedades/edificio-venado/salon-privado-02.webp",
      "/propiedades/edificio-venado/bano-01.webp",
      "/propiedades/edificio-venado/bodega-01.webp",
      "/propiedades/edificio-venado/salon-01.webp",
    ],

    cardDesc: {
      es: "Edificio comercial de 3 pisos y 518 m², con 17 salones privados, en venta o renta en Cancún.",
      en: "3-floor, 518 m² commercial building with 17 private rooms, for sale or rent in Cancún.",
    },
    headline: {
      es: "Edificio comercial de 3 pisos con 17 salones privados, en venta o renta.",
      en: "3-floor commercial building with 17 private rooms, for sale or rent.",
    },
    body: {
      es: [
        "Edificio Venado se ubica en la colonia Venado, Cancún, con 518 m² de construcción sobre un terreno de 272 m², distribuidos en 3 pisos.",
        "17 salones privados, recepción, salón de usos múltiples, 1 baño completo y 3 medios baños. Ideal para uso comercial o de servicios (consultorios, spa, oficinas).",
        "Disponible en venta ($7,900,000 MXN) o en renta ($65,000 MXN/mes).",
      ],
      en: [
        "Edificio Venado is located in the Venado neighborhood, Cancún, with 518 m² of construction on a 272 m² lot, across 3 floors.",
        "17 private rooms, a reception area, a multipurpose room, 1 full bathroom and 3 half bathrooms. Ideal for commercial or service use (offices, spa, clinics).",
        "Available for sale ($7,900,000 MXN) or for rent ($65,000 MXN/month).",
      ],
    },
    stats: [
      { value: "3", label: { es: "Pisos", en: "Floors" } },
      { value: "17", label: { es: "Salones privados", en: "Private rooms" } },
      { value: "518m²", label: { es: "Construcción", en: "Built area" } },
      { value: "272m²", label: { es: "Terreno", en: "Lot size" } },
    ],
    features: [
      { es: "En venta o en renta", en: "For sale or for rent" },
      { es: "17 salones privados", en: "17 private rooms" },
      { es: "Recepción", en: "Reception area" },
      { es: "Salón de usos múltiples", en: "Multipurpose room" },
      { es: "1 baño completo y 3 medios baños", en: "1 full bathroom and 3 half bathrooms" },
      { es: "3 pisos", en: "3 floors" },
    ],
  },
  {
    slug: "departamento-bonampak-2",
    kind: "property",
    published: true,
    name: "Departamento Bonampak 2",

    // ── Taxonomía ──────────────────────────────────────────────
    operation: "venta",
    saleType: "reventa",
    category: ["departamento"],
    city: "Cancún",
    zoneSlug: "bonampak",
    developmentSlug: null,
    bedrooms: 2,
    bathrooms: 2,
    area: { built: 110, lot: null, unit: "m2" },
    status: "disponible",
    featured: false,
    seo: { title: null, description: null },

    zone: "Bonampak",
    region: { es: "Bonampak · Cancún", en: "Bonampak · Cancún" },
    type: { es: "Departamento · Planta baja, amueblado", en: "Apartment · Ground floor, furnished" },
    appreciation: null,

    // ── Hero info ────────────────────────────────────────────────
    price: {
      amount: 4800000,
      currency: "MXN",
      display: { es: "$4,800,000 MXN", en: "$4,800,000 MXN" },
    },
    deliveryStatus: { es: "Actualmente rentado", en: "Currently leased" },
    projectType: { es: "Departamento", en: "Apartment" },

    // ── Imágenes ─────────────────────────────────────────────────
    cardImage: "/propiedades/departamento-bonampak-2/sala-01.webp",
    heroImage: "/propiedades/departamento-bonampak-2/alberca-01.webp",
    gallery: [
      "/propiedades/departamento-bonampak-2/comedor-01.webp",
      "/propiedades/departamento-bonampak-2/cocina-01.webp",
      "/propiedades/departamento-bonampak-2/recamara-01.webp",
      "/propiedades/departamento-bonampak-2/recamara-02.webp",
      "/propiedades/departamento-bonampak-2/bano-01.webp",
      "/propiedades/departamento-bonampak-2/terraza-01.webp",
      "/propiedades/departamento-bonampak-2/gym-01.webp",
      "/propiedades/departamento-bonampak-2/palapa-01.webp",
      "/propiedades/departamento-bonampak-2/fachada-01.webp",
    ],

    cardDesc: {
      es: "Departamento de 2 recámaras y 110 m² en planta baja, amueblado, actualmente rentado, en Bonampak, Cancún.",
      en: "2-bedroom, 110 m² ground-floor apartment, furnished, currently leased, in Bonampak, Cancún.",
    },
    headline: {
      es: "Departamento amueblado en planta baja, ideal para inversión con renta activa.",
      en: "Furnished ground-floor apartment, ideal for investment with active rental income.",
    },
    body: {
      es: [
        "Departamento Bonampak 2 se ubica en Bonampak, Cancún, en planta baja, con 110 m² de construcción.",
        "2 recámaras y 2 baños, área de servicio, bodega y 2 lugares de estacionamiento. Se entrega amueblado.",
        "Actualmente rentado, ideal para inversión con renta activa. El condominio cuenta con alberca, palapa, jardín, gimnasio y seguridad 24 horas.",
      ],
      en: [
        "Departamento Bonampak 2 is located in Bonampak, Cancún, on the ground floor, with 110 m² of construction.",
        "2 bedrooms and 2 bathrooms, a service area, storage unit and 2 parking spaces. Delivered furnished.",
        "Currently leased, ideal for investment with active rental income. The condominium features a pool, palapa, garden, gym and 24-hour security.",
      ],
    },
    stats: [
      { value: "2", label: { es: "Recámaras", en: "Bedrooms" } },
      { value: "2", label: { es: "Baños", en: "Bathrooms" } },
      { value: "110m²", label: { es: "Construcción", en: "Built area" } },
      { value: "2", label: { es: "Estacionamientos", en: "Parking spaces" } },
    ],
    features: [
      { es: "Planta baja", en: "Ground floor" },
      { es: "Amueblado", en: "Furnished" },
      { es: "Área de servicio", en: "Service area" },
      { es: "Bodega", en: "Storage unit" },
      { es: "2 lugares de estacionamiento", en: "2 parking spaces" },
      { es: "Actualmente rentado", en: "Currently leased" },
      { es: "Alberca", en: "Pool" },
      { es: "Palapa", en: "Palapa" },
      { es: "Jardín", en: "Garden" },
      { es: "Gimnasio", en: "Gym" },
      { es: "Seguridad 24 horas", en: "24-hour security" },
    ],
  },
  {
    slug: "departamento-solai-d2",
    kind: "property",
    published: true,
    name: "Departamento Solai D-2",

    // ── Taxonomía ──────────────────────────────────────────────
    operation: "venta",
    saleType: "reventa",
    category: ["departamento"],
    city: "Cancún",
    zoneSlug: "bonampak",
    developmentSlug: null,
    bedrooms: 3,
    bathrooms: 3,
    area: { built: 158, lot: null, unit: "m2" },
    status: "disponible",
    featured: false,
    seo: { title: null, description: null },

    zone: "Bonampak",
    region: { es: "Bonampak · Cancún", en: "Bonampak · Cancún" },
    type: { es: "Departamento · Piso 2, amueblado", en: "Apartment · 2nd floor, furnished" },
    appreciation: null,

    // ── Hero info ────────────────────────────────────────────────
    price: {
      amount: 5800000,
      currency: "MXN",
      display: { es: "$5,800,000 MXN", en: "$5,800,000 MXN" },
    },
    deliveryStatus: { es: "Entrega Inmediata", en: "Immediate Delivery" },
    projectType: { es: "Departamento", en: "Apartment" },

    // ── Imágenes ─────────────────────────────────────────────────
    cardImage: "/propiedades/departamento-solai-d2/sala-01.webp",
    heroImage: "/propiedades/departamento-solai-d2/terraza-01.webp",
    gallery: [
      "/propiedades/departamento-solai-d2/comedor-01.webp",
      "/propiedades/departamento-solai-d2/cocina-01.webp",
      "/propiedades/departamento-solai-d2/cocina-02.webp",
      "/propiedades/departamento-solai-d2/recamara-01.webp",
      "/propiedades/departamento-solai-d2/recamara-02.webp",
      "/propiedades/departamento-solai-d2/bano-01.webp",
      "/propiedades/departamento-solai-d2/bano-02.webp",
      "/propiedades/departamento-solai-d2/cuarto-lavado-01.webp",
    ],

    cardDesc: {
      es: "Departamento de 3 recámaras y 158 m² en piso 2, amueblado, en Residencial Solai, Bonampak, Cancún.",
      en: "Furnished 3-bedroom, 158 m² apartment on the 2nd floor, in Residencial Solai, Bonampak, Cancún.",
    },
    headline: {
      es: "Departamento amueblado en piso 2, listo para entrar a vivir o invertir.",
      en: "Furnished 2nd-floor apartment, move-in or investment ready.",
    },
    body: {
      es: [
        "Departamento Solai D-2 se ubica en Residencial Solai, Bonampak, Cancún, en el piso 2, con 158 m² de construcción.",
        "3 recámaras y 3 baños, 2 lugares de estacionamiento y bodega. Se entrega amueblado.",
        "El condominio cuenta con alberca, palapa, jardín y seguridad 24 horas.",
      ],
      en: [
        "Departamento Solai D-2 is located in Residencial Solai, Bonampak, Cancún, on the 2nd floor, with 158 m² of construction.",
        "3 bedrooms and 3 bathrooms, 2 parking spaces and a storage unit. Delivered furnished.",
        "The condominium features a pool, palapa, garden and 24-hour security.",
      ],
    },
    stats: [
      { value: "3", label: { es: "Recámaras", en: "Bedrooms" } },
      { value: "3", label: { es: "Baños", en: "Bathrooms" } },
      { value: "158m²", label: { es: "Construcción", en: "Built area" } },
      { value: "2", label: { es: "Estacionamientos", en: "Parking spaces" } },
    ],
    features: [
      { es: "Piso 2", en: "2nd floor" },
      { es: "Amueblado", en: "Furnished" },
      { es: "Bodega", en: "Storage unit" },
      { es: "2 lugares de estacionamiento", en: "2 parking spaces" },
      { es: "Alberca", en: "Pool" },
      { es: "Palapa", en: "Palapa" },
      { es: "Jardín", en: "Garden" },
      { es: "Seguridad 24 horas", en: "24-hour security" },
    ],
  },
  {
    slug: "casa-palmaris",
    kind: "property",
    published: true,
    name: "Casa Palmaris",

    // ── Taxonomía ──────────────────────────────────────────────
    operation: "venta",
    saleType: "reventa",
    category: ["casa"],
    city: "Cancún",
    zoneSlug: "palmaris",
    developmentSlug: null,
    bedrooms: 3,
    bathrooms: 5,
    area: { built: 209, lot: 206, unit: "m2" },
    status: "disponible",
    featured: false,
    seo: { title: null, description: null },

    zone: "Palmaris",
    region: { es: "Palmaris · Cancún", en: "Palmaris · Cancún" },
    type: { es: "Casa · Esquina, con alberca", en: "House · Corner lot, with pool" },
    appreciation: null,

    // ── Hero info ────────────────────────────────────────────────
    price: {
      amount: 6900000,
      currency: "MXN",
      display: { es: "$6,900,000 MXN", en: "$6,900,000 MXN" },
    },
    deliveryStatus: { es: "Entrega Inmediata", en: "Immediate Delivery" },
    projectType: { es: "Casa", en: "House" },

    // ── Imágenes ─────────────────────────────────────────────────
    cardImage: "/propiedades/casa-palmaris/cocina-01.webp",
    heroImage: "/propiedades/casa-palmaris/fachada-01.webp",
    gallery: [
      "/propiedades/casa-palmaris/pasillo-01.webp",
      "/propiedades/casa-palmaris/recamara-01.webp",
      "/propiedades/casa-palmaris/recamara-02.webp",
      "/propiedades/casa-palmaris/bano-01.webp",
      "/propiedades/casa-palmaris/bano-02.webp",
      "/propiedades/casa-palmaris/alberca-01.webp",
      "/propiedades/casa-palmaris/terraza-01.webp",
      "/propiedades/casa-palmaris/cuarto-servicio-01.webp",
    ],

    cardDesc: {
      es: "Casa de 3 recámaras y 5 baños, con alberca y estudio en planta baja, dentro de Residencial Palmaris, Cancún.",
      en: "3-bedroom, 5-bathroom house with a pool and a ground-floor study, inside Residencial Palmaris, Cancún.",
    },
    headline: {
      es: "Casa de esquina con alberca privada, dentro de un residencial con Palmarium y seguridad 24 horas.",
      en: "Corner house with a private pool, inside a residential community with a Palmarium and 24-hour security.",
    },
    body: {
      es: [
        "Casa Palmaris se ubica dentro de Residencial Palmaris, Cancún, en un lote de esquina con 209 m² de construcción sobre un terreno de 206 m².",
        "3 recámaras y 5 baños, estudio en planta baja, bodega, alberca privada y roof top, con 3 lugares de estacionamiento. Se entrega sin muebles, con cortinas y persianas.",
        "El residencial cuenta con Palmarium, jardines y seguridad 24 horas.",
      ],
      en: [
        "Casa Palmaris is located inside Residencial Palmaris, Cancún, on a corner lot with 209 m² of construction on a 206 m² lot.",
        "3 bedrooms and 5 bathrooms, a ground-floor study, a storage unit, a private pool and a roof top, with 3 parking spaces. Delivered unfurnished, with curtains and blinds.",
        "The residential community features a Palmarium, gardens and 24-hour security.",
      ],
    },
    stats: [
      { value: "3", label: { es: "Recámaras", en: "Bedrooms" } },
      { value: "5", label: { es: "Baños", en: "Bathrooms" } },
      { value: "209m²", label: { es: "Construcción", en: "Built area" } },
      { value: "206m²", label: { es: "Terreno", en: "Lot size" } },
    ],
    features: [
      { es: "Lote de esquina", en: "Corner lot" },
      { es: "Estudio en planta baja", en: "Ground-floor study" },
      { es: "Bodega", en: "Storage unit" },
      { es: "Alberca privada", en: "Private pool" },
      { es: "Roof top", en: "Roof top" },
      { es: "3 lugares de estacionamiento", en: "3 parking spaces" },
      { es: "Cortinas y persianas", en: "Curtains and blinds" },
      { es: "Se entrega sin muebles", en: "Delivered unfurnished" },
      { es: "Palmarium", en: "Palmarium" },
      { es: "Jardines", en: "Gardens" },
      { es: "Seguridad 24 horas", en: "24-hour security" },
    ],
  },
  {
    slug: "casa-rio-residencial",
    kind: "property",
    published: true,
    name: "Casa Río Residencial",

    // ── Taxonomía ──────────────────────────────────────────────
    operation: "venta",
    saleType: "reventa",
    category: ["casa"],
    city: "Cancún",
    zoneSlug: "rio",
    developmentSlug: null,
    bedrooms: 4,
    bathrooms: 5,
    area: { built: 293, lot: 180, unit: "m2" },
    status: "disponible",
    featured: false,
    seo: { title: null, description: null },

    zone: "Río",
    region: { es: "Río · Cancún", en: "Río · Cancún" },
    type: { es: "Casa · Roof top con tarja y frigo", en: "House · Roof top with sink and mini fridge" },
    appreciation: null,

    // ── Hero info ────────────────────────────────────────────────
    price: {
      amount: 7900000,
      currency: "MXN",
      display: { es: "$7,900,000 MXN", en: "$7,900,000 MXN" },
    },
    deliveryStatus: { es: "Entrega Inmediata", en: "Immediate Delivery" },
    projectType: { es: "Casa", en: "House" },

    // ── Imágenes ─────────────────────────────────────────────────
    cardImage: "/propiedades/casa-rio-residencial/cocina-01.webp",
    heroImage: "/propiedades/casa-rio-residencial/alberca-01.webp",
    gallery: [
      "/propiedades/casa-rio-residencial/comedor-01.webp",
      "/propiedades/casa-rio-residencial/cocina-02.webp",
      "/propiedades/casa-rio-residencial/recamara-01.webp",
      "/propiedades/casa-rio-residencial/recamara-02.webp",
      "/propiedades/casa-rio-residencial/bano-01.webp",
      "/propiedades/casa-rio-residencial/bano-02.webp",
      "/propiedades/casa-rio-residencial/closet-01.webp",
      "/propiedades/casa-rio-residencial/escalera-01.webp",
      "/propiedades/casa-rio-residencial/vista-01.webp",
    ],

    cardDesc: {
      es: "Casa de 4 recámaras y 5 baños, con paneles solares y roof top equipado, dentro de Residencial Río, Cancún.",
      en: "4-bedroom, 5-bathroom house with solar panels and an equipped roof top, inside Residencial Río, Cancún.",
    },
    headline: {
      es: "Casa con paneles solares y roof top equipado, dentro de un residencial con casa club.",
      en: "House with solar panels and an equipped roof top, inside a residential community with a clubhouse.",
    },
    body: {
      es: [
        "Casa Río Residencial se ubica dentro de Residencial Río, Cancún, con 293 m² de construcción sobre un terreno de 180 m².",
        "4 recámaras y 5 baños, estudio en planta baja, bodegas, paneles solares y alberca privada, con 2 lugares de estacionamiento. El roof top está equipado con tarja y frigo. Se entrega sin muebles, con cortinas y persianas, y mantenimiento incluido.",
        "El residencial cuenta con alberca, jardín, casa club y seguridad 24 horas.",
      ],
      en: [
        "Casa Río Residencial is located inside Residencial Río, Cancún, with 293 m² of construction on a 180 m² lot.",
        "4 bedrooms and 5 bathrooms, a ground-floor study, storage units, solar panels and a private pool, with 2 parking spaces. The roof top is equipped with a sink and mini fridge. Delivered unfurnished, with curtains and blinds, and maintenance fees included.",
        "The residential community features a pool, garden, clubhouse and 24-hour security.",
      ],
    },
    stats: [
      { value: "4", label: { es: "Recámaras", en: "Bedrooms" } },
      { value: "5", label: { es: "Baños", en: "Bathrooms" } },
      { value: "293m²", label: { es: "Construcción", en: "Built area" } },
      { value: "180m²", label: { es: "Terreno", en: "Lot size" } },
    ],
    features: [
      { es: "Estudio en planta baja", en: "Ground-floor study" },
      { es: "Paneles solares", en: "Solar panels" },
      { es: "Roof top con tarja y frigo", en: "Roof top with sink and mini fridge" },
      { es: "Alberca privada", en: "Private pool" },
      { es: "Bodegas", en: "Storage units" },
      { es: "2 lugares de estacionamiento", en: "2 parking spaces" },
      { es: "Cortinas y persianas", en: "Curtains and blinds" },
      { es: "Mantenimiento incluido", en: "Maintenance fees included" },
      { es: "Se entrega sin muebles", en: "Delivered unfurnished" },
      { es: "Casa club", en: "Clubhouse" },
      { es: "Jardín", en: "Garden" },
      { es: "Seguridad 24 horas", en: "24-hour security" },
    ],
  },
  {
    slug: "departamento-blume-4d",
    kind: "property",
    published: true,
    name: "Departamento Blume 4D",

    // ── Taxonomía ──────────────────────────────────────────────
    operation: "venta",
    saleType: "reventa",
    category: ["departamento"],
    city: "Cancún",
    zoneSlug: "puerto-cancun",
    developmentSlug: null,
    bedrooms: 4,
    bathrooms: 3.5,
    area: { built: 254, lot: null, unit: "m2" },
    status: "disponible",
    featured: false,
    seo: { title: null, description: null },

    zone: "Puerto Cancún",
    region: { es: "Puerto Cancún · Cancún", en: "Puerto Cancún · Cancún" },
    type: { es: "Departamento · Piso 4, amueblado", en: "Apartment · 4th floor, furnished" },
    appreciation: null,

    // ── Hero info ────────────────────────────────────────────────
    price: {
      amount: 22575000,
      currency: "MXN",
      display: { es: "$22,575,000 MXN", en: "$22,575,000 MXN" },
    },
    deliveryStatus: { es: "Entrega Inmediata", en: "Immediate Delivery" },
    projectType: { es: "Departamento", en: "Apartment" },

    // ── Imágenes ─────────────────────────────────────────────────
    cardImage: "/propiedades/departamento-blume-4d/terraza-01.webp",
    heroImage: "/propiedades/departamento-blume-4d/terraza-02.webp",
    gallery: [
      "/propiedades/departamento-blume-4d/sala-01.webp",
      "/propiedades/departamento-blume-4d/sala-02.webp",
      "/propiedades/departamento-blume-4d/comedor-01.webp",
      "/propiedades/departamento-blume-4d/cocina-01.webp",
      "/propiedades/departamento-blume-4d/recamara-principal-01.webp",
      "/propiedades/departamento-blume-4d/recamara-principal-02.webp",
      "/propiedades/departamento-blume-4d/recamara-02.webp",
      "/propiedades/departamento-blume-4d/recamara-03.webp",
      "/propiedades/departamento-blume-4d/recamara-04.webp",
      "/propiedades/departamento-blume-4d/bano-01.webp",
      "/propiedades/departamento-blume-4d/bano-02.webp",
      "/propiedades/departamento-blume-4d/terraza-03.webp",
      "/propiedades/departamento-blume-4d/exterior-01.webp",
      "/propiedades/departamento-blume-4d/amenidad-01.webp",
    ],

    cardDesc: {
      es: "Departamento de 4 recámaras y 254 m² en el piso 4, amueblado, dentro de Blume Boutique Condos, Puerto Cancún.",
      en: "Furnished 4-bedroom, 254 m² apartment on the 4th floor, inside Blume Boutique Condos, Puerto Cancún.",
    },
    headline: {
      es: "Departamento amueblado con vista a la Marina Puerto Cancún, dentro de Blume Boutique Condos.",
      en: "Furnished apartment with Puerto Cancún Marina views, inside Blume Boutique Condos.",
    },
    body: {
      es: [
        "Departamento 4D se ubica en el piso 4 de Blume Boutique Condos, frente a la Marina Puerto Cancún, con 254 m² de construcción.",
        "4 recámaras y 3.5 baños, 2 lugares de estacionamiento y terraza con vista a la marina. Se entrega amueblado. Cuenta con bodega disponible por separado ($500,000 MXN).",
        "El desarrollo cuenta con alberca infinity, muelle privado, lounge bar, pool bar, business center, kid's club, spa, gimnasio, alberca familiar, terraza bar, cancha de pádel, cancha de fútbol 5 y vigilancia 24/7.",
      ],
      en: [
        "Departamento 4D is located on the 4th floor of Blume Boutique Condos, facing the Puerto Cancún Marina, with 254 m² of construction.",
        "4 bedrooms and 3.5 bathrooms, 2 parking spaces and a terrace with marina views. Delivered furnished. A separate storage unit is available ($500,000 MXN).",
        "The development features an infinity pool, private dock, lounge bar, pool bar, business center, kids club, spa, gym, family pool, terrace bar, padel court, 5-a-side soccer court and 24-hour security.",
      ],
    },
    stats: [
      { value: "4", label: { es: "Recámaras", en: "Bedrooms" } },
      { value: "3.5", label: { es: "Baños", en: "Bathrooms" } },
      { value: "254m²", label: { es: "Construcción", en: "Built area" } },
      { value: "2", label: { es: "Estacionamientos", en: "Parking spaces" } },
    ],
    features: [
      { es: "Piso 4", en: "4th floor" },
      { es: "Amueblado", en: "Furnished" },
      { es: "2 lugares de estacionamiento", en: "2 parking spaces" },
      { es: "Bodega disponible aparte ($500,000 MXN)", en: "Separate storage unit available ($500,000 MXN)" },
      { es: "Vista a la Marina Puerto Cancún", en: "Puerto Cancún Marina views" },
      { es: "Alberca infinity", en: "Infinity pool" },
      { es: "Muelle privado", en: "Private dock" },
      { es: "Lounge bar y pool bar", en: "Lounge bar & pool bar" },
      { es: "Business center", en: "Business center" },
      { es: "Kid's club", en: "Kids club" },
      { es: "Spa", en: "Spa" },
      { es: "Gimnasio", en: "Gym" },
      { es: "Alberca familiar", en: "Family pool" },
      { es: "Terraza bar", en: "Terrace bar" },
      { es: "Cancha de pádel", en: "Padel court" },
      { es: "Cancha de fútbol 5", en: "5-a-side soccer court" },
      { es: "Vigilancia 24/7", en: "24/7 security" },
    ],
  },
  {
    slug: "casa-fuentes-aqua",
    kind: "property",
    published: true,
    name: "Casa Fuentes",

    // ── Taxonomía ──────────────────────────────────────────────
    operation: "venta",
    saleType: "reventa",
    category: ["casa"],
    city: "Cancún",
    zoneSlug: "aqua",
    developmentSlug: null,
    bedrooms: 3,
    bathrooms: 2.5,
    area: { built: 233, lot: 198, unit: "m2" },
    status: "disponible",
    featured: false,
    seo: { title: null, description: null },

    zone: "Aqua",
    region: { es: "Aqua Residencial · Cancún", en: "Aqua Residencial · Cancún" },
    type: { es: "Casa · Alberca privada", en: "House · Private pool" },
    appreciation: null,

    // ── Hero info ────────────────────────────────────────────────
    price: {
      amount: 5500000,
      currency: "MXN",
      display: { es: "$5,500,000 MXN", en: "$5,500,000 MXN" },
    },
    deliveryStatus: { es: "Entrega Inmediata", en: "Immediate Delivery" },
    projectType: { es: "Casa", en: "House" },

    // ── Imágenes ─────────────────────────────────────────────────
    cardImage: "/propiedades/casa-fuentes-aqua/alberca-01.webp",
    heroImage: "/propiedades/casa-fuentes-aqua/fachada-01.webp",
    gallery: [
      "/propiedades/casa-fuentes-aqua/sala-01.webp",
      "/propiedades/casa-fuentes-aqua/comedor-01.webp",
      "/propiedades/casa-fuentes-aqua/cocina-01.webp",
      "/propiedades/casa-fuentes-aqua/recamara-01.webp",
      "/propiedades/casa-fuentes-aqua/recamara-02.webp",
      "/propiedades/casa-fuentes-aqua/closet-01.webp",
      "/propiedades/casa-fuentes-aqua/bano-01.webp",
      "/propiedades/casa-fuentes-aqua/bano-02.webp",
    ],

    cardDesc: {
      es: "Casa de 3 recámaras y 2.5 baños, con alberca privada, dentro de Aqua Residencial, Cancún.",
      en: "3-bedroom, 2.5-bathroom house with a private pool, inside Aqua Residencial, Cancún.",
    },
    headline: {
      es: "Casa con alberca privada, dentro de un residencial con casa club y seguridad 24 horas.",
      en: "House with a private pool, inside a residential community with a clubhouse and 24-hour security.",
    },
    body: {
      es: [
        "Casa Fuentes se ubica dentro de Aqua Residencial, Cancún, con 233 m² de construcción sobre un terreno de 198 m².",
        "3 recámaras y 2.5 baños, alberca privada y 2 lugares de estacionamiento. Se entrega sin muebles, con mantenimiento incluido.",
        "El residencial cuenta con casa club, parque infantil y seguridad 24 horas.",
      ],
      en: [
        "Casa Fuentes is located inside Aqua Residencial, Cancún, with 233 m² of construction on a 198 m² lot.",
        "3 bedrooms and 2.5 bathrooms, a private pool and 2 parking spaces. Delivered unfurnished, with maintenance fees included.",
        "The residential community features a clubhouse, a playground and 24-hour security.",
      ],
    },
    stats: [
      { value: "3", label: { es: "Recámaras", en: "Bedrooms" } },
      { value: "2.5", label: { es: "Baños", en: "Bathrooms" } },
      { value: "233m²", label: { es: "Construcción", en: "Built area" } },
      { value: "198m²", label: { es: "Terreno", en: "Lot size" } },
    ],
    features: [
      { es: "Alberca privada", en: "Private pool" },
      { es: "2 lugares de estacionamiento", en: "2 parking spaces" },
      { es: "Mantenimiento incluido", en: "Maintenance fees included" },
      { es: "Se entrega sin muebles", en: "Delivered unfurnished" },
      { es: "Casa club", en: "Clubhouse" },
      { es: "Parque infantil", en: "Playground" },
      { es: "Seguridad 24 horas", en: "24-hour security" },
    ],
  },
  {
    slug: "casa-isla-risuena-ii",
    kind: "property",
    published: true,
    name: "Casa Isla Risueña II",

    // ── Taxonomía ──────────────────────────────────────────────
    operation: "venta",
    saleType: "reventa",
    category: ["casa"],
    city: "Cancún",
    zoneSlug: "isla-dorada",
    developmentSlug: null,
    bedrooms: 3,
    bathrooms: 3,
    area: { built: 480, lot: 500, unit: "m2" },
    status: "disponible",
    featured: false,
    seo: { title: null, description: null },

    zone: "Isla Dorada",
    region: { es: "Isla Dorada · Cancún", en: "Isla Dorada · Cancún" },
    type: { es: "Casa · Frente a canal, con muelle", en: "House · Canal-front, with dock" },
    appreciation: null,

    // ── Hero info ────────────────────────────────────────────────
    price: {
      amount: 19800000,
      currency: "MXN",
      display: {
        es: "$19,800,000 MXN (venta) · $75,000 MXN/mes (renta)",
        en: "$19,800,000 MXN (sale) · $75,000 MXN/month (rent)",
      },
    },
    rentPrice: {
      amount: 75000,
      currency: "MXN",
      display: { es: "$75,000 MXN /mes", en: "$75,000 MXN /month" },
    },
    deliveryStatus: { es: "Entrega Inmediata", en: "Immediate Delivery" },
    projectType: { es: "Casa", en: "House" },

    // ── Imágenes ─────────────────────────────────────────────────
    cardImage: "/propiedades/casa-isla-risuena-ii/exterior-01.webp",
    heroImage: "/propiedades/casa-isla-risuena-ii/fachada-01.webp",
    gallery: [
      "/propiedades/casa-isla-risuena-ii/alberca-02.webp",
      "/propiedades/casa-isla-risuena-ii/sala-02.webp",
      "/propiedades/casa-isla-risuena-ii/muelle-02.webp",
      "/propiedades/casa-isla-risuena-ii/sala-01.webp",
      "/propiedades/casa-isla-risuena-ii/alberca-01.webp",
      "/propiedades/casa-isla-risuena-ii/estancia-doble-altura-01.webp",
      "/propiedades/casa-isla-risuena-ii/comedor-02.webp",
      "/propiedades/casa-isla-risuena-ii/cocina-01.webp",
      "/propiedades/casa-isla-risuena-ii/cocina-02.webp",
      "/propiedades/casa-isla-risuena-ii/terraza-01.webp",
      "/propiedades/casa-isla-risuena-ii/terraza-techada-01.webp",
      "/propiedades/casa-isla-risuena-ii/jardin-01.webp",
      "/propiedades/casa-isla-risuena-ii/jacuzzi-01.webp",
      "/propiedades/casa-isla-risuena-ii/muelle-01.webp",
      "/propiedades/casa-isla-risuena-ii/entrada-01.webp",
      "/propiedades/casa-isla-risuena-ii/escalera-01.webp",
      "/propiedades/casa-isla-risuena-ii/estancia-superior-01.webp",
      "/propiedades/casa-isla-risuena-ii/estudio-01.webp",
      "/propiedades/casa-isla-risuena-ii/recamara-01.webp",
      "/propiedades/casa-isla-risuena-ii/vestidor-01.webp",
      "/propiedades/casa-isla-risuena-ii/bano-01.webp",
      "/propiedades/casa-isla-risuena-ii/recamara-02.webp",
      "/propiedades/casa-isla-risuena-ii/recamara-03.webp",
      "/propiedades/casa-isla-risuena-ii/recamara-04.webp",
      "/propiedades/casa-isla-risuena-ii/pasillo-01.webp",
    ],

    cardDesc: {
      es: "Casa de 3 recámaras y 3 baños, con alberca y muelle frente a canal, en venta o renta, dentro de Isla Dorada, Cancún.",
      en: "3-bedroom, 3-bathroom house with a pool and canal-front dock, for sale or rent, inside Isla Dorada, Cancún.",
    },
    headline: {
      es: "Casa frente a canal con muelle propio, en venta o renta.",
      en: "Canal-front house with its own dock, for sale or rent.",
    },
    body: {
      es: [
        "Casa Isla Risueña II se ubica dentro de Isla Dorada, Cancún, con 480 m² de construcción sobre un terreno de 500 m², distribuidos en 3 plantas.",
        "3 recámaras y 3 baños, con walking closet y closet adicional, cuarto de servicio y bodega. 2 lugares de estacionamiento.",
        "Alberca con jacuzzi, terraza y muelle propio hasta de 30 pies frente al canal. Cuenta con aire acondicionado central y mini splits.",
        "Disponible en venta ($19,800,000 MXN) o en renta ($75,000 MXN/mes). El residencial cuenta con casa club, gimnasio, spa, cancha de tenis y seguridad 24 horas.",
      ],
      en: [
        "Casa Isla Risueña II is located inside Isla Dorada, Cancún, with 480 m² of construction on a 500 m² lot, across 3 stories.",
        "3 bedrooms and 3 bathrooms, with a walk-in closet and an additional closet, a staff room and storage room. 2 parking spaces.",
        "Pool with hot tub, terrace and its own dock up to 30 feet on the canal. Features central A/C and mini splits.",
        "Available for sale ($19,800,000 MXN) or for rent ($75,000 MXN/month). The residential community features a clubhouse, gym, spa, tennis court and 24-hour security.",
      ],
    },
    stats: [
      { value: "3", label: { es: "Recámaras", en: "Bedrooms" } },
      { value: "3", label: { es: "Baños", en: "Bathrooms" } },
      { value: "480m²", label: { es: "Construcción", en: "Built area" } },
      { value: "500m²", label: { es: "Terreno", en: "Lot size" } },
    ],
    features: [
      { es: "3 plantas", en: "3 stories" },
      { es: "Walking closet y closet adicional", en: "Walk-in closet plus additional closet" },
      { es: "Cuarto de servicio y bodega", en: "Staff room and storage room" },
      { es: "2 lugares de estacionamiento", en: "2 parking spaces" },
      { es: "Alberca con jacuzzi y terraza", en: "Pool with hot tub and terrace" },
      { es: "Muelle propio hasta de 30 ft", en: "Own dock up to 30 ft" },
      { es: "Aire central y mini splits", en: "Central A/C and mini splits" },
      { es: "En venta o en renta", en: "For sale or for rent" },
      { es: "Casa club", en: "Clubhouse" },
      { es: "Gimnasio", en: "Gym" },
      { es: "Spa", en: "Spa" },
      { es: "Cancha de tenis", en: "Tennis court" },
      { es: "Seguridad 24 horas", en: "24-hour security" },
    ],
  },
  {
    slug: "departamento-isla-paraiso",
    kind: "property",
    published: true,
    name: "Departamento Isla Paraíso",

    // ── Taxonomía ──────────────────────────────────────────────
    operation: "venta",
    saleType: "reventa",
    category: ["departamento"],
    city: "Cancún",
    zoneSlug: "isla-dorada",
    developmentSlug: null,
    bedrooms: 3,
    bathrooms: 3.5,
    area: { built: 207, lot: null, unit: "m2" },
    status: "disponible",
    featured: false,
    seo: { title: null, description: null },

    zone: "Isla Dorada",
    region: { es: "Isla Dorada · Cancún", en: "Isla Dorada · Cancún" },
    type: { es: "Departamento · Piso 3, muelle al canal", en: "Apartment · 3rd floor, canal dock" },
    appreciation: null,

    // ── Hero info ────────────────────────────────────────────────
    price: {
      amount: 11000000,
      currency: "MXN",
      display: {
        es: "$11,000,000 MXN (venta) · $55,000 MXN/mes (renta)",
        en: "$11,000,000 MXN (sale) · $55,000 MXN/month (rent)",
      },
    },
    rentPrice: {
      amount: 55000,
      currency: "MXN",
      display: { es: "$55,000 MXN /mes", en: "$55,000 MXN /month" },
    },
    deliveryStatus: { es: "Entrega Inmediata", en: "Immediate Delivery" },
    projectType: { es: "Departamento", en: "Apartment" },

    // ── Imágenes ─────────────────────────────────────────────────
    cardImage: "/propiedades/departamento-isla-paraiso/exterior-01.webp",
    heroImage: "/propiedades/departamento-isla-paraiso/exterior-02.webp",
    gallery: [
      "/propiedades/departamento-isla-paraiso/fachada-01.webp",
      "/propiedades/departamento-isla-paraiso/vista-canal-01.webp",
      "/propiedades/departamento-isla-paraiso/vista-alberca-01.webp",
      "/propiedades/departamento-isla-paraiso/sala-01.webp",
      "/propiedades/departamento-isla-paraiso/sala-02.webp",
      "/propiedades/departamento-isla-paraiso/cocina-01.webp",
      "/propiedades/departamento-isla-paraiso/cocina-02.webp",
      "/propiedades/departamento-isla-paraiso/recamara-01.webp",
      "/propiedades/departamento-isla-paraiso/recamara-02.webp",
      "/propiedades/departamento-isla-paraiso/bano-01.webp",
      "/propiedades/departamento-isla-paraiso/bano-02.webp",
    ],

    cardDesc: {
      es: "Departamento de 3 recámaras y 3.5 baños, con muelle al canal, en venta o renta, dentro de Isla Dorada, Cancún.",
      en: "3-bedroom, 3.5-bathroom apartment with a canal dock, for sale or rent, inside Isla Dorada, Cancún.",
    },
    headline: {
      es: "Departamento con muelle al canal, en venta o renta.",
      en: "Apartment with a canal dock, for sale or rent.",
    },
    body: {
      es: [
        "Departamento Isla Paraíso se ubica en el 3er piso dentro de Isla Dorada, Cancún, con 207 m² de construcción.",
        "3 recámaras y 3.5 baños, cuarto de servicio y 2 lugares de estacionamiento. Mantenimiento incluido y muelle al canal.",
        "Disponible en venta ($11,000,000 MXN) o en renta ($55,000 MXN/mes). El residencial cuenta con alberca, palapa, jardín, gimnasio, spa, cancha de tenis, casa club y seguridad 24 horas.",
      ],
      en: [
        "Departamento Isla Paraíso is located on the 3rd floor inside Isla Dorada, Cancún, with 207 m² of construction.",
        "3 bedrooms and 3.5 bathrooms, a staff room and 2 parking spaces. Maintenance fees included and a canal dock.",
        "Available for sale ($11,000,000 MXN) or for rent ($55,000 MXN/month). The residential community features a pool, palapa, garden, gym, spa, tennis court, clubhouse and 24-hour security.",
      ],
    },
    stats: [
      { value: "3", label: { es: "Recámaras", en: "Bedrooms" } },
      { value: "3.5", label: { es: "Baños", en: "Bathrooms" } },
      { value: "207m²", label: { es: "Construcción", en: "Built area" } },
      { value: "2", label: { es: "Estacionamientos", en: "Parking spaces" } },
    ],
    features: [
      { es: "Piso 3", en: "3rd floor" },
      { es: "Cuarto de servicio", en: "Staff room" },
      { es: "2 lugares de estacionamiento", en: "2 parking spaces" },
      { es: "Mantenimiento incluido", en: "Maintenance fees included" },
      { es: "Muelle al canal", en: "Canal dock" },
      { es: "En venta o en renta", en: "For sale or for rent" },
      { es: "Alberca", en: "Pool" },
      { es: "Palapa", en: "Palapa" },
      { es: "Jardín", en: "Garden" },
      { es: "Gimnasio", en: "Gym" },
      { es: "Spa", en: "Spa" },
      { es: "Cancha de tenis", en: "Tennis court" },
      { es: "Casa club", en: "Clubhouse" },
      { es: "Seguridad 24 horas", en: "24-hour security" },
    ],
  },
  {
    slug: "departamento-riva",
    kind: "property",
    published: true,
    name: "Departamento Riva",

    // ── Taxonomía ──────────────────────────────────────────────
    operation: "venta",
    saleType: "reventa",
    category: ["departamento"],
    city: "Cancún",
    zoneSlug: "puerto-cancun",
    developmentSlug: null,
    bedrooms: 4,
    bathrooms: 4,
    area: { built: 214, lot: null, unit: "m2" },
    status: "disponible",
    featured: false,
    seo: { title: null, description: null },

    zone: "Puerto Cancún",
    region: { es: "La Laguna · Puerto Cancún · Cancún", en: "La Laguna · Puerto Cancún · Cancún" },
    type: { es: "Departamento · La Laguna, piso 3", en: "Apartment · La Laguna, 3rd floor" },
    appreciation: null,

    // ── Hero info ────────────────────────────────────────────────
    price: {
      amount: 12900000,
      currency: "MXN",
      display: { es: "$12,900,000 MXN", en: "$12,900,000 MXN" },
    },
    deliveryStatus: { es: "Entrega Inmediata", en: "Immediate Delivery" },
    projectType: { es: "Departamento", en: "Apartment" },

    // ── Imágenes ─────────────────────────────────────────────────
    cardImage: "/propiedades/departamento-riva/sala-01.webp",
    heroImage: "/propiedades/departamento-riva/comedor-01.webp",
    gallery: [
      "/propiedades/departamento-riva/sala-02.webp",
      "/propiedades/departamento-riva/cocina-01.webp",
      "/propiedades/departamento-riva/cocina-02.webp",
      "/propiedades/departamento-riva/recamara-principal-01.webp",
      "/propiedades/departamento-riva/recamara-01.webp",
      "/propiedades/departamento-riva/recamara-02.webp",
      "/propiedades/departamento-riva/recamara-03.webp",
      "/propiedades/departamento-riva/recamara-04.webp",
      "/propiedades/departamento-riva/closet-01.webp",
      "/propiedades/departamento-riva/lock-off-01.webp",
      "/propiedades/departamento-riva/bano-01.webp",
      "/propiedades/departamento-riva/bano-02.webp",
    ],

    cardDesc: {
      es: "Departamento de 4 recámaras y 4 baños, amueblado, con lock-off, en La Laguna, Puerto Cancún.",
      en: "Furnished 4-bedroom, 4-bathroom apartment with a lock-off unit, in La Laguna, Puerto Cancún.",
    },
    headline: {
      es: "Departamento amueblado con lock-off, ideal para renta vacacional.",
      en: "Furnished apartment with a lock-off unit, ideal for vacation rental.",
    },
    body: {
      es: [
        "Departamento Riva se ubica en el piso 3, en La Laguna, dentro de Puerto Cancún, con 214 m² de construcción.",
        "4 recámaras y 4 baños, con walking closet y unidad tipo lock-off independiente. 2 lugares de estacionamiento. Se entrega amueblado.",
        "Cuenta con alberca y terraza. El edificio ofrece seguridad 24 horas, gimnasio y spa, dentro de Puerto Cancún, la zona residencial de mayor plusvalía de Cancún. Ideal para renta vacacional.",
      ],
      en: [
        "Departamento Riva is located on the 3rd floor, in La Laguna, inside Puerto Cancún, with 214 m² of construction.",
        "4 bedrooms and 4 bathrooms, with a walk-in closet and an independent lock-off unit. 2 parking spaces. Delivered furnished.",
        "Features a pool and terrace. The building offers 24-hour security, gym and spa, inside Puerto Cancún, Cancún's highest-appreciation residential area. Ideal for vacation rental.",
      ],
    },
    stats: [
      { value: "4", label: { es: "Recámaras", en: "Bedrooms" } },
      { value: "4", label: { es: "Baños", en: "Bathrooms" } },
      { value: "214m²", label: { es: "Construcción", en: "Built area" } },
      { value: "2", label: { es: "Estacionamientos", en: "Parking spaces" } },
    ],
    features: [
      { es: "Piso 3", en: "3rd floor" },
      { es: "La Laguna, Puerto Cancún", en: "La Laguna, Puerto Cancún" },
      { es: "Walking closet", en: "Walk-in closet" },
      { es: "Unidad tipo lock-off", en: "Lock-off unit" },
      { es: "2 lugares de estacionamiento", en: "2 parking spaces" },
      { es: "Alberca y terraza", en: "Pool and terrace" },
      { es: "Se entrega amueblado", en: "Delivered furnished" },
      { es: "Ideal para renta vacacional", en: "Ideal for vacation rental" },
      { es: "Gimnasio", en: "Gym" },
      { es: "Spa", en: "Spa" },
      { es: "Seguridad 24 horas", en: "24-hour security" },
    ],
  },
  {
    slug: "lote-rio-residencial",
    kind: "property",
    published: true,
    name: "Lote 10, Río Residencial",

    // ── Taxonomía ──────────────────────────────────────────────
    operation: "venta",
    saleType: "reventa",
    category: ["lote"],
    city: "Cancún",
    zoneSlug: "rio",
    developmentSlug: null,
    bedrooms: null,
    bathrooms: null,
    area: { built: null, lot: 252.15, unit: "m2" },
    status: "disponible",
    featured: false,
    seo: { title: null, description: null },

    zone: "Río",
    region: { es: "Río · Cancún", en: "Río · Cancún" },
    type: { es: "Lote · Esquina, 252.15 m²", en: "Lot · Corner, 252.15 m²" },
    appreciation: null,

    // ── Hero info ────────────────────────────────────────────────
    price: {
      amount: 1850000,
      currency: "MXN",
      display: { es: "$1,850,000 MXN", en: "$1,850,000 MXN" },
    },
    deliveryStatus: { es: "Disponible para escriturar", en: "Ready to title" },
    projectType: { es: "Lote", en: "Lot" },

    // ── Imágenes ─────────────────────────────────────────────────
    cardImage: "/propiedades/lote-rio-residencial/terreno-01.webp",
    heroImage: "/propiedades/lote-rio-residencial/laguna-01.webp",
    gallery: [
      "/propiedades/lote-rio-residencial/entrada-01.webp",
      "/propiedades/lote-rio-residencial/laguna-02.webp",
      "/propiedades/lote-rio-residencial/padel-01.webp",
      "/propiedades/lote-rio-residencial/cancha-01.webp",
      "/propiedades/lote-rio-residencial/cancha-02.webp",
    ],

    cardDesc: {
      es: "Lote de esquina de 252.15 m², dentro de Residencial Río, Cancún.",
      en: "252.15 m² corner lot, inside Residencial Río, Cancún.",
    },
    headline: {
      es: "Lote de esquina listo para construir, dentro de un residencial con laguna artificial.",
      en: "Corner lot ready to build, inside a residential community with an artificial lagoon.",
    },
    body: {
      es: [
        "Lote 10 se ubica sobre Av. Mallorca, en Residencial Río, Cancún, con 252.15 m² en esquina, frente a área verde.",
        "Precio de $7,336.90 MXN por m², para un total de $1,850,000 MXN.",
        "El residencial cuenta con laguna artificial, 2 canchas de pádel, casa club, áreas verdes y seguridad 24/7.",
      ],
      en: [
        "Lote 10 is located on Av. Mallorca, in Residencial Río, Cancún, with 252.15 m² on a corner lot, facing a green area.",
        "Priced at $7,336.90 MXN per m², for a total of $1,850,000 MXN.",
        "The residential community features an artificial lagoon, 2 padel courts, a clubhouse, green areas and 24/7 security.",
      ],
    },
    stats: [
      { value: "252.15m²", label: { es: "Terreno", en: "Lot size" } },
      { value: "$7,336.90", label: { es: "Precio por m²", en: "Price per m²" } },
      { value: "Esquina", label: { es: "Ubicación", en: "Location" } },
      { value: "2", label: { es: "Canchas de pádel", en: "Padel courts" } },
    ],
    features: [
      { es: "Lote de esquina", en: "Corner lot" },
      { es: "252.15 m²", en: "252.15 m²" },
      { es: "Frente a área verde", en: "Facing green area" },
      { es: "Laguna artificial", en: "Artificial lagoon" },
      { es: "2 canchas de pádel", en: "2 padel courts" },
      { es: "Casa club", en: "Clubhouse" },
      { es: "Áreas verdes", en: "Green areas" },
      { es: "Seguridad 24/7", en: "24/7 security" },
    ],
  },
  {
    slug: "departamento-cancun-towers-8b-torre-2",
    kind: "property",
    published: true,
    name: "Cancún Towers 8-B, Torre 2",

    // ── Taxonomía ──────────────────────────────────────────────
    operation: "renta",
    saleType: null,
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
    type: { es: "Departamento · Amueblado, vista al campo de golf y mar", en: "Apartment · Furnished, golf course & ocean views" },
    appreciation: null,

    // ── Hero info ────────────────────────────────────────────────
    price: {
      amount: 45000,
      currency: "MXN",
      display: { es: "$45,000 MXN /mes", en: "$45,000 MXN /month" },
    },
    deliveryStatus: { es: "Disponible para renta", en: "Available for rent" },
    projectType: { es: "Departamento", en: "Apartment" },

    // ── Imágenes ─────────────────────────────────────────────────
    cardImage: "/propiedades/departamento-cancun-towers-8b-torre-2/alberca-01.webp",
    heroImage: "/propiedades/departamento-cancun-towers-8b-torre-2/exterior-01.webp",
    gallery: [
      "/propiedades/departamento-cancun-towers-8b-torre-2/terraza-01.webp",
      "/propiedades/departamento-cancun-towers-8b-torre-2/vista-golf-01.webp",
      "/propiedades/departamento-cancun-towers-8b-torre-2/sala-01.webp",
      "/propiedades/departamento-cancun-towers-8b-torre-2/sala-02.webp",
      "/propiedades/departamento-cancun-towers-8b-torre-2/cocina-01.webp",
      "/propiedades/departamento-cancun-towers-8b-torre-2/sala-03.webp",
      "/propiedades/departamento-cancun-towers-8b-torre-2/recamara-01.webp",
      "/propiedades/departamento-cancun-towers-8b-torre-2/recamara-02.webp",
      "/propiedades/departamento-cancun-towers-8b-torre-2/closet-01.webp",
      "/propiedades/departamento-cancun-towers-8b-torre-2/bano-01.webp",
      "/propiedades/departamento-cancun-towers-8b-torre-2/alberca-02.webp",
    ],

    cardDesc: {
      es: "Departamento amueblado de 2 recámaras y 168 m², piso 8 en Torre 2, con vista al campo de golf y mar, en renta en Puerto Cancún.",
      en: "Furnished 2-bedroom, 168 m² apartment, 8th floor in Tower 2, with golf course and ocean views, for rent in Puerto Cancún.",
    },
    headline: {
      es: "Departamento amueblado con vista al campo de golf y al mar, en renta.",
      en: "Furnished apartment with golf course and ocean views, for rent.",
    },
    body: {
      es: [
        "Departamento Cancún Towers, unidad 8-B en Torre 2, se ubica en Puerto Cancún, la zona residencial de mayor plusvalía de Cancún, con 168 m² de construcción y vista al campo de golf y al mar.",
        "2 recámaras y 2.5 baños, área de servicio y 1 lugar de estacionamiento. Se entrega amueblado, con mantenimiento incluido.",
        "El edificio cuenta con alberca, palapa, jardín, seguridad 24 horas, gimnasio, spa y cancha de tenis.",
      ],
      en: [
        "Departamento Cancún Towers, unit 8-B in Tower 2, is located in Puerto Cancún, Cancún's highest-appreciation residential area, with 168 m² of construction and golf course and ocean views.",
        "2 bedrooms and 2.5 bathrooms, a service area and 1 parking space. Delivered furnished, with maintenance fees included.",
        "The building features a pool, palapa, garden, 24-hour security, gym, spa and tennis court.",
      ],
    },
    stats: [
      { value: "2", label: { es: "Recámaras", en: "Bedrooms" } },
      { value: "2.5", label: { es: "Baños", en: "Bathrooms" } },
      { value: "168m²", label: { es: "Construcción", en: "Built area" } },
      { value: "1", label: { es: "Estacionamiento", en: "Parking space" } },
    ],
    features: [
      { es: "Unidad 8-B, Torre 2, piso 8", en: "Unit 8-B, Tower 2, 8th floor" },
      { es: "Amueblado", en: "Furnished" },
      { es: "Vista al campo de golf y al mar", en: "Golf course and ocean views" },
      { es: "Área de servicio", en: "Service area" },
      { es: "1 lugar de estacionamiento", en: "1 parking space" },
      { es: "Mantenimiento incluido", en: "Maintenance fees included" },
      { es: "Alberca", en: "Pool" },
      { es: "Palapa", en: "Palapa" },
      { es: "Jardín", en: "Garden" },
      { es: "Seguridad 24 horas", en: "24-hour security" },
      { es: "Gimnasio", en: "Gym" },
      { es: "Spa", en: "Spa" },
      { es: "Cancha de tenis", en: "Tennis court" },
    ],
  },
  {
    slug: "departamento-punta-cancun",
    kind: "property",
    published: true,
    name: "Departamento Punta Cancún",

    // ── Taxonomía ──────────────────────────────────────────────
    operation: "venta",
    saleType: "reventa",
    category: ["departamento"],
    city: "Cancún",
    zoneSlug: "zona-hotelera",
    developmentSlug: null,
    bedrooms: 3,
    bathrooms: 3,
    area: { built: 225, lot: null, unit: "m2" },
    status: "disponible",
    featured: false,
    seo: { title: null, description: null },

    zone: "Zona Hotelera",
    region: { es: "Punta Cancún · Zona Hotelera · Cancún", en: "Punta Cancún · Hotel Zone · Cancún" },
    type: { es: "Departamento · Frente al mar, Punta Cancún", en: "Apartment · Beachfront, Punta Cancún" },
    appreciation: null,

    // ── Hero info ────────────────────────────────────────────────
    price: {
      amount: 23500000,
      currency: "MXN",
      display: { es: "$23,500,000 MXN", en: "$23,500,000 MXN" },
    },
    deliveryStatus: { es: "Entrega Inmediata", en: "Immediate Delivery" },
    projectType: { es: "Departamento", en: "Apartment" },

    // ── Imágenes ─────────────────────────────────────────────────
    cardImage: "/propiedades/departamento-punta-cancun/vista-alberca-01.webp",
    heroImage: "/propiedades/departamento-punta-cancun/terraza-01.webp",
    gallery: [
      "/propiedades/departamento-punta-cancun/terraza-02.webp",
      "/propiedades/departamento-punta-cancun/vista-mar-01.webp",
      "/propiedades/departamento-punta-cancun/vista-alberca-02.webp",
      "/propiedades/departamento-punta-cancun/recamara-principal-01.webp",
      "/propiedades/departamento-punta-cancun/recamara-02.webp",
      "/propiedades/departamento-punta-cancun/recamara-03.webp",
      "/propiedades/departamento-punta-cancun/cocina-01.webp",
      "/propiedades/departamento-punta-cancun/cocina-02.webp",
      "/propiedades/departamento-punta-cancun/bano-01.webp",
      "/propiedades/departamento-punta-cancun/bano-02.webp",
      "/propiedades/departamento-punta-cancun/closet-01.webp",
      "/propiedades/departamento-punta-cancun/closet-02.webp",
    ],

    cardDesc: {
      es: "Departamento de 3 recámaras y 225 m², frente al mar en Punta Cancún, Zona Hotelera.",
      en: "3-bedroom, 225 m² apartment, beachfront in Punta Cancún, Hotel Zone.",
    },
    headline: {
      es: "Vive frente al mar Caribe, en la punta de la Zona Hotelera de Cancún.",
      en: "Live on the Caribbean Sea, at the tip of Cancún's Hotel Zone.",
    },
    body: {
      es: [
        "Departamento Punta Cancún se ubica frente al mar, en la punta de la Zona Hotelera de Cancún, con 225 m² de construcción.",
        "3 recámaras y 3 baños, cuarto de servicio y 2 lugares de estacionamiento. Se entrega amueblado, con mantenimiento de $24,000 MXN al mes.",
        "El edificio cuenta con alberca frente a playa, gimnasio, spa, jardín y seguridad 24 horas, directamente sobre la arena de Punta Cancún.",
      ],
      en: [
        "Departamento Punta Cancún is located beachfront, at the tip of Cancún's Hotel Zone, with 225 m² of construction.",
        "3 bedrooms and 3 bathrooms, a staff room and 2 parking spaces. Delivered furnished, with maintenance fees of $24,000 MXN per month.",
        "The building features a beachfront pool, gym, spa, garden and 24-hour security, directly on the sand of Punta Cancún.",
      ],
    },
    stats: [
      { value: "3", label: { es: "Recámaras", en: "Bedrooms" } },
      { value: "3", label: { es: "Baños", en: "Bathrooms" } },
      { value: "225m²", label: { es: "Construcción", en: "Built area" } },
      { value: "2", label: { es: "Estacionamientos", en: "Parking spaces" } },
    ],
    features: [
      { es: "Frente al mar (Beach Front)", en: "Beachfront" },
      { es: "Se entrega amueblado", en: "Delivered furnished" },
      { es: "Cuarto de servicio", en: "Staff room" },
      { es: "2 lugares de estacionamiento", en: "2 parking spaces" },
      { es: "Mantenimiento $24,000 MXN/mes", en: "Maintenance fees $24,000 MXN/month" },
      { es: "Alberca frente a playa", en: "Beachfront pool" },
      { es: "Gimnasio", en: "Gym" },
      { es: "Spa", en: "Spa" },
      { es: "Jardín", en: "Garden" },
      { es: "Seguridad 24 horas", en: "24-hour security" },
    ],
  },
  {
    slug: "departamento-punta-del-mar",
    kind: "property",
    published: true,
    name: "Departamento Punta del Mar",

    // ── Taxonomía ──────────────────────────────────────────────
    operation: "renta",
    saleType: null,
    category: ["departamento"],
    city: "Cancún",
    zoneSlug: "puerto-cancun",
    developmentSlug: null,
    bedrooms: 3,
    bathrooms: 3,
    area: { built: 294, lot: null, unit: "m2" },
    status: "disponible",
    featured: false,
    seo: { title: null, description: null },

    zone: "Puerto Cancún",
    region: { es: "Puerto Cancún · Cancún", en: "Puerto Cancún · Cancún" },
    type: { es: "Departamento · Garden con terraza", en: "Apartment · Garden unit with terrace" },
    appreciation: null,

    // ── Hero info ────────────────────────────────────────────────
    price: {
      amount: 140000,
      currency: "MXN",
      display: { es: "$140,000 MXN /mes", en: "$140,000 MXN /month" },
    },
    deliveryStatus: { es: "Disponible para renta", en: "Available for rent" },
    projectType: { es: "Departamento", en: "Apartment" },

    // ── Imágenes ─────────────────────────────────────────────────
    cardImage: "/propiedades/departamento-punta-del-mar/terraza-01.webp",
    heroImage: "/propiedades/departamento-punta-del-mar/alberca-02.webp",
    gallery: [
      "/propiedades/departamento-punta-del-mar/sala-01.webp",
      "/propiedades/departamento-punta-del-mar/alberca-01.webp",
      "/propiedades/departamento-punta-del-mar/cocina-01.webp",
      "/propiedades/departamento-punta-del-mar/cocina-02.webp",
      "/propiedades/departamento-punta-del-mar/recamara-01.webp",
      "/propiedades/departamento-punta-del-mar/recamara-02.webp",
      "/propiedades/departamento-punta-del-mar/bano-01.webp",
      "/propiedades/departamento-punta-del-mar/amenidad-lounge-01.webp",
      "/propiedades/departamento-punta-del-mar/amenidad-terraza-01.webp",
      "/propiedades/departamento-punta-del-mar/amenidad-terraza-02.webp",
    ],

    cardDesc: {
      es: "Departamento garden de 3 recámaras y 294 m², con terraza y jardín, dentro de Puerto Cancún.",
      en: "3-bedroom, 294 m² garden apartment with terrace and garden, inside Puerto Cancún.",
    },
    headline: {
      es: "Departamento garden con terraza propia, dentro de Puerto Cancún.",
      en: "Garden apartment with its own terrace, inside Puerto Cancún.",
    },
    body: {
      es: [
        "Departamento Punta del Mar es una unidad garden dentro de Puerto Cancún, la zona residencial de mayor plusvalía de Cancún, con 294 m² de construcción.",
        "3 recámaras y 3 baños, con walking closet, cuarto de servicio y 2 lugares de estacionamiento. Terraza con pérgola y acceso directo al jardín.",
        "El desarrollo cuenta con alberca, gimnasio, spa, cancha de tenis y seguridad 24 horas.",
      ],
      en: [
        "Departamento Punta del Mar is a garden unit inside Puerto Cancún, Cancún's highest-appreciation residential area, with 294 m² of construction.",
        "3 bedrooms and 3 bathrooms, with a walk-in closet, staff room and 2 parking spaces. Terrace with pergola and direct garden access.",
        "The development features a pool, gym, spa, tennis court and 24-hour security.",
      ],
    },
    stats: [
      { value: "3", label: { es: "Recámaras", en: "Bedrooms" } },
      { value: "3", label: { es: "Baños", en: "Bathrooms" } },
      { value: "294m²", label: { es: "Construcción", en: "Built area" } },
      { value: "2", label: { es: "Estacionamientos", en: "Parking spaces" } },
    ],
    features: [
      { es: "Unidad garden con jardín", en: "Garden unit with garden" },
      { es: "Terraza con pérgola", en: "Terrace with pergola" },
      { es: "Walking closet", en: "Walk-in closet" },
      { es: "Cuarto de servicio", en: "Staff room" },
      { es: "2 lugares de estacionamiento", en: "2 parking spaces" },
      { es: "Dentro de Puerto Cancún", en: "Inside Puerto Cancún" },
      { es: "Alberca", en: "Pool" },
      { es: "Gimnasio", en: "Gym" },
      { es: "Spa", en: "Spa" },
      { es: "Cancha de tenis", en: "Tennis court" },
      { es: "Seguridad 24 horas", en: "24-hour security" },
    ],
  },
  {
    slug: "departamento-taina",
    kind: "property",
    published: true,
    name: "Departamento Taina",

    // ── Taxonomía ──────────────────────────────────────────────
    operation: "renta",
    saleType: null,
    category: ["departamento"],
    city: "Cancún",
    zoneSlug: "cumbres",
    developmentSlug: null,
    bedrooms: 2,
    bathrooms: 2,
    area: { built: 117, lot: null, unit: "m2" },
    status: "disponible",
    featured: false,
    seo: { title: null, description: null },

    zone: "Cumbres",
    region: { es: "Fraccionamiento Cumbres · Cancún", en: "Fraccionamiento Cumbres · Cancún" },
    type: { es: "Departamento · Piso 2, vista a la alberca", en: "Apartment · 2nd floor, pool view" },
    appreciation: null,

    // ── Hero info ────────────────────────────────────────────────
    price: {
      amount: 25000,
      currency: "MXN",
      display: { es: "$25,000 MXN /mes", en: "$25,000 MXN /month" },
    },
    deliveryStatus: { es: "Disponible para renta", en: "Available for rent" },
    projectType: { es: "Departamento", en: "Apartment" },

    // ── Imágenes ─────────────────────────────────────────────────
    cardImage: "/propiedades/departamento-taina/alberca-01.webp",
    heroImage: "/propiedades/departamento-taina/aerea-01.webp",
    gallery: [
      "/propiedades/departamento-taina/fachada-01.webp",
      "/propiedades/departamento-taina/sala-01.webp",
      "/propiedades/departamento-taina/sala-02.webp",
      "/propiedades/departamento-taina/comedor-01.webp",
      "/propiedades/departamento-taina/cocina-01.webp",
      "/propiedades/departamento-taina/cocina-02.webp",
      "/propiedades/departamento-taina/recamara-01.webp",
      "/propiedades/departamento-taina/amenidad-gym-01.webp",
      "/propiedades/departamento-taina/amenidad-padel-01.webp",
      "/propiedades/departamento-taina/amenidad-cancha-01.webp",
    ],

    cardDesc: {
      es: "Departamento de 2 recámaras y 117 m² en piso 2, con muebles nuevos y vista a la alberca, en Taina, Fraccionamiento Cumbres, Cancún.",
      en: "Furnished 2-bedroom, 117 m² apartment on the 2nd floor, with pool views, in Taina, Fraccionamiento Cumbres, Cancún.",
    },
    headline: {
      es: "Departamento con muebles nuevos y vista a la alberca, listo para entrar a vivir.",
      en: "Apartment with new furniture and pool views, move-in ready.",
    },
    body: {
      es: [
        "Departamento Taina se ubica en el piso 2, dentro de Fraccionamiento Cumbres, Cancún, con 117 m² de construcción y vista a la alberca.",
        "2 recámaras y 2 baños, con 2 lugares de estacionamiento. Se entrega con muebles nuevos.",
        "El condominio cuenta con alberca, palapa, área de asadores, gimnasio, spa y cancha de pádel. Pet friendly.",
      ],
      en: [
        "Departamento Taina is located on the 2nd floor, inside Fraccionamiento Cumbres, Cancún, with 117 m² of construction and pool views.",
        "2 bedrooms and 2 bathrooms, with 2 parking spaces. Delivered with new furniture.",
        "The condominium features a pool, palapa, grill area, gym, spa and padel court. Pet friendly.",
      ],
    },
    stats: [
      { value: "2", label: { es: "Recámaras", en: "Bedrooms" } },
      { value: "2", label: { es: "Baños", en: "Bathrooms" } },
      { value: "117m²", label: { es: "Construcción", en: "Built area" } },
      { value: "2", label: { es: "Estacionamientos", en: "Parking spaces" } },
    ],
    features: [
      { es: "Piso 2", en: "2nd floor" },
      { es: "Muebles nuevos", en: "New furniture" },
      { es: "Vista a la alberca", en: "Pool views" },
      { es: "2 lugares de estacionamiento", en: "2 parking spaces" },
      { es: "Pet friendly", en: "Pet friendly" },
      { es: "Alberca", en: "Pool" },
      { es: "Palapa", en: "Palapa" },
      { es: "Área de asadores", en: "Grill area" },
      { es: "Gimnasio", en: "Gym" },
      { es: "Spa", en: "Spa" },
      { es: "Cancha de pádel", en: "Padel court" },
    ],
  },
  {
    slug: "departamento-anah-playa",
    kind: "property",
    published: true,
    name: "Departamento Anah Playa",

    // ── Taxonomía ──────────────────────────────────────────────
    operation: "venta",
    saleType: "reventa",
    category: ["departamento"],
    city: "Playa del Carmen",
    zoneSlug: "playa-del-carmen",
    developmentSlug: null,
    bedrooms: 2,
    bathrooms: 3,
    area: { built: 195.87, lot: null, unit: "m2" },
    status: "disponible",
    featured: false,
    seo: { title: null, description: null },

    zone: "Playa del Carmen",
    region: { es: "Playa del Carmen · Riviera Maya", en: "Playa del Carmen · Riviera Maya" },
    type: { es: "Departamento · PH con roof top y jacuzzi", en: "Apartment · PH with roof top and jacuzzi" },
    appreciation: null,

    // ── Hero info ────────────────────────────────────────────────
    price: {
      amount: 7000000,
      currency: "MXN",
      display: { es: "$7,000,000 MXN", en: "$7,000,000 MXN" },
    },
    deliveryStatus: { es: "Entrega Inmediata", en: "Immediate Delivery" },
    projectType: { es: "Departamento", en: "Apartment" },

    // ── Imágenes ─────────────────────────────────────────────────
    cardImage: "/propiedades/departamento-anah-playa/terraza-01.webp",
    heroImage: "/propiedades/departamento-anah-playa/alberca-01.webp",
    gallery: [
      "/propiedades/departamento-anah-playa/roof-top-01.webp",
      "/propiedades/departamento-anah-playa/roof-top-02.webp",
      "/propiedades/departamento-anah-playa/escalera-01.webp",
      "/propiedades/departamento-anah-playa/sala-01.webp",
      "/propiedades/departamento-anah-playa/estudio-01.webp",
      "/propiedades/departamento-anah-playa/recamara-01.webp",
      "/propiedades/departamento-anah-playa/recamara-02.webp",
      "/propiedades/departamento-anah-playa/recamara-03.webp",
      "/propiedades/departamento-anah-playa/closet-01.webp",
      "/propiedades/departamento-anah-playa/bano-01.webp",
      "/propiedades/departamento-anah-playa/bano-02.webp",
    ],

    cardDesc: {
      es: "PH de 2 recámaras y estudio, con roof top privado, alberca y jacuzzi con vista al mar, en Anah, Playa del Carmen.",
      en: "2-bedroom PH with a study, private roof top, pool and jacuzzi with ocean views, in Anah, Playa del Carmen.",
    },
    headline: {
      es: "PH con roof top propio, alberca y jacuzzi con vista al mar.",
      en: "PH with its own roof top, pool and jacuzzi with ocean views.",
    },
    body: {
      es: [
        "Departamento Anah Playa es un PH distribuido en 2 pisos, con 195.87 m² de construcción, dentro de Anah, en el centro de Playa del Carmen.",
        "2 recámaras y estudio, 3 baños, área de servicio, bodega y 1 lugar de estacionamiento. Se entrega amueblado.",
        "Cuenta con roof top privado con alberca y jacuzzi con vista al mar. El edificio ofrece gimnasio, coworking y seguridad 24 horas.",
      ],
      en: [
        "Departamento Anah Playa is a PH spread across 2 floors, with 195.87 m² of construction, inside Anah, in downtown Playa del Carmen.",
        "2 bedrooms and a study, 3 bathrooms, a service area, storage room and 1 parking space. Delivered furnished.",
        "Features a private roof top with a pool and jacuzzi with ocean views. The building offers a gym, coworking space and 24-hour security.",
      ],
    },
    stats: [
      { value: "2", label: { es: "Recámaras", en: "Bedrooms" } },
      { value: "3", label: { es: "Baños", en: "Bathrooms" } },
      { value: "195.87m²", label: { es: "Construcción", en: "Built area" } },
      { value: "2", label: { es: "Pisos", en: "Floors" } },
    ],
    features: [
      { es: "PH en 2 pisos", en: "2-floor PH" },
      { es: "Estudio", en: "Study" },
      { es: "Área de servicio", en: "Service area" },
      { es: "Bodega", en: "Storage room" },
      { es: "1 lugar de estacionamiento", en: "1 parking space" },
      { es: "Se entrega amueblado", en: "Delivered furnished" },
      { es: "Roof top privado con vista al mar", en: "Private roof top with ocean views" },
      { es: "Alberca y jacuzzi", en: "Pool and jacuzzi" },
      { es: "Gimnasio", en: "Gym" },
      { es: "Coworking", en: "Coworking space" },
      { es: "Seguridad 24 horas", en: "24-hour security" },
    ],
  },
  {
    slug: "casa-sayab",
    kind: "property",
    published: true,
    name: "Casa Sayab",

    // ── Taxonomía ──────────────────────────────────────────────
    operation: "venta",
    saleType: null, // venta (no se presenta como reventa ni preventa)
    category: ["casa"],
    city: "Cancún",
    zoneSlug: "huayacan",
    developmentSlug: null,
    bedrooms: 3,
    bathrooms: 2.5,
    area: { built: 156.76, lot: 181.25, unit: "m2" },
    status: "disponible",
    featured: true,
    seo: { title: null, description: null },

    zone: "Huayacán",
    region: { es: "Sayab Residencial · Av. Huayacán · Cancún", en: "Sayab Residencial · Av. Huayacán · Cancún" },
    type: { es: "Casa · Sayab Residencial", en: "House · Sayab Residencial" },
    appreciation: null,

    // ── Hero info ────────────────────────────────────────────────
    price: {
      amount: 5100000,
      currency: "MXN",
      display: { es: "$5,100,000 MXN", en: "$5,100,000 MXN" },
    },
    deliveryStatus: { es: "Entrega Inmediata", en: "Immediate Delivery" },
    projectType: { es: "Casa", en: "House" },

    // ── Imágenes ─────────────────────────────────────────────────
    cardImage: "/propiedades/casa-sayab/fachada-01.webp",
    heroImage: "/propiedades/casa-sayab/sala-01.webp",
    gallery: [
      "/propiedades/casa-sayab/patio-01.webp",
      "/propiedades/casa-sayab/sala-02.webp",
      "/propiedades/casa-sayab/cocina-01.webp",
      "/propiedades/casa-sayab/sala-01.webp",
      "/propiedades/casa-sayab/acceso-patio-01.webp",
      "/propiedades/casa-sayab/estancia-01.webp",
      "/propiedades/casa-sayab/recamara-03.webp",
      "/propiedades/casa-sayab/vestidor-01.webp",
      "/propiedades/casa-sayab/recamara-01.webp",
      "/propiedades/casa-sayab/closets-01.webp",
      "/propiedades/casa-sayab/recamara-02.webp",
      "/propiedades/casa-sayab/bano-01.webp",
      "/propiedades/casa-sayab/bano-02.webp",
      "/propiedades/casa-sayab/medio-bano-01.webp",
      "/propiedades/casa-sayab/fachada-01.webp",
      "/propiedades/casa-sayab/alberca-01.webp",
      "/propiedades/casa-sayab/gimnasio-01.webp",
      "/propiedades/casa-sayab/area-convivencia-01.webp",
      "/propiedades/casa-sayab/terraza-alberca-01.webp",
    ],

    cardDesc: {
      es: "Casa de 3 recámaras con terreno excedente y amplio patio trasero, en Sayab Residencial, Av. Huayacán, Cancún.",
      en: "3-bedroom house with surplus land and a spacious backyard, in Sayab Residencial, Av. Huayacán, Cancún.",
    },
    headline: {
      es: "Casa con terreno excedente y amplio patio trasero, en Sayab Residencial.",
      en: "A house with surplus land and a spacious backyard, in Sayab Residencial.",
    },
    body: {
      es: [
        "Casa Sayab se ubica en Sayab Residencial, sobre Av. Huayacán en Cancún. Su gran atractivo es el terreno excedente: 181.25 m² de terreno con 156.76 m² de construcción, que se traducen en un amplio patio trasero.",
        "3 recámaras con clósets, persianas y aire acondicionado (la principal con vestidor), 2.5 baños, cocina integral equipada con isla de granito, sala-comedor, cuarto de lavado y 2 lugares de estacionamiento. Se vende sin amueblar.",
        "El residencial cuenta con alberca, gimnasio, salón de usos múltiples, área de grill, juegos infantiles y seguridad 24/7. Cerca de escuelas, supermercados, restaurantes, plazas y principales avenidas.",
      ],
      en: [
        "Casa Sayab is located in Sayab Residencial, on Av. Huayacán in Cancún. Its standout feature is the surplus land: a 181.25 m² lot with 156.76 m² of construction, which means a spacious backyard.",
        "3 bedrooms with closets, blinds and air conditioning (the primary with a walk-in closet), 2.5 bathrooms, a fully equipped kitchen with a granite island, living-dining room, laundry room and 2 parking spaces. Sold unfurnished.",
        "The community features a pool, gym, multipurpose room, grill area, playground and 24/7 security. Close to schools, supermarkets, restaurants, shopping centers and main avenues.",
      ],
    },
    stats: [
      { value: "3", label: { es: "Recámaras", en: "Bedrooms" } },
      { value: "2.5", label: { es: "Baños", en: "Bathrooms" } },
      { value: "157m²", label: { es: "Construcción", en: "Built area" } },
      { value: "181m²", label: { es: "Terreno", en: "Lot size" } },
    ],
    features: [
      { es: "Terreno excedente con amplio patio trasero", en: "Surplus land with a spacious backyard" },
      { es: "Recámara principal con vestidor", en: "Primary bedroom with walk-in closet" },
      { es: "Recámaras con clósets, persianas y A/A", en: "Bedrooms with closets, blinds and A/C" },
      { es: "Cocina integral con isla de granito", en: "Equipped kitchen with granite island" },
      { es: "Cuarto de lavado", en: "Laundry room" },
      { es: "2 lugares de estacionamiento", en: "2 parking spaces" },
      { es: "Se vende sin amueblar", en: "Sold unfurnished" },
      { es: "Seguridad 24/7", en: "24/7 security" },
      { es: "Salón de usos múltiples, área de grill y juegos infantiles", en: "Multipurpose room, grill area and playground" },
    ],
    amenities: [
      {
        id: "alberca",
        title: { es: "Alberca", en: "Pool" },
        desc: { es: "Alberca del residencial con camastros y áreas verdes.", en: "Community pool with loungers and green areas." },
        image: "/propiedades/casa-sayab/alberca-01.webp",
      },
      {
        id: "gimnasio",
        title: { es: "Gimnasio", en: "Gym" },
        desc: { es: "Gimnasio equipado con vista a las áreas verdes.", en: "Equipped gym overlooking the green areas." },
        image: "/propiedades/casa-sayab/gimnasio-01.webp",
      },
      {
        id: "convivencia",
        title: { es: "Área de convivencia", en: "Social area" },
        desc: { es: "Espacio techado con salas para reunirse.", en: "Covered space with lounge seating to get together." },
        image: "/propiedades/casa-sayab/area-convivencia-01.webp",
      },
      {
        id: "terraza",
        title: { es: "Terraza junto a la alberca", en: "Poolside terrace" },
        desc: { es: "Terraza con sombrilla y salas junto a la alberca.", en: "Terrace with umbrella and lounge seating by the pool." },
        image: "/propiedades/casa-sayab/terraza-alberca-01.webp",
      },
    ],
  },
  {
    slug: "casa-lagos-del-sol",
    kind: "property",
    published: true,
    name: "Casa Lagos del Sol",

    // ── Taxonomía ──────────────────────────────────────────────
    operation: "venta",
    saleType: null, // venta (no se presenta como reventa ni preventa)
    category: ["casa"],
    city: "Cancún",
    zoneSlug: "lagos-del-sol",
    developmentSlug: null,
    bedrooms: 3,
    bathrooms: 3.5,
    area: { built: 300, lot: 400, unit: "m2" },
    status: "disponible",
    featured: false,
    seo: { title: null, description: null },

    zone: "Lagos del Sol",
    region: { es: "Lagos del Sol · Cancún", en: "Lagos del Sol · Cancún" },
    type: { es: "Casa · Alberca y jacuzzi", en: "House · Pool and hot tub" },
    appreciation: null,

    // ── Hero info ────────────────────────────────────────────────
    price: {
      amount: 14500000,
      currency: "MXN",
      display: { es: "$14,500,000 MXN", en: "$14,500,000 MXN" },
    },
    deliveryStatus: { es: "Entrega Inmediata", en: "Immediate Delivery" },
    projectType: { es: "Casa", en: "House" },

    // ── Imágenes ─────────────────────────────────────────────────
    cardImage: "/propiedades/casa-lagos-del-sol/tarjeta-01.webp",
    heroImage: "/propiedades/casa-lagos-del-sol/portada-01.webp",
    gallery: [
      "/propiedades/casa-lagos-del-sol/alberca-02.webp",
      "/propiedades/casa-lagos-del-sol/comedor-01.webp",
      "/propiedades/casa-lagos-del-sol/sala-01.webp",
      "/propiedades/casa-lagos-del-sol/sala-02.webp",
      "/propiedades/casa-lagos-del-sol/doble-altura-01.webp",
      "/propiedades/casa-lagos-del-sol/cocina-01.webp",
      "/propiedades/casa-lagos-del-sol/cocina-02.webp",
      "/propiedades/casa-lagos-del-sol/bar-01.webp",
      "/propiedades/casa-lagos-del-sol/terraza-alberca-01.webp",
      "/propiedades/casa-lagos-del-sol/alberca-01.webp",
      "/propiedades/casa-lagos-del-sol/recamara-01.webp",
      "/propiedades/casa-lagos-del-sol/cuarto-tv-01.webp",
      "/propiedades/casa-lagos-del-sol/recamara-02.webp",
      "/propiedades/casa-lagos-del-sol/vestidor-01.webp",
      "/propiedades/casa-lagos-del-sol/terraza-jacuzzi-01.webp",
      "/propiedades/casa-lagos-del-sol/recamara-03.webp",
      "/propiedades/casa-lagos-del-sol/bano-01.webp",
      "/propiedades/casa-lagos-del-sol/bano-02.webp",
      "/propiedades/casa-lagos-del-sol/bano-03.webp",
      "/propiedades/casa-lagos-del-sol/jardin-01.webp",
      "/propiedades/casa-lagos-del-sol/fachada-01.webp",
    ],

    cardDesc: {
      es: "Casa de 3 recámaras y 3.5 baños con alberca, jacuzzi y terraza, en Lagos del Sol, Cancún. Se vende con o sin muebles.",
      en: "3-bedroom, 3.5-bath house with pool, hot tub and terrace, in Lagos del Sol, Cancún. Sold furnished or unfurnished.",
    },
    headline: {
      es: "Casa con alberca, jacuzzi y doble altura, en Lagos del Sol.",
      en: "A house with a pool, hot tub and double-height ceilings, in Lagos del Sol.",
    },
    body: {
      es: [
        "Casa Lagos del Sol se ubica en el fraccionamiento Lagos del Sol, en Cancún, con 300 m² de construcción sobre un terreno de 400 m².",
        "3 recámaras (una en planta baja), 3.5 baños, cuarto de TV y 2 lugares de estacionamiento. La sala-comedor a doble altura se abre al jardín y a la alberca; en el exterior también hay jacuzzi y terraza.",
        "Se vende con o sin muebles. El fraccionamiento cuenta con alberca, casa club, jardín y seguridad 24 horas.",
      ],
      en: [
        "Casa Lagos del Sol is located in the Lagos del Sol community in Cancún, with 300 m² of construction on a 400 m² lot.",
        "3 bedrooms (one on the ground floor), 3.5 bathrooms, a TV room and 2 parking spaces. The double-height living-dining room opens onto the garden and pool; outside there is also a hot tub and a terrace.",
        "Sold furnished or unfurnished. The community features a pool, clubhouse, garden and 24-hour security.",
      ],
    },
    stats: [
      { value: "3", label: { es: "Recámaras", en: "Bedrooms" } },
      { value: "3.5", label: { es: "Baños", en: "Bathrooms" } },
      { value: "300m²", label: { es: "Construcción", en: "Built area" } },
      { value: "400m²", label: { es: "Terreno", en: "Lot size" } },
    ],
    features: [
      { es: "Alberca, jacuzzi y terraza", en: "Pool, hot tub and terrace" },
      { es: "Sala-comedor a doble altura", en: "Double-height living-dining room" },
      { es: "Recámara en planta baja", en: "Ground-floor bedroom" },
      { es: "Cuarto de TV", en: "TV room" },
      { es: "2 lugares de estacionamiento", en: "2 parking spaces" },
      { es: "Se vende con o sin muebles", en: "Sold furnished or unfurnished" },
      { es: "Fraccionamiento con alberca, casa club y jardín", en: "Community with pool, clubhouse and garden" },
      { es: "Seguridad 24 horas", en: "24-hour security" },
    ],
  },
  {
    slug: "departamento-residencial-cobalto",
    kind: "property",
    published: true,
    name: "Departamento Residencial Cobalto",

    // ── Taxonomía ──────────────────────────────────────────────
    operation: "renta",
    saleType: null,
    category: ["departamento"],
    city: "Cancún",
    zoneSlug: "supermanzana-13",
    developmentSlug: null,
    bedrooms: 3,
    bathrooms: 5,
    area: { built: 182, lot: null, unit: "m2" },
    status: "disponible",
    featured: false,
    seo: { title: null, description: null },

    zone: "Supermanzana 13",
    region: { es: "Residencial Cobalto · Av. Nizuc, SM 13 · Cancún", en: "Residencial Cobalto · Av. Nizuc, SM 13 · Cancún" },
    type: { es: "Departamento · Terraza de 16.5 m²", en: "Apartment · 16.5 m² terrace" },
    appreciation: null,

    // ── Hero info ────────────────────────────────────────────────
    price: {
      amount: 36000,
      currency: "MXN",
      display: { es: "$36,000 MXN /mes", en: "$36,000 MXN /month" },
    },
    deliveryStatus: { es: "Mantenimiento incluido", en: "Maintenance included" },
    projectType: { es: "Departamento", en: "Apartment" },

    // ── Imágenes ─────────────────────────────────────────────────
    cardImage: "/propiedades/departamento-residencial-cobalto/alberca-02.webp",
    heroImage: "/propiedades/departamento-residencial-cobalto/sala-terraza-01.webp",
    gallery: [
      "/propiedades/departamento-residencial-cobalto/sala-comedor-01.webp",
      "/propiedades/departamento-residencial-cobalto/alberca-01.webp",
      "/propiedades/departamento-residencial-cobalto/recamara-01.webp",
      "/propiedades/departamento-residencial-cobalto/sala-02.webp",
      "/propiedades/departamento-residencial-cobalto/cocina-01.webp",
      "/propiedades/departamento-residencial-cobalto/cocina-02.webp",
      "/propiedades/departamento-residencial-cobalto/recamara-02.webp",
      "/propiedades/departamento-residencial-cobalto/vestidor-01.webp",
      "/propiedades/departamento-residencial-cobalto/bano-principal-01.webp",
      "/propiedades/departamento-residencial-cobalto/recamara-03.webp",
      "/propiedades/departamento-residencial-cobalto/recamara-04.webp",
      "/propiedades/departamento-residencial-cobalto/bano-01.webp",
      "/propiedades/departamento-residencial-cobalto/cuarto-servicio-01.webp",
      "/propiedades/departamento-residencial-cobalto/jardines-01.webp",
      "/propiedades/departamento-residencial-cobalto/alberca-02.webp",
      "/propiedades/departamento-residencial-cobalto/gimnasio-01.webp",
      "/propiedades/departamento-residencial-cobalto/salon-fiestas-01.webp",
      "/propiedades/departamento-residencial-cobalto/edificio-01.webp",
    ],

    cardDesc: {
      es: "Departamento de 3 recámaras y 5 baños con terraza, en renta con mantenimiento incluido, en Residencial Cobalto, Av. Nizuc, Cancún.",
      en: "3-bedroom, 5-bathroom apartment with a terrace, for rent with maintenance included, in Residencial Cobalto, Av. Nizuc, Cancún.",
    },
    headline: {
      es: "Departamento amplio con terraza y vista a jardines y alberca, en Residencial Cobalto.",
      en: "A spacious apartment with a terrace overlooking the gardens and pool, in Residencial Cobalto.",
    },
    body: {
      es: [
        "Departamento en renta en Residencial Cobalto, sobre Av. Nizuc en la Supermanzana 13 de Cancún, con 182 m² y una terraza de 16.5 m² con vista a los jardines y la alberca del residencial.",
        "3 recámaras, 5 baños completos, sala, comedor, área de TV, cocina integral, área de lavado y cuarto de servicio. 2 lugares de estacionamiento y 2 bodegas.",
        "El residencial cuenta con alberca, gimnasio, jardines, área infantil y salón de fiestas. Renta de $36,000 MXN al mes con mantenimiento incluido.",
      ],
      en: [
        "Apartment for rent in Residencial Cobalto, on Av. Nizuc in Supermanzana 13, Cancún, with 182 m² and a 16.5 m² terrace overlooking the community's gardens and pool.",
        "3 bedrooms, 5 full bathrooms, living room, dining room, TV area, fitted kitchen, laundry area and staff room. 2 parking spaces and 2 storage rooms.",
        "The community features a pool, gym, gardens, kids' area and party room. Rent of $36,000 MXN per month with maintenance included.",
      ],
    },
    stats: [
      { value: "3", label: { es: "Recámaras", en: "Bedrooms" } },
      { value: "5", label: { es: "Baños", en: "Bathrooms" } },
      { value: "182m²", label: { es: "Superficie", en: "Area" } },
      { value: "16.5m²", label: { es: "Terraza", en: "Terrace" } },
    ],
    features: [
      { es: "Mantenimiento incluido en la renta", en: "Maintenance included in the rent" },
      { es: "Terraza de 16.5 m² con vista a jardines y alberca", en: "16.5 m² terrace overlooking gardens and pool" },
      { es: "5 baños completos", en: "5 full bathrooms" },
      { es: "Recámara principal con vestidor", en: "Primary bedroom with walk-in closet" },
      { es: "Cocina integral con isla", en: "Fitted kitchen with island" },
      { es: "Área de TV, área de lavado y cuarto de servicio", en: "TV area, laundry area and staff room" },
      { es: "2 lugares de estacionamiento y 2 bodegas", en: "2 parking spaces and 2 storage rooms" },
      { es: "Alberca, gimnasio, jardines, área infantil y salón de fiestas", en: "Pool, gym, gardens, kids' area and party room" },
    ],
    amenities: [
      {
        id: "alberca",
        title: { es: "Alberca", en: "Pool" },
        desc: { es: "Alberca con área techada, camastros y mesas, rodeada de jardines.", en: "Pool with a shaded area, loungers and tables, surrounded by gardens." },
        image: "/propiedades/departamento-residencial-cobalto/alberca-02.webp",
      },
      {
        id: "jardines",
        title: { es: "Jardines", en: "Gardens" },
        desc: { es: "Amplias áreas verdes con andadores dentro del residencial.", en: "Large green areas with walkways inside the community." },
        image: "/propiedades/departamento-residencial-cobalto/jardines-01.webp",
      },
      {
        id: "gimnasio",
        title: { es: "Gimnasio", en: "Gym" },
        desc: { es: "Gimnasio equipado con vista a los jardines.", en: "Equipped gym overlooking the gardens." },
        image: "/propiedades/departamento-residencial-cobalto/gimnasio-01.webp",
      },
      {
        id: "salon",
        title: { es: "Salón de fiestas", en: "Party room" },
        desc: { es: "Salón amplio a doble altura para reuniones y eventos.", en: "Large double-height room for gatherings and events." },
        image: "/propiedades/departamento-residencial-cobalto/salon-fiestas-01.webp",
      },
    ],
  },
  {
    slug: "departamento-lirios",
    kind: "property",
    published: true,
    name: "Departamento Lirios Residencial",

    // ── Taxonomía ──────────────────────────────────────────────
    operation: "renta",
    saleType: null,
    category: ["departamento"],
    city: "Cancún",
    zoneSlug: "poligono-sur",
    developmentSlug: null,
    bedrooms: 3,
    bathrooms: 2.5,
    area: { built: null, lot: null, unit: "m2" },
    status: "disponible",
    featured: false,
    seo: { title: null, description: null },

    zone: "Polígono Sur",
    region: { es: "Lirios Residencial · Polígono Sur · Cancún", en: "Lirios Residencial · Polígono Sur · Cancún" },
    type: { es: "Departamento amueblado · Piso 2", en: "Furnished apartment · 2nd floor" },
    appreciation: null,

    // ── Hero info ────────────────────────────────────────────────
    price: {
      amount: 20000,
      currency: "MXN",
      display: { es: "$20,000 MXN /mes", en: "$20,000 MXN /month" },
    },
    deliveryStatus: { es: "Mantenimiento incluido", en: "Maintenance included" },
    projectType: { es: "Departamento amueblado", en: "Furnished apartment" },

    // ── Imágenes ─────────────────────────────────────────────────
    cardImage: "/propiedades/departamento-lirios/comedor-01.webp",
    heroImage: "/propiedades/departamento-lirios/sala-01.webp",
    gallery: [
      "/propiedades/departamento-lirios/comedor-01.webp",
      "/propiedades/departamento-lirios/cocina-01.webp",
      "/propiedades/departamento-lirios/recamara-01.webp",
      "/propiedades/departamento-lirios/sala-01.webp",
      "/propiedades/departamento-lirios/cocina-02.webp",
      "/propiedades/departamento-lirios/recamara-02.webp",
      "/propiedades/departamento-lirios/recamara-03.webp",
      "/propiedades/departamento-lirios/recamara-04.webp",
      "/propiedades/departamento-lirios/recamara-05.webp",
      "/propiedades/departamento-lirios/bano-01.webp",
      "/propiedades/departamento-lirios/bano-02.webp",
      "/propiedades/departamento-lirios/medio-bano-01.webp",
      "/propiedades/departamento-lirios/lavanderia-01.webp",
    ],

    cardDesc: {
      es: "Departamento amueblado de 3 recámaras y 2.5 baños, en renta con mantenimiento incluido, en Lirios Residencial, Polígono Sur, Cancún.",
      en: "Furnished 3-bedroom, 2.5-bathroom apartment for rent with maintenance included, in Lirios Residencial, Polígono Sur, Cancún.",
    },
    headline: {
      es: "Departamento amueblado, listo para habitar, en un residencial con alberca, gimnasio y seguridad 24/7.",
      en: "A furnished, move-in-ready apartment in a community with a pool, gym and 24/7 security.",
    },
    body: {
      es: [
        "Departamento en renta en Lirios Residencial, en el Polígono Sur de Cancún, en el piso 2, amueblado y equipado con aire acondicionado y cortinas.",
        "3 recámaras, 2.5 baños, sala, comedor con balcón, cocina integral con barra y área de lavado. 1 lugar de estacionamiento.",
        "El residencial cuenta con alberca, gimnasio, salón de eventos, área de juegos y seguridad 24/7. Renta de $20,000 MXN al mes con mantenimiento incluido. No se aceptan mascotas.",
      ],
      en: [
        "Apartment for rent in Lirios Residencial, in Cancún's Polígono Sur, on the 2nd floor, furnished and equipped with air conditioning and curtains.",
        "3 bedrooms, 2.5 bathrooms, living room, dining room with balcony, fitted kitchen with breakfast bar and laundry area. 1 parking space.",
        "The community features a pool, gym, event room, play area and 24/7 security. Rent of $20,000 MXN per month with maintenance included. No pets allowed.",
      ],
    },
    stats: [
      { value: "3", label: { es: "Recámaras", en: "Bedrooms" } },
      { value: "2.5", label: { es: "Baños", en: "Bathrooms" } },
      { value: "2", label: { es: "Piso", en: "Floor" } },
      { value: "1", label: { es: "Estacionamiento", en: "Parking" } },
    ],
    features: [
      { es: "Mantenimiento incluido en la renta", en: "Maintenance included in the rent" },
      { es: "Amueblado", en: "Furnished" },
      { es: "Aire acondicionado y cortinas", en: "Air conditioning and curtains" },
      { es: "Cocina integral con barra", en: "Fitted kitchen with breakfast bar" },
      { es: "Área de lavado", en: "Laundry area" },
      { es: "1 lugar de estacionamiento", en: "1 parking space" },
      { es: "Alberca, gimnasio, salón de eventos y área de juegos", en: "Pool, gym, event room and play area" },
      { es: "Seguridad 24/7", en: "24/7 security" },
      { es: "No se aceptan mascotas", en: "No pets allowed" },
    ],
    amenities: [],
  },
  {
    slug: "departamento-cumbres-towers-piso-7",
    kind: "property",
    published: true,
    name: "Departamento Cumbres Towers Piso 7",

    // ── Taxonomía ──────────────────────────────────────────────
    operation: "renta",
    saleType: null,
    category: ["departamento"],
    city: "Cancún",
    zoneSlug: "cumbres",
    developmentSlug: null,
    bedrooms: 3,
    bathrooms: 3,
    area: { built: 160, lot: null, unit: "m2" },
    status: "disponible",
    featured: false,
    seo: { title: null, description: null },

    zone: "Cumbres",
    region: { es: "Cumbres Towers · Residencial Cumbres · Cancún", en: "Cumbres Towers · Residencial Cumbres · Cancún" },
    type: { es: "Departamento · Piso 7 · Terraza", en: "Apartment · 7th floor · Terrace" },
    appreciation: null,

    // ── Hero info ────────────────────────────────────────────────
    price: {
      amount: 36000,
      currency: "MXN",
      display: { es: "$36,000 MXN /mes", en: "$36,000 MXN /month" },
    },
    deliveryStatus: { es: "Mantenimiento incluido", en: "Maintenance included" },
    projectType: { es: "Departamento sin muebles", en: "Unfurnished apartment" },

    // ── Imágenes ─────────────────────────────────────────────────
    cardImage: "/propiedades/departamento-cumbres-towers-piso-7/sala-cocina-01.webp",
    heroImage: "/propiedades/departamento-cumbres-towers-piso-7/sala-cocina-01.webp",
    gallery: [
      "/propiedades/departamento-cumbres-towers-piso-7/sala-cocina-01.webp",
      "/propiedades/departamento-cumbres-towers-piso-7/cocina-01.webp",
      "/propiedades/departamento-cumbres-towers-piso-7/recamara-principal-01.webp",
      "/propiedades/departamento-cumbres-towers-piso-7/terraza-01.webp",
      "/propiedades/departamento-cumbres-towers-piso-7/sala-01.webp",
      "/propiedades/departamento-cumbres-towers-piso-7/vestidor-01.webp",
      "/propiedades/departamento-cumbres-towers-piso-7/bano-principal-01.webp",
      "/propiedades/departamento-cumbres-towers-piso-7/recamara-02.webp",
      "/propiedades/departamento-cumbres-towers-piso-7/recamara-03.webp",
      "/propiedades/departamento-cumbres-towers-piso-7/bano-01.webp",
      "/propiedades/departamento-cumbres-towers-piso-7/pasillo-01.webp",
      "/propiedades/departamento-cumbres-towers-piso-7/vestibulo-01.webp",
      "/propiedades/departamento-cumbres-towers-piso-7/alberca-01.webp",
      "/propiedades/departamento-cumbres-towers-piso-7/alberca-02.webp",
      "/propiedades/departamento-cumbres-towers-piso-7/area-infantil-01.webp",
      "/propiedades/departamento-cumbres-towers-piso-7/business-center-01.webp",
      "/propiedades/departamento-cumbres-towers-piso-7/edificio-01.webp",
    ],

    cardDesc: {
      es: "Departamento de 3 recámaras, 3 baños y 160 m² en el piso 7, con terraza, en renta con mantenimiento incluido, en Cumbres Towers, Cancún.",
      en: "3-bedroom, 3-bathroom, 160 m² apartment on the 7th floor with a terrace, for rent with maintenance included, in Cumbres Towers, Cancún.",
    },
    headline: {
      es: "Departamento amplio en el piso 7 de Cumbres Towers, con terraza y vista abierta.",
      en: "A spacious 7th-floor apartment in Cumbres Towers, with a terrace and open views.",
    },
    body: {
      es: [
        "Departamento en renta en el piso 7 de Cumbres Towers, dentro de Residencial Cumbres en Cancún, con 160 m² de construcción y terraza con vista abierta.",
        "3 recámaras y 3 baños; la recámara principal con vestidor. Sala y comedor integrados con cocina con isla, acabados en mármol travertino y aire acondicionado. Se renta sin muebles, con 2 lugares de estacionamiento.",
        "La torre cuenta con alberca, palapa, área infantil, business center y gimnasio, y es pet friendly. Renta de $36,000 MXN al mes con mantenimiento incluido.",
      ],
      en: [
        "Apartment for rent on the 7th floor of Cumbres Towers, inside Residencial Cumbres in Cancún, with 160 m² of construction and a terrace with open views.",
        "3 bedrooms and 3 bathrooms; the primary bedroom has a walk-in closet. Open-plan living and dining area with a kitchen island, travertine marble finishes and air conditioning. Rented unfurnished, with 2 parking spaces.",
        "The tower features a pool, palapa, kids' area, business center and gym, and is pet friendly. Rent of $36,000 MXN per month with maintenance included.",
      ],
    },
    stats: [
      { value: "3", label: { es: "Recámaras", en: "Bedrooms" } },
      { value: "3", label: { es: "Baños", en: "Bathrooms" } },
      { value: "160m²", label: { es: "Construcción", en: "Built area" } },
      { value: "7", label: { es: "Piso", en: "Floor" } },
    ],
    features: [
      { es: "Mantenimiento incluido en la renta", en: "Maintenance included in the rent" },
      { es: "Terraza con vista abierta", en: "Terrace with open views" },
      { es: "Recámara principal con vestidor", en: "Primary bedroom with walk-in closet" },
      { es: "Cocina con isla", en: "Kitchen with island" },
      { es: "Pisos de mármol travertino", en: "Travertine marble floors" },
      { es: "Aire acondicionado", en: "Air conditioning" },
      { es: "2 lugares de estacionamiento", en: "2 parking spaces" },
      { es: "Se renta sin muebles", en: "Rented unfurnished" },
      { es: "Alberca, palapa, área infantil, business center y gimnasio", en: "Pool, palapa, kids' area, business center and gym" },
      { es: "Pet friendly", en: "Pet friendly" },
    ],
    amenities: [
      {
        id: "alberca",
        title: { es: "Alberca", en: "Pool" },
        desc: { es: "Alberca rodeada de jardín, con camastros y sombrillas.", en: "Pool surrounded by gardens, with loungers and umbrellas." },
        image: "/propiedades/departamento-cumbres-towers-piso-7/alberca-01.webp",
      },
      {
        id: "area-infantil",
        title: { es: "Área infantil", en: "Kids' area" },
        desc: { es: "Juegos infantiles con sombra sobre pasto.", en: "Shaded play structure on a lawn." },
        image: "/propiedades/departamento-cumbres-towers-piso-7/area-infantil-01.webp",
      },
      {
        id: "business-center",
        title: { es: "Business Center", en: "Business Center" },
        desc: { es: "Lounge y sala de juntas para trabajar o recibir visitas.", en: "Lounge and meeting room to work or host guests." },
        image: "/propiedades/departamento-cumbres-towers-piso-7/business-center-01.webp",
      },
    ],
  },
  {
    slug: "departamento-areka-piso-9",
    kind: "property",
    published: true,
    name: "Departamento Areka Piso 9",

    // ── Taxonomía ──────────────────────────────────────────────
    operation: "renta",
    saleType: null,
    category: ["departamento"],
    city: "Cancún",
    zoneSlug: "areka-towers",
    developmentSlug: null,
    bedrooms: 3,
    bathrooms: 2.5,
    area: { built: 158, lot: null, unit: "m2" },
    status: "disponible",
    featured: false,
    seo: { title: null, description: null },

    zone: "Areka Towers",
    region: { es: "Areka Towers · Cancún", en: "Areka Towers · Cancún" },
    type: { es: "Departamento · Piso 9 · Vista al atardecer", en: "Apartment · 9th floor · Sunset views" },
    appreciation: null,

    // ── Hero info ────────────────────────────────────────────────
    price: {
      amount: 26000,
      currency: "MXN",
      display: { es: "$26,000 MXN /mes", en: "$26,000 MXN /month" },
    },
    deliveryStatus: { es: "Sin muebles", en: "Unfurnished" },
    projectType: { es: "Departamento", en: "Apartment" },

    // ── Imágenes ─────────────────────────────────────────────────
    cardImage: "/propiedades/departamento-areka-piso-9/terraza-atardecer-01.webp",
    heroImage: "/propiedades/departamento-areka-piso-9/terraza-01.webp",
    gallery: [
      "/propiedades/departamento-areka-piso-9/terraza-atardecer-01.webp",
      "/propiedades/departamento-areka-piso-9/sala-comedor-01.webp",
      "/propiedades/departamento-areka-piso-9/cocina-01.webp",
      "/propiedades/departamento-areka-piso-9/recamara-principal-01.webp",
      "/propiedades/departamento-areka-piso-9/terraza-01.webp",
      "/propiedades/departamento-areka-piso-9/sala-cocina-01.webp",
      "/propiedades/departamento-areka-piso-9/sala-terraza-01.webp",
      "/propiedades/departamento-areka-piso-9/cocina-02.webp",
      "/propiedades/departamento-areka-piso-9/vestidor-01.webp",
      "/propiedades/departamento-areka-piso-9/bano-principal-01.webp",
      "/propiedades/departamento-areka-piso-9/recamara-02.webp",
      "/propiedades/departamento-areka-piso-9/recamara-03.webp",
      "/propiedades/departamento-areka-piso-9/recamara-04.webp",
      "/propiedades/departamento-areka-piso-9/bano-01.webp",
      "/propiedades/departamento-areka-piso-9/medio-bano-01.webp",
      "/propiedades/departamento-areka-piso-9/lavanderia-01.webp",
      "/propiedades/departamento-areka-piso-9/terraza-02.webp",
      "/propiedades/departamento-areka-piso-9/vista-01.webp",
      "/propiedades/departamento-areka-piso-9/vista-02.webp",
      "/propiedades/departamento-areka-piso-9/alberca-01.webp",
      "/propiedades/departamento-areka-piso-9/jardines-01.webp",
      "/propiedades/departamento-areka-piso-9/palapa-01.webp",
      "/propiedades/departamento-areka-piso-9/asador-01.webp",
      "/propiedades/departamento-areka-piso-9/area-juegos-01.webp",
    ],

    cardDesc: {
      es: "Departamento de 3 recámaras, 2.5 baños y 158 m² en el piso 9, con terraza y vista al atardecer, en renta en Areka Towers, Cancún.",
      en: "3-bedroom, 2.5-bathroom, 158 m² apartment on the 9th floor with a terrace and sunset views, for rent in Areka Towers, Cancún.",
    },
    headline: {
      es: "Departamento en el piso 9 de Areka Towers, con terraza y vista abierta a la selva y al atardecer.",
      en: "A 9th-floor apartment in Areka Towers, with a terrace and open views of the jungle and the sunset.",
    },
    body: {
      es: [
        "Departamento en renta en el piso 9 de Areka Towers, Cancún, con 158 m² de construcción y una terraza con vista abierta a la selva y al atardecer.",
        "3 recámaras y 2.5 baños; la recámara principal con acceso a la terraza, vestidor y baño con doble lavabo. Sala y comedor integrados con cocina con barra, clósets de madera, aire acondicionado y cuarto de lavado. Se renta sin muebles, con 2 lugares de estacionamiento.",
        "La torre cuenta con alberca, palapa con asador, roof top y gimnasio, y es pet friendly. Renta de $26,000 MXN al mes.",
      ],
      en: [
        "Apartment for rent on the 9th floor of Areka Towers, Cancún, with 158 m² of construction and a terrace with open views of the jungle and the sunset.",
        "3 bedrooms and 2.5 bathrooms; the primary bedroom has terrace access, a walk-in closet and a bathroom with double sinks. Open-plan living and dining area with a kitchen bar, wooden closets, air conditioning and a laundry room. Rented unfurnished, with 2 parking spaces.",
        "The tower features a pool, palapa with grill, rooftop and gym, and is pet friendly. Rent of $26,000 MXN per month.",
      ],
    },
    stats: [
      { value: "3", label: { es: "Recámaras", en: "Bedrooms" } },
      { value: "2.5", label: { es: "Baños", en: "Bathrooms" } },
      { value: "158m²", label: { es: "Construcción", en: "Built area" } },
      { value: "9", label: { es: "Piso", en: "Floor" } },
    ],
    features: [
      { es: "Terraza con vista al atardecer", en: "Terrace with sunset views" },
      { es: "Recámara principal con acceso a la terraza y vestidor", en: "Primary bedroom with terrace access and walk-in closet" },
      { es: "Baño principal con doble lavabo", en: "Primary bathroom with double sinks" },
      { es: "Cocina con barra", en: "Kitchen with breakfast bar" },
      { es: "Clósets de madera y aire acondicionado", en: "Wooden closets and air conditioning" },
      { es: "Cuarto de lavado", en: "Laundry room" },
      { es: "2 lugares de estacionamiento", en: "2 parking spaces" },
      { es: "Se renta sin muebles", en: "Rented unfurnished" },
      { es: "Alberca, palapa con asador, roof top y gimnasio", en: "Pool, palapa with grill, rooftop and gym" },
      { es: "Pet friendly", en: "Pet friendly" },
    ],
    amenities: [
      {
        id: "alberca",
        title: { es: "Alberca", en: "Pool" },
        desc: { es: "Alberca con camastros y sombrillas, rodeada de jardines.", en: "Pool with loungers and umbrellas, surrounded by gardens." },
        image: "/propiedades/departamento-areka-piso-9/alberca-01.webp",
      },
      {
        id: "palapa",
        title: { es: "Palapa y asador", en: "Palapa and grill" },
        desc: { es: "Área techada con mesas y asador para reuniones.", en: "Covered area with tables and a grill for gatherings." },
        image: "/propiedades/departamento-areka-piso-9/palapa-01.webp",
      },
      {
        id: "jardines",
        title: { es: "Jardines", en: "Gardens" },
        desc: { es: "Andadores entre jardines tropicales en planta baja.", en: "Walkways through tropical gardens on the ground floor." },
        image: "/propiedades/departamento-areka-piso-9/jardines-01.webp",
      },
      {
        id: "area-juegos",
        title: { es: "Área de juegos", en: "Play area" },
        desc: { es: "Juegos infantiles junto a la palapa.", en: "Playground next to the palapa." },
        image: "/propiedades/departamento-areka-piso-9/area-juegos-01.webp",
      },
    ],
  },
];

export function getProperty(slug) {
  return properties.find((p) => p.slug === slug);
}
