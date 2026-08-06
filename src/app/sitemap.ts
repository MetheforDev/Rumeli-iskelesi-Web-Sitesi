import type { MetadataRoute } from "next";
import { SITE_URL, LOCALES } from "@/lib/site-config";

type ChangeFreq =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

interface PageDef {
  path: string;
  priority: number;
  changeFrequency: ChangeFreq;
}

const pages: PageDef[] = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const langAlternates = (path: string) =>
    Object.fromEntries(
      LOCALES.map((l) => [l, `${SITE_URL}/${l}${path}`])
    ) as Record<string, string>;

  return LOCALES.flatMap((locale) =>
    pages.map(({ path, priority, changeFrequency }) => ({
      url: `${SITE_URL}/${locale}${path}`,
      changeFrequency,
      priority: locale === "tr" ? priority : Math.round(priority * 0.9 * 10) / 10,
      alternates: {
        languages: {
          ...langAlternates(path),
          "x-default": `${SITE_URL}/tr${path}`,
        },
      },
    }))
  );
}
