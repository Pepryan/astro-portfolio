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
 * Get enabled pages for navigation and sitemap
 */
export function getEnabledPages() {
  const { pages } = componentConfig;
  
  return {
    about: pages.about.enabled,
    projects: pages.projects.enabled,
    contact: pages.contact.enabled,
    resume: pages.resume.enabled,
  };
}

/**
 * Check if about section should be shown
 * About section depends on about page being enabled
 */
export function shouldShowAboutSection(): boolean {
  return componentConfig.pages.about.enabled && componentConfig.about.enabled;
}

/**
 * Check if contact section should be shown
 */
export function shouldShowContactSection(): boolean {
  return componentConfig.pages.contact.enabled && componentConfig.contact.enabled;
}

/**
 * Get page configuration for a specific page
 */
export function getPageConfig(pageName: keyof typeof componentConfig.pages) {
  return componentConfig.pages[pageName];
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
      path: '/series',
      priority: 0.8,
      changefreq: 'weekly' as const,
      enabled: true, // Series always enabled
      name: 'series'
    }
  ];
  
  return allPages.filter(page => page.enabled);
}

/**
 * Check if a page should be included in navigation
 */
export function shouldShowInNavigation(pageName: keyof typeof componentConfig.pages): boolean {
  const pageConfig = componentConfig.pages[pageName];
  return pageConfig?.enabled && pageConfig?.showInNavigation;
}

/**
 * Validate page access - throws error if page is disabled
 */
export function validatePageAccess(pageName: keyof typeof componentConfig.pages): void {
  if (!isPageEnabled(pageName)) {
    throw new Error(`Page '${pageName}' is disabled in configuration`);
  }
}

/**
 * Get page metadata for enabled pages
 */
export function getPageMetadata() {
  const enabledPages = getEnabledPages();
  
  return {
    about: enabledPages.about ? {
      title: 'About - Febryan Ramadhan',
      description: 'Learn more about Febryan Ramadhan - Cloud Engineer, DevOps specialist, and web developer.',
      path: '/about'
    } : null,
    
    projects: enabledPages.projects ? {
      title: 'Projects - Febryan Ramadhan',
      description: 'Explore my portfolio of cloud engineering, DevOps, and web development projects.',
      path: '/projects'
    } : null,
    
    contact: enabledPages.contact ? {
      title: 'Contact - Febryan Ramadhan',
      description: 'Get in touch for collaborations, opportunities, or just to say hello!',
      path: '/contact'
    } : null,
  };
}
