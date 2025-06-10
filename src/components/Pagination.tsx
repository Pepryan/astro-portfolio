import { FiChevronLeft, FiChevronRight, FiMoreHorizontal } from 'react-icons/fi';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  maxVisiblePages?: number;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  maxVisiblePages = 7,
  className = ''
}: PaginationProps) {
  if (totalPages <= 1) return null;

  // Calculate which page numbers to show
  const getVisiblePages = () => {
    const pages: (number | 'ellipsis')[] = [];
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      const startPage = Math.max(2, currentPage - Math.floor((maxVisiblePages - 3) / 2));
      const endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 4);
      
      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pages.push('ellipsis');
      }
      
      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pages.push('ellipsis');
      }
      
      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const visiblePages = getVisiblePages();

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
      // No auto scroll - preserve user's scroll position
    }
  };

  const buttonBaseClass = `
    relative inline-flex items-center justify-center min-w-[44px] h-11 px-3 py-2
    text-sm font-medium transition-all duration-200 ease-out
    border border-neutral-200 dark:border-neutral-700
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
    dark:focus:ring-offset-neutral-900
  `;

  const pageButtonClass = `
    ${buttonBaseClass}
    bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300
    hover:bg-neutral-50 dark:hover:bg-neutral-700 hover:border-neutral-300
    dark:hover:border-neutral-600 hover:text-neutral-900 dark:hover:text-neutral-100
    hover:scale-105 hover:shadow-sm transform transition-all duration-200
  `;

  const activePageClass = `
    ${buttonBaseClass}
    bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/25
    hover:bg-blue-700 hover:border-blue-700 hover:shadow-blue-700/25
    scale-105 ring-2 ring-blue-500/20 transform
  `;

  const navButtonClass = `
    ${buttonBaseClass}
    bg-white dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400
    hover:bg-neutral-50 dark:hover:bg-neutral-700 hover:border-neutral-300
    dark:hover:border-neutral-600 hover:text-neutral-700 dark:hover:text-neutral-300
    hover:scale-105 hover:shadow-sm transform transition-all duration-200
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white
    dark:disabled:hover:bg-neutral-800 disabled:hover:border-neutral-200
    dark:disabled:hover:border-neutral-700 disabled:hover:scale-100 disabled:hover:shadow-none
  `;

  return (
    <nav 
      className={`flex items-center justify-center space-x-1 ${className}`}
      aria-label="Pagination Navigation"
      role="navigation"
    >
      {/* Previous button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${navButtonClass} rounded-l-lg group`}
        aria-label="Go to previous page"
      >
        <FiChevronLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
        <span className="hidden sm:inline ml-1 transition-all duration-200">Previous</span>
      </button>

      {/* First page button (if not using showFirstLast) */}
      {showFirstLast && currentPage > 3 && totalPages > maxVisiblePages && (
        <>
          <button
            onClick={() => handlePageChange(1)}
            className={pageButtonClass}
            aria-label="Go to page 1"
          >
            1
          </button>
          {currentPage > 4 && (
            <span className="flex items-center justify-center min-w-[44px] h-11 text-neutral-400 dark:text-neutral-500">
              <FiMoreHorizontal className="w-4 h-4" />
            </span>
          )}
        </>
      )}

      {/* Page numbers */}
      {visiblePages.map((page, index) => {
        if (page === 'ellipsis') {
          return (
            <span
              key={`ellipsis-${index}`}
              className="flex items-center justify-center min-w-[44px] h-11 text-neutral-400 dark:text-neutral-500"
              aria-hidden="true"
            >
              <FiMoreHorizontal className="w-4 h-4" />
            </span>
          );
        }

        return (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={page === currentPage ? activePageClass : pageButtonClass}
            aria-label={`Go to page ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        );
      })}

      {/* Last page button (if not using showFirstLast) */}
      {showFirstLast && currentPage < totalPages - 2 && totalPages > maxVisiblePages && (
        <>
          {currentPage < totalPages - 3 && (
            <span className="flex items-center justify-center min-w-[44px] h-11 text-neutral-400 dark:text-neutral-500">
              <FiMoreHorizontal className="w-4 h-4" />
            </span>
          )}
          <button
            onClick={() => handlePageChange(totalPages)}
            className={pageButtonClass}
            aria-label={`Go to page ${totalPages}`}
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${navButtonClass} rounded-r-lg group`}
        aria-label="Go to next page"
      >
        <span className="hidden sm:inline mr-1 transition-all duration-200">Next</span>
        <FiChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      </button>
    </nav>
  );
}
