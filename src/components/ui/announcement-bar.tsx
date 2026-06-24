"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { useTranslations } from "next-intl";

function getSeason(): "summer" | "winter" | "default" {
  const month = new Date().getMonth() + 1; // 1-12
  if (month >= 6 && month <= 8) return "summer";
  if (month === 12 || month <= 2) return "winter";
  return "default";
}

export function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  const t = useTranslations("announcement");
  const reducedMotion = useReducedMotion();
  const season = getSeason();

  const text = season === "summer" ? t("summer") : season === "winter" ? t("winter") : t("main");

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative bg-brand-600 text-white overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-3 text-xs sm:text-sm">
            <span className="animate-pulse text-brand-200">✦</span>
            <motion.span
              animate={reducedMotion ? {} : { x: [-4, 4, -4] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="font-medium tracking-wide"
            >
              {text}
            </motion.span>
            <span className="animate-pulse text-brand-200">✦</span>
            <button
              onClick={() => setVisible(false)}
              className="absolute right-3 text-white/60 hover:text-white transition-colors text-lg leading-none"
              aria-label="Kapat"
            >
              ×
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
