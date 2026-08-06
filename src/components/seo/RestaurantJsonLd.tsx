import { getTranslations } from "next-intl/server";
import { menuData } from "@/lib/menu-data";
import { NAP, SITE_URL, type Locale } from "@/lib/site-config";

interface Props {
  locale: Locale;
}

export async function RestaurantJsonLd({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: "seo" });
  const restaurantId = `${SITE_URL}/#restaurant`;
  const organizationId = `${SITE_URL}/#organization`;
  const websiteId = `${SITE_URL}/#website`;
  const menuId = `${SITE_URL}/${locale}#menu-schema`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: NAP.operator,
        url: SITE_URL,
        logo: { "@type": "ImageObject", url: `${SITE_URL}${NAP.logo}` },
        email: NAP.email,
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: SITE_URL,
        name: NAP.name,
        inLanguage: locale,
        publisher: { "@id": organizationId },
      },
      {
        "@type": ["Restaurant", "CafeOrCoffeeShop"],
        "@id": restaurantId,
        name: NAP.name,
        description: t("description"),
        url: `${SITE_URL}/${locale}`,
        mainEntityOfPage: { "@id": websiteId },
        image: [`${SITE_URL}${NAP.heroImage}`],
        logo: `${SITE_URL}${NAP.logo}`,
        email: NAP.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: NAP.address.street,
          addressLocality: NAP.address.city,
          addressRegion: NAP.address.region,
          postalCode: NAP.address.postalCode,
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
        servesCuisine: ["Turkish", "Breakfast", "Tekirdağ Köftesi", "Coffee", "Desserts"],
        priceRange: "₺₺",
        currenciesAccepted: "TRY",
        paymentAccepted: "Cash, Credit Card",
        acceptsReservations: false,
        isAccessibleForFree: true,
        hasMap: NAP.googleMapsUrl,
        sameAs: [NAP.instagram, NAP.googleMapsUrl],
        parentOrganization: { "@id": organizationId },
        hasMenu: { "@id": menuId },
      },
      {
        "@type": "Menu",
        "@id": menuId,
        name: `${NAP.name} Menü`,
        url: `${SITE_URL}/${locale}#menu`,
        inLanguage: locale,
        hasMenuSection: menuData.map((category) => ({
          "@type": "MenuSection",
          name: category.label,
          url: `${SITE_URL}/${locale}#menu`,
        })),
      },
    ],
  };

  const json = JSON.stringify(schema).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
