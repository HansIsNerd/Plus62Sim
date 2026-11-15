import { Skull, Trophy, RotateCcw } from 'lucide-react';
import { useGameStore } from '../store/useGameStore';

export default function EndModal() {
  const status = useGameStore((s) => s.status);
  const day = useGameStore((s) => s.day);
  const initGame = useGameStore((s) => s.initGame);

  if (status !== 'won' && status !== 'lost') return null;

  const won = status === 'won';
  const Icon = won ? Trophy : Skull;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy-dark/90 px-6"
    >
      <div
        className={`w-full max-w-md rounded-3xl p-8 text-center ${
          won ? 'bg-teal shadow-teal' : 'bg-coral shadow-coral'
        }`}
      >
        <Icon className="mx-auto h-14 w-14" strokeWidth={2.5} />
        <h2 className="mt-4 text-4xl font-black tracking-tight">
          {won ? 'Menang!' : 'Game Over'}
        </h2>
        <p className="mt-2 text-base font-semibold text-white/85">
          {won
            ? `Kamu bertahan selama ${day - 1} hari.`
            : `Kamu kalah setelah ${day - 1} hari.`}
        </p>
        <div className="mt-6">
          <button
            type="button"
            onClick={initGame}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-sunny px-6 py-3 font-black text-white shadow-sunny transition-all hover:-translate-y-1 hover:shadow-sunny-lg active:translate-y-1"
          >
            <RotateCcw size={18} strokeWidth={2.5} />
            Main Lagi
          </button>
        </div>
      </div>
    </div>
  );
}