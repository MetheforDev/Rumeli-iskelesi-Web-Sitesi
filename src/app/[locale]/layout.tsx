import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic", "greek"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });

const SITE_URL = "https://rumeli-iskelesi-web-sitesi.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Rumeli İskelesi | Kafeterya & Restoran — Tekirdağ Süleymanpaşa",
  description:
    "Mutlukent Esenlik Hizmetleri A.Ş işletmesi. Deniz kenarında kahvaltı, Tekirdağ köftesi, fast food ve tatlılar. Halka açık, her gün 09:00–00:00.",
  keywords: [
    "Rumeli İskelesi",
    "Tekirdağ restoran",
    "Süleymanpaşa kafeterya",
    "Tekirdağ köftesi",
    "Süleymanpaşa Belediyesi",
    "deniz kenarı restoran",
    "Tekirdağ yemek",
  ],
  openGraph: {
    title: "Rumeli İskelesi | Kafeterya & Restoran",
    description: "Tekirdağ Süleymanpaşa'da deniz kenarında eşsiz lezzetler",
    type: "website",
    locale: "tr_TR",
    url: SITE_URL,
    siteName: "Rumeli İskelesi",
    images: [{ url: "/images/hero/rumeli-cam.jpg", width: 1200, height: 630, alt: "Rumeli İskelesi" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rumeli İskelesi",
    description: "Tekirdağ Süleymanpaşa'da deniz kenarında eşsiz lezzetler",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Rumeli İskelesi",
  description: "Mutlukent Esenlik Hizmetleri A.Ş tarafından işletilen, deniz kenarında halka açık kafeterya ve restoran.",
  url: SITE_URL,
  image: `${SITE_URL}/images/hero/rumeli-cam.jpg`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Süleymanpaşa",
    addressRegion: "Tekirdağ",
    addressCountry: "TR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 40.966,
    longitude: 27.515,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      opens: "09:00",
      closes: "00:00",
    },
  ],
  servesCuisine: ["Turkish", "Fast Food", "Desserts"],
  priceRange: "₺",
  sameAs: ["https://instagram.com/mutlukent.sosyal"],
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "tr" | "en" | "bg" | "el")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <meta name="theme-color" content="#d9892a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Rumeli İskelesi" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="apple-touch-icon" href="/images/logo/rumeli-logo-transparent.png" />
        <link rel="icon" type="image/png" href="/images/logo/rumeli-logo-transparent.png" />
      </head>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
