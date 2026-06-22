import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Project Archipel",
    short_name: "Archipel",
    description:
      "US Virgin Islands business directory and daily planning utility",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0e27",
    theme_color: "#121a3d",
    lang: "en-US",
  };
}
