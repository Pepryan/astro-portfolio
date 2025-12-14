import { FiClock, FiTag, FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import type { BlogPost } from '../types';

interface RelatedPostsProps {
  currentPost: BlogPost;
  allPosts: BlogPost[];
  maxPosts?: number;
}

export default function RelatedPosts({ currentPost, allPosts, maxPosts = 3 }: RelatedPostsProps) {
  // Find related posts based on shared tags
  const relatedPosts = allPosts
    .filter(post => post.slug !== currentPost.slug) // Exclude current post
    .map(post => {
      // Calculate similarity score based on shared tags
      const currentTags = currentPost.data.tags || [];
      const postTags = post.data.tags || [];
      const sharedTags = currentTags.filter(tag => postTags.includes(tag));
      const similarityScore = sharedTags.length;

      return {
        ...post,
        similarityScore,
        sharedTags
      };
    })
    .filter(post => post.similarityScore > 0) // Only posts with shared tags
    .sort((a, b) => {
      // Sort by similarity score first, then by date
      if (b.similarityScore !== a.similarityScore) {
        return b.similarityScore - a.similarityScore;
      }
      return new Date(b.data.date).getTime() - new Date(a.data.date).getTime();
    })
    .slice(0, maxPosts);

  // If no related posts found, show recent posts
  const fallbackPosts = relatedPosts.length === 0
    ? allPosts
      .filter(post => post.slug !== currentPost.slug)
      .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
      .slice(0, maxPosts)
    : [];

  const postsToShow = relatedPosts.length > 0 ? relatedPosts : fallbackPosts;

  if (postsToShow.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-16 border-t border-neutral-200 dark:border-neutral-700 pt-8"
    >
      <div className="flex items-center gap-3 mb-8">
        <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          {relatedPosts.length > 0 ? 'Related Posts' : 'Recent Posts'}
        </h3>
        <div className="flex-1 h-px bg-gradient-to-r from-neutral-200 dark:from-neutral-700 to-transparent" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {postsToShow.map((post, index) => (
          <motion.article
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group bg-white dark:bg-neutral-800/50 rounded-xl border border-neutral-200 dark:border-neutral-700
              hover:border-neutral-300 dark:hover:border-neutral-600 hover:shadow-lg dark:hover:shadow-neutral-900/20
              transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
          >
            <a href={`/blog/${post.slug}`} className="flex flex-col h-full">
              {/* Thumbnail */}
              {post.data.thumbnail && (
                <div className="relative w-full h-40 flex-shrink-0 overflow-hidden">
                  <img
                    src={post.data.thumbnail}
                    alt={post.data.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              )}

              <div className="p-5 flex flex-col flex-1">
                {/* Title */}
                <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3
                  group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2 text-lg">
                  {post.data.title}
                </h4>

                {/* Summary */}
                {post.data.summary && (
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-3 flex-grow">
                    {post.data.summary}
                  </p>
                )}

                {/* Metadata */}
                <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-4">
                  <time className="font-medium">
                    {(() => {
                      const d = new Date(post.data.date);
                      const day = d.getDate();
                      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                      const month = months[d.getMonth()];
                      const year = d.getFullYear();
                      return `${day}-${month}-${year}`;
                    })()}
                  </time>
                  <div className="flex items-center gap-1">
                    <FiClock className="w-3 h-3" />
                    <span>{post.readingTime} min read</span>
                  </div>
                </div>

                {/* Tags and Read More */}
                <div className="mt-auto">
                  {post.data.tags && post.data.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {post.data.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full
                            transition-all duration-200 group-hover:scale-105
                            ${('sharedTags' in post && (post as { sharedTags?: string[] }).sharedTags?.includes(tag))
                              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                              : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300'
                            }`}
                        >
                          <FiTag className="w-2.5 h-2.5" />
                          {tag}
                        </span>
                      ))}
                      {post.data.tags.length > 2 && (
                        <span className="text-xs text-neutral-500 dark:text-neutral-400 px-2 py-1">
                          +{post.data.tags.length - 2} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Read More Button */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400
                      group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                      Read more
                    </span>
                    <FiArrowRight className="w-4 h-4 text-blue-600 dark:text-blue-400
                      group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </a>
          </motion.article>
        ))}
      </div>
    </motion.div>
  );
}
