import { create } from 'zustand';
import type { EraId } from '../types/era';
import type { Card } from '../types/card';

export const MAX_QUEUE = 3;
export const SPEEDS = [1, 2, 4] as const;
export type GameSpeed = (typeof SPEEDS)[number];

interface Stats {
  money: number;
  energy: number;
  mental: number;
}

interface GameState {
  selectedEra: EraId | null;
  onSelect: (eraId: EraId) => void;

  day: number;
  stats: Stats;
  isPaused: boolean;
  speed: GameSpeed;
  hand: Card[];
  queue: (Card | null)[];

  togglePause: () => void;
  cycleSpeed: () => void;
  playCard: (cardId: string) => void;
  removeFromQueue: (slotIndex: number) => void;
}

const STARTING_HAND: Card[] = [
  { id: 'c1', title: 'Berburu', description: 'Cari makanan di hutan. Menguras tenaga, tapi perut terisi.', tag: 'work' },
  { id: 'c2', title: 'Tidur', description: 'Istirahat di dekat api unggun untuk memulihkan energi.', tag: 'rest' },
  { id: 'c3', title: 'Bercengkerama', description: 'Berkumpul bersama suku dan berbagi cerita.', tag: 'social' },
  { id: 'c4', title: 'Meramu', description: 'Pelajari tanaman obat dan cara membuat perkakas.', tag: 'learn' },
  { id: 'c5', title: 'Cari Air', description: 'Ambil air bersih dari sungai terdekat.', tag: 'survive' },
];

export const useGameStore = create<GameState>((set) => ({
  selectedEra: null,
  onSelect: (eraId) => set({ selectedEra: eraId }),

  day: 1,
  stats: { money: 100, energy: 80, mental: 70 },
  isPaused: true,
  speed: 1,
  hand: STARTING_HAND,
  queue: Array<Card | null>(MAX_QUEUE).fill(null),

  togglePause: () => set((s) => ({ isPaused: !s.isPaused })),

  cycleSpeed: () =>
    set((s) => {
      const next = SPEEDS[(SPEEDS.indexOf(s.speed) + 1) % SPEEDS.length];
      return { speed: next };
    }),

  playCard: (cardId) =>
    set((s) => {
      const slot = s.queue.findIndex((c) => c === null);
      if (slot === -1) return s;
      const card = s.hand.find((c) => c.id === cardId);
      if (!card) return s;
      const queue = [...s.queue];
      queue[slot] = card;
      return { queue, hand: s.hand.filter((c) => c.id !== cardId) };
    }),

  removeFromQueue: (slotIndex) =>
    set((s) => {
      const card = s.queue[slotIndex];
      if (!card) return s;
      const queue = [...s.queue];
      queue[slotIndex] = null;
      return { queue, hand: [...s.hand, card] };
    }),
}));