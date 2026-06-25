// ============================================================
//  ARCHIVO DE DATOS DE PROPIEDADES
//
//  Para agregar una propiedad nueva: copia el objeto completo
//  de abajo, cambia los campos y listo.
//  El grid en home y el landing de propiedad se generan solos.
//
//  CAMPOS DE TEXTO BILINGÜE: { es: "...", en: "..." }
//
//  TEMPLATE DE CAMPOS DISPONIBLES:
//  ─────────────────────────────────────────────────────────
//  slug            → URL: /propiedades/[slug]
//  name            → Nombre del proyecto
//  zone            → Zona corta (para filtros en home)
//  region          → Texto de zona completo (badge en hero)
//  type            → Tipo corto (para card en home)
//  appreciation    → Plusvalía estimada (ej. "18%")
//
//  ── Hero landing ──────────────────────────────────────────
//  price           → { es, en } Precio base (ej. "Desde $280,000 USD")
//  deliveryStatus  → { es, en } "Preventa" | "Entrega Inmediata"
//  projectType     → { es, en } Tipo de producto:
//                    "Departamentos" | "Lotes Residenciales"
//                    | "Casas" | "Locales Comerciales"
//                    | "Villas" | "Condominios" | etc.
//
//  ── Desarrollador ─────────────────────────────────────────
//  developer: {
//    name          → Nombre del desarrollador
//    logo          → URL del logo (usar imagen en /public o CDN)
//    description   → { es, en } Descripción corta del desarrollador
//  }
//
//  ── Imágenes ──────────────────────────────────────────────
//  cardImage       → Imagen para la card en home
//  heroImage       → Imagen de fondo del hero en landing
//  gallery         → Array de 3 imágenes para la galería
//
//  ── Contenido del landing ─────────────────────────────────
//  cardDesc        → { es, en } Descripción corta (card en home)
//  headline        → { es, en } Título de la sección El desarrollo
//  body            → { es: [...párrafos], en: [...párrafos] }
//  stats           → Array de { value, label: { es, en } } (máx. 4)
//  features        → Array de { es, en } (checklist de características)
// ============================================================

