#!/usr/bin/env node
/**
 * Append a trek to src/data/treks.yaml from a Strava embed code.
 *
 *   npm run trek:add            → paste the embed code, then Ctrl+D
 *   npm run trek:add -- '<div class="strava-embed-placeholder" …>'
 *
 * Reads title, date, distance, elevation gain and time from the embed page
 * (the same page the iframe shows). That page is Strava's, not an API, so if
 * its markup changes the script stops and prints a template to fill by hand.
 */
import { readFile, appendFile } from 'node:fs/promises';

const DATA = new URL('../src/data/treks.yaml', import.meta.url);

const readStdin = async () => {
  if (process.stdin.isTTY) console.error('Paste the Strava embed code, then press Ctrl+D:');
  let text = '';
  for await (const chunk of process.stdin) text += chunk;
  return text;
};

const code = (process.argv.slice(2).join(' ') || (await readStdin())).trim();
const attr = (name) => code.match(new RegExp(`data-${name}="([^"]*)"`))?.[1];
const type = attr('embed-type') ?? 'activity';
const id = attr('embed-id');
const token = attr('token');
if (!id || !token) {
  console.error('That does not look like a Strava embed code (need data-embed-id and data-token).');
  process.exit(1);
}

const decode = (s) =>
  s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").trim();
const yamlString = (s) => (/^[\w][\w .,()'/-]*$/.test(s) && !/:\s|\s#/.test(s) ? s : JSON.stringify(s));
const slugify = (s) =>
  s.normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || `trek-${id}`;

const template = (fields = {}) =>
  [
    `${fields.key ?? `trek-${id}`}:`,
    `  title: ${fields.title ?? 'TODO'}`,
    `  date: ${fields.date ?? 'TODO # YYYY-MM-DD'}`,
    fields.distance !== undefined ? `  distance: ${fields.distance}` : '  # distance: 0.0  # km',
    fields.elevation !== undefined ? `  elevation: ${fields.elevation}` : '  # elevation: 0  # m',
    fields.time ? `  time: ${fields.time}` : '  # time: 0h 00m',
    '  strava: >-',
    `    ${code.replace(/\s*\n\s*/g, ' ')}`,
  ].join('\n');

let page;
try {
  const style = attr('style') ?? 'standard';
  const url = `https://strava-embeds.com/${type}/${id}?${new URLSearchParams({ style, fromEmbed: 'false', token })}`;
  const res = await fetch(url, { headers: { 'Accept-Language': 'en-US' } });
  if (!res.ok) throw new Error(`HTTP ${res.status} (is the activity public and the token right?)`);
  page = await res.text();
} catch (error) {
  console.error(`Could not read the embed: ${error.message}\nAdd this to src/data/treks.yaml and fill the TODOs:\n`);
  console.log(template());
  process.exit(1);
}

const text = (cls) => {
  const m = page.match(new RegExp(`class="${cls}"[^>]*>([^<]*)<`));
  return m ? decode(m[1]) : undefined;
};
const stat = (label) => {
  const m = page.match(new RegExp(`stat-label">${label}</div><div class="stat-value">([^<]*)<`));
  return m ? decode(m[1]) : undefined;
};
const number = (value, units) => {
  const m = value?.replace(/,/g, '').match(/([\d.]+)\s*([a-z]+)/i);
  if (!m) return undefined;
  const factor = units[m[2].toLowerCase()];
  return factor === undefined ? undefined : Number(m[1]) * factor;
};

const title = text('activity-name');
const rawDate = text('activity-date');
const parsed = rawDate ? new Date(`${rawDate} 12:00`) : undefined;
const date = parsed && !Number.isNaN(parsed.valueOf())
  ? `${parsed.getFullYear()}-${String(parsed.getMonth() + 1).padStart(2, '0')}-${String(parsed.getDate()).padStart(2, '0')}`
  : undefined;
const km = number(stat('Distance'), { km: 1, m: 0.001, mi: 1.609344 });
const gain = number(stat('Elev Gain'), { m: 1, ft: 0.3048 });
const time = stat('Time') ?? stat('Moving Time') ?? stat('Elapsed Time');

const existing = await readFile(DATA, 'utf8');
if (existing.includes(`data-embed-id="${id}"`)) {
  console.error(`Activity ${id} is already in src/data/treks.yaml.`);
  process.exit(1);
}
const keys = new Set([...existing.matchAll(/^([a-z0-9-]+):/gm)].map((m) => m[1]));
let key = slugify(title ?? '');
if (keys.has(key)) key = `${key}-${date ?? id}`;

const entry = template({
  key,
  title: title ? yamlString(title) : undefined,
  date,
  distance: km === undefined ? undefined : Math.round(km * 10) / 10,
  elevation: gain === undefined ? undefined : Math.round(gain),
  time,
});

await appendFile(DATA, `${existing.endsWith('\n') ? '' : '\n'}\n${entry}\n`);
console.log(`Added to src/data/treks.yaml:\n\n${entry}\n`);
if (!title || !date) {
  console.error('Some fields could not be read; fill the TODOs before building.');
  process.exit(1);
}
console.log(`Optional: add note, summit or tags by hand. Shows at /trekking#${key}`);
