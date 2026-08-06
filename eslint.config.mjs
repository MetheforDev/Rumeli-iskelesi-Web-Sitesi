import { defineConfig } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

export default defineConfig([
  { ignores: ["**/.next/**", "**/node_modules/**", "messages/*.d.json.ts", "next-env.d.ts"] },
  ...nextVitals,
  ...nextTypeScript,
]);
