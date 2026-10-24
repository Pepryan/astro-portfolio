/**
 * BlogPostLayout Component
 * 
 * Full-featured layout for individual blog post pages with rich content support.
 * 
 * Features:
 * - Responsive two-column layout (content + sidebar TOC on desktop)
 * - Lightbox functionality for images (added dynamically after mount)
 * - Reading progress indicator
 * - Series navigation for multi-part posts
 * - Related posts section with similarity scoring
 * - Giscus comments integration
 * - Share buttons for social sharing
 * 
 * @example
 * ```tsx
 * <BlogPostLayout
 *   post={post}
 *   readingTime={5}
 *   wordCount={1200}
 *   allPosts={allBlogPosts}
 *   seriesNavigation={seriesNav}
 * >
 *   <Content />
 * </BlogPostLayout>
 * ```
 */
import { FiArrowLeft, FiCalendar, FiClock, FiTag, FiUser } from 'react-icons/fi';
import ShareButtons from './ShareButtons';
import { useEffect } from 'react';
import TableOfContents from './TableOfContents';
import ReadingProgress from './ReadingProgress';
import GiscusComments from './GiscusComments';
import RelatedPosts from './RelatedPosts';
import PostNavigation from './PostNavigation';
import SeriesIndicator from './SeriesIndicator';
import SeriesNavigation from './SeriesNavigation';
import { formatDate } from '../lib/format';
import type { BlogPost } from '../types';
import type { SeriesNavigationData } from '../utils/series';

interface BlogPostLayoutProps {
  post: Pick<BlogPost, 'slug' | 'data'>;
  readingTime: number;
  wordCount: number;
  allPosts?: BlogPost[];
  seriesNavigation?: SeriesNavigationData | null;
  children: React.ReactNode;
}

