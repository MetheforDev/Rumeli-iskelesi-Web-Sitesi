"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

const EXPO = [0.16, 1, 0.3, 1] as const;

export function TextReveal({
  text,
  className,
  delay = 0,
  variant = "clip",
}: {
  text: string;
  className?: string;
  delay?: number;
  variant?: "clip" | "blur";
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const words = text.split(" ");

  if (variant === "blur") {
    return (
      <motion.div ref={ref} className={cn("flex flex-wrap gap-x-2", className)}>
        {words.map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.55, delay: delay + i * 0.08, ease: EXPO }}
            className="inline-block"
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div ref={ref} className={cn("flex flex-wrap gap-x-[0.28em]", className)}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ clipPath: "inset(0 0 110% 0)" }}
          animate={isInView ? { clipPath: "inset(0 0 0% 0)" } : {}}
          transition={{ duration: 0.7, delay: delay + i * 0.07, ease: EXPO }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}

export function CharReveal({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.span ref={ref} className={cn("inline-block overflow-hidden", className)}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: "100%", opacity: 0 }}
          animate={isInView ? { y: "0%", opacity: 1 } : {}}
          transition={{ duration: 0.45, delay: delay + i * 0.035, ease: EXPO }}
          className="inline-block"
        >
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </motion.span>
  );
}
