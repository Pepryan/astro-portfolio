/**
 * Shared Blog Types
 * 
 * Centralized type definitions for blog-related components.
 * This eliminates duplicate interface definitions across components.
 */

/**
 * Reference to a blog series (used within BlogPostData)
 */
export interface SeriesReference {
    name: string;
    slug: string;
    part: number;
    total?: number;
    description?: string;
    thumbnail?: string;
    order?: number;
}

/**
 * Blog post metadata (frontmatter data)
 */
export interface BlogPostData {
    title: string;
    summary?: string;
    description?: string;
    date: Date;
    updated?: Date;
    tags?: string[];
    category?: string;
    thumbnail?: string;
    author?: string;
    readingTime?: number;  // Optional, used by BlogCard
    series?: SeriesReference;
}

/**
 * Minimal blog post data for navigation components
 * Used by: PostNavigation
 */
export interface BlogPostMinimal {
    slug: string;
    data: Pick<BlogPostData, 'title' | 'summary' | 'date' | 'tags'>;
}

/**
 * Complete blog post with slug and computed fields
 * Used by: BlogPageClient, BlogList, BlogCard, ArchiveClient
 */
export interface BlogPost {
    slug: string;
    data: BlogPostData;
    readingTime: number;
}

/**
 * Extended blog post with raw content body
 * Used by: BlogPostLayout
 */
export interface BlogPostWithBody extends BlogPost {
    body: string;
}

/**
 * Props for components that display a list of blog posts
 */
export interface BlogListProps {
    posts: BlogPost[];
}

