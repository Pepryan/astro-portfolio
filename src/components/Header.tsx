import { FiHome, FiSearch, FiArchive, FiX, FiUser, FiFolder } from 'react-icons/fi';
import { useState, useEffect, useRef } from 'react';
import ThemeToggle from './ThemeToggle';
import { componentConfig } from '../config/components';

const { pages } = componentConfig;

interface HeaderProps {
  showSearch?: boolean;
  onSearch?: (query: string) => void;
}

export default function Header({ showSearch = false, onSearch }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle click outside to close search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus input when search opens
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K to open search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k' && showSearch) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      // ESC to close search
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setSearchQuery('');
        onSearch?.('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showSearch, onSearch]);

  // Handle search input changes with debouncing
  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch?.(searchQuery);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchQuery, onSearch]);

  const handleClearSearch = () => {
    setSearchQuery('');
    onSearch?.('');
    setIsSearchOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <a
            href="/"
            className="font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 
              dark:hover:text-neutral-200 transition-colors flex items-center gap-2"
          >
            <FiHome className="w-5 h-5" />
            <span className="font-bold hidden sm:inline">FR</span>
          </a>

          <nav className="flex items-center gap-1">
            {/* Search functionality */}
            {showSearch && (
              <div ref={searchRef} className="relative">
                {!isSearchOpen ? (
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    data-search-trigger
                    className="p-2 text-neutral-600 hover:text-neutral-900 dark:text-neutral-400
                      dark:hover:text-neutral-200 transition-colors group"
                    aria-label="Search (⌘K)"
                    title="Search (⌘K)"
                  >
                    <FiSearch className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="flex items-center bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm
                    rounded-xl border border-neutral-200/50 dark:border-neutral-700/50 shadow-lg
                    min-w-0 max-w-[280px] sm:max-w-[320px]">
                    <div className="flex items-center px-3 flex-shrink-0">
                      <FiSearch className="w-4 h-4 text-neutral-400" />
                    </div>
                    <input
                      ref={inputRef}
                      type="text"
                      value={searchQuery}
                      placeholder="Search posts..."
                      className="px-2 py-3 bg-transparent text-sm text-neutral-900 dark:text-neutral-100
                        placeholder-neutral-500 dark:placeholder-neutral-400 border-none outline-none
                        flex-1 min-w-0 w-full"
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Escape') {
                          handleClearSearch();
                        }
                      }}
                    />
                    {searchQuery && (
                      <button
                        onClick={handleClearSearch}
                        className="p-2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300
                          transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-full
                          flex-shrink-0"
                        aria-label="Clear search"
                      >
                        <FiX className="w-3 h-3" />
                      </button>
                    )}
                    <div className="px-2 py-1 text-xs text-neutral-400 border-l border-neutral-200/50
                      dark:border-neutral-700/50 flex-shrink-0 hidden sm:block">
                      ESC
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Navigation Links */}
            {pages.about.enabled && pages.about.showInNavigation && (
              <a
                href="/about"
                className="px-3 py-2 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400
                  dark:hover:text-neutral-200 transition-colors hidden sm:inline-flex items-center gap-1"
                title="About Me"
              >
                <FiUser className="w-4 h-4" />
                <span>About</span>
              </a>
            )}

            {pages.projects.enabled && pages.projects.showInNavigation && (
              <a
                href="/projects"
                className="px-3 py-2 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400
                  dark:hover:text-neutral-200 transition-colors hidden sm:inline-flex items-center gap-1"
                title="My Projects"
              >
                <FiFolder className="w-4 h-4" />
                <span>Projects</span>
              </a>
            )}

            <a
              href="/blog"
              className="px-3 py-2 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400
                dark:hover:text-neutral-200 transition-colors"
            >
              Blog
            </a>

            <a
              href="/archive"
              className="p-2 text-neutral-600 hover:text-neutral-900 dark:text-neutral-400
                dark:hover:text-neutral-200 transition-colors"
              aria-label="Archive"
              title="Blog Archive"
            >
              <FiArchive className="w-4 h-4" />
            </a>

            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
