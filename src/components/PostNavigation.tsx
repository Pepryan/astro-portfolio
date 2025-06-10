import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

interface BlogPost {
  slug: string;
  data: {
    title: string;
    summary?: string;
    date: Date;
    tags?: string[];
  };
}

interface PostNavigationProps {
  currentPost: BlogPost;
  allPosts: BlogPost[];
}

export default function PostNavigation({ currentPost, allPosts }: PostNavigationProps) {
  // Sort posts by date (newest first)
  const sortedPosts = allPosts.sort((a, b) => 
    new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );

  // Find current post index
  const currentIndex = sortedPosts.findIndex(post => post.slug === currentPost.slug);
  
  if (currentIndex === -1) return null;

  const previousPost = currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null;

  if (!previousPost && !nextPost) return null;

  return (
    <nav className="mt-16 border-t border-neutral-200 dark:border-neutral-700 pt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Previous Post */}
        {previousPost ? (
          <a
            href={`/blog/${previousPost.slug}`}
            data-prev-post
            className="group flex items-start gap-4 p-4 rounded-lg border border-neutral-200 dark:border-neutral-700
              hover:border-neutral-300 dark:hover:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-800/50
              transition-all duration-200"
          >
            <div className="flex-shrink-0 p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 
              group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
              <FiArrowLeft className="w-4 h-4 text-neutral-600 dark:text-neutral-400 
                group-hover:text-blue-600 dark:group-hover:text-blue-400" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">
                Previous Post
              </div>
              <h4 className="font-medium text-neutral-900 dark:text-neutral-100 
                group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                {previousPost.data.title}
              </h4>
              {previousPost.data.summary && (
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1 line-clamp-2">
                  {previousPost.data.summary}
                </p>
              )}
            </div>
          </a>
        ) : (
          <div></div> // Empty div to maintain grid layout
        )}

        {/* Next Post */}
        {nextPost ? (
          <a
            href={`/blog/${nextPost.slug}`}
            data-next-post
            className="group flex items-start gap-4 p-4 rounded-lg border border-neutral-200 dark:border-neutral-700
              hover:border-neutral-300 dark:hover:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-800/50
              transition-all duration-200 md:text-right"
          >
            <div className="min-w-0 flex-1 md:order-1">
              <div className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">
                Next Post
              </div>
              <h4 className="font-medium text-neutral-900 dark:text-neutral-100 
                group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                {nextPost.data.title}
              </h4>
              {nextPost.data.summary && (
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1 line-clamp-2">
                  {nextPost.data.summary}
                </p>
              )}
            </div>
            <div className="flex-shrink-0 p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 
              group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors md:order-2">
              <FiArrowRight className="w-4 h-4 text-neutral-600 dark:text-neutral-400 
                group-hover:text-blue-600 dark:group-hover:text-blue-400" />
            </div>
          </a>
        ) : (
          <div></div> // Empty div to maintain grid layout
        )}
      </div>
    </nav>
  );
}
