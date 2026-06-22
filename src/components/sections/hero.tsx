"use client";

import { motion, useScroll, useTransform, AnimatePresence, useReducedMotion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { SparklesCore } from "@/components/ui/sparkles";
import { WeatherWidget } from "@/components/ui/weather-widget";
import { useTranslations } from "next-intl";
import { BRAND_HEX } from "@/lib/colors";

type HeroImage = { src: string; alt: string; duration?: number };

const DEFAULT_SLIDE_MS = 5500;

const HERO_IMAGES: HeroImage[] = [
  { src: "/images/hero/rumeli-drone-cekim.jpg", alt: "Rumeli İskelesi Drone Çekim", duration: 18000 },
  { src: "/images/hero/rumeli-cam.jpg", alt: "Rumeli İskelesi" },
  { src: "/images/hero/rumeli-ai-shot.jpg", alt: "Rumeli İskelesi" },
  { src: "/images/hero/rumeli-flag-scene.jpg", alt: "Rumeli İskelesi Bayrak" },
  { src: "/images/menu/Kahvaltı tabağı banner ai.jpg", alt: "Kahvaltı Tabağı" },
  { src: "/images/menu/Türk kahvesi banner.jpg", alt: "Türk Kahvesi" },
  { src: "/images/menu/Türk kahvesi double banner.jpg", alt: "Türk Kahvesi Double" },
];

function MobilePromoPill() {
  const t = useTranslations("hero");
  return (
    <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-brand-500/30 bg-black/50 backdrop-blur-md shadow-lg">
      <div className="flex items-center justify-center w-7 h-7 rounded-full bg-brand-600/30 border border-brand-500/30 shrink-0">
        <span className="text-sm">☕</span>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <span className="text-white font-medium">{t("promo_title")}</span>
        <span className="w-px h-3 bg-white/20" />
        <span
          className="font-black"
          style={{
            background: "linear-gradient(135deg, var(--color-brand-500), var(--color-brand-gold))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {t("promo_price")}
        </span>
      </div>
      <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-600/20 border border-brand-500/20">
        <span className="w-1 h-1 rounded-full bg-brand-400 animate-pulse" />
        <span className="text-brand-300 text-[10px] font-medium">{t("promo_badge")}</span>
      </div>
    </div>
  );
}

function DesktopPromoCard() {
  const t = useTranslations("hero");
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/55 backdrop-blur-xl shadow-2xl w-48">
      {/* Soğuk Nescafe görseli */}
      <div className="relative h-28 overflow-hidden">
        <Image
          src="/images/menu/soguk-nescafe.jpg"
          alt={t("promo_title")}
          fill
          className="object-cover"
          sizes="192px"
        />
        {/* Frost shimmer */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: "radial-gradient(ellipse at 30% 40%, rgba(100,180,255,0.25) 0%, transparent 60%), radial-gradient(ellipse at 70% 60%, rgba(200,230,255,0.15) 0%, transparent 50%)",
          }}
        />
        {/* Bottom gradient on image area */}
        <div className="absolute inset-x-0 bottom-0 h-10 bg-linear-to-t from-black/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-3.5">
        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-600/25 border border-brand-500/25 mb-2">
          <span className="w-1 h-1 rounded-full bg-brand-400 animate-pulse" />
          <span className="text-brand-300 text-[10px] font-medium tracking-wide">{t("promo_badge")}</span>
        </div>
        <p className="text-white font-bold text-sm leading-snug">{t("promo_title")}</p>
        <p
          className="font-black text-xl leading-tight mt-0.5"
          style={{
            background: "linear-gradient(135deg, var(--color-brand-500), var(--color-brand-gold))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {t("promo_price")}
        </p>
        <p className="text-zinc-500 text-[11px] mt-1 leading-snug">{t("promo_sub")}</p>
      </div>
    </div>
  );
}

// İlerleme çubuğu genişliğini Framer Motion'ın kendi animasyon motoruyla çizer
// (her 50ms'de React state güncelleyip tüm Hero ağacını yeniden render etmek yerine).
function SlideProgressBar({ durationMs }: { durationMs: number }) {
  return (
    <motion.div
      className="absolute inset-y-0 left-0 bg-brand-400 rounded-full"
      initial={{ width: "0%" }}
      animate={{ width: "100%" }}
      transition={{ duration: durationMs / 1000, ease: "linear" }}
    />
  );
}

export function Hero() {
  const t = useTranslations("hero");
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const reducedMotion = useReducedMotion();
  const contentY = useTransform(scrollYProgress, [0, 1], reducedMotion ? ["0%", "0%"] : ["0%", "25%"]);
  const opacityScroll = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    if (HERO_IMAGES.length <= 1) return;
    const slideDuration = HERO_IMAGES[currentIdx].duration ?? DEFAULT_SLIDE_MS;
    const slideTimeout = setTimeout(() => {
      setCurrentIdx((prev) => (prev + 1) % HERO_IMAGES.length);
    }, slideDuration);
    return () => clearTimeout(slideTimeout);
  }, [currentIdx]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* ── Slideshow background with Ken Burns ── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={currentIdx}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.0 }}
          animate={{ opacity: 1, scale: reducedMotion ? 1.0 : 1.08 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1.4, ease: "easeInOut" },
            scale: { duration: 8, ease: "easeOut" },
          }}
        >
          <Image
            src={HERO_IMAGES[currentIdx].src}
            alt={HERO_IMAGES[currentIdx].alt}
            fill
            className="object-cover"
            style={{ opacity: 0.62 }}
            priority={currentIdx === 0}
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Cinematic overlay (vignette + top/bottom darken) ── */}
      <div
        className="absolute inset-0 z-1 pointer-events-none"
        style={{
          background: [
            "radial-gradient(ellipse at 50% 50%, transparent 20%, rgba(0,0,0,0.40) 100%)",
            "linear-gradient(to bottom, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.82) 100%)",
          ].join(", "),
        }}
      />

      {/* ── Sparkles ── */}
      <div className="absolute inset-0 z-2 pointer-events-none">
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1.1}
          particleDensity={35}
          particleColor={BRAND_HEX.primary}
          speed={0.4}
          className="w-full h-full"
        />
      </div>

      {/* ── Center amber glow ── */}
      <div className="absolute inset-0 z-2 pointer-events-none flex items-center justify-center">
        <div
          className="w-150 h-100 rounded-full"
          style={{
            background: "radial-gradient(ellipse at center, rgba(217,137,42,0.11) 0%, transparent 70%)",
            animation: "glow-pulse 6s ease-in-out infinite",
          }}
        />
      </div>

      {/* ── Slide indicators (bottom-left, only when multiple images) ── */}
      {HERO_IMAGES.length > 1 && (
        <div className="absolute bottom-10 left-5 z-10 flex items-center gap-1.5">
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIdx(i)}
              aria-label={`Görsel ${i + 1}`}
              className="relative h-0.5 rounded-full overflow-hidden transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
              style={{
                width: i === currentIdx ? 28 : 10,
                background: "rgba(255,255,255,0.22)",
              }}
            >
              {i === currentIdx && (
                <SlideProgressBar durationMs={HERO_IMAGES[i].duration ?? DEFAULT_SLIDE_MS} />
              )}
            </button>
          ))}
        </div>
      )}

      {/* ── Desktop promo card (hidden on mobile) ── */}
      <motion.div
        initial={{ opacity: 0, x: 30, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 1.4, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute bottom-20 right-5 z-10 hidden md:block"
      >
        <DesktopPromoCard />
      </motion.div>

      {/* ── Main content ── */}
      <motion.div
        style={{ y: contentY, opacity: opacityScroll }}
        className="relative z-10 text-center px-5 max-w-5xl mx-auto w-full"
      >
        {/* Location badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-6 sm:mb-8 px-4 py-1.5 rounded-full border border-brand-600/40 bg-black/40 backdrop-blur-sm text-brand-300 text-xs tracking-widest uppercase"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
          {t("badge")}
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-5xl sm:text-6xl md:text-8xl font-bold leading-none tracking-tight mb-5"
          style={{ fontFamily: "var(--font-playfair, Georgia, serif)" }}
        >
          <span className="block text-white" style={{ textShadow: "0 4px 24px rgba(0,0,0,0.9)" }}>
            {t("title1")}
          </span>
          <span
            className="block"
            style={{
              background: "linear-gradient(135deg, var(--color-brand-500), var(--color-brand-gold), var(--color-brand-500))",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "shimmer 4s linear infinite",
              filter: "drop-shadow(0 4px 16px rgba(217,137,42,0.4))",
            }}
          >
            {t("title2")}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-zinc-200 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-6"
          style={{ textShadow: "0 2px 16px rgba(0,0,0,0.9)" }}
        >
          {t("subtitle_before")}
          <span className="text-brand-300 font-semibold">{t("subtitle_highlight")}</span>
          {t("subtitle_after")}
        </motion.p>

        {/* Weather widget */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex justify-center mb-7"
        >
          <WeatherWidget />
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <motion.a
            href="#menu"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-full text-sm font-semibold transition-colors duration-200 shadow-lg shadow-brand-600/35"
          >
            {t("cta_menu")}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
          <motion.a
            href="#gallery"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/25 hover:border-white/50 bg-black/25 backdrop-blur-sm rounded-full text-sm font-medium text-zinc-100 hover:text-white transition-all duration-200"
          >
            {t("cta_gallery")}
          </motion.a>
        </motion.div>

        {/* Mobile promo pill (below CTAs, hidden on md+) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="flex justify-center mt-5 md:hidden"
        >
          <MobilePromoPill />
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="mt-12 sm:mt-16 flex items-center justify-center gap-8 sm:gap-12 text-center"
        >
          {[
            { value: t("stat1_value"), label: t("stat1_label") },
            { value: t("stat2_value"), label: t("stat2_label") },
            { value: t("stat3_value"), label: t("stat3_label") },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <span
                className="text-2xl md:text-3xl font-bold"
                style={{
                  background: "linear-gradient(135deg, var(--color-brand-500), var(--color-brand-gold))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 2px 8px rgba(217,137,42,0.35))",
                }}
              >
                {stat.value}
              </span>
              <span className="text-[10px] sm:text-xs text-zinc-400 uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-zinc-500 tracking-widest uppercase">{t("scroll")}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-linear-to-b from-brand-600 to-transparent"
        />
      </motion.div>
    </section>
  );
}
