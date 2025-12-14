/**
 * Shared Series Types
 * 
 * Centralized type definitions for blog series components.
 * Used by: SeriesPageClient, SeriesDetailClient, SeriesCard
 */

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
}

/**
 * Blog post that belongs to a series
 * Used by: SeriesDetailClient
 */
export interface SeriesPost {
    slug: string;
    data: {
        title: string;
        summary?: string;
        date: Date;
        updated?: Date;
        tags?: string[];
        thumbnail?: string;
        series?: {
            part: number;
        };
    };
    readingTime: number;
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
    series: SeriesInfo & {
        posts: SeriesPost[];
    };
}
