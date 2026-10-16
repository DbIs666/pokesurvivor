export type Locale = 'en' | 'zh' | 'es';

export const LOCALES: Locale[] = ['en', 'zh', 'es'];

/** BCP 47 tag used for <html lang> and hreflang. */
export const LANG_TAG: Record<Locale, string> = { en: 'en', zh: 'zh-Hans', es: 'es' };

/** Open Graph locale (og:locale / og:locale:alternate). */
export const OG_LOCALE: Record<Locale, string> = { en: 'en_US', zh: 'zh_CN', es: 'es_ES' };

export const LOCALE_LABEL: Record<Locale, string> = { en: 'English', zh: '简体中文', es: 'Español' };

export type RouteKey =
  | 'home'
  | 'tier-list'
  | 'best-pokemon'
  | 'how-to-play'
  | 'co-op'
  | 'rifts'
  | 'mobile'
  | 'pokedex';

/**
 * Single source of truth for routes. A key missing for a locale means that page
 * does not exist in that language (no hreflang / switcher falls back to home).
 * All paths end with "/" (trailingSlash: 'always').
 */
export const ROUTES: Record<RouteKey, Partial<Record<Locale, string>>> = {
  home: { en: '/', zh: '/zh/', es: '/es/' },
  'tier-list': { en: '/tier-list/', zh: '/zh/tier-list/', es: '/es/tier-list/' },
  'best-pokemon': { en: '/best-pokemon/', zh: '/zh/best-pokemon/', es: '/es/best-pokemon/' },
  'how-to-play': { en: '/how-to-play/', zh: '/zh/how-to-play/', es: '/es/how-to-play/' },
  'co-op': { en: '/co-op/', zh: '/zh/co-op/', es: '/es/co-op/' },
  rifts: { en: '/rifts/', zh: '/zh/rifts/', es: '/es/rifts/' },
  mobile: { en: '/mobile/', zh: '/zh/mobile/', es: '/es/mobile/' },
  pokedex: { en: '/pokedex/', zh: '/zh/pokedex/', es: '/es/pokedex/' },
};

/** Nav order per locale. */
export const NAV: Record<Locale, RouteKey[]> = {
  en: ['home', 'tier-list', 'pokedex', 'best-pokemon', 'how-to-play', 'co-op', 'rifts', 'mobile'],
  zh: ['home', 'tier-list', 'pokedex', 'best-pokemon', 'how-to-play', 'co-op', 'rifts', 'mobile'],
  es: ['home', 'tier-list', 'pokedex', 'best-pokemon', 'how-to-play', 'co-op', 'rifts', 'mobile'],
};

