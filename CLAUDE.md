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
├── app/[locale]/   → layout, page (next-intl route segmenti), manifest, sitemap
├── i18n/           → routing.ts, request.ts (next-intl yapılandırması)
├── components/
│   ├── sections/   → navbar, hero, info-bar, featured, menu, reviews, gallery, footer
│   ├── seo/        → RestaurantJsonLd
│   └── ui/         → sparkles, text-reveal, card-hover, parallax, moving-border,
│                     lightbox, sticky-actions, announcement-bar, fade-in-view,
│                     section-glow, scroll-progress, weather-widget
└── lib/
    ├── utils.ts        → cn() helper
    ├── site-config.ts  → NAP — işletme bilgisi tek kaynağı
    ├── menu-data.ts     → menuData — menü verisi tek kaynağı, getMenuItem(id)
    ├── colors.ts       → BRAND_HEX — CSS dışı (canvas/manifest/meta) bağlamlar için
    └── seo.ts          → generateSeoMetadata()
İLERİDE EKLENECEK (gerektiğinde): src/hooks/, src/context/, src/components/three/

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
  browser API gerekirse 'use client' ekle. Sadece scroll-reveal animasyonu
  için client'a geçme — `FadeInView` (src/components/ui/fade-in-view.tsx)
  kullan, asıl içerik Server Component'te kalsın (örnek: footer.tsx,
  reviews.tsx — `getTranslations` ile server-side çeviri).
  **Kasıtlı istisnalar** (gerçek interaktif state/hook nedeniyle client
  kalması gerekenler — yeni bölüm eklerken bu listeyi kontrol et, "diğerleri
  de client" diye kopyalama): `hero.tsx` (slideshow state/timer, scroll
  parallax), `navbar.tsx` (mobil menü state, scroll-spy IntersectionObserver,
  dil seçici routing), `info-bar.tsx` (canlı saat/açık-kapalı hesaplaması),
  `menu.tsx` (kategori tab state), `featured.tsx`/`gallery.tsx` (drag
  carousel / lightbox state).
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

## i18n Kuralları (next-intl, 4 dil: tr/en/bg/el)
- `messages/{tr,en,bg,el}.json` — yeni bir çeviri key'i eklerken **4 dosyanın
  hepsine** eklenmeli. `npm run build` öncesi `prebuild` script'i
  (`check:locales`) bunu otomatik doğrular; key eksikse build kırılır.
- `messages/tr.d.json.ts` next.config.ts'teki next-intl plugin tarafından
  otomatik üretilir (gitignored, elle düzenleme), `global.d.ts`'teki
  `AppConfig.Messages` augmentasyonu sayesinde `t("yanlış-key")` derleme
  zamanında hata verir. ICU placeholder'lara (`{h}`, `{count}` vb.) sayı
  geçirirken `String(...)` ile sarmalamak gerekir (literal tipli mesaj
  bildirimi yüzünden next-intl bunları `string` bekliyor).
- Yeni bir görsel yolu eklerken `prebuild`'in `check:images` script'i
  `public/` altında karşılığı olmayan yolları yakalar (build kırılır).

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

## gstack (REQUIRED — global install)

**Before doing ANY work, verify gstack is installed:**

```bash
test -d ~/.claude/skills/gstack/bin && echo "GSTACK_OK" || echo "GSTACK_MISSING"
```

If GSTACK_MISSING: STOP. Do not proceed. Tell the user:

> gstack is required for all AI-assisted work in this repo.
> Install it:
> ```bash
> git clone --depth 1 https://github.com/garrytan/gstack.git ~/.claude/skills/gstack
> cd ~/.claude/skills/gstack && ./setup --team
> ```
> Then restart your AI coding tool.

Do not skip skills, ignore gstack errors, or work around missing gstack.

Using gstack skills: After install, skills like /qa, /ship, /review, /investigate,
and /browse are available. Use /browse for all web browsing.
Use ~/.claude/skills/gstack/... for gstack file paths (the global path).

## Skill routing

When the user's request matches an available skill, invoke it via the Skill tool. When in doubt, invoke the skill.

Key routing rules:
- Product ideas/brainstorming → invoke /office-hours
- Strategy/scope → invoke /plan-ceo-review
- Architecture → invoke /plan-eng-review
- Design system/plan review → invoke /design-consultation or /plan-design-review
- Full review pipeline → invoke /autoplan
- Bugs/errors → invoke /investigate
- QA/testing site behavior → invoke /qa or /qa-only
- Code review/diff check → invoke /review
- Visual polish → invoke /design-review
- Ship/deploy/PR → invoke /ship or /land-and-deploy
- Save progress → invoke /context-save
- Resume context → invoke /context-restore
- Author a backlog-ready spec/issue → invoke /spec
