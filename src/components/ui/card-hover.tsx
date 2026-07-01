"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import { BRAND_HEX } from "@/lib/colors";

export function HoverCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const torchBg = useMotionTemplate`radial-gradient(180px at ${mouseX}px ${mouseY}px, rgba(212,137,42,0.10), transparent 80%)`;

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  return (
    <motion.div
      onMouseMove={onMouseMove}
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 340, damping: 24 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-zinc-900/90 backdrop-blur-sm",
        "border border-white/10 shadow-lg hover:shadow-brand-500/20 hover:border-brand-500/30",
        "transition-shadow duration-300",
        className
      )}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{ background: torchBg }}
      />
      <div className="relative z-10">{children}</div>
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
