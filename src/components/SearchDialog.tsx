import { useCallback, useEffect, useRef, useState } from 'react';
import { FiCornerDownLeft, FiFileText, FiSearch, FiX } from 'react-icons/fi';
import { OPEN_SEARCH_EVENT } from '../lib/search';

interface PagefindResultData {
  url: string;
  excerpt: string;
  meta: { title?: string; image?: string };
}

interface PagefindApi {
  init: () => Promise<void>;
  debouncedSearch: (
    query: string,
    options?: object,
    debounceMs?: number
  ) => Promise<{ results: { id: string; data: () => Promise<PagefindResultData> }[] } | null>;
}

type Status = 'idle' | 'loading' | 'ready' | 'unavailable';

// The index is generated after `astro build` (see package.json), so it does not exist in `astro dev`.
const PAGEFIND_URL = '/pagefind/pagefind.js';

/**
 * Full-text search over all articles, powered by a static Pagefind index.
 * Open with Ctrl/Cmd+K anywhere, or by dispatching OPEN_SEARCH_EVENT.
 */
export default function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<PagefindResultData[]>([]);
  const [status, setStatus] = useState<Status>('idle');
  const [active, setActive] = useState(0);
  const pagefindRef = useRef<PagefindApi | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery('');
    setResults([]);
  }, []);

  // Global open triggers
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener(OPEN_SEARCH_EVENT, onOpen);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener(OPEN_SEARCH_EVENT, onOpen);
    };
  }, []);

  // Lazy-load the index the first time the dialog opens
  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    document.documentElement.style.overflow = 'hidden';
    if (status === 'idle') {
      setStatus('loading');
      import(/* @vite-ignore */ PAGEFIND_URL)
        .then(async (pagefind: PagefindApi) => {
          await pagefind.init();
          pagefindRef.current = pagefind;
          setStatus('ready');
        })
        .catch(() => setStatus('unavailable'));
    }
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [open, status]);

  // Run the search
  useEffect(() => {
    const pagefind = pagefindRef.current;
    if (!pagefind || status !== 'ready') return;
    if (!query.trim()) {
      setResults([]);
      return;
    }
    let cancelled = false;
    pagefind.debouncedSearch(query, {}, 150).then(async (search) => {
      if (!search || cancelled) return; // superseded by a newer query
      const data = await Promise.all(search.results.slice(0, 8).map((result) => result.data()));
      if (!cancelled) {
        setResults(data);
        setActive(0);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [query, status]);

  // Keep the highlighted result in view
  useEffect(() => {
    listRef.current?.children[active]?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  if (!open) return null;

  const onInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      close();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && results[active]) {
      window.location.href = results[active].url;
    }
  };

  return (
    <div
      className="fixed inset-0 z-[80] flex items-start justify-center bg-black/50 p-4 pt-[12vh]"
      onClick={close}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search articles"
        className="flex max-h-[70vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl
          dark:border-neutral-700 dark:bg-neutral-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-neutral-200 px-4 dark:border-neutral-800">
          <FiSearch className="h-5 w-5 shrink-0 text-neutral-400" aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKeyDown}
            placeholder="Search all articles…"
            aria-label="Search all articles"
            aria-controls="search-results"
            aria-activedescendant={results[active] ? `search-result-${active}` : undefined}
            className="h-14 w-full bg-transparent text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0
              dark:text-neutral-100 [&::-webkit-search-cancel-button]:hidden"
          />
          <button
            type="button"
            onClick={close}
            className="rounded-md p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
            aria-label="Close search"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto">
          {status === 'unavailable' && (
            <p className="p-6 text-sm text-neutral-500">
              Search index not found. It is generated by <code>npm run build</code> — use <code>npm run preview</code> to try it locally.
            </p>
          )}
          {status === 'loading' && <p className="p-6 text-sm text-neutral-500">Loading search…</p>}
          {status === 'ready' && query.trim() && results.length === 0 && (
            <p className="p-6 text-sm text-neutral-500">No results for “{query}”.</p>
          )}

          {results.length > 0 && (
            <ul id="search-results" ref={listRef} role="listbox" className="p-2">
              {results.map((result, i) => (
                <li key={result.url} id={`search-result-${i}`} role="option" aria-selected={i === active}>
                  <a
                    href={result.url}
                    onMouseEnter={() => setActive(i)}
                    className={`flex gap-3 rounded-xl p-3 transition-colors ${
                      i === active ? 'bg-neutral-100 dark:bg-neutral-800' : ''
                    }`}
                  >
                    <FiFileText className="mt-1 h-4 w-4 shrink-0 text-neutral-400" aria-hidden="true" />
                    <span className="min-w-0">
                      <span className="block truncate font-medium text-neutral-900 dark:text-neutral-100">
                        {result.meta.title ?? result.url}
                      </span>
                      <span
                        className="mt-1 line-clamp-2 block text-sm text-neutral-600 dark:text-neutral-400 [&_mark]:bg-yellow-200 [&_mark]:text-neutral-900 dark:[&_mark]:bg-yellow-500/30 dark:[&_mark]:text-yellow-100"
                        // Pagefind excerpts are escaped text with <mark> highlights
                        dangerouslySetInnerHTML={{ __html: result.excerpt }}
                      />
                    </span>
                    {i === active && <FiCornerDownLeft className="ml-auto mt-1 h-4 w-4 shrink-0 text-neutral-400" aria-hidden="true" />}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex items-center gap-4 border-t border-neutral-200 px-4 py-2 text-xs text-neutral-500 dark:border-neutral-800">
          <span><kbd className="font-sans">↑↓</kbd> navigate</span>
          <span><kbd className="font-sans">↵</kbd> open</span>
          <span><kbd className="font-sans">esc</kbd> close</span>
          <span className="ml-auto">Powered by Pagefind</span>
        </div>
      </div>
    </div>
  );
}
