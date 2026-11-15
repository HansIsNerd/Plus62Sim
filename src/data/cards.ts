import {
  Drumstick,
  BedDouble,
  Hammer,
  Utensils,
  Users,
  Leaf,
  Banknote,
  CloudRain,
  type LucideIcon,
} from 'lucide-react';

export type CardColor = 'coral' | 'sunny' | 'teal';
export type CardType = 'action' | 'curse';

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
  type: CardType;
  effects: CardEffects;
}

export const STARTER_DECK: Card[] = [
  {
    id: 'berburu',
    title: 'Berburu',
    description: 'Cari makanan di hutan.',
    Icon: Drumstick,
    color: 'coral',
    type: 'action',
    effects: { food: 25, health: -10, mental: -5 },
  },
  {
    id: 'istirahat',
    title: 'Istirahat',
    description: 'Tidur dan pulihkan pikiran.',
    Icon: BedDouble,
    color: 'teal',
    type: 'action',
    effects: { health: 10, mental: 20, food: -5 },
  },
  {
    id: 'kerja',
    title: 'Kerja',
    description: 'Kumpulkan hasil untuk suku.',
    Icon: Hammer,
    color: 'sunny',
    type: 'action',
    effects: { wealth: 15, mental: -15, food: -5 },
  },
  {
    id: 'makan',
    title: 'Makan',
    description: 'Isi perut dengan hasil buruan.',
    Icon: Utensils,
    color: 'coral',
    type: 'action',
    effects: { food: 30, wealth: -5 },
  },
  {
    id: 'bersosialisasi',
    title: 'Bersosialisasi',
    description: 'Berkumpul di sekitar api unggun.',
    Icon: Users,
    color: 'sunny',
    type: 'action',
    effects: { mental: 15, wealth: -5 },
  },
  {
    id: 'meramu',
    title: 'Meramu Herbal',
    description: 'Racik dedaunan penyembuh.',
    Icon: Leaf,
    color: 'teal',
    type: 'action',
    effects: { health: 15, mental: 5, food: -5 },
  },
  {
    id: 'hutang',
    title: 'Hutang',
    description: 'Cicilan menghantui. Tidak bisa dibuang.',
    Icon: Banknote,
    color: 'coral',
    type: 'curse',
    effects: { wealth: -10, mental: -10 },
  },
  {
    id: 'trauma',
    title: 'Overthinking',
    description: 'Pikiran buruk datang tengah malam.',
    Icon: CloudRain,
    color: 'coral',
    type: 'curse',
    effects: { mental: -15 },
  },
];