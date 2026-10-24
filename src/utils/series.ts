import { getCollection } from 'astro:content';
import { getPublishedPosts, toBlogPost } from '../lib/posts';
import type { BlogPost, SeriesNavigationData, SeriesWithPosts } from '../types';

export type { SeriesNavigationData, SeriesWithPosts } from '../types';

const partOrder = (post: BlogPost) => post.data.series?.order ?? post.data.series?.part ?? 0;

/**
 * Get all series with their published posts, ordered by `order` then by part.
 */
export async function getAllSeries(): Promise<SeriesWithPosts[]> {
  const [seriesCollection, posts] = await Promise.all([getCollection('series'), getPublishedPosts()]);
  const blogPosts = posts.map(toBlogPost);

  return seriesCollection
    .map(({ data }) => {
      const seriesPosts = blogPosts
        .filter((post) => post.data.series?.slug === data.slug)
        .sort((a, b) => partOrder(a) - partOrder(b));

      return {
        ...data,
        posts: seriesPosts,
        totalParts: data.estimatedParts || seriesPosts.length,
        completedParts: seriesPosts.length,
      };
    })
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

/**
 * Get previous/next navigation for a post that belongs to a series.
 */
export async function getSeriesNavigation(post: Pick<BlogPost, 'slug' | 'data'>): Promise<SeriesNavigationData | null> {
  const seriesSlug = post.data.series?.slug;
  if (!seriesSlug) return null;

  const series = (await getAllSeries()).find((s) => s.slug === seriesSlug);
  if (!series) return null;

  const index = series.posts.findIndex((p) => p.slug === post.slug);
  if (index === -1) return null;

  return {
    series,
    currentPart: index + 1,
    totalParts: series.posts.length,
    previousPost: series.posts[index - 1] ?? null,
    nextPost: series.posts[index + 1] ?? null,
    progress: ((index + 1) / series.posts.length) * 100,
  };
}
