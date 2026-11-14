import { create } from 'zustand';
import { STARTER_DECK, type Card } from '../data/cards';
import { EVENTS_POOL, type GameEvent } from '../data/events';

export type GameStatus = 'idle' | 'playing' | 'lost';

export interface Stats {
  health: number;
  food: number;
  wealth: number;
  mental: number;
}

interface GameState {
  status: GameStatus;
  day: number;
  stats: Stats;
  deck: Card[];
  hand: Card[];
  queue: Card[];
  activeEvent: GameEvent | null;
  initGame: () => void;
  playCard: (cardId: string) => void;
  resolveEvent: (choiceIndex: number) => void;
}

const MAX_QUEUE = 3;
const HAND_SIZE = 3;
const DAILY_FOOD_DECAY = 3;
const EVENT_CHANCE = 0.3;

const clamp = (n: number) => Math.max(0, Math.min(100, n));

const isDead = (s: Stats) => s.mental <= 0 || s.health <= 0 || s.food <= 0;

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
  status: 'idle',
  day: 1,
  stats: initialStats(),
  deck: [],
  hand: [],
  queue: [],
  activeEvent: null,

  initGame: () => {
    const deck = [...STARTER_DECK];
    set({
      status: 'playing',
      day: 1,
      stats: initialStats(),
      deck,
      hand: drawHand(deck),
      queue: [],
      activeEvent: null,
    });
  },

  playCard: (cardId) => {
    const { hand, stats, deck, queue, day, status, activeEvent } = get();
    if (status !== 'playing' || activeEvent) return;

    const card = hand.find((c) => c.id === cardId);
    if (!card) return;

    const next: Stats = {
      health: clamp(stats.health + (card.effects.health ?? 0)),
      food: clamp(stats.food + (card.effects.food ?? 0) - DAILY_FOOD_DECAY),
      wealth: clamp(stats.wealth + (card.effects.wealth ?? 0)),
      mental: clamp(stats.mental + (card.effects.mental ?? 0)),
    };

    const lost = isDead(next);

    let event: GameEvent | null = null;
    if (!lost && Math.random() < EVENT_CHANCE) {
      event = EVENTS_POOL[Math.floor(Math.random() * EVENTS_POOL.length)];
    }

    set({
      stats: next,
      queue: [...queue, card].slice(-MAX_QUEUE),
      day: day + 1,
      hand: drawHand(deck),
      status: lost ? 'lost' : 'playing',
      activeEvent: event,
    });
  },

  resolveEvent: (choiceIndex) => {
    const { activeEvent, stats, status } = get();
    if (!activeEvent || status !== 'playing') return;

    const choice = activeEvent.choices[choiceIndex];
    if (!choice) return;

    const next: Stats = {
      health: clamp(stats.health + (choice.effects.health ?? 0)),
      food: clamp(stats.food + (choice.effects.food ?? 0)),
      wealth: clamp(stats.wealth + (choice.effects.wealth ?? 0)),
      mental: clamp(stats.mental + (choice.effects.mental ?? 0)),
    };

    set({
      stats: next,
      activeEvent: null,
      status: isDead(next) ? 'lost' : 'playing',
    });
  },
}));