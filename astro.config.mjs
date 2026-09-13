// @ts-check
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';

// Threshold — three design directions for one content-and-commerce site.
// Client material is CONFIDENTIAL; public specs use the codename only.
export default defineConfig({
  site: 'https://threshold.example.com',
  base: '/',
  trailingSlash: 'ignore',
  integrations: [svelte()],
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
