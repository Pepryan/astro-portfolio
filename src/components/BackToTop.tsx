import { useState, useEffect } from 'react';
import { FiArrowUp } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface BackToTopProps {
  showAfter?: number; // Show button after scrolling this many pixels
  showProgress?: boolean; // Show reading progress indicator
}

export default function BackToTop({ showAfter = 300, showProgress = true }: BackToTopProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;

      setScrollProgress(Math.min(progress, 100));
      setIsVisible(scrollTop > showAfter);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showAfter]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed bottom-8 right-8 z-50"
          style={{ position: 'fixed', willChange: 'transform' }} /* Add willChange property */
        >
          <button
            onClick={scrollToTop}
            className="relative group flex items-center justify-center w-12 h-12
              bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700
              border border-neutral-200 dark:border-neutral-700 rounded-full
              shadow-lg hover:shadow-xl transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Back to top"
          >
            {/* Progress ring */}
            {showProgress && (
              <svg
                className="absolute inset-0 w-12 h-12 transform -rotate-90"
                viewBox="0 0 48 48"
              >
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-neutral-200 dark:text-neutral-700"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="text-blue-500 transition-all duration-300"
                  style={{
                    strokeDasharray: `${2 * Math.PI * 20}`,
                    strokeDashoffset: `${2 * Math.PI * 20 * (1 - scrollProgress / 100)}`,
                  }}
                />
              </svg>
            )}

            {/* Arrow icon */}
            <FiArrowUp className="w-5 h-5 text-neutral-600 dark:text-neutral-400 
              group-hover:text-blue-500 transition-colors relative z-10" />

            {/* Tooltip */}
            <span className="absolute bottom-full right-0 mb-2 px-2 py-1
              bg-neutral-800 dark:bg-neutral-700 text-white text-xs rounded
              opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Back to top {showProgress && `(${Math.round(scrollProgress)}%)`}
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
