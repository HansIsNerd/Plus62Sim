export type CardColor = 'coral' | 'sunny' | 'teal';

export type CardIconName =
  | 'drumstick'
  | 'moon'
  | 'flame'
  | 'hammer'
  | 'coins'
  | 'users'
  | 'wheat'
  | 'ship'
  | 'music'
  | 'briefcase'
  | 'coffee'
  | 'laptop';

export interface Stats {
  money: number;
  energy: number;
  mental: number;
}

export interface CardDef {
  defId: string;
  title: string;
  description: string;
  icon: CardIconName;
  color: CardColor;
  effect: Partial<Stats>;
}

export interface Card extends CardDef {
  /** ID unik per instance kartu di deck */
  id: string;
}

export type GameSpeed = 0.5 | 1 | 2;