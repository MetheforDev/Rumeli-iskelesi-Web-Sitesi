/**
 * Marka rengi — CSS dışı bağlamlar için (Canvas fillStyle, PWA manifest,
 * <meta theme-color>) burada `var(--color-brand-*)` çözümlenmez, literal
 * hex gerekir. CSS içindeyse bunun yerine her zaman globals.css'teki
 * @theme token'larını (var(--color-brand-500) vb.) kullan.
 *
 * Bu değer globals.css'teki --color-brand-500 ile birebir aynı tutulmalı.
 */
export const BRAND_HEX = {
  primary: "#d9892a",
} as const;
