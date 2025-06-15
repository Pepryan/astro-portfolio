import { useEffect, useRef, useState } from 'react';

interface GiscusCommentsProps {
  slug: string;
  title: string;
}

export default function GiscusComments({ slug, title }: GiscusCommentsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!ref.current || !mounted) return;

    // Function to get current theme from DOM
    const getCurrentTheme = () => {
      return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    };

    // Clear existing Giscus
    ref.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', 'pepryan/astro-portfolio');
    script.setAttribute('data-repo-id', 'R_kgDOO5SeXA');
    script.setAttribute('data-category', 'General');
    script.setAttribute('data-category-id', 'DIC_kwDOO5SeXM4CrbXV');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', getCurrentTheme());
    script.setAttribute('data-lang', 'en');
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    ref.current.appendChild(script);

    // Theme change handler
    const handleThemeChange = () => {
      setTimeout(() => {
        const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
        if (iframe && iframe.contentWindow) {
          const theme = getCurrentTheme();
          try {
            iframe.contentWindow.postMessage(
              { giscus: { setConfig: { theme } } },
              'https://giscus.app'
            );
          } catch (error) {
            // Silent error handling
          }
        }
      }, 100);
    };

    // Setup theme listeners after Giscus loads
    const setupThemeListeners = () => {
      // Listen for DOM class changes
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            handleThemeChange();
          }
        });
      });

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
    };

    // Wait for Giscus iframe to load
    let cleanup: (() => void) | null = null;
    const checkForGiscus = () => {
      const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
      if (iframe) {
        // console.log('✅ Giscus iframe detected, setting up theme listeners');
        cleanup = setupThemeListeners();
      } else {
        setTimeout(checkForGiscus, 500);
      }
    };

    // Start checking after a delay
    setTimeout(checkForGiscus, 1000);

    return () => {
      if (cleanup) {
        cleanup();
      }
    };
  }, [mounted, slug]);

  return (
    <div className="mt-16">
      <div className="border-t border-neutral-200 dark:border-neutral-700 pt-8">
        <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6">
          Comments
        </h3>
        <div ref={ref} className="giscus-container" />
      </div>
    </div>
  );
}