import { Trophy, Skull, RotateCcw } from 'lucide-react';
import { useGameStore, WIN_DAY } from '../store/useGameStore';

export function GameOverOverlay() {
  const status = useGameStore((s) => s.status);
  const day = useGameStore((s) => s.day);
  const reset = useGameStore((s) => s.reset);

  if (status !== 'won' && status !== 'lost') return null;

  const won = status === 'won';
  const Icon = won ? Trophy : Skull;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy-dark/70 px-6 backdrop-blur-md transition-all duration-300"
    >
      <div
        className={`relative w-full max-w-md overflow-hidden rounded-3xl p-8 text-center text-white ${
          won ? 'bg-teal shadow-teal-lg' : 'bg-coral shadow-coral-lg'
        }`}
      >
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-white/20">
          <Icon className="h-14 w-14" strokeWidth={2.5} />
        </div>
        <h2 className="mt-6 text-5xl font-black tracking-tight">
          {won ? 'Menang!' : 'Game Over'}
        </h2>
        <p className="mt-3 text-lg font-semibold text-white/85">
          {won
            ? `Kamu bertahan sampai hari ke-${WIN_DAY}.`
            : `Kamu gugur di hari ke-${day}.`}
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-navy px-8 py-4 text-xl font-black text-white shadow-[0_6px_0_0_#1B2352] outline-none transition-all duration-300 hover:-translate-y-1 active:translate-y-1 active:shadow-none focus-visible:ring-4 focus-visible:ring-white"
        >
          <RotateCcw className="h-6 w-6" strokeWidth={2.5} />
          Main Lagi
        </button>
      </div>
    </div>
  );
}