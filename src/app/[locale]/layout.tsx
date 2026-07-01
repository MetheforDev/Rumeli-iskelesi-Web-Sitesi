import type { Metadata } from "next";
import { Barlow_Semi_Condensed, Mulish } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { generateSeoMetadata } from "@/lib/seo";
import { RestaurantJsonLd } from "@/components/seo/RestaurantJsonLd";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import type { Locale } from "@/lib/site-config";
import { BRAND_HEX } from "@/lib/colors";
import "../globals.css";

const displayFont = Barlow_Semi_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const bodyFont = Mulish({
  subsets: ["latin", "cyrillic"],
  variable: "--font-body",
  display: "swap",
});

// SSG: 4 locale'i build time'da üret
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Tanımsız diller (örn. /xx) 404 döndürsün
export const dynamicParams = false;

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) return {};
  return generateSeoMetadata(locale as Locale);
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // setRequestLocale MUTLAKA getMessages'tan önce
  setRequestLocale(locale as Locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${bodyFont.variable} ${displayFont.variable}`}>
      <head>
        <RestaurantJsonLd locale={locale as Locale} />
        <meta name="theme-color" content={BRAND_HEX.primary} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Rumeli İskelesi" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="apple-touch-icon" href="/images/logo/rumeli-logo-transparent.png" />
        <link rel="icon" type="image/png" href="/images/logo/rumeli-logo-transparent.png" />
      </head>
      <body className="antialiased">
        <SmoothScroll />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
