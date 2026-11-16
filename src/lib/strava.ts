/**
 * Strava embed codes, parsed at build time.
 *
 * Strava's "Embed on blog" code is a placeholder div plus <script src=embed.js>.
 * We never load that script: the page keeps only the attributes it needs
 * (type, id, token, style) and builds the iframe itself when a visitor opens a
 * trek (src/lib/strava-embed.ts). The token is public by design: it is part of
 * the code Strava hands out for pasting into any web page.
 */
export interface StravaEmbed {
  type: string;
  id: string;
  token: string;
  style: string;
}

const attr = (code: string, name: string) => code.match(new RegExp(`data-${name}="([^"]*)"`))?.[1];

/** Returns null when the code is missing the activity id or token. */
export function parseStravaEmbed(code: string): StravaEmbed | null {
  const id = attr(code, 'embed-id');
  const token = attr(code, 'token');
  if (!id || !/^\d+$/.test(id) || !token || !/^[\w-]+$/.test(token)) return null;

  const type = attr(code, 'embed-type') ?? 'activity';
  return {
    type: /^[a-z]+$/.test(type) ? type : 'activity',
    id,
    token,
    style: attr(code, 'style') ?? 'standard',
  };
}

/** Public page of the activity, for the "open on Strava" link and no-JS visitors. */
export function stravaUrl({ type, id }: Pick<StravaEmbed, 'type' | 'id'>): string {
  return `https://www.strava.com/${type === 'activity' ? 'activities' : `${type}s`}/${id}`;
}

/** "2h 16m", "45m 10s" → minutes (for totals). */
export function durationMinutes(text = ''): number {
  const part = (unit: string) => Number(text.match(new RegExp(`(\\d+)\\s*${unit}`))?.[1] ?? 0);
  return part('h') * 60 + part('m') + part('s') / 60;
}
