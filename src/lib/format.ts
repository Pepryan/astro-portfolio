/**
 * Date formatting shared by server and client components.
 *
 * Frontmatter dates are parsed as UTC midnight. Formatting in UTC keeps the
 * day stable for every visitor and avoids SSR/hydration mismatches.
 */
const LOCALE = 'en-US';

const formats = {
  long: { year: 'numeric', month: 'long', day: 'numeric' },
  short: { year: 'numeric', month: 'short', day: 'numeric' },
  monthDay: { month: 'short', day: 'numeric' },
} satisfies Record<string, Intl.DateTimeFormatOptions>;

export function formatDate(date: Date | string, style: keyof typeof formats = 'long'): string {
  return new Date(date).toLocaleDateString(LOCALE, { ...formats[style], timeZone: 'UTC' });
}

export function getYear(date: Date | string): number {
  return new Date(date).getUTCFullYear();
}
