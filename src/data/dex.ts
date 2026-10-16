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
  /** es: the game's Spanish name (= English name except for ES_NAMES) */
  name: { en: string; zh: string; es: string };
  region: RegionId;
  gen: number;
  types: DexType[];
  starter: boolean;
  legendary: boolean;
  sprite: string;
}

export type RegionId = 'kanto' | 'johto' | 'hoenn' | 'sinnoh' | 'unova' | 'kalos' | 'alola' | 'galar' | 'paldea';

/** es: names used on https://pokesurvivor.com/pokedex/ (Unova = Teselia, the official Spain name). */
export const REGIONS: { id: RegionId; gen: number; name: { en: string; zh: string; es: string } }[] = [
  { id: 'kanto', gen: 1, name: { en: 'Kanto', zh: '关都', es: 'Kanto' } },
  { id: 'johto', gen: 2, name: { en: 'Johto', zh: '城都', es: 'Johto' } },
  { id: 'hoenn', gen: 3, name: { en: 'Hoenn', zh: '丰缘', es: 'Hoenn' } },
  { id: 'sinnoh', gen: 4, name: { en: 'Sinnoh', zh: '神奥', es: 'Sinnoh' } },
  { id: 'unova', gen: 5, name: { en: 'Unova', zh: '合众', es: 'Teselia' } },
  { id: 'kalos', gen: 6, name: { en: 'Kalos', zh: '卡洛斯', es: 'Kalos' } },
  { id: 'alola', gen: 7, name: { en: 'Alola', zh: '阿罗拉', es: 'Alola' } },
  { id: 'galar', gen: 8, name: { en: 'Galar', zh: '伽勒尔', es: 'Galar' } },
  { id: 'paldea', gen: 9, name: { en: 'Paldea', zh: '帕底亚', es: 'Paldea' } },
];

/** Type names and badge colours (dark text is readable on every colour). */
// es: official Spanish type names, as on https://pokesurvivor.com/pokedex/ and /tipos/.
export const TYPES: Record<DexType, { zh: string; es: string; color: string }> = {
  Normal: { zh: '一般', es: 'Normal', color: '#c6c0b4' },
  Fire: { zh: '火', es: 'Fuego', color: '#ff9a5c' },
  Water: { zh: '水', es: 'Agua', color: '#6fb1ff' },
  Grass: { zh: '草', es: 'Planta', color: '#7ad67f' },
  Electric: { zh: '电', es: 'Eléctrico', color: '#ffd84a' },
  Ice: { zh: '冰', es: 'Hielo', color: '#8fe3e8' },
  Fighting: { zh: '格斗', es: 'Lucha', color: '#e8865c' },
  Poison: { zh: '毒', es: 'Veneno', color: '#cf8ad8' },
  Ground: { zh: '地面', es: 'Tierra', color: '#e0be7a' },
  Flying: { zh: '飞行', es: 'Volador', color: '#a9c4ff' },
  Psychic: { zh: '超能力', es: 'Psíquico', color: '#ff8fb6' },
  Bug: { zh: '虫', es: 'Bicho', color: '#b8d45a' },
  Rock: { zh: '岩石', es: 'Roca', color: '#cdb87a' },
  Ghost: { zh: '幽灵', es: 'Fantasma', color: '#a99ad8' },
  Dragon: { zh: '龙', es: 'Dragón', color: '#9a8cff' },
  Dark: { zh: '恶', es: 'Siniestro', color: '#a8968a' },
  Steel: { zh: '钢', es: 'Acero', color: '#bccad4' },
  Fairy: { zh: '妖精', es: 'Hada', color: '#ffb3dc' },
};

/**
 * The only species whose Spanish name differs from the English one
 * (all 966 names on https://pokesurvivor.com/pokedex/ compared, 2026-10-16).
 */
const ES_NAMES: Record<number, string> = {
  772: 'Código Cero', 984: 'Colmilargo', 985: 'Colagrito', 987: 'Melenaleteo', 988: 'Reptalada',
  989: 'Pelarena', 991: 'Ferrosaco', 992: 'Ferropalmas', 994: 'Ferropolilla', 995: 'Ferropúas',
  1005: 'Bramaluna', 1006: 'Ferropaladín', 1009: 'Ondulagua', 1010: 'Ferroverdor',
};

type Raw = { id: number; name: string; zh: string; region: RegionId; gen: number; types: DexType[]; tags: string[] };

export const DEX: DexEntry[] = (raw as Raw[]).map((r) => ({
  id: r.id,
  name: { en: r.name, zh: r.zh, es: ES_NAMES[r.id] ?? r.name },
  region: r.region,
  gen: r.gen,
  types: r.types,
  starter: r.tags.includes('Starter'),
  legendary: r.tags.includes('Legendary'),
  sprite: `/sprites/dex/${String(r.id).padStart(4, '0')}.png`,
}));

export const DEX_UPDATED = '2026-10-14';
