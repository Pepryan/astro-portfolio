import type { APIRoute } from 'astro';
import { generateSitemapURLs, generateSitemapXML } from '../utils/sitemap';

export const GET: APIRoute = async () => {
  try {
    // Generate all sitemap URLs
    const urls = await generateSitemapURLs();
    
    // Generate XML content
    const xmlContent = generateSitemapXML(urls);
    
    return new Response(xmlContent, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new Response('Error generating sitemap', {
      status: 500,
    });
  }
};
