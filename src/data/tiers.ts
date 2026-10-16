/**
 * Tier list data. Edit this file to update the tier table.
 *
 * Source: starting moves and base stats from the game client data
 * (https://pokesurvivor.com/js/app.min.js, read 2026-10-14 and 2026-10-16)
 * and move evolutions from https://pokesurvivor.com/en/moves/. Tiers are our
 * own assessment, not a community or official ranking.
 */
export type Tier = 'S' | 'A' | 'B' | 'C';
export type Phase = 'early' | 'mid' | 'late';

export const TIERS: Tier[] = ['S', 'A', 'B', 'C'];
export const PHASES: Phase[] = ['early', 'mid', 'late'];

export interface TierEntry {
  /** stable id, also used for future image lookup */
  id: string;
  /** zh: official Simplified Chinese Pokémon name; es: English species name (by design, not translated) */
  name: { en: string; zh: string; es: string };
  /** tier per game phase */
  tiers: Record<Phase, Tier>;
  note?: { en: string; zh: string; es: string };
  move: MoveId;
  /** sprite path under /public (PMD SpriteCollab portrait, CC BY-NC 4.0) */
  sprite: string;
}

/**
 * Starters left out of the ranking because their starting move isn't confirmed.
 * Empty since 2026-10-16 (all 29 starters ranked); TierTable hides the row when empty.
 */
export const UNRANKED: { id: string; name: { en: string; zh: string; es: string }; sprite: string }[] = [];

/** Sprite credit (required by CC BY-NC 4.0). */
export const SPRITE_CREDIT = {
  url: 'https://sprites.pmdcollab.org/',
  license: 'https://creativecommons.org/licenses/by-nc/4.0/',
};

/** Level-up card labels; es from the game client and https://pokesurvivor.com/movimientos/. */
const CARD = {
  power: { en: 'Power', zh: 'Power', es: 'Potencia' },
  sprint: { en: 'Sprint', zh: 'Sprint', es: 'Carrera' },
  reflexes: { en: 'Reflexes', zh: 'Reflexes', es: 'Reflejos' },
};

export type MoveId = 'water-gun' | 'ember' | 'vine-whip' | 'bubble' | 'razor-leaf' | 'confusion';

/**
 * Starting moves and their evolutions, from https://pokesurvivor.com/en/moves/ (checked 2026-10-14).
 * es: the game's Spanish labels from https://pokesurvivor.com/movimientos/ (checked 2026-10-16).
 */
export const MOVES: Record<MoveId, {
  name: { en: string; zh: string; es: string };
  evolution: { en: string; zh: string; es: string };
  /** level-up card needed to evolve (zh keeps the English label, as the zh pages refer to the English game UI) */
  card: { en: string; zh: string; es: string };
  /** what the evolution adds, per the official moves list */
  effect: { en: string; zh: string; es: string };
  /** our move tier, same S-C scale as the partner table */
  tier: Tier;
}> = {
  'water-gun': { name: { en: 'Water Gun', zh: '水枪', es: 'Pistola Agua' }, evolution: { en: 'Scald', zh: '热水', es: 'Escaldar' }, card: CARD.power, effect: { en: '×1.8 damage, +2 projectiles, +2 pierce, bigger', zh: '伤害 ×1.8，+2 发弹道，+2 穿透，体积更大', es: '×1,8 daño, +2 proyectiles, +2 perforación y más grandes' }, tier: 'S' },
  'vine-whip': { name: { en: 'Vine Whip', zh: '藤鞭', es: 'Látigo Cepa' }, evolution: { en: 'Power Whip', zh: '强力鞭打', es: 'Latigazo' }, card: CARD.power, effect: { en: '×1.9 damage, more range, hits in 360°', zh: '伤害 ×1.9，射程更远，360° 攻击', es: '×1,9 daño, más alcance y golpea en 360°' }, tier: 'S' },
  ember: { name: { en: 'Ember', zh: '火花', es: 'Ascuas' }, evolution: { en: 'Fire Blast', zh: '大字爆炎', es: 'Llamarada' }, card: CARD.power, effect: { en: '×1.8 damage, +2 projectiles, +2 pierce, bigger', zh: '伤害 ×1.8，+2 发弹道，+2 穿透，体积更大', es: '×1,8 daño, +2 proyectiles, +2 perforación y más grandes' }, tier: 'A' },
  bubble: { name: { en: 'Bubble', zh: '泡沫', es: 'Burbuja' }, evolution: { en: 'Surf', zh: '冲浪', es: 'Surf' }, card: CARD.sprint, effect: { en: '+6 projectiles, ×1.6 damage, +1 pierce', zh: '+6 发弹道，伤害 ×1.6，+1 穿透', es: '+6 proyectiles, ×1,6 daño y +1 perforación' }, tier: 'A' },
  'razor-leaf': { name: { en: 'Razor Leaf', zh: '飞叶快刀', es: 'Hoja Afilada' }, evolution: { en: 'Leaf Storm', zh: '飞叶风暴', es: 'Lluevehojas' }, card: CARD.reflexes, effect: { en: '×1.8 damage, +1 boomerang, more range', zh: '伤害 ×1.8，+1 回旋叶片，射程更远', es: '×1,8 daño, +1 bumerán y más alcance' }, tier: 'B' },
  confusion: { name: { en: 'Confusion', zh: '念力', es: 'Confusión' }, evolution: { en: 'Psyshock', zh: '精神冲击', es: 'Psicocarga' }, card: CARD.reflexes, effect: { en: '×1.8 damage, +2 projectiles, +2 pierce, bigger', zh: '伤害 ×1.8，+2 发弹道，+2 穿透，体积更大', es: '×1,8 daño, +2 proyectiles, +2 perforación y más grandes' }, tier: 'B' },
};

