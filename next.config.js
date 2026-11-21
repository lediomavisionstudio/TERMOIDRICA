/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Cloudflare Pages non esegue l'ottimizzazione immagini di Next:
    // le serviamo così come sono (le foto locali sono già compresse).
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

module.exports = nextConfig;
