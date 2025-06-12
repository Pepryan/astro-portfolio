import { getCollection } from 'astro:content';
import { seoConfig } from '../config/components';
import { getEnabledStaticPages } from './pages';

export interface SitemapURL {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

/**
 * Generate sitemap URLs for all pages
 */
export async function generateSitemapURLs(): Promise<SitemapURL[]> {
  const urls: SitemapURL[] = [];
  const baseUrl = seoConfig.site.url;

  // Get enabled static pages from utility
  const staticPages = getEnabledStaticPages().map(page => ({
    ...page,
    lastmod: new Date().toISOString()
  }));

  // Add static pages (already filtered for enabled ones)
  staticPages.forEach(page => {
    urls.push({
      loc: `${baseUrl}${page.path}`,
      lastmod: page.lastmod,
      changefreq: page.changefreq,
      priority: page.priority
    });
  });

  // Get all blog posts (exclude drafts and hidden)
  const posts = await getCollection('posts');
  const publishedPosts = posts.filter(post => !post.data.draft && !post.data.hidden);

  // Add blog post URLs
  publishedPosts.forEach(post => {
    const lastmod = post.data.updated || post.data.date;
    urls.push({
      loc: `${baseUrl}/blog/${post.slug}`,
      lastmod: lastmod.toISOString(),
      changefreq: 'monthly',
      priority: 0.7
    });
  });

  // Get all unique tags from published posts
  const allTags = new Set<string>();
  publishedPosts.forEach(post => {
    post.data.tags?.forEach(tag => allTags.add(tag));
  });

  // Add blog tag pages
  allTags.forEach(tag => {
    urls.push({
      loc: `${baseUrl}/blog/tags/${encodeURIComponent(tag)}`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.5
    });
  });

  // Add main tag pages (if they exist)
  allTags.forEach(tag => {
    urls.push({
      loc: `${baseUrl}/tags/${encodeURIComponent(tag)}`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.5
    });
  });

  return urls;
}

/**
 * Generate XML sitemap content
 */
export function generateSitemapXML(urls: SitemapURL[]): string {
  const urlElements = urls.map(url => {
    let urlElement = `    <url>
      <loc>${escapeXML(url.loc)}</loc>`;
    
    if (url.lastmod) {
      urlElement += `
      <lastmod>${url.lastmod}</lastmod>`;
    }
    
    if (url.changefreq) {
      urlElement += `
      <changefreq>${url.changefreq}</changefreq>`;
    }
    
    if (url.priority !== undefined) {
      urlElement += `
      <priority>${url.priority.toFixed(1)}</priority>`;
    }
    
    urlElement += `
    </url>`;
    
    return urlElement;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;
}

/**
 * Escape XML special characters
 */
function escapeXML(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Generate sitemap index XML (for multiple sitemaps)
 */
export function generateSitemapIndexXML(sitemapUrls: string[]): string {
  const sitemapElements = sitemapUrls.map(url => `    <sitemap>
      <loc>${escapeXML(url)}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </sitemap>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapElements}
</sitemapindex>`;
}
