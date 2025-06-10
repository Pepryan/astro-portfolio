import { useState, useEffect, useCallback } from 'react';

interface UsePaginationProps {
  totalItems: number;
  itemsPerPage: number;
  initialPage?: number;
  onPageChange?: (page: number) => void;
}

interface UsePaginationReturn {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  goToPage: (page: number) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  goToFirstPage: () => void;
  goToLastPage: () => void;
  getPageItems: <T>(items: T[]) => T[];
}

export function usePagination({
  totalItems,
  itemsPerPage,
  initialPage = 1,
  onPageChange
}: UsePaginationProps): UsePaginationReturn {
  const [currentPage, setCurrentPage] = useState(initialPage);

  // Calculate derived values
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;

  // Ensure current page is valid when totalItems changes
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(Math.max(1, totalPages));
    }
  }, [totalPages, currentPage]);

  // Page navigation functions
  const goToPage = useCallback((page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    if (validPage !== currentPage) {
      setCurrentPage(validPage);
      onPageChange?.(validPage);
    }
  }, [currentPage, totalPages, onPageChange]);

  const goToNextPage = useCallback(() => {
    if (hasNextPage) {
      goToPage(currentPage + 1);
    }
  }, [currentPage, hasNextPage, goToPage]);

  const goToPreviousPage = useCallback(() => {
    if (hasPreviousPage) {
      goToPage(currentPage - 1);
    }
  }, [currentPage, hasPreviousPage, goToPage]);

  const goToFirstPage = useCallback(() => {
    goToPage(1);
  }, [goToPage]);

  const goToLastPage = useCallback(() => {
    goToPage(totalPages);
  }, [goToPage, totalPages]);

  // Helper function to get current page items
  const getPageItems = useCallback(<T>(items: T[]): T[] => {
    return items.slice(startIndex, endIndex);
  }, [startIndex, endIndex]);

  return {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    hasNextPage,
    hasPreviousPage,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    goToFirstPage,
    goToLastPage,
    getPageItems
  };
}
