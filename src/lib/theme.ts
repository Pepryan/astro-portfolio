/**
 * Single source of truth for light/dark theme on the client.
 *
 * The initial theme is applied before paint by the inline script in
 * src/layouts/Layout.astro (keep STORAGE_KEY in sync with it). Everything
 * else (toggle button, keyboard shortcut, Giscus) goes through these helpers.
 */

export const STORAGE_KEY = 'darkMode';
export const THEME_EVENT = 'themeChanged';

export interface ThemeChangeDetail {
  darkMode: boolean;
}

export function isDarkMode(): boolean {
  return document.documentElement.classList.contains('dark');
}

export function setDarkMode(dark: boolean, persist = true): void {
  document.documentElement.classList.toggle('dark', dark);
  if (persist) {
    try {
      localStorage.setItem(STORAGE_KEY, String(dark));
    } catch {
      // Storage can be unavailable (private mode, blocked cookies) — theme still applies.
    }
  }
  window.dispatchEvent(
    new CustomEvent<ThemeChangeDetail>(THEME_EVENT, { detail: { darkMode: dark } })
  );
}

export function toggleDarkMode(): void {
  setDarkMode(!isDarkMode());
}

/** Subscribe to theme changes. Returns an unsubscribe function. */
export function onThemeChange(callback: (dark: boolean) => void): () => void {
  const handler = (event: Event) => {
    callback((event as CustomEvent<ThemeChangeDetail>).detail.darkMode);
  };
  window.addEventListener(THEME_EVENT, handler);
  return () => window.removeEventListener(THEME_EVENT, handler);
}
