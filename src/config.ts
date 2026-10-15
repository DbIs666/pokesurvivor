/**
 * Site-wide configuration. Edit values here, not in components.
 */

/**
 * URL of the game loaded by <GameEmbed>.
 * NOTE: Chinese pages embed this same /en/ URL on purpose: the game has no
 * Chinese UI, so there is intentionally no GAME_URL_ZH.
 * The game on mobile is landscape-only.
 */
export const GAME_EMBED_URL = 'https://pokesurvivor.com/en/';

/** iframe `allow` permissions for the game. */
export const GAME_EMBED_ALLOW = 'autoplay; fullscreen; gamepad; clipboard-write';

/** Origin of the embedded game, for <link rel="preconnect"> on the home page. */
export const GAME_ORIGIN = new URL(GAME_EMBED_URL).origin;

/** The game itself (facts from docs/content-spec.md §1), used in footer links and VideoGame JSON-LD. */
export const GAME = {
  name: 'PokeSurvivor',
  url: 'https://pokesurvivor.com/',
  itchUrl: 'https://jpter78.itch.io/pokesurvivor',
  platform: 'Web browser',
  author: 'jpter78',
  /** VideoGame JSON-LD only. Facts from docs/content-spec.md §2 ([GUIDE], [ITCH]). */
  description:
    'Free, non-profit fan-made Pokémon survivors-like in the style of Survivor.io and Vampire Survivors. ' +
    'You only move; your partner Pokémon attacks automatically. 966 Pokémon, 18 rift arenas, online co-op for up to 4 players.',
  genre: ['Action', 'Roguelike', 'Survivors-like'],
  /** The game UI ships in English and Spanish only (content-spec §5). */
  languages: ['en', 'es'],
  maxPlayers: 4,
} as const;

export const SITE_NAME = 'Poke Survivor Online';

/** This site's source repository. */
export const SITE_REPO = 'https://github.com/DbIs666/pokesurvivor';

/** Byline and Article JSON-LD author, per locale. */
export const AUTHOR = { en: 'PokeSurvivor Fans', zh: 'PokeSurvivor 爱好者' } as const;

/** WebSite JSON-LD alternateName. */
export const SITE_ALT_NAMES = ['PokeSurvivor Online', 'Poke Survivor Guide'];

/** Square PNG logo (path under /public) for Article publisher.logo. */
export const PUBLISHER_LOGO = '/logo-512.png';

/** Appended to <title> only when the page title does not already mention PokeSurvivor. */
export const TITLE_SUFFIX = ' | PokeSurvivor';

/** Default Open Graph image (path under /public). */
export const DEFAULT_OG_IMAGE = '/og-default.png';
/** Pixel size of DEFAULT_OG_IMAGE (og:image:width/height). */
export const OG_IMAGE_SIZE = { width: 1200, height: 630 };
