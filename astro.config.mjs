// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';

// https://astro.build/config
export default defineConfig({
  site: 'https://febryan.web.id',
  output: 'static',
  integrations: [
    mdx({
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        [rehypePrettyCode, {
          theme: 'night-owl',
          keepBackground: true,
          defaultLang: 'plaintext',
          grid: true,
          onVisitLine(node) {
            if (node.children.length === 0) {
              node.children = [{type: 'text', value: ' '}];
            }
          },
          onVisitHighlightedLine(node) {
            node.properties.className = ['highlighted'];
          },
          onVisitHighlightedWord(node) {
            node.properties.className = ['word'];
          },
          transformers: [
            {
              name: 'add-copy-button-class',
              pre(node) {
                // Add group class for copy button hover effect
                this.addClassToHast(node, 'group');
              }
            }
          ]
        }]
      ],
      syntaxHighlight: false
    }),
    react(),
    tailwind({
      applyBaseStyles: false
    }),
    sitemap()
  ],
  markdown: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      [rehypePrettyCode, {
        theme: 'night-owl',
        keepBackground: true,
        defaultLang: 'plaintext',
        grid: true,
        onVisitLine(node) {
          if (node.children.length === 0) {
            node.children = [{type: 'text', value: ' '}];
          }
        },
        onVisitHighlightedLine(node) {
          node.properties.className = ['highlighted'];
        },
        onVisitHighlightedWord(node) {
          node.properties.className = ['word'];
        }
      }]
    ],
    syntaxHighlight: false
  },
  vite: {
    optimizeDeps: {
      exclude: ['@resvg/resvg-js']
    }
  }
});
