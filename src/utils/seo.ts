import { seoConfig } from '../config/components';

export interface SEOData {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article' | 'person' | 'organization';
  keywords?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  noindex?: boolean;
  nofollow?: boolean;
}

export interface BlogPostSEO {
  title: string;
  description?: string;
  summary?: string;
  date: Date;
  updated?: Date;
  tags?: string[];
  category?: string;
  thumbnail?: string;
  keywords?: string[];
  author?: string;
  slug: string;
}

/**
 * Generate SEO data for pages
 */
export function generateSEO(data: Partial<SEOData> = {}): SEOData {
  const {
    title,
    description,
    canonical,
    image,
    type = 'website',
    keywords = [],
    author,
    publishedTime,
    modifiedTime,
    section,
    tags = [],
    noindex = false,
    nofollow = false
  } = data;

  // Generate full title - avoid duplication
  const fullTitle = title
    ? (title.includes(seoConfig.site.name) || title.includes('Febryan Portfolio')
        ? title
        : `${title} | ${seoConfig.site.name}`)
    : seoConfig.site.title;

  // Generate description
  const fullDescription = description || seoConfig.site.description;

  // Generate canonical URL
  const fullCanonical = canonical 
    ? (canonical.startsWith('http') ? canonical : `${seoConfig.site.url}${canonical}`)
    : seoConfig.site.url;

  // Generate image URL
  const fullImage = image 
    ? (image.startsWith('http') ? image : `${seoConfig.site.url}${image}`)
    : seoConfig.images.default;

  // Combine keywords
  const allKeywords = [...seoConfig.keywords, ...keywords];

  return {
    title: fullTitle,
    description: fullDescription,
    canonical: fullCanonical,
    image: fullImage,
    type,
    keywords: allKeywords,
    author: author || seoConfig.author.name,
    publishedTime,
    modifiedTime,
    section,
    tags,
    noindex,
    nofollow
  };
}

/**
 * Generate SEO data for blog posts
 */
export function generateBlogPostSEO(post: BlogPostSEO): SEOData {
  const postUrl = `/blog/${post.slug}`;
  const postImage = post.thumbnail || seoConfig.images.default;
  const postDescription = post.summary || post.description || `Read ${post.title} on ${seoConfig.blog.title}`;
  
  // Generate keywords from tags and post keywords
  const postKeywords = [
    ...(post.keywords || []),
    ...(post.tags || []),
    'blog',
    'tutorial'
  ];

  // Generate structured title
  const structuredTitle = post.title;

  return generateSEO({
    title: structuredTitle,
    description: postDescription,
    canonical: postUrl,
    image: postImage,
    type: 'article',
    keywords: postKeywords,
    author: post.author,
    publishedTime: post.date.toISOString(),
    modifiedTime: post.updated?.toISOString(),
    section: post.category,
    tags: post.tags
  });
}

/**
 * Generate SEO data for blog listing page
 */
export function generateBlogListingSEO(posts: any[] = []): SEOData {
  const postCount = posts.length;
  const latestPost = posts[0];
  
  const dynamicDescription = `Explore ${postCount} technical blog posts about cloud engineering, DevOps, infrastructure, automation, and modern web development by ${seoConfig.author.name}.${latestPost ? ` Latest: ${latestPost.data?.title || latestPost.title}` : ''}`;

  return generateSEO({
    title: seoConfig.blog.title,
    description: dynamicDescription,
    canonical: '/blog',
    type: 'website',
    keywords: ['blog', 'articles', 'tutorials', 'technical writing']
  });
}

/**
 * Generate SEO data for tag pages
 */
export function generateTagPageSEO(tag: string, posts: any[] = []): SEOData {
  const postCount = posts.length;
  const tagTitle = `${tag.charAt(0).toUpperCase() + tag.slice(1)} Articles`;
  const tagDescription = `${postCount} articles tagged with "${tag}" covering cloud engineering, DevOps, and technical tutorials by ${seoConfig.author.name}.`;

  return generateSEO({
    title: tagTitle,
    description: tagDescription,
    canonical: `/tags/${tag}`,
    type: 'website',
    keywords: [tag, 'articles', 'tutorials', 'blog']
  });
}

/**
 * Generate robots meta content
 */
export function generateRobotsMeta(noindex = false, nofollow = false): string {
  const directives = [];
  
  if (noindex) {
    directives.push('noindex');
  } else {
    directives.push('index');
  }
  
  if (nofollow) {
    directives.push('nofollow');
  } else {
    directives.push('follow');
  }
  
  return directives.join(', ');
}

/**
 * Generate JSON-LD structured data for different content types
 */
export function generateStructuredData(seoData: SEOData, additionalData: any = {}) {
  const baseData = {
    "@context": "https://schema.org",
    "url": seoData.canonical,
    "name": seoData.title,
    "description": seoData.description,
    "image": seoData.image,
    "author": {
      "@type": "Person",
      "name": seoData.author,
      "url": seoConfig.author.url,
      "jobTitle": seoConfig.author.jobTitle,
      "image": seoConfig.author.image
    },
    "publisher": {
      "@type": "Person",
      "name": seoConfig.author.name,
      "url": seoConfig.site.url,
      "logo": {
        "@type": "ImageObject",
        "url": seoConfig.images.logo
      }
    },
    ...additionalData
  };

  switch (seoData.type) {
    case 'article':
      return {
        "@type": "Article",
        "headline": seoData.title,
        "datePublished": seoData.publishedTime,
        "dateModified": seoData.modifiedTime || seoData.publishedTime,
        "keywords": seoData.keywords?.join(', '),
        "articleSection": seoData.section,
        "articleTag": seoData.tags,
        ...baseData
      };
    
    case 'person':
      return {
        "@type": "Person",
        "jobTitle": seoConfig.author.jobTitle,
        "worksFor": {
          "@type": "Organization",
          "name": "Freelance"
        },
        "sameAs": Object.values(seoConfig.social).filter(url => typeof url === 'string'),
        ...baseData
      };
    
    case 'organization':
      return {
        "@type": "Organization",
        "sameAs": seoConfig.organization.sameAs,
        "logo": {
          "@type": "ImageObject",
          "url": seoConfig.organization.logo
        },
        ...baseData
      };
    
    default: // website
      return {
        "@type": "WebSite",
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${seoConfig.site.url}/blog?search={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        },
        ...baseData
      };
  }
}

/**
 * Truncate text to specified length for meta descriptions
 */
export function truncateText(text: string, maxLength: number = 160): string {
  if (text.length <= maxLength) return text;
  
  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return lastSpace > 0 
    ? truncated.substring(0, lastSpace) + '...'
    : truncated + '...';
}

/**
 * Clean and format keywords
 */
export function formatKeywords(keywords: string[]): string {
  return keywords
    .filter(keyword => keyword.trim().length > 0)
    .map(keyword => keyword.trim().toLowerCase())
    .filter((keyword, index, array) => array.indexOf(keyword) === index) // Remove duplicates
    .join(', ');
}
