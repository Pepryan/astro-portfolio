import { useState, useEffect, useRef } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

interface BlogSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  /** Initial value, e.g. from the ?search= URL parameter */
  initialQuery?: string;
  autoFocus?: boolean;
}

export default function BlogSearch({
  onSearch,
  placeholder = 'Search posts...',
  initialQuery = '',
  autoFocus = false,
}: BlogSearchProps) {
  const [query, setQuery] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keep in sync when the parent resets filters
  useEffect(() => setQuery(initialQuery), [initialQuery]);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  // Debounce filtering while typing
  useEffect(() => {
    const handler = setTimeout(() => onSearch(query), 250);
    return () => clearTimeout(handler);
  }, [query, onSearch]);

  const clear = () => {
    setQuery('');
    onSearch('');
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full">
      <label htmlFor="blog-search" className="sr-only">
        Search posts
      </label>
      <FiSearch
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
        aria-hidden="true"
      />
      <input
        ref={inputRef}
        type="search"
        id="blog-search"
        name="search"
        data-search-trigger
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            query ? clear() : inputRef.current?.blur();
          }
        }}
        placeholder={placeholder}
        autoComplete="off"
        className="peer w-full rounded-xl border border-neutral-200 bg-white py-3 pl-10 pr-12 text-sm text-neutral-900
          shadow-sm transition-colors placeholder:text-neutral-500 hover:border-neutral-300
          focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30
          dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder:text-neutral-400
          dark:hover:border-neutral-600 [&::-webkit-search-cancel-button]:hidden"
      />

      {query ? (
        <button
          type="button"
          onClick={clear}
          className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full
            text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-700
            dark:hover:bg-neutral-700 dark:hover:text-neutral-200"
          aria-label="Clear search"
        >
          <FiX className="h-4 w-4" />
        </button>
      ) : (
        <kbd
          className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border border-neutral-300
            bg-white px-1.5 py-0.5 text-[10px] font-semibold text-neutral-500 peer-focus:hidden
            dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-300 sm:inline-block"
          aria-hidden="true"
        >
          /
        </kbd>
      )}
    </div>
  );
}
