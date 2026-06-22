#!/usr/bin/env node
// src/ içindeki tüm "/images/..." string literal'lerini tarar ve public/
// altında karşılığı olup olmadığını kontrol eder. Menü/galeri/hero verisi
// elle yazılan string yollara dayandığı için bir yazım hatası build'i
// kırmadan sessizce kırık görsele dönüşebiliyordu — bu script onu önler.
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC_DIR = path.join(ROOT, "src");
const PUBLIC_DIR = path.join(ROOT, "public");

const IMAGE_PATH_RE = /(["'])(\/images\/[^"'\n]+\.(?:jpg|jpeg|png|webp|avif|svg|gif))\1/gi;
const SOURCE_EXT_RE = /\.(ts|tsx)$/;

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      walk(full, files);
    } else if (SOURCE_EXT_RE.test(entry)) {
      files.push(full);
    }
  }
  return files;
}

const sourceFiles = walk(SRC_DIR);
/** @type {Map<string, Set<string>>} path -> referencing files */
const referenced = new Map();

for (const file of sourceFiles) {
  const content = readFileSync(file, "utf-8");
  for (const match of content.matchAll(IMAGE_PATH_RE)) {
    const imgPath = match[2];
    if (!referenced.has(imgPath)) referenced.set(imgPath, new Set());
    referenced.get(imgPath).add(path.relative(ROOT, file));
  }
}

const missing = [];
for (const [imgPath, files] of referenced) {
  const diskPath = path.join(PUBLIC_DIR, imgPath);
  if (!existsSync(diskPath)) {
    missing.push({ imgPath, files: [...files] });
  }
}

if (missing.length > 0) {
  console.error(`\n✗ ${missing.length} görsel yolu public/ altında bulunamadı:\n`);
  for (const { imgPath, files } of missing) {
    console.error(`  ${imgPath}`);
    for (const f of files) console.error(`    referans: ${f}`);
  }
  console.error("");
  process.exit(1);
}

console.log(`✓ ${referenced.size} görsel yolunun tümü public/ altında mevcut.`);
