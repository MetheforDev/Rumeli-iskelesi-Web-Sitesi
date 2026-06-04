"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useTranslations } from "next-intl";

const HOURS = { open: 9, close: 24 };

function useIsOpen(t: ReturnType<typeof useTranslations<"infobar">>) {
  const [status, setStatus] = useState<{ open: boolean; label: string; next: string }>({
    open: false,
    label: "",
    next: "",
  });

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const totalMin = now.getHours() * 60 + now.getMinutes();
      const openMin = HOURS.open * 60;
      const closeMin = HOURS.close >= 24 ? 1440 : HOURS.close * 60;
      const isOpen = totalMin >= openMin && totalMin < closeMin;

      if (isOpen) {
        const remaining = closeMin - totalMin;
        const h = Math.floor(remaining / 60);
        const m = remaining % 60;
        setStatus({
          open: true,
          label: t("open"),
          next: h > 0 ? t("closes_in_h", { h, m }) : t("closes_in_m", { m }),
        });
      } else {
        const minsUntilOpen = totalMin < openMin ? openMin - totalMin : openMin + 1440 - totalMin;
        const h = Math.floor(minsUntilOpen / 60);
        const m = minsUntilOpen % 60;
        setStatus({
          open: false,
          label: t("closed"),
          next: h > 0 ? t("opens_in_h", { h, m }) : t("opens_in_m", { m }),
        });
      }
    };
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, [t]);

  return status;
}

export function InfoBar() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const t = useTranslations("infobar");
  const status = useIsOpen(t);

  const stats = [
    { icon: "📍", label: t("location_label"), value: t("location_value"), sub: t("location_sub") },
    { icon: "🕐", label: t("hours_label"), value: t("hours_value"), sub: t("hours_sub") },
    { icon: "👥", label: t("capacity_label"), value: t("capacity_value"), sub: t("capacity_sub") },
    { icon: "🏛️", label: t("business_label"), value: t("business_value"), sub: t("business_sub") },
  ];

  return (
    <section ref={ref} className="py-16 px-6 bg-[#0d0d0d] relative">
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-brand-600/20 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-10"
        >
          <div
            className={`inline-flex items-center gap-3 px-6 py-3 rounded-full border backdrop-blur-sm ${
              status.open
                ? "border-green-500/30 bg-green-500/10"
                : "border-red-500/30 bg-red-500/10"
            }`}
          >
            <span className="relative flex h-3 w-3">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  status.open ? "bg-green-400" : "bg-red-400"
                }`}
              />
              <span
                className={`relative inline-flex rounded-full h-3 w-3 ${
                  status.open ? "bg-green-500" : "bg-red-500"
                }`}
              />
            </span>
            <span className={`font-semibold text-sm ${status.open ? "text-green-400" : "text-red-400"}`}>
              {status.label || t("loading")}
            </span>
            {status.next && (
              <span className="text-zinc-500 text-xs hidden sm:inline">· {status.next}</span>
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="flex flex-col items-center text-center p-5 rounded-2xl bg-white/3 border border-white/5 hover:border-brand-600/20 transition-colors"
            >
              <span className="text-3xl mb-2">{s.icon}</span>
              <span className="text-xs text-zinc-600 uppercase tracking-wider mb-1">{s.label}</span>
              <span className="text-white font-semibold text-sm">{s.value}</span>
              <span className="text-zinc-500 text-xs mt-0.5">{s.sub}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
