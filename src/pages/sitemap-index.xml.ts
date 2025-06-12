import type { APIRoute } from 'astro';
import { generateSitemapIndexXML } from '../utils/sitemap';
import { seoConfig } from '../config/components';

export const GET: APIRoute = async () => {
  try {
    const baseUrl = seoConfig.site.url;
    
    // List of sitemap URLs
    const sitemapUrls = [
      `${baseUrl}/sitemap.xml`,
      // Add more sitemaps here if needed (e.g., for images, news, etc.)
    ];
    
    // Generate sitemap index XML
    const xmlContent = generateSitemapIndexXML(sitemapUrls);
    
    return new Response(xmlContent, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('Error generating sitemap index:', error);
    return new Response('Error generating sitemap index', {
      status: 500,
    });
  }
};
