import { create } from 'zustand';
import type { Card, GameSpeed, Stats } from '../types/card';
import type { EraId } from '../types/era';
import { STARTING_DECKS, STARTING_STATS } from '../data/cards';

export const HAND_SIZE = 4;
export const MAX_QUEUE = 3;
export const MAX_STAT = 100;

/** Beban harian: hidup itu melelahkan. */
const DAILY_DRAIN: Partial<Stats> = { energy: -3, mental: -1 };

interface GameState {
  eraId: EraId | null;
  day: number;
  stats: Stats;
  deck: Card[];
  hand: Card[];
  queue: Card[];
  discard: Card[];
  isPaused: boolean;
  speed: GameSpeed;
  isGameOver: boolean;
  gameOverReason: string | null;

  initGame: (eraId: EraId) => void;
  resetGame: () => void;
  queueCard: (cardId: string) => void;
  unqueueCard: (cardId: string) => void;
  resolveTick: () => void;
  setPaused: (paused: boolean) => void;
  togglePause: () => void;
  setSpeed: (speed: GameSpeed) => void;
}

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

const buildDeck = (eraId: EraId): Card[] =>
  STARTING_DECKS[eraId].map((def, i) => ({ ...def, id: `${def.defId}#${i}` }));

/** Tarik kartu sampai hand penuh; reshuffle discard jika deck habis. */
const refillHand = (
  hand: Card[],
  deck: Card[],
  discard: Card[],
): { hand: Card[]; deck: Card[]; discard: Card[] } => {
  let h = [...hand];
  let d = [...deck];
  let disc = [...discard];

  while (h.length < HAND_SIZE) {
    if (d.length === 0) {
      if (disc.length === 0) break;
      d = shuffle(disc);
      disc = [];
    }
    const next = d.shift();
    if (!next) break;
    h.push(next);
  }

  return { hand: h, deck: d, discard: disc };
};

const emptyState = {
  eraId: null,
  day: 1,
  stats: { money: 0, energy: 0, mental: 0 },
  deck: [] as Card[],
  hand: [] as Card[],
  queue: [] as Card[],
  discard: [] as Card[],
  isPaused: true,
  speed: 1 as GameSpeed,
  isGameOver: false,
  gameOverReason: null as string | null,
};

export const useGameStore = create<GameState>((set, get) => ({
  ...emptyState,

  initGame: (eraId) => {
    const drawn = refillHand([], shuffle(buildDeck(eraId)), []);
    set({
      ...emptyState,
      eraId,
      stats: { ...STARTING_STATS[eraId] },
      hand: drawn.hand,
      deck: drawn.deck,
      discard: drawn.discard,
      isPaused: false,
    });
  },

  resetGame: () => set({ ...emptyState }),

  queueCard: (cardId) => {
    const { hand, queue, isGameOver } = get();
    if (isGameOver || queue.length >= MAX_QUEUE) return;
    const card = hand.find((c) => c.id === cardId);
    if (!card) return;
    set({
      hand: hand.filter((c) => c.id !== cardId),
      queue: [...queue, card],
    });
  },

  unqueueCard: (cardId) => {
    const { hand, queue, isGameOver } = get();
    if (isGameOver) return;
    const card = queue.find((c) => c.id === cardId);
    if (!card) return;
    set({
      queue: queue.filter((c) => c.id !== cardId),
      hand: [...hand, card],
    });
  },

  resolveTick: () => {
    const s = get();
    if (s.isGameOver || !s.eraId) return;

    // 1. Eksekusi efek kartu di antrean
    const next: Stats = { ...s.stats };
    for (const card of s.queue) {
      next.money += card.effect.money ?? 0;
      next.energy += card.effect.energy ?? 0;
      next.mental += card.effect.mental ?? 0;
    }

    // 2. Beban harian
    next.energy += DAILY_DRAIN.energy ?? 0;
    next.mental += DAILY_DRAIN.mental ?? 0;

    // 3. Clamp
    next.energy = clamp(next.energy, 0, MAX_STAT);
    next.mental = clamp(next.mental, 0, MAX_STAT);

    // 4. Rotasi deck: kartu terpakai -> discard, isi ulang hand
    const rotated = refillHand(
      s.hand,
      s.deck,
      [...s.discard, ...s.queue],
    );

    // 5. Cek game over
    let reason: string | null = null;
    if (next.energy <= 0) reason = 'Tubuhmu kehabisan tenaga.';
    else if (next.mental <= 0) reason = 'Pikiranmu tak sanggup lagi.';
    else if (next.money < 0) reason = 'Kamu jatuh miskin.';

    set({
      stats: next,
      day: s.day + 1,
      queue: [],
      hand: rotated.hand,
      deck: rotated.deck,
      discard: rotated.discard,
      isGameOver: reason !== null,
      gameOverReason: reason,
      isPaused: reason !== null ? true : s.isPaused,
    });
  },

  setPaused: (paused) => set({ isPaused: paused }),
  togglePause: () => {
    if (get().isGameOver) return;
    set((s) => ({ isPaused: !s.isPaused }));
  },
  setSpeed: (speed) => set({ speed }),
}));