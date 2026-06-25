/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.grupodaxi.com" },
    ],
  },
};

export default nextConfig;
