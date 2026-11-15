import { useEffect, useState } from 'react';
import {
  Dumbbell,
  Flame,
  Gamepad2,
  Library,
  Moon,
  RefreshCw,
  Sparkles,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { useGameStore } from '../store/useGameStore';
import { SquigglyPattern } from './SquigglyPattern';

const HOBBY_ICON: Record<string, LucideIcon> = {
  gamer: Gamepad2,
  atlet: Dumbbell,
  'kutu-buku': Library,
};

const PERSONALITY_ICON: Record<string, LucideIcon> = {
  introvert: Moon,
  ekstrovert: Users,
  ambis: Flame,
};

export default function TraitSelect() {
  const traitOptions = useGameStore((s) => s.traitOptions);
  const rollTraits = useGameStore((s) => s.rollTraits);
  const selectTrait = useGameStore((s) => s.selectTrait);
  const [spinning, setSpinning] = useState(false);

  // Pastikan selalu ada opsi saat layar idle
  useEffect(() => {
    if (traitOptions.length === 0) rollTraits();
  }, [traitOptions.length, rollTraits]);

  const handleRoll = () => {
    setSpinning(true);
    rollTraits();
    window.setTimeout(() => setSpinning(false), 500);
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-navy px-4 py-10 md:px-6">
      <SquigglyPattern variant={1} />

      <button
        type="button"
        onClick={handleRoll}
        className="absolute right-4 top-4 z-10 inline-flex items-center gap-2 rounded-2xl bg-sunny px-4 py-2 text-sm font-black text-navy shadow-sunny outline-none transition-all hover:-translate-y-0.5 active:translate-y-1 active:shadow-none focus-visible:ring-4 focus-visible:ring-white md:right-6 md:top-6"
      >
        <RefreshCw
          size={16}
          strokeWidth={2.5}
          className={`transition-transform duration-500 ${spinning ? 'rotate-180' : ''}`}
        />
        Roll Ulang Takdir
      </button>

      <div className="relative w-full max-w-5xl">
        <h1 className="text-center text-4xl font-black tracking-tight text-white md:text-5xl">
          Plus<span className="text-sunny">62</span>Sim
        </h1>
        <p className="mt-2 text-center text-base font-semibold text-white/80">
          Pilih takdirmu.
        </p>

        <section className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {traitOptions.map((trait) => {
            const HobbyIcon = HOBBY_ICON[trait.hobby.id] ?? Sparkles;
            const PersonalityIcon =
              PERSONALITY_ICON[trait.personality.id] ?? Sparkles;

            return (
              <button
                key={trait.id}
                type="button"
                onClick={() => selectTrait(trait)}
                className="cursor-pointer rounded-2xl border-4 border-transparent bg-white p-6 text-left text-navy outline-none transition-all duration-200 ease-out hover:-translate-y-2 hover:border-navy focus-visible:ring-4 focus-visible:ring-sunny active:translate-y-1"
              >
                <h2 className="text-3xl font-black leading-none tracking-tight">
                  {trait.hobby.name} {trait.personality.name}
                </h2>

                <div className="mt-5 flex flex-col gap-3">
                  <div className="flex items-start gap-3 rounded-xl bg-teal/20 p-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal text-white">
                      <HobbyIcon size={18} strokeWidth={2.5} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[10px] font-black uppercase text-navy/50">
                        Hobi · {trait.hobby.name}
                      </p>
                      <p className="mt-0.5 text-sm font-semibold text-navy/80">
                        {trait.hobby.desc}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-xl bg-coral/20 p-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-coral text-white">
                      <PersonalityIcon size={18} strokeWidth={2.5} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[10px] font-black uppercase text-navy/50">
                        Kepribadian · {trait.personality.name}
                      </p>
                      <p className="mt-0.5 text-sm font-semibold text-navy/80">
                        {trait.personality.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </section>
      </div>
    </main>
  );
}