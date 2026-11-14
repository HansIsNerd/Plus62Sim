export type CardIconKey = 'fish' | 'hammer' | 'bed' | 'coins' | 'flame' | 'wheat';
export type CardColor = 'coral' | 'sunny' | 'teal';

export interface Effects {
  food: number;
  health: number;
  wealth: number;
}

export interface CardData {
  id: string;
  name: string;
  desc: string;
  icon: CardIconKey;
  color: CardColor;
  effects: Effects;
}

export interface HandCard {
  uid: string;
  card: CardData;
}

export type GameStatus = 'menu' | 'playing' | 'won' | 'lost';
export type GameSpeed = 0.5 | 1 | 2;