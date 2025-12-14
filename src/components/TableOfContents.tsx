/**
 * TableOfContents Component
 * 
 * A dynamic table of contents that extracts headings from the DOM and provides
 * navigation with active state tracking. Supports both desktop (sticky sidebar)
 * and mobile (floating button) layouts.
 * 
 * Key Features:
 * - Extracts headings from DOM after render (compatible with rehype-slug)
 * - Uses IntersectionObserver for efficient active heading detection
 * - Auto-scrolls TOC to keep active item visible
 * - Responsive: desktop sidebar vs mobile floating panel
 * 
 * @example
 * ```tsx
 * <TableOfContents content={postBody} isMobile={false} />
 * ```
 */
import { useState, useEffect, useRef } from 'react';
import { FiList, FiChevronRight, FiChevronDown, FiMenu } from 'react-icons/fi';

/** Represents a heading extracted from the page */
interface Heading {
  /** The HTML id attribute of the heading element */
  id: string;
  /** The text content of the heading (emoji-stripped) */
  text: string;
  /** Heading level (1-6) */
  level: number;
}

interface TableOfContentsProps {
  /** Raw content used to trigger heading extraction */
  content: string;
  /** Whether TOC should be expanded by default */
  defaultExpanded?: boolean;
  /** Render mobile floating button instead of sidebar */
  isMobile?: boolean;
}

