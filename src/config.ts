/**
 * Site-wide configuration. Edit values here, not in components.
 */

import type { Locale } from './i18n';

/**
 * URL of the game loaded by <GameEmbed> and linked from "open in a new tab", per locale.
 * The official site defaults to Spanish at / (html lang="es") and serves English at /en/.
 * NOTE: Chinese pages embed the /en/ URL on purpose: the game has no Chinese UI.
 * The game on mobile is landscape-only.
 */
export const GAME_EMBED_URLS: Record<Locale, string> = {
  en: 'https://pokesurvivor.com/en/',
  zh: 'https://pokesurvivor.com/en/',
  es: 'https://pokesurvivor.com/',
};

/** Default (English) game URL. */
export const GAME_EMBED_URL = GAME_EMBED_URLS.en;

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
  description: {
    en:
      'Free, non-profit fan-made Pokémon survivors-like in the style of Survivor.io and Vampire Survivors. ' +
      'You only move; your partner Pokémon attacks automatically. 966 Pokémon, 18 rift arenas, online co-op for up to 4 players.',
    zh:
      '免费、非营利的宝可梦同人幸存者类游戏，风格类似 Survivor.io 和 Vampire Survivors。' +
      '你只需移动，伙伴宝可梦会自动攻击。收录 966 只宝可梦、18 个裂隙竞技场，支持最多 4 人在线合作。',
    es:
      'Juego fan gratuito y sin ánimo de lucro de Pokémon estilo survivors, al estilo de Survivor.io o Vampire Survivors. ' +
      'Solo te mueves: tu Pokémon compañero ataca por su cuenta. 966 Pokémon, 18 arenas de grietas y cooperativo online para hasta 4 jugadores.',
  } satisfies Record<Locale, string>,
  genre: ['Action', 'Roguelike', 'Survivors-like'],
  /** The game UI ships in English and Spanish only (content-spec §5). */
  languages: ['en', 'es'],
  maxPlayers: 4,
} as const;

export const SITE_NAME = 'Poke Survivor Online';

/** This site's source repository. */
export const SITE_REPO = 'https://github.com/DbIs666/pokesurvivor';

/** Byline and Article JSON-LD author, per locale. */
export const AUTHOR = { en: 'PokeSurvivor Fans', zh: 'PokeSurvivor 爱好者', es: 'Fans de PokeSurvivor' } as const;

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
