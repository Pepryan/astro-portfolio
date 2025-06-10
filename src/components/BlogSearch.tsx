import { useState, useEffect, useRef } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

interface BlogSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function BlogSearch({ onSearch, placeholder = "Search posts..." }: BlogSearchProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    setQuery('');
    onSearch('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClear();
      inputRef.current?.blur();
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => clearTimeout(handler);
  }, [query, onSearch]);

  // Add keyboard shortcut (Ctrl/Cmd + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className={`relative transition-all duration-300 ease-out ${
        isFocused
          ? 'ring-2 ring-blue-500/50 shadow-lg shadow-blue-500/10'
          : 'shadow-sm hover:shadow-md'
      } rounded-xl overflow-hidden`}>
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
          <FiSearch className={`w-5 h-5 transition-all duration-300 ${
            isFocused ? 'text-blue-500 scale-110' : 'text-neutral-400'
          }`} />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full pl-12 pr-16 py-4 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm
            border border-neutral-200/50 dark:border-neutral-700/50
            text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400
            focus:outline-none focus:bg-white dark:focus:bg-neutral-800
            transition-all duration-300 text-base
            rounded-xl"
        />

        {query && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-4 flex items-center z-10
              text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300
              hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-full
              transition-all duration-200 w-10 h-10 mr-2 my-auto"
            aria-label="Clear search"
          >
            <FiX className="w-4 h-4 mx-auto" />
          </button>
        )}

        {!query && (
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <kbd className="hidden sm:inline-flex items-center px-2.5 py-1.5 text-xs font-medium
              text-neutral-500 dark:text-neutral-400 bg-neutral-100/80 dark:bg-neutral-700/80
              border border-neutral-200/50 dark:border-neutral-600/50 rounded-lg backdrop-blur-sm
              shadow-sm">
              ⌘K
            </kbd>
          </div>
        )}

        {/* Modern gradient border effect */}
        <div className={`absolute inset-0 rounded-xl transition-opacity duration-300 pointer-events-none ${
          isFocused ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 blur-sm"></div>
        </div>
      </div>

      {query && (
        <div className="absolute top-full left-0 right-0 mt-2 px-4 py-2 text-sm
          text-neutral-600 dark:text-neutral-400 bg-white/90 dark:bg-neutral-800/90
          backdrop-blur-sm rounded-lg border border-neutral-200/50 dark:border-neutral-700/50
          shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span>Searching for "<span className="font-medium text-neutral-900 dark:text-neutral-100">{query}</span>"...</span>
          </div>
        </div>
      )}
    </div>
  );
}
