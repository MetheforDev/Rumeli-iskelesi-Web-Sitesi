import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SITE_URL, LOCALES, LOCALE_OG, NAP, type Locale } from "./site-config";

export async function generateSeoMetadata(locale: Locale): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "seo" });

  const langAlternates = Object.fromEntries(
    LOCALES.map((l) => [l, `${SITE_URL}/${l}`])
  ) as Record<string, string>;

  return {
    metadataBase: new URL(SITE_URL),
    title: t("title"),
    description: t("description"),
    keywords: t("keywords")
      .split(",")
      .map((k) => k.trim()),
    openGraph: {
      title: t("og_title"),
      description: t("og_description"),
      type: "website",
      locale: LOCALE_OG[locale],
      url: `${SITE_URL}/${locale}`,
      siteName: "Rumeli İskelesi",
      images: [
        {
          url: `${SITE_URL}${NAP.heroImage}`,
          width: 1200,
          height: 630,
          alt: t("og_image_alt"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("og_title"),
      description: t("og_description"),
    },
    robots: { index: true, follow: true },
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        ...langAlternates,
        "x-default": `${SITE_URL}/tr`,
      },
    },
  };
}
