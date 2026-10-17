import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Inspiration photography comes from the Unsplash CDN; stone textures are local files in /public/images.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
    formats: ["image/avif", "image/webp"],
    qualities: [70, 80],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
