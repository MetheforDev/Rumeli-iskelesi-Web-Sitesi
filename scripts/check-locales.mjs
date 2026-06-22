#!/usr/bin/env node
// 4 dilin messages/*.json key setlerini karşılaştırır. tr.json kanoniktir —
// diğer dillerde eksik/fazla key varsa derleme öncesi hata verir. Amaç:
// gelecekte sadece tr.json'a key eklenip diğer 3 dilin unutulması durumunda
// "MISSING_MESSAGE" hatasının prod'da sessizce ortaya çıkmasını önlemek.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MESSAGES_DIR = path.resolve(__dirname, "../messages");
const CANONICAL_LOCALE = "tr";
const LOCALES = ["tr", "en", "bg", "el"];

function flattenKeys(obj, prefix = "") {
  const keys = [];
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      keys.push(...flattenKeys(value, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

function loadKeys(locale) {
  const filePath = path.join(MESSAGES_DIR, `${locale}.json`);
  const data = JSON.parse(readFileSync(filePath, "utf-8"));
  return new Set(flattenKeys(data));
}

const canonicalKeys = loadKeys(CANONICAL_LOCALE);
let hasError = false;

for (const locale of LOCALES) {
  if (locale === CANONICAL_LOCALE) continue;
  const keys = loadKeys(locale);

  const missing = [...canonicalKeys].filter((k) => !keys.has(k));
  const extra = [...keys].filter((k) => !canonicalKeys.has(k));

  if (missing.length > 0 || extra.length > 0) {
    hasError = true;
    console.error(`\n✗ messages/${locale}.json — ${CANONICAL_LOCALE}.json ile uyuşmuyor:`);
    if (missing.length > 0) {
      console.error(`  Eksik key'ler (${missing.length}):`);
      missing.forEach((k) => console.error(`    - ${k}`));
    }
    if (extra.length > 0) {
      console.error(`  Fazla key'ler (${extra.length}):`);
      extra.forEach((k) => console.error(`    - ${k}`));
    }
  }
}

if (hasError) {
  console.error(
    `\nlocale key parity hatası — yukarıdaki dosyaları ${CANONICAL_LOCALE}.json ile aynı key setine getirin.\n`
  );
  process.exit(1);
}

console.log(`✓ Tüm diller (${LOCALES.join(", ")}) aynı key setine sahip (${canonicalKeys.size} key).`);
