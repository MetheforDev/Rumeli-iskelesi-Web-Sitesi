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

- [x] **Featured ↔ Menu veri tekrarı** — `src/lib/menu-data.ts` tek kaynak
      oldu, `featuredItems` artık `getMenuItem(id)` ile türetiliyor. Çözüldü.
- [x] **Renk token mimarisi CLAUDE.md'yi ihlal ediyor** — renkler artık
      `globals.css`'teki `@theme` bloğunda tek kaynak; `tailwind.config.ts`,
      hardcoded hex literal'ler ve `SectionGlow`'un RGBA haritası kaldırıldı.
      Çözüldü.
- [ ] **gstack + OpenAI key oranlılık değerlendirmesi** — gstack "team mode"
      ile global zorunlu yapıldı (PreToolUse hook, Skill tool'unu bloklar)
      ve OpenAI API key kalıcı ortam değişkeni olarak eklendi. Hem CEO hem
      mühendislik incelemesi bunu tek kişilik bir proje için orantısız/riskli
      buldu (üçüncü parti, sürümlenmemiş bir GitHub deposuna sert bağımlılık).
      Kullanıcı kararı: gerekirse `./setup --no-team` ile geri alınabilir.
- [x] **RSC ihlali** — `FadeInView` wrapper eklendi; `footer.tsx` ve
      `reviews.tsx` artık tam Server Component (`getTranslations` ile
      server-side çeviri). Diğer bölümler (hero/navbar/info-bar/menu/
      featured/gallery) gerçek interaktif state nedeniyle kasıtlı olarak
      client kaldı — istisna listesi CLAUDE.md'ye eklendi. Çözüldü.
- [x] **Locale key parity güvenliği yok** — `global.d.ts` ile next-intl
      `AppConfig.Messages` augmentasyonu (yanlış `t()` key'i derleme zamanı
      hatası verir) + `scripts/check-locales.mjs` (4 dilin key seti farklıysa
      `prebuild`'de build'i kırar) eklendi. Çözüldü.
- [x] **Menü/galeri görsel yolu doğrulaması yok** — `scripts/check-image-paths.mjs`
      tüm `/images/...` referanslarını `public/` ile karşılaştırıp `prebuild`'de
      doğruluyor. Çözüldü.
- [x] **Bilgi hiyerarşisi — yol tarifi erişimi** — ağır Google Maps iframe'i
      Footer'da kalmaya devam ediyor (hero'nun sinematik görsel diliyle
      çakışmaması için taşınmadı), ama erişim hızı çözüldü: `StickyActions`
      artık 300px scroll beklemeden sayfa açılır açılmaz görünüyor (mobil),
      `InfoBar`'daki "📍 Konum" kartı artık doğrudan `NAP.googleMapsUrl`'e
      tıklanabilir link. Acil ziyaretçi scroll etmeden yol tarifine ulaşıyor.
      Featured/Menu birleşmesi ayrı, görsel etkisi daha büyük bir karar —
      ayrıca ele alınabilir.
