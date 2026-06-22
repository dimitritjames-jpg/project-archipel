import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.supabase.co" },
      { protocol: "https", hostname: "127.0.0.1" },
    ],
  },
  transpilePackages: ["react-map-gl"],
};

export default nextConfig;
