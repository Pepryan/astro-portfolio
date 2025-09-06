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

            // Optimize spacing for compact layout
            '--tw-prose-body': '16px',
            '--tw-prose-headings': '1.2em',
            '--tw-prose-lead': '1.4em',
            '--tw-prose-links': '16px',
            '--tw-prose-bold': '16px',
            '--tw-prose-counters': '16px',
            '--tw-prose-bullets': '16px',
            '--tw-prose-hr': '1px',
            '--tw-prose-quotes': '18px',
            '--tw-prose-quote-borders': '4px',
            '--tw-prose-captions': '14px',
            '--tw-prose-kbd': '14px',
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
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
              lineHeight: '1.6',
            },
            'ul': {
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
            },
            'ol': {
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
            },
            'li': {
              marginTop: '0.125rem',
              marginBottom: '0.125rem',
            },
            'blockquote': {
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
              paddingTop: '0.5rem',
              paddingBottom: '0.5rem',
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
