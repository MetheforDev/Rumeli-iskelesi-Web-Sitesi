export type MenuItem = {
  id: string;
  name: string;
  price?: string;
  description?: string;
  badge?: string;
  allergens?: string;
  image?: string;
  images?: string[];
};

export type MenuCategory = {
  id: string;
  label: string;
  emoji: string;
  /** Kategori başlığının üstünde gösterilen, isteğe bağlı geniş banner görseli. */
  image?: string;
  items: MenuItem[];
};

// Tüm menü verisinin tek kaynağı. Featured (öne çıkanlar) gibi başka
// bölümler burada tanımlı bir öğeyi göstermek isterse veriyi kopyalamak
// yerine getMenuItem(id) ile bu diziden referans alır.
export const menuData: MenuCategory[] = [
  {
    id: "kahvalti",
    label: "Kahvaltı",
    emoji: "🍳",
    items: [
      { id: "kahvalti-tabagi", name: "Kahvaltı Tabağı", price: "300", image: "/images/menu/Kahvaltı tabağı.jpg" },
      { id: "sucuklu-yumurta", name: "Sucuklu Yumurta", price: "150" },
      { id: "sahanda-yumurta", name: "Sahanda Yumurta", price: "100" },
      { id: "menemen", name: "Menemen", price: "150" },
    ],
  },
  {
    id: "kofte",
    label: "Tekirdağ Köftesi",
    emoji: "🥩",
    items: [
      { id: "tekirdag-koftesi", name: "Tekirdağ Köftesi", price: "350", image: "/images/menu/tekirdag-koftesi.jpg" },
      { id: "coban-salata", name: "Çoban Salata", price: "120" },
      { id: "coban-salata-double", name: "Çoban Salata Double", price: "180" },
      { id: "piyaz", name: "Piyaz", price: "120" },
      { id: "piyaz-double", name: "Piyaz Double", price: "180" },
    ],
  },
  {
    id: "fastfood",
    label: "Fast Food",
    emoji: "🍔",
    items: [
      { id: "hamburger", name: "Hamburger", price: "250", images: ["/images/menu/hamburger-1.jpg", "/images/menu/hamburger-2.jpg"] },
      { id: "cheeseburger", name: "Cheeseburger", price: "275" },
      { id: "kalem-boregi", name: "Kalem Böreği", price: "130" },
      { id: "kasarli-tost", name: "Kaşarlı Tost", price: "120" },
      { id: "cift-kasarli-tost", name: "Çift Kaşarlı Tost", price: "150", image: "/images/menu/cift-kasarli-tost.jpg" },
      { id: "kasarli-tost-tabagi", name: "Kaşarlı Tost Tabağı", price: "150", description: "Domates, salatalık ve zeytin ile servis edilir" },
      { id: "karisik-tost", name: "Karışık Tost", price: "150" },
      { id: "karisik-tost-tabagi", name: "Karışık Tost Tabağı", price: "180" },
      { id: "kombo-mix", name: "Kombo Mix", price: "200" },
      { id: "soguk-sandvic", name: "Soğuk Sandviç", price: "100", description: "Beyaz peynirli veya kaşarlı", image: "/images/menu/soguk-sandvic.png" },
      { id: "patates-kizartmasi", name: "Patates Kızartması", price: "100", description: "Tek porsiyon", image: "/images/menu/patates.png" },
      { id: "sosisli", name: "Sosisli", price: "100", image: "/images/menu/sosisli.jpg" },
    ],
  },
  {
    id: "sicak",
    label: "Sıcak İçecekler",
    emoji: "🍵",
    items: [
      { id: "cay", name: "Çay", price: "15", image: "/images/menu/Çay ai.jpg" },
      { id: "cay-double", name: "Double Çay", price: "30", image: "/images/menu/Çay Double.jpg" },
      { id: "turk-kahvesi", name: "Türk Kahvesi", price: "75", image: "/images/menu/Türk Kahvesi.jpg" },
      { id: "turk-kahvesi-double", name: "Türk Kahvesi Double", price: "100", image: "/images/menu/Türk kahvesi Double.jpg" },
      { id: "oralet-cesitleri", name: "Oralet Çeşitleri", price: "15" },
      { id: "adacayi", name: "Adaçayı", price: "30" },
      { id: "demleme-ihlamur", name: "Demleme Ihlamur", price: "100" },
      { id: "salep", name: "Salep", badge: "seasonal_badge" },
    ],
  },
  {
    id: "kahveler",
    label: "Kahveler",
    emoji: "☕",
    image: "/images/menu/Kahveler hero.png",
    items: [
      { id: "americano", name: "Americano", price: "100", image: "/images/menu/Americano.png" },
      { id: "espresso", name: "Espresso", price: "75", image: "/images/menu/Espresso.png" },
      { id: "double-espresso", name: "Double Espresso", price: "90", image: "/images/menu/Double espresso.png" },
      { id: "cappucino", name: "Cappucino", price: "100", image: "/images/menu/Cappucino.png" },
      { id: "vanilyali-cappucino", name: "Vanilyalı Cappucino", price: "100", image: "/images/menu/Vanilyalı Cappucino.png" },
      { id: "latte", name: "Latte", price: "100", image: "/images/menu/Latte.png" },
      { id: "mocha", name: "Mocha", price: "100", image: "/images/menu/Mocha.png" },
      { id: "sicak-cikolata", name: "Sıcak Çikolata", price: "100", image: "/images/menu/Sıcak Çikolata.png" },
    ],
  },
  {
    id: "soguk",
    label: "Soğuk İçecekler",
    emoji: "🥤",
    items: [
      { id: "ayran", name: "Ayran", price: "50", image: "/images/menu/ayran-ozgullu.jpg" },
      { id: "limonata", name: "Limonata", price: "80", image: "/images/menu/limonata-dokme.jpg" },
      { id: "soguk-kahve-cesitleri", name: "Soğuk Kahve Çeşitleri", price: "100", description: "El yapımı çeşitleri", image: "/images/menu/soguk-nescafe.jpg" },
      { id: "nescafe-express-cesitleri", name: "Nescafe Express Çeşitleri", price: "100", images: ["/images/menu/nescafe-express-orjinal.jpg", "/images/menu/nescafe-express-vanilla.jpg"] },
      { id: "uzum-suyu", name: "Üzüm Suyu", price: "80", description: "Katkısız", image: "/images/menu/uzum-suyu-suleymanpasa.jpg" },
      { id: "meyveli-soda", name: "Meyveli Soda", price: "40", images: ["/images/menu/karpuz-cilek-soda-ozkaynak.jpg", "/images/menu/elmali-soda-ozkaynak.jpg", "/images/menu/limonlu-soda-ozkaynak.jpg"] },
      { id: "sade-soda", name: "Sade Soda", price: "30", image: "/images/menu/sade-soda-ozkaynak.jpg" },
      { id: "fuse-tea-cesitleri", name: "Fuse Tea Çeşitleri", price: "65", description: "Karpuz · Limon · Mango · Şeftali", images: ["/images/menu/fuse-tea-karpuz.jpg", "/images/menu/fuse-tea-limon.jpg", "/images/menu/fuse-tea-mango.jpg", "/images/menu/fuse-tea-seftali.jpg"] },
      { id: "cappy-meyve-suyu", name: "Cappy Meyve Suyu", price: "65", description: "Karışık · Kayısı · Vişne · Şeftali", images: ["/images/menu/cappy-karisik.jpg", "/images/menu/cappy-kayisi.jpg", "/images/menu/cappy-visne.jpg", "/images/menu/cappy-seftali.jpg"] },
      { id: "cam-icecekler", name: "Cam İçecekler", price: "50", image: "/images/menu/coca-cola-cam-sise.jpg" },
      { id: "kutu-icecekler", name: "Kutu İçecekler", price: "65", description: "Coca Cola · Zero · Fanta · Sprite", images: ["/images/menu/coca-cola-kutu.jpg", "/images/menu/coca-cola-kutu-zero.jpg", "/images/menu/fanta.jpg", "/images/menu/sprite-kutu.jpg"] },
      { id: "su-05", name: "0.50 Su", price: "15", image: "/images/menu/su-05-ozkaynak.jpg" },
    ],
  },
  {
    id: "tatlilar",
    label: "Tatlılar",
    emoji: "🍮",
    items: [
      { id: "san-sebastian", name: "San Sebastian", price: "200", badge: "Premium", description: "Ekstra çikolata sos ile servis edilir", allergens: "Süt · Yumurta · Gluten", image: "/images/menu/San Sebastian ai.jpg" },
      { id: "magnolya", name: "Magnolya", price: "160", allergens: "Süt · Yer Fıstığı · Gluten · Yumurta", image: "/images/menu/Magnolya ai.jpg" },
      { id: "tiramisu", name: "Tiramisu", price: "160", allergens: "Süt · Yumurta · Gluten", image: "/images/menu/Tiramisu ai.jpg" },
      { id: "peynir-helvasi", name: "Peynir Helvası", price: "160", allergens: "Süt · Gluten", image: "/images/menu/Peynir helvası ai.jpg" },
      { id: "cheesecake-cesitleri", name: "Cheesecake Çeşitleri", price: "160", allergens: "Süt · Yumurta · Gluten", image: "/images/menu/Limonlu cheescake ai.jpg" },
      { id: "truff", name: "Truff", price: "160", allergens: "Süt · Yer Fıstığı · Gluten · Yumurta" },
      { id: "ibiza", name: "İbiza", price: "160", allergens: "Süt · Gluten" },
      { id: "trilece", name: "Trileçe", price: "160", allergens: "Süt · Yumurta · Gluten" },
      { id: "mozaik", name: "Mozaik", price: "160", allergens: "Süt · Gluten" },
    ],
  },
];

/** Verilen id'ye ait menü öğesini döner. Bulunamazsa hata fırlatır —
 * yanlış/eski bir id referansı build/dev sırasında hemen fark edilsin. */
export function getMenuItem(id: string): MenuItem {
  for (const category of menuData) {
    const item = category.items.find((i) => i.id === id);
    if (item) return item;
  }
  throw new Error(`getMenuItem: "${id}" menuData içinde bulunamadı`);
}
