# Brief for Spanish translators (internal)

Project: D:\code\aitools\pokesurvivor (Astro). Spanish locale `es` lives under /es/. Placeholder English copies are marked `TODO-ES`.

Mandatory rules:
1. Read docs/i18n/es-glossary.md in full first. It is binding: game UI labels (Spain Pokémon localization), style guide (neutral Spanish, tú, no vosotros, «comillas», decimal comma, sentence-case titles), species exceptions, keyword map with per-page title/description.
2. Read docs/content-spec.md for facts. The English source is src/content/pages/en/<page>.md. Also read the zh version for context only.
3. Do NOT translate word-for-word. Write natural Spanish a native Spanish-speaking gamer would write; restructure sentences freely, keep every fact, link, image, component marker (e.g. `<!-- game -->`, `<!-- move-table -->`), heading hierarchy, FAQ count and frontmatter keys. Keep `updated`/`published` dates as in EN.
4. Verify facts: any claim you rely on (UI label, move name, number, rift name, control) must match the glossary or a source you fetch now (https://pokesurvivor.com/ Spanish pages, /guia/, /movimientos/, /legendarios/, /tipos/, /pokedex/, client JS https://pokesurvivor.com/js/app.min.js, WikiDex). If EN copy and the Spanish game disagree, follow the game and note it in your report. Never invent facts.
5. Internal links: EN paths like `/tier-list/` must become `/es/tier-list/`. Links to the official game from ES pages use Spanish pages (https://pokesurvivor.com/, /guia/, /movimientos/ …) when such a page exists — verify with curl it returns 200.
6. SEO: use the page's primary/secondary keywords from the glossary keyword map naturally (title, H1/heading, first paragraph, one H2, description, alt text). title ≤60 chars, description ≤155 chars (count with a script). Image alt text in Spanish, descriptive. FAQ answers self-contained.
7. LatAm names: per glossary, on first mention per page, add the Hispanoamérica name in parentheses where it differs; never alone.
8. Remove the `# TODO-ES` comment line when done. Only edit the files assigned to you.
9. After editing run `npm run build` (other agents may be editing concurrently; if build fails in a file you don't own, just report it). Report: files done, facts you verified and where, any discrepancies between EN copy and the game, anything UNVERIFIED.
