# Rumeli İskelesi — Web Sitesi

Tekirdağ'da geleneksel Türk lezzetleri sunan **Rumeli İskelesi** için geliştirilmiş, mobil-öncelikli, PWA destekli restoran web sitesi.

🌐 **Canlı Site:** [rumeli-iskelesi-web-sitesi.vercel.app](https://rumeli-iskelesi-web-sitesi.vercel.app)

---

## Tech Stack

| Katman | Teknoloji |
|---|---|
| Framework | Next.js 16 — App Router |
| UI | React 19, TypeScript 6, Tailwind CSS 4 (CSS-first) |
| Animasyon | Framer Motion 12 |
| İkon | Lucide React |
| Primitif | Radix UI (Dialog, NavigationMenu, ScrollArea) |
| QR Kod | qrcode.react |
| Bileşen | clsx + tailwind-merge (`cn()`), cva |
| i18n | next-intl — TR / EN / BG / EL |
| Deployment | Vercel (SSG, 4 locale) |

---

## Özellikler

- **Hero Slideshow** — Ken Burns efekti, 4 görselli otomatik döngü (restoran + yemek banner'ları)
- **Öne Çıkanlar** — Yatay sürüklenebilir kart listesi (Köfte, Kahvaltı, Hamburger, San Sebastian, Tost, Patates)
- **Tam Menü** — 6 kategori: Kahvaltı · Tekirdağ Köftesi · Fast Food · Sıcak İçecekler · Soğuk İçecekler · Tatlılar
  - Görsel galerisine sahip ürün kartları (çoklu fotoğraf desteği)
  - Alerjen bilgisi, sezonluk rozet
  - Kategori filtre sekmeleri
  - QR kod (masa üstü dijital menü bağlantısı)
- **Yorumlar, Galeri, Footer** — tam SEO şemasıyla
- **Çok Dil** — Türkçe, İngilizce, Bulgarca, Yunanca
- **PWA** — Web app manifest, offline hazır altyapı

---

## Klasör Yapısı

```
src/
├── app/[locale]/       → layout, page, metadata
├── components/
│   ├── sections/       → navbar, hero, info-bar, featured, menu, reviews, gallery, footer
│   └── ui/             → sparkles, text-reveal, card-hover, parallax, moving-border,
│                          lightbox, sticky-actions, announcement-bar, weather-widget
└── lib/utils.ts        → cn() helper
public/
├── images/
│   ├── hero/           → restoran dış mekan görselleri
│   └── menu/           → yemek/içecek ürün ve banner görselleri
└── ...                 → favicon, manifest, og-image
```

---

## Geliştirme

```bash
npm install
npm run dev      # localhost:3000
npm run build    # production build
npm run lint     # ESLint
```

---

## Menü Kategorileri & Görseller

| Kategori | Görselli Öğeler |
|---|---|
| Kahvaltı | Kahvaltı Tabağı |
| Tekirdağ Köftesi | Tekirdağ Köftesi |
| Fast Food | Hamburger (2 görsel), Çift Kaşarlı Tost, Soğuk Sandviç, Patates, Sosisli |
| Sıcak İçecekler | Double Çay, Türk Kahvesi, Türk Kahvesi Double |
| Soğuk İçecekler | Ayran, Limonata, Soğuk Kahve, Nescafe Express, Üzüm Suyu, Sodalar, Fuse Tea, Cappy, Cam/Kutu İçecekler, Su |
| Tatlılar | San Sebastian, Magnolya, Tiramisu, Peynir Helvası, Cheesecake |

---

## SEO

- `generateMetadata` + OpenGraph her locale için
- JSON-LD: `Restaurant` / `LocalBusiness` / `Menu` şeması
- `hreflang` alternate linkleri
- `sitemap.xml` + `robots.txt`
- NAP (İsim · Adres · Telefon) tek kaynaktan yönetilir

---

## İletişim

📧 rumeliskelesi@gmail.com
