import type messages from "./messages/tr.d.json";
import type { routing } from "./src/i18n/routing";

declare module "next-intl" {
  interface AppConfig {
    Messages: typeof messages;
    Locale: (typeof routing.locales)[number];
  }
}