/** Date the tier data was last reviewed (YYYY-MM-DD). */
export const TIER_LIST_UPDATED = '2026-10-16';

type Row = [id: string, move: MoveId, en: string, zh: string, early: Tier, mid: Tier, late: Tier, noteEn: string, noteZh: string, noteEs: string];

const ROWS: Row[] = [
  // Water Gun -> Scald (Power card)
  ['mudkip', 'water-gun', 'Mudkip', '水跃鱼', 'S', 'S', 'A', 'Water Gun; atk multiplier 1.08', '水枪；攻击倍率 1.08', 'Pistola Agua; multiplicador de ataque 1,08'],
  ['sobble', 'water-gun', 'Sobble', '泪眼蜥', 'S', 'S', 'A', 'Water Gun; atk multiplier 1.08', '水枪；攻击倍率 1.08', 'Pistola Agua; multiplicador de ataque 1,08'],
  ['froakie', 'water-gun', 'Froakie', '呱呱泡蛙', 'A', 'S', 'S', 'Water Gun; fastest starter (speed 108)', '水枪；速度最快（108）', 'Pistola Agua; el inicial más rápido (velocidad 108)'],
  ['totodile', 'water-gun', 'Totodile', '小锯鳄', 'A', 'S', 'A', 'Water Gun', '水枪', 'Pistola Agua'],
  ['oshawott', 'water-gun', 'Oshawott', '水水獭', 'A', 'S', 'A', 'Water Gun', '水枪', 'Pistola Agua'],
  ['quaxly', 'water-gun', 'Quaxly', '润水鸭', 'A', 'S', 'A', 'Water Gun', '水枪', 'Pistola Agua'],
  ['squirtle', 'water-gun', 'Squirtle', '杰尼龟', 'A', 'S', 'A', 'Water Gun; low atk multiplier (0.97)', '水枪；攻击倍率偏低（0.97）', 'Pistola Agua; multiplicador de ataque bajo (0,97)'],
  // Vine Whip -> Power Whip (Power card)
  ['bulbasaur', 'vine-whip', 'Bulbasaur', '妙蛙种子', 'A', 'S', 'A', 'Vine Whip', '藤鞭', 'Látigo Cepa'],
  ['chikorita', 'vine-whip', 'Chikorita', '菊草叶', 'A', 'S', 'A', 'Vine Whip', '藤鞭', 'Látigo Cepa'],
  ['turtwig', 'vine-whip', 'Turtwig', '草苗龟', 'A', 'S', 'A', 'Vine Whip', '藤鞭', 'Látigo Cepa'],
  ['grookey', 'vine-whip', 'Grookey', '敲音猴', 'A', 'S', 'A', 'Vine Whip', '藤鞭', 'Látigo Cepa'],
  ['chespin', 'vine-whip', 'Chespin', '哈力栗', 'A', 'S', 'A', 'Vine Whip', '藤鞭', 'Látigo Cepa'],
  // Bubble -> Surf (Sprint card)
  ['popplio', 'bubble', 'Popplio', '球球海狮', 'A', 'A', 'A', 'Bubble (slows enemies)', '泡沫（减速敌人）', 'Burbuja (ralentiza a los enemigos)'],
  ['piplup', 'bubble', 'Piplup', '波加曼', 'A', 'A', 'A', 'Bubble (slows enemies); HP 94', '泡沫（减速敌人）；HP 94', 'Burbuja (ralentiza a los enemigos); 94 PS'],
  // Ember -> Fire Blast (Power card)
  ['scorbunny', 'ember', 'Scorbunny', '炎兔儿', 'A', 'A', 'A', 'Ember; highest atk multiplier (1.09)', '火花；攻击倍率最高（1.09）', 'Ascuas; el multiplicador de ataque más alto (1,09)'],
  ['torchic', 'ember', 'Torchic', '火稚鸡', 'A', 'A', 'A', 'Ember; atk multiplier 1.08', '火花；攻击倍率 1.08', 'Ascuas; multiplicador de ataque 1,08'],
  ['fuecoco', 'ember', 'Fuecoco', '呆火鳄', 'B', 'A', 'A', 'Ember; HP 100', '火花；HP 100', 'Ascuas; 100 PS'],
  ['charmander', 'ember', 'Charmander', '小火龙', 'B', 'A', 'B', 'Ember', '火花', 'Ascuas'],
  ['cyndaquil', 'ember', 'Cyndaquil', '火球鼠', 'B', 'A', 'B', 'Ember', '火花', 'Ascuas'],
  ['chimchar', 'ember', 'Chimchar', '小火焰猴', 'B', 'A', 'B', 'Ember', '火花', 'Ascuas'],
  ['tepig', 'ember', 'Tepig', '暖暖猪', 'B', 'A', 'B', 'Ember', '火花', 'Ascuas'],
  ['fennekin', 'ember', 'Fennekin', '火狐狸', 'B', 'A', 'B', 'Ember', '火花', 'Ascuas'],
  ['litten', 'ember', 'Litten', '火斑喵', 'B', 'A', 'B', 'Ember', '火花', 'Ascuas'],
  // Razor Leaf -> Leaf Storm (Reflexes card)
  ['treecko', 'razor-leaf', 'Treecko', '木守宫', 'B', 'B', 'B', 'Razor Leaf', '飞叶快刀', 'Hoja Afilada'],
  ['snivy', 'razor-leaf', 'Snivy', '藤藤蛇', 'B', 'B', 'B', 'Razor Leaf', '飞叶快刀', 'Hoja Afilada'],
  ['rowlet', 'razor-leaf', 'Rowlet', '木木枭', 'B', 'B', 'B', 'Razor Leaf', '飞叶快刀', 'Hoja Afilada'],
  ['sprigatito', 'razor-leaf', 'Sprigatito', '新叶喵', 'B', 'B', 'B', 'Razor Leaf', '飞叶快刀', 'Hoja Afilada'],
  // Confusion -> Psyshock (Reflexes card)
  ['slowpoke', 'confusion', 'Slowpoke', '呆呆兽', 'B', 'B', 'C', 'Confusion; HP 110 but slowest (speed 84)', '念力；HP 110 但速度最慢（84）', 'Confusión; 110 PS, pero es el más lento (velocidad 84)'],
  ['psyduck', 'confusion', 'Psyduck', '可达鸭', 'B', 'B', 'B', 'Confusion; faster than Slowpoke (speed 101)', '念力；比呆呆兽快（速度 101）', 'Confusión; más rápido que Slowpoke (velocidad 101)'],
];

export const TIER_ENTRIES: TierEntry[] = ROWS.map(([id, move, en, zh, early, mid, late, noteEn, noteZh, noteEs]) => ({
  id,
  // es uses the English species name by design.
  name: { en, zh, es: en },
  move,
  tiers: { early, mid, late },
  note: { en: noteEn, zh: noteZh, es: noteEs },
  sprite: `/sprites/${id}.png`,
}));
