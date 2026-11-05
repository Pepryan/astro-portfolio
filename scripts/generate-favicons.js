#!/usr/bin/env node
/**
 * Generate every favicon / app icon from the ">_" mark.
 *
 *   npm run favicons
 *
 * - public/favicon.svg is the source of truth for the tab icon (rounded tile).
 * - Home-screen icons (apple-touch, android, logo) use a full-bleed variant with
 *   the glyph inside the maskable safe zone, because iOS/Android crop corners.
 * - favicon.ico bundles 16/32/48 px PNGs.
 * Keep the colours in sync with src/components/Logo.astro and src/styles/tokens.css.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const pub = (...p) => path.join(root, 'public', ...p);

const tileSvg = fs.readFileSync(pub('favicon.svg'));

// Same glyph, square background, scaled into the central ~60% (maskable safe zone)
const fullBleedSvg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="-8 -8 48 48">
  <rect x="-8" y="-8" width="48" height="48" fill="#171717"/>
  <path d="M9.5 10.5 15 16l-5.5 5.5" fill="none" stroke="#fafafa" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="17" y="19.5" width="7.5" height="3" rx="1" fill="#60a5fa"/>
</svg>`);

const render = (svg, size) => sharp(svg, { density: Math.max(72, (size / 32) * 72 * 2) }).resize(size, size).png().toBuffer();

/** Minimal ICO container holding PNG images (supported by every modern browser). */
function toIco(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(pngs.length, 4);

  let offset = 6 + pngs.length * 16;
  const entries = pngs.map(({ size, data }) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2); // palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // colour planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += data.length;
    return entry;
  });
  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.data)]);
}

const outputs = [
  { file: 'favicon-16x16.png', svg: tileSvg, size: 16 },
  { file: 'favicon-32x32.png', svg: tileSvg, size: 32 },
  { file: 'apple-touch-icon.png', svg: fullBleedSvg, size: 180 },
  { file: 'android-chrome-192x192.png', svg: fullBleedSvg, size: 192 },
  { file: 'android-chrome-512x512.png', svg: fullBleedSvg, size: 512 },
  { file: 'images/logo.png', svg: fullBleedSvg, size: 512 },
];

for (const { file, svg, size } of outputs) {
  fs.writeFileSync(pub(file), await render(svg, size));
  console.log(`✓ ${file} (${size}×${size})`);
}

const icoSizes = [16, 32, 48];
const icoPngs = await Promise.all(icoSizes.map(async (size) => ({ size, data: await render(tileSvg, size) })));
fs.writeFileSync(pub('favicon.ico'), toIco(icoPngs));
console.log(`✓ favicon.ico (${icoSizes.join(', ')})`);