/** UI strings (chrome only; page copy lives in src/content/pages). */
export const UI = {
  en: {
    nav: {
      home: 'Home', 'tier-list': 'Tier List', 'best-pokemon': 'Best Starter',
      'how-to-play': 'How to Play', 'co-op': 'Co-op', rifts: 'Rifts', mobile: 'Mobile', pokedex: 'Pokédex',
    },
    skip: 'Skip to content',
    menu: 'Menu',
    mainNav: 'Main',
    breadcrumbHome: 'Home',
    breadcrumbLabel: 'Breadcrumb',
    langSwitch: 'Language',
    lastUpdated: 'Last updated',
    byline: 'By',
    fullscreen: 'Fullscreen',
    openNewTab: 'Open game in a new tab',
    playNow: 'Play PokeSurvivor now',
    playCardBody: 'Play the game in your browser on the home page, or open it in a new tab.',
    playCardBodyMobile: 'On a phone, open the official site in a new tab and turn your phone to landscape.',
    playOnHome: 'Play PokeSurvivor online free',
    landscapeHint: 'On mobile, rotate your device to landscape to play.',
    gameTitle: 'PokeSurvivor game',
    playGame: 'Play PokeSurvivor',
    tierCaption: 'PokeSurvivor partner tiers by game phase',
    footerLinks: 'Game links',
    footerGuides: 'Guides',
    officialSite: 'Official site (pokesurvivor.com)',
    itch: 'PokeSurvivor on itch.io',
    faq: 'FAQ',
    tier: 'Tier',
    phases: { early: 'Early game', mid: 'Mid game', late: 'Late game' },
    unranked: 'Not yet ranked',
    unrankedNote: 'Starting move not confirmed',
    spriteCredit: ['Sprites: ', ' portraits, licensed ', '.'],
    moveCaption: 'PokeSurvivor starting move tiers',
    moveCols: { move: 'Starting move', tier: 'Tier', evolution: 'Evolves into', card: 'Card needed', users: 'Used by' },
    toc: 'On this page',
    dex: {
      search: 'Search by name or number', type: 'Type', allTypes: 'All types',
      starter: 'Starter', legendary: 'Legendary', gen: 'Generation', count: 'Pokémon',
      shown: 'shown', none: 'No Pokémon match these filters.', top: 'Back to regions',
    },
    disclaimer:
      'Unofficial fan site. Not affiliated with, endorsed by or sponsored by Nintendo, Creatures Inc., GAME FREAK, The Pokémon Company, or the PokeSurvivor developer (jpter78). PokeSurvivor is created by jpter78. Pokémon and related names are trademarks of their respective owners. The game is played on its official site, pokesurvivor.com.',
    notFoundTitle: 'Page not found',
    notFoundBody: 'The page you are looking for does not exist.',
    backHome: 'Back to home',
  },
  zh: {
    nav: {
      home: '首页', 'tier-list': '强度榜', 'best-pokemon': '开局选择',
      'how-to-play': '玩法攻略', 'co-op': '多人合作', rifts: '裂隙', mobile: '手机版', pokedex: '图鉴',
    },
    skip: '跳到正文',
    menu: '菜单',
    mainNav: '主导航',
    breadcrumbHome: '首页',
    breadcrumbLabel: '面包屑导航',
    langSwitch: '语言',
    lastUpdated: '最后更新',
    byline: '作者',
    fullscreen: '全屏',
    openNewTab: '在新标签页打开游戏',
    playNow: '立即游玩 PokeSurvivor',
    playCardBody: '可在首页直接在浏览器中游玩，或在新标签页中打开游戏（游戏界面为英文）。',
    playCardBodyMobile: '手机上建议在新标签页打开官网，再把手机横过来（游戏界面为英文）。',
    playOnHome: '免下载在线玩 PokeSurvivor',
    landscapeHint: '手机上请将设备横屏后游玩。',
    gameTitle: 'PokeSurvivor 游戏',
    playGame: '开始游戏',
    tierCaption: 'PokeSurvivor 伙伴强度榜（按游戏阶段）',
    footerLinks: '游戏链接',
    footerGuides: '攻略导航',
    officialSite: '官方网站（pokesurvivor.com）',
    itch: 'itch.io 上的 PokeSurvivor',
    faq: '常见问题',
    tier: '等级',
    phases: { early: '前期', mid: '中期', late: '后期' },
    unranked: '暂未评级',
    unrankedNote: '初始招式未确认',
    spriteCredit: ['头像图片：', '，采用 ', ' 许可。'],
    moveCaption: 'PokeSurvivor 初始招式强度榜',
    moveCols: { move: '初始招式', tier: '等级', evolution: '进化后', card: '需要的强化卡', users: '使用者' },
    toc: '本页目录',
    dex: {
      search: '按名字或编号搜索', type: '属性', allTypes: '全部属性',
      starter: '开局', legendary: '传说', gen: '第', count: '只',
      shown: '只显示中', none: '没有符合筛选条件的宝可梦。', top: '返回地区导航',
    },
    disclaimer:
      '本站为非官方粉丝站，与任天堂、Creatures、GAME FREAK、The Pokémon Company 及 PokeSurvivor 开发者（jpter78）均无关联，也未获其认可或赞助。PokeSurvivor 由 jpter78 制作。宝可梦及相关名称为其各自所有者的商标。游戏请在官方网站 pokesurvivor.com 游玩。',
    notFoundTitle: '页面不存在',
    notFoundBody: '你访问的页面不存在。',
    backHome: '返回首页',
  },
  es: {
    nav: {
      home: 'Inicio', 'tier-list': 'Tier list', 'best-pokemon': 'Mejor inicial',
      'how-to-play': 'Cómo jugar', 'co-op': 'Cooperativo', rifts: 'Grietas', mobile: 'Móvil', pokedex: 'Pokédex',
    },
    skip: 'Saltar al contenido',
    menu: 'Menú',
    mainNav: 'Principal',
    breadcrumbHome: 'Inicio',
    breadcrumbLabel: 'Ruta de navegación',
    langSwitch: 'Idioma',
    lastUpdated: 'Última actualización',
    byline: 'Por',
    fullscreen: 'Pantalla completa',
    openNewTab: 'Abrir el juego en otra pestaña',
    playNow: 'Juega a PokeSurvivor ahora',
    playCardBody: 'Juega en el navegador desde la página de inicio o ábrelo en otra pestaña (el juego está en español).',
    playCardBodyMobile: 'En el móvil, abre la web oficial en otra pestaña y pon el teléfono en horizontal (el juego está en español).',
    playOnHome: 'Juega gratis a PokeSurvivor online',
    landscapeHint: 'En el móvil, gira el dispositivo y juega en horizontal.',
    gameTitle: 'Juego PokeSurvivor',
    playGame: 'Jugar a PokeSurvivor',
    tierCaption: 'Tier list de compañeros de PokeSurvivor por fase',
    footerLinks: 'Enlaces del juego',
    footerGuides: 'Guías',
    officialSite: 'Web oficial (pokesurvivor.com)',
    itch: 'PokeSurvivor en itch.io',
    faq: 'Preguntas frecuentes',
    tier: 'Tier',
    phases: { early: 'Fase inicial', mid: 'Fase media', late: 'Fase final' },
    unranked: 'Aún sin clasificar',
    unrankedNote: 'Movimiento inicial sin confirmar',
    // Rendered as: "Sprites: retratos de <PMD SpriteCollab>, con licencia <CC BY-NC 4.0>."
    spriteCredit: ['Sprites: retratos de ', ', con licencia ', '.'],
    moveCaption: 'Tier list de movimientos iniciales de PokeSurvivor',
    moveCols: { move: 'Movimiento inicial', tier: 'Tier', evolution: 'Evoluciona a', card: 'Carta necesaria', users: 'Lo usan' },
    toc: 'En esta página',
    dex: {
      search: 'Busca por nombre o número', type: 'Tipo', allTypes: 'Todos los tipos',
      // Rendered as: "Generación 1 · 151 Pokémon"
      starter: 'Inicial', legendary: 'Legendario', gen: 'Generación', count: 'Pokémon',
      shown: 'mostrados', none: 'Ningún Pokémon coincide con estos filtros.', top: 'Volver a las regiones',
    },
    disclaimer:
      'Sitio de fans no oficial. No está afiliado, patrocinado ni aprobado por Nintendo, Creatures Inc., GAME FREAK, The Pokémon Company ni el desarrollador de PokeSurvivor (jpter78). PokeSurvivor es obra de jpter78. Pokémon y los nombres relacionados son marcas de sus respectivos propietarios. El juego se juega en su web oficial, pokesurvivor.com.',
    notFoundTitle: 'Página no encontrada',
    notFoundBody: 'La página que buscas no existe.',
    backHome: 'Volver al inicio',
  },
} as const;

export function pathFor(key: RouteKey, locale: Locale): string | undefined {
  return ROUTES[key][locale];
}

/** Counterpart pages (for hreflang + language switcher). */
export function alternatesFor(key: RouteKey): { locale: Locale; path: string }[] {
  return LOCALES.flatMap((l) => {
    const p = ROUTES[key][l];
    return p ? [{ locale: l, path: p }] : [];
  });
}
