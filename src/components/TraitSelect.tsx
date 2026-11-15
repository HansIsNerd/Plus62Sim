import { Heart, Utensils, Coins, Brain, type LucideIcon } from 'lucide-react';
import { TRAITS } from '../data/traits';
import { useGameStore } from '../store/useGameStore';
import { SquigglyPattern } from './SquigglyPattern';

type StatKey = 'health' | 'food' | 'wealth' | 'mental';

const STAT_META: { key: StatKey; label: string; Icon: LucideIcon }[] = [
  { key: 'health', label: 'Health', Icon: Heart },
  { key: 'food', label: 'Food', Icon: Utensils },
  { key: 'wealth', label: 'Wealth', Icon: Coins },
  { key: 'mental', label: 'Mental', Icon: Brain },
];

export default function TraitSelect() {
  const selectTrait = useGameStore((s) => s.selectTrait);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-navy px-4 py-10 md:px-6">
      <SquigglyPattern variant={1} />

      <div className="relative w-full max-w-5xl">
        <h1 className="text-center text-4xl font-black tracking-tight text-white md:text-5xl">
          Plus<span className="text-sunny">62</span>Sim
        </h1>
        <p className="mt-2 text-center text-base font-semibold text-white/80">
          Pilih latar belakangmu.
        </p>

        <section className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TRAITS.map((trait) => (
            <button
              key={trait.id}
              type="button"
              onClick={() => selectTrait(trait.id)}
              className="bg-white rounded-2xl p-6 border-4 border-transparent hover:border-navy cursor-pointer text-left text-navy outline-none transition-all duration-200 ease-out hover:-translate-y-2 focus-visible:ring-4 focus-visible:ring-sunny active:translate-y-1"
            >
              <h2 className="text-3xl font-black leading-none tracking-tight">
                {trait.name}
              </h2>
              <p className="mt-3 text-sm font-semibold text-navy/60">
                {trait.description}
              </p>

              <div className="mt-5 flex flex-col gap-2">
                {STAT_META.map(({ key, label, Icon }) => (
                  <div key={key} className="flex items-center gap-2">
                    <Icon size={14} strokeWidth={2.5} />
                    <span className="w-14 text-[10px] font-bold uppercase">
                      {label}
                    </span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-navy/10">
                      <div
                        className="h-1.5 rounded-full bg-navy"
                        style={{ width: `${trait.startStats[key]}%` }}
                      />
                    </div>
                    <span className="w-8 text-right text-xs font-bold">
                      {trait.startStats[key]}
                    </span>
                  </div>
                ))}
              </div>
            </button>
          ))}
        </section>
      </div>
    </main>
  );
}