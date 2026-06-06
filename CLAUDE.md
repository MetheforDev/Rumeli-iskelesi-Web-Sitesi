# Rumeli İskelesi — Proje Kuralları (CLAUDE.md)

## Özet
Tekirdağ'da geleneksel Türk lezzetleri (köfte, kahvaltı, tost, kahve) sunan
işletme için web sitesi. Hedef: %90 mobil, PWA destekli, premium native-app
hissi veren, ilk bakışta "vay be" dedirten ama hızlı ve taranabilir bir site.
Canlı: https://rumeli-iskelesi-web-sitesi.vercel.app
İletişim: rumeliskelesi@gmail.com

## Tech Stack (gerçek kurulu sürümler)
- Next.js ^16.2.6 — App Router (src/app/)
- React / react-dom ^19.2.6
- TypeScript ^6.0.3
- Tailwind CSS ^4.3.0  (⚠️ v4 — CSS-first config, aşağıya bak)
- framer-motion ^12.40.0 — tüm animasyonlar
- qrcode.react ^4.2.0 — QR kod
- @radix-ui/react-* — erişilebilir primitive'ler (Dialog, NavigationMenu, ScrollArea)
- lucide-react — ikonlar
- clsx + tailwind-merge — cn() helper (src/lib/utils.ts)
- class-variance-authority (cva) — bileşen varyantları
HENÜZ KURULU DEĞİL: three / @react-three/fiber / @react-three/drei (3D milestone'unda eklenecek)

## Mevcut Klasör Yapısı (yeniden yaratma, mevcudu kullan)
src/
├── app/            → layout, page, globals.css, manifest, sitemap, favicon
├── components/
│   ├── sections/   → navbar, hero, info-bar, featured, menu, reviews, gallery, footer
│   └── ui/         → sparkles, text-reveal, card-hover, parallax, moving-border,
│                     lightbox, sticky-actions, announcement-bar
└── lib/utils.ts    → cn() helper
İLERİDE EKLENECEK (gerektiğinde): src/hooks/, src/context/,
src/components/three/, src/components/seo/, src/lib/menu.ts, src/lib/site-config.ts

## Komutlar
- Geliştirme: npm run dev
- Build: npm run build
- Lint: npm run lint
Yeni dosya/bileşen eklemeden önce ilgili dosyayı OKU; aynı işi yapan
mevcut bir bileşen varsa onu kullan/genişlet, kopyasını yaratma.

## Mutlak Kurallar
- Placeholder YASAK: `// TODO`, `// ...`, `// rest of code` yazma.
  Her dosya eksiksiz, kopyala-yapıştır çalışır ve üretime hazır olsun.
- Mobile-first: her UI önce dokunmatik + mobil performans için kurgulanır.
- Performans bütçesi: mobilde Lighthouse 90+. useMemo/useCallback, lazy load,
  next/image (AVIF/WebP). Gereksiz 'use client' kullanma.
- RSC varsayılan: bileşenler Server Component'tir; sadece etkileşim/hook/
  browser API gerekirse 'use client' ekle.
- Mevcut klasör mimarisini koru; dosyaları doğru yere koy.

## Çekirdek Mimari Prensip (EN ÖNEMLİ KURAL)
İçerik (menü, fiyat, konum, saat, iletişim) = Server Component / statik,
taranabilir, hızlı boyanan HTML. Ağır görsel efektler ve (ileride) 3D =
İLERLEMELİ ZENGİNLEŞTİRME: içerik boyandıktan SONRA, cihaz gücü +
prefers-reduced-motion + Save-Data'ya göre KOŞULLU yüklenir.
Efektler/3D asla ilk boyamayı, etkileşimi veya SEO'yu bloklamaz.

## Tailwind v4 Kuralları (v3 ALIŞKANLIKLARINI KULLANMA)
- globals.css içinde `@import "tailwindcss";` kullanılır.
- Tasarım token'ları (renk, font, spacing) JS config'te DEĞİL,
  globals.css içinde `@theme { --color-...: ...; }` ile tanımlanır.
- `tailwind.config.js` zorunlu değildir; gerekirse `@config` ile bağlanır.
- PostCSS eklentisi: @tailwindcss/postcss.
- Sınıf birleştirme her zaman cn() (clsx + tailwind-merge) ile yapılır.
- Bileşen varyantları cva ile tanımlanır.

## Animasyon Kuralları
- Tüm animasyonlar framer-motion ile (paket adı framer-motion, import
  motion/react veya framer-motion). Mevcut ui/ efekt bileşenlerini tercih et.
- prefers-reduced-motion: reduce olduğunda animasyonlar sönümlenmeli/kapanmalı
  (useReducedMotion). Bu erişilebilirlik zorunluluğu.

## 3D Kuralları (ileride; henüz aktif değil)
- React 19/Next 16 için R3F v9 gerekir.
- Canvas bileşeni 'use client' olur ve next/dynamic { ssr:false } ile yüklenir.
- Mobilde ASLA birden fazla WebGL context açma → tek global canvas
  + tunnel-rat ile portal. frameloop="demand", dpr clamp [1,2].
- 3D yalnızca "full"/"reduced" cihaz kademesinde; "lite"de sadece
  Framer Motion/CSS fallback gösterilir.

## SEO (mevcut schema'yı genişlet)
- Her sayfa generateMetadata + OpenGraph.
- JSON-LD: Restaurant / LocalBusiness / Menu schema. Yerel SEO öncelikli
  (Google Maps, işletme hesabı, "tekirdağ köfte/kahvaltı/kahve" aramaları).
- NAP (isim-adres-telefon) tüm sitede birebir tutarlı olmalı; tek kaynaktan.
- sitemap ve robots güncel tutulur.

## PWA (manifest var, offline katmanı eksik)
- Manifest zaten mevcut → koru/genişlet, yeniden yaratma.
- Eksik parça: service worker / offline desteği. Next.js 16 ile uyumlu
  Serwist (next-pwa'nın modern halefi) önerilir; manifest tek başına
  offline sağlamaz.

## Git
- origin/main güncel. Her milestone'u ayrı branch + küçük, anlamlı commit'lerle
  ilerlet. Build kırılmadan main'e merge etme.
