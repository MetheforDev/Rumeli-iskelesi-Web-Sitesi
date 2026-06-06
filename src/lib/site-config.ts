export const SITE_URL = "https://rumeli-iskelesi-web-sitesi.vercel.app";

export const LOCALES = ["tr", "en", "bg", "el"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "tr";

/** Google OpenGraph locale codes per language */
export const LOCALE_OG: Record<Locale, string> = {
  tr: "tr_TR",
  en: "en_US",
  bg: "bg_BG",
  el: "el_GR",
};

/** Single source of truth for NAP + business data */
export const NAP = {
  name: "Rumeli İskelesi",
  operator: "Mutlukent Esenlik Hizmetleri A.Ş",
  email: "rumeliskelesi@gmail.com",
  address: {
    street: "Rumeli İskelesi",
    city: "Süleymanpaşa",
    region: "Tekirdağ",
    country: "TR",
  },
  geo: { lat: 40.966, lng: 27.515 },
  hours: { opens: "09:00", closes: "00:00" },
  instagram: "https://instagram.com/mutlukent.sosyal",
  heroImage: "/images/hero/rumeli-cam.jpg",
} as const;
