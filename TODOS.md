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
