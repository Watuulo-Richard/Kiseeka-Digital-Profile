import type { NextConfig } from "next";
// import { createMDX } from "fumadocs-mdx/next";
// const withMDX = createMDX();
const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // transpilePackages: ["geist"],
  experimental: {
  },
};

export default nextConfig;
