"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

const LOCALES = [
  { code: "tr", label: "TR", flag: "🇹🇷" },
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "bg", label: "BG", flag: "🇧🇬" },
  { code: "el", label: "EL", flag: "🇬🇷" },
];

function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  const switchLocale = (code: string) => {
    // /tr/... → /en/...
    const segments = pathname.split("/");
    segments[1] = code;
    router.push(segments.join("/") || "/");
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 hover:border-brand-500/40 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white text-xs transition-all duration-200"
        aria-label="Dil seçin"
      >
        <span>{current.flag}</span>
        <span className="font-medium">{current.label}</span>
        <svg
          className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -6, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="absolute right-0 top-full mt-2 w-32 rounded-xl bg-zinc-900 border border-white/10 shadow-xl overflow-hidden z-50"
        >
          {LOCALES.map((l) => (
            <button
              key={l.code}
              onClick={() => switchLocale(l.code)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-xs transition-colors ${
                l.code === locale
                  ? "bg-brand-600/20 text-brand-300"
                  : "text-zinc-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span>{l.flag}</span>
              <span className="font-medium">{l.label}</span>
              {l.code === locale && (
                <svg className="w-3 h-3 ml-auto text-brand-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const t = useTranslations("navbar");

  useEffect(() => {
    scrollY.on("change", () => {});
  }, [scrollY]);

  const opacity = useTransform(scrollY, [0, 100], [0, 0.95]);

  const navItems = [
    { label: t("home"), href: "#hero" },
    { label: t("menu"), href: "#menu" },
    { label: t("gallery"), href: "#gallery" },
    { label: t("contact"), href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <motion.div
        className="absolute inset-0 bg-black/80 backdrop-blur-xl border-b border-white/5"
        style={{ opacity }}
      />
      <div className="relative max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="relative h-10 w-36">
            <Image
              src="/images/logo/rumeli-logo-transparent.png"
              alt="Rumeli İskelesi"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item, i) => (
            <motion.li
              key={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.07 }}
            >
              <a
                href={item.href}
                className="text-sm text-zinc-400 hover:text-white transition-colors duration-200 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-400 group-hover:w-full transition-all duration-300" />
              </a>
            </motion.li>
          ))}
        </ul>

        {/* Right side: Belediye logo + Language switcher */}
        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          <div className="flex items-center gap-2">
            <div className="relative h-9 w-9 shrink-0">
              <Image
                src="/images/logo/suleymanpasa-yuvarlak-transparent.png"
                alt="Süleymanpaşa Belediyesi"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-xs text-zinc-400 leading-tight hidden lg:block">
              Süleymanpaşa<br />Belediyesi
            </span>
          </div>
        </div>

        {/* Mobile: Language switcher + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <LanguageSwitcher />
          <button
            className="p-2 text-zinc-400"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menü"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={cn("block h-px bg-current transition-all duration-300", mobileOpen && "rotate-45 translate-y-[7.5px]")} />
              <span className={cn("block h-px bg-current transition-all duration-300", mobileOpen && "opacity-0")} />
              <span className={cn("block h-px bg-current transition-all duration-300", mobileOpen && "-rotate-45 translate-y-[-7.5px]")} />
            </div>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex flex-col gap-4"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="text-zinc-300 hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}
