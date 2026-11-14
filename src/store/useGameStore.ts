import { create } from 'zustand';
import type { EraId } from '../types/era';
import { STARTER_DECK, type Card } from '../data/cards';

export type GameStatus = 'idle' | 'playing' | 'lost';

export interface Stats {
  health: number;
  food: number;
  wealth: number;
  mental: number;
}

interface GameState {
  selectedEra: EraId | null;
  status: GameStatus;
  day: number;
  stats: Stats;
  deck: Card[];
  hand: Card[];
  queue: Card[];
  onSelect: (eraId: EraId) => void;
  initGame: () => void;
  playCard: (cardId: string) => void;
  resetGame: () => void;
}

const MAX_QUEUE = 3;
const HAND_SIZE = 3;
const DAILY_FOOD_DECAY = 3;

const clamp = (n: number) => Math.max(0, Math.min(100, n));

const drawHand = (deck: Card[]): Card[] => {
  const pool = [...deck];
  const hand: Card[] = [];
  while (hand.length < HAND_SIZE && pool.length > 0) {
    const i = Math.floor(Math.random() * pool.length);
    hand.push(pool.splice(i, 1)[0]);
  }
  return hand;
};

const initialStats = (): Stats => ({
  health: 100,
  food: 100,
  wealth: 50,
  mental: 100,
});

export const useGameStore = create<GameState>((set, get) => ({
  selectedEra: null,
  status: 'idle',
  day: 1,
  stats: initialStats(),
  deck: [],
  hand: [],
  queue: [],

  onSelect: (eraId) => {
    set({ selectedEra: eraId });
    get().initGame();
  },

  initGame: () => {
    const deck = [...STARTER_DECK];
    set({
      status: 'playing',
      day: 1,
      stats: { ...initialStats(), mental: 100 },
      deck,
      hand: drawHand(deck),
      queue: [],
    });
  },

  playCard: (cardId) => {
    const { hand, stats, deck, queue, day, status } = get();
    if (status !== 'playing') return;

    const card = hand.find((c) => c.id === cardId);
    if (!card) return;

    const next: Stats = {
      health: clamp(stats.health + (card.effects.health ?? 0)),
      food: clamp(stats.food + (card.effects.food ?? 0) - DAILY_FOOD_DECAY),
      wealth: clamp(stats.wealth + (card.effects.wealth ?? 0)),
      mental: clamp(stats.mental + (card.effects.mental ?? 0)),
    };

    const lost = next.mental <= 0 || next.health <= 0 || next.food <= 0;

    set({
      stats: next,
      queue: [...queue, card].slice(-MAX_QUEUE),
      day: day + 1,
      hand: drawHand(deck),
      status: lost ? 'lost' : 'playing',
    });
  },

  resetGame: () => {
    set({
      selectedEra: null,
      status: 'idle',
      day: 1,
      stats: initialStats(),
      deck: [],
      hand: [],
      queue: [],
    });
  },
}));