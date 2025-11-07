import { FiChevronLeft, FiChevronRight, FiList, FiBookOpen } from 'react-icons/fi';
import { useState } from 'react';

interface SeriesPost {
  slug: string;
  data: {
    title: string;
    date: Date;
    series?: {
      part: number;
    };
  };
}

interface SeriesNavigationProps {
  series: {
    name: string;
    slug: string;
    posts: SeriesPost[];
  };
  currentPart: number;
  totalParts: number;
  previousPost?: SeriesPost | null;
  nextPost?: SeriesPost | null;
  progress: number;
}

export default function SeriesNavigation({ 
  series, 
  currentPart, 
  totalParts, 
  previousPost, 
  nextPost, 
  progress 
}: SeriesNavigationProps) {
  const [showAllParts, setShowAllParts] = useState(false);

  return (
    <div className="bg-white dark:bg-neutral-800/80 backdrop-blur-sm rounded-2xl border border-neutral-200/60 dark:border-neutral-700/60 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-neutral-200/60 dark:border-neutral-700/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
              <FiBookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                {series.name}
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Part {currentPart} of {totalParts}
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setShowAllParts(!showAllParts)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 
              hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-200"
          >
            <FiList className="w-4 h-4" />
            <span>{showAllParts ? 'Hide' : 'Show'} all parts</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-2">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-1.5">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* All Parts List */}
      {showAllParts && (
        <div className="max-h-80 overflow-y-auto">
          {series.posts.map((post, index) => {
            const partNumber = post.data.series?.part || index + 1;
            const isCurrent = partNumber === currentPart;

            return (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={`block p-4 border-b border-neutral-200/60 dark:border-neutral-700/60 last:border-b-0
                  hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors duration-200
                  ${isCurrent ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold mt-0.5
                    ${isCurrent
                      ? 'bg-blue-600 text-white'
                      : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400'
                    }`}
                  >
                    {partNumber}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-medium leading-tight mb-1
                      ${isCurrent
                        ? 'text-blue-900 dark:text-blue-100'
                        : 'text-neutral-900 dark:text-neutral-100'
                      } line-clamp-2 text-sm`}
                    >
                      {post.data.title}
                    </h4>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      {post.data.date.toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  {isCurrent && (
                    <div className="flex-shrink-0 text-xs font-medium text-blue-600 dark:text-blue-400 mt-0.5">
                      Current
                    </div>
                  )}
                </div>
              </a>
            );
          })}
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="p-4 bg-neutral-50/50 dark:bg-neutral-900/50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Previous Post */}
          {previousPost ? (
            <a
              href={`/blog/${previousPost.slug}`}
              className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-neutral-800
                border border-neutral-200/60 dark:border-neutral-700/60
                hover:border-neutral-300 dark:hover:border-neutral-600
                hover:shadow-md transition-all duration-200 group"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center
                group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors duration-200 mt-0.5">
                <FiChevronLeft className="w-4 h-4 text-neutral-600 dark:text-neutral-400
                  group-hover:text-blue-600 dark:group-hover:text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1 font-medium uppercase tracking-wide">
                  Previous
                </div>
                <div className="font-medium text-neutral-900 dark:text-neutral-100 leading-tight
                  group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200
                  line-clamp-2 text-sm">
                  {previousPost.data.title}
                </div>
              </div>
            </a>
          ) : (
            <div className="hidden md:block"></div>
          )}

          {/* Next Post */}
          {nextPost ? (
            <a
              href={`/blog/${nextPost.slug}`}
              className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-neutral-800
                border border-neutral-200/60 dark:border-neutral-700/60
                hover:border-neutral-300 dark:hover:border-neutral-600
                hover:shadow-md transition-all duration-200 group md:text-right"
            >
              <div className="flex-1 min-w-0 md:order-2">
                <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1 font-medium uppercase tracking-wide">
                  Next
                </div>
                <div className="font-medium text-neutral-900 dark:text-neutral-100 leading-tight
                  group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200
                  line-clamp-2 text-sm">
                  {nextPost.data.title}
                </div>
              </div>
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center
                group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors duration-200 mt-0.5 md:order-1">
                <FiChevronRight className="w-4 h-4 text-neutral-600 dark:text-neutral-400
                  group-hover:text-blue-600 dark:group-hover:text-blue-400" />
              </div>
            </a>
          ) : (
            <div className="hidden md:block"></div>
          )}
        </div>
      </div>
    </div>
  );
}
