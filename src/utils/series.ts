import { getCollection } from 'astro:content';

export interface SeriesPost {
  slug: string;
  data: {
    title: string;
    date: Date;
    series?: {
      name: string;
      slug: string;
      part: number;
      total?: number;
      description?: string;
      thumbnail?: string;
      order?: number;
    };
    [key: string]: any;
  };
  readingTime?: number;
}

export interface SeriesInfo {
  name: string;
  slug: string;
  description: string;
  thumbnail?: string;
  status: 'ongoing' | 'completed' | 'planned';
  tags: string[];
  category?: string;
  difficulty?: string;
  estimatedParts?: number;
  startDate?: Date;
  endDate?: Date;
  featured: boolean;
  order?: number;
  posts: SeriesPost[];
  totalParts: number;
  completedParts: number;
}

/**
 * Get all series with their associated posts
 */
export async function getAllSeries(): Promise<SeriesInfo[]> {
  const [seriesCollection, postsCollection] = await Promise.all([
    getCollection('series'),
    getCollection('posts')
  ]);

  const publishedPosts = postsCollection.filter(post => !post.data.draft && !post.data.hidden);

  const seriesWithPosts = seriesCollection.map(series => {
    const seriesPosts = publishedPosts
      .filter(post => post.data.series?.slug === series.data.slug)
      .sort((a, b) => {
        const orderA = a.data.series?.order || a.data.series?.part || 0;
        const orderB = b.data.series?.order || b.data.series?.part || 0;
        return orderA - orderB;
      });

    return {
      ...series.data,
      posts: seriesPosts,
      totalParts: series.data.estimatedParts || seriesPosts.length,
      completedParts: seriesPosts.length,
    };
  });

  return seriesWithPosts.sort((a, b) => (a.order || 999) - (b.order || 999));
}

/**
 * Get a specific series by slug
 */
export async function getSeriesBySlug(slug: string): Promise<SeriesInfo | null> {
  const allSeries = await getAllSeries();
  return allSeries.find(series => series.slug === slug) || null;
}

/**
 * Get series navigation for a specific post
 */
export async function getSeriesNavigation(post: SeriesPost) {
  if (!post.data.series) return null;

  const series = await getSeriesBySlug(post.data.series.slug);
  if (!series) return null;

  const currentIndex = series.posts.findIndex(p => p.slug === post.slug);
  if (currentIndex === -1) return null;

  const previousPost = currentIndex > 0 ? series.posts[currentIndex - 1] : null;
  const nextPost = currentIndex < series.posts.length - 1 ? series.posts[currentIndex + 1] : null;

  return {
    series,
    currentPart: currentIndex + 1,
    totalParts: series.posts.length,
    previousPost,
    nextPost,
    progress: ((currentIndex + 1) / series.posts.length) * 100,
  };
}

/**
 * Get featured series
 */
export async function getFeaturedSeries(): Promise<SeriesInfo[]> {
  const allSeries = await getAllSeries();
  return allSeries.filter(series => series.featured);
}

/**
 * Get series by category
 */
export async function getSeriesByCategory(category: string): Promise<SeriesInfo[]> {
  const allSeries = await getAllSeries();
  return allSeries.filter(series => 
    series.category?.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Get all unique series categories
 */
export async function getSeriesCategories(): Promise<string[]> {
  const allSeries = await getAllSeries();
  const categories = allSeries
    .map(series => series.category)
    .filter((category): category is string => Boolean(category));
  
  return [...new Set(categories)].sort();
}

/**
 * Search series by name or description
 */
export async function searchSeries(query: string): Promise<SeriesInfo[]> {
  const allSeries = await getAllSeries();
  const searchTerm = query.toLowerCase();
  
  return allSeries.filter(series =>
    series.name.toLowerCase().includes(searchTerm) ||
    series.description.toLowerCase().includes(searchTerm) ||
    series.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
}
