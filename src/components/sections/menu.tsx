"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { HoverCard } from "@/components/ui/card-hover";
import { TextReveal } from "@/components/ui/text-reveal";
import { useTranslations } from "next-intl";
import { SectionGlow } from "@/components/ui/section-glow";

const SITE_URL = "https://en.mutlukentmenu.com/qrmenu";

type MenuItem = {
  name: string;
  price?: string;
  description?: string;
  badge?: string;
  allergens?: string;
  image?: string;
  images?: string[];
};

type MenuCategory = {
  id: string;
  label: string;
  emoji: string;
  items: MenuItem[];
};

const menuData: MenuCategory[] = [
  {
    id: "kahvalti",
    label: "Kahvaltı",
    emoji: "🍳",
    items: [
      { name: "Kahvaltı Tabağı", price: "300", image: "/images/menu/Kahvaltı tabağı.jpg" },
      { name: "Sucuklu Yumurta", price: "150" },
      { name: "Sahanda Yumurta", price: "100" },
      { name: "Menemen", price: "150" },
    ],
  },
  {
    id: "kofte",
    label: "Tekirdağ Köftesi",
    emoji: "🥩",
    items: [
      { name: "Tekirdağ Köftesi", price: "350", image: "/images/menu/tekirdag-koftesi.jpg" },
      { name: "Çoban Salata", price: "120" },
      { name: "Çoban Salata Double", price: "180" },
      { name: "Piyaz", price: "120" },
      { name: "Piyaz Double", price: "180" },
    ],
  },
  {
    id: "fastfood",
    label: "Fast Food",
    emoji: "🍔",
    items: [
      { name: "Hamburger", price: "250", images: ["/images/menu/hamburger-1.jpg", "/images/menu/hamburger-2.jpg"] },
      { name: "Cheeseburger", price: "275" },
      { name: "Kalem Böreği", price: "130" },
      { name: "Kaşarlı Tost", price: "120" },
      { name: "Çift Kaşarlı Tost", price: "150", image: "/images/menu/cift-kasarli-tost.jpg" },
      { name: "Kaşarlı Tost Tabağı", price: "150", description: "Domates, salatalık ve zeytin ile servis edilir" },
      { name: "Karışık Tost", price: "150" },
      { name: "Karışık Tost Tabağı", price: "180" },
      { name: "Kombo Mix", price: "200" },
      { name: "Soğuk Sandviç", description: "Beyaz peynirli veya kaşarlı", image: "/images/menu/soguk-sandvic.png" },
      { name: "Patates Kızartması", price: "100", description: "Tek porsiyon", image: "/images/menu/patates.png" },
      { name: "Sosisli", price: "100", image: "/images/menu/sosisli.jpg" },
    ],
  },
  {
    id: "sicak",
    label: "Sıcak İçecekler",
    emoji: "☕",
    items: [
      { name: "Çay", price: "15", image: "/images/menu/Çay ai.jpg" },
      { name: "Double Çay", price: "30", image: "/images/menu/Çay Double.jpg" },
      { name: "Türk Kahvesi", price: "75", image: "/images/menu/Türk Kahvesi.jpg" },
      { name: "Türk Kahvesi Double", price: "100", image: "/images/menu/Türk kahvesi Double.jpg" },
      { name: "Oralet Çeşitleri", price: "15" },
      { name: "Adaçayı", price: "30" },
      { name: "Demleme Ihlamur", price: "100" },
      { name: "Salep", badge: "seasonal_badge" },
    ],
  },
  {
    id: "soguk",
    label: "Soğuk İçecekler",
    emoji: "🥤",
    items: [
      { name: "Ayran", price: "50", image: "/images/menu/ayran-ozgullu.jpg" },
      { name: "Limonata", price: "80", image: "/images/menu/limonata-dokme.jpg" },
      { name: "Soğuk Kahve Çeşitleri", price: "100", description: "El yapımı çeşitleri", image: "/images/menu/soguk-nescafe.jpg" },
      { name: "Nescafe Express Çeşitleri", price: "100", images: ["/images/menu/nescafe-express-orjinal.jpg", "/images/menu/nescafe-express-vanilla.jpg"] },
      { name: "Üzüm Suyu", price: "80", description: "Katkısız", image: "/images/menu/uzum-suyu-suleymanpasa.jpg" },
      { name: "Meyveli Soda", price: "40", images: ["/images/menu/karpuz-cilek-soda-ozkaynak.jpg", "/images/menu/elmali-soda-ozkaynak.jpg", "/images/menu/limonlu-soda-ozkaynak.jpg"] },
      { name: "Sade Soda", price: "30", image: "/images/menu/sade-soda-ozkaynak.jpg" },
      { name: "Fuse Tea Çeşitleri", price: "65", description: "Karpuz · Limon · Mango · Şeftali", images: ["/images/menu/fuse-tea-karpuz.jpg", "/images/menu/fuse-tea-limon.jpg", "/images/menu/fuse-tea-mango.jpg", "/images/menu/fuse-tea-seftali.jpg"] },
      { name: "Cappy Meyve Suyu", price: "65", description: "Karışık · Kayısı · Vişne · Şeftali", images: ["/images/menu/cappy-karisik.jpg", "/images/menu/cappy-kayisi.jpg", "/images/menu/cappy-visne.jpg", "/images/menu/cappy-seftali.jpg"] },
      { name: "Cam İçecekler", price: "50", image: "/images/menu/coca-cola-cam-sise.jpg" },
      { name: "Kutu İçecekler", price: "65", description: "Coca Cola · Zero · Fanta · Sprite", images: ["/images/menu/coca-cola-kutu.jpg", "/images/menu/coca-cola-kutu-zero.jpg", "/images/menu/fanta.jpg", "/images/menu/sprite-kutu.jpg"] },
      { name: "0.50 Su", price: "15", image: "/images/menu/su-05-ozkaynak.jpg" },
    ],
  },
  {
    id: "tatlilar",
    label: "Tatlılar",
    emoji: "🍮",
    items: [
      { name: "San Sebastian", price: "200", badge: "Premium", description: "Ekstra çikolata sos ile servis edilir", allergens: "Süt · Yumurta · Gluten", image: "/images/menu/San Sebastian ai.jpg" },
      { name: "Magnolya", price: "160", allergens: "Süt · Yer Fıstığı · Gluten · Yumurta", image: "/images/menu/Magnolya ai.jpg" },
      { name: "Tiramisu", price: "160", allergens: "Süt · Yumurta · Gluten", image: "/images/menu/Tiramisu ai.jpg" },
      { name: "Peynir Helvası", price: "160", allergens: "Süt · Gluten", image: "/images/menu/Peynir helvası ai.jpg" },
      { name: "Cheesecake Çeşitleri", price: "160", allergens: "Süt · Yumurta · Gluten", image: "/images/menu/Limonlu cheescake ai.jpg" },
      { name: "Truff", price: "160", allergens: "Süt · Yer Fıstığı · Gluten · Yumurta" },
      { name: "İbiza", price: "160", allergens: "Süt · Gluten" },
      { name: "Trileçe", price: "160", allergens: "Süt · Yumurta · Gluten" },
      { name: "Mozaik", price: "160", allergens: "Süt · Gluten" },
    ],
  },
];

