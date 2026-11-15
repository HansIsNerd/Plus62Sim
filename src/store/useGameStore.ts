import { create } from 'zustand';
import {
  STARTER_DECK,
  type Card,
  type CardEffects,
} from '../data/cards';
import { EVENTS_POOL, type GameEvent } from '../data/events';
import { TRAITS, type Trait } from '../data/traits';
import { IBU_NPC, type NPC } from '../data/npcs';

export type GameStatus = 'idle' | 'playing' | 'won' | 'lost';
export type PhoneApp = 'home' | 'bank' | 'contacts' | 'social';

export type Message = {
  id: string;
  sender: 'player' | 'npc';
  text: string;
};

export interface Stats {
  health: number;
  food: number;
  money: number;
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
  activeTrait: Trait | null;
  isPhoneOpen: boolean;
  debt: number;
  friends: NPC[];
  activeApp: PhoneApp;
  activeChatId: string | null;
  chatHistories: Record<string, Message[]>;
  initGame: () => void;
  selectTrait: (traitId: string) => void;
  reset: () => void;
  playCard: (cardId: string) => void;
  resolveEvent: (choiceIndex: number) => void;
  togglePhone: () => void;
  borrowMoney: (amount: number) => void;
  payDebt: (amount: number) => void;
  setActiveApp: (app: PhoneApp) => void;
  addFriend: (npc: NPC) => void;
  setActiveChat: (npcId: string | null) => void;
  sendMessage: (npcId: string, text: string) => boolean;
}

export const WIN_DAY = 30;
const MAX_QUEUE = 3;
const HAND_SIZE = 3;
const DAILY_FOOD_DECAY = 3;
const EVENT_CHANCE = 0.3;

// Bunga pinjaman dan stres akibat utang
const DEBT_INTEREST = 0.2;
const DEBT_MENTAL_PENALTY = 2;

// Efek chat dengan teman
export const CHAT_MENTAL_GAIN = 10;
export const CHAT_MONEY_COST = 5;
const CHAT_REPLY_DELAY = 1000;

// Beban tambahan saat kartu curse dimainkan
const CURSE_PENALTY: Stats = {
  health: -5,
  food: -5,
  money: -5,
  mental: -10,
};

// Balasan hardcoded NPC
const DEFAULT_REPLIES = [
  'Iya, makasih sudah nanya.',
  'Hehe, bisa aja kamu.',
  'Wah, cerita dong lebih banyak.',
  'Semangat ya, jangan lupa istirahat.',
  'Oke, nanti kita ngobrol lagi.',
];

const NPC_REPLIES: Record<string, string[]> = {
  'npc-ibu': [
    'Iya, Nak. Ibu selalu doakan kamu.',
    'Jaga kesehatan ya, jangan lupa makan.',
    'Ibu bangga sama kamu, Nak.',
    'Pulang kalau sempat ya, Ibu kangen.',
    'Hati-hati di jalan, Nak.',
  ],
};

const getReply = (npcId: string): string => {
  const pool = NPC_REPLIES[npcId] ?? DEFAULT_REPLIES;
  return pool[Math.floor(Math.random() * pool.length)];
};

let messageCounter = 0;
const newMessageId = () => {
  messageCounter += 1;
  return `msg-${Date.now()}-${messageCounter}`;
};

const defaultChatHistories = (): Record<string, Message[]> => ({
  [IBU_NPC.id]: [
    {
      id: newMessageId(),
      sender: 'npc',
      text: 'Nak, sudah makan?',
    },
  ],
});

const clampStat = (n: number) => Math.max(0, Math.min(100, n));
const clampMoney = (n: number) => Math.max(0, n);

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
  money: 50,
  mental: 100,
});

const statsFromTrait = (trait: Trait | null): Stats =>
  trait ? { ...trait.startStats } : defaultStats();

const defaultFriends = (): NPC[] => [{ ...IBU_NPC }];

