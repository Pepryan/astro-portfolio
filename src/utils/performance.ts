/**
 * Performance optimization utilities
 * Helps with reducing motion, lazy loading, and performance monitoring
 */

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (error) {
    console.warn('Error checking reduced motion preference:', error);
    return false;
  }
}

/**
 * Check if user has Do Not Track enabled
 */
export function hasDoNotTrack(): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    return navigator.doNotTrack === '1' || 
           (window as any).doNotTrack === '1' ||
           navigator.msDoNotTrack === '1';
  } catch (error) {
    console.warn('Error checking Do Not Track preference:', error);
    return false;
  }
}

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Throttle function for performance optimization
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Lazy load images with intersection observer
 */
export function lazyLoadImage(img: HTMLImageElement, src: string): void {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const image = entry.target as HTMLImageElement;
          image.src = src;
          image.classList.remove('lazy');
          observer.unobserve(image);
        }
      });
    });
    
    observer.observe(img);
  } else {
    // Fallback for browsers without IntersectionObserver
    img.src = src;
  }
}

/**
 * Performance-aware animation configuration
 */
export function getAnimationConfig() {
  const reducedMotion = prefersReducedMotion();
  
  return {
    duration: reducedMotion ? 0.1 : 0.4,
    ease: reducedMotion ? 'linear' : 'easeOut',
    stagger: reducedMotion ? 0 : 0.1,
    enabled: !reducedMotion
  };
}

/**
 * Check if device has limited resources (mobile, slow connection)
 */
export function hasLimitedResources(): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    // Check for slow connection
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    const slowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
    
    // Check for mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Check for limited memory (if available)
    const limitedMemory = (navigator as any).deviceMemory && (navigator as any).deviceMemory < 4;
    
    return slowConnection || (isMobile && limitedMemory);
  } catch (error) {
    console.warn('Error checking device resources:', error);
    return false;
  }
}

/**
 * Performance monitoring utility
 */
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number> = new Map();
  
  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }
  
  startTiming(label: string): void {
    if (typeof performance !== 'undefined') {
      this.metrics.set(label, performance.now());
    }
  }
  
  endTiming(label: string): number {
    if (typeof performance !== 'undefined' && this.metrics.has(label)) {
      const startTime = this.metrics.get(label)!;
      const duration = performance.now() - startTime;
      this.metrics.delete(label);
      
      // Log slow operations in development
      if (process.env.NODE_ENV === 'development' && duration > 100) {
        console.warn(`Slow operation detected: ${label} took ${duration.toFixed(2)}ms`);
      }
      
      return duration;
    }
    return 0;
  }
  
  measureComponent<T>(label: string, fn: () => T): T {
    this.startTiming(label);
    const result = fn();
    this.endTiming(label);
    return result;
  }
}

/**
 * Optimize animations based on device capabilities
 */
export function getOptimizedAnimationProps() {
  const reducedMotion = prefersReducedMotion();
  const limitedResources = hasLimitedResources();
  
  if (reducedMotion || limitedResources) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.1 },
      whileHover: {},
      whileTap: {}
    };
  }
  
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: 'easeOut' },
    whileHover: { y: -2 },
    whileTap: { scale: 0.98 }
  };
}

/**
 * Preload critical resources
 */
export function preloadCriticalResources(): void {
  if (typeof document === 'undefined') return;
  
  // Preload critical fonts
  const fontLink = document.createElement('link');
  fontLink.rel = 'preload';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
  fontLink.as = 'style';
  fontLink.crossOrigin = 'anonymous';
  document.head.appendChild(fontLink);
}

/**
 * Clean up resources and event listeners
 */
export function cleanup(): void {
  // Clear any remaining timeouts or intervals
  // This would be called on page unload
  if (typeof window !== 'undefined') {
    // Clear any global timers if needed
  }
}
