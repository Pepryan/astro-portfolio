import { createContext, useContext, useState, useEffect, useMemo, type ReactNode } from 'react';

interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  mounted?: boolean;
}

export const ThemeContext = createContext<ThemeContextType>({
  darkMode: false,
  toggleDarkMode: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

// Helper function to get initial theme state
function getInitialTheme(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    // Check localStorage first
    const stored = localStorage.getItem('darkMode');
    if (stored !== null) {
      return stored === 'true';
    }

    // Fallback to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  } catch (error) {
    console.warn('Error accessing localStorage or matchMedia:', error);
    return false;
  }
}

// Helper function to apply theme to DOM
function applyTheme(isDark: boolean): void {
  if (typeof document === 'undefined') return;

  try {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (error) {
    console.warn('Error applying theme to DOM:', error);
  }
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  // Initialize with false to prevent hydration mismatch
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    console.log('ThemeProvider mounting...'); // Debug log
    setMounted(true);

    // Get the actual theme state
    const initialTheme = getInitialTheme();
    const domHasDark = document.documentElement.classList.contains('dark');

    console.log('Initial theme from storage:', initialTheme);
    console.log('DOM has dark class:', domHasDark);

    // Sync React state with DOM state
    setDarkMode(domHasDark);

    // If DOM and stored preference don't match, fix it
    if (initialTheme !== domHasDark) {
      console.log('Syncing theme - applying:', initialTheme);
      applyTheme(initialTheme);
      setDarkMode(initialTheme);
    }
  }, []);

  const toggleDarkMode = () => {
    console.log('toggleDarkMode called, current darkMode:', darkMode); // Debug log
    const newMode = !darkMode;
    console.log('Toggling theme from', darkMode, 'to', newMode); // Debug log

    setDarkMode(newMode);
    applyTheme(newMode);

    // Save to localStorage
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('darkMode', String(newMode));
        console.log('Saved to localStorage:', newMode);
      }
    } catch (error) {
      console.warn('Error saving theme preference:', error);
    }
  };

  const value = useMemo(() => ({
    darkMode,
    toggleDarkMode,
    mounted // Export mounted state for debugging
  }), [darkMode, mounted]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
