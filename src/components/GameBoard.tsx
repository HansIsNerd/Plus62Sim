import {
  Heart,
  Utensils,
  Coins,
  Brain,
  Users,
  Smartphone,
  type LucideIcon,
} from 'lucide-react';
import {
  useGameStore,
  WIN_DAY,
  NPC_BONUS_THRESHOLD,
} from '../store/useGameStore';
import { SquigglyPattern } from './SquigglyPattern';
import EventModal from './EventModal';
import PhoneModal from './PhoneModal';
import { GameOverOverlay } from './GameOverOverlay';
import type { CardColor } from '../data/cards';

interface StatConfig {
  key: 'health' | 'food' | 'wealth' | 'mental';
  label: string;
  Icon: LucideIcon;
  barClass: string;
}

const STATS: StatConfig[] = [
  { key: 'health', label: 'HEALTH', Icon: Heart, barClass: 'bg-coral' },
  { key: 'food', label: 'FOOD', Icon: Utensils, barClass: 'bg-sunny' },
  { key: 'wealth', label: 'WEALTH', Icon: Coins, barClass: 'bg-teal' },
  { key: 'mental', label: 'MENTAL', Icon: Brain, barClass: 'bg-white' },
];

const CARD_CLASS: Record<CardColor, string> = {
  coral: 'bg-coral shadow-coral hover:shadow-coral-lg',
  sunny: 'bg-sunny shadow-sunny hover:shadow-sunny-lg',
  teal: 'bg-teal shadow-teal hover:shadow-teal-lg',
};

const VARIANT: Record<CardColor, 0 | 1 | 2> = { coral: 0, sunny: 1, teal: 2 };

export default function GameBoard() {
  const stats = useGameStore((s) => s.stats);
  const hand = useGameStore((s) => s.hand);
  const day = useGameStore((s) => s.day);
  const status = useGameStore((s) => s.status);
  const activeEvent = useGameStore((s) => s.activeEvent);
  const activeTrait = useGameStore((s) => s.activeTrait);
  const npcRelations = useGameStore((s) => s.npcRelations);
  const isPhoneOpen = useGameStore((s) => s.isPhoneOpen);
  const debt = useGameStore((s) => s.debt);
  const playCard = useGameStore((s) => s.playCard);
  const togglePhone = useGameStore((s) => s.togglePhone);

  const locked = status !== 'playing' || !!activeEvent || isPhoneOpen;
  const relationEntries = Object.entries(npcRelations);

  return (
    <main className="relative flex min-h-screen flex-col bg-navy px-4 py-4 md:px-6">
      <header className="mx-auto w-full max-w-5xl">
        <div className="mb-2 flex items-center justify-between">
          <h1 className="text-lg font-black tracking-tight">
            Plus<span className="text-sunny">62</span>Sim
            {activeTrait && (
              <span className="ml-2 rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-bold uppercase">
                {activeTrait.name}
              </span>
            )}
          </h1>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-white/70">
              HARI {day} / {WIN_DAY}
            </span>
            <button
              type="button"
              onClick={togglePhone}
              disabled={status !== 'playing'}
              aria-label="Buka HP"
              className="relative rounded-xl bg-white/20 p-2 text-white outline-none transition-colors hover:bg-white/30 focus-visible:ring-4 focus-visible:ring-sunny disabled:opacity-50"
            >
              <Smartphone size={18} strokeWidth={2.5} />
              {debt > 0 && (
                <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-coral" />
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {STATS.map(({ key, label, Icon, barClass }) => (
            <div key={key} className="rounded-xl bg-navy-dark/60 px-2 py-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Icon size={14} strokeWidth={2.5} />
                  <span className="text-[10px] font-bold text-white/80">
                    {label}
                  </span>
                </div>
                <span className="text-xs font-bold">{stats[key]}</span>
              </div>
              <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/15">
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 ${barClass}`}
                  style={{ width: `${stats[key]}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {relationEntries.length > 0 && (
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 text-white/60">
              <Users size={12} strokeWidth={2.5} />
              <span className="text-[10px] font-bold uppercase">Relasi</span>
            </div>
            {relationEntries.map(([name, value]) => {
              const bonusActive = value > NPC_BONUS_THRESHOLD;
              return (
                <div
                  key={name}
                  className="flex min-w-28 flex-1 items-center gap-2 rounded-full bg-navy-dark/60 px-3 py-1 sm:max-w-48"
                >
                  <span className="text-[10px] font-bold uppercase text-white/80">
                    {name}
                  </span>
                  <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/15">
                    <div
                      className={`h-1 rounded-full transition-all duration-300 ${
                        bonusActive ? 'bg-sunny' : 'bg-white/60'
                      }`}
                      style={{ width: `${value}%` }}
                    />
                  </div>
                  <span
                    className={`text-[10px] font-bold ${
                      bonusActive ? 'text-sunny' : 'text-white/70'
                    }`}
                  >
                    {value}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </header>

      <section className="mx-auto mt-8 grid w-full max-w-5xl flex-1 grid-cols-1 content-center gap-6 pb-6 md:grid-cols-3">
        {hand.map((card) => {
          const { Icon } = card;
          return (
            <button
              key={card.id}
              type="button"
              disabled={locked}
              onClick={() => playCard(card.id)}
              className={`group relative flex min-h-48 flex-col justify-between overflow-hidden rounded-3xl p-6 text-left text-white outline-none transition-all duration-200 ease-out hover:-translate-y-2 active:translate-y-1 disabled:opacity-50 ${CARD_CLASS[card.color]}`}
            >
              <SquigglyPattern variant={VARIANT[card.color]} />
              <div className="relative flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
                  <Icon size={30} strokeWidth={2.5} />
                </div>
                {card.type === 'curse' && (
                  <span className="rounded-full bg-navy-dark/60 px-2 py-0.5 text-[10px] font-black uppercase">
                    Curse
                  </span>
                )}
              </div>
              <div className="relative">
                <h2 className="text-3xl font-black leading-none tracking-tight">
                  {card.title}
                </h2>
                <p className="mt-2 text-sm font-semibold text-white/85">
                  {card.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {Object.entries(card.effects).map(([k, v]) => (
                    <span
                      key={k}
                      className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold uppercase"
                    >
                      {k} {v! > 0 ? '+' : ''}
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          );
        })}
      </section>

      <GameOverOverlay />
      {activeEvent && <EventModal />}
      {isPhoneOpen && <PhoneModal />}
    </main>
  );
}