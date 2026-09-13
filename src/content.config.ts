import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/* Deliberately permissive — per the astro-knots reminder
 * `Rule-to-Assure-Collection-Schema-is-Flexible`, we document shape rather
 * than gatekeep on it. Only `title` is truly required anywhere; an author
 * typo degrades one field instead of failing the build. */

/* ---------------------------------------------------------------- articles --
 * The thought-leadership surface. `plain_question` is load-bearing and not
 * decorative: it is the everyday, jargon-free question a reader actually has,
 * and every index card leads with it BEFORE the clinical title. That is the
 * "don't make me think" contract expressed in the data model rather than left
 * to whoever writes the template. */
const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z
    .object({
      title: z.string(),
      plain_question: z.string().optional(),
      lede: z.string().optional(),
      author: z.string().optional(),
      author_credential: z.string().optional(),
      categories: z.array(z.string()).optional(),
      date_published: z.coerce.date().optional(),
      read_minutes: z.number().optional(),
      featured: z.boolean().optional(),
      /* One plain-English sentence defining any term of art the piece uses,
       * so a term never appears on a card without its translation nearby. */
      term_of_art: z.string().optional(),
      term_in_plain_english: z.string().optional(),
    })
    .passthrough(),
});

/* ------------------------------------------------------------------ series --
 * The documentary. Eight episodes, ordered. `promise` is the plain-language
 * one-liner; `discoveries` are the specifics. */
const series = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/series' }),
  schema: z
    .object({
      order: z.number(),
      title: z.string(),
      promise: z.string().optional(),
      runtime_minutes: z.number().optional(),
      discoveries: z.array(z.string()).optional(),
      featuring: z.array(z.string()).optional(),
      free: z.boolean().optional(),
    })
    .passthrough(),
});

/* ----------------------------------------------------------------- bundles --
 * The commerce ladder. Three tiers, each a strict superset of the one below,
 * which is what makes a one-click upgrade honest: upgrading never removes
 * anything, so the cart can present the delta rather than a whole new cart.
 *
 * `includes` carries the FULL list for the tier (not just the delta) so the
 * renderer can diff adjacent tiers itself and no one has to keep two lists
 * in sync by hand. */
const bundles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/bundles' }),
  schema: z
    .object({
      order: z.number(),
      tier_id: z.string(),
      name: z.string(),
      plain_name: z.string().optional(),
      one_liner: z.string().optional(),
      best_for: z.string().optional(),
      price: z.number(),
      list_value: z.number().optional(),
      most_popular: z.boolean().optional(),
      upgrade_hook: z.string().optional(),
      includes: z
        .array(
          z.object({
            label: z.string(),
            detail: z.string().optional(),
            list_value: z.number().optional(),
            kind: z.string().optional(),
          })
        )
        .optional(),
    })
    .passthrough(),
});

export const collections = { articles, series, bundles };
