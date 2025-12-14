/**
 * Shared Project Types
 * 
 * Centralized type definitions for project/portfolio components.
 * Used by: ProjectCard, FeaturedWork, ProjectsWithCategories
 */

/**
 * Project status options
 */
export type ProjectStatus = 'Active' | 'Completed' | 'Archived' | 'In Progress';

/**
 * Project category options
 */
export type ProjectCategory = 'Cloud' | 'DevOps' | 'Web' | 'Automation' | 'Open Source';

/**
 * Complete project information
 */
export interface Project {
    id: string;
    title: string;
    description: string;
    image?: string | null;
    tags: string[];
    link: string;
    github?: string;
    demo?: string;
    category: string;
    status?: string;
    year?: string;
    featured?: boolean;
}

/**
 * Props for ProjectCard component
 */
export interface ProjectCardProps {
    project: Project;
    layout?: 'grid' | 'list' | 'featured';
    showCategory?: boolean;
    showStatus?: boolean;
    showYear?: boolean;
}

/**
 * Category configuration for project filtering
 */
export interface ProjectCategoryConfig {
    id: string;
    name: string;
    description: string;
    icon: string;
    count: number;
}
