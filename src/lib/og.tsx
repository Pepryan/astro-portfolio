/**
 * Build-time Open Graph image rendering (1200×630 PNG) with Satori + resvg.
 * Used by src/pages/og/[slug].png.ts.
 */
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { seoConfig } from '../config/components';

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;
const PAD_X = 72;
const PAD_Y = 64;
const CONTENT_WIDTH = OG_WIDTH - PAD_X * 2;

export interface OgImageOptions {
  title: string;
  /** Small label above the title, e.g. a series name or category */
  eyebrow?: string;
  tags?: string[];
  date?: Date;
}

const fontFile = (weight: number) =>
  path.join(process.cwd(), 'node_modules/@fontsource/inter/files', `inter-latin-${weight}-normal.woff`);

let fontsPromise: Promise<{ name: string; data: Buffer; weight: 400 | 700 | 800; style: 'normal' }[]> | undefined;
const loadFonts = () =>
  (fontsPromise ??= Promise.all(
    ([400, 700, 800] as const).map(async (weight) => ({
      name: 'Inter',
      data: await readFile(fontFile(weight)),
      weight,
      style: 'normal' as const,
    }))
  ));

// Satori cannot draw emoji without extra assets, so strip them from text.
const stripEmoji = (text: string) =>
  text.replace(/[\p{Extended_Pictographic}\u{FE0F}\u{200D}]/gu, '').replace(/\s{2,}/g, ' ').trim();

const truncate = (text: string, max: number) => (text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text);

export async function renderOgImage({ title, eyebrow, tags = [], date }: OgImageOptions): Promise<Buffer> {
  const cleanTitle = truncate(stripEmoji(title), 120);
  const titleSize = cleanTitle.length > 80 ? 52 : cleanTitle.length > 50 ? 62 : 72;
  const host = new URL(seoConfig.site.url).host;
  const dateLabel = date?.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });

  const svg = await satori(
    <div
      style={{
        // Satori uses content-box sizing: canvas size minus padding
        width: OG_WIDTH - PAD_X * 2,
        height: OG_HEIGHT - PAD_Y * 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: `${PAD_Y}px ${PAD_X}px`,
        backgroundColor: '#0a0a0a',
        backgroundImage:
          'radial-gradient(circle at 85% 0%, rgba(99,102,241,0.35), transparent 45%), radial-gradient(circle at 0% 100%, rgba(59,130,246,0.25), transparent 40%)',
        color: '#fafafa',
        fontFamily: 'Inter',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 26, color: '#a3a3a3' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 48,
            height: 48,
            borderRadius: 12,
            backgroundImage: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            color: '#fff',
            fontWeight: 800,
            fontSize: 22,
          }}
        >
          FR
        </div>
        {host}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: CONTENT_WIDTH }}>
        {eyebrow && (
          <div style={{ display: 'flex', fontSize: 26, fontWeight: 700, color: '#818cf8' }}>{truncate(stripEmoji(eyebrow), 70)}</div>
        )}
        <div style={{ display: 'flex', width: CONTENT_WIDTH, fontSize: titleSize, fontWeight: 800, lineHeight: 1.12, letterSpacing: '-0.02em' }}>
          {cleanTitle}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: CONTENT_WIDTH, fontSize: 24 }}>
        <div style={{ display: 'flex', gap: 12 }}>
          {tags.slice(0, 4).map((tag) => (
            <div
              key={tag}
              style={{ display: 'flex', padding: '6px 16px', borderRadius: 999, border: '1px solid #404040', color: '#d4d4d4' }}
            >
              {`#${tag}`}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', color: '#a3a3a3' }}>
          {[seoConfig.author.name, dateLabel].filter(Boolean).join('  ·  ')}
        </div>
      </div>
    </div>,
    { width: OG_WIDTH, height: OG_HEIGHT, fonts: await loadFonts() }
  );

  return new Resvg(svg, { fitTo: { mode: 'width', value: OG_WIDTH } }).render().asPng();
}