export default function TableOfContents({ content, defaultExpanded = true, isMobile = false }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [isFloatingOpen, setIsFloatingOpen] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);

  // Refs for auto-scroll functionality
  const tocContainerRef = useRef<HTMLDivElement>(null);
  const mobileTocContainerRef = useRef<HTMLDivElement>(null);
  const tocItemRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  // Extract headings from DOM instead of parsing markdown content
  // This ensures we get the exact same IDs that rehype-slug generates
  useEffect(() => {
    const extractHeadingsFromDOM = () => {
      const headingElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const extractedHeadings: Heading[] = [];

      headingElements.forEach((element) => {
        const id = element.id;
        const level = parseInt(element.tagName.charAt(1));
        let text = element.textContent || '';

        // Remove emojis from display text for cleaner TOC
        text = text
          .replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '')
          .trim();

        // Skip if no ID or empty text after emoji removal
        if (!id || !text) return;

        extractedHeadings.push({ id, text, level });
      });

      setHeadings(extractedHeadings);
    };

    // Wait a bit for the DOM to be fully rendered
    const timer = setTimeout(extractHeadingsFromDOM, 100);

    return () => clearTimeout(timer);
  }, [content]);

  // Track active heading with improved intersection observer
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry that's most visible
        const visibleEntries = entries.filter(entry => entry.isIntersecting);

        if (visibleEntries.length > 0) {
          // Sort by intersection ratio and position to get the most prominent heading
          const mostVisible = visibleEntries.reduce((prev, current) => {
            if (current.intersectionRatio > prev.intersectionRatio) {
              return current;
            }
            if (current.intersectionRatio === prev.intersectionRatio) {
              // If same intersection ratio, prefer the one higher on the page
              return current.boundingClientRect.top < prev.boundingClientRect.top ? current : prev;
            }
            return prev;
          });

          setActiveId(mostVisible.target.id);
        }
      },
      {
        rootMargin: '-10% 0% -50% 0%',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    // Observe all heading elements
    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    // Set initial active heading if none is set
    if (!activeId && headings.length > 0) {
      const firstVisibleHeading = headings.find(heading => {
        const element = document.getElementById(heading.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top >= 0 && rect.top <= window.innerHeight;
        }
        return false;
      });

      if (firstVisibleHeading) {
        setActiveId(firstVisibleHeading.id);
      }
    }

    return () => observer.disconnect();
  }, [headings, activeId]);

  // Auto-scroll TOC to keep active item visible
  const scrollToActiveItem = (activeId: string, containerRef: React.RefObject<HTMLDivElement>) => {
    if (!activeId || !containerRef.current) return;

    const activeItem = tocItemRefs.current[activeId];
    if (!activeItem) return;

    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const itemRect = activeItem.getBoundingClientRect();

    // Calculate relative positions
    const itemTop = itemRect.top - containerRect.top + container.scrollTop;
    const itemBottom = itemRect.bottom - containerRect.top + container.scrollTop;
    const containerHeight = containerRect.height;
    const currentScrollTop = container.scrollTop;

    // Add padding for better visibility (responsive to container size)
    const padding = Math.min(40, containerHeight * 0.1);

    // Check if item is outside visible area
    const visibleTop = currentScrollTop + padding;
    const visibleBottom = currentScrollTop + containerHeight - padding;

    if (itemTop < visibleTop) {
      // Item is above visible area, scroll up
      setIsAutoScrolling(true);
      container.scrollTo({
        top: Math.max(0, itemTop - padding),
        behavior: 'smooth'
      });
      // Reset auto-scrolling state after animation
      setTimeout(() => setIsAutoScrolling(false), 500);
    } else if (itemBottom > visibleBottom) {
      // Item is below visible area, scroll down
      setIsAutoScrolling(true);
      const maxScroll = container.scrollHeight - containerHeight;
      container.scrollTo({
        top: Math.min(maxScroll, itemBottom - containerHeight + padding),
        behavior: 'smooth'
      });
      // Reset auto-scrolling state after animation
      setTimeout(() => setIsAutoScrolling(false), 500);
    }
  };

  // Auto-scroll when active item changes
  useEffect(() => {
    if (activeId) {
      // Add a small delay to prevent excessive scrolling during rapid changes
      const timeoutId = setTimeout(() => {
        // Auto-scroll desktop TOC
        if (!isMobile) {
          scrollToActiveItem(activeId, tocContainerRef);
        }
        // Auto-scroll mobile TOC if it's open
        if (isMobile && isFloatingOpen) {
          scrollToActiveItem(activeId, mobileTocContainerRef);
        }
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [activeId, isMobile, isFloatingOpen]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Calculate proper offset based on fixed header height + reading progress bar
      const headerOffset = 110; // Account for fixed header + reading progress bar + some padding
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      // Ensure we don't scroll past the top of the page
      const finalPosition = Math.max(0, offsetPosition);

      window.scrollTo({
        top: finalPosition,
        behavior: 'smooth'
      });
    }
  };

  if (headings.length === 0) return null;

  // Mobile floating TOC
  if (isMobile) {
    return (
      <>
        {/* Floating TOC Button - Positioned at bottom left, same height as back to top */}
        <button
          onClick={() => setIsFloatingOpen(!isFloatingOpen)}
          className="fixed left-8 bottom-8 z-50 w-12 h-12 flex items-center justify-center
            bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-full shadow-lg border border-neutral-200 dark:border-neutral-700
            text-neutral-600 dark:text-neutral-400 hover:text-blue-500 dark:hover:text-blue-400
            transition-all duration-200 hover:scale-110 active:scale-95"
          aria-label="Table of Contents"
        >
          <FiMenu className="w-5 h-5" />
        </button>

        {/* Floating TOC Panel */}
        {isFloatingOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/20 z-40"
              onClick={() => setIsFloatingOpen(false)}
            />

            {/* TOC Panel */}
            <div className="fixed left-8 bottom-24 z-50 w-72 max-h-96
              bg-white dark:bg-neutral-800 rounded-lg shadow-xl border border-neutral-200 dark:border-neutral-700
              overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center gap-2">
                  <FiList className="w-4 h-4 text-blue-500" />
                  <span className="font-medium text-neutral-900 dark:text-neutral-100">
                    On this page
                  </span>
                </div>
                <button
                  onClick={() => setIsFloatingOpen(false)}
                  className="p-1 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
                >
                  <FiChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Content */}
              <div
                ref={mobileTocContainerRef}
                className={`p-4 max-h-80 overflow-y-auto transition-all duration-300 ${isAutoScrolling ? 'ring-1 ring-blue-500/20' : ''
                  }`}
              >
                <nav>
                  <div className="space-y-1">
                    {headings.map((heading, index) => (
                      <div
                        key={index}
                        style={{ paddingLeft: `${(heading.level - 1) * 0.75}rem` }}
                      >
                        <button
                          ref={(el) => {
                            tocItemRefs.current[heading.id] = el;
                          }}
                          onClick={() => {
                            scrollToHeading(heading.id);
                            setIsFloatingOpen(false);
                          }}
                          className={`
                            group flex items-center w-full text-left py-2 px-2 rounded-md
                            text-sm transition-all duration-150
                            ${activeId === heading.id
                              ? 'text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-500/10 font-medium'
                              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-700/30'
                            }
                          `}
                        >
                          <span className="truncate leading-tight">{heading.text}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </nav>
              </div>
            </div>
          </>
        )}
      </>
    );
  }

  // Desktop TOC
  return (
    <div className="bg-white dark:bg-neutral-800/50 rounded-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 text-left
          hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <FiList className="w-4 h-4 text-blue-500" />
          <span className="font-medium text-neutral-900 dark:text-neutral-100">
            On this page
          </span>
        </div>
        {isExpanded ? (
          <FiChevronDown className="w-4 h-4 text-neutral-500" />
        ) : (
          <FiChevronRight className="w-4 h-4 text-neutral-500" />
        )}
      </button>

      {/* Content */}
      {isExpanded && (
        <div
          ref={tocContainerRef}
          className={`px-4 pb-4 max-h-[calc(100vh-12rem)] overflow-y-auto transition-all duration-300 ${isAutoScrolling ? 'ring-1 ring-blue-500/20' : ''
            }`}
        >
          <nav>
            <ul className="space-y-1">
              {headings.map((heading, index) => (
                <li
                  key={index}
                  style={{ paddingLeft: `${(heading.level - 1) * 0.75}rem` }}
                >
                  <button
                    ref={(el) => {
                      tocItemRefs.current[heading.id] = el;
                    }}
                    onClick={() => scrollToHeading(heading.id)}
                    className={`
                      group flex items-center gap-2 w-full text-left py-2 px-2 rounded-md
                      text-sm transition-all duration-150
                      ${activeId === heading.id
                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-500/10 font-medium'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-700/30'
                      }
                    `}
                  >
                    <FiChevronRight
                      className={`w-3 h-3 flex-shrink-0 transition-transform duration-150
                        ${activeId === heading.id ? 'rotate-90 text-blue-500' : 'group-hover:rotate-90'}
                      `}
                    />
                    <span className="truncate leading-tight">{heading.text}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
