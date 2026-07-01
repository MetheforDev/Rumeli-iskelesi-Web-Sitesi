import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin({
  requestConfig: "./src/i18n/request.ts",
  experimental: {
    // tr.json kanonik kabul edilir — diğer 3 dilin key seti buna göre
    // tip-kontrol edilir (bkz. global.d.ts). Key eksik/yazım hatalıysa
    // `npm run build` derleme hatası verir.
    createMessagesDeclaration: "./messages/tr.json",
  },
});

const nextConfig: NextConfig = {
  transpilePackages: ["lenis"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "**.pexels.com" },
      { protocol: "https", hostname: "wttr.in" },
    ],
  },
};

export default withNextIntl(nextConfig);
