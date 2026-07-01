"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Scroll-into-view fade-in animasyonu için ince bir client wrapper.
 * Asıl içerik (metin, görsel, çeviri) bir Server Component'te kalabilir;
 * sadece bu animasyon kabuğu client'a taşınır. CLAUDE.md'nin "RSC
 * varsayılan" kuralını korumak için footer/reviews gibi başka client
 * ihtiyacı olmayan bölümlerde kullanılır.
 */
export function FadeInView({
  children,
  className,
  delay = 0,
  duration = 0.55,
  y = 20,
  blur = false,
  once = true,
  margin = "-60px",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  blur?: boolean;
  once?: boolean;
  margin?: `${number}px`;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, ...(blur ? { filter: "blur(8px)" } : {}) }}
      animate={
        isInView
          ? { opacity: 1, y: 0, ...(blur ? { filter: "blur(0px)" } : {}) }
          : {}
      }
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
