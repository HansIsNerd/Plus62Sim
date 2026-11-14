import {
  Coins,
  Zap,
  Brain,
  Pause,
  Play,
  RotateCcw,
  CalendarDays,
  type LucideIcon,
} from 'lucide-react';
import CardView from './CardView';
import { SquigglyPattern } from './SquigglyPattern';
import { useGameLoop } from '../hooks/useGameLoop';
import { MAX_QUEUE, MAX_STAT, useGameStore } from '../store/useGameStore';
import type { GameSpeed } from '../types/card';
import type { EraId } from '../types/era';

const ERA_LABEL: Record<EraId, string> = {
  purba: 'Purba',
  kerajaan: 'Kerajaan',
  modern: 'Modern',
};

const SPEEDS: { value: GameSpeed; label: string }[] = [
  { value: 0.5, label: '0.5x' },
  { value: 1, label: '1x' },
  { value: 2, label: '2x' },
];

interface StatBarProps {
  label: string;
  Icon: LucideIcon;
  value: number;
  barClass: string;
  max?: number;
}

function StatBar({ label, Icon, value, barClass, max = MAX_STAT }: StatBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-1.5">
      <div className="flex items-center justify-between text-sm font-extrabold">
        <span className="inline-flex items-center gap-1.5 text-white/80">
          <Icon className="h-4 w-4" strokeWidth={3} />
          {label}
        </span>
        <span>{value}</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-white/15">
        <div
          className={`h-full rounded-full transition-all duration-300 ${barClass}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default function GameBoard() {
  const eraId = useGameStore((s) => s.eraId);
  const day = useGameStore((s) => s.day);
  const stats = useGameStore((s) => s.stats);
  const hand = useGameStore((s) => s.hand);
  const queue = useGameStore((s) => s.queue);
  const deckCount = useGameStore((s) => s.deck.length);
  const discardCount = useGameStore((s) => s.discard.length);
  const isPaused = useGameStore((s) => s.isPaused);
  const speed = useGameStore((s) => s.speed);
  const isGameOver = useGameStore((s) => s.isGameOver);
  const gameOverReason = useGameStore((s) => s.gameOverReason);
  const togglePause = useGameStore((s) => s.togglePause);
  const setSpeed = useGameStore((s) => s.setSpeed);
  const initGame = useGameStore((s) => s.initGame);
  const resetGame = useGameStore((s) => s.resetGame);

  const { progressRef } = useGameLoop();

  if (!eraId) return null;

  const emptySlots = Array.from({ length: MAX_QUEUE - queue.length });

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-navy px-4 py-6 md:px-8">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <SquigglyPattern variant={1} />
      </div>

      {/* HEADER */}
      <header className="relative mx-auto flex w-full max-w-5xl flex-col gap-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight md:text-4xl">
              Plus<span className="text-sunny">62</span>Sim
            </h1>
            <p className="text-sm font-bold text-white/60">
              Era {ERA_LABEL[eraId]}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-2xl bg-navy-dark px-4 py-2.5 text-lg font-black">
              <CalendarDays className="h-5 w-5 text-sunny" strokeWidth={2.5} />
              Hari {day}
            </div>

            <button
              type="button"
              onClick={togglePause}
              disabled={isGameOver}
              aria-label={isPaused ? 'Lanjutkan' : 'Jeda'}
              className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sunny text-navy-dark shadow-sunny outline-none transition-all duration-150 enabled:hover:-translate-y-0.5 enabled:active:translate-y-1 enabled:active:shadow-none focus-visible:ring-4 focus-visible:ring-white/70 disabled:opacity-50"
            >
              {isPaused ? (
                <Play className="h-6 w-6" strokeWidth={3} />
              ) : (
                <Pause className="h-6 w-6" strokeWidth={3} />
              )}
            </button>

            <div className="flex gap-1 rounded-2xl bg-navy-dark p-1">
              {SPEEDS.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setSpeed(value)}
                  className={`rounded-xl px-3 py-2 text-sm font-black outline-none transition-colors focus-visible:ring-2 focus-visible:ring-white/70 ${
                    speed === value
                      ? 'bg-teal text-navy-dark'
                      : 'text-white/70 hover:bg-white/10'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="flex flex-col gap-4 rounded-3xl bg-navy-dark p-5 md:flex-row md:gap-6">
          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            <div className="flex items-center justify-between text-sm font-extrabold">
              <span className="inline-flex items-center gap-1.5 text-white/80">
                <Coins className="h-4 w-4" strokeWidth={3} />
                Uang
              </span>
              <span className={stats.money < 10 ? 'text-coral' : ''}>
                {stats.money}
              </span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-white/15">
              <div
                className="h-full rounded-full bg-sunny transition-all duration-300"
                style={{ width: `${Math.min(100, Math.max(0, stats.money))}%` }}
              />
            </div>
          </div>
          <StatBar
            label="Energi"
            Icon={Zap}
            value={stats.energy}
            barClass="bg-teal"
          />
          <StatBar
            label="Mental"
            Icon={Brain}
            value={stats.mental}
            barClass="bg-coral"
          />
        </div>

        {/* TICK PROGRESS */}
        <div className="h-2 overflow-hidden rounded-full bg-white/10">
          <div
            ref={progressRef}
            className="h-full w-0 rounded-full bg-white/70"
          />
        </div>
      </header>

      {/* QUEUE */}
      <section className="relative mx-auto mt-8 w-full max-w-5xl">
        <h2 className="mb-3 text-sm font-black uppercase tracking-widest text-white/60">
          Antrean ({queue.length}/{MAX_QUEUE})
        </h2>
        <div className="flex flex-wrap justify-center gap-4 md:justify-start">
          {queue.map((card) => (
            <CardView key={card.id} card={card} location="queue" />
          ))}
          {emptySlots.map((_, i) => (
            <div
              key={`slot-${i}`}
              className="flex h-56 w-40 items-center justify-center rounded-2xl border-4 border-dashed border-white/20 text-sm font-extrabold text-white/30 md:h-64 md:w-48"
            >
              Slot kosong
            </div>
          ))}
        </div>
      </section>

      {/* HAND */}
      <section className="relative mx-auto mt-10 w-full max-w-5xl pb-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-black uppercase tracking-widest text-white/60">
            Tangan ({hand.length})
          </h2>
          <p className="text-xs font-bold text-white/50">
            Deck {deckCount} · Buangan {discardCount}
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 md:justify-start">
          {hand.map((card) => (
            <CardView key={card.id} card={card} location="hand" />
          ))}
        </div>
      </section>

      {/* GAME OVER */}
      {isGameOver && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-dark/90 p-6"
        >
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-coral p-8 text-center shadow-coral-lg">
            <SquigglyPattern variant={0} />
            <div className="relative">
              <h2 className="text-5xl font-black tracking-tight">Tamat</h2>
              <p className="mt-3 text-lg font-bold text-white/90">
                {gameOverReason}
              </p>
              <p className="mt-1 text-base font-semibold text-white/80">
                Bertahan {day - 1} hari.
              </p>

              <div className="mt-8 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => initGame(eraId)}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-sunny px-6 py-3 text-lg font-black text-navy-dark shadow-sunny outline-none transition-all duration-150 hover:-translate-y-0.5 active:translate-y-1 active:shadow-none focus-visible:ring-4 focus-visible:ring-white/70"
                >
                  <RotateCcw className="h-5 w-5" strokeWidth={3} />
                  Main Lagi
                </button>
                <button
                  type="button"
                  onClick={resetGame}
                  className="rounded-2xl bg-white/20 px-6 py-3 text-lg font-black outline-none transition-colors hover:bg-white/30 focus-visible:ring-4 focus-visible:ring-white/70"
                >
                  Pilih Era Lain
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}