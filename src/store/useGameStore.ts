import { create } from 'zustand';
import {
  STARTER_DECK,
  type Card,
  type CardEffects,
  type LifeStage,
} from '../data/cards';
import {
  EVENTS_POOL,
  BILL_EVENT,
  type GameEvent,
} from '../data/events';
import { TRAITS, type Trait } from '../data/traits';
import { IBU_NPC, NPC_POOL, type NPC } from '../data/npcs';
import { CAREERS_POOL, type Career } from '../data/careers';
import { ASSETS } from '../data/investments';
import type { ShopItem } from '../data/shop';

export type GameStatus = 'idle' | 'playing' | 'lost';
export type PhoneApp =
  | 'home'
  | 'bank'
  | 'contacts'
  | 'social'
  | 'shop'
  | 'invest';
export type PathChoice = 'none' | 'kuliah' | 'kerja';

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
  age: number;
  actionPoints: number;
  stats: Stats;
  deck: Card[];
  hand: Card[];
  queue: Card[];
  discard: Card[];
  activeEvent: GameEvent | null;
  activeTrait: Trait | null;
  career: Career | null;
  pathChoice: PathChoice;
  deathReason: string | null;
  isPhoneOpen: boolean;
  debt: number;
  friends: NPC[];
  socialFeed: NPC[];
  activeApp: PhoneApp;
  activeChatId: string | null;
  chatHistories: Record<string, Message[]>;
  assetPrices: Record<string, number>;
  portfolio: Record<string, number>;
  priceHistory: Record<string, number[]>;
  initGame: () => void;
  selectTrait: (traitId: string) => void;
  selectCareer: (careerId: string) => void;
  choosePath: (path: Exclude<PathChoice, 'none'>) => void;
  reset: () => void;
  playCard: (cardId: string) => void;
  resolveEvent: (choiceIndex: number) => void;
  togglePhone: () => void;
  borrowMoney: (amount: number) => void;
  payDebt: (amount: number) => void;
  setActiveApp: (app: PhoneApp) => void;
  addFriend: (npc: NPC) => void;
  generateFeed: (keep?: NPC[]) => void;
  followNpc: (npc: NPC) => void;
  setActiveChat: (npcId: string | null) => void;
  sendMessage: (npcId: string, text: string) => boolean;
  buyItem: (item: ShopItem) => boolean;
  buyAsset: (assetId: string, quantity: number) => boolean;
  sellAsset: (assetId: string, quantity: number) => boolean;
  updateMarketPrices: () => void;
}

export const START_AGE = 6;
export const MAX_AP = 3;
/** Umur pemain wajib memilih jalan hidup (Kuliah / Kerja) */
export const PATH_AGE = 19;
/** Umur minimum kartu "Kerja" */
export const CAREER_AGE = 18;
/** Tagihan muncul tiap N tahun setelah umur BILL_MIN_AGE */
const BILL_AGE_INTERVAL = 2;
const BILL_MIN_AGE = 19;

// Kematian acak
const OLD_AGE_START = 50;
const OLD_AGE_CHANCE_PER_YEAR = 1.5;
const LOW_HEALTH_THRESHOLD = 20;
const LOW_HEALTH_CHANCE = 20;
const CRITICAL_HEALTH_THRESHOLD = 10;
const CRITICAL_HEALTH_CHANCE = 40;

const MAX_QUEUE = 3;
const HAND_SIZE = 3;
const YEARLY_FOOD_DECAY = 3;
const EVENT_CHANCE = 0.3;

// Feed sosmed
export const FEED_SIZE = 3;

// Bunga pinjaman dan stres akibat utang
const DEBT_INTEREST = 0.2;
const DEBT_MENTAL_PENALTY = 2;

// Efek chat dengan teman
export const CHAT_MENTAL_GAIN = 10;
export const CHAT_MONEY_COST = 5;
const CHAT_REPLY_DELAY = 1000;

// Pasar modal
const STOCK_MAX_MOVE = 0.05;
const MEME_MIN_MOVE = -0.5;
const MEME_MAX_MOVE = 2;
const CRASH_MENTAL_PENALTY = 50;
const HISTORY_MAX = 10;
const HISTORY_INITIAL = 5;

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

