/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.adesh.tech',
        pathname: '**', // Allows all paths
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        pathname: '/api/portraits/**', // Allows user portraits
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/photos/**', // Allows Pexels photos
      },
    ],
  },
};

export default nextConfig;
