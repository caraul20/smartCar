/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  images: {
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
    ],
  },
  // Asigură că link-urile funcționează corect pe Vercel
  trailingSlash: false,
  // Activare mod output exportat
  output: 'standalone',
};

module.exports = nextConfig; 