/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['cdn.pixabay.com', 'images.unsplash.com', 'www.largus.fr', 'firebasestorage.googleapis.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'www.largus.fr',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '**',
      },
    ],
  },
  // Configurare pentru Vercel
  trailingSlash: false,
  // Asigurăm că build-ul include toate dependențele necesare
  output: 'standalone',
  // Îmbunătățește performance și hidratarea
  swcMinify: true,
  // Setează modurile de compilare pentru a asigura compatibilitatea maximă
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  // Activează analytics pentru a monitoriza performanța
  analyticsId: process.env.NEXT_PUBLIC_ANALYTICS_ID,
};

module.exports = nextConfig; 