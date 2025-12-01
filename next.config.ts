import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Only enable static export and basePath for production builds (GitHub Pages)
  // In development, we want normal Next.js dev server behavior
  ...(process.env.NODE_ENV === 'production' && {
    output: 'export',
    basePath: '/presentation-template',
  }),
  // Disable image optimization (not supported in static export)
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
