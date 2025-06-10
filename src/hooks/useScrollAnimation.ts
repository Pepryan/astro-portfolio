import { useEffect, useRef, useState } from 'react';
import { useAnimation, useInView } from 'framer-motion';

interface UseScrollAnimationOptions {
  threshold?: number;
  triggerOnce?: boolean;
  rootMargin?: string;
  delay?: number;
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const {
    threshold = 0.1,
    triggerOnce = true,
    rootMargin = '0px 0px -100px 0px',
    delay = 0
  } = options;

  const ref = useRef(null);
  const isInView = useInView(ref, {
    threshold,
    once: triggerOnce,
    margin: rootMargin
  });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        controls.start('visible');
      }, delay);
      return () => clearTimeout(timer);
    } else if (!triggerOnce) {
      controls.start('hidden');
    }
  }, [isInView, controls, delay, triggerOnce]);

  return { ref, controls, isInView };
}

export function useParallax() {
  const [offset, setOffset] = useState(0);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      
      setOffset(rate);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { ref, offset };
}

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      setMousePosition({ x, y });
    };

    const element = ref.current;
    if (element) {
      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mouseleave', () => setMousePosition({ x: 0, y: 0 }));
    }

    return () => {
      if (element) {
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseleave', () => setMousePosition({ x: 0, y: 0 }));
      }
    };
  }, []);

  return { ref, mousePosition };
}

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [scrollY, setScrollY] = useState(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setScrollDirection(currentScrollY > lastScrollY.current ? 'down' : 'up');
      setScrollY(currentScrollY);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { scrollDirection, scrollY };
}

export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}
