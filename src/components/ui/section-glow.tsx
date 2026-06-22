// globals.css'teki @theme renk token'larına bağlı — ayrı bir renk kaynağı değil.
const GLOW_COLORS = {
  amber: "color-mix(in srgb, var(--color-brand-500) 16%, transparent)",
  teal: "color-mix(in srgb, var(--color-brand-teal) 14%, transparent)",
  gold: "color-mix(in srgb, var(--color-brand-gold) 14%, transparent)",
} as const;

const POSITIONS = {
  "top-left": "top-0 left-0 -translate-x-1/3 -translate-y-1/3",
  "top-right": "top-0 right-0 translate-x-1/3 -translate-y-1/3",
  "top-center": "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
  "bottom-left": "bottom-0 left-0 -translate-x-1/3 translate-y-1/3",
  "bottom-right": "bottom-0 right-0 translate-x-1/3 translate-y-1/3",
} as const;

export function SectionGlow({
  color = "amber",
  position = "top-right",
  size = 520,
}: {
  color?: keyof typeof GLOW_COLORS;
  position?: keyof typeof POSITIONS;
  size?: number;
}) {
  return (
    <div
      aria-hidden
      className={`absolute ${POSITIONS[position]} rounded-full pointer-events-none blur-3xl z-0`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${GLOW_COLORS[color]} 0%, transparent 70%)`,
      }}
    />
  );
}
