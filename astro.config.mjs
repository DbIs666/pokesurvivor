// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';

// Production domain. SITE_URL overrides it (e.g. for a staging build).
const SITE = process.env.SITE_URL ?? 'https://poke-survivor.online';

// Sitemap <lastmod>: URL path -> frontmatter `updated` of src/content/pages/<locale>/<key>.md.
// Uses content dates, never build time, so the value only changes when the page does.
const PAGES_DIR = new URL('./src/content/pages/', import.meta.url);
/** @type {Map<string, string>} */
const LASTMOD = new Map();
for (const locale of readdirSync(PAGES_DIR)) {
  for (const file of readdirSync(new URL(`${locale}/`, PAGES_DIR))) {
    if (!file.endsWith('.md')) continue;
    const src = readFileSync(new URL(`${locale}/${file}`, PAGES_DIR), 'utf8');
    const m = /^---[\s\S]*?^updated:\s*['"]?(\d{4}-\d{2}-\d{2})/m.exec(src);
    if (!m) continue;
    const key = file.slice(0, -3);
    const prefix = locale === 'en' ? '' : `/${locale}`;
    LASTMOD.set(key === 'home' ? `${prefix}/` : `${prefix}/${key}/`, m[1]);
  }
}

export default defineConfig({
  site: SITE,
  output: 'static',
  // Every URL ends in "/" (e.g. /tier-list/). build.format "directory" emits
  // tier-list/index.html, which Workers "auto-trailing-slash" serves at /tier-list/
  // and 307-redirects /tier-list -> /tier-list/.
  trailingSlash: 'always',
  build: { format: 'directory' },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', zh: 'zh-Hans' },
      },
      serialize(item) {
        const lastmod = LASTMOD.get(new URL(item.url).pathname);
        if (lastmod) item.lastmod = lastmod;
        // x-default = EN version, matching the hreflang tags in BaseLayout.
        // Copy the array: the plugin shares one links array between a page and its counterpart.
        const en = item.links?.find((l) => l.lang === 'en');
        if (item.links && en && !item.links.some((l) => l.lang === 'x-default')) {
          item.links = [...item.links, { lang: 'x-default', url: en.url }];
        }
        return item;
      },
    }),
  ],
});
