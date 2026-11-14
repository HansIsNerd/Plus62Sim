import { create } from 'zustand';
import { STARTER_DECK } from '../data/cards';
import type { Card, Effects } from '../data/cards';

export const MAX_QUEUE = 3;
export const HAND_SIZE = 4;
export const WIN_DAY = 30;
export const DAY_MS = 3000;

const INITIAL_STATS: Effects = { food: 60, health: 70, wealth: 20 };

const clamp = (n: number) => Math.max(0, Math.min(100, n));

let uidCounter = 0;

// Setiap kartu di tangan/antrean punya id unik agar aksi berbasis cardId tidak ambigu
const drawCard = (): Card => {
  const base = STARTER_DECK[Math.floor(Math.random() * STARTER_DECK.length)];
  uidCounter += 1;
  return { ...base, id: `${base.id}#${uidCounter}` };
};

const refillHand = (hand: Card[]): Card[] => {
  const next = [...hand];
  while (next.length < HAND_SIZE) next.push(drawCard());
  return next;
};

interface GameState {
  eraId: string | null;
  day: number;
  stats: Effects;
  hand: Card[];
  queue: Card[];
  isPaused: boolean;
  isGameOver: boolean;
  isWin: boolean;
  initGame: (eraId: string) => void;
  queueCard: (cardId: string) => void;
  unqueueCard: (cardId: string) => void;
  togglePause: () => void;
  resolveTick: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  eraId: null,
  day: 1,
  stats: { ...INITIAL_STATS },
  hand: [],
  queue: [],
  isPaused: true,
  isGameOver: false,
  isWin: false,

  initGame: (eraId) => {
    set({
      eraId,
      day: 1,
      stats: { ...INITIAL_STATS },
      hand: refillHand([]),
      queue: [],
      isPaused: true,
      isGameOver: false,
      isWin: false,
    });
  },

  queueCard: (cardId) => {
    const { hand, queue, isGameOver } = get();
    if (isGameOver || queue.length >= MAX_QUEUE) return;
    const picked = hand.find((c) => c.id === cardId);
    if (!picked) return;
    set({
      hand: hand.filter((c) => c.id !== cardId),
      queue: [...queue, picked],
    });
  },

  unqueueCard: (cardId) => {
    const { hand, queue, isGameOver } = get();
    if (isGameOver) return;
    const picked = queue.find((c) => c.id === cardId);
    if (!picked) return;
    set({
      queue: queue.filter((c) => c.id !== cardId),
      hand: [...hand, picked],
    });
  },

  togglePause: () => {
    if (get().isGameOver) return;
    set((s) => ({ isPaused: !s.isPaused }));
  },

  resolveTick: () => {
    const { isGameOver, queue, hand, stats, day } = get();
    if (isGameOver) return;

    const [current, ...rest] = queue;

    const next: Effects = {
      food: stats.food - 3,
      health: stats.health,
      wealth: stats.wealth,
    };

    if (current) {
      next.food += current.effects.food;
      next.health += current.effects.health;
      next.wealth += current.effects.wealth;
    }

    // Kelaparan menggerus kesehatan
    if (next.food <= 0) next.health -= 8;

    const clamped: Effects = {
      food: clamp(next.food),
      health: clamp(next.health),
      wealth: clamp(next.wealth),
    };

    const newDay = day + 1;
    const lost = clamped.health <= 0;
    const won = !lost && newDay >= WIN_DAY;

    set({
      stats: clamped,
      queue: rest,
      hand: refillHand(hand),
      day: newDay,
      isGameOver: lost || won,
      isWin: won,
      isPaused: lost || won ? true : get().isPaused,
    });
  },
}));