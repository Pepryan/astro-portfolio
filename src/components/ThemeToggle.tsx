import { FiSun, FiMoon } from 'react-icons/fi';
import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Initialize theme state after component mounts
  useEffect(() => {
    setMounted(true);

    // Get initial theme state from DOM
    const initialDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(initialDark);

    // Listen for theme changes from other sources (keyboard shortcuts, etc.)
    const handleThemeChange = () => {
      const currentDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(currentDark);
    };

    // Listen for DOM class changes
    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    // Listen for custom theme change events
    window.addEventListener('themeChanged', handleThemeChange);

    return () => {
      observer.disconnect();
      window.removeEventListener('themeChanged', handleThemeChange);
    };
  }, []);

  // Define functions after hooks but before conditional returns
  const handleToggle = () => {
    // console.log('ThemeToggle clicked');

    // Get current state from DOM (most reliable source)
    const currentDark = document.documentElement.classList.contains('dark');
    const newMode = !currentDark;

    // console.log('Current dark mode:', currentDark, '-> New mode:', newMode);

    // Update DOM immediately
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Update local state
    setIsDarkMode(newMode);

    // Save to localStorage
    try {
      localStorage.setItem('darkMode', String(newMode));
    } catch (error) {
      // Silent error handling
    }

    // Trigger custom event for Giscus and other components
    window.dispatchEvent(new CustomEvent('themeChanged', {
      detail: { darkMode: newMode }
    }));
  };

  // Instead of conditional return, render conditionally
  if (!mounted) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-neutral-300 dark:bg-neutral-600 rounded animate-pulse" />
        <div className="w-14 h-7 bg-neutral-300 dark:bg-neutral-600 rounded-full animate-pulse" />
        <div className="w-4 h-4 bg-neutral-300 dark:bg-neutral-600 rounded animate-pulse" />
      </div>
    );
  }

  return (
    <div className="flex items-center">
      {/* Enhanced Toggle Switch */}
      <button
        onClick={handleToggle}
        className={`relative inline-flex h-8 w-16 items-center rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-900 shadow-lg border-2 ${
          isDarkMode
            ? 'bg-gradient-to-r from-purple-600 to-blue-600 border-purple-500 focus:ring-purple-500'
            : 'bg-gradient-to-r from-orange-400 to-yellow-400 border-orange-300 focus:ring-orange-500'
        }`}
        role="switch"
        aria-checked={isDarkMode}
        aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      >
        {/* Background Icons */}
        <div className="absolute inset-0 flex items-center justify-between px-2">
          <FiSun
            className={`w-3 h-3 transition-all duration-300 ${
              !isDarkMode
                ? 'text-white opacity-100 scale-110'
                : 'text-white/50 opacity-60 scale-90'
            }`}
          />
          <FiMoon
            className={`w-3 h-3 transition-all duration-300 ${
              isDarkMode
                ? 'text-white opacity-100 scale-110'
                : 'text-white/50 opacity-60 scale-90'
            }`}
          />
        </div>

        {/* Moving Circle */}
        <span
          className={`relative inline-block h-6 w-6 transform rounded-full bg-white shadow-xl transition-all duration-300 ease-in-out flex items-center justify-center ${
            isDarkMode ? 'translate-x-8' : 'translate-x-1'
          }`}
        >
          {/* Active Icon in Circle */}
          {isDarkMode ? (
            <FiMoon className="w-3 h-3 text-purple-600" />
          ) : (
            <FiSun className="w-3 h-3 text-orange-500" />
          )}
        </span>
      </button>
    </div>
  );
}
