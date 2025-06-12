#!/usr/bin/env node

/**
 * Image Compression Script
 * 
 * This script compresses images in public/images to modern formats (WebP/AVIF)
 * and moves original images to a backup folder outside git tracking.
 * 
 * Features:
 * - Converts PNG/JPG/JPEG to WebP and AVIF
 * - Maintains directory structure
 * - Moves originals to backup folder
 * - Updates .gitignore automatically
 * - Provides compression statistics
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  sourceDir: path.join(__dirname, '../public/images'),
  backupDir: path.join(__dirname, '../images-original'),
  supportedFormats: ['.png', '.jpg', '.jpeg'],
  webpQuality: 85,
  avifQuality: 80,
  skipFormats: ['.svg', '.gif'], // Skip these formats
};

// Statistics tracking
const stats = {
  processed: 0,
  skipped: 0,
  errors: 0,
  originalSize: 0,
  compressedSize: 0,
};

/**
 * Ensure directory exists
 */
async function ensureDir(dirPath) {
  try {
    await fs.access(dirPath);
  } catch {
    await fs.mkdir(dirPath, { recursive: true });
  }
}

/**
 * Get file size in bytes
 */
async function getFileSize(filePath) {
  try {
    const stat = await fs.stat(filePath);
    return stat.size;
  } catch {
    return 0;
  }
}

/**
 * Update .gitignore to exclude backup folder
 */
async function updateGitignore() {
  const gitignorePath = path.join(__dirname, '../.gitignore');
  const backupFolderName = 'images-original/';
  
  try {
    const content = await fs.readFile(gitignorePath, 'utf8');
    
    if (!content.includes(backupFolderName)) {
      const updatedContent = content + '\n# Original images backup\n' + backupFolderName + '\n';
      await fs.writeFile(gitignorePath, updatedContent);
      console.log('✅ Updated .gitignore to exclude backup folder');
    }
  } catch (error) {
    console.warn('⚠️  Could not update .gitignore:', error.message);
  }
}

/**
 * Process a single image file
 */
async function processImage(filePath, relativePath) {
  const ext = path.extname(filePath).toLowerCase();
  const baseName = path.basename(filePath, ext);
  const dirName = path.dirname(relativePath);
  
  // Skip unsupported formats
  if (!CONFIG.supportedFormats.includes(ext)) {
    if (CONFIG.skipFormats.includes(ext)) {
      console.log(`⏭️  Skipping ${relativePath} (${ext} format)`);
      stats.skipped++;
      return;
    }
  }

  try {
    // Create backup directory structure
    const backupDir = path.join(CONFIG.backupDir, dirName);
    await ensureDir(backupDir);
    
    // Create output directory structure
    const outputDir = path.join(CONFIG.sourceDir, dirName);
    await ensureDir(outputDir);

    // Move original to backup
    const backupPath = path.join(backupDir, path.basename(filePath));
    await fs.copyFile(filePath, backupPath);
    
    // Get original file size
    const originalSize = await getFileSize(filePath);
    stats.originalSize += originalSize;

    // Load image with sharp
    const image = sharp(filePath);
    const metadata = await image.metadata();
    
    console.log(`🔄 Processing ${relativePath} (${metadata.width}x${metadata.height})`);

    // Generate WebP
    const webpPath = path.join(outputDir, `${baseName}.webp`);
    await image
      .webp({ quality: CONFIG.webpQuality })
      .toFile(webpPath);
    
    const webpSize = await getFileSize(webpPath);
    stats.compressedSize += webpSize;

    // Generate AVIF
    const avifPath = path.join(outputDir, `${baseName}.avif`);
    await image
      .avif({ quality: CONFIG.avifQuality })
      .toFile(avifPath);
    
    const avifSize = await getFileSize(avifPath);
    stats.compressedSize += avifSize;

    // Remove original from source
    await fs.unlink(filePath);

    const compressionRatio = ((originalSize - (webpSize + avifSize)) / originalSize * 100).toFixed(1);
    console.log(`✅ ${relativePath} -> WebP (${formatBytes(webpSize)}) + AVIF (${formatBytes(avifSize)}) | ${compressionRatio}% reduction`);
    
    stats.processed++;
  } catch (error) {
    console.error(`❌ Error processing ${relativePath}:`, error.message);
    stats.errors++;
  }
}

/**
 * Recursively find all image files
 */
async function findImages(dir, baseDir = dir) {
  const files = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      const subFiles = await findImages(fullPath, baseDir);
      files.push(...subFiles);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (CONFIG.supportedFormats.includes(ext) || CONFIG.skipFormats.includes(ext)) {
        const relativePath = path.relative(baseDir, fullPath);
        files.push({ fullPath, relativePath });
      }
    }
  }

  return files;
}

/**
 * Format bytes to human readable format
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Main execution function
 */
async function main() {
  console.log('🚀 Starting image compression...\n');
  
  try {
    // Check if source directory exists
    await fs.access(CONFIG.sourceDir);
    
    // Create backup directory
    await ensureDir(CONFIG.backupDir);
    
    // Update .gitignore
    await updateGitignore();
    
    // Find all images
    console.log('🔍 Scanning for images...');
    const images = await findImages(CONFIG.sourceDir);
    
    if (images.length === 0) {
      console.log('ℹ️  No images found to process.');
      return;
    }
    
    console.log(`📁 Found ${images.length} image(s) to process\n`);
    
    // Process each image
    for (const { fullPath, relativePath } of images) {
      await processImage(fullPath, relativePath);
    }
    
    // Print statistics
    console.log('\n📊 Compression Statistics:');
    console.log('─'.repeat(50));
    console.log(`✅ Processed: ${stats.processed} files`);
    console.log(`⏭️  Skipped: ${stats.skipped} files`);
    console.log(`❌ Errors: ${stats.errors} files`);
    console.log(`📦 Original size: ${formatBytes(stats.originalSize)}`);
    console.log(`🗜️  Compressed size: ${formatBytes(stats.compressedSize)}`);
    
    if (stats.originalSize > 0) {
      const totalReduction = ((stats.originalSize - stats.compressedSize) / stats.originalSize * 100).toFixed(1);
      console.log(`💾 Total reduction: ${totalReduction}%`);
    }
    
    console.log('\n🎉 Image compression completed!');
    console.log(`📂 Original images backed up to: ${CONFIG.backupDir}`);
    
  } catch (error) {
    console.error('💥 Fatal error:', error.message);
    process.exit(1);
  }
}

// Run the script
main().catch(console.error);
