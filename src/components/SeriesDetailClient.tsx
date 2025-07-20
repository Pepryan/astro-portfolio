import { FiBookOpen, FiCalendar, FiClock, FiCheck, FiPlay, FiArrowRight, FiTag, FiTrendingUp } from 'react-icons/fi';
import SeriesHeader from './SeriesHeader';
import BlogCard from './BlogCard';
import BackToTop from './BackToTop';

interface SeriesPost {
  slug: string;
  data: {
    title: string;
    summary?: string;
    date: Date;
    updated?: Date;
    tags?: string[];
    thumbnail?: string;
    series?: {
      part: number;
    };
  };
  readingTime: number;
}

interface SeriesDetailProps {
  series: {
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
    posts: SeriesPost[];
    totalParts: number;
    completedParts: number;
  };
}

export default function SeriesDetailClient({ series }: SeriesDetailProps) {
  const progressPercentage = (series.completedParts / series.totalParts) * 100;
  
  const getStatusIcon = () => {
    switch (series.status) {
      case 'completed':
        return <FiCheck className="w-4 h-4" />;
      case 'ongoing':
        return <FiPlay className="w-4 h-4" />;
      case 'planned':
        return <FiClock className="w-4 h-4" />;
      default:
        return <FiBookOpen className="w-4 h-4" />;
    }
  };

  const getStatusColor = () => {
    switch (series.status) {
      case 'completed':
        return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20';
      case 'ongoing':
        return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20';
      case 'planned':
        return 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20';
      default:
        return 'text-neutral-600 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-900/20';
    }
  };

  const getDifficultyColor = () => {
    switch (series.difficulty?.toLowerCase()) {
      case 'beginner':
        return 'text-green-600 dark:text-green-400';
      case 'intermediate':
        return 'text-amber-600 dark:text-amber-400';
      case 'advanced':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-neutral-600 dark:text-neutral-400';
    }
  };

  const handleTagClick = (tag: string) => {
    window.location.href = `/blog/tags/${tag}`;
  };

  return (
    <main className="pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Series Header */}
        <SeriesHeader 
          series={series} 
          showProgress={true}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Series Posts */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                  Series Posts
                </h2>
                <div className="text-sm text-neutral-500 dark:text-neutral-400">
                  {series.posts.length} of {series.totalParts} parts
                </div>
              </div>

              {series.posts.length > 0 ? (
                <div className="space-y-6">
                  {series.posts.map((post, index) => {
                    const partNumber = post.data.series?.part || index + 1;
                    
                    return (
                      <div key={post.slug} className="relative">
                        {/* Part Number Badge */}
                        <div className="absolute -left-4 top-6 z-10">
                          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                            {partNumber}
                          </div>
                        </div>
                        
                        {/* Connecting Line */}
                        {index < series.posts.length - 1 && (
                          <div className="absolute -left-2 top-14 w-0.5 h-full bg-neutral-200 dark:bg-neutral-700"></div>
                        )}
                        
                        {/* Blog Card */}
                        <div className="ml-8">
                          <BlogCard post={post} readingTime={post.readingTime} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 bg-neutral-50 dark:bg-neutral-800/50 rounded-2xl">
                  <FiBookOpen className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                    No posts yet
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    This series is {series.status}. Posts will be added soon.
                  </p>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Series Info */}
              <div className="bg-white dark:bg-neutral-800/80 backdrop-blur-sm rounded-2xl border border-neutral-200/60 dark:border-neutral-700/60 p-6">
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                  Series Information
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">Status</span>
                    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
                      {getStatusIcon()}
                      <span className="capitalize">{series.status}</span>
                    </div>
                  </div>

                  {series.category && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">Category</span>
                      <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                        {series.category}
                      </span>
                    </div>
                  )}

                  {series.difficulty && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">Difficulty</span>
                      <div className={`flex items-center gap-1 text-sm font-medium ${getDifficultyColor()}`}>
                        <FiTrendingUp className="w-3 h-3" />
                        <span>{series.difficulty}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">Parts</span>
                    <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                      {series.completedParts} / {series.totalParts}
                    </span>
                  </div>

                  {series.startDate && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">Started</span>
                      <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                        {series.startDate.toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  )}

                  {series.endDate && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">Completed</span>
                      <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                        {series.endDate.toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Tags */}
              {series.tags && series.tags.length > 0 && (
                <div className="bg-white dark:bg-neutral-800/80 backdrop-blur-sm rounded-2xl border border-neutral-200/60 dark:border-neutral-700/60 p-6">
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4 flex items-center gap-2">
                    <FiTag className="w-4 h-4" />
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {series.tags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleTagClick(tag)}
                        className="text-sm text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-700 
                          hover:bg-neutral-200 dark:hover:bg-neutral-600 px-3 py-1.5 rounded-lg transition-colors duration-200"
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              <div className="bg-white dark:bg-neutral-800/80 backdrop-blur-sm rounded-2xl border border-neutral-200/60 dark:border-neutral-700/60 p-6">
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <a
                    href="/series"
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 
                      bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 
                      rounded-lg transition-colors duration-200"
                  >
                    <FiBookOpen className="w-4 h-4" />
                    <span>Browse All Series</span>
                  </a>
                  
                  <a
                    href="/blog"
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 
                      bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 
                      rounded-lg transition-colors duration-200"
                  >
                    <FiArrowRight className="w-4 h-4" />
                    <span>View All Posts</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BackToTop />
    </main>
  );
}
