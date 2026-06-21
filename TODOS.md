# TODOS

Bu dosya, `/review` ve `/autoplan` oturumlarında ertelenen veya gelecek
kapsam olarak işaretlenen işleri toplar.

## Ertelenen (review/autoplan'dan)

- [ ] **PWA offline desteği** — manifest mevcut ama service worker yok.
      Serwist (next-pwa'nın modern halefi) önerildi. CLAUDE.md'de not edilmiş.
- [ ] **Menü için CMS/admin paneli** — şu an her fiyat/ürün değişikliği kod
      değişikliği + deploy gerektiriyor. İşletme sahibi kendi başına
      güncelleyemiyor.
- [ ] **Otomatik test altyapısı** — `/qa` sırasında bilinçli olarak atlandı
      (statik pazarlama sitesi, karmaşık iş mantığı yok). İleride form/etkileşim
      eklenirse yeniden değerlendirilmeli.
- [ ] **Analytics/dönüşüm takibi** — Vercel Analytics veya GA yok, hangi
      bölümün ziyaretçiyi menüye/iletişime çektiği ölçülemiyor.
- [ ] **Galeri grid'inin mobil aspect-ratio'su** — sabit 260px satır yüksekliği,
      dar ekranlarda çok dar/uzun kırpma üretiyor (`/review`'da bulundu, UX
      kararı olduğu için düzeltilmedi).

## Ertelenen (autoplan retrospektif — CEO/Tasarım/Mühendislik bulguları)

- [ ] **Featured ↔ Menu veri tekrarı** — `featured.tsx`'teki `featuredItems` ve
      `menu.tsx`'teki `menuData` aynı ürünleri (Tekirdağ Köftesi, ₺350 vb.)
      bağımsız sabitler olarak tutuyor. Fiyat değişince ikisi de güncellenmeli,
      hiçbir mekanizma bunu zorlamıyor. Hem tasarım hem mühendislik incelemesi
      bağımsız olarak bu bulguyu işaretledi (cross-phase, yüksek güven).
      Önerilen çözüm: `featuredItems`'ı `menuData`'dan id ile türet, ayrı
      sabit tutma.
- [ ] **Renk token mimarisi CLAUDE.md'yi ihlal ediyor** — CLAUDE.md
      `@theme` blok zorunluluğu koyuyor ama marka renkleri `tailwind.config.ts`
      (JS config, v3 alışkanlığı) + en az 7 dosyada hardcoded hex literal
      (`#d9892a`, `#f4c56a`) + `SectionGlow`'un kendi RGBA haritası olarak
      3 ayrı kaynakta yaşıyor. Rebrand/kontrast düzeltmesi gerektiğinde
      grep-replace yerine tek `@theme` token'ı düzeltmek yeterli olmalı.
- [ ] **gstack + OpenAI key oranlılık değerlendirmesi** — gstack "team mode"
      ile global zorunlu yapıldı (PreToolUse hook, Skill tool'unu bloklar)
      ve OpenAI API key kalıcı ortam değişkeni olarak eklendi. Hem CEO hem
      mühendislik incelemesi bunu tek kişilik bir proje için orantısız/riskli
      buldu (üçüncü parti, sürümlenmemiş bir GitHub deposuna sert bağımlılık).
      Kullanıcı kararı: gerekirse `./setup --no-team` ile geri alınabilir.
- [ ] **RSC ihlali** — CLAUDE.md "Server Component varsayılan" diyor ama tüm
      section bileşenleri `"use client"`. Çoğu sadece `useInView` fade-in
      animasyonu için client — bu tek bir `<FadeInView>` wrapper'a çekilip
      asıl içerik server component'te kalabilir.
- [ ] **Locale key parity güvenliği yok** — 4 dilin `messages/*.json` key
      seti şu an birebir ama bunu zorlayan tip kontrolü (`global.d.ts` ile
      next-intl `IntlMessages` augmentasyonu) veya build-time script yok.
      Gelecekte sadece tr.json'a key eklenirse diğer 3 dilde sessizce
      "MISSING_MESSAGE" hatası oluşur.
- [ ] **Menü/galeri görsel yolu doğrulaması yok** — `menuData`/`HERO_IMAGES`
      içindeki string görsel yolları `public/` ile eşleşip eşleşmediği
      build-time kontrol edilmiyor; yazım hatası sessizce kırık görsel üretir.
- [ ] **Bilgi hiyerarşisi** — Hero → InfoBar → Featured → Menu → Reviews →
      Gallery → Footer sırası, "şu an açık mı + ne yiyeyim + nasıl giderim"
      arayan acil mobil ziyaretçi için harita/yol tarifini 7 bölüm sona
      atıyor. Featured'ın Menu'ye katılması + yol tarifi CTA'sının yukarı
      alınması önerildi.