let itemCounter = 0;
const newItemCardId = (baseId: string) => {
  itemCounter += 1;
  return `${baseId}-${Date.now()}-${itemCounter}`;
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

const defaultAssetPrices = (): Record<string, number> =>
  Object.fromEntries(ASSETS.map((a) => [a.id, a.basePrice]));

const defaultPortfolio = (): Record<string, number> =>
  Object.fromEntries(ASSETS.map((a) => [a.id, 0]));

const defaultPriceHistory = (): Record<string, number[]> =>
  Object.fromEntries(
    ASSETS.map((a) => [a.id, Array<number>(HISTORY_INITIAL).fill(a.basePrice)]),
  );

const clampStat = (n: number) => Math.max(0, Math.min(100, n));
const clampMoney = (n: number) => Math.max(0, n);

const isDead = (s: Stats) => s.mental <= 0 || s.health <= 0 || s.food <= 0;

const statDeathReason = (s: Stats): string => {
  if (s.health <= 0) return 'Meninggal karena kesehatan habis';
  if (s.food <= 0) return 'Meninggal karena kelaparan';
  return 'Kehilangan semangat hidup karena mental habis';
};

const calcDeathChance = (nextAge: number, health: number): number => {
  let chance = 0;
  if (nextAge >= OLD_AGE_START) {
    chance += (nextAge - OLD_AGE_START) * OLD_AGE_CHANCE_PER_YEAR;
  }
  if (health <= LOW_HEALTH_THRESHOLD) chance += LOW_HEALTH_CHANCE;
  if (health <= CRITICAL_HEALTH_THRESHOLD) chance += CRITICAL_HEALTH_CHANCE;
  return chance;
};

// < 15 = child, 15-18 = teen, >= 19: college (jika kuliah) / adult
const getStage = (age: number, path: PathChoice): LifeStage => {
  if (age < 15) return 'child';
  if (age < PATH_AGE) return 'teen';
  if (path === 'kuliah') return 'college';
  return 'adult';
};

const drawHand = (deck: Card[], age: number, path: PathChoice): Card[] => {
  const stage = getStage(age, path);
  const eligible = deck.filter((c) => !c.stage || c.stage.includes(stage));
  const pool = eligible.length > 0 ? [...eligible] : [...deck];
  const hand: Card[] = [];
  while (hand.length < HAND_SIZE && pool.length > 0) {
    const i = Math.floor(Math.random() * pool.length);
    hand.push(pool.splice(i, 1)[0]);
  }
  return hand;
};

/** Pilih NPC acak dari NPC_POOL yang belum jadi teman dan belum ada di `keep` */
const pickFeed = (friends: NPC[], keep: NPC[] = []): NPC[] => {
  const taken = new Set([...friends.map((f) => f.id), ...keep.map((k) => k.id)]);
  const pool = NPC_POOL.filter((n) => !taken.has(n.id));
  const result = [...keep];
  while (result.length < FEED_SIZE && pool.length > 0) {
    const i = Math.floor(Math.random() * pool.length);
    result.push(pool.splice(i, 1)[0]);
  }
  return result.slice(0, FEED_SIZE);
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
  age: START_AGE,
  actionPoints: MAX_AP,
  stats: defaultStats(),
  deck: [],
  hand: [],
  queue: [],
  discard: [],
  activeEvent: null,
  activeTrait: null,
  career: null,
  pathChoice: 'none',
  deathReason: null,
  isPhoneOpen: false,
  debt: 0,
  friends: defaultFriends(),
  socialFeed: [],
  activeApp: 'home',
  activeChatId: null,
  chatHistories: defaultChatHistories(),
  assetPrices: defaultAssetPrices(),
  portfolio: defaultPortfolio(),
  priceHistory: defaultPriceHistory(),

  initGame: () => {
    const deck = [...STARTER_DECK];
    set({
      status: 'playing',
      age: START_AGE,
      actionPoints: MAX_AP,
      stats: statsFromTrait(get().activeTrait),
      deck,
      hand: drawHand(deck, START_AGE, 'none'),
      queue: [],
      discard: [],
      activeEvent: null,
      career: null,
      pathChoice: 'none',
      deathReason: null,
      isPhoneOpen: false,
      debt: 0,
      friends: defaultFriends(),
      socialFeed: [],
      activeApp: 'home',
      activeChatId: null,
      chatHistories: defaultChatHistories(),
      assetPrices: defaultAssetPrices(),
      portfolio: defaultPortfolio(),
      priceHistory: defaultPriceHistory(),
    });
    get().generateFeed();
  },

  selectTrait: (traitId) => {
    const trait = TRAITS.find((t) => t.id === traitId);
    if (!trait) return;
    set({ activeTrait: trait });
    get().initGame();
  },

  selectCareer: (careerId) => {
    const { status, career, pathChoice, deck, age } = get();
    if (status !== 'playing' || career) return;
    if (pathChoice !== 'kerja') return;
    const picked = CAREERS_POOL.find((c) => c.id === careerId);
    if (!picked) return;
    set({
      career: picked,
      hand: drawHand(deck, age, pathChoice),
    });
  },

  choosePath: (path) => {
    const { status, pathChoice, age, deck } = get();
    if (status !== 'playing' || pathChoice !== 'none') return;
    if (age < PATH_AGE) return;

    if (path === 'kuliah') {
      // Item consumable dari toko tetap dibawa ke deck kuliah
      const consumables = deck.filter((c) => c.type === 'consumable');
      const collegeDeck = [
        ...STARTER_DECK.filter((c) => c.stage?.includes('college')),
        ...consumables,
      ];
      set({
        pathChoice: 'kuliah',
        deck: collegeDeck,
        hand: drawHand(collegeDeck, age, 'kuliah'),
        activeEvent: null,
      });
      return;
    }

    // 'kerja': CareerModal muncul karena career masih null
    set({
      pathChoice: 'kerja',
      hand: drawHand(deck, age, 'kerja'),
      activeEvent: null,
    });
  },

  reset: () => {
    set({
      status: 'idle',
      age: START_AGE,
      actionPoints: MAX_AP,
      stats: defaultStats(),
      deck: [],
      hand: [],
      queue: [],
      discard: [],
      activeEvent: null,
      activeTrait: null,
      career: null,
      pathChoice: 'none',
      deathReason: null,
      isPhoneOpen: false,
      debt: 0,
      friends: defaultFriends(),
      socialFeed: [],
      activeApp: 'home',
      activeChatId: null,
      chatHistories: defaultChatHistories(),
      assetPrices: defaultAssetPrices(),
      portfolio: defaultPortfolio(),
      priceHistory: defaultPriceHistory(),
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

  generateFeed: (keep = []) => {
    const { friends } = get();
    set({ socialFeed: pickFeed(friends, keep) });
  },

  followNpc: (npc) => {
    const { status } = get();
    if (status !== 'playing') return;

    get().addFriend(npc);

    // Hapus NPC yang di-follow, pertahankan sisanya, isi slot kosong
    const remaining = get().socialFeed.filter((n) => n.id !== npc.id);
    get().generateFeed(remaining);
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

  buyItem: (item) => {
    const { status, stats, deck } = get();
    if (status !== 'playing') return false;
    if (stats.money < item.price) return false;

    // ID unik per instance agar pembelian ganda tidak bentrok di hand
    const purchased: Card = {
      ...item.card,
      id: newItemCardId(item.card.id),
    };

    set({
      stats: { ...stats, money: clampMoney(stats.money - item.price) },
      deck: [...deck, purchased],
    });
    return true;
  },

  buyAsset: (assetId, quantity) => {
    const { status, stats, assetPrices, portfolio } = get();
    if (status !== 'playing') return false;
    if (!Number.isInteger(quantity) || quantity <= 0) return false;
    if (!ASSETS.some((a) => a.id === assetId)) return false;

    const price = assetPrices[assetId] ?? 0;
    if (price <= 0) return false;

    const cost = price * quantity;
    if (stats.money < cost) return false;

    set({
      stats: { ...stats, money: clampMoney(stats.money - cost) },
      portfolio: {
        ...portfolio,
        [assetId]: (portfolio[assetId] ?? 0) + quantity,
      },
    });
    return true;
  },

  sellAsset: (assetId, quantity) => {
    const { status, stats, assetPrices, portfolio } = get();
    if (status !== 'playing') return false;
    if (!Number.isInteger(quantity) || quantity <= 0) return false;
    if (!ASSETS.some((a) => a.id === assetId)) return false;

    const owned = portfolio[assetId] ?? 0;
    if (owned < quantity) return false;

    const price = assetPrices[assetId] ?? 0;

    set({
      stats: { ...stats, money: clampMoney(stats.money + price * quantity) },
      portfolio: { ...portfolio, [assetId]: owned - quantity },
    });
    return true;
  },

  updateMarketPrices: () => {
    const { status, assetPrices, portfolio, stats, priceHistory } = get();
    if (status !== 'playing') return;

    const prices: Record<string, number> = { ...assetPrices };
    const holdings: Record<string, number> = { ...portfolio };
    const history: Record<string, number[]> = { ...priceHistory };
    let crashPenalty = 0;

    for (const asset of ASSETS) {
      const prev = prices[asset.id] ?? asset.basePrice;
      let nextPrice: number;

      if (prev <= 0) {
        // Aset yang crash dilisting ulang di harga dasar
        nextPrice = asset.basePrice;
      } else if (asset.risk === 'safe') {
        const move = (Math.random() * 2 - 1) * STOCK_MAX_MOVE;
        nextPrice = Math.max(1, Math.round(prev * (1 + move)));
      } else if (asset.risk === 'gacha') {
        nextPrice = Math.random() < 0.5 ? prev * 2 : 0;
      } else {
        const move =
          MEME_MIN_MOVE + Math.random() * (MEME_MAX_MOVE - MEME_MIN_MOVE);
        nextPrice = Math.max(1, Math.round(prev * (1 + move)));
      }

      if (nextPrice <= 0 && prev > 0) {
        nextPrice = 0;
        if ((holdings[asset.id] ?? 0) > 0) {
          crashPenalty += CRASH_MENTAL_PENALTY;
          holdings[asset.id] = 0;
        }
      }

      prices[asset.id] = nextPrice;

      // Riwayat harga: dorong harga baru, batasi maksimal HISTORY_MAX titik
      const past = history[asset.id] ?? [];
      const appended = [...past, nextPrice];
      history[asset.id] =
        appended.length > HISTORY_MAX
          ? appended.slice(appended.length - HISTORY_MAX)
          : appended;
    }

    const nextStats: Stats = {
      ...stats,
      mental: clampStat(stats.mental - crashPenalty),
    };
    const dead = isDead(nextStats);

    set({
      assetPrices: prices,
      portfolio: holdings,
      priceHistory: history,
      stats: nextStats,
      status: dead ? 'lost' : 'playing',
      deathReason: dead
        ? crashPenalty > 0 && nextStats.mental <= 0
          ? 'Depresi berat setelah aset investasi anjlok jadi nol'
          : statDeathReason(nextStats)
        : get().deathReason,
      activeEvent: dead ? null : get().activeEvent,
      isPhoneOpen: dead ? false : get().isPhoneOpen,
    });
  },

  playCard: (cardId) => {
    const {
      hand,
      stats,
      deck,
      queue,
      age,
      actionPoints,
      status,
      activeEvent,
      debt,
      career,
      pathChoice,
    } = get();

    if (status !== 'playing' || activeEvent) return;
    if (actionPoints <= 0) return;
    // Umur 19 tanpa pilihan jalan: modal jalan hidup wajib muncul dulu
    if (age >= PATH_AGE && pathChoice === 'none') return;
    // Jalur kerja tanpa karir: modal karir wajib muncul dulu
    if (pathChoice === 'kerja' && career === null) return;

    const card = hand.find((c) => c.id === cardId);
    if (!card) return;

    // Kartu "Kerja" hanya untuk pemain di jalur kerja
    if (card.isDynamicWork && (pathChoice !== 'kerja' || age < CAREER_AGE)) {
      return;
    }

    const effects: CardEffects =
      card.isDynamicWork && career
        ? { money: career.salary, mental: career.mentalCost }
        : card.effects;
    const penalty = card.type === 'curse' ? CURSE_PENALTY : null;
    const debtStress = debt > 0 ? DEBT_MENTAL_PENALTY : 0;

    const next: Stats = {
      health: clampStat(
        stats.health + (effects.health ?? 0) + (penalty?.health ?? 0),
      ),
      food: clampStat(
        stats.food +
          (effects.food ?? 0) +
          (penalty?.food ?? 0) -
          YEARLY_FOOD_DECAY,
      ),
      money: clampMoney(
        stats.money + (effects.money ?? 0) + (penalty?.money ?? 0),
      ),
      mental: clampStat(
        stats.mental +
          (effects.mental ?? 0) +
          (penalty?.mental ?? 0) -
          debtStress,
      ),
    };

    const statsDead = isDead(next);

    // Kartu consumable habis dipakai: dibuang dari deck
    const nextDeck =
      card.type === 'consumable'
        ? deck.filter((c) => c.id !== card.id)
        : deck;

    // Kurangi AP; jika habis, umur +1 dan AP di-reset
    const apAfter = actionPoints - 1;
    const agedUp = apAfter <= 0;
    const nextAge = agedUp ? age + 1 : age;
    const nextAP = agedUp ? MAX_AP : apAfter;

    // Kematian acak: dicek tiap pergantian umur
    let randomDeath = false;
    if (agedUp && !statsDead) {
      const deathChance = calcDeathChance(nextAge, next.health);
      const roll = Math.random() * 100;
      randomDeath = deathChance > 0 && roll < deathChance;
    }

    const lost = statsDead || randomDeath;

    let deathReason: string | null = null;
    if (statsDead) {
      deathReason = statDeathReason(next);
    } else if (randomDeath) {
      deathReason =
        nextAge > OLD_AGE_START
          ? 'Meninggal karena sakit di usia tua'
          : 'Meninggal mendadak karena kesehatan memburuk';
    }

    // Umur 19 tanpa pilihan: tahan event acak agar modal jalan hidup muncul
    const awaitingPath = nextAge >= PATH_AGE && pathChoice === 'none';

    let event: GameEvent | null = null;
    if (!lost && !awaitingPath) {
      if (
        agedUp &&
        nextAge > BILL_MIN_AGE &&
        nextAge % BILL_AGE_INTERVAL === 0
      ) {
        // Tagihan wajib tiap 2 tahun (umur > 19)
        event = BILL_EVENT;
      } else if (Math.random() < EVENT_CHANCE) {
        event = EVENTS_POOL[Math.floor(Math.random() * EVENTS_POOL.length)];
      }
    }

    set({
      stats: next,
      age: nextAge,
      actionPoints: nextAP,
      deck: nextDeck,
      queue: [...queue, card].slice(-MAX_QUEUE),
      hand: drawHand(nextDeck, nextAge, pathChoice),
      status: lost ? 'lost' : 'playing',
      deathReason,
      activeEvent: event,
      isPhoneOpen: lost || awaitingPath ? false : get().isPhoneOpen,
    });

    // Umur bertambah (AP habis): pasar bergerak
    if (agedUp && !lost) {
      get().updateMarketPrices();
    }
  },

  resolveEvent: (choiceIndex) => {
    const { activeEvent, stats, status, debt } = get();
    if (!activeEvent || status !== 'playing') return;

    const choice = activeEvent.choices[choiceIndex];
    if (!choice) return;

    const next: Stats = {
      health: clampStat(stats.health + (choice.effects.health ?? 0)),
      food: clampStat(stats.food + (choice.effects.food ?? 0)),
      money: clampMoney(stats.money + (choice.effects.money ?? 0)),
      mental: clampStat(stats.mental + (choice.effects.mental ?? 0)),
    };

    const nextDebt = choice.effects.debt
      ? Math.max(0, debt + choice.effects.debt)
      : debt;

    const dead = isDead(next);

    set({
      stats: next,
      debt: nextDebt,
      activeEvent: null,
      status: dead ? 'lost' : 'playing',
      deathReason: dead ? statDeathReason(next) : null,
    });
  },
}));