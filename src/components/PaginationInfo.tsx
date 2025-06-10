interface PaginationInfoProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  itemName?: string;
  className?: string;
}

export default function PaginationInfo({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  itemName = 'items',
  className = ''
}: PaginationInfoProps) {
  if (totalItems === 0) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${className}`}>
      {/* Items range info */}
      <div className="text-sm text-neutral-600 dark:text-neutral-400">
        Showing{' '}
        <span className="font-medium text-neutral-900 dark:text-neutral-100">
          {startItem}
        </span>
        {' '}to{' '}
        <span className="font-medium text-neutral-900 dark:text-neutral-100">
          {endItem}
        </span>
        {' '}of{' '}
        <span className="font-medium text-neutral-900 dark:text-neutral-100">
          {totalItems}
        </span>
        {' '}{itemName}
      </div>

      {/* Page info */}
      <div className="text-sm text-neutral-600 dark:text-neutral-400">
        Page{' '}
        <span className="font-medium text-neutral-900 dark:text-neutral-100">
          {currentPage}
        </span>
        {' '}of{' '}
        <span className="font-medium text-neutral-900 dark:text-neutral-100">
          {totalPages}
        </span>
      </div>
    </div>
  );
}
