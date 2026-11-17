// Tailwind 3 runs as a PostCSS plugin; @astrojs/tailwind does not support Astro 6+.
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default {
  plugins: [tailwindcss(), autoprefixer()],
};
