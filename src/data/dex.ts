/**
 * Pokédex data: all 966 playable Pokémon.
 *
 * Source: the official Pokédex page https://pokesurvivor.com/en/pokedex/
 * (read 2026-10-14): which Pokémon are in the game, region, types and the
 * Starter / Legendary flags. English names are from PokéAPI where the official
 * page used Spanish names (e.g. "Código Cero" -> Type: Null). Simplified Chinese
 * names are from PokéAPI (pokemon_species_names, language 12).
 * Sprites: PMD SpriteCollab portraits (CC BY-NC 4.0) in /public/sprites/dex/<0000>.png.
 */
import raw from './dex.json';

export type DexType =
  | 'Normal' | 'Fire' | 'Water' | 'Grass' | 'Electric' | 'Ice' | 'Fighting' | 'Poison' | 'Ground'
  | 'Flying' | 'Psychic' | 'Bug' | 'Rock' | 'Ghost' | 'Dragon' | 'Dark' | 'Steel' | 'Fairy';

export interface DexEntry {
  /** National Pokédex number */
  id: number;
  name: { en: string; zh: string };
  region: RegionId;
  gen: number;
  types: DexType[];
  starter: boolean;
  legendary: boolean;
  sprite: string;
}

export type RegionId = 'kanto' | 'johto' | 'hoenn' | 'sinnoh' | 'unova' | 'kalos' | 'alola' | 'galar' | 'paldea';

export const REGIONS: { id: RegionId; gen: number; name: { en: string; zh: string } }[] = [
  { id: 'kanto', gen: 1, name: { en: 'Kanto', zh: '关都' } },
  { id: 'johto', gen: 2, name: { en: 'Johto', zh: '城都' } },
  { id: 'hoenn', gen: 3, name: { en: 'Hoenn', zh: '丰缘' } },
  { id: 'sinnoh', gen: 4, name: { en: 'Sinnoh', zh: '神奥' } },
  { id: 'unova', gen: 5, name: { en: 'Unova', zh: '合众' } },
  { id: 'kalos', gen: 6, name: { en: 'Kalos', zh: '卡洛斯' } },
  { id: 'alola', gen: 7, name: { en: 'Alola', zh: '阿罗拉' } },
  { id: 'galar', gen: 8, name: { en: 'Galar', zh: '伽勒尔' } },
  { id: 'paldea', gen: 9, name: { en: 'Paldea', zh: '帕底亚' } },
];

/** Type names and badge colours (dark text is readable on every colour). */
export const TYPES: Record<DexType, { zh: string; color: string }> = {
  Normal: { zh: '一般', color: '#c6c0b4' },
  Fire: { zh: '火', color: '#ff9a5c' },
  Water: { zh: '水', color: '#6fb1ff' },
  Grass: { zh: '草', color: '#7ad67f' },
  Electric: { zh: '电', color: '#ffd84a' },
  Ice: { zh: '冰', color: '#8fe3e8' },
  Fighting: { zh: '格斗', color: '#e8865c' },
  Poison: { zh: '毒', color: '#cf8ad8' },
  Ground: { zh: '地面', color: '#e0be7a' },
  Flying: { zh: '飞行', color: '#a9c4ff' },
  Psychic: { zh: '超能力', color: '#ff8fb6' },
  Bug: { zh: '虫', color: '#b8d45a' },
  Rock: { zh: '岩石', color: '#cdb87a' },
  Ghost: { zh: '幽灵', color: '#a99ad8' },
  Dragon: { zh: '龙', color: '#9a8cff' },
  Dark: { zh: '恶', color: '#a8968a' },
  Steel: { zh: '钢', color: '#bccad4' },
  Fairy: { zh: '妖精', color: '#ffb3dc' },
};

type Raw = { id: number; name: string; zh: string; region: RegionId; gen: number; types: DexType[]; tags: string[] };

export const DEX: DexEntry[] = (raw as Raw[]).map((r) => ({
  id: r.id,
  name: { en: r.name, zh: r.zh },
  region: r.region,
  gen: r.gen,
  types: r.types,
  starter: r.tags.includes('Starter'),
  legendary: r.tags.includes('Legendary'),
  sprite: `/sprites/dex/${String(r.id).padStart(4, '0')}.png`,
}));

export const DEX_UPDATED = '2026-10-14';
