# pokesurvivor

Unofficial fan wiki and game-embed site for the browser game PokeSurvivor.
Astro (static output) + TypeScript + plain CSS, deployed to Cloudflare Workers Static Assets.

## Commands

| Command | What it does |
| --- | --- |
| `npm install` | Install pinned dependencies |
| `npm run dev` | Astro dev server (http://localhost:4321) |
| `npm run build` | Build static site into `dist/` |
| `npm run check` | Type-check `.astro` / `.ts` files |
| `npm run preview` | Build, then serve `dist/` with `wrangler dev` (real Workers asset handling) |
| `npm run deploy` | Build, then `wrangler deploy` (needs `wrangler login`) |

## Configuration

- Site URL: `site` in `astro.config.mjs` (`https://poke-survivor.online`, overridable with `SITE_URL`). Canonical URLs, hreflang, Open Graph, sitemap and robots.txt all derive from it.
- Game iframe URL: `GAME_EMBED_URL` in `src/config.ts` (`https://pokesurvivor.com/en/`). Chinese pages embed the same `/en/` URL because the game has no Chinese UI. iframe permissions: `GAME_EMBED_ALLOW` in the same file.
- Workers: `wrangler.jsonc` (name `pokesurvivor`, assets from `./dist`, `404-page`, `auto-trailing-slash`). No Worker script.

## Trailing slashes

All URLs end with `/` (`trailingSlash: 'always'`, `build.format: 'directory'`). Pages are emitted as `tier-list/index.html`; Workers `auto-trailing-slash` serves `/tier-list/` and 307-redirects `/tier-list` to it. Always link with the trailing slash (use paths from `src/i18n.ts`).

## i18n

English at `/`, Simplified Chinese at `/zh/` (`<html lang="zh-Hans">`). Routes, nav order and UI strings live in `src/i18n.ts`. hreflang (`en`, `zh-Hans`, `x-default` = EN) is emitted only when a page exists in both locales. To add a page: add it to `ROUTES` and `NAV`, create `src/pages/[zh/]<key>.astro` (copy an existing one) and its Markdown files.

## Editing content

Page copy is Markdown, one file per page per locale. Writers do not need to touch layouts.

```
src/content/pages/en/<key>.md     -> /<key>/      (home.md -> /)
src/content/pages/zh/<key>.md     -> /zh/<key>/   (home.md -> /zh/)
keys: home, tier-list, best-pokemon, how-to-play, co-op, rifts, mobile
```

Frontmatter (schema in `src/content.config.ts`):

- `title` (required): `<title>` / og:title
- `description` (required): meta description
- `heading`: visible H1 (defaults to `title`)
- `updated`: `YYYY-MM-DD`, shown as "Last updated" and used in Article JSON-LD
- `faq`: list of `{ q, a }`; rendered on page and emitted as FAQPage JSON-LD
- `gameCard` (inner pages, default `true`): show the compact "play the game" card

Home page (`home.md`): the Markdown body is split on a line containing only `<!-- game -->`. Text before the marker is shown above the game iframe (keep it short: what it is, controls); text after it is shown below the iframe. Both parts are full Markdown (H2, lists, tables, links). Use at most one marker; without one, everything goes above the iframe.

Tier list data: `src/data/tiers.ts` (entries, per-phase tiers S/A/B/C, `TIER_LIST_UPDATED`).

UI chrome text (nav labels, disclaimer, buttons): `src/i18n.ts`.

## Structure

```
astro.config.mjs        site URL, i18n, sitemap, trailing slash
wrangler.jsonc          Workers Static Assets config
public/                 favicon.svg, og-default.png (placeholder)
src/config.ts           game URL, site name, OG image
src/i18n.ts             routes, nav, UI strings
src/content.config.ts   content collection schema
src/content/pages/      page copy (en/, zh/)
src/data/tiers.ts       tier list data
src/layouts/            BaseLayout (head/SEO/header/footer), PageLayout (inner pages)
src/components/         Header, Footer, Breadcrumb, JsonLd, Faq, LastUpdated,
                        GameEmbed, GameLinkCard, TierTable, HomePage, ContentPage
src/pages/              thin route files + 404.astro + robots.txt.ts
src/styles/global.css   all styles (mobile-first, system fonts)
```

`GameEmbed` can be dropped onto any page (`<GameEmbed locale="en" />`, lazy-loaded unless `eager`). On screens under 768px it shows a prominent "open in new tab" button above the iframe (the game is landscape-only on mobile).
