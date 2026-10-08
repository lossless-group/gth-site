/* ============================================================================
 * basePath — make a root-relative site work under a sub-path.
 *
 * GitHub Pages serves this repo at https://lossless-group.github.io/gth-site/,
 * so every page lives under /gth-site/. Astro prefixes its OWN assets with
 * `base`, but it does not touch the ~70 hand-written root-relative links in
 * components and in the imported article bodies (`/blog/…`, `/journal/start`,
 * `/img/gateway/…`). Rewriting each of those to read `import.meta.env.BASE_URL`
 * would touch every component for a deploy-target concern, so instead this
 * rewrites the BUILT output once, after the build, and only when `base` is set.
 *
 * With base '/', it does nothing — Vercel and local dev are unchanged.
 * ========================================================================== */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(p);
    else yield p;
  }
}

export default function basePath() {
  let base = '/';
  return {
    name: 'gth:base-path',
    hooks: {
      'astro:config:done': ({ config }) => {
        base = config.base.replace(/\/$/, '');
      },
      'astro:build:done': async ({ dir, logger }) => {
        if (!base) return;
        const root = fileURLToPath(dir);
        const esc = base.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        /* A root-relative URL that is not protocol-relative and not already
         * prefixed with the base. */
        const rel = `/(?!/)(?!${esc.slice(1)}(?:/|"|'|$))`;
        const attr = new RegExp(`((?:href|src|action|poster)=["'])${rel}`, 'g');
        const refresh = new RegExp(`(content=["']\\d+;\\s*url=)${rel}`, 'gi');
        const cssUrl = new RegExp(`(url\\(["']?)${rel}`, 'g');

        let files = 0;
        for await (const file of walk(root)) {
          if (!/\.(html|css)$/.test(file)) continue;
          const before = await readFile(file, 'utf8');
          const after = before
            .replace(attr, `$1${base}/`)
            .replace(refresh, `$1${base}/`)
            .replace(cssUrl, `$1${base}/`);
          if (after !== before) {
            await writeFile(file, after);
            files++;
          }
        }
        logger.info(`prefixed root-relative URLs with ${base} in ${files} files`);
      },
    },
  };
}