function MenuCardWithImage({ item, index }: { item: MenuItem; index: number }) {
  const t = useTranslations("menu");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [imgIdx, setImgIdx] = useState(0);
  const allImages = item.images ?? (item.image ? [item.image] : []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
      className="md:col-span-2"
    >
      <HoverCard className="overflow-hidden">
        <div className="flex flex-col sm:flex-row">
          <div className="relative w-full sm:w-52 h-44 sm:h-auto shrink-0 bg-zinc-800 overflow-hidden">
            <Image
              src={allImages[imgIdx]}
              alt={item.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, 208px"
            />
            {allImages.length > 1 && (
              <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
                {allImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIdx(i)}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${i === imgIdx ? "bg-brand-400 w-3" : "bg-white/40"}`}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="flex-1 p-5 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <h3 className="font-semibold text-white text-base">{item.name}</h3>
                {item.badge && (
                  <span className="px-2 py-0.5 text-[10px] bg-brand-600/20 text-brand-300 border border-brand-600/30 rounded-full">
                    {item.badge === "seasonal_badge" ? t("seasonal_badge") : item.badge}
                  </span>
                )}
              </div>
              {item.description && (
                <p className="text-zinc-500 text-sm leading-relaxed">{item.description}</p>
              )}
              {item.allergens && (
                <p className="mt-2 text-[11px] text-zinc-600 flex items-center gap-1">
                  <span>⚠</span> {item.allergens}
                </p>
              )}
            </div>
            <div className="mt-4">
              {item.price ? (
                <span className="text-brand-400 font-bold text-xl">₺{item.price}</span>
              ) : (
                <span className="text-zinc-500 text-sm italic">{t("price_ask")}</span>
              )}
            </div>
          </div>
        </div>
      </HoverCard>
    </motion.div>
  );
}

function MenuCardSimple({ item, index }: { item: MenuItem; index: number }) {
  const t = useTranslations("menu");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <HoverCard className="p-4 h-full">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 className="font-medium text-white text-sm leading-snug">{item.name}</h3>
              {item.badge && (
                <span className="shrink-0 px-2 py-0.5 text-[10px] bg-brand-600/20 text-brand-300 border border-brand-600/30 rounded-full">
                  {item.badge === "seasonal_badge" ? t("seasonal_badge") : item.badge}
                </span>
              )}
            </div>
            {item.description && (
              <p className="text-zinc-500 text-xs leading-relaxed mt-0.5">{item.description}</p>
            )}
            {item.allergens && (
              <p className="mt-1.5 text-[10px] text-zinc-600 flex items-center gap-1">
                <span>⚠</span> {item.allergens}
              </p>
            )}
          </div>
          <div className="shrink-0">
            {item.price ? (
              <span className="text-brand-400 font-bold text-base">₺{item.price}</span>
            ) : (
              <span className="text-zinc-600 text-xs italic">{t("price_ask_short")}</span>
            )}
          </div>
        </div>
      </HoverCard>
    </motion.div>
  );
}

function CategorySection({ category }: { category: MenuCategory }) {
  const t = useTranslations("menu");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="mb-14">
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-3 mb-5"
      >
        <span className="text-2xl">{category.emoji}</span>
        <h2
          className="text-xl font-bold text-white"
          style={{ fontFamily: "var(--font-playfair, Georgia, serif)" }}
        >
          {category.label}
        </h2>
        <div className="flex-1 h-px bg-white/5" />
        <span className="text-xs text-zinc-600">{t("item_count", { count: category.items.length })}</span>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {category.items.map((item, i) => {
          const hasImage = !!(item.image || item.images?.length);
          return hasImage ? (
            <MenuCardWithImage key={item.name} item={item} index={i} />
          ) : (
            <MenuCardSimple key={item.name} item={item} index={i} />
          );
        })}
      </div>
    </div>
  );
}

export function Menu() {
  const [activeTab, setActiveTab] = useState("tumu");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const t = useTranslations("menu");

  const categoryTabs = [
    { id: "tumu", label: t("all"), emoji: "✨" },
    ...menuData.map((c) => ({ id: c.id, label: c.label, emoji: c.emoji })),
  ];

  const visibleCategories =
    activeTab === "tumu" ? menuData : menuData.filter((c) => c.id === activeTab);

  return (
    <section id="menu" ref={sectionRef} className="py-32 px-6 bg-[#080808] relative overflow-hidden">
      <SectionGlow color="amber" position="top-left" />
      <SectionGlow color="teal" position="bottom-right" />
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-brand-600/30 to-transparent" />

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-brand-600/30 text-brand-400 text-xs tracking-widest uppercase"
          >
            {t("badge")}
          </motion.div>
          <TextReveal
            text={t("title")}
            className="justify-center text-4xl md:text-5xl font-bold text-white"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="mt-4 text-zinc-500 text-sm"
          >
            {t("vat")}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categoryTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-1.5 px-4 py-2 rounded-full text-sm transition-colors duration-200 ${
                  isActive
                    ? "text-white"
                    : "bg-white/8 text-zinc-300 hover:bg-white/14 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="menu-tab-pill"
                    className="absolute inset-0 rounded-full bg-brand-600 shadow-lg shadow-brand-600/25"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 text-base leading-none">{tab.emoji}</span>
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </motion.div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          {visibleCategories.map((category) => (
            <CategorySection key={category.id} category={category} />
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-6 text-center text-xs text-zinc-700"
        >
          {t("allergen_note")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-8 p-8 rounded-2xl bg-white/6 border border-white/12"
        >
          <div className="p-4 bg-white rounded-xl shadow-lg">
            <QRCodeSVG
              value={SITE_URL}
              size={120}
              bgColor="#ffffff"
              fgColor="#1a1a1a"
              level="M"
            />
          </div>
          <div className="text-center sm:text-left">
            <p className="text-white font-semibold text-lg mb-1">{t("qr_title")}</p>
            <p className="text-zinc-500 text-sm mb-4">
              {t("qr_desc")}
            </p>
            <a
              href={SITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-brand-400 hover:text-brand-300 transition-colors"
            >
              mutlukentmenu.com/qrmenu
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
