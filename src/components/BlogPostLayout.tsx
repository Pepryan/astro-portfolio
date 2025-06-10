import { FiArrowLeft, FiCalendar, FiClock, FiTag, FiUser } from 'react-icons/fi';
import ShareButtons from './ShareButtons';
import { useEffect, useState } from 'react';
import TableOfContents from './TableOfContents';
import BackToTop from './BackToTop';
import GiscusComments from './GiscusComments';
import RelatedPosts from './RelatedPosts';
import PostNavigation from './PostNavigation';

interface BlogPostData {
  title: string;
  summary?: string;
  description?: string;
  date: Date;
  updated?: Date;
  tags?: string[];
  category?: string;
  thumbnail?: string;
  author?: string;
}

interface BlogPost {
  slug: string;
  data: BlogPostData;
  readingTime: number;
}

interface BlogPostLayoutProps {
  post: {
    slug: string;
    data: BlogPostData;
    body: string;
  };
  readingTime: number;
  wordCount: number;
  postUrl: string;
  allPosts?: BlogPost[];
  children: React.ReactNode;
}

export default function BlogPostLayout({
  post,
  readingTime,
  wordCount,
  postUrl,
  allPosts = [],
  children
}: BlogPostLayoutProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Add lightbox functionality to images
  useEffect(() => {
    const addLightboxToImages = () => {
      console.log('Adding lightbox to images...');
      const images = document.querySelectorAll('.prose img') as NodeListOf<HTMLImageElement>;
      console.log('Found images:', images.length);

      images.forEach((img, index) => {
        // Skip if already processed
        if (img.parentElement?.classList.contains('lightbox-wrapper')) {
          console.log('Image already processed:', index);
          return;
        }

        console.log('Processing image:', index, img.src);

        // Create wrapper
        const wrapper = document.createElement('span');
        wrapper.className = 'lightbox-wrapper inline-block cursor-pointer';
        wrapper.setAttribute('role', 'button');
        wrapper.setAttribute('tabindex', '0');
        wrapper.setAttribute('aria-label', 'Click to view image in lightbox');

        // Add click handler
        const handleClick = () => {
          console.log('Image clicked, opening lightbox for:', img.src);
          openLightbox(img.src, img.alt || '');
        };

        wrapper.addEventListener('click', handleClick);
        wrapper.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            console.log('Enter pressed on image');
            handleClick();
          }
        });

        // Wrap the image
        img.parentNode?.insertBefore(wrapper, img);
        wrapper.appendChild(img);

        // Update image styles
        img.className = 'my-8 rounded-lg cursor-pointer hover:opacity-90 transition-opacity max-w-full h-auto';
      });
    };

    const openLightbox = (src: string, alt: string) => {
      console.log('Opening lightbox for:', src);

      // Create modal
      const modal = document.createElement('div');
      modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');

      // Create close button
      const closeBtn = document.createElement('button');
      closeBtn.className = 'absolute top-4 right-4 p-2 text-white hover:text-gray-300 transition-colors';
      closeBtn.innerHTML = '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>';
      closeBtn.setAttribute('aria-label', 'Close image preview');

      // Create image
      const modalImg = document.createElement('img');
      modalImg.src = src;
      modalImg.alt = alt;
      modalImg.className = 'rounded-lg max-h-[90vh] max-w-[90vw] object-contain';

      // Close handlers
      const closeModal = () => {
        console.log('Closing lightbox');
        document.body.removeChild(modal);
      };

      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeModal();
      });

      modal.addEventListener('click', closeModal);
      modalImg.addEventListener('click', (e) => e.stopPropagation());

      // Escape key handler
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          closeModal();
          document.removeEventListener('keydown', handleEscape);
        }
      };
      document.addEventListener('keydown', handleEscape);

      // Append elements
      modal.appendChild(closeBtn);
      modal.appendChild(modalImg);
      document.body.appendChild(modal);
    };

    // Add lightbox functionality after component mounts
    const timer = setTimeout(addLightboxToImages, 100);
    return () => clearTimeout(timer);
  }, [children]);

  // Note: Copy buttons are now handled by CopyCodeScript.astro included in Layout.astro
  // This ensures consistent copy button behavior across all pages

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
          <article className="prose dark:prose-invert max-w-none">
            {/* Article Header */}
            <header className="mb-8">
              {/* Featured image */}
              {post.data.thumbnail && (
                <div className="relative w-full h-64 md:h-80 mb-8 rounded-xl overflow-hidden">
                  <img
                    src={post.data.thumbnail}
                    alt={post.data.title}
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </div>
              )}

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
                {post.data.title}
              </h1>

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400 mb-6">
                <div className="flex items-center gap-2">
                  <FiCalendar className="w-4 h-4" />
                  <time dateTime={post.data.date.toISOString()}>
                    {post.data.date.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </div>
                
                {post.data.updated && (
                  <div className="flex items-center gap-2">
                    <span>Updated:</span>
                    <time dateTime={post.data.updated.toISOString()}>
                      {post.data.updated.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
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
                <TableOfContents content={post.body} defaultExpanded={false} isMobile={true} />
              </div>
            </header>

            {/* Article Content */}
            <div className="">
              {children}
            </div>
          </article>

          {/* Desktop Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <TableOfContents content={post.body} defaultExpanded={true} />
            </div>
          </aside>
        </div>

        {/* Article Footer */}
        <footer className="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              <div className="flex items-center gap-2 mb-1">
                <FiUser className="w-4 h-4" />
                <span>Written by <strong className="text-neutral-900 dark:text-neutral-100">{post.data.author || 'Febryan Ramadhan'}</strong></span>
              </div>
              <p>Published on {post.data.date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
            
            {/* Share buttons */}
            <div className="flex flex-col gap-3">
              <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Share this article:</span>
              <ShareButtons title={post.data.title} slug={post.slug} />
            </div>
          </div>
        </footer>

        {/* Post Navigation */}
        {mounted && allPosts.length > 0 && (
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

        {/* Related Posts */}
        {mounted && allPosts.length > 0 && (
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
        {mounted && (
          <GiscusComments
            slug={post.slug}
            title={post.data.title}
          />
        )}
      </main>

      {/* Back to Top with Reading Progress */}
      <BackToTop showProgress={true} />
    </div>
  );
}
