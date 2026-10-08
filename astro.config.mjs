// @ts-check
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import basePath from './src/integrations/base-path.mjs';

// Gateway to Health (codename Threshold in public specs) — three design
// directions for one content-and-commerce site.
// Client material is CONFIDENTIAL; public specs use the codename only.
export default defineConfig({
  /* PAGES_SITE / PAGES_BASE are set only by the GitHub Pages workflow
   * (.github/workflows/pages.yml). Unset — Vercel, local dev — the site
   * serves from the root exactly as before. */
  site: process.env.PAGES_SITE ?? 'https://threshold.example.com',
  base: process.env.PAGES_BASE ?? '/',
  trailingSlash: 'ignore',
  /* The library moved to /blog to match her live URLs. Her top-level page
   * paths (which her own blog posts link to) land on the Journal direction's
   * copy of each page until a direction is chosen. */
  redirects: {
    '/articles': '/blog',
    '/start': '/journal/start',
    '/about': '/journal/about',
    '/series': '/journal/series',
    '/practitioners': '/journal/practitioners',
  },
  integrations: [svelte(), basePath()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@layouts': path.resolve('./src/layouts'),
        '@components': path.resolve('./src/components'),
        '@lib': path.resolve('./src/lib'),
      },
    },
  },
});
