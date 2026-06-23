import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "VibeVI - Find Your Island Vibe",
    short_name: "VibeVI",
    description:
      "US Virgin Islands discovery directory and daily island planning utility",
    start_url: "/",
    display: "standalone",
    background_color: "#020815",
    theme_color: "#061326",
    lang: "en-US",
  };
}
