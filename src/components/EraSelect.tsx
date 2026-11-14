import { Flame, Sword, Building2, type LucideIcon } from 'lucide-react';
import { useGameStore } from '../store/useGameStore';
import { SquigglyPattern } from './SquigglyPattern';
import type { EraId } from '../types/era';

interface EraConfig {
  id: EraId;
  title: string;
  subtitle: string;
  Icon: LucideIcon;
  variant: 0 | 1 | 2;
  // Class lengkap ditulis literal agar tidak ter-purge oleh Tailwind
  className: string;
}

const ERAS: EraConfig[] = [
  {
    id: 'purba',
    title: 'Purba',
    subtitle: 'Api, berburu, dan Peradaban',
    Icon: Flame,
    variant: 0,
    className:
      'bg-coral shadow-coral hover:shadow-coral-lg focus-visible:ring-coral',
  },
  {
    id: 'kerajaan',
    title: 'Kerajaan',
    subtitle: 'Perdagangan, dan Kekerasan',
    Icon: Sword,
    variant: 1,
    className:
      'bg-sunny shadow-sunny hover:shadow-sunny-lg focus-visible:ring-sunny',
  },
  {
    id: 'modern',
    title: 'Modern',
    subtitle: 'Kota, teknologi, dan Ambisi',
    Icon: Building2,
    variant: 2,
    className:
      'bg-teal shadow-teal hover:shadow-teal-lg focus-visible:ring-teal',
  },
];

export default function EraSelect() {
  const onSelect = useGameStore((s) => s.onSelect);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-navy px-6 py-12">
      <header className="mb-10 text-center">
        <h1 className="text-5xl font-black tracking-tight md:text-6xl">
          Plus<span className="text-sunny">62</span>Sim
        </h1>
        <p className="mt-3 text-lg font-semibold text-white/70">
          Pilih eramu untuk memulai
        </p>
      </header>

      <section className="grid w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
        {ERAS.map(({ id, title, subtitle, Icon, variant, className }) => (
          <button
            key={id}
            type="button"
            onClick={() => onSelect(id)}
            className={`
              group relative flex min-h-55 flex-col justify-between overflow-hidden
              rounded-3xl p-6 text-left text-white outline-none
              transition-all duration-200 ease-out
              hover:-translate-y-2 active:translate-y-1
              focus-visible:ring-4 focus-visible:ring-offset-4 focus-visible:ring-offset-navy
              md:min-h-95 md:p-8
              ${className}
            `}
          >
            <SquigglyPattern variant={variant} />

            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 md:h-20 md:w-20">
              <Icon className="h-9 w-9 md:h-11 md:w-11" strokeWidth={2.5} />
            </div>

            <div className="relative">
              <h2 className="text-4xl font-black leading-none tracking-tight md:text-5xl">
                {title}
              </h2>
              <p className="mt-3 text-base font-semibold text-white/85">
                {subtitle}
              </p>
            </div>
          </button>
        ))}
      </section>
    </main>
  );
}