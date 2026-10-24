import { useEffect, useRef, useState } from 'react';
import { FiArrowUp } from 'react-icons/fi';
import { componentConfig } from '../config/components';

interface ReadingProgressProps {
  /** Show the bar after scrolling this many pixels */
  showAfter?: number;
  /** Show a back-to-top button while the bar is visible */
  showBackToTop?: boolean;
  /** Bar height in pixels */
  height?: number;
}

/**
 * Scroll progress bar + back-to-top button.
 *
 * The bar is updated by writing `transform: scaleX()` straight to the DOM
 * inside requestAnimationFrame, so scrolling never re-renders React and only
 * touches a compositor-friendly property. React state changes only when
 * crossing the `showAfter` threshold.
 */
export default function ReadingProgress({ showAfter, showBackToTop, height }: ReadingProgressProps) {
  const config = componentConfig.readingProgress;
  const threshold = showAfter ?? config.showAfter;
  const withBackToTop = showBackToTop ?? config.showBackToTop;
  const barHeight = height ?? config.height;

  const barRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const scrollTop = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(scrollTop / max, 1) : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
      setVisible(scrollTop > threshold); // no-op re-render when unchanged
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [threshold]);

  if (!config.enabled) return null;

  return (
    <>
      <div
        className={`pointer-events-none fixed inset-x-0 top-0 z-[60] transition-opacity duration-200 ${visible ? 'opacity-100' : 'opacity-0'}`}
        style={{ height: barHeight }}
        aria-hidden="true"
      >
        <div
          ref={barRef}
          className="h-full origin-left bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>

      {withBackToTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0 })}
          className={`fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-neutral-200
            bg-white text-neutral-600 shadow-lg transition-all duration-200 hover:text-blue-600 dark:border-neutral-700
            dark:bg-neutral-800 dark:text-neutral-400 dark:hover:text-blue-400
            ${visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}`}
          aria-label="Back to top"
          title="Back to top"
          tabIndex={visible ? 0 : -1}
        >
          <FiArrowUp className="h-5 w-5" />
        </button>
      )}
    </>
  );
}
