import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      { hostname: 'ftp.goit.study' },
      { hostname: 'ac.goit.global' },
    ],
  },
};

export default nextConfig;
