import { useState, useRef, useEffect } from 'react';
import { FiChevronDown, FiX, FiRss, FiTag, FiTrendingUp, FiBookOpen, FiArchive } from 'react-icons/fi';
import Header from './Header';
import BlogList from './BlogList';
import PostsPerPageSelector from './PostsPerPageSelector';
import BackToTop from './BackToTop';

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

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleTagFilter = (tag: string) => {
    setSelectedTag(selectedTag === tag ? '' : tag);
    setIsDropdownOpen(false); // Auto-close dropdown
  };

  const clearTagFilter = () => {
    setSelectedTag('');
    setIsDropdownOpen(false);
  };

  // Get all unique tags
  const allTags = Array.from(new Set(posts.flatMap(post => post.data.tags || [])))
    .sort();

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

  return (
    <>
      <Header showSearch={true} onSearch={handleSearch} />

      <main className="max-w-7xl mx-auto px-4 pt-24 pb-16">
        {/* Enhanced Blog Header with Micro Interactions */}
        <div className="mb-6">
          {/* Dynamic Title with Animated Stats */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-6">
              {/* Animated Blog Title */}
              <div className="group relative">
                <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-100
                  transition-all duration-300 group-hover:scale-105 cursor-default">
                  Blog
                </h1>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500
                  transition-all duration-500 group-hover:w-full"></div>
              </div>

              {/* Animated Stats with Icons */}
              <div className="hidden sm:flex items-center gap-4">
                <div className="group flex items-center gap-2 px-3 py-1.5 rounded-full
                  bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50
                  hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-300 hover:scale-105">
                  <FiBookOpen className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400
                    transition-transform duration-300 group-hover:rotate-12" />
                  <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                    {posts.length}
                  </span>
                  <span className="text-xs text-blue-600 dark:text-blue-400">
                    articles
                  </span>
                </div>

                <div className="group flex items-center gap-2 px-3 py-1.5 rounded-full
                  bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800/50
                  hover:bg-green-100 dark:hover:bg-green-900/30 transition-all duration-300 hover:scale-105">
                  <FiTrendingUp className="w-3.5 h-3.5 text-green-600 dark:text-green-400
                    transition-transform duration-300 group-hover:rotate-12" />
                  <span className="text-sm font-medium text-green-700 dark:text-green-300">
                    {new Set(posts.flatMap(post => post.data.tags || [])).size}
                  </span>
                  <span className="text-xs text-green-600 dark:text-green-400">
                    topics
                  </span>
                </div>
              </div>
            </div>

            {/* Enhanced Quick Actions with Micro Interactions */}
            <div className="flex items-center gap-1">
              <a
                href="/blog/tags"
                className="group inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium
                  text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400
                  hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-300
                  hover:scale-105 hover:shadow-sm border border-transparent hover:border-blue-200 dark:hover:border-blue-800"
                title="Browse all tags"
              >
                <FiTag className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-12" />
                <span className="hidden sm:inline transition-all duration-300">Tags</span>
              </a>

              <a
                href="/archive"
                className="group inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium
                  text-neutral-600 dark:text-neutral-400 hover:text-purple-600 dark:hover:text-purple-400
                  hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-all duration-300
                  hover:scale-105 hover:shadow-sm border border-transparent hover:border-purple-200 dark:hover:border-purple-800"
                title="Blog Archive"
              >
                <FiArchive className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-12" />
                <span className="hidden sm:inline transition-all duration-300">Archive</span>
              </a>

              <a
                href="/rss.xml"
                className="group inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium
                  text-neutral-600 dark:text-neutral-400 hover:text-orange-600 dark:hover:text-orange-400
                  hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-all duration-300
                  hover:scale-105 hover:shadow-sm border border-transparent hover:border-orange-200 dark:hover:border-orange-800"
                target="_blank"
                rel="noopener noreferrer"
                title="RSS Feed"
              >
                <FiRss className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-12" />
                <span className="hidden sm:inline transition-all duration-300">RSS</span>
              </a>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="mb-6">
          {/* Filter Controls - Better Mobile Alignment */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Tag Filter */}
            {allTags.length > 0 && (
              <div className="relative flex-1 sm:flex-initial" ref={dropdownRef}>
                {/* Enhanced Dropdown Button with Better Mobile Layout */}
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="group w-full sm:min-w-[200px] sm:w-auto inline-flex items-center justify-between px-4 py-3
                    bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700
                    rounded-xl shadow-sm text-sm font-medium text-neutral-700 dark:text-neutral-300
                    hover:bg-neutral-50 dark:hover:bg-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600
                    hover:shadow-md hover:scale-[1.02] transition-all duration-300 ease-out
                    focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300"
                >
                  <span className="truncate transition-colors duration-200">
                    {selectedTag ? `${selectedTag} (${posts.filter(post => post.data.tags?.includes(selectedTag)).length})` : `All Posts (${posts.length})`}
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

                {/* Enhanced Dropdown Menu with Animations */}
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-neutral-800
                    border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-xl z-10
                    max-h-96 overflow-y-auto backdrop-blur-sm
                    animate-in slide-in-from-top-2 duration-300 ease-out">

                    {/* All Posts Option with Enhanced Styling */}
                    <button
                      onClick={() => handleTagFilter('')}
                      className={`group w-full text-left px-4 py-3 text-sm font-medium transition-all duration-300
                        hover:scale-[1.02] hover:shadow-sm
                        ${selectedTag === ''
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-l-4 border-blue-500'
                          : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 hover:border-l-4 hover:border-neutral-300'
                        }`}
                    >
                      <span className="transition-transform duration-200 group-hover:translate-x-1">
                        All Posts ({posts.length})
                      </span>
                    </button>

                    {/* Enhanced Tag Grid */}
                    <div className="p-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                        {allTags.map((tag, index) => {
                          const tagCount = posts.filter(post => post.data.tags?.includes(tag)).length;
                          return (
                            <button
                              key={tag}
                              onClick={() => handleTagFilter(tag)}
                              className={`group px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 text-left
                                hover:scale-105 hover:shadow-md transform-gpu
                                ${selectedTag === tag
                                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg scale-105'
                                  : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600'
                                }`}
                              style={{
                                animationDelay: `${index * 50}ms`
                              }}
                            >
                              <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                                {tag} ({tagCount})
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Enhanced Posts per page selector - Better Mobile Layout */}
            <div className="group flex justify-center sm:justify-end">
              <PostsPerPageSelector
                value={postsPerPage}
                onChange={setPostsPerPage}
                options={[6, 9, 12, 18]}
              />
            </div>
          </div>
        </div>

        {/* Blog Posts List */}
        <BlogList
          posts={posts}
          searchQuery={searchQuery}
          selectedTag={selectedTag}
          postsPerPage={postsPerPage}
        />
      </main>

      {/* Back to Top Button */}
      <BackToTop showAfter={400} showProgress={true} />
    </>
  );
}
