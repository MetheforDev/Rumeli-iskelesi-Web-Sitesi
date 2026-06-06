import { getTranslations } from "next-intl/server";
import { NAP, SITE_URL, type Locale } from "@/lib/site-config";

interface Props {
  locale: Locale;
}

export async function RestaurantJsonLd({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: "seo" });

  const address: Record<string, string> = {
    "@type": "PostalAddress",
    streetAddress: NAP.address.street,
    addressLocality: NAP.address.city,
    addressRegion: NAP.address.region,
    addressCountry: NAP.address.country,
  };
  if (NAP.address.postalCode) address.postalCode = NAP.address.postalCode;

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: NAP.name,
    description: t("description"),
    url: `${SITE_URL}/${locale}`,
    image: `${SITE_URL}${NAP.heroImage}`,
    address,
    geo: {
      "@type": "GeoCoordinates",
      latitude: NAP.geo.lat,
      longitude: NAP.geo.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: NAP.hours.opens,
        closes: NAP.hours.closes,
      },
    ],
    servesCuisine: ["Turkish", "Breakfast", "Fast Food", "Coffee", "Desserts"],
    priceRange: "₺",
    sameAs: [NAP.instagram],
  };

  // Boş opsiyonel alanlar schema'ya girmesin (Google "boş değer" uyarısı vermesin)
  if (NAP.googleMapsUrl) schema.hasMap = NAP.googleMapsUrl;

  const json = JSON.stringify(schema).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
