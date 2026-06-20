"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { SectionGlow } from "@/components/ui/section-glow";

export function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const t = useTranslations("footer");

  return (
    <footer id="contact" ref={ref} className="py-24 px-6 bg-[#030303] relative overflow-hidden">
      <SectionGlow color="amber" position="top-right" />
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-brand-600/30 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="relative h-14 w-48 mb-4">
              <Image
                src="/images/logo/rumeli-logo-transparent.png"
                alt="Rumeli İskelesi"
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed mb-4">
              {t("description")}
            </p>
            <div className="flex items-center gap-3 mt-4">
              <div className="relative h-10 w-10 shrink-0">
                <Image
                  src="/images/logo/suleymanpasa-yuvarlak-transparent.png"
                  alt="Süleymanpaşa Belediyesi"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="relative h-9 w-36">
                <Image
                  src="/images/logo/suleymanpasa-yazili-transparent.png"
                  alt="Süleymanpaşa Belediyesi"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </div>
          </motion.div>

          {/* İletişim */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              {t("contact_title")}
            </h3>
            <ul className="space-y-3 text-sm text-zinc-500">
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5">📍</span>
                <span>{t("address")}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span>🕐</span>
                <span>{t("hours")}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span>🏛️</span>
                <span>Mutlukent Esenlik Hizmetleri A.Ş</span>
              </li>
            </ul>
          </motion.div>

          {/* Sosyal Medya */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              {t("social_title")}
            </h3>
            <p className="text-zinc-500 text-sm mb-5">{t("social_desc")}</p>
            <motion.a
              href="https://instagram.com/mutlukent.sosyal"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-3 px-5 py-3 rounded-full border border-white/10 hover:border-brand-500/50 bg-white/5 hover:bg-brand-600/10 transition-all duration-300"
            >
              <svg className="w-5 h-5 text-brand-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <div className="flex flex-col">
                <span className="text-sm text-white font-medium">Instagram</span>
                <span className="text-xs text-zinc-500">@mutlukent.sosyal</span>
              </div>
              <svg className="w-3.5 h-3.5 text-zinc-600 group-hover:text-brand-400 ml-1 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </motion.a>
          </motion.div>
        </div>

        {/* Google Maps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 rounded-2xl overflow-hidden border border-white/10"
        >
          <div className="bg-white/5 px-5 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-zinc-300">
              <span>📍</span>
              <span>{t("map_label")}</span>
            </div>
            <a
              href="https://maps.google.com/maps?q=Rumeli+İskelesi+Süleymanpaşa+Tekirdağ"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-brand-400 hover:text-brand-300 transition-colors"
            >
              {t("directions")}
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
          <iframe
            title="Rumeli İskelesi Konum"
            src="https://maps.google.com/maps?q=Rumeli+%C4%B0skelesi+S%C3%BCleymanpa%C5%9Fa+Tekirda%C4%9F&output=embed&z=15"
            width="100%"
            height="320"
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>

        {/* Bottom bar */}
        <div className="mt-10 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-600">
          <span>{t("copyright")}</span>
          <span>{t("country")}</span>
        </div>
      </div>
    </footer>
  );
}
