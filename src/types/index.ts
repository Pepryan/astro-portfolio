/**
 * Shared Type Definitions
 * 
 * Central export point for all shared types.
 * Import from here instead of individual files for convenience.
 * 
 * @example
 * import { BlogPost, SeriesInfo, Project } from '@/types';
 */

// Blog types
export type {
    SeriesReference,
    BlogPostData,
    BlogPostMinimal,
    BlogPost,
    BlogPostWithBody,
    BlogListProps,
} from './blog';

// Series types
export type {
    SeriesStatus,
    SeriesInfo,
    SeriesPost,
    SeriesPageClientProps,
    SeriesDetailProps,
} from './series';

// Project types
export type {
    ProjectStatus,
    ProjectCategory,
    Project,
    ProjectCardProps,
    ProjectCategoryConfig,
} from './project';
