import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Rumeli İskelesi",
    short_name: "Rumeli İskelesi",
    description: "Mutlukent Esenlik Hizmetleri A.Ş — Kafeterya & Restoran",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#d9892a",
    orientation: "portrait",
    icons: [
      {
        src: "/images/logo/rumeli-logo-transparent.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/images/logo/rumeli-logo-transparent.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    categories: ["food", "restaurant"],
    lang: "tr",
  };
}
