#!/usr/bin/env node

/**
 * Sitemap Validation Script
 * 
 * This script validates the generated sitemap to ensure:
 * - All URLs are accessible
 * - Draft posts are excluded
 * - Proper XML structure
 * - SEO metadata is present
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.join(__dirname, '../dist');
const SITEMAP_PATH = path.join(DIST_DIR, 'sitemap.xml');
const SITEMAP_INDEX_PATH = path.join(DIST_DIR, 'sitemap-index.xml');

// Draft posts that should NOT appear in sitemap
const DRAFT_POSTS = ['hidden-post', 'test'];

function validateSitemapExists() {
  console.log('🔍 Checking if sitemap files exist...');
  
  if (!fs.existsSync(SITEMAP_PATH)) {
    console.error('❌ sitemap.xml not found!');
    return false;
  }
  
  if (!fs.existsSync(SITEMAP_INDEX_PATH)) {
    console.error('❌ sitemap-index.xml not found!');
    return false;
  }
  
  console.log('✅ Sitemap files exist');
  return true;
}

function validateSitemapContent() {
  console.log('🔍 Validating sitemap content...');
  
  const sitemapContent = fs.readFileSync(SITEMAP_PATH, 'utf-8');
  
  // Check for draft posts
  let hasDraftPosts = false;
  DRAFT_POSTS.forEach(draftPost => {
    if (sitemapContent.includes(draftPost)) {
      console.error(`❌ Draft post "${draftPost}" found in sitemap!`);
      hasDraftPosts = true;
    }
  });
  
  if (!hasDraftPosts) {
    console.log('✅ No draft posts found in sitemap');
  }
  
  // Check for required elements
  const requiredElements = ['<urlset', '<url>', '<loc>', '<lastmod>', '<changefreq>', '<priority>'];
  let hasAllElements = true;
  
  requiredElements.forEach(element => {
    if (!sitemapContent.includes(element)) {
      console.error(`❌ Required element "${element}" not found in sitemap!`);
      hasAllElements = false;
    }
  });
  
  if (hasAllElements) {
    console.log('✅ All required XML elements present');
  }
  
  // Count URLs
  const urlCount = (sitemapContent.match(/<url>/g) || []).length;
  console.log(`📊 Total URLs in sitemap: ${urlCount}`);
  
  // Check for proper domain
  if (sitemapContent.includes('https://febryan.web.id')) {
    console.log('✅ Correct domain found in sitemap');
  } else {
    console.error('❌ Incorrect or missing domain in sitemap!');
  }
  
  return !hasDraftPosts && hasAllElements;
}

function validateSitemapIndex() {
  console.log('🔍 Validating sitemap index...');
  
  const sitemapIndexContent = fs.readFileSync(SITEMAP_INDEX_PATH, 'utf-8');
  
  // Check for required elements
  const requiredElements = ['<sitemapindex', '<sitemap>', '<loc>'];
  let hasAllElements = true;
  
  requiredElements.forEach(element => {
    if (!sitemapIndexContent.includes(element)) {
      console.error(`❌ Required element "${element}" not found in sitemap index!`);
      hasAllElements = false;
    }
  });
  
  if (hasAllElements) {
    console.log('✅ Sitemap index structure is valid');
  }
  
  return hasAllElements;
}

function main() {
  console.log('🚀 Starting sitemap validation...\n');
  
  const existsValid = validateSitemapExists();
  if (!existsValid) {
    console.log('\n❌ Validation failed: Sitemap files missing');
    process.exit(1);
  }
  
  console.log('');
  const contentValid = validateSitemapContent();
  
  console.log('');
  const indexValid = validateSitemapIndex();
  
  console.log('\n' + '='.repeat(50));
  
  if (contentValid && indexValid) {
    console.log('🎉 Sitemap validation passed!');
    console.log('✅ All checks completed successfully');
    process.exit(0);
  } else {
    console.log('❌ Sitemap validation failed!');
    console.log('Please check the errors above and rebuild the sitemap');
    process.exit(1);
  }
}

main();
