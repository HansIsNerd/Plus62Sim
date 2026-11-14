import {
  Heart,
  Utensils,
  Coins,
  Brain,
  Skull,
  RotateCcw,
  type LucideIcon,
} from 'lucide-react';
import { useGameStore } from '../store/useGameStore';
import { SquigglyPattern } from './SquigglyPattern';
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


export default function GameBoard() {
  const stats = useGameStore((s) => s.stats);
  const hand = useGameStore((s) => s.hand);
  const day = useGameStore((s) => s.day);
  const status = useGameStore((s) => s.status);
  const playCard = useGameStore((s) => s.playCard);
  const initGame = useGameStore((s) => s.initGame);
  const resetGame = useGameStore((s) => s.resetGame);

  return (
    <main className="relative flex min-h-screen flex-col bg-navy px-4 py-4 md:px-6">
      <header className="mx-auto w-full max-w-5xl">
        <div className="mb-2 flex items-center justify-between">
          <h1 className="text-lg font-black tracking-tight">
            Plus<span className="text-sunny">62</span>Sim
          </h1>
          <span className="text-xs font-bold text-white/70">HARI {day}</span>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {STATS.map(({ key, label, Icon, barClass }) => (
            <div
              key={key}
              className="rounded-xl bg-navy-dark/60 px-2 py-1.5"
            >
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
      </header>

      <section className="mx-auto mt-8 grid w-full max-w-5xl flex-1 grid-cols-1 content-center gap-6 pb-6 md:grid-cols-3">
        {hand.map((card) => {
          const { Icon } = card;
          return (
            <button
              key={card.id}
              type="button"
              disabled={status !== 'playing'}
              onClick={() => playCard(card.id)}
              className={`group relative flex min-h-48 flex-col justify-between overflow-hidden rounded-3xl p-6 text-left text-white outline-none transition-all duration-200 ease-out hover:-translate-y-2 active:translate-y-1 disabled:opacity-50 ${CARD_CLASS[card.color]}`}
            >
              <SquigglyPattern variant={0} />
              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
                <Icon size={30} strokeWidth={2.5} />
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

      {status === 'lost' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-dark/90 px-6">
          <div className="w-full max-w-md rounded-3xl bg-coral p-8 text-center shadow-coral">
            <Skull className="mx-auto h-14 w-14" strokeWidth={2.5} />
            <h2 className="mt-4 text-4xl font-black tracking-tight">
              Game Over
            </h2>
            <p className="mt-2 text-base font-semibold text-white/85">
              Kamu bertahan selama {day - 1} hari.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <button
                type="button"
                onClick={initGame}
                className="flex items-center justify-center gap-2 rounded-2xl bg-sunny px-6 py-3 font-black text-white shadow-sunny transition-all hover:-translate-y-1 hover:shadow-sunny-lg active:translate-y-1"
              >
                <RotateCcw size={18} strokeWidth={2.5} />
                Main Lagi
              </button>
              <button
                type="button"
                onClick={resetGame}
                className="rounded-2xl bg-white/20 px-6 py-3 font-black text-white transition-all hover:bg-white/30"
              >
                Pilih Era
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}