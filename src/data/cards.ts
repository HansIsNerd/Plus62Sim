import {
  Drumstick,
  BedDouble,
  Hammer,
  Utensils,
  Users,
  Leaf,
  Heart,
  Briefcase,
  type LucideIcon,
} from 'lucide-react';

export type CardColor = 'coral' | 'sunny' | 'teal';
export type CardType = 'action' | 'curse' | 'npc';

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
  /**
   * Jika type === 'npc', `effects` adalah efek pasif
   * yang diterapkan setiap kali pemain memainkan kartu.
   */
  effects: CardEffects;
  /** Nama NPC. Jika ada, kartu ini adalah kartu NPC (pasif, tidak dimainkan seperti action). */
  npcName?: string;
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
    id: 'Jamu Herbal',
    title: 'Minum Jamu Racikan Herbal',
    description: 'Racik dedaunan penyembuh.',
    Icon: Leaf,
    color: 'teal',
    type: 'action',
    effects: { health: 15, mental: 5, food: -5 },
  },
];

// Kartu NPC: efek pasif tiap pemain memainkan kartu.
// Sengaja dipisah dari STARTER_DECK agar tidak ikut ditarik ke tangan sebagai kartu action.
export const NPC_CARDS: Card[] = [
  {
    id: 'npc-ibu',
    title: 'Ibu',
    description: 'Doa dan masakan Ibu selalu menenangkan.',
    Icon: Heart,
    color: 'teal',
    type: 'npc',
    npcName: 'Ibu',
    effects: { mental: 5 },
  },
  {
    id: 'npc-bos',
    title: 'Bos',
    description: 'Gaji mengalir, tapi tekanan tak pernah berhenti.',
    Icon: Briefcase,
    color: 'sunny',
    type: 'npc',
    npcName: 'Bos',
    effects: { wealth: 5, mental: -2 },
  },
];