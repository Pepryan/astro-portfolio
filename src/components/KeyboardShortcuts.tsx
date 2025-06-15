import { useEffect } from 'react';

interface KeyboardShortcutsProps {
  onToggleShortcuts?: () => void;
}

export default function KeyboardShortcuts({ onToggleShortcuts }: KeyboardShortcutsProps) {
  const toggleDarkMode = () => {
    const isDark = document.documentElement.classList.contains('dark');
    const newMode = !isDark;

    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    try {
      localStorage.setItem('darkMode', String(newMode));

      // Trigger custom event to notify other components
      window.dispatchEvent(new CustomEvent('themeChanged', { detail: { darkMode: newMode } }));
    } catch (error) {
      // Silent error handling
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ignore if meta or control key is pressed (browser shortcuts)
      if (e.metaKey || e.ctrlKey) return;
      
      // Only trigger if no input/textarea is focused
      if (['input', 'textarea'].includes((e.target as HTMLElement)?.tagName?.toLowerCase())) {
        return;
      }

      // Get current page context
      const pathname = window.location.pathname;
      const isBlogList = pathname === '/blog' || pathname === '/blog/';
      const isBlogPost = pathname.startsWith('/blog/') && pathname !== '/blog' && pathname !== '/blog/';

      switch(e.key) {
        case 'h':
          e.preventDefault(); // Prevent browser's history
          window.location.href = '/';
          break;
        case 'b':
          e.preventDefault();
          window.location.href = '/blog';
          break;
        case 't':
          e.preventDefault();
          // console.log('Keyboard shortcut "t" pressed, calling toggleDarkMode');
          toggleDarkMode();
          break;
        case 'k':
          if (isBlogList) {
            e.preventDefault();
            const searchButton = document.querySelector('[data-search-trigger]') as HTMLElement;
            if (searchButton) {
              searchButton.click();
            }
          }
          break;
        case 'ArrowLeft':
          if (isBlogPost) {
            e.preventDefault();
            const prevButton = document.querySelector('[data-prev-post]') as HTMLAnchorElement;
            if (prevButton && prevButton.href) {
              window.location.href = prevButton.href;
            }
          }
          break;
        case 'ArrowRight':
          if (isBlogPost) {
            e.preventDefault();
            const nextButton = document.querySelector('[data-next-post]') as HTMLAnchorElement;
            if (nextButton && nextButton.href) {
              window.location.href = nextButton.href;
            }
          }
          break;
        case '?':
          e.preventDefault();
          if (onToggleShortcuts) onToggleShortcuts();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onToggleShortcuts]);

  return null;
}
