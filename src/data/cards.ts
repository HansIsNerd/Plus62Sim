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
  Dumbbell,
  Library,
  Scissors,
  Sparkles,
  Droplets,
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
  | 'fun'
  | 'consumable';
export type LifeStage = 'child' | 'teen' | 'college' | 'adult';

export interface CardEffects {
  health?: number;
  food?: number;
  money?: number;
  mental?: number;
  tampang?: number;
  iq?: number;
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

/** Kartu eksklusif Hobi: hanya masuk deck jika hobi terpilih saat gacha */
export const HOBBY_CARDS: Card[] = [
  {
    id: 'main_game',
    title: 'Main Game',
    description: 'Push rank dulu, dunia nyata belakangan.',
    Icon: Gamepad2,
    color: 'coral',
    type: 'action',
    tag: 'fun',
    stage: ['child', 'teen', 'college', 'adult'],
    effects: { mental: 20, iq: 5, money: -10 },
  },
  {
    id: 'olahraga',
    title: 'Olahraga',
    description: 'Keringat keluar, badan dan mood naik.',
    Icon: Dumbbell,
    color: 'teal',
    type: 'action',
    tag: 'health',
    stage: ['child', 'teen', 'college', 'adult'],
    effects: { health: 20, mental: 5, tampang: 10 },
  },
  {
    id: 'belajar_ekstra',
    title: 'Belajar Ekstra',
    description: 'Lahap buku sampai larut malam.',
    Icon: Library,
    color: 'sunny',
    type: 'action',
    tag: 'study',
    stage: ['child', 'teen', 'college'],
    effects: { iq: 15, mental: -10 },
  },
];

export const getHobbyCard = (cardId: string): Card | undefined =>
  HOBBY_CARDS.find((c) => c.id === cardId);

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
  {
    id: 'potong_rambut',
    title: 'Potong Rambut',
    description: 'Rambut rapi, wajah lebih segar.',
    Icon: Scissors,
    color: 'sunny',
    type: 'action',
    tag: 'fun',
    stage: ['child', 'teen', 'college', 'adult'],
    effects: { tampang: 10, mental: 5, money: -10 },
  },
  {
    id: 'skincare',
    title: 'Skincare',
    description: 'Rutin pakai serum, wajah glowing.',
    Icon: Sparkles,
    color: 'teal',
    type: 'action',
    tag: 'fun',
    stage: ['teen', 'college', 'adult'],
    effects: { tampang: 15, money: -15 },
  },
  {
    id: 'nge_gym',
    title: 'Nge-Gym',
    description: 'Angkat beban, badan jadi atletis.',
    Icon: Dumbbell,
    color: 'coral',
    type: 'action',
    tag: 'health',
    stage: ['college', 'adult'],
    effects: { tampang: 20, health: 10, mental: -5, money: -20 },
  },
  {
    id: 'jerawatan',
    title: 'Jerawatan',
    description: 'Jerawat muncul di mana-mana.',
    Icon: Droplets,
    color: 'coral',
    type: 'curse',
    tag: 'health',
    stage: ['teen', 'college'],
    effects: { tampang: -15, mental: -10 },
  },
];