export const properties = [
  {
    slug: "mukta-residencial",
    name: "Mukta Residencial",
    zone: "Puerto Morelos",
    region: { es: "Puerto Morelos · Riviera Maya", en: "Puerto Morelos · Riviera Maya" },
    type: { es: "Eco-luxury · Lotes escriturados", en: "Eco-luxury · Titled lots" },
    appreciation: "18%",

    // ── Hero info ────────────────────────────────────────────────
    price:          { es: "Desde $280,000 USD", en: "From $280,000 USD" },
    deliveryStatus: { es: "Preventa", en: "Pre-sale" }, // opciones: "Preventa" | "Entrega Inmediata"
    projectType:    { es: "Lotes Residenciales", en: "Residential Lots" },

    // ── Desarrollador ────────────────────────────────────────────
    developer: {
      name: "Grupo Daxi",
      logo: "/Logo-Grupo-Daxi.avif",
      description: {
        es: "Grupo Daxi es una desarrolladora con más de 15 años de experiencia creando comunidades de alto impacto en el Caribe Mexicano. Su enfoque integra arquitectura bioclimática, sustentabilidad real y plusvalía comprobada en cada proyecto.",
        en: "Grupo Daxi is a developer with over 15 years of experience creating high-impact communities in the Mexican Caribbean. Their approach integrates bioclimatic architecture, real sustainability and proven appreciation in every project.",
      },
    },
    // ── Amenidades ───────────────────────────────────────────────
    amenities: [
      {
        id: "bienestar",
        title:  { es: "Bienestar y relajación",    en: "Wellness & relaxation" },
        desc:   { es: "Espacios para bajar el ritmo, respirar profundo y volver al centro. Spa, cenotes, jardines de meditación y zonas de descanso integradas en la naturaleza.", en: "Spaces to slow down, breathe deep and return to center. Spa, cenotes, meditation gardens and rest areas integrated in nature." },
        image:  "https://cdn.grupodaxi.com/images/mukta/mukta-14.webp",
      },
      {
        id: "social",
        title:  { es: "Vida social y convivencia", en: "Social life & gathering" },
        desc:   { es: "Áreas pensadas para compartir, celebrar y convertir lo cotidiano en memorable. Club house, salones privados, roof terrace y zonas de parrilla.", en: "Areas designed to share, celebrate and turn the everyday into memorable. Club house, private halls, roof terrace and BBQ areas." },
        image:  "https://cdn.grupodaxi.com/images/mukta/mukta-12.webp",
      },
      {
        id: "deporte",
        title:  { es: "Movimiento y deporte",      en: "Movement & sport" },
        desc:   { es: "Zonas para mantener el cuerpo activo y abrazar una vida más vital. Gimnasio, canchas, piscinas y circuitos de running rodeados de selva.", en: "Zones to keep the body active and embrace a more vital life. Gym, courts, pools and running circuits surrounded by jungle." },
        image:  "https://cdn.grupodaxi.com/images/mukta/mukta-01.webp",
      },
      {
        id: "familia",
        title:  { es: "Familia y comunidad",       en: "Family & community" },
        desc:   { es: "Ambientes para crecer y disfrutar cada etapa dentro de una comunidad que comparte una misma visión. Áreas infantiles, parques y senderos familiares.", en: "Environments to grow and enjoy every stage within a community that shares the same vision. Kids areas, parks and family trails." },
        image:  "https://cdn.grupodaxi.com/images/mukta/mukta-06.webp",
      },
    ],

    // ── Ubicación ────────────────────────────────────────────────
    location: {
      lat: 20.8456,
      lng: -87.0374,
      address: "Puerto Morelos, Quintana Roo, México",
      description: {
        es: "Mukta Residencial se encuentra en Puerto Morelos, uno de los destinos con mayor plusvalía del Caribe Mexicano. A 25 minutos del aeropuerto de Cancún, 5 minutos de la playa y con acceso directo al Tren Maya.",
        en: "Mukta Residencial is located in Puerto Morelos, one of the highest-appreciation destinations in the Mexican Caribbean. 25 minutes from Cancún airport, 5 minutes from the beach and with direct access to the Maya Train.",
      },
    },

    cardImage: "https://cdn.grupodaxi.com/images/landing-mukta/landing_mukta_grupo_daxi_03.webp",
    heroImage: "https://cdn.grupodaxi.com/images/mukta-largas/mukta-larga-grupo-daxi-01.webp",
    gallery: [
      "https://cdn.grupodaxi.com/images/mukta-largas/mukta-larga-grupo-daxi-02.webp",
      "https://cdn.grupodaxi.com/images/landing-mukta/landing_mukta_grupo_daxi_04.webp",
      "https://cdn.grupodaxi.com/images/mukta/mukta-13.webp",
    ],
    cardDesc: {
      es: "90 hectáreas, 50+ en conservación, 18 amenidades extra luxury y cenotes naturales.",
      en: "90 hectares, 50+ in conservation, 18 extra-luxury amenities and natural cenotes.",
    },
    headline: {
      es: "No es un desarrollo más. Es una forma de habitar la naturaleza.",
      en: "Not just another development. A way to inhabit nature.",
    },
    body: {
      es: [
        "Arquitectura holística y contemporánea, 18 amenidades extra luxury, energía 100% renovable y la magia natural de sus cenotes, en Puerto Morelos.",
        "Ubicación estratégica entre Cancún y la Riviera Maya, cerca de playas, aeropuerto y Tren Maya.",
      ],
      en: [
        "Holistic contemporary architecture, 18 extra-luxury amenities, 100% renewable energy and the natural magic of its cenotes, in Puerto Morelos.",
        "Strategic location between Cancún and Riviera Maya, near beaches, airport and the Maya Train.",
      ],
    },
    stats: [
      { value: "90ha", label: { es: "Hectáreas totales", en: "Total hectares" } },
      { value: "50+", label: { es: "Hectáreas conservadas", en: "Conserved hectares" } },
      { value: "18", label: { es: "Amenidades extra luxury", en: "Extra-luxury amenities" } },
      { value: "18%", label: { es: "Plusvalía anual estimada", en: "Est. annual appreciation" } },
    ],
    features: [
      { es: "Cenotes naturales", en: "Natural cenotes" },
      { es: "Terrenos escriturados", en: "Titled lots" },
      { es: "Energía 100% renovable", en: "100% renewable energy" },
      { es: "Fideicomiso Banco Invex", en: "Banco Invex trust" },
    ],
  },
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "vellmari-grand-living",
    name: "Vellmari Grand Living",
    zone: "Puerto Cancún",
    region: { es: "Puerto Cancún · Cancún", en: "Puerto Cancún · Cancún" },
    type:   { es: "Departamentos de lujo · 2 Torres", en: "Luxury condos · 2 Towers" },
    appreciation: "12%",

    // ── Hero info ────────────────────────────────────────────────
    price:          { es: "Desde $14,800,000 MXN", en: "From $14,800,000 MXN" },
    deliveryStatus: { es: "Preventa · Entrega Dic. 2026", en: "Pre-sale · Delivery Dec. 2026" },
    projectType:    { es: "Departamentos", en: "Condominiums" },

    // ── Desarrollador ────────────────────────────────────────────
    developer: {
      name: "Urban Homes",
      logo: "https://static.wixstatic.com/media/f37000_55d7562138c348af85dbf2cda08d9541~mv2.png/v1/fill/w_327,h_154,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/f37000_55d7562138c348af85dbf2cda08d9541~mv2.png",
      description: {
        es: "Urban Homes es una desarrolladora con más de 18 años de experiencia en Quintana Roo, con 22 desarrollos y más de 5,000 viviendas entregadas en Puerto Cancún, Playa del Carmen y Tulum. Sus proyectos definen el estándar de vida de lujo en la zona más exclusiva de Cancún.",
        en: "Urban Homes is a developer with over 18 years of experience in Quintana Roo, with 22 developments and over 5,000 homes delivered in Puerto Cancún, Playa del Carmen and Tulum. Their projects define the luxury living standard in Cancún's most exclusive area.",
      },
    },

    // ── Amenidades ───────────────────────────────────────────────
    amenities: [
      {
        id: "acuatico",
        title: { es: "Albercas y área acuática",    en: "Pools & aquatic area" },
        desc:  { es: "Alberca familiar, alberca de adultos, jacuzzi y pool bar frente a la Marina. Experiencia de hotel de lujo en tu propio hogar, con camastros y vistas al agua.", en: "Family pool, adults pool, jacuzzi and pool bar facing the Marina. Five-star hotel experience in your own home, with loungers and water views." },
        image: "https://static.wixstatic.com/media/11062b_9a436efe75fb4b2891564c550ed3861b~mv2.jpg/v1/fill/w_1200,h_800,al_c,q_85/Pool.jpg",
      },
      {
        id: "deporte",
        title: { es: "Deporte y movimiento",        en: "Sport & movement" },
        desc:  { es: "Gimnasio equipado, cancha de pádel, cancha de pickleball y cancha de fútbol 5. Todo lo necesario para mantenerte activo sin salir del desarrollo.", en: "Equipped gym, padel court, pickleball court and 5-a-side soccer field. Everything you need to stay active without leaving the development." },
        image: "https://static.wixstatic.com/media/6a670ac1508f442cac494d76770e1ded.jpg/v1/fill/w_1200,h_800,al_c,q_85/Gym.jpg",
      },
      {
        id: "social",
        title: { es: "Vida social y entretenimiento", en: "Social life & entertainment" },
        desc:  { es: "Lounge & bar privado, área de asadores, fire pit y kid's club. Espacios diseñados para que cada reunión, celebración o tarde en familia se convierta en un recuerdo.", en: "Private lounge & bar, BBQ area, fire pit and kid's club. Spaces designed to turn every gathering, celebration or family afternoon into a memory." },
        image: "https://static.wixstatic.com/media/92b59de047a64a8ca9f0c91d77ce3a08.jpg/v1/fill/w_1200,h_800,al_c,q_85/Cocktail%20Bar.jpg",
      },
      {
        id: "bienestar",
        title: { es: "Bienestar y trabajo",          en: "Wellness & work" },
        desc:  { es: "Spa, zona de relajación, business center y seguridad 24/7. Porque el lujo también es tener todo lo que necesitas a tu alcance, sin salir de casa.", en: "Spa, relaxation zone, business center and 24/7 security. Because luxury also means having everything you need within reach, without leaving home." },
        image: "https://static.wixstatic.com/media/11062b_9ba8e3421c344d59a82c7203f33b20e0~mv2.jpg/v1/fill/w_1200,h_800,al_c,q_85/Spa%20Day.jpg",
      },
    ],

    // ── Ubicación ────────────────────────────────────────────────
    location: {
      lat: 21.1362,
      lng: -86.7896,
      address: "Marina Puerto Cancún, Cancún, Quintana Roo, México",
      description: {
        es: "Vellmari Grand Living se ubica en la exclusiva Marina Puerto Cancún, la zona residencial de mayor plusvalía en Cancún. Con acceso directo a la marina, a minutos del aeropuerto internacional y del centro de la ciudad.",
        en: "Vellmari Grand Living is located in the exclusive Marina Puerto Cancún, Cancún's highest-appreciation residential area. With direct marina access, minutes from the international airport and city center.",
      },
    },

    cardImage: "https://static.wixstatic.com/media/f37000_e692f9afa24d4f329a89e685f43d8fb2~mv2.jpg/v1/fill/w_1200,h_800,al_c,q_85/f37000_e692f9afa24d4f329a89e685f43d8fb2~mv2.jpg",
    heroImage: "https://static.wixstatic.com/media/f37000_e6136adab0b84c4388dcedf6bc6fc41c~mv2.jpg/v1/fill/w_1920,h_1080,al_c,q_85/f37000_e6136adab0b84c4388dcedf6bc6fc41c~mv2.jpg",
    gallery: [
      "https://static.wixstatic.com/media/f37000_e692f9afa24d4f329a89e685f43d8fb2~mv2.jpg/v1/fill/w_1920,h_1080,al_c,q_85/f37000_e692f9afa24d4f329a89e685f43d8fb2~mv2.jpg",
      "https://static.wixstatic.com/media/f37000_41318bf40688440cb69872770d735ad4~mv2.jpg/v1/fill/w_900,h_900,al_c,q_85/f37000_41318bf40688440cb69872770d735ad4~mv2.jpg",
      "https://static.wixstatic.com/media/f37000_e50007ff4b32403482fa036e9dfa79dc~mv2.jpg/v1/fill/w_900,h_900,al_c,q_85/f37000_e50007ff4b32403482fa036e9dfa79dc~mv2.jpg",
    ],

    cardDesc: {
      es: "2 torres, 95 unidades de lujo con vistas panorámicas 200° a la Marina de Puerto Cancún. 17 amenidades exclusivas y muelle privado.",
      en: "2 towers, 95 luxury units with 200° panoramic views of Puerto Cancún Marina. 17 exclusive amenities and private dock.",
    },
    headline: {
      es: "La única doble torre con vistas panorámicas de 200° sobre la Marina Puerto Cancún.",
      en: "The only twin tower with 200° panoramic views over Puerto Cancún Marina.",
    },
    body: {
      es: [
        "Vellmari Grand Living redefine el lujo vertical en Puerto Cancún. Dos torres, 95 unidades y 3 penthouses con vistas hacia la Marina al este, norte y sur, y hacia la ciudad al oeste.",
        "Departamentos de 2, 3, 4 y 5 recámaras con acabados de primer nivel, conserjería 24/7, muelle privado con acceso a 2 carriles para embarcaciones y 17 amenidades exclusivas.",
      ],
      en: [
        "Vellmari Grand Living redefines vertical luxury in Puerto Cancún. Two towers, 95 units and 3 penthouses with marina views to the east, north and south, and city views to the west.",
        "2, 3, 4 and 5-bedroom units with top-tier finishes, 24/7 concierge, private dock with access to 2 boat lanes and 17 exclusive amenities.",
      ],
    },
    stats: [
      { value: "95",  label: { es: "Unidades de lujo",    en: "Luxury units" } },
      { value: "17",  label: { es: "Amenidades exclusivas", en: "Exclusive amenities" } },
      { value: "3",   label: { es: "Penthouses",           en: "Penthouses" } },
      { value: "2",   label: { es: "Torres",               en: "Towers" } },
    ],
    features: [
      { es: "Vista panorámica 200° a la Marina",   en: "200° panoramic marina views" },
      { es: "Muelle privado para residentes",      en: "Private dock for residents" },
      { es: "2 carriles para embarcaciones",       en: "2 boat lanes access" },
      { es: "Conserjería y seguridad 24/7",        en: "24/7 concierge & security" },
      { es: "Departamentos de 2 a 5 recámaras",   en: "2 to 5-bedroom units" },
      { es: "Entrega Diciembre 2026",              en: "Delivery December 2026" },
    ],
  },
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "puerto-369",
    name: "Puerto 369",
    zone: "Puerto Morelos",
    region: { es: "Puerto Morelos · Riviera Maya", en: "Puerto Morelos · Riviera Maya" },
    type:   { es: "Lotes unifamiliares y usos mixtos", en: "Single-family lots & mixed-use" },
    appreciation: "18%",

    // ── Hero info ────────────────────────────────────────────────
    price:          { es: "Precio a solicitud", en: "Price on request" },
    deliveryStatus: { es: "Preventa", en: "Pre-sale" },
    projectType:    { es: "Lotes y usos mixtos", en: "Lots & mixed-use" },

    // ── Desarrollador ────────────────────────────────────────────
    developer: {
      name: "Grupo Daxi",
      logo: "/Logo-Grupo-Daxi.avif",
      description: {
        es: "Grupo Daxi es una desarrolladora con más de 15 años de experiencia creando comunidades de alto impacto en el Caribe Mexicano. Su enfoque integra planeación urbana a largo plazo, certeza jurídica y plusvalía comprobada en cada proyecto.",
        en: "Grupo Daxi is a developer with over 15 years of experience creating high-impact communities in the Mexican Caribbean. Their approach integrates long-term urban planning, legal certainty and proven appreciation in every project.",
      },
    },

    // ── Amenidades / Pilares ─────────────────────────────────────
    amenities: [
      {
        id: "certeza",
        title: { es: "Certeza jurídica",            en: "Legal certainty" },
        desc:  { es: "Fideicomiso Banco Invex, permisos completos y servicios subterráneos. Una inversión estable, no una apuesta: cada metro está respaldado y listo para construir.", en: "Banco Invex trust, complete permits and underground utilities. A stable investment, not a gamble: every meter is backed and ready to build." },
        image: "https://cdn.grupodaxi.com/images/web-puerto369/generales/puerto369-grupo-daxi-06.webp",
      },
      {
        id: "planeacion",
        title: { es: "Planeación y urbanismo",      en: "Planning & urbanism" },
        desc:  { es: "Vialidades ordenadas, accesos integrados y una visión de ciudad que crece con orden y valor. La planeación no es decorativa: da forma al valor en el tiempo.", en: "Ordered roads, integrated access and a city vision that grows with order and value. Planning isn't decorative: it shapes value over time." },
        image: "https://cdn.grupodaxi.com/images/web-puerto369/generales/puerto369-grupo-daxi-12.webp",
      },
      {
        id: "usos-mixtos",
        title: { es: "Usos mixtos",                 en: "Mixed-use" },
        desc:  { es: "Lotes unifamiliares, espacios multifamiliares y áreas comerciales conviviendo en una misma comunidad. Flexibilidad para vivir, rentar o invertir.", en: "Single-family lots, multi-family spaces and commercial areas coexisting in one community. Flexibility to live, rent or invest." },
        image: "https://cdn.grupodaxi.com/images/web-puerto369/generales/puerto369-grupo-daxi-20.webp",
      },
      {
        id: "conectividad",
        title: { es: "Conectividad privilegiada",   en: "Privileged connectivity" },
        desc:  { es: "A 1 minuto de la Ruta de los Cenotes, 7 de la playa, 6 de la estación del Tren Maya y 20 del aeropuerto de Cancún. Conectado con todo lo que importa.", en: "1 minute from the Ruta de los Cenotes, 7 from the beach, 6 from the Maya Train station and 20 from Cancún airport. Connected to everything that matters." },
        image: "https://cdn.grupodaxi.com/images/web-puerto369/generales/puerto369-grupo-daxi-25.webp",
      },
    ],

    // ── Ubicación ────────────────────────────────────────────────
    location: {
      lat: 20.8700,
      lng: -87.0250,
      address: "Ruta de los Cenotes, Puerto Morelos, Quintana Roo, México",
      description: {
        es: "Puerto 369 se ubica en Puerto Morelos, sobre la entrada de la Ruta de los Cenotes. A 1 minuto de los cenotes, 7 minutos de la playa, 6 minutos de la estación del Tren Maya y 20 minutos del Aeropuerto Internacional de Cancún.",
        en: "Puerto 369 is located in Puerto Morelos, at the entrance of the Ruta de los Cenotes. 1 minute from the cenotes, 7 minutes from the beach, 6 minutes from the Maya Train station and 20 minutes from Cancún International Airport.",
      },
    },

    cardImage: "https://cdn.grupodaxi.com/images/web-puerto369/generales/puerto369-grupo-daxi-03.webp",
    heroImage: "https://cdn.grupodaxi.com/images/web-puerto369/generales/puerto369-grupo-daxi-01.webp",
    gallery: [
      "https://cdn.grupodaxi.com/images/web-puerto369/generales/puerto369-grupo-daxi-05.webp",
      "https://cdn.grupodaxi.com/images/web-puerto369/generales/puerto369-grupo-daxi-10.webp",
      "https://cdn.grupodaxi.com/images/web-puerto369/generales/puerto369-grupo-daxi-18.webp",
    ],
    cardDesc: {
      es: "Comunidad planificada con certeza jurídica, usos mixtos y conectividad privilegiada en Puerto Morelos.",
      en: "Planned community with legal certainty, mixed-use and privileged connectivity in Puerto Morelos.",
    },
    headline: {
      es: "El futuro no se improvisa. Se traza.",
      en: "The future isn't improvised. It's drawn.",
    },
    body: {
      es: [
        "Puerto 369 es una comunidad concebida para crecer con inteligencia: con orden, valor y una visión de ciudad. Aquí la planeación da forma al valor, y diferencia una inversión estable de una simple apuesta.",
        "Lotes unifamiliares, espacios multifamiliares y áreas comerciales con certeza jurídica —fideicomiso Banco Invex, permisos completos y servicios subterráneos— en una de las zonas de mayor proyección de la Riviera Maya.",
      ],
      en: [
        "Puerto 369 is a community conceived to grow intelligently: with order, value and a city vision. Here planning shapes value, and sets a stable investment apart from a mere gamble.",
        "Single-family lots, multi-family spaces and commercial areas with legal certainty —Banco Invex trust, complete permits and underground utilities— in one of the highest-projection areas of the Riviera Maya.",
      ],
    },
    stats: [
      { value: "1 min",  label: { es: "Ruta de los Cenotes", en: "Ruta de los Cenotes" } },
      { value: "7 min",  label: { es: "Playa Puerto Morelos", en: "Puerto Morelos beach" } },
      { value: "6 min",  label: { es: "Estación Tren Maya",   en: "Maya Train station" } },
      { value: "20 min", label: { es: "Aeropuerto Cancún",    en: "Cancún airport" } },
    ],
    features: [
      { es: "Fideicomiso Banco Invex",                  en: "Banco Invex trust" },
      { es: "Permisos completos y servicios subterráneos", en: "Complete permits & underground utilities" },
      { es: "Lotes unifamiliares, multifamiliares y comerciales", en: "Single-family, multi-family & commercial lots" },
      { es: "Vialidades y accesos planificados",        en: "Planned roads & access" },
      { es: "Programa de beneficios DAXI Rewards",      en: "DAXI Rewards benefits program" },
    ],
  },
];

export function getProperty(slug) {
  return properties.find((p) => p.slug === slug);
}
