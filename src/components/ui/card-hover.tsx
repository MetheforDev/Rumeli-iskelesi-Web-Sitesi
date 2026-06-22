"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { BRAND_HEX } from "@/lib/colors";

export function HoverCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-zinc-900/90 backdrop-blur-sm",
        "border border-white/10 shadow-lg hover:shadow-brand-500/20 hover:border-brand-500/30",
        "transition-shadow duration-300",
        className
      )}
    >
      <div className="absolute inset-0 bg-linear-to-br from-brand-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      {children}
    </motion.div>
  );
}

export function GlowCard({
  children,
  className,
  glowColor = BRAND_HEX.primary,
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}) {
  return (
    <div
      className={cn("relative group", className)}
      style={{
        "--glow": glowColor,
      } as React.CSSProperties}
    >
      <div
        className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-70 blur transition-opacity duration-500"
        style={{ background: `radial-gradient(circle at center, ${glowColor}40, transparent 70%)` }}
      />
      <div className="relative rounded-2xl bg-zinc-900 border border-white/10">
        {children}
      </div>
    </div>
  );
}
