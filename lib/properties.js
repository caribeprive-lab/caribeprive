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
    type: { es: "Departamento · Piso 2, amueblado", en: "Apartment · 2nd floor, furnished" },
    appreciation: null,

    // ── Hero info ────────────────────────────────────────────────
    price: {
      amount: 5700000,
      currency: "MXN",
      display: { es: "$5,700,000 MXN", en: "$5,700,000 MXN" },
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
      es: "Departamento de 3 recámaras y 158 m² en piso 2, amueblado, en Residencial Solai, Cancún.",
      en: "Furnished 3-bedroom, 158 m² apartment on the 2nd floor, in Residencial Solai, Cancún.",
    },
    headline: {
      es: "Departamento amueblado en piso 2, listo para entrar a vivir o invertir.",
      en: "Furnished 2nd-floor apartment, move-in or investment ready.",
    },
    body: {
      es: [
        "Departamento Solai D-2 se ubica en Residencial Solai, Cancún, en el piso 2, con 158 m² de construcción.",
        "3 recámaras y 3 baños, 2 lugares de estacionamiento y bodega. Se entrega amueblado.",
        "El condominio cuenta con alberca, palapa, jardín y seguridad 24 horas.",
      ],
      en: [
        "Departamento Solai D-2 is located in Residencial Solai, Cancún, on the 2nd floor, with 158 m² of construction.",
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
      amount: 8200000,
      currency: "MXN",
      display: { es: "$8,200,000 MXN", en: "$8,200,000 MXN" },
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
    slug: "central-park-towers-1101",
    kind: "property",
    published: true,
    name: "Central Park Towers 1101",

    // ── Taxonomía ──────────────────────────────────────────────
    operation: "venta",
    saleType: "reventa",
    category: ["departamento"],
    city: "Cancún",
    zoneSlug: "malecon-cancun",
    developmentSlug: null,
    bedrooms: 3,
    bathrooms: null,
    area: { built: 240, lot: null, unit: "m2" },
    status: "disponible",
    featured: false,
    seo: { title: null, description: null },

    zone: "Malecón Cancún",
    region: { es: "Malecón Cancún · Cancún", en: "Malecón Cancún · Cancún" },
    type: { es: "Departamento · Piso 11, vista panorámica", en: "Apartment · 11th floor, panoramic views" },
    appreciation: null,

    // ── Hero info ────────────────────────────────────────────────
    price: {
      amount: 12900000,
      currency: "MXN",
      display: {
        es: "$12,900,000 MXN (venta) · $47,000 MXN/mes (renta)",
        en: "$12,900,000 MXN (sale) · $47,000 MXN/month (rent)",
      },
    },
    rentPrice: {
      amount: 47000,
      currency: "MXN",
      display: { es: "$47,000 MXN /mes", en: "$47,000 MXN /month" },
    },
    deliveryStatus: { es: "Entrega Inmediata", en: "Immediate Delivery" },
    projectType: { es: "Departamento", en: "Apartment" },

    // ── Imágenes ─────────────────────────────────────────────────
    cardImage: "/propiedades/central-park-towers-1101/terraza-02.webp",
    heroImage: "/propiedades/central-park-towers-1101/exterior-01.webp",
    gallery: [
      "/propiedades/central-park-towers-1101/sala-01.webp",
      "/propiedades/central-park-towers-1101/cocina-01.webp",
      "/propiedades/central-park-towers-1101/cocina-02.webp",
      "/propiedades/central-park-towers-1101/terraza-01.webp",
      "/propiedades/central-park-towers-1101/terraza-03.webp",
      "/propiedades/central-park-towers-1101/fachada-01.webp",
      "/propiedades/central-park-towers-1101/amenidad-gym-01.webp",
      "/propiedades/central-park-towers-1101/amenidad-gym-02.webp",
      "/propiedades/central-park-towers-1101/amenidad-kids-01.webp",
    ],

    cardDesc: {
      es: "Departamento de 3 recámaras y 240 m², con cuarto de servicio, en el piso 11, con vista panorámica, en venta o renta en Central Park Towers, Cancún.",
      en: "3-bedroom, 240 m² apartment with staff room on the 11th floor, with panoramic views, for sale or rent in Central Park Towers, Cancún.",
    },
    headline: {
      es: "Vive con una vista panorámica incomparable, en el piso 11 de Central Park Towers.",
      en: "Live with an unmatched panoramic view, on the 11th floor of Central Park Towers.",
    },
    body: {
      es: [
        "Departamento 1101 se ubica en el piso 11 de Central Park Towers, en la zona del Malecón Cancún, con 240 m² de construcción y vista panorámica hacia la Zona Hotelera y los manglares circundantes.",
        "3 recámaras y cuarto de servicio, con terraza y ventanales de piso a techo que aprovechan al máximo la vista. Disponible en venta ($12,900,000 MXN) o en renta ($47,000 MXN/mes).",
        "El edificio cuenta con alberca semiolímpica en el roof top, gimnasio equipado, kids club, seguridad 24 horas y acceso controlado.",
      ],
      en: [
        "Departamento 1101 is located on the 11th floor of Central Park Towers, in the Malecón Cancún area, with 240 m² of construction and panoramic views toward the Hotel Zone and the surrounding wetlands.",
        "3 bedrooms and a staff room, with a terrace and floor-to-ceiling windows that make the most of the view. Available for sale ($12,900,000 MXN) or for rent ($47,000 MXN/month).",
        "The building features a rooftop semi-Olympic pool, an equipped gym, a kids club, 24-hour security and controlled access.",
      ],
    },
    stats: [
      { value: "3", label: { es: "Recámaras", en: "Bedrooms" } },
      { value: "240m²", label: { es: "Construcción", en: "Built area" } },
      { value: "11", label: { es: "Piso", en: "Floor" } },
      { value: "Sí", label: { es: "Cuarto de servicio", en: "Staff room" } },
    ],
    features: [
      { es: "Piso 11", en: "11th floor" },
      { es: "Cuarto de servicio", en: "Staff room" },
      { es: "Vista panorámica a la Zona Hotelera y manglares", en: "Panoramic views of the Hotel Zone and wetlands" },
      { es: "Ventanales de piso a techo", en: "Floor-to-ceiling windows" },
      { es: "Terraza", en: "Terrace" },
      { es: "En venta o en renta", en: "For sale or for rent" },
      { es: "Alberca semiolímpica en roof top", en: "Rooftop semi-Olympic pool" },
      { es: "Gimnasio equipado", en: "Equipped gym" },
      { es: "Kids club", en: "Kids club" },
      { es: "Seguridad 24 horas", en: "24-hour security" },
      { es: "Acceso controlado", en: "Controlled access" },
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
    slug: "casa-isla-risuena-i",
    kind: "property",
    published: true,
    name: "Casa Isla Risueña I",

    // ── Taxonomía ──────────────────────────────────────────────
    operation: "venta",
    saleType: "reventa",
    category: ["casa"],
    city: "Cancún",
    zoneSlug: "isla-dorada",
    developmentSlug: null,
    bedrooms: 3,
    bathrooms: 4,
    area: { built: 485, lot: 580, unit: "m2" },
    status: "disponible",
    featured: false,
    seo: { title: null, description: null },

    zone: "Isla Dorada",
    region: { es: "Isla Dorada · Cancún", en: "Isla Dorada · Cancún" },
    type: { es: "Casa · Frente a canal, doble muelle", en: "House · Canal-front, double dock" },
    appreciation: null,

    // ── Hero info ────────────────────────────────────────────────
    price: {
      amount: 33000000,
      currency: "MXN",
      display: { es: "$33,000,000 MXN", en: "$33,000,000 MXN" },
    },
    deliveryStatus: { es: "Entrega Inmediata", en: "Immediate Delivery" },
    projectType: { es: "Casa", en: "House" },

    // ── Imágenes ─────────────────────────────────────────────────
    cardImage: "/propiedades/casa-isla-risuena-i/alberca-01.webp",
    heroImage: "/propiedades/casa-isla-risuena-i/fachada-01.webp",
    gallery: [
      "/propiedades/casa-isla-risuena-i/sala-01.webp",
      "/propiedades/casa-isla-risuena-i/sala-02.webp",
      "/propiedades/casa-isla-risuena-i/comedor-01.webp",
      "/propiedades/casa-isla-risuena-i/recamara-principal-01.webp",
      "/propiedades/casa-isla-risuena-i/recamara-02.webp",
      "/propiedades/casa-isla-risuena-i/recamara-03.webp",
      "/propiedades/casa-isla-risuena-i/closet-01.webp",
      "/propiedades/casa-isla-risuena-i/bano-01.webp",
      "/propiedades/casa-isla-risuena-i/bano-02.webp",
      "/propiedades/casa-isla-risuena-i/muelle-01.webp",
      "/propiedades/casa-isla-risuena-i/muelle-02.webp",
      "/propiedades/casa-isla-risuena-i/vista-canal-01.webp",
    ],

    cardDesc: {
      es: "Casa de 3 recámaras y 4 baños, con alberca, doble muelle y frente a canal, dentro de Isla Dorada, Cancún.",
      en: "3-bedroom, 4-bathroom house with a pool, double dock and canal frontage, inside Isla Dorada, Cancún.",
    },
    headline: {
      es: "Casa frente a canal con doble muelle propio, amueblada y lista para disfrutar.",
      en: "Canal-front house with its own double dock, furnished and ready to enjoy.",
    },
    body: {
      es: [
        "Casa Isla Risueña I se ubica dentro de Isla Dorada, Cancún, con 485 m² de construcción sobre un terreno de 580 m², distribuidos en 2 plantas.",
        "3 recámaras y 4 baños, con walking closet y closet adicional, family room, cuarto de servicio y bodega. 5 lugares de estacionamiento. Se entrega amueblada.",
        "Alberca, terraza y doble muelle propio hasta de 35 pies frente al canal. Cuenta con paneles solares, aire acondicionado central y mini splits.",
        "El residencial cuenta con casa club, gimnasio, spa, cancha de tenis y seguridad 24 horas.",
      ],
      en: [
        "Casa Isla Risueña I is located inside Isla Dorada, Cancún, with 485 m² of construction on a 580 m² lot, across 2 stories.",
        "3 bedrooms and 4 bathrooms, with a walk-in closet and an additional closet, a family room, staff room and storage room. 5 parking spaces. Delivered furnished.",
        "Pool, terrace and its own double dock up to 35 feet on the canal. Features solar panels, central A/C and mini splits.",
        "The residential community features a clubhouse, gym, spa, tennis court and 24-hour security.",
      ],
    },
    stats: [
      { value: "3", label: { es: "Recámaras", en: "Bedrooms" } },
      { value: "4", label: { es: "Baños", en: "Bathrooms" } },
      { value: "485m²", label: { es: "Construcción", en: "Built area" } },
      { value: "580m²", label: { es: "Terreno", en: "Lot size" } },
    ],
    features: [
      { es: "2 plantas", en: "2 stories" },
      { es: "Walking closet y closet adicional", en: "Walk-in closet plus additional closet" },
      { es: "Family room", en: "Family room" },
      { es: "Cuarto de servicio y bodega", en: "Staff room and storage room" },
      { es: "5 lugares de estacionamiento", en: "5 parking spaces" },
      { es: "Alberca y terraza", en: "Pool and terrace" },
      { es: "Doble muelle propio hasta de 35 ft", en: "Own double dock up to 35 ft" },
      { es: "Paneles solares", en: "Solar panels" },
      { es: "Aire central y mini splits", en: "Central A/C and mini splits" },
      { es: "Se entrega amueblada", en: "Delivered furnished" },
      { es: "Casa club", en: "Clubhouse" },
      { es: "Gimnasio", en: "Gym" },
      { es: "Spa", en: "Spa" },
      { es: "Cancha de tenis", en: "Tennis court" },
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
        es: "$19,800,000 MXN (venta) · $70,000 MXN/mes (renta)",
        en: "$19,800,000 MXN (sale) · $70,000 MXN/month (rent)",
      },
    },
    rentPrice: {
      amount: 70000,
      currency: "MXN",
      display: { es: "$70,000 MXN /mes", en: "$70,000 MXN /month" },
    },
    deliveryStatus: { es: "Entrega Inmediata", en: "Immediate Delivery" },
    projectType: { es: "Casa", en: "House" },

    // ── Imágenes ─────────────────────────────────────────────────
    cardImage: "/propiedades/casa-isla-risuena-ii/exterior-01.webp",
    heroImage: "/propiedades/casa-isla-risuena-ii/fachada-01.webp",
    gallery: [
      "/propiedades/casa-isla-risuena-ii/sala-01.webp",
      "/propiedades/casa-isla-risuena-ii/comedor-01.webp",
      "/propiedades/casa-isla-risuena-ii/comedor-02.webp",
      "/propiedades/casa-isla-risuena-ii/cocina-01.webp",
      "/propiedades/casa-isla-risuena-ii/cocina-02.webp",
      "/propiedades/casa-isla-risuena-ii/terraza-01.webp",
      "/propiedades/casa-isla-risuena-ii/entrada-01.webp",
      "/propiedades/casa-isla-risuena-ii/recamara-01.webp",
      "/propiedades/casa-isla-risuena-ii/recamara-02.webp",
      "/propiedades/casa-isla-risuena-ii/recamara-03.webp",
      "/propiedades/casa-isla-risuena-ii/pasillo-01.webp",
      "/propiedades/casa-isla-risuena-ii/alberca-01.webp",
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
        "Alberca, terraza y muelle propio hasta de 30 pies frente al canal. Cuenta con aire acondicionado central y mini splits.",
        "Disponible en venta ($19,800,000 MXN) o en renta ($70,000 MXN/mes). El residencial cuenta con casa club, gimnasio, spa, cancha de tenis y seguridad 24 horas.",
      ],
      en: [
        "Casa Isla Risueña II is located inside Isla Dorada, Cancún, with 480 m² of construction on a 500 m² lot, across 3 stories.",
        "3 bedrooms and 3 bathrooms, with a walk-in closet and an additional closet, a staff room and storage room. 2 parking spaces.",
        "Pool, terrace and its own dock up to 30 feet on the canal. Features central A/C and mini splits.",
        "Available for sale ($19,800,000 MXN) or for rent ($70,000 MXN/month). The residential community features a clubhouse, gym, spa, tennis court and 24-hour security.",
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
      { es: "Alberca y terraza", en: "Pool and terrace" },
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
];

export function getProperty(slug) {
  return properties.find((p) => p.slug === slug);
}
