/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            // Disable default code styling to use custom components
            'pre': false,
            'code': false,
            'pre code': false,
            'code::before': false,
            'code::after': false,

            // Optimize spacing for compact layout with improved readability
            '--tw-prose-body': '17px',
            '--tw-prose-headings': '1.2em',
            '--tw-prose-lead': '1.4em',
            '--tw-prose-links': '17px',
            '--tw-prose-bold': '17px',
            '--tw-prose-counters': '17px',
            '--tw-prose-bullets': '17px',
            '--tw-prose-hr': '1px',
            '--tw-prose-quotes': '19px',
            '--tw-prose-quote-borders': '4px',
            '--tw-prose-captions': '15px',
            '--tw-prose-kbd': '15px',
            '--tw-prose-th-borders': '1px',
            '--tw-prose-td-borders': '1px',

            // Tighter spacing between elements
            'h1': {
              marginTop: '1.5rem',
              marginBottom: '0.75rem',
              lineHeight: '1.2',
            },
            'h2': {
              marginTop: '1.25rem',
              marginBottom: '0.5rem',
              lineHeight: '1.3',
            },
            'h3': {
              marginTop: '1rem',
              marginBottom: '0.375rem',
              lineHeight: '1.4',
            },
            'h4': {
              marginTop: '0.75rem',
              marginBottom: '0.25rem',
              lineHeight: '1.4',
            },
            'p': {
              marginTop: '0.375rem',
              marginBottom: '0.375rem',
              lineHeight: '1.65',
              fontSize: '17px',
            },
            // Tighter spacing for paragraphs adjacent to code blocks
            'p + pre': {
              marginTop: '0.25rem',
            },
            'pre + p': {
              marginTop: '0.25rem',
            },
            // Tighter spacing for paragraphs adjacent to images
            'p + img': {
              marginTop: '0.25rem',
            },
            'img + p': {
              marginTop: '0.25rem',
            },
            // Image spacing
            'img': {
              marginTop: '0.25rem',
              marginBottom: '0.25rem',
            },
            // Figure spacing
            'figure': {
              marginTop: '0.25rem',
              marginBottom: '0.25rem',
            },
            'p + figure': {
              marginTop: '0.25rem',
            },
            'figure + p': {
              marginTop: '0.25rem',
            },
            'ul': {
              marginTop: '0.375rem',
              marginBottom: '0.375rem',
              fontSize: '17px',
            },
            'ol': {
              marginTop: '0.375rem',
              marginBottom: '0.375rem',
              fontSize: '17px',
            },
            'li': {
              marginTop: '0.0625rem',
              marginBottom: '0.0625rem',
              lineHeight: '1.6',
            },
            // Nested lists with tighter spacing
            'ul ul, ol ol, ul ol, ol ul': {
              marginTop: '0.125rem',
              marginBottom: '0.125rem',
            },
            'blockquote': {
              marginTop: '0.25rem',
              marginBottom: '0.25rem',
              paddingTop: '0.5rem',
              paddingBottom: '0.5rem',
            },
            'p + blockquote': {
              marginTop: '0.25rem',
            },
            'blockquote + p': {
              marginTop: '0.25rem',
            },
            // First element should not have top margin
            '> :first-child': {
              marginTop: '0',
            },
            // Last element should not have bottom margin
            '> :last-child': {
              marginBottom: '0',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar'),
  ],
};
