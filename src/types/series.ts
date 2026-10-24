/**
 * Shared Series Types
 * 
 * Centralized type definitions for blog series components.
 * Used by: SeriesPageClient, SeriesDetailClient, SeriesCard
 */

import type { BlogPost } from './blog';

/**
 * Series status options
 */
export type SeriesStatus = 'ongoing' | 'completed' | 'planned';

/**
 * Complete series information
 * Used by: SeriesPageClient, SeriesCard
 */
export interface SeriesInfo {
    name: string;
    slug: string;
    description: string;
    thumbnail?: string;
    status: SeriesStatus;
    tags: string[];
    category?: string;
    difficulty?: string;
    totalParts: number;
    completedParts: number;
    startDate?: Date;
    endDate?: Date;
    featured: boolean;
    estimatedParts?: number;
    order?: number;
}

/**
 * Blog post that belongs to a series (same lightweight shape as BlogPost)
 */
export type SeriesPost = BlogPost;

/**
 * Series together with its published posts, ordered by part
 */
export interface SeriesWithPosts extends SeriesInfo {
    posts: SeriesPost[];
}

/**
 * Data for the "previous / next in series" block on a post page
 */
export interface SeriesNavigationData {
    series: SeriesWithPosts;
    currentPart: number;
    totalParts: number;
    previousPost: SeriesPost | null;
    nextPost: SeriesPost | null;
    progress: number;
}

/**
 * Props for SeriesPageClient component
 */
export interface SeriesPageClientProps {
    series: SeriesInfo[];
}

/**
 * Props for SeriesDetailClient component
 */
export interface SeriesDetailProps {
    series: SeriesWithPosts;
}
