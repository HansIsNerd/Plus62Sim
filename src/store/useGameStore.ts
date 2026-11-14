import { create } from 'zustand';
import { STARTER_DECK, type Card } from '../data/cards';

export type GameStatus = 'playing' | 'lost' | 'won';

export interface Stats {
  food: number;
  health: number;
  wealth: number;
}

interface GameState {
  status: GameStatus;
  stats: Stats;
  hand: Card[];
  deck: Card[];
  discard: Card[];
  initGame: () => void;
  playCard: (id: string) => void;
  reset: () => void;
}

const HAND_SIZE = 4;
const MAX_STAT = 100;
const INITIAL_STATS: Stats = { food: 50, health: 50, wealth: 50 };

const clamp = (v: number) => Math.max(0, Math.min(MAX_STAT, v));

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const useGameStore = create<GameState>((set, get) => ({
  status: 'playing',
  stats: { ...INITIAL_STATS },
  hand: [],
  deck: [],
  discard: [],

  initGame: () => {
    const shuffled = shuffle(STARTER_DECK);
    set({
      status: 'playing',
      stats: { ...INITIAL_STATS },
      hand: shuffled.slice(0, HAND_SIZE),
      deck: shuffled.slice(HAND_SIZE),
      discard: [],
    });
  },

  playCard: (id) => {
    const { status, hand, deck, discard, stats } = get();
    if (status !== 'playing') return;

    const card = hand.find((c) => c.id === id);
    if (!card) return;

    const newStats: Stats = {
      food: clamp(stats.food + (card.effects.food ?? 0)),
      health: clamp(stats.health + (card.effects.health ?? 0)),
      wealth: clamp(stats.wealth + (card.effects.wealth ?? 0)),
    };

    let newHand = hand.filter((c) => c.id !== id);
    let newDeck = [...deck];
    let newDiscard = [...discard, card];

    // Deck habis -> acak ulang discard menjadi deck baru
    if (newDeck.length === 0 && newDiscard.length > 0) {
      newDeck = shuffle(newDiscard);
      newDiscard = [];
    }

    const drawn = newDeck.shift();
    if (drawn) newHand = [...newHand, drawn];

    const lost = newStats.health <= 0 || newStats.food <= 0;

    set({
      stats: newStats,
      hand: newHand,
      deck: newDeck,
      discard: newDiscard,
      status: lost ? 'lost' : status,
    });
  },

  reset: () => {
    get().initGame();
  },
}));