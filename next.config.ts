import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.supabase.co" },
      { protocol: "https", hostname: "127.0.0.1" },
    ],
  },
  transpilePackages: ["react-map-gl"],
  async redirects() {
    return [
      { source: "/adventure", destination: "/experiences/adventure", permanent: true },
      { source: "/culture", destination: "/experiences/culture", permanent: true },
      { source: "/culinary", destination: "/experiences/culinary", permanent: true },
    ];
  },
};

export default nextConfig;
