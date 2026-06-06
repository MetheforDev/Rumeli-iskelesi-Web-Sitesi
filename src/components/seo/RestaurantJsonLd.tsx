import { getTranslations } from "next-intl/server";
import { NAP, SITE_URL, type Locale } from "@/lib/site-config";

interface Props {
  locale: Locale;
}

export async function RestaurantJsonLd({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: "seo" });

  const schema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: NAP.name,
    description: t("description"),
    url: `${SITE_URL}/${locale}`,
    image: `${SITE_URL}${NAP.heroImage}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: NAP.address.street,
      addressLocality: NAP.address.city,
      addressRegion: NAP.address.region,
      addressCountry: NAP.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: NAP.geo.lat,
      longitude: NAP.geo.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: NAP.hours.opens,
        closes: NAP.hours.closes,
      },
    ],
    servesCuisine: ["Turkish", "Fast Food", "Desserts"],
    priceRange: "₺",
    sameAs: [NAP.instagram],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
