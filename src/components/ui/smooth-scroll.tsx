"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Desktop: Lenis smooth scroll (silky 120fps-feel).
// Mobile / touch: skipped — iOS native momentum scroll is already premium
// and adding Lenis on touch causes jank on low-end devices.
export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const lenis = new Lenis({
      duration: 1.25,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 0.85,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
