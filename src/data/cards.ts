export type CardTag = 'survival' | 'ekonomi' | 'risiko';

export interface Effects {
  food: number;
  health: number;
  wealth: number;
}

export interface Card {
  id: string;
  name: string;
  tag: CardTag;
  effects: Effects;
}

export const STARTER_DECK: Card[] = [
  {
    id: 'berburu',
    name: 'Berburu',
    tag: 'risiko',
    effects: { food: 18, health: -6, wealth: 0 },
  },
  {
    id: 'bertani',
    name: 'Bertani',
    tag: 'survival',
    effects: { food: 14, health: 0, wealth: 3 },
  },
  {
    id: 'istirahat',
    name: 'Istirahat',
    tag: 'survival',
    effects: { food: -2, health: 14, wealth: 0 },
  },
  {
    id: 'berdagang',
    name: 'Berdagang',
    tag: 'ekonomi',
    effects: { food: -4, health: 0, wealth: 16 },
  },
  {
    id: 'menempa',
    name: 'Menempa',
    tag: 'ekonomi',
    effects: { food: -5, health: -3, wealth: 12 },
  },
  {
    id: 'api-unggun',
    name: 'Api Unggun',
    tag: 'risiko',
    effects: { food: 6, health: 8, wealth: 0 },
  },
];