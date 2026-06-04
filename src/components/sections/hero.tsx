"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { SparklesCore } from "@/components/ui/sparkles";
import { WeatherWidget } from "@/components/ui/weather-widget";
import { useTranslations } from "next-intl";

export function Hero() {
  const t = useTranslations("hero");
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Hero background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/rumeli-cam.jpg"
          alt="Rumeli İskelesi"
          fill
          className="object-cover opacity-55"
          priority
        />
      </div>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/80 z-1" />

      {/* Sparkles on top */}
      <div className="absolute inset-0 z-2 pointer-events-none">
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1.2}
          particleDensity={50}
          particleColor="#d9892a"
          speed={0.5}
          className="w-full h-full"
        />
      </div>

      {/* Center glow */}
      <div className="absolute inset-0 z-2 pointer-events-none flex items-center justify-center">
        <div
          className="w-150 h-100 rounded-full"
          style={{
            background: "radial-gradient(ellipse at center, rgba(217,137,42,0.10) 0%, transparent 70%)",
            animation: "glow-pulse 6s ease-in-out infinite",
          }}
        />
      </div>

      {/* Nescafe promo card — bottom-right */}
      <motion.div
        initial={{ opacity: 0, x: 40, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 1.3, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute bottom-24 right-6 md:bottom-16 md:right-10 z-10 max-w-50"
      >
        <div className="relative overflow-hidden rounded-2xl border border-brand-500/30 bg-black/60 backdrop-blur-md shadow-2xl shadow-brand-900/40 p-4">
          {/* Gradient placeholder for image */}
          <div className="w-full h-24 rounded-xl mb-3 overflow-hidden relative">
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(135deg, #1a2a3a 0%, #0d1a2a 40%, #1a2a1a 100%)",
              }}
            />
            {/* Glass with ice cubes illustration via CSS */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {/* Glass */}
                <div className="w-12 h-16 rounded-b-lg border-2 border-white/20 bg-linear-to-b from-amber-900/40 to-amber-950/60 relative overflow-hidden">
                  {/* Liquid */}
                  <div className="absolute bottom-0 inset-x-0 h-3/4 bg-linear-to-b from-amber-700/50 to-amber-900/70" />
                  {/* Ice cubes */}
                  <div className="absolute top-2 left-1 w-3 h-3 bg-white/30 rounded-sm rotate-12" />
                  <div className="absolute top-3 right-1 w-2.5 h-2.5 bg-white/25 rounded-sm -rotate-6" />
                  {/* Straw */}
                  <div className="absolute top-0 right-3 w-0.5 h-8 bg-brand-400/70 -translate-y-4" />
                </div>
                {/* Condensation drops */}
                <div className="absolute -left-1 top-4 w-0.5 h-1.5 bg-white/20 rounded-full" />
                <div className="absolute -right-1 top-6 w-0.5 h-2 bg-white/15 rounded-full" />
              </div>
            </div>
            {/* Frost overlay */}
            <div className="absolute inset-0 bg-linear-to-br from-cyan-900/10 to-transparent" />
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-600/30 border border-brand-500/30 text-brand-300 text-[10px] font-medium mb-2">
            <span className="w-1 h-1 rounded-full bg-brand-400 animate-pulse" />
            {t("promo_badge")}
          </div>

          <p className="text-white font-bold text-sm leading-snug">{t("promo_title")}</p>
          <p
            className="font-black text-lg leading-none mt-0.5"
            style={{
              background: "linear-gradient(135deg, #d9892a, #f4c56a)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {t("promo_price")}
          </p>
          <p className="text-zinc-500 text-[11px] mt-1">{t("promo_sub")}</p>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-brand-600/40 bg-black/40 backdrop-blur-sm text-brand-300 text-xs tracking-widest uppercase"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
          {t("badge")}
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-5xl sm:text-6xl md:text-8xl font-bold leading-none tracking-tight mb-6"
          style={{ fontFamily: "var(--font-playfair, Georgia, serif)" }}
        >
          <span className="block text-white drop-shadow-2xl">{t("title1")}</span>
          <span
            className="block"
            style={{
              background: "linear-gradient(135deg, #d9892a, #f4c56a, #d9892a)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "shimmer 4s linear infinite",
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
          className="text-zinc-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8 drop-shadow-lg"
        >
          {t("subtitle_before")}
          <span className="text-brand-300">{t("subtitle_highlight")}</span>
          {t("subtitle_after")}
        </motion.p>

        {/* Weather widget */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex justify-center mb-8"
        >
          <WeatherWidget />
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="#menu"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-full text-sm font-medium transition-colors duration-200 shadow-lg shadow-brand-600/30"
          >
            {t("cta_menu")}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>

          <motion.a
            href="#gallery"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 hover:border-white/40 bg-black/20 backdrop-blur-sm rounded-full text-sm font-medium text-zinc-200 hover:text-white transition-all duration-200"
          >
            {t("cta_gallery")}
          </motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-20 flex items-center justify-center gap-12 text-center"
        >
          {[
            { value: t("stat1_value"), label: t("stat1_label") },
            { value: t("stat2_value"), label: t("stat2_label") },
            { value: t("stat3_value"), label: t("stat3_label") },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <span
                className="text-2xl md:text-3xl font-bold drop-shadow"
                style={{
                  background: "linear-gradient(135deg, #d9892a, #f4c56a)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {stat.value}
              </span>
              <span className="text-xs text-zinc-400 uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-zinc-500 tracking-widest uppercase">{t("scroll")}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-12 bg-linear-to-b from-brand-600 to-transparent"
        />
      </motion.div>
    </section>
  );
}
