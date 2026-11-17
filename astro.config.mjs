// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import { unified } from '@astrojs/markdown-remark';
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
  // Astro 7 defaults to 'jsx', which drops whitespace between inline elements
  // ("2 posts" renders as "2posts"). Keep the pre-7 behavior.
  compressHTML: true,
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
    // Astro 7 defaults to the Sätteri processor, which does not run rehype
    // plugins. unified() keeps rehype-pretty-code working; GFM is on by default.
    processor: unified({
      rehypePlugins: [[rehypePrettyCode, prettyCodeOptions], rehypeLazyImages],
    }),
    syntaxHighlight: false,
  },
  integrations: [
    // React must come before MDX: Astro picks a renderer for each framework
    // component by running every renderer's check() in this order. MDX's check
    // calls the component as a plain function, so hooks run outside React's
    // render and log "Invalid hook call" on every page. React's own check
    // claims the component first and MDX never touches it.
    react(),
    // MDX inherits the markdown processor above (extendMarkdownConfig defaults to true)
    mdx(),
  ],
  vite: {
    // Native module used for OG image rendering — keep it out of Vite's bundling
    ssr: { external: ['@resvg/resvg-js'] },
    optimizeDeps: { exclude: ['@resvg/resvg-js'] },
  },
});
