import {
  Drumstick,
  BedDouble,
  Hammer,
  Utensils,
  Users,
  Leaf,
  Briefcase,
  Crown,
  BookOpen,
  Gamepad2,
  GraduationCap,
  type LucideIcon,
} from 'lucide-react';

export type CardColor = 'coral' | 'sunny' | 'teal';
export type CardType = 'action' | 'curse' | 'consumable';
export type CardTag =
  | 'work'
  | 'food'
  | 'rest'
  | 'social'
  | 'health'
  | 'study'
  | 'play'
  | 'consumable';
export type LifeStage = 'child' | 'teen' | 'college' | 'adult';

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
  stage?: ('child' | 'teen' | 'college' | 'adult')[];
  effects: CardEffects;
  /** Jika true, efek dihitung dinamis oleh store berdasarkan karir pemain */
  isDynamicWork?: boolean;
}

export const KERJA_KERAS_CARD: Card = {
  id: 'kerja_keras',
  title: 'Kerja Keras',
  description: 'Lembur demi hasil lebih besar.',
  Icon: Briefcase,
  color: 'sunny',
  type: 'action',
  tag: 'work',
  stage: ['adult'],
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
  stage: ['adult'],
  effects: { money: 80, mental: -40 },
};

export const STARTER_DECK: Card[] = [
  {
    id: 'belajar',
    title: 'Belajar',
    description: 'Asah otak lewat buku dan pelajaran.',
    Icon: BookOpen,
    color: 'sunny',
    type: 'action',
    tag: 'study',
    stage: ['child', 'teen'],
    effects: { mental: -5, food: -5, money: 5 },
  },
  {
    id: 'bermain',
    title: 'Bermain',
    description: 'Main bareng teman sampai lupa waktu.',
    Icon: Gamepad2,
    color: 'coral',
    type: 'action',
    tag: 'play',
    stage: ['child', 'teen'],
    effects: { mental: 20, health: 5, food: -10 },
  },
  {
    id: 'belajar_ujian',
    title: 'Belajar Ujian',
    description: 'Begadang demi nilai IPK yang aman.',
    Icon: GraduationCap,
    color: 'sunny',
    type: 'action',
    tag: 'study',
    stage: ['college'],
    effects: { mental: -15, food: -5, money: 0 },
  },
  {
    id: 'main_game',
    title: 'Main Game',
    description: 'Push rank dulu, tugas belakangan.',
    Icon: Gamepad2,
    color: 'coral',
    type: 'action',
    tag: 'play',
    stage: ['college'],
    effects: { mental: 20, money: -10 },
  },
  {
    id: 'berburu',
    title: 'Berburu',
    description: 'Cari makanan di hutan.',
    Icon: Drumstick,
    color: 'coral',
    type: 'action',
    tag: 'food',
    stage: ['teen', 'adult'],
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
    stage: ['child', 'teen', 'college', 'adult'],
    effects: { health: 10, mental: 20, food: -5 },
  },
  {
    id: 'kerja',
    title: 'Kerja',
    description: 'Gaji dan beban mental sesuai karirmu.',
    Icon: Hammer,
    color: 'sunny',
    type: 'action',
    tag: 'work',
    stage: ['adult'],
    effects: {},
    isDynamicWork: true,
  },
  {
    id: 'makan',
    title: 'Makan',
    description: 'Isi perut dengan hasil buruan.',
    Icon: Utensils,
    color: 'coral',
    type: 'action',
    tag: 'food',
    stage: ['child', 'teen', 'college', 'adult'],
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
    stage: ['child', 'teen', 'college', 'adult'],
    effects: { mental: 15, money: -5 },
  },
  {
    id: 'jamu_herbal',
    title: 'Minum Jamu Racikan Herbal',
    description: 'Racik dedaunan penyembuh.',
    Icon: Leaf,
    color: 'teal',
    type: 'action',
    tag: 'health',
    stage: ['child', 'teen', 'college', 'adult'],
    effects: { health: 15, mental: 5, food: -5 },
  },
];