import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Page copy. One Markdown file per page per locale:
 *   src/content/pages/<locale>/<route-key>.md
 * The entry id is "<locale>/<route-key>", e.g. "zh/tier-list".
 */
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    /** <title> and og:title */
    title: z.string(),
    /** meta description, ~150 chars */
    description: z.string(),
    /** visible H1 (defaults to title) */
    heading: z.string().optional(),
    /** ISO date, shown as "Last updated" and used in Article JSON-LD */
    updated: z.coerce.date().optional(),
    /** ISO date first published, Article datePublished (defaults to updated) */
    published: z.coerce.date().optional(),
    /** optional FAQ; rendered on page and emitted as FAQPage JSON-LD */
    faq: z.array(z.object({ q: z.string(), a: z.string() })).optional(),
    /** inner pages: show the compact "play the game" card above the body (default true) */
    gameCard: z.boolean().default(true),
    /** home only: screenshot shown in the game box before Play is clicked (path under /public) */
    poster: z.string().optional(),
    /** alt text for `poster` (required when poster is set) */
    posterAlt: z.string().optional(),
    /** game card: make "open in a new tab" the primary button (e.g. mobile page) */
    gameCardNewTab: z.boolean().default(false),
    /** short breadcrumb label (defaults to heading/title) */
    breadcrumb: z.string().optional(),
    /** page-specific og:image (path under /public, 1200x630) and its alt text */
    ogImage: z.string().optional(),
    ogImageAlt: z.string().optional(),
  }),
});

export const collections = { pages };
