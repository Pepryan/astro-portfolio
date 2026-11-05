/**
 * Giscus comments (GitHub Discussions) without a framework.
 *
 * The giscus script is injected once the section is ~600px from the viewport,
 * the iframe theme follows the site theme, and the status line explains what
 * is happening (loading, or how to reach the discussion if it fails).
 */
import { isDarkMode, onThemeChange } from './theme';

const ORIGIN = 'https://giscus.app';

// Borderless themes: the page already draws its own hairlines
const theme = (dark: boolean) => (dark ? 'transparent_dark' : 'noborder_light');

const CONFIG: Record<string, string> = {
  repo: 'pepryan/astro-portfolio',
  'repo-id': 'R_kgDOO5SeXA',
  category: 'General',
  'category-id': 'DIC_kwDOO5SeXM4CrbXV',
  mapping: 'pathname',
  strict: '0',
  'reactions-enabled': '1',
  'emit-metadata': '0',
  'input-position': 'bottom',
  lang: 'en',
  loading: 'lazy',
};

export const DISCUSSIONS_URL = `https://github.com/${CONFIG.repo}/discussions`;

export function initGiscus(): void {
  const container = document.querySelector<HTMLElement>('[data-giscus]');
  const status = document.querySelector<HTMLElement>('[data-giscus-status]');
  if (!container) return;

  const setStatus = (text: string, link?: { href: string; text: string }) => {
    if (!status) return;
    status.replaceChildren(text);
    if (link) {
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.text;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      status.append(' ', a);
    }
    status.hidden = false;
  };

  const load = () => {
    setStatus('Loading comments from GitHub Discussions…');
    const script = document.createElement('script');
    script.src = `${ORIGIN}/client.js`;
    script.async = true;
    script.crossOrigin = 'anonymous';
    Object.entries({ ...CONFIG, theme: theme(isDarkMode()) }).forEach(([key, value]) => script.setAttribute(`data-${key}`, value));
    script.addEventListener('error', () =>
      setStatus("Couldn't load comments (a blocker or a network hiccup).", { href: DISCUSSIONS_URL, text: 'Open the discussion on GitHub' })
    );
    container.append(script);
  };

  // The first message from the iframe means it rendered; hide the status line
  window.addEventListener('message', function onMessage(event) {
    if (event.origin !== ORIGIN || typeof event.data !== 'object' || !event.data?.giscus) return;
    if (status) status.hidden = true;
    window.removeEventListener('message', onMessage);
  });

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      load();
    },
    { rootMargin: '600px 0px' }
  );
  observer.observe(container);

  onThemeChange((dark) => {
    container
      .querySelector<HTMLIFrameElement>('iframe.giscus-frame')
      ?.contentWindow?.postMessage({ giscus: { setConfig: { theme: theme(dark) } } }, ORIGIN);
  });
}
