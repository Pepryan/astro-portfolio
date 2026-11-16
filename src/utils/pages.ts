/**
 * Page configuration utilities
 * Handles conditional page rendering based on configuration
 */

import { componentConfig } from '../config/components';

/**
 * Check if a page is enabled in configuration
 */
export function isPageEnabled(pageName: keyof typeof componentConfig.pages): boolean {
  return componentConfig.pages[pageName]?.enabled ?? false;
}

/**
 * Get all enabled static pages for sitemap generation
 */
export function getEnabledStaticPages() {
  const { pages } = componentConfig;
  
  const allPages = [
    {
      path: '/',
      priority: 1.0,
      changefreq: 'weekly' as const,
      enabled: true, // Homepage always enabled
      name: 'home'
    },
    {
      path: '/about',
      priority: 0.8,
      changefreq: 'monthly' as const,
      enabled: pages.about.enabled,
      name: 'about'
    },
    {
      path: '/projects',
      priority: 0.9,
      changefreq: 'weekly' as const,
      enabled: pages.projects.enabled,
      name: 'projects'
    },
    {
      path: '/contact',
      priority: 0.7,
      changefreq: 'monthly' as const,
      enabled: pages.contact.enabled,
      name: 'contact'
    },
    {
      path: '/blog',
      priority: 0.9,
      changefreq: 'daily' as const,
      enabled: true, // Blog always enabled
      name: 'blog'
    },
    {
      path: '/archive',
      priority: 0.5,
      changefreq: 'weekly' as const,
      enabled: true, // Archive always enabled
      name: 'archive'
    },
    {
      path: '/blog/tags',
      priority: 0.4,
      changefreq: 'weekly' as const,
      enabled: true, // Blog tags always enabled
      name: 'blog-tags'
    },
    {
      path: '/trekking',
      priority: 0.6,
      changefreq: 'monthly' as const,
      enabled: pages.trekking.enabled,
      name: 'trekking'
    },
    {
      path: '/series',
      priority: 0.8,
      changefreq: 'weekly' as const,
      enabled: true, // Series always enabled
      name: 'series'
    }
  ];
  
  return allPages.filter(page => page.enabled);
}

