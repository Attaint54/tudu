import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/api-wala",
  assetPrefix: "/api-wala/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;