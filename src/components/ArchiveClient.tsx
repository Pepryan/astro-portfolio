import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCalendar, FiClock, FiTag, FiSearch, FiArchive, FiTrendingUp } from 'react-icons/fi';
import BlogSearch from './BlogSearch';
import ReadingProgress from './ReadingProgress';
import type { BlogPost } from '../types';

interface ArchiveClientProps {
  posts: BlogPost[];
}

export default function ArchiveClient({ posts }: ArchiveClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'readingTime'>('date');

  // Group posts by year and process data
  const { postsByYear, allTags, years, stats } = useMemo(() => {
    const filteredPosts = posts.filter(post => {
      const matchesSearch = !searchQuery ||
        post.data.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.data.summary?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.data.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTag = !selectedTag || post.data.tags?.includes(selectedTag);
      const matchesYear = !selectedYear || new Date(post.data.date).getFullYear().toString() === selectedYear;

      return matchesSearch && matchesTag && matchesYear;
    });

    // Sort posts
    const sortedPosts = [...filteredPosts].sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.data.title.localeCompare(b.data.title);
        case 'readingTime':
          return b.readingTime - a.readingTime;
        case 'date':
        default:
          return new Date(b.data.date).getTime() - new Date(a.data.date).getTime();
      }
    });

    // Group by year
    const grouped = sortedPosts.reduce((acc, post) => {
      const year = new Date(post.data.date).getFullYear();
      if (!acc[year]) acc[year] = [];
      acc[year].push(post);
      return acc;
    }, {} as Record<number, BlogPost[]>);

    // Get all unique tags
    const tags = Array.from(new Set(posts.flatMap(post => post.data.tags || [])))
      .sort((a, b) => a.localeCompare(b));

    // Get all years
    const yearsSet = Array.from(new Set(posts.map(post => new Date(post.data.date).getFullYear())))
      .sort((a, b) => b - a);

    // Calculate stats
    const totalPosts = posts.length;
    const totalReadingTime = posts.reduce((sum, post) => sum + post.readingTime, 0);
    const avgReadingTime = Math.round(totalReadingTime / totalPosts);

    return {
      postsByYear: grouped,
      allTags: tags,
      years: yearsSet,
      stats: { totalPosts, totalReadingTime, avgReadingTime }
    };
  }, [posts, searchQuery, selectedTag, selectedYear, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTag('');
    setSelectedYear('');
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  };

  return (
    <main className="min-h-screen bg-white dark:bg-neutral-900 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl text-white">
              <FiArchive className="w-6 h-6" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-neutral-900 to-neutral-600 
              dark:from-neutral-100 dark:to-neutral-400 bg-clip-text text-transparent">
              Blog Archive
            </h1>
          </div>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Explore all blog posts organized by year, with powerful search and filtering capabilities.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 
            rounded-xl p-6 border border-blue-200/50 dark:border-blue-700/50">
            <div className="flex items-center gap-3">
              <FiArchive className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{stats.totalPosts}</p>
                <p className="text-sm text-blue-700 dark:text-blue-300">Total Articles</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 
            rounded-xl p-6 border border-emerald-200/50 dark:border-emerald-700/50">
            <div className="flex items-center gap-3">
              <FiClock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <div>
                <p className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">{stats.totalReadingTime}</p>
                <p className="text-sm text-emerald-700 dark:text-emerald-300">Total Minutes</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 
            rounded-xl p-6 border border-purple-200/50 dark:border-purple-700/50">
            <div className="flex items-center gap-3">
              <FiTrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <div>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">{stats.avgReadingTime}</p>
                <p className="text-sm text-purple-700 dark:text-purple-300">Avg. Reading Time</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm rounded-xl border border-neutral-200/50 
            dark:border-neutral-700/50 p-6 mb-8"
        >
          <div className="space-y-6">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Search Articles
              </label>
              <BlogSearch onSearch={setSearchQuery} placeholder="Search by title, content, or tags..." />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Year Filter */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Filter by Year
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 
                    rounded-lg text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Years</option>
                  {years.map(year => (
                    <option key={year} value={year.toString()}>{year}</option>
                  ))}
                </select>
              </div>

              {/* Tag Filter */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Filter by Tag
                </label>
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 
                    rounded-lg text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Tags</option>
                  {allTags.map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Sort by
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'date' | 'title' | 'readingTime')}
                  className="w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 
                    rounded-lg text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="date">Date (Newest First)</option>
                  <option value="title">Title (A-Z)</option>
                  <option value="readingTime">Reading Time</option>
                </select>
              </div>
            </div>

            {/* Clear Filters */}
            {(searchQuery || selectedTag || selectedYear) && (
              <div className="flex justify-center">
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 
                    hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 
                    rounded-lg transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Posts by Year */}
        <AnimatePresence mode="wait">
          {Object.keys(postsByYear).length > 0 ? (
            <motion.div
              key="posts"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              {Object.entries(postsByYear)
                .sort(([a], [b]) => parseInt(b) - parseInt(a))
                .map(([year, yearPosts]) => (
                  <motion.div
                    key={year}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm rounded-xl border border-neutral-200/50 
                      dark:border-neutral-700/50 overflow-hidden"
                  >
                    {/* Year Header */}
                    <div className="bg-gradient-to-r from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-700 
                      px-6 py-4 border-b border-neutral-200/50 dark:border-neutral-600/50">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">{year}</h2>
                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 
                          rounded-full text-sm font-medium">
                          {yearPosts.length} article{yearPosts.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>

                    {/* Posts List */}
                    <div className="p-6">
                      <div className="space-y-4">
                        {yearPosts.map((post, index) => (
                          <motion.article
                            key={post.slug}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="group"
                          >
                            <a
                              href={`/blog/${post.slug}`}
                              className="block p-4 rounded-lg border border-neutral-200/50 dark:border-neutral-700/50 
                                hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg 
                                transition-all duration-300 hover:scale-[1.02]"
                            >
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div className="flex-1">
                                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 
                                    group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
                                    {post.data.title}
                                  </h3>
                                  {post.data.summary && (
                                    <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-3 line-clamp-2">
                                      {post.data.summary}
                                    </p>
                                  )}
                                  <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
                                    <div className="flex items-center gap-1">
                                      <FiCalendar className="w-4 h-4" />
                                      <span>{formatDate(post.data.date)}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <FiClock className="w-4 h-4" />
                                      <span>{post.readingTime} min read</span>
                                    </div>
                                    {post.data.tags && post.data.tags.length > 0 && (
                                      <div className="flex items-center gap-1">
                                        <FiTag className="w-4 h-4" />
                                        <div className="flex flex-wrap gap-1">
                                          {post.data.tags.slice(0, 3).map(tag => (
                                            <span key={tag} className="px-2 py-1 bg-neutral-100 dark:bg-neutral-700 
                                              text-neutral-600 dark:text-neutral-300 rounded text-xs">
                                              {tag}
                                            </span>
                                          ))}
                                          {post.data.tags.length > 3 && (
                                            <span className="text-xs text-neutral-400">
                                              +{post.data.tags.length - 3} more
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </a>
                          </motion.article>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
            </motion.div>
          ) : (
            <motion.div
              key="no-posts"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <div className="max-w-md mx-auto">
                <FiSearch className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                  No articles found
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Reading Progress Indicator */}
      <ReadingProgress />
    </main>
  );
}
