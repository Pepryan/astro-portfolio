import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';
import { componentConfig } from '../config/components';

interface ReadingProgressProps {
  showAfter?: number; // Show progress bar after scrolling this many pixels
  showBackToTop?: boolean; // Show back to top button when progress is visible
  height?: number; // Height of the progress bar in pixels
  className?: string; // Additional CSS classes
  gradient?: string; // Custom gradient classes
}

export default function ReadingProgress({
  showAfter,
  showBackToTop,
  height,
  className = '',
  gradient
}: ReadingProgressProps) {
  const config = componentConfig.readingProgress;

  // Use props or fall back to config defaults
  const finalShowAfter = showAfter ?? config.showAfter;
  const finalShowBackToTop = showBackToTop ?? config.showBackToTop;
  const finalHeight = height ?? config.height;
  const finalGradient = gradient ?? config.gradient;
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

          setScrollProgress(Math.min(Math.max(progress, 0), 100));
          setIsVisible(scrollTop > finalShowAfter);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial calculation
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [finalShowAfter]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Don't render if disabled in config or on server to prevent hydration mismatch
  if (!config.enabled || !mounted) {
    return null;
  }

  return (
    <>
      {/* Fixed Progress Bar at Top */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={`fixed top-0 left-0 right-0 z-[60] ${className}`}
            style={{
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              perspective: 1000,
            }}
          >
            {/* Progress bar container - minimal design without background track */}
            <div className="relative w-full overflow-hidden" style={{ height: `${finalHeight}px` }}>
              {/* Progress fill with enhanced gradient - no background track */}
              <motion.div
                className={`absolute top-0 left-0 h-full bg-gradient-to-r ${finalGradient} overflow-hidden`}
                style={{
                  width: `${scrollProgress}%`,
                  boxShadow: '0 0 20px rgba(99, 102, 241, 0.4), 0 0 40px rgba(147, 51, 234, 0.2)',
                  background: `linear-gradient(90deg,
                    rgb(37, 99, 235) 0%,
                    rgb(79, 70, 229) 25%,
                    rgb(99, 102, 241) 50%,
                    rgb(129, 140, 248) 75%,
                    rgb(147, 51, 234) 100%
                  )`,
                  willChange: 'width',
                  backfaceVisibility: 'hidden',
                  transform: 'translateZ(0)', // Force hardware acceleration
                }}
                initial={{ width: 0 }}
                animate={{ width: `${scrollProgress}%` }}
                transition={{
                  duration: 0.1,
                  ease: 'linear',
                  type: 'tween'
                }}
              >
                {/* Enhanced shimmer effect constrained within progress fill */}
                {config.animation.shimmer && scrollProgress > 5 && scrollProgress < 100 && (
                  <motion.div
                    className="absolute top-0 left-0 h-full w-32 opacity-60"
                    style={{
                      background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)',
                      willChange: 'transform',
                      backfaceVisibility: 'hidden',
                      transform: 'translateZ(0)',
                    }}
                    animate={{
                      x: [-128, `calc(100% + 32px)`],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: 'linear',
                      repeatDelay: 4,
                      type: 'tween',
                    }}
                  />
                )}
              </motion.div>

              {/* Subtle glow effect at the end of progress */}
              {scrollProgress > 5 && (
                <motion.div
                  className="absolute top-0 h-full w-8 opacity-80"
                  style={{
                    left: `${Math.max(0, scrollProgress - 2)}%`,
                    background: 'linear-gradient(90deg, transparent 0%, rgba(147, 51, 234, 0.8) 100%)',
                    filter: 'blur(2px)',
                    willChange: 'left, opacity',
                    backfaceVisibility: 'hidden',
                    transform: 'translateZ(0)',
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8 }}
                  transition={{
                    duration: 0.2,
                    ease: 'linear',
                    type: 'tween'
                  }}
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to Top Button - positioned at bottom right corner */}
      <AnimatePresence>
        {isVisible && finalShowBackToTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed bottom-8 right-8 z-50"
            style={{
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              perspective: 1000,
            }}
          >
            <motion.button
              onClick={scrollToTop}
              className="group flex items-center justify-center w-12 h-12 bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Back to top"
              title="Back to top"
            >
              {/* Arrow icon */}
              <FiArrowUp className="w-5 h-5 text-neutral-600 dark:text-neutral-400 group-hover:text-blue-500 transition-colors" />

              {/* Simple tooltip without percentage */}
              <span className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-neutral-800 dark:bg-neutral-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Back to top
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
