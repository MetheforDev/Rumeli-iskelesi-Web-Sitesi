"use client";

import { motion, useInView, useMotionValue } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { TextReveal } from "@/components/ui/text-reveal";
import { useTranslations } from "next-intl";
import { SectionGlow } from "@/components/ui/section-glow";
import { getMenuItem } from "@/lib/menu-data";

type FeaturedItem = {
  name: string;
  desc: string;
  price: string;
  image: string;
  tag: string;
  emoji: string;
};

// İsim/fiyat/görsel menuData'dan (tek kaynak) gelir — burada sadece
// vitrin için özel pazarlama metni (desc), rozet (tag) ve emoji tutulur.
const FEATURED_REFS: { id: string; desc: string; tag: string; emoji: string }[] = [
  { id: "tekirdag-koftesi", desc: "Tekirdağ'ın meşhur köftesi, közlenmiş sebze ve salatalarla", tag: "En Çok Satan", emoji: "🥩" },
  { id: "kahvalti-tabagi", desc: "Zengin kahvaltı tabağı, taze malzemelerle hazırlanır", tag: "Sabah Favori", emoji: "🍳" },
  { id: "hamburger", desc: "El yapımı köfte, taze sebzeler ve özel sos ile", tag: "Favori", emoji: "🍔" },
  { id: "san-sebastian", desc: "Premium tatlımız — ekstra çikolata sos ile servis edilir", tag: "Premium", emoji: "🍮" },
  { id: "cift-kasarli-tost", desc: "İki kat kaşar peyniri, çıtır ekmek", tag: "Hızlı & Lezzetli", emoji: "🥪" },
  { id: "patates-kizartmasi", desc: "Taze yağda çıtır patates, tek porsiyon", tag: "Yan Lezzet", emoji: "🍟" },
];

const featuredItems: FeaturedItem[] = FEATURED_REFS.map((ref) => {
  const menuItem = getMenuItem(ref.id);
  return {
    name: menuItem.name,
    price: menuItem.price ?? "",
    image: menuItem.image ?? menuItem.images?.[0] ?? "",
    desc: ref.desc,
    tag: ref.tag,
    emoji: ref.emoji,
  };
});

function FeaturedCard({ item, index }: { item: FeaturedItem; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative shrink-0 w-64 sm:w-72 rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 cursor-pointer group"
    >
      <div className="relative h-44 overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="288px"
        />
        <div className="absolute inset-0 bg-linear-to-t from-zinc-900 via-transparent to-transparent" />
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-brand-600/90 backdrop-blur-sm text-white text-xs font-medium">
          {item.tag}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="font-semibold text-white text-base leading-snug">{item.name}</h3>
          <span className="text-brand-400 font-bold text-lg shrink-0">₺{item.price}</span>
        </div>
        <p className="text-zinc-500 text-xs leading-relaxed">{item.desc}</p>
      </div>

      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        className="absolute inset-0 rounded-2xl ring-1 ring-brand-500/40 pointer-events-none"
      />
    </motion.div>
  );
}

export function Featured() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const x = useMotionValue(0);
  const t = useTranslations("featured");

  return (
    <section ref={sectionRef} className="py-20 bg-[#080808] relative overflow-hidden">
      <SectionGlow color="amber" position="top-left" />
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-brand-600/20 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 mb-10">
        <div className="flex items-end justify-between">
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full border border-brand-600/30 text-brand-400 text-xs tracking-widest uppercase"
            >
              {t("badge")}
            </motion.div>
            <TextReveal
              text={t("title")}
              className="text-2xl sm:text-3xl font-bold text-white"
            />
          </div>
          <motion.a
            href="#menu"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="hidden sm:inline-flex items-center gap-1.5 text-sm text-brand-400 hover:text-brand-300 transition-colors"
          >
            {t("see_all")}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </div>
      </div>

      <motion.div
        className="flex gap-4 px-6 cursor-grab active:cursor-grabbing"
        drag="x"
        dragConstraints={{ right: 0, left: -(featuredItems.length * 288 - (typeof window !== "undefined" ? window.innerWidth : 800) + 48) }}
        dragElastic={0.1}
        style={{ x }}
      >
        {featuredItems.map((item, i) => (
          <FeaturedCard key={item.name} item={item} index={i} />
        ))}
        <div className="w-6 shrink-0" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.7 }}
        className="text-center text-xs text-zinc-700 mt-4 sm:hidden"
      >
        {t("drag_hint")}
      </motion.p>
    </section>
  );
}
