import { useEffect, useState } from 'react';
import { FiCommand, FiX } from 'react-icons/fi';
import { toggleDarkMode } from '../lib/theme';
import { openSearch as openSearchDialog } from '../lib/search';

const SHORTCUTS = [
  { key: 'h', description: 'Go to Home' },
  { key: 'b', description: 'Go to Blog' },
  { key: 't', description: 'Toggle theme' },
  { key: 'Ctrl/⌘ K', description: 'Search all articles' },
  { key: '/', description: 'Search / filter posts' },
  { key: '←', description: 'Previous post' },
  { key: '→', description: 'Next post' },
  { key: '?', description: 'Show/hide shortcuts' },
];

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName);
}

function linkHref(selector: string): string | undefined {
  return document.querySelector<HTMLAnchorElement>(selector)?.href || undefined;
}

function openSearch() {
  const trigger = document.querySelector<HTMLElement>('[data-search-trigger]');
  if (trigger) {
    trigger.focus();
    trigger.click();
  } else {
    openSearchDialog();
  }
}

/**
 * Global keyboard shortcuts plus the "?" help dialog.
 * Mounted once per page from src/layouts/Layout.astro.
 */
export default function KeyboardShortcuts() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || isTypingTarget(e.target)) return;

      if (e.key === 'Escape') {
        setOpen(false);
        return;
      }

      // Arrow keys only navigate on post pages; elsewhere they keep scrolling.
      const prevHref = e.key === 'ArrowLeft' ? linkHref('[data-prev-post]') : undefined;
      const nextHref = e.key === 'ArrowRight' ? linkHref('[data-next-post]') : undefined;

      const actions: Record<string, (() => void) | undefined> = {
        h: () => (window.location.href = '/'),
        b: () => (window.location.href = '/blog'),
        t: toggleDarkMode,
        k: openSearch,
        '/': openSearch,
        ArrowLeft: prevHref ? () => (window.location.href = prevHref) : undefined,
        ArrowRight: nextHref ? () => (window.location.href = nextHref) : undefined,
        '?': () => setOpen((prev) => !prev),
      };

      const action = actions[e.key];
      if (action) {
        e.preventDefault();
        action();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="shortcuts-title"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-neutral-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 id="shortcuts-title" className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                Keyboard Shortcuts
              </h2>
              <button
                type="button"
                autoFocus
                onClick={() => setOpen(false)}
                className="rounded-full p-1 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                aria-label="Close"
              >
                <FiX className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
              </button>
            </div>
            <dl className="space-y-3">
              {SHORTCUTS.map(({ key, description }) => (
                <div key={key} className="flex items-center justify-between">
                  <dt className="text-neutral-700 dark:text-neutral-300">{description}</dt>
                  <dd>
                    <kbd className="rounded-md border border-neutral-200 bg-neutral-100 px-2.5 py-1.5 text-sm font-medium text-neutral-700 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-300">
                      {key}
                    </kbd>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      )}

      {/* Only on large screens: keyboard users, and avoids clashing with the mobile TOC button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-6 z-40 hidden rounded-full border border-neutral-200 bg-white/90 p-2.5 shadow-lg
          transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800/90
          dark:hover:bg-neutral-700 lg:block"
        aria-label="Keyboard shortcuts"
        title="Keyboard shortcuts (?)"
      >
        <FiCommand className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
      </button>
    </>
  );
}
