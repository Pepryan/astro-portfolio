import { useTheme } from './ThemeProvider';
import KeyboardShortcuts from './KeyboardShortcuts';
import { useState, type ReactNode } from 'react';
import { FiCommand, FiX } from 'react-icons/fi';

interface LayoutWrapperProps {
  children: ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const { darkMode } = useTheme();
  const [showShortcuts, setShowShortcuts] = useState(false);

  const shortcuts = [
    { key: 'h', description: 'Go to Home' },
    { key: 'b', description: 'Go to Blog' },
    { key: 't', description: 'Toggle theme' },
    { key: 'k', description: 'Open search' },
    { key: '←', description: 'Previous post' },
    { key: '→', description: 'Next post' },
    { key: '?', description: 'Show/hide shortcuts' }
  ];

  return (
    <div className="relative">
      <KeyboardShortcuts onToggleShortcuts={() => setShowShortcuts(prev => !prev)} />
      
      {/* Shortcuts Help Modal */}
      {showShortcuts && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-neutral-800 rounded-xl max-w-md w-full p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                Keyboard Shortcuts
              </h2>
              <button
                onClick={() => setShowShortcuts(false)}
                className="p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700"
              >
                <FiX className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
              </button>
            </div>
            
            <div className="space-y-3">
              {shortcuts.map(({ key, description }) => (
                <div key={key} className="flex justify-between items-center">
                  <span className="text-neutral-700 dark:text-neutral-300">
                    {description}
                  </span>
                  <kbd className="px-2.5 py-1.5 text-sm font-medium text-neutral-700 dark:text-neutral-300 
                    bg-neutral-100 dark:bg-neutral-700 rounded-md border border-neutral-200 
                    dark:border-neutral-600">
                    {key}
                  </kbd>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Shortcuts Button - di kiri bawah */}
      <button
        onClick={() => setShowShortcuts(true)}
        className="hidden sm:block fixed bottom-6 left-6 p-2.5 rounded-full 
          bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm
          shadow-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 
          transition-colors border border-neutral-200 dark:border-neutral-700 
          z-40"
        aria-label="Keyboard shortcuts"
      >
        <FiCommand className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
      </button>

      {children}
    </div>
  );
}
