import {
  Drumstick,
  BedDouble,
  Hammer,
  Utensils,
  Users,
  Leaf,
  Briefcase,
  Crown,
  type LucideIcon,
} from 'lucide-react';

export type CardColor = 'coral' | 'sunny' | 'teal';
export type CardType = 'action' | 'curse';
export type CardTag = 'work' | 'food' | 'rest' | 'social' | 'health';

export interface CardEffects {
  health?: number;
  food?: number;
  money?: number;
  mental?: number;
}

export interface Card {
  id: string;
  title: string;
  description: string;
  Icon: LucideIcon;
  color: CardColor;
  type: CardType;
  tag?: CardTag;
  effects: CardEffects;
}

export const KERJA_KERAS_CARD: Card = {
  id: 'kerja_keras',
  title: 'Kerja Keras',
  description: 'Lembur demi hasil lebih besar.',
  Icon: Briefcase,
  color: 'sunny',
  type: 'action',
  tag: 'work',
  effects: { money: 30, mental: -20 },
};

export const KARIR_CEMERLANG_CARD: Card = {
  id: 'karir_cemerlang',
  title: 'Karir Cemerlang',
  description: 'Puncak karir, bayaran besar, stres besar.',
  Icon: Crown,
  color: 'sunny',
  type: 'action',
  tag: 'work',
  effects: { money: 80, mental: -40 },
};

export const STARTER_DECK: Card[] = [
  {
    id: 'berburu',
    title: 'Berburu',
    description: 'Cari makanan di hutan.',
    Icon: Drumstick,
    color: 'coral',
    type: 'action',
    tag: 'food',
    effects: { food: 25, health: -10, mental: -5 },
  },
  {
    id: 'istirahat',
    title: 'Istirahat',
    description: 'Tidur dan pulihkan pikiran.',
    Icon: BedDouble,
    color: 'teal',
    type: 'action',
    tag: 'rest',
    effects: { health: 10, mental: 20, food: -5 },
  },
  {
    id: 'kerja',
    title: 'Kerja',
    description: 'Kumpulkan hasil untuk suku.',
    Icon: Hammer,
    color: 'sunny',
    type: 'action',
    tag: 'work',
    effects: { money: 15, mental: -15, food: -5 },
  },
  {
    id: 'makan',
    title: 'Makan',
    description: 'Isi perut dengan hasil buruan.',
    Icon: Utensils,
    color: 'coral',
    type: 'action',
    tag: 'food',
    effects: { food: 30, money: -5 },
  },
  {
    id: 'bersosialisasi',
    title: 'Bersosialisasi',
    description: 'Berkumpul di sekitar api unggun.',
    Icon: Users,
    color: 'sunny',
    type: 'action',
    tag: 'social',
    effects: { mental: 15, money: -5 },
  },
  {
    id: 'Jamu Herbal',
    title: 'Minum Jamu Racikan Herbal',
    description: 'Racik dedaunan penyembuh.',
    Icon: Leaf,
    color: 'teal',
    type: 'action',
    tag: 'health',
    effects: { health: 15, mental: 5, food: -5 },
  },
];