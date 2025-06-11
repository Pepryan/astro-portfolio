import { useState, useRef, useEffect } from 'react';
import { FiChevronDown, FiX, FiRss, FiTag, FiTrendingUp, FiBookOpen, FiArchive } from 'react-icons/fi';
import Header from './Header';
import BlogList from './BlogList';
import BlogSearch from './BlogSearch';
import PostsPerPageSelector from './PostsPerPageSelector';
import BackToTop from './BackToTop';
import { seoConfig } from '../config/components';

interface BlogPost {
  slug: string;
  data: {
    title: string;
    summary?: string;
    date: Date;
    updated?: Date;
    tags?: string[];
    thumbnail?: string;
  };
  readingTime: number;
}

interface BlogPageClientProps {
  posts: BlogPost[];
}

export default function BlogPageClient({ posts }: BlogPageClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [postsPerPage, setPostsPerPage] = useState(6);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get blog configuration
  const blogConfig = seoConfig.blog;
  const showStats = blogConfig.layout?.showStats ?? true;
  const showPaginationInfo = blogConfig.layout?.showPaginationInfo ?? false;
  const compactLayout = blogConfig.layout?.compactLayout ?? true;
  const terminology = blogConfig.layout?.terminology ?? 'posts';
  const statsLabels = blogConfig.layout?.statsLabels ?? { posts: 'posts', topics: 'topics' };

  // Get all unique tags
  const allTags = Array.from(new Set(posts.flatMap(post => post.data.tags || []))).sort();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleTagFilter = (tag: string) => {
    setSelectedTag(tag);
    setIsDropdownOpen(false);
  };

  const clearTagFilter = () => {
    setSelectedTag('');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K to focus search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Find the search input and focus it
        const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 pt-24 pb-16">
        {/* Enhanced Blog Title Section */}
        <div className={compactLayout ? "mb-6" : "mb-8"}>
          <div className="relative mb-8 pb-4">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <div className="absolute top-1/2 left-0 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-2xl transform -translate-y-1/2 animate-pulse"></div>
              <div className="absolute top-1/2 right-0 w-20 h-20 bg-gradient-to-bl from-green-500/10 to-blue-500/10 rounded-full blur-2xl transform -translate-y-1/2 animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              {/* Enhanced Blog Title */}
              <div className="group relative py-2">
                <div className="relative">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-700
                    dark:from-neutral-100 dark:via-neutral-200 dark:to-neutral-300 bg-clip-text text-transparent
                    transition-all duration-500 group-hover:scale-105 cursor-default
                    drop-shadow-sm relative z-10 leading-tight">
                    Blog
                  </h1>

                  {/* Animated Underline */}
                  <div className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
                    transition-all duration-700 ease-out group-hover:w-full rounded-full shadow-lg"></div>

                  {/* Subtle Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20
                    blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                </div>
              </div>

              {/* Enhanced Stats Section - Configurable */}
              {showStats && (
                <div className="flex items-center gap-3">
                  <div className="group flex items-center gap-2 px-4 py-2.5 rounded-full
                    bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/30 
                    border border-blue-200 dark:border-blue-800/50
                    hover:from-blue-100 hover:to-blue-200 dark:hover:from-blue-900/30 dark:hover:to-blue-800/40 
                    transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20">
                    <FiBookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400
                      transition-transform duration-300 group-hover:rotate-12" />
                    <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                      {posts.length}
                    </span>
                    <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                      {statsLabels.posts}
                    </span>
                  </div>

                  <div className="group flex items-center gap-2 px-4 py-2.5 rounded-full
                    bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/30 
                    border border-green-200 dark:border-green-800/50
                    hover:from-green-100 hover:to-green-200 dark:hover:from-green-900/30 dark:hover:to-green-800/40 
                    transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/20">
                    <FiTrendingUp className="w-4 h-4 text-green-600 dark:text-green-400
                      transition-transform duration-300 group-hover:rotate-12" />
                    <span className="text-sm font-semibold text-green-700 dark:text-green-300">
                      {new Set(posts.flatMap(post => post.data.tags || [])).size}
                    </span>
                    <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                      {statsLabels.topics}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Compact Controls Section - All in One Row */}
        <div className={compactLayout ? "mb-6" : "mb-8"}>
          {/* Compact Filter Controls - Single Row Layout */}
          <div className="flex flex-col xl:flex-row xl:items-center gap-4 xl:gap-6">

            {/* Left Side: Tag Filter */}
            {allTags.length > 0 && (
              <div className="relative flex-1 xl:flex-initial xl:min-w-[400px] xl:max-w-[500px]" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="group w-full inline-flex items-center justify-between px-4 py-3
                    bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700
                    rounded-xl shadow-sm text-sm font-medium text-neutral-700 dark:text-neutral-300
                    hover:bg-neutral-50 dark:hover:bg-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600
                    hover:shadow-md hover:scale-[1.02] transition-all duration-300 ease-out
                    focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300"
                >
                  <span className="truncate transition-colors duration-200">
                    {selectedTag ? `${selectedTag} (${posts.filter(post => post.data.tags?.includes(selectedTag)).length})` : `All ${statsLabels.posts.charAt(0).toUpperCase() + statsLabels.posts.slice(1)} (${posts.length})`}
                  </span>
                  <FiChevronDown className={`w-4 h-4 ml-3 flex-shrink-0 transition-all duration-300 ease-out
                    ${isDropdownOpen ? 'rotate-180 text-blue-500' : 'group-hover:rotate-12'}`} />
                </button>

                {/* Enhanced Clear Filter Button */}
                {selectedTag && (
                  <button
                    onClick={clearTagFilter}
                    className="absolute -right-8 top-1/2 -translate-y-1/2 p-2
                      text-neutral-400 hover:text-red-500 dark:hover:text-red-400
                      hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full
                      transition-all duration-300 hover:scale-110 hover:rotate-90
                      border border-transparent hover:border-red-200 dark:hover:border-red-800"
                    aria-label="Clear filter"
                  >
                    <FiX className="w-4 h-4 transition-transform duration-300" />
                  </button>
                )}

                {/* Enhanced Dropdown Menu with 2025 Design */}
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-3 bg-white/95 dark:bg-neutral-800/95
                    backdrop-blur-xl border border-neutral-200/60 dark:border-neutral-700/60 rounded-2xl
                    shadow-2xl shadow-neutral-900/10 dark:shadow-neutral-900/30 z-50
                    max-h-[32rem] overflow-hidden
                    animate-in slide-in-from-top-2 fade-in-0 duration-300 ease-out">

                    {/* Header */}
                    <div className="sticky top-0 bg-white/95 dark:bg-neutral-800/95 backdrop-blur-xl
                      border-b border-neutral-200/60 dark:border-neutral-700/60 p-4">
                      <div className="flex items-center gap-2">
                        <FiTag className="w-4 h-4 text-blue-500" />
                        <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                          Filter by Topic
                        </span>
                        <span className="text-xs text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-700
                          px-2 py-1 rounded-full">
                          {allTags.length} {statsLabels.topics}
                        </span>
                      </div>
                    </div>

                    {/* Scrollable Content */}
                    <div className="max-h-80 overflow-y-auto">
                      {/* All Posts Option with Enhanced Styling */}
                      <button
                        onClick={() => handleTagFilter('')}
                        className={`group w-full text-left px-6 py-4 text-sm font-medium transition-all duration-300
                          hover:scale-[1.01] relative overflow-hidden
                          ${selectedTag === ''
                            ? 'bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 text-blue-700 dark:text-blue-300'
                            : 'text-neutral-700 dark:text-neutral-300 hover:bg-gradient-to-r hover:from-neutral-50 hover:to-neutral-100 dark:hover:from-neutral-700/50 dark:hover:to-neutral-600/30'
                          }`}
                      >
                        {selectedTag === '' && (
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-blue-600"></div>
                        )}
                        <div className="flex items-center justify-between">
                          <span className="transition-transform duration-200 group-hover:translate-x-1 font-medium">
                            All {statsLabels.posts.charAt(0).toUpperCase() + statsLabels.posts.slice(1)}
                          </span>
                          <span className="text-xs bg-white dark:bg-neutral-800 px-2 py-1 rounded-full border border-neutral-200 dark:border-neutral-600">
                            {posts.length}
                          </span>
                        </div>
                      </button>

                      {/* Enhanced Tag Grid - Better for Long Tags */}
                      <div className="p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {allTags.map((tag, index) => {
                            const tagCount = posts.filter(post => post.data.tags?.includes(tag)).length;
                            return (
                              <button
                                key={tag}
                                onClick={() => handleTagFilter(tag)}
                                className={`group relative px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 text-left
                                  hover:scale-[1.02] hover:shadow-lg transform-gpu overflow-hidden
                                  ${selectedTag === tag
                                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg scale-[1.02]'
                                    : 'bg-gradient-to-r from-neutral-50 to-neutral-100 dark:from-neutral-700 dark:to-neutral-600 text-neutral-700 dark:text-neutral-300 hover:from-neutral-100 hover:to-neutral-200 dark:hover:from-neutral-600 dark:hover:to-neutral-500'
                                  }`}
                                style={{
                                  animationDelay: `${index * 30}ms`
                                }}
                              >
                                {selectedTag === tag && (
                                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-600/20 animate-pulse"></div>
                                )}
                                <div className="relative flex items-center justify-between">
                                  <span className="transition-transform duration-200 group-hover:translate-x-0.5 font-medium">
                                    {tag}
                                  </span>
                                  <span className={`text-xs px-2 py-1 rounded-full transition-all duration-200 ${
                                    selectedTag === tag
                                      ? 'bg-white/20 text-white'
                                      : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-600'
                                  }`}>
                                    {tagCount}
                                  </span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Center: Compact Search */}
            <div className="flex-1 xl:flex-initial xl:max-w-sm relative z-30">
              <div className="relative z-30">
                <BlogSearch
                  onSearch={handleSearch}
                  placeholder="Search posts..."
                />
              </div>
            </div>

            {/* Right Side: Action Buttons + Posts Per Page */}
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:gap-3">
              
              {/* Action Buttons Group - Mobile Optimized */}
              <div className="flex items-center justify-center gap-2">
                <a
                  href="/blog/tags"
                  className="group inline-flex items-center gap-1.5 px-2.5 py-2 text-sm font-medium
                    text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400
                    hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-300
                    hover:scale-105 hover:shadow-sm border border-neutral-200 dark:border-neutral-700
                    hover:border-blue-200 dark:hover:border-blue-800 justify-center whitespace-nowrap"
                  title="Browse all tags"
                >
                  <FiTag className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
                  <span className="text-xs">Tags</span>
                </a>

                <a
                  href="/archive"
                  className="group inline-flex items-center gap-1.5 px-2.5 py-2 text-sm font-medium
                    text-neutral-600 dark:text-neutral-400 hover:text-purple-600 dark:hover:text-purple-400
                    hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-all duration-300
                    hover:scale-105 hover:shadow-sm border border-neutral-200 dark:border-neutral-700
                    hover:border-purple-200 dark:hover:border-purple-800 justify-center whitespace-nowrap"
                  title="Blog Archive"
                >
                  <FiArchive className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
                  <span className="text-xs">Archive</span>
                </a>

                <a
                  href="/rss.xml"
                  className="group inline-flex items-center gap-1.5 px-2.5 py-2 text-sm font-medium
                    text-neutral-600 dark:text-neutral-400 hover:text-orange-600 dark:hover:text-orange-400
                    hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-all duration-300
                    hover:scale-105 hover:shadow-sm border border-neutral-200 dark:border-neutral-700
                    hover:border-orange-200 dark:hover:border-orange-800 justify-center whitespace-nowrap"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="RSS Feed"
                >
                  <FiRss className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
                  <span className="text-xs">RSS</span>
                </a>
              </div>

              {/* Posts Per Page Selector */}
              <div className="flex justify-center lg:justify-end">
                <PostsPerPageSelector
                  value={postsPerPage}
                  onChange={setPostsPerPage}
                  options={[6, 9, 12, 18]}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Blog Posts List */}
        <BlogList
          posts={posts}
          searchQuery={searchQuery}
          selectedTag={selectedTag}
          postsPerPage={postsPerPage}
          showPaginationInfo={showPaginationInfo}
          compactLayout={compactLayout}
        />
      </main>

      {/* Back to Top Button */}
      <BackToTop showAfter={400} showProgress={true} />
    </>
  );
}
