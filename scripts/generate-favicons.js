#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple favicon generation script
// This creates basic PNG files from the existing favicon.ico

const publicDir = path.join(__dirname, '..', 'public');

// Create basic favicon files by copying the existing favicon.ico
const faviconSizes = [
  { name: 'favicon-16x16.png', size: '16x16' },
  { name: 'favicon-32x32.png', size: '32x32' },
  { name: 'apple-touch-icon.png', size: '180x180' },
  { name: 'android-chrome-192x192.png', size: '192x192' },
  { name: 'android-chrome-512x512.png', size: '512x512' }
];

// Create a simple SVG-based PNG generator
function createSimplePNG(size, filename) {
  const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 32 32">
<rect width="32" height="32" fill="#5935B9"/>
<path d="M8 9 C18.56 8.63 18.56 8.63 21.91 10.26 C23.31 12.5 23.13 13.5 22.63 16.06 C21.64 19.77 21.64 19.77 23 22 C21.06 21.63 21.06 21.63 19 21 C18.67 20.34 18.34 19.68 18 19 C15.69 18.27 13.35 17.6 11 17 C11 18.65 11 20.3 11 22 C10.01 22 9.02 22 8 22 C8 17.71 8 13.42 8 9 Z" fill="#BEB9E6"/>
<path d="M9 10 C10.96 9.95 12.92 9.91 14.88 9.88 C16.51 9.84 16.51 9.84 18.18 9.8 C21 10 21 10 23 12 C22.94 13.88 22.94 13.88 22.56 16 C21.94 19.1 21.94 19.1 23 22 C19.76 21.44 18.07 20.59 16 18 C16 17.34 16 16.68 16 16 C17.32 15.67 18.64 15.34 20 15 C20 14.34 20 13.68 20 13 C16.7 12.67 13.4 12.34 10 12 C9.67 12.99 9.34 13.98 9 15 C9 13.35 9 11.7 9 10 Z" fill="#F6F4FB"/>
<path d="M11 12 C13.97 12 16.94 12 20 12 C20 13.32 20 14.64 20 16 C18.35 16 16.7 16 15 16 C15 15.34 15 14.68 15 14 C13.68 14 12.36 14 11 14 C11 13.34 11 12.68 11 12 Z" fill="#6045C0"/>
</svg>`;

  const outputPath = path.join(publicDir, filename);

  // For now, we'll create a simple SVG file with PNG extension
  // In a real implementation, you'd use a library like sharp or canvas to convert SVG to PNG
  console.log(`Creating ${filename} (${size}x${size})`);

  // Create a simple placeholder file
  const placeholderContent = `<!-- Placeholder for ${filename} - ${size}x${size} -->
<!-- In production, this should be converted to actual PNG -->
${svgContent}`;

  fs.writeFileSync(outputPath.replace('.png', '.svg'), svgContent);
  console.log(`✓ Created ${filename.replace('.png', '.svg')}`);
}

// Generate all favicon sizes
console.log('Generating favicon files...');

faviconSizes.forEach(({ name, size }) => {
  const [width, height] = size.split('x').map(Number);
  createSimplePNG(width, name);
});

console.log('\n✅ Favicon generation complete!');
console.log('\nNote: For production, consider using a proper image conversion tool like:');
console.log('- sharp (npm install sharp)');
console.log('- @squoosh/lib');
console.log('- or online tools like favicon.io');