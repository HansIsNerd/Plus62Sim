export type CardTag = 'work' | 'rest' | 'social' | 'learn' | 'survive';

export interface Card {
  id: string;
  title: string;
  description: string;
  tag: CardTag;
}