export default function BlogPostLayout({
  post,
  readingTime,
  wordCount,
  allPosts = [],
  seriesNavigation = null,
  children
}: BlogPostLayoutProps) {
  // Click-to-zoom for images inside the article body (the cover image is excluded)
  useEffect(() => {
    const content = document.querySelector<HTMLElement>('[data-article-content]');
    if (!content) return;

    content.querySelectorAll('img').forEach((img) => {
      img.classList.add('cursor-zoom-in');
      img.tabIndex = 0;
    });

    const openLightbox = (img: HTMLImageElement) => {
      const overlay = document.createElement('div');
      overlay.className = 'fixed inset-0 z-[70] flex cursor-zoom-out items-center justify-center bg-black/85 p-4 backdrop-blur-sm';
      overlay.setAttribute('role', 'dialog');
      overlay.setAttribute('aria-modal', 'true');
      overlay.setAttribute('aria-label', img.alt || 'Image preview');

      const preview = document.createElement('img');
      preview.src = img.currentSrc || img.src;
      preview.alt = img.alt;
      preview.className = 'max-h-[90vh] max-w-[90vw] rounded-lg object-contain';
      overlay.appendChild(preview);

      const close = () => {
        overlay.remove();
        document.removeEventListener('keydown', onKeyDown);
        img.focus();
      };
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') close();
      };

      overlay.addEventListener('click', close);
      document.addEventListener('keydown', onKeyDown);
      document.body.appendChild(overlay);
    };

    const targetImage = (e: Event) => {
      const target = e.target as HTMLElement;
      return target instanceof HTMLImageElement && content.contains(target) ? target : null;
    };
    const onClick = (e: MouseEvent) => {
      const img = targetImage(e);
      if (img) openLightbox(img);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      const img = targetImage(e);
      if (img && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        openLightbox(img);
      }
    };

    content.addEventListener('click', onClick);
    content.addEventListener('keydown', onKeyDown);
    return () => {
      content.removeEventListener('click', onClick);
      content.removeEventListener('keydown', onKeyDown);
    };
  }, []);


  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <main className="max-w-7xl mx-auto px-4 py-8 mt-16">
        {/* Back to blog link */}
        <div className="mb-8">
          <a
            href="/blog"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            <FiArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </a>
        </div>

        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-8">
          {/* Main content */}
          <article className="prose dark:prose-invert max-w-none md:bg-white md:dark:bg-neutral-800/50 md:border md:border-neutral-200/80 md:dark:border-neutral-700/60 md:rounded-2xl md:p-8 lg:p-10 md:shadow-sm">
            {/* Article Header */}
            <header className="mb-8">
              {/* Featured image */}
              {post.data.thumbnail && (
                <div className="relative w-full h-64 md:h-80 mb-8 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                  <img
                    src={post.data.thumbnail}
                    alt={post.data.title}
                    className="w-full h-full object-contain"
                    loading="eager"
                  />
                </div>
              )}

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
                {post.data.title}
              </h1>

              {/* Series Indicator */}
              {post.data.series && (
                <div className="mb-6">
                  <SeriesIndicator series={post.data.series} />
                </div>
              )}

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400 mb-6">
                <div className="flex items-center gap-2">
                  <FiCalendar className="w-4 h-4" />
                  <time dateTime={post.data.date.toISOString()}>
                    {formatDate(post.data.date)}
                  </time>
                </div>

                {post.data.updated && (
                  <div className="flex items-center gap-2">
                    <span>Updated:</span>
                    <time dateTime={post.data.updated.toISOString()}>
                      {formatDate(post.data.updated)}
                    </time>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <FiClock className="w-4 h-4" />
                  <span>{readingTime} min read</span>
                </div>

                <span>{wordCount} words</span>

                {post.data.category && (
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-md">
                    {post.data.category}
                  </span>
                )}
              </div>

              {/* Tags - Show all tags without truncation */}
              {post.data.tags && post.data.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {post.data.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-full text-sm"
                    >
                      <FiTag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Description/Summary */}
              {(post.data.summary || post.data.description) && (
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500 mb-8">
                  <p className="text-lg text-neutral-700 dark:text-neutral-300 italic">
                    {post.data.summary || post.data.description}
                  </p>
                </div>
              )}

              {/* Mobile Table of Contents - Floating Button */}
              <div className="lg:hidden">
                <TableOfContents defaultExpanded={false} isMobile={true} />
              </div>
            </header>

            {/* Article Content */}
            <div data-article-content>
              {children}
            </div>
          </article>

          {/* Desktop Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <TableOfContents defaultExpanded={true} />
            </div>
          </aside>
        </div>

        {/* Article Footer */}
        <footer className="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <div className="flex flex-col gap-6">
            {/* Author Information */}
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              <div className="flex items-center gap-2 mb-1">
                <FiUser className="w-4 h-4" />
                <span>Written by <strong className="text-neutral-900 dark:text-neutral-100">{post.data.author || 'Febryan Ramadhan'}</strong></span>
              </div>
              <p>Published on {formatDate(post.data.date)}</p>
            </div>

            {/* Share buttons */}
            <div className="flex flex-col gap-3">
              <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Share this article:</span>
              <ShareButtons title={post.data.title} slug={post.slug} />
            </div>
          </div>
        </footer>

        {/* Post Navigation */}
        {allPosts.length > 0 && (
          <PostNavigation
            currentPost={{
              slug: post.slug,
              data: post.data,
            }}
            allPosts={allPosts.map(p => ({
              slug: p.slug,
              data: p.data,
            }))}
          />
        )}

        {/* Series Navigation */}
        {seriesNavigation && (
          <div className="mt-8">
            <SeriesNavigation
              series={seriesNavigation.series}
              currentPart={seriesNavigation.currentPart}
              totalParts={seriesNavigation.totalParts}
              previousPost={seriesNavigation.previousPost}
              nextPost={seriesNavigation.nextPost}
              progress={seriesNavigation.progress}
            />
          </div>
        )}

        {/* Related Posts */}
        {allPosts.length > 0 && (
          <RelatedPosts
            currentPost={{
              slug: post.slug,
              data: post.data,
              readingTime: readingTime,
            }}
            allPosts={allPosts}
            maxPosts={3}
          />
        )}

        {/* Comments */}
        <GiscusComments />
      </main>

      {/* Reading Progress Indicator */}
      <ReadingProgress />
    </div>
  );
}
