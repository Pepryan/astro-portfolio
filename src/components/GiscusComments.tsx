import { useEffect, useRef } from 'react';
import { isDarkMode, onThemeChange } from '../lib/theme';

const GISCUS_ORIGIN = 'https://giscus.app';

const giscusTheme = (dark: boolean) => (dark ? 'dark' : 'light');

/**
 * Giscus comments (GitHub Discussions). The script is injected only when the
 * section scrolls near the viewport, and the iframe theme follows the site theme.
 */
export default function GiscusComments() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const load = () => {
      const script = document.createElement('script');
      script.src = `${GISCUS_ORIGIN}/client.js`;
      script.async = true;
      script.crossOrigin = 'anonymous';
      Object.entries({
        repo: 'pepryan/astro-portfolio',
        'repo-id': 'R_kgDOO5SeXA',
        category: 'General',
        'category-id': 'DIC_kwDOO5SeXM4CrbXV',
        mapping: 'pathname',
        strict: '0',
        'reactions-enabled': '1',
        'emit-metadata': '0',
        'input-position': 'bottom',
        theme: giscusTheme(isDarkMode()),
        lang: 'en',
        loading: 'lazy',
      }).forEach(([key, value]) => script.setAttribute(`data-${key}`, value));
      container.replaceChildren(script);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          load();
        }
      },
      { rootMargin: '400px' }
    );
    observer.observe(container);

    const unsubscribe = onThemeChange((dark) => {
      container.querySelector<HTMLIFrameElement>('iframe.giscus-frame')?.contentWindow?.postMessage(
        { giscus: { setConfig: { theme: giscusTheme(dark) } } },
        GISCUS_ORIGIN
      );
    });

    return () => {
      observer.disconnect();
      unsubscribe();
    };
  }, []);

  return (
    <section className="mt-16 border-t border-neutral-200 pt-8 dark:border-neutral-700" aria-labelledby="comments-title">
      <h2 id="comments-title" className="mb-6 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
        Comments
      </h2>
      <div ref={ref} className="giscus-container min-h-[200px]" />
    </section>
  );
}
