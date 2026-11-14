import { useEffect } from 'react';
import {
  Pause,
  Play,
  Wheat,
  Heart,
  Coins,
  CalendarDays,
  type LucideIcon,
} from 'lucide-react';
import {
  useGameStore,
  DAY_MS,
  MAX_QUEUE,
  WIN_DAY,
} from '../store/useGameStore';
import { GameCard } from './GameCard';
import type { GameSpeed } from '../types/game';

const SPEEDS: { value: GameSpeed; label: string }[] = [
  { value: 0.5, label: '0.5x' },
  { value: 1, label: '1x' },
  { value: 2, label: '2x' },
];

function Stat({
  Icon,
  label,
  value,
  barClass,
}: {
  Icon: LucideIcon;
  label: string;
  value: number;
  barClass: string;
}) {
  return (
    <div className="flex-1 rounded-2xl bg-white/10 p-3">
      <div className="flex items-center justify-between text-sm font-bold">
        <span className="flex items-center gap-2">
          <Icon className="h-5 w-5" strokeWidth={2.5} />
          {label}
        </span>
        <span>{value}</span>
      </div>
      <div className="mt-2 h-3 overflow-hidden rounded-full bg-navy-dark/60">
        <div
          className={`h-full rounded-full transition-all duration-300 ${barClass}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export default function GameBoard() {
  const status = useGameStore((s) => s.status);
  const day = useGameStore((s) => s.day);
  const paused = useGameStore((s) => s.isPaused);
  const speed = useGameStore((s) => s.speed);
  const stats = useGameStore((s) => s.stats);
  const hand = useGameStore((s) => s.hand);
  const queue = useGameStore((s) => s.queue);
  const enqueue = useGameStore((s) => s.queueCard);
  const tick = useGameStore((s) => s.tick);
  const togglePause = useGameStore((s) => s.togglePause);
  const setSpeed = useGameStore((s) => s.setSpeed);

  useEffect(() => {
    if (status !== 'playing' || paused) return;
    const id = window.setInterval(tick, DAY_MS / speed);
    return () => window.clearInterval(id);
  }, [status, paused, speed, tick]);

  const queueFull = queue.length >= MAX_QUEUE;

  return (
    <main className="relative flex min-h-screen flex-col gap-6 bg-navy px-4 py-6 md:px-8">
      {/* Top bar */}
      <header className="mx-auto flex w-full max-w-5xl flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-3xl font-black tracking-tight">
            Plus<span className="text-sunny">62</span>Sim
          </h1>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-2 font-black">
              <CalendarDays className="h-5 w-5" strokeWidth={2.5} />
              Hari {day}/{WIN_DAY}
            </span>
            <button
              type="button"
              onClick={togglePause}
              aria-label={paused ? 'Lanjutkan' : 'Jeda'}
              className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sunny text-navy-dark shadow-[0_4px_0_0_#C98A1E] outline-none transition-all duration-300 active:translate-y-1 active:shadow-none focus-visible:ring-4 focus-visible:ring-sunny"
            >
              {paused ? (
                <Play className="h-6 w-6" strokeWidth={2.5} />
              ) : (
                <Pause className="h-6 w-6" strokeWidth={2.5} />
              )}
            </button>
            <div className="flex overflow-hidden rounded-2xl bg-white/10">
              {SPEEDS.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setSpeed(value)}
                  className={`px-3 py-2 text-sm font-black transition-all duration-300 ${
                    speed === value ? 'bg-teal text-navy-dark' : 'text-white/70'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 md:flex-row">
          <Stat Icon={Wheat} label="Makanan" value={stats.food} barClass="bg-sunny" />
          <Stat Icon={Heart} label="Kesehatan" value={stats.health} barClass="bg-coral" />
          <Stat Icon={Coins} label="Kekayaan" value={stats.wealth} barClass="bg-teal" />
        </div>
      </header>

      {/* Queue */}
      <section className="mx-auto w-full max-w-5xl">
        <h2 className="mb-3 text-sm font-black uppercase tracking-widest text-white/60">
          Antrean ({queue.length}/{MAX_QUEUE})
        </h2>
        <div className="flex min-h-40 items-center gap-4 rounded-3xl bg-white/5 p-4 md:min-h-48">
          {queue.map(({ uid, card }) => (
            <GameCard key={uid} card={card} size="queue" />
          ))}
          {Array.from({ length: MAX_QUEUE - queue.length }).map((_, i) => (
            <div
              key={`slot-${i}`}
              className="h-36 w-28 shrink-0 rounded-2xl border-4 border-dashed border-white/15 md:h-44 md:w-36"
            />
          ))}
        </div>
      </section>

      {/* Hand */}
      <section className="mx-auto mt-auto w-full max-w-5xl pb-4">
        <h2 className="mb-3 text-sm font-black uppercase tracking-widest text-white/60">
          Tangan
        </h2>
        <div className="flex items-end gap-4 overflow-x-auto pb-4 pt-2">
          {hand.map(({ uid, card }) => (
            <GameCard
              key={uid}
              card={card}
              disabled={queueFull || status !== 'playing'}
              onClick={() => enqueue(uid)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}