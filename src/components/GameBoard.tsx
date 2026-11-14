import { Utensils, Heart, Coins, RotateCcw, type LucideIcon } from 'lucide-react';
import { useGameStore } from '../store/useGameStore';
import CardView from './CardView';
import { SquigglyPattern } from './SquigglyPattern';

interface StatBarProps {
  label: string;
  value: number;
  Icon: LucideIcon;
  barClass: string;
}

function StatBar({ label, value, Icon, barClass }: StatBarProps) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className="flex min-w- flex-1 items-center gap-3">
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${barClass}`}>
        <Icon className="h-5 w-5 text-white" strokeWidth={2.5} />
      </div>
      <div className="flex-1">
        <div className="mb-1 flex justify-between text-xs font-bold uppercase tracking-wide text-white/80">
          <span>{label}</span>
          <span>{Math.round(value)}</span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-white/15">
          <div
            className={`h-full rounded-full transition-[width] duration-300 ${barClass}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default function GameBoard() {
  const status = useGameStore((s) => s.status);
  const stats = useGameStore((s) => s.stats);
  const hand = useGameStore((s) => s.hand);
  const playCard = useGameStore((s) => s.playCard);
  const reset = useGameStore((s) => s.reset);

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-navy">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <SquigglyPattern variant={1} />
      </div>

      <header className="relative z-10 flex flex-wrap items-center gap-4 bg-navy-dark/80 px-6 py-4 backdrop-blur">
        <h1 className="font-display text-2xl font-black tracking-tight">
          Plus<span className="text-sunny">62</span>Sim
        </h1>

        <div className="flex flex-1 flex-wrap items-center gap-6">
          <StatBar label="Makanan" value={stats.food} Icon={Utensils} barClass="bg-sunny" />
          <StatBar label="Kesehatan" value={stats.health} Icon={Heart} barClass="bg-coral" />
          <StatBar label="Kekayaan" value={stats.wealth} Icon={Coins} barClass="bg-teal" />
        </div>
      </header>

      <section className="relative z-10 flex flex-1 items-center justify-center px-6 py-10">
        <div className="flex flex-wrap items-center justify-center gap-6">
          {hand.map((card) => (
            <CardView key={card.id} card={card} onClick={() => playCard(card.id)} />
          ))}
        </div>
      </section>

      {status === 'lost' && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-navy-dark/90 px-6 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-coral p-8 text-center shadow-coral">
            <h2 className="text-5xl font-black tracking-tight">Game Over</h2>
            <p className="mt-3 text-lg font-semibold text-white/90">
              Makanan atau kesehatanmu habis.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-lg font-black text-coral-dark transition-transform hover:-translate-y-1 active:translate-y-0.5"
            >
              <RotateCcw className="h-5 w-5" strokeWidth={2.5} />
              Main Lagi
            </button>
          </div>
        </div>
      )}
    </main>
  );
}