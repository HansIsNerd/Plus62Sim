import { Coins, Zap, Brain, Play, Pause, FastForward, CalendarDays, type LucideIcon } from 'lucide-react';
import { useGameStore } from '../store/useGameStore';
import CardView from './CardView';

interface StatItemProps {
  Icon: LucideIcon;
  label: string;
  value: number;
  color: string;
}

function StatItem({ Icon, label, value, color }: StatItemProps) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-2">
      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${color}`}>
        <Icon className="h-5 w-5" strokeWidth={2.5} />
      </div>
      <div className="leading-tight">
        <p className="text-xs font-semibold uppercase tracking-wide text-white/60">
          {label}
        </p>
        <p className="text-xl font-extrabold">{value}</p>
      </div>
    </div>
  );
}

export default function GameBoard() {
  const day = useGameStore((s) => s.day);
  const stats = useGameStore((s) => s.stats);
  const isPaused = useGameStore((s) => s.isPaused);
  const speed = useGameStore((s) => s.speed);
  const hand = useGameStore((s) => s.hand);
  const queue = useGameStore((s) => s.queue);
  const togglePause = useGameStore((s) => s.togglePause);
  const cycleSpeed = useGameStore((s) => s.cycleSpeed);
  const playCard = useGameStore((s) => s.playCard);
  const removeFromQueue = useGameStore((s) => s.removeFromQueue);

  const queueFull = queue.every((c) => c !== null);

  return (
    <div className="flex min-h-screen flex-col bg-navy text-white">
      {/* Top Bar */}
      <header className="flex flex-wrap items-center justify-between gap-4 border-b-4 border-navy-dark bg-navy-dark/60 px-8 py-4">
        <div className="flex flex-wrap items-center gap-4">
          <StatItem Icon={Coins} label="Uang" value={stats.money} color="bg-sunny" />
          <StatItem Icon={Zap} label="Energi" value={stats.energy} color="bg-teal" />
          <StatItem Icon={Brain} label="Mental" value={stats.mental} color="bg-coral" />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-2">
            <CalendarDays className="h-6 w-6 text-sunny" strokeWidth={2.5} />
            <span className="text-xl font-extrabold">Hari ke-{day}</span>
          </div>

          <button
            type="button"
            onClick={togglePause}
            aria-label={isPaused ? 'Mainkan' : 'Jeda'}
            className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal text-white shadow-[0_5px_0_0_#4A9E7E] outline-none transition-all hover:-translate-y-0.5 active:translate-y-1 active:shadow-none focus-visible:ring-4 focus-visible:ring-white/60"
          >
            {isPaused ? (
              <Play className="h-7 w-7" strokeWidth={2.5} />
            ) : (
              <Pause className="h-7 w-7" strokeWidth={2.5} />
            )}
          </button>

          <button
            type="button"
            onClick={cycleSpeed}
            aria-label="Ubah kecepatan"
            className="flex h-14 items-center gap-2 rounded-2xl bg-sunny px-5 text-white shadow-[0_5px_0_0_#C98A1E] outline-none transition-all hover:-translate-y-0.5 active:translate-y-1 active:shadow-none focus-visible:ring-4 focus-visible:ring-white/60"
          >
            <FastForward className="h-7 w-7" strokeWidth={2.5} />
            <span className="text-lg font-extrabold">{speed}x</span>
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="flex flex-1 flex-col justify-between gap-10 px-8 py-8">
        {/* Action Queue */}
        <section>
          <h2 className="mb-4 text-2xl font-extrabold tracking-tight">
            Antrean Aksi{' '}
            <span className="text-white/50">
              ({queue.filter(Boolean).length}/{queue.length})
            </span>
          </h2>
          <div className="grid grid-cols-3 gap-6">
            {queue.map((card, i) => (
              <div
                key={i}
                className={`h-48 rounded-2xl ${
                  card ? '' : 'border-4 border-dashed border-white/30 bg-white/5'
                }`}
              >
                {card ? (
                  <CardView card={card} onClick={() => removeFromQueue(i)} />
                ) : (
                  <div className="flex h-full items-center justify-center text-lg font-bold text-white/30">
                    Slot {i + 1}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Hand Area */}
        <section>
          <h2 className="mb-4 text-2xl font-extrabold tracking-tight">
            Tangan <span className="text-white/50">({hand.length})</span>
          </h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
            {hand.map((card) => (
              <div key={card.id} className="h-48">
                <CardView
                  card={card}
                  onClick={() => playCard(card.id)}
                  disabled={queueFull}
                />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}