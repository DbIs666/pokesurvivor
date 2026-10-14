/**
 * Tier list data. Edit this file to update the tier table.
 *
 * Source: starting moves and base stats from the game client data
 * (https://pokesurvivor.com/js/app.min.js, read 2026-10-14) and move
 * evolutions from https://pokesurvivor.com/en/moves/. Tiers are our own
 * assessment, not a community or official ranking.
 *
 * Not ranked (starting move not exposed in client data): Squirtle, Psyduck,
 * Piplup, Chespin.
 */
export type Tier = 'S' | 'A' | 'B' | 'C';
export type Phase = 'early' | 'mid' | 'late';

export const TIERS: Tier[] = ['S', 'A', 'B', 'C'];
export const PHASES: Phase[] = ['early', 'mid', 'late'];

export interface TierEntry {
  /** stable id, also used for future image lookup */
  id: string;
  /** zh: official Simplified Chinese Pokémon name */
  name: { en: string; zh: string };
  /** tier per game phase */
  tiers: Record<Phase, Tier>;
  note?: { en: string; zh: string };
  move: MoveId;
  /** sprite path under /public (PMD SpriteCollab portrait, CC BY-NC 4.0) */
  sprite: string;
}

/** Starters left out of the ranking because their starting move isn't in client data. */
export const UNRANKED: { id: string; name: { en: string; zh: string }; sprite: string }[] = [
  ['squirtle', 'Squirtle', '杰尼龟'],
  ['psyduck', 'Psyduck', '可达鸭'],
  ['piplup', 'Piplup', '波加曼'],
  ['chespin', 'Chespin', '哈力栗'],
].map(([id, en, zh]) => ({ id, name: { en, zh }, sprite: `/sprites/${id}.png` }));

/** Sprite credit (required by CC BY-NC 4.0). */
export const SPRITE_CREDIT = {
  url: 'https://sprites.pmdcollab.org/',
  license: 'https://creativecommons.org/licenses/by-nc/4.0/',
};

export type MoveId = 'water-gun' | 'ember' | 'vine-whip' | 'bubble' | 'razor-leaf' | 'confusion';

/** Starting moves and their evolutions, from https://pokesurvivor.com/en/moves/ (checked 2026-10-14). */
export const MOVES: Record<MoveId, {
  name: { en: string; zh: string };
  evolution: { en: string; zh: string };
  card: string;
  /** what the evolution adds, per the official moves list */
  effect: { en: string; zh: string };
  /** our move tier, same S-C scale as the partner table */
  tier: Tier;
}> = {
  'water-gun': { name: { en: 'Water Gun', zh: '水枪' }, evolution: { en: 'Scald', zh: '热水' }, card: 'Power', effect: { en: '×1.8 damage, +2 projectiles, +2 pierce, bigger', zh: '伤害 ×1.8，+2 发弹道，+2 穿透，体积更大' }, tier: 'S' },
  'vine-whip': { name: { en: 'Vine Whip', zh: '藤鞭' }, evolution: { en: 'Power Whip', zh: '强力鞭打' }, card: 'Power', effect: { en: '×1.9 damage, more range, hits in 360°', zh: '伤害 ×1.9，射程更远，360° 攻击' }, tier: 'S' },
  ember: { name: { en: 'Ember', zh: '火花' }, evolution: { en: 'Fire Blast', zh: '大字爆炎' }, card: 'Power', effect: { en: '×1.8 damage, +2 projectiles, +2 pierce, bigger', zh: '伤害 ×1.8，+2 发弹道，+2 穿透，体积更大' }, tier: 'A' },
  bubble: { name: { en: 'Bubble', zh: '泡沫' }, evolution: { en: 'Surf', zh: '冲浪' }, card: 'Sprint', effect: { en: '+6 projectiles, ×1.6 damage, +1 pierce', zh: '+6 发弹道，伤害 ×1.6，+1 穿透' }, tier: 'A' },
  'razor-leaf': { name: { en: 'Razor Leaf', zh: '飞叶快刀' }, evolution: { en: 'Leaf Storm', zh: '飞叶风暴' }, card: 'Reflexes', effect: { en: '×1.8 damage, +1 boomerang, more range', zh: '伤害 ×1.8，+1 回旋叶片，射程更远' }, tier: 'B' },
  confusion: { name: { en: 'Confusion', zh: '念力' }, evolution: { en: 'Psyshock', zh: '精神冲击' }, card: 'Reflexes', effect: { en: '×1.8 damage, +2 projectiles, +2 pierce, bigger', zh: '伤害 ×1.8，+2 发弹道，+2 穿透，体积更大' }, tier: 'B' },
};

/** Date the tier data was last reviewed (YYYY-MM-DD). */
export const TIER_LIST_UPDATED = '2026-10-14';

type Row = [id: string, move: MoveId, en: string, zh: string, early: Tier, mid: Tier, late: Tier, noteEn: string, noteZh: string];

const ROWS: Row[] = [
  // Water Gun -> Scald (Power card)
  ['mudkip', 'water-gun', 'Mudkip', '水跃鱼', 'S', 'S', 'A', 'Water Gun; atk multiplier 1.08', '水枪；攻击倍率 1.08'],
  ['sobble', 'water-gun', 'Sobble', '泪眼蜥', 'S', 'S', 'A', 'Water Gun; atk multiplier 1.08', '水枪；攻击倍率 1.08'],
  ['froakie', 'water-gun', 'Froakie', '呱呱泡蛙', 'A', 'S', 'S', 'Water Gun; fastest starter (speed 108)', '水枪；速度最快（108）'],
  ['totodile', 'water-gun', 'Totodile', '小锯鳄', 'A', 'S', 'A', 'Water Gun', '水枪'],
  ['oshawott', 'water-gun', 'Oshawott', '水水獭', 'A', 'S', 'A', 'Water Gun', '水枪'],
  ['quaxly', 'water-gun', 'Quaxly', '润水鸭', 'A', 'S', 'A', 'Water Gun', '水枪'],
  // Vine Whip -> Power Whip (Power card)
  ['bulbasaur', 'vine-whip', 'Bulbasaur', '妙蛙种子', 'A', 'S', 'A', 'Vine Whip', '藤鞭'],
  ['chikorita', 'vine-whip', 'Chikorita', '菊草叶', 'A', 'S', 'A', 'Vine Whip', '藤鞭'],
  ['turtwig', 'vine-whip', 'Turtwig', '草苗龟', 'A', 'S', 'A', 'Vine Whip', '藤鞭'],
  ['grookey', 'vine-whip', 'Grookey', '敲音猴', 'A', 'S', 'A', 'Vine Whip', '藤鞭'],
  // Bubble -> Surf (Sprint card)
  ['popplio', 'bubble', 'Popplio', '球球海狮', 'A', 'A', 'A', 'Bubble (slows enemies)', '泡沫（减速敌人）'],
  // Ember -> Fire Blast (Power card)
  ['scorbunny', 'ember', 'Scorbunny', '炎兔儿', 'A', 'A', 'A', 'Ember; highest atk multiplier (1.09)', '火花；攻击倍率最高（1.09）'],
  ['torchic', 'ember', 'Torchic', '火稚鸡', 'A', 'A', 'A', 'Ember; atk multiplier 1.08', '火花；攻击倍率 1.08'],
  ['fuecoco', 'ember', 'Fuecoco', '呆火鳄', 'B', 'A', 'A', 'Ember; HP 100', '火花；HP 100'],
  ['charmander', 'ember', 'Charmander', '小火龙', 'B', 'A', 'B', 'Ember', '火花'],
  ['cyndaquil', 'ember', 'Cyndaquil', '火球鼠', 'B', 'A', 'B', 'Ember', '火花'],
  ['chimchar', 'ember', 'Chimchar', '小火焰猴', 'B', 'A', 'B', 'Ember', '火花'],
  ['tepig', 'ember', 'Tepig', '暖暖猪', 'B', 'A', 'B', 'Ember', '火花'],
  ['fennekin', 'ember', 'Fennekin', '火狐狸', 'B', 'A', 'B', 'Ember', '火花'],
  ['litten', 'ember', 'Litten', '火斑喵', 'B', 'A', 'B', 'Ember', '火花'],
  // Razor Leaf -> Leaf Storm (Reflexes card)
  ['treecko', 'razor-leaf', 'Treecko', '木守宫', 'B', 'B', 'B', 'Razor Leaf', '飞叶快刀'],
  ['snivy', 'razor-leaf', 'Snivy', '藤藤蛇', 'B', 'B', 'B', 'Razor Leaf', '飞叶快刀'],
  ['rowlet', 'razor-leaf', 'Rowlet', '木木枭', 'B', 'B', 'B', 'Razor Leaf', '飞叶快刀'],
  ['sprigatito', 'razor-leaf', 'Sprigatito', '新叶喵', 'B', 'B', 'B', 'Razor Leaf', '飞叶快刀'],
  // Confusion -> Psyshock (Reflexes card)
  ['slowpoke', 'confusion', 'Slowpoke', '呆呆兽', 'B', 'B', 'C', 'Confusion; HP 110 but slowest (speed 84)', '念力；HP 110 但速度最慢（84）'],
];

export const TIER_ENTRIES: TierEntry[] = ROWS.map(([id, move, en, zh, early, mid, late, noteEn, noteZh]) => ({
  id,
  name: { en, zh },
  move,
  tiers: { early, mid, late },
  note: { en: noteEn, zh: noteZh },
  sprite: `/sprites/${id}.png`,
}));
