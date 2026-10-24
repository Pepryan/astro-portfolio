/**
 * Content helpers shared by pages. Pages should go through these instead of
 * calling getCollection('posts') and re-implementing filtering/sorting.
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import { calculateReadingTime } from '../utils/readingTime';
import type { BlogPost } from '../types';

export type PostEntry = CollectionEntry<'posts'>;

const isPublished = (post: PostEntry) => !post.data.draft && !post.data.hidden;

const byNewest = (a: PostEntry, b: PostEntry) => b.data.date.getTime() - a.data.date.getTime();

/** Published posts, newest first. */
export async function getPublishedPosts(): Promise<PostEntry[]> {
  const posts = await getCollection('posts', isPublished);
  return posts.sort(byNewest);
}

export function getReadingStats(post: PostEntry) {
  return calculateReadingTime(post.body || '', {
    wordsPerMinute: 200,
    includeCodeBlocks: true,
    includeImages: true,
  });
}

/**
 * Lightweight shape passed to client islands. Never pass full entries:
 * `body` (raw markdown) would be serialized into every page's HTML.
 */
export function toBlogPost(post: PostEntry): BlogPost {
  return {
    slug: post.slug,
    data: post.data,
    readingTime: getReadingStats(post).minutes,
  };
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  return (await getPublishedPosts()).map(toBlogPost);
}

/** Unique tags with post counts, most used first, then alphabetical. */
export function getTagCounts(posts: Pick<BlogPost, 'data'>[]): [string, number][] {
  const counts = new Map<string, number>();
  posts.forEach((post) => post.data.tags?.forEach((tag) => counts.set(tag, (counts.get(tag) ?? 0) + 1)));
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}

export const tagUrl = (tag: string) => `/blog/tags/${encodeURIComponent(tag)}`;
export const postUrl = (slug: string) => `/blog/${slug}`;
