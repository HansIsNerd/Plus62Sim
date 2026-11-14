export type CardTag = 'food' | 'health' | 'wealth';

export interface Card {
  id: string;
  name: string;
  tag: CardTag;
  effects: {
    food?: number;
    health?: number;
    wealth?: number;
  };
}

export const STARTER_DECK: Card[] = [
  { id: 'makan', name: 'Makan', tag: 'food', effects: { food: 15, wealth: -5 } },
  { id: 'berburu', name: 'Berburu', tag: 'food', effects: { food: 20, health: -8 } },
  { id: 'olahraga', name: 'Olahraga', tag: 'health', effects: { health: 12, food: -8 } },
  { id: 'istirahat', name: 'Istirahat', tag: 'health', effects: { health: 15, food: -5 } },
  { id: 'obat', name: 'Obat Herbal', tag: 'health', effects: { health: 20, wealth: -10 } },
  { id: 'kerja', name: 'Kerja', tag: 'wealth', effects: { wealth: 15, health: -6, food: -4 } },
  { id: 'dagang', name: 'Dagang', tag: 'wealth', effects: { wealth: 20, food: -8 } },
  { id: 'menabung', name: 'Menabung', tag: 'wealth', effects: { wealth: 10, food: -2 } },
];