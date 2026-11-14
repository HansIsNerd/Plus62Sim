import {
  Drumstick,
  BedDouble,
  Hammer,
  Utensils,
  Users,
  Leaf,
  type LucideIcon,
} from 'lucide-react';

export type CardColor = 'coral' | 'sunny' | 'teal';

export interface CardEffects {
  health?: number;
  food?: number;
  wealth?: number;
  mental?: number;
}

export interface Card {
  id: string;
  title: string;
  description: string;
  Icon: LucideIcon;
  color: CardColor;
  effects: CardEffects;
}

export const STARTER_DECK: Card[] = [
  {
    id: 'berburu',
    title: 'Berburu',
    description: 'Cari makanan di hutan.',
    Icon: Drumstick,
    color: 'coral',
    effects: { food: 25, health: -10, mental: -5 },
  },
  {
    id: 'istirahat',
    title: 'Istirahat',
    description: 'Tidur dan pulihkan pikiran.',
    Icon: BedDouble,
    color: 'teal',
    effects: { health: 10, mental: 20, food: -5 },
  },
  {
    id: 'kerja',
    title: 'Kerja',
    description: 'Kumpulkan hasil untuk suku.',
    Icon: Hammer,
    color: 'sunny',
    effects: { wealth: 15, mental: -15, food: -5 },
  },
  {
    id: 'makan',
    title: 'Makan',
    description: 'Isi perut dengan hasil buruan.',
    Icon: Utensils,
    color: 'coral',
    effects: { food: 30, wealth: -5 },
  },
  {
    id: 'bersosialisasi',
    title: 'Bersosialisasi',
    description: 'Berkumpul di sekitar api unggun.',
    Icon: Users,
    color: 'sunny',
    effects: { mental: 15, wealth: -5 },
  },
  {
    id: 'meramu',
    title: 'Meramu Herbal',
    description: 'Racik dedaunan penyembuh.',
    Icon: Leaf,
    color: 'teal',
    effects: { health: 15, mental: 5, food: -5 },
  },
];