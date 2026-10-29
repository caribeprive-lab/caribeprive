// Propiedades retiradas del sitio (vendidas/rentadas). Sus links viejos
// (anuncios, WhatsApp, redes) redirigen con 301 al listado en vez de dar 404.
// Al retirar una propiedad de lib/properties.js, agrega aquí su slug.
const REMOVED_PROPERTY_SLUGS = [
  "casa-puerto-loreto",
  "central-park-towers-1101",
  "casa-isla-risuena-i",
  "casa-tzalam",
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.grupodaxi.com" },
    ],
  },
  async redirects() {
    // statusCode: 301 explícito — `permanent: true` respondería 308.
    return REMOVED_PROPERTY_SLUGS.map((slug) => ({
      source: `/propiedades/${slug}`,
      destination: "/propiedades",
      statusCode: 301,
    }));
  },
};

export default nextConfig;
