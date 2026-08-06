import type { MetadataRoute } from "next";
import { BRAND_HEX } from "@/lib/colors";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Rumeli İskelesi",
    short_name: "Rumeli İskelesi",
    description: "Mutlukent Esenlik Hizmetleri A.Ş — Kafeterya & Restoran",
    id: "/tr",
    start_url: "/tr",
    scope: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: BRAND_HEX.primary,
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
