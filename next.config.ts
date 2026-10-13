import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Plain static files: deployable on Vercel or any static host.
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