export const useGameStore = create<GameState>((set, get) => ({
  status: 'idle',
  day: 1,
  stats: defaultStats(),
  deck: [],
  hand: [],
  queue: [],
  activeEvent: null,
  activeTrait: null,
  isPhoneOpen: false,
  debt: 0,
  friends: defaultFriends(),
  activeApp: 'home',
  activeChatId: null,
  chatHistories: defaultChatHistories(),

  initGame: () => {
    const deck = [...STARTER_DECK];
    set({
      status: 'playing',
      day: 1,
      stats: statsFromTrait(get().activeTrait),
      deck,
      hand: drawHand(deck),
      queue: [],
      activeEvent: null,
      isPhoneOpen: false,
      debt: 0,
      friends: defaultFriends(),
      activeApp: 'home',
      activeChatId: null,
      chatHistories: defaultChatHistories(),
    });
  },

  selectTrait: (traitId) => {
    const trait = TRAITS.find((t) => t.id === traitId);
    if (!trait) return;
    set({ activeTrait: trait });
    get().initGame();
  },

  reset: () => {
    set({
      status: 'idle',
      day: 1,
      stats: defaultStats(),
      deck: [],
      hand: [],
      queue: [],
      activeEvent: null,
      activeTrait: null,
      isPhoneOpen: false,
      debt: 0,
      friends: defaultFriends(),
      activeApp: 'home',
      activeChatId: null,
      chatHistories: defaultChatHistories(),
    });
  },

  togglePhone: () => {
    set((s) => ({
      isPhoneOpen: !s.isPhoneOpen,
      activeApp: 'home',
      activeChatId: null,
    }));
  },

  setActiveApp: (app) => {
    set({ activeApp: app, activeChatId: null });
  },

  addFriend: (npc) => {
    const { status, friends, chatHistories } = get();
    if (status !== 'playing') return;
    if (friends.some((f) => f.id === npc.id)) return;
    set({
      friends: [...friends, npc],
      chatHistories: {
        ...chatHistories,
        [npc.id]: chatHistories[npc.id] ?? [],
      },
    });
  },

  setActiveChat: (npcId) => {
    set({ activeChatId: npcId });
  },

  sendMessage: (npcId, text) => {
    const { status, friends, stats } = get();
    const trimmed = text.trim();
    if (status !== 'playing') return false;
    if (!trimmed) return false;
    if (!friends.some((f) => f.id === npcId)) return false;
    if (stats.money < CHAT_MONEY_COST) return false;

    const playerMsg: Message = {
      id: newMessageId(),
      sender: 'player',
      text: trimmed,
    };

    set((s) => ({
      stats: {
        ...s.stats,
        mental: clampStat(s.stats.mental + CHAT_MENTAL_GAIN),
        money: clampMoney(s.stats.money - CHAT_MONEY_COST),
      },
      chatHistories: {
        ...s.chatHistories,
        [npcId]: [...(s.chatHistories[npcId] ?? []), playerMsg],
      },
    }));

    window.setTimeout(() => {
      const current = get();
      if (current.status !== 'playing') return;
      if (!current.friends.some((f) => f.id === npcId)) return;

      const npcMsg: Message = {
        id: newMessageId(),
        sender: 'npc',
        text: getReply(npcId),
      };

      set((s) => ({
        chatHistories: {
          ...s.chatHistories,
          [npcId]: [...(s.chatHistories[npcId] ?? []), npcMsg],
        },
      }));
    }, CHAT_REPLY_DELAY);

    return true;
  },

  borrowMoney: (amount) => {
    const { status, stats, debt } = get();
    if (status !== 'playing' || amount <= 0) return;
    set({
      stats: { ...stats, money: clampMoney(stats.money + amount) },
      debt: debt + amount + amount * DEBT_INTEREST,
    });
  },

  payDebt: (amount) => {
    const { status, stats, debt } = get();
    if (status !== 'playing' || amount <= 0) return;
    if (debt <= 0 || stats.money < amount) return;
    const pay = Math.min(amount, debt);
    set({
      stats: { ...stats, money: clampMoney(stats.money - pay) },
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
      debt,
    } = get();

    if (status !== 'playing' || activeEvent) return;

    const card = hand.find((c) => c.id === cardId);
    if (!card) return;

    const effects: CardEffects = card.effects;
    const penalty = card.type === 'curse' ? CURSE_PENALTY : null;
    const debtStress = debt > 0 ? DEBT_MENTAL_PENALTY : 0;

    const next: Stats = {
      health: clampStat(
        stats.health +
          (effects.health ?? 0) +
          (penalty?.health ?? 0)
      ),
      food: clampStat(
        stats.food +
          (effects.food ?? 0) +
          (penalty?.food ?? 0) -
          DAILY_FOOD_DECAY,
      ),
      money: clampMoney(
        stats.money +
          (effects.money ?? 0) +
          (penalty?.money ?? 0)
      ),
      mental: clampStat(
        stats.mental +
          (effects.mental ?? 0) +
          (penalty?.mental ?? 0) -
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

    set({
      stats: next,
      queue: [...queue, card].slice(-MAX_QUEUE),
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
      health: clampStat(stats.health + (choice.effects.health ?? 0)),
      food: clampStat(stats.food + (choice.effects.food ?? 0)),
      money: clampMoney(stats.money + (choice.effects.money ?? 0)),
      mental: clampStat(stats.mental + (choice.effects.mental ?? 0)),
    };

    set({
      stats: next,
      activeEvent: null,
      status: isDead(next) ? 'lost' : 'playing',
    });
  },
}));