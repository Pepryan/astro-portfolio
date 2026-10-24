// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeLazyImages from './src/plugins/rehype-lazy-images.mjs';

/**
 * Syntax highlighting for code blocks.
 * Two themes are emitted as CSS variables (--shiki-light / --shiki-dark) and
 * switched by the `dark` class on <html> — see src/styles/prose.css.
 * @type {import('rehype-pretty-code').Options}
 */
const prettyCodeOptions = {
  theme: {
    light: 'github-light',
    dark: 'night-owl',
  },
  keepBackground: true,
  defaultLang: 'plaintext',
  grid: true,
  onVisitLine(node) {
    // Keep empty lines visible so line numbers & copy output stay intact
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: ' ' }];
    }
  },
  onVisitHighlightedLine(node) {
    node.properties.className = ['highlighted'];
  },
  onVisitHighlightedChars(node) {
    node.properties.className = ['word'];
  },
};

// https://astro.build/config
export default defineConfig({
  site: 'https://febryan.web.id',
  output: 'static',
  // Fetch pages on link hover/focus so navigation feels instant
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  // Single canonical tag route lives under /blog/tags
  redirects: {
    '/tags/[tag]': '/blog/tags/[tag]',
  },
  markdown: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [[rehypePrettyCode, prettyCodeOptions], rehypeLazyImages],
    syntaxHighlight: false,
  },
  integrations: [
    // MDX inherits the markdown config above (extendMarkdownConfig defaults to true)
    mdx(),
    react(),
    tailwind({ applyBaseStyles: false }),
  ],
  vite: {
    // Native module used for OG image rendering — keep it out of Vite's bundling
    ssr: { external: ['@resvg/resvg-js'] },
    optimizeDeps: { exclude: ['@resvg/resvg-js'] },
  },
});
