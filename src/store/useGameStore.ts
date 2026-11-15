import { create } from 'zustand';
import {
  STARTER_DECK,
  NPC_CARDS,
  type Card,
  type CardEffects,
} from '../data/cards';
import { EVENTS_POOL, type GameEvent } from '../data/events';
import { TRAITS, type Trait } from '../data/traits';

export type GameStatus = 'idle' | 'playing' | 'won' | 'lost';

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
  npcRelations: Record<string, number>;
  activeEvent: GameEvent | null;
  activeTrait: Trait | null;
  isPhoneOpen: boolean;
  debt: number;
  initGame: () => void;
  selectTrait: (traitId: string) => void;
  reset: () => void;
  playCard: (cardId: string) => void;
  resolveEvent: (choiceIndex: number) => void;
  togglePhone: () => void;
  borrowMoney: (amount: number) => void;
  payDebt: (amount: number) => void;
}

export const WIN_DAY = 30;
const MAX_QUEUE = 3;
const HAND_SIZE = 3;
const DAILY_FOOD_DECAY = 3;
const EVENT_CHANCE = 0.3;

// Bunga pinjaman dan stres akibat utang
const DEBT_INTEREST = 0.2;
const DEBT_MENTAL_PENALTY = 2;

// Relasi NPC di atas ambang ini memberi bonus stats saat kartu action dimainkan
export const NPC_BONUS_THRESHOLD = 50;
// Kenaikan relasi tiap kali kartu NPC dimainkan
const NPC_RELATION_GAIN = 10;
const MAX_RELATION = 100;

// Beban tambahan saat kartu curse dimainkan
const CURSE_PENALTY: Stats = {
  health: -5,
  food: -5,
  wealth: -5,
  mental: -10,
};

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

const defaultStats = (): Stats => ({
  health: 100,
  food: 100,
  wealth: 50,
  mental: 100,
});

const statsFromTrait = (trait: Trait | null): Stats =>
  trait ? { ...trait.startStats } : defaultStats();

const defaultRelations = (): Record<string, number> => ({
  Ibu: 50,
  Bos: 20,
});

// Total bonus dari semua NPC yang relasinya melewati ambang
const npcBonus = (relations: Record<string, number>): CardEffects => {
  const bonus: Required<CardEffects> = {
    health: 0,
    food: 0,
    wealth: 0,
    mental: 0,
  };
  for (const npc of NPC_CARDS) {
    if (!npc.npcName) continue;
    if ((relations[npc.npcName] ?? 0) > NPC_BONUS_THRESHOLD) {
      bonus.health += npc.effects.health ?? 0;
      bonus.food += npc.effects.food ?? 0;
      bonus.wealth += npc.effects.wealth ?? 0;
      bonus.mental += npc.effects.mental ?? 0;
    }
  }
  return bonus;
};

export const useGameStore = create<GameState>((set, get) => ({
  status: 'idle',
  day: 1,
  stats: defaultStats(),
  deck: [],
  hand: [],
  queue: [],
  npcRelations: defaultRelations(),
  activeEvent: null,
  activeTrait: null,
  isPhoneOpen: false,
  debt: 0,

  initGame: () => {
    const deck = [...STARTER_DECK, ...NPC_CARDS];
    set({
      status: 'playing',
      day: 1,
      stats: statsFromTrait(get().activeTrait),
      deck,
      hand: drawHand(deck),
      queue: [],
      npcRelations: defaultRelations(),
      activeEvent: null,
      isPhoneOpen: false,
      debt: 0,
    });
  },

  selectTrait: (traitId) => {
    const trait = TRAITS.find((t) => t.id === traitId);
    if (!trait) return;
    set({ activeTrait: trait });
    get().initGame();
  },

  // Kembali ke layar pilih trait
  reset: () => {
    set({
      status: 'idle',
      day: 1,
      stats: defaultStats(),
      deck: [],
      hand: [],
      queue: [],
      npcRelations: defaultRelations(),
      activeEvent: null,
      activeTrait: null,
      isPhoneOpen: false,
      debt: 0,
    });
  },

  togglePhone: () => {
    set((s) => ({ isPhoneOpen: !s.isPhoneOpen }));
  },

  borrowMoney: (amount) => {
    const { status, stats, debt } = get();
    if (status !== 'playing' || amount <= 0) return;
    set({
      stats: { ...stats, wealth: clamp(stats.wealth + amount) },
      debt: debt + amount + amount * DEBT_INTEREST,
    });
  },

  payDebt: (amount) => {
    const { status, stats, debt } = get();
    if (status !== 'playing' || amount <= 0) return;
    if (debt <= 0 || stats.wealth < amount) return;
    // Jangan bayar melebihi sisa utang
    const pay = Math.min(amount, debt);
    set({
      stats: { ...stats, wealth: clamp(stats.wealth - pay) },
      debt: Math.max(0, debt - pay),
    });
  },

  playCard: (cardId) => {
    const {
      hand,
      stats,
      deck,
      queue,
      day,
      status,
      activeEvent,
      npcRelations,
      debt,
    } = get();
    if (status !== 'playing' || activeEvent) return;

    const card = hand.find((c) => c.id === cardId);
    if (!card) return;

    const isNpc = !!card.npcName;
    const isAction = card.type === 'action' && !isNpc;

    // Kartu NPC bersifat pasif: tidak menerapkan efek langsung, hanya menaikkan relasi
    const effects: CardEffects = isNpc ? {} : card.effects;
    const penalty = card.type === 'curse' ? CURSE_PENALTY : null;
    const bonus: CardEffects = isAction ? npcBonus(npcRelations) : {};

    // Stres karena utang
    const debtStress = debt > 0 ? DEBT_MENTAL_PENALTY : 0;

    const nextRelations: Record<string, number> = { ...npcRelations };
    if (card.npcName) {
      nextRelations[card.npcName] = Math.min(
        MAX_RELATION,
        (nextRelations[card.npcName] ?? 0) + NPC_RELATION_GAIN,
      );
    }

    const next: Stats = {
      health: clamp(
        stats.health +
          (effects.health ?? 0) +
          (penalty?.health ?? 0) +
          (bonus.health ?? 0),
      ),
      food: clamp(
        stats.food +
          (effects.food ?? 0) +
          (penalty?.food ?? 0) +
          (bonus.food ?? 0) -
          DAILY_FOOD_DECAY,
      ),
      wealth: clamp(
        stats.wealth +
          (effects.wealth ?? 0) +
          (penalty?.wealth ?? 0) +
          (bonus.wealth ?? 0),
      ),
      mental: clamp(
        stats.mental +
          (effects.mental ?? 0) +
          (penalty?.mental ?? 0) +
          (bonus.mental ?? 0) -
          debtStress,
      ),
    };

    const lost = isDead(next);
    const nextDay = day + 1;
    const won = !lost && nextDay > WIN_DAY;

    let event: GameEvent | null = null;
    if (!lost && !won && Math.random() < EVENT_CHANCE) {
      event = EVENTS_POOL[Math.floor(Math.random() * EVENTS_POOL.length)];
    }

    // Deck tidak berubah: kartu curse tetap ada sebagai beban hidup
    set({
      stats: next,
      queue: [...queue, card].slice(-MAX_QUEUE),
      npcRelations: nextRelations,
      day: won ? WIN_DAY : nextDay,
      hand: drawHand(deck),
      status: lost ? 'lost' : won ? 'won' : 'playing',
      activeEvent: event,
      isPhoneOpen: lost || won ? false : get().isPhoneOpen,
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