import { useEffect, useState } from 'react';
import {
  Fish,
  Hammer,
  BedDouble,
  Coins,
  Flame,
  Wheat,
  type LucideIcon,
} from 'lucide-react';
import { SquigglyPattern } from './SquigglyPattern';
import type { CardData, CardIconKey } from '../types/game';

const ICONS: Record<CardIconKey, LucideIcon> = {
  fish: Fish,
  hammer: Hammer,
  bed: BedDouble,
  coins: Coins,
  flame: Flame,
  wheat: Wheat,
};

// Class ditulis literal agar tidak ter-purge Tailwind
const COLORS = {
  coral: 'bg-coral shadow-coral',
  sunny: 'bg-sunny shadow-sunny',
  teal: 'bg-teal shadow-teal',
} as const;

const VARIANT = { coral: 0, sunny: 1, teal: 2 } as const;

interface Props {
  card: CardData;
  size?: 'hand' | 'queue';
  disabled?: boolean;
  onClick?: () => void;
}

export function GameCard({ card, size = 'hand', disabled, onClick }: Props) {
  const [mounted, setMounted] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const Icon = ICONS[card.icon];

  // Transisi masuk: fade + slide dari bawah
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const handleClick = () => {
    if (disabled || leaving || !onClick) return;
    setLeaving(true);
    // Tunggu transisi keluar (300ms) sebelum kartu pindah ke queue
    window.setTimeout(onClick, 300);
  };

  const visible = mounted && !leaving;
  const isQueue = size === 'queue';

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || !onClick}
      className={`
        relative flex shrink-0 flex-col justify-between overflow-hidden rounded-2xl
        p-3 text-left text-white outline-none transition-all duration-300 ease-out
        ${COLORS[card.color]}
        ${isQueue ? 'h-36 w-28 md:h-44 md:w-36' : 'h-44 w-32 md:h-56 md:w-44'}
        ${visible ? 'translate-y-0 opacity-100' : leaving ? '-translate-y-10 opacity-0' : 'translate-y-8 opacity-0'}
        ${onClick && !disabled && !leaving ? 'hover:-translate-y-2 active:translate-y-1' : ''}
        ${disabled && onClick ? 'cursor-not-allowed grayscale-40' : ''}
      `}
    >
      <SquigglyPattern variant={VARIANT[card.color]} />
      <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 md:h-12 md:w-12">
        <Icon className="h-6 w-6 md:h-7 md:w-7" strokeWidth={2.5} />
      </div>
      <div className="relative">
        <h3 className="text-lg font-black leading-none tracking-tight md:text-2xl">
          {card.name}
        </h3>
        {!isQueue && (
          <p className="mt-1 text-xs font-semibold text-white/85 md:text-sm">
            {card.desc}
          </p>
        )}
      </div>
    </button>
  );
}