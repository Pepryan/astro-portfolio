import { useMemo, useEffect, useState } from 'react';
import BlogCard from './BlogCard';
import Pagination from './Pagination';

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

interface BlogListProps {
  posts: BlogPost[];
  searchQuery?: string;
  selectedTag?: string;
  postsPerPage?: number;
}

export default function BlogList({
  posts,
  searchQuery = '',
  selectedTag = '',
  postsPerPage = 6
}: BlogListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Filter posts based on search query and selected tag
  const filteredPosts = useMemo(() => {
    let filtered = posts;

    // Filter by tag first
    if (selectedTag) {
      filtered = filtered.filter(post =>
        post.data.tags?.includes(selectedTag)
      );
    }

    // Then filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post => {
        const titleMatch = post.data.title.toLowerCase().includes(query);
        const summaryMatch = post.data.summary?.toLowerCase().includes(query);
        const tagsMatch = post.data.tags?.some(tag =>
          tag.toLowerCase().includes(query)
        );

        return titleMatch || summaryMatch || tagsMatch;
      });
    }

    return filtered;
  }, [posts, searchQuery, selectedTag]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  // Reset to first page when filters or postsPerPage change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedTag, postsPerPage]);

  // Ensure current page is valid when total pages change
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(Math.max(1, totalPages));
    }
  }, [totalPages, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // No auto scroll - let user stay at their current position
  };

  return (
    <div className="space-y-8">
      {/* Enhanced Desktop Info with Micro Interactions */}
      {filteredPosts.length > 0 && totalPages > 1 && (
        <div className="hidden sm:flex items-center justify-between">
          {/* Animated Results Count */}
          <div className="group flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-50 dark:bg-neutral-800/50
              border border-neutral-200 dark:border-neutral-700 transition-all duration-300
              group-hover:bg-neutral-100 dark:group-hover:bg-neutral-800 group-hover:scale-105">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {(searchQuery || selectedTag) ? (
                  <>
                    Found <span className="text-blue-600 dark:text-blue-400 font-semibold">{filteredPosts.length}</span> post{filteredPosts.length !== 1 ? 's' : ''}
                    {selectedTag && <span className="text-neutral-500"> in "{selectedTag}"</span>}
                    {searchQuery && <span className="text-neutral-500"> for "{searchQuery}"</span>}
                  </>
                ) : (
                  <>
                    <span className="text-blue-600 dark:text-blue-400 font-semibold">{filteredPosts.length}</span> blog post{filteredPosts.length !== 1 ? 's' : ''}
                  </>
                )}
              </span>
            </div>
          </div>

          {/* Enhanced Pagination Info with Animations */}
          <div className="group flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-neutral-50 to-neutral-100
              dark:from-neutral-800/50 dark:to-neutral-800 border border-neutral-200 dark:border-neutral-700
              transition-all duration-300 group-hover:scale-105 group-hover:shadow-sm">
              <div className="flex items-center gap-1 text-sm text-neutral-600 dark:text-neutral-400">
                <span className="text-neutral-500 dark:text-neutral-500">Showing</span>
                <span className="font-semibold text-green-600 dark:text-green-400">
                  {(currentPage - 1) * postsPerPage + 1}-{Math.min(currentPage * postsPerPage, filteredPosts.length)}
                </span>
                <span className="text-neutral-500 dark:text-neutral-500">of</span>
                <span className="font-semibold text-neutral-700 dark:text-neutral-300">{filteredPosts.length}</span>
              </div>
              <div className="w-1 h-4 bg-neutral-300 dark:bg-neutral-600 rounded-full"></div>
              <div className="flex items-center gap-1 text-sm text-neutral-600 dark:text-neutral-400">
                <span className="text-neutral-500 dark:text-neutral-500">Page</span>
                <span className="font-semibold text-purple-600 dark:text-purple-400">{currentPage}</span>
                <span className="text-neutral-500 dark:text-neutral-500">of</span>
                <span className="font-semibold text-neutral-700 dark:text-neutral-300">{totalPages}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Posts list */}
      {filteredPosts.length > 0 ? (
        <>
          {/* Posts grid - 3 column layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {currentPosts.map((post) => (
              <BlogCard
                key={post.slug}
                post={post}
                readingTime={post.readingTime}
              />
            ))}
          </div>

          {/* Enhanced Pagination with Mobile Info */}
          {totalPages > 1 && (
            <div className="space-y-4 pt-8">
              {/* Mobile-only compact info */}
              <div className="flex sm:hidden items-center justify-center">
                <div className="text-xs text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800
                  px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-700">
                  Page {currentPage} of {totalPages} • {filteredPosts.length} posts
                </div>
              </div>

              {/* Pagination Controls */}
              <div className="flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  className="bg-white dark:bg-neutral-800 rounded-xl p-3 sm:p-4 shadow-sm border border-neutral-200 dark:border-neutral-700
                    hover:shadow-md transition-shadow duration-300"
                />
              </div>
            </div>
          )}
        </>
      ) : (searchQuery || selectedTag) ? (
        <div className="text-center py-16">
          <div className="text-neutral-500 dark:text-neutral-400 mb-6">
            <svg className="w-20 h-20 mx-auto mb-6 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
              No posts found
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              We couldn't find any posts matching your criteria
            </p>
            <div className="space-y-2 text-sm">
              {selectedTag && (
                <p>Tag filter: <span className="font-medium">"{selectedTag}"</span></p>
              )}
              {searchQuery && (
                <p>Search query: <span className="font-medium">"{searchQuery}"</span></p>
              )}
            </div>
          </div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Try adjusting your search terms or removing filters to see more posts.
          </p>
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-neutral-500 dark:text-neutral-400">
            <svg className="w-20 h-20 mx-auto mb-6 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
              No blog posts yet
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Check back soon for new content!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
