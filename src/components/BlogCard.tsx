import { FiCalendar, FiTag, FiArrowUpRight, FiBookOpen, FiFileText } from 'react-icons/fi';
import type { BlogPost } from '../types';

interface BlogCardProps {
  post: BlogPost;
  readingTime?: number;
}

export default function BlogCard({ post, readingTime }: BlogCardProps) {
  const calculateReadingTime = (content?: string) => {
    if (readingTime) return readingTime;
    if (!content) return 5;
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / 200);
  };

  const estimatedReadingTime = calculateReadingTime();

  const handleCardClick = () => {
    window.location.href = `/blog/${post.slug}`;
  };

  const handleTagClick = (tag: string, e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = `/blog/tags/${tag}`;
  };

  return (
    <article className="group relative bg-white dark:bg-neutral-800/80 rounded-2xl overflow-hidden
      border border-neutral-200/60 dark:border-neutral-700/60
      hover:border-neutral-300 dark:hover:border-neutral-600
      hover:shadow-xl hover:shadow-neutral-200/20 dark:hover:shadow-neutral-900/20
      transition-all duration-300 ease-out hover:-translate-y-1">

      <div
        className="block h-full cursor-pointer"
        onClick={handleCardClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCardClick();
          }
        }}
        aria-label={`Read article: ${post.data.title}`}
      >
        {/* Image Section - Always show either thumbnail or default */}
        <div className="relative w-full aspect-[16/9] overflow-hidden">
          {post.data.thumbnail ? (
            <img
              src={post.data.thumbnail}
              alt={post.data.title}
              className="w-full h-full object-cover transition-transform duration-500 ease-out"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 dark:from-neutral-800 dark:to-neutral-700
              flex items-center justify-center">
              <div className="text-center">
                <FiFileText className="w-12 h-12 text-blue-500 dark:text-blue-400 mx-auto mb-2" />
                <div className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  Blog Post
                </div>
              </div>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0
            group-hover:opacity-100 transition-opacity duration-300" />

          <div className="absolute top-4 right-4 bg-white/90 dark:bg-neutral-900/90
            backdrop-blur-sm rounded-full px-3 py-1.5 text-xs font-medium
            text-neutral-700 dark:text-neutral-300 border border-white/20">
            <FiBookOpen className="w-3 h-3 inline mr-1" />
            {estimatedReadingTime} min
          </div>
        </div>

        <div className="p-6 space-y-4">
          {post.data.tags && post.data.tags.length > 0 && (
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => handleTagClick(post.data.tags![0], e)}
                className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold
                  bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700
                  text-white rounded-full shadow-sm hover:shadow-md transition-all duration-200
                  transform hover:scale-105 cursor-pointer"
              >
                <FiTag className="w-3 h-3" />
                {post.data.tags![0]}
              </button>
              {post.data.tags.length > 1 && (
                <span className="text-xs text-neutral-500 dark:text-neutral-400">
                  +{post.data.tags.length - 1} more
                </span>
              )}
            </div>
          )}

          {/* Series Indicator */}
          {post.data.series && (
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 dark:bg-blue-900/20
                text-blue-600 dark:text-blue-400 rounded-lg font-medium">
                <FiBookOpen className="w-3 h-3" />
                <span>{post.data.series.name}</span>
              </div>
              <span className="text-neutral-500 dark:text-neutral-400 text-xs">
                Part {post.data.series.part}{post.data.series.total ? ` of ${post.data.series.total}` : ''}
              </span>
            </div>
          )}

          <h2 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-neutral-100
            leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400
            transition-colors duration-200">
            {post.data.title}
          </h2>

          {post.data.summary && (
            <p className="text-neutral-600 dark:text-neutral-400 line-clamp-3 leading-relaxed">
              {post.data.summary}
            </p>
          )}

          {post.data.tags && post.data.tags.length > 1 && (
            <div className="flex flex-wrap gap-2">
              {post.data.tags.slice(1).map((tag) => (
                <button
                  key={tag}
                  onClick={(e) => handleTagClick(tag, e)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium
                    bg-neutral-100 dark:bg-neutral-700/50 text-neutral-700 dark:text-neutral-300
                    rounded-lg border border-neutral-200 dark:border-neutral-600
                    hover:bg-neutral-200 dark:hover:bg-neutral-600 hover:border-neutral-300
                    dark:hover:border-neutral-500 transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
                  aria-label={`View posts tagged with: ${tag}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4
            border-t border-neutral-200/60 dark:border-neutral-700/60">
            <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
              <time
                dateTime={post.data.date.toISOString()}
                className="flex items-center gap-1.5"
              >
                <FiCalendar className="w-4 h-4" />
                {post.data.date.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </time>


            </div>

            <div className="flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400
              group-hover:gap-2 transition-all duration-200">
              <span>Read more</span>
              <FiArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5
                transition-transform duration-200" />
            </div>
          </div>

          {post.data.updated && (
            <div className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
              <span>Updated:</span>
              <time dateTime={post.data.updated.toISOString()}>
                {post.data.updated.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </time>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}