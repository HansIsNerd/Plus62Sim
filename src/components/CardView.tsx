import { useEffect, useState } from 'react';
import { Wheat, Coins, Flame, type LucideIcon } from 'lucide-react';
import { useGameStore, MAX_QUEUE } from '../store/useGameStore';
import { SquigglyPattern } from './SquigglyPattern';
import type { Card, CardTag } from '../data/cards';

interface Props {
  card: Card;
  location: 'hand' | 'queue';
}

interface TagConfig {
  label: string;
  Icon: LucideIcon;
  variant: 0 | 1 | 2;
  // Class ditulis literal agar tidak ter-purge Tailwind
  className: string;
}

const TAGS: Record<CardTag, TagConfig> = {
  risiko: {
    label: 'Risiko',
    Icon: Flame,
    variant: 0,
    className: 'bg-coral shadow-coral',
  },
  ekonomi: {
    label: 'Ekonomi',
    Icon: Coins,
    variant: 1,
    className: 'bg-sunny shadow-sunny',
  },
  survival: {
    label: 'Survival',
    Icon: Wheat,
    variant: 2,
    className: 'bg-teal shadow-teal',
  },
};

const fmt = (n: number) => (n > 0 ? `+${n}` : `${n}`);

export function CardView({ card, location }: Props) {
  const queueCard = useGameStore((s) => s.queueCard);
  const unqueueCard = useGameStore((s) => s.unqueueCard);
  const isGameOver = useGameStore((s) => s.isGameOver);
  const queueLength = useGameStore((s) => s.queue.length);

  const [mounted, setMounted] = useState(false);
  const [leaving, setLeaving] = useState(false);

  const { label, Icon, variant, className } = TAGS[card.tag];
  const isQueue = location === 'queue';
  const queueFull = !isQueue && queueLength >= MAX_QUEUE;
  const disabled = isGameOver || queueFull;

  // Transisi masuk: fade + slide dari bawah
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const handleClick = () => {
    if (disabled || leaving) return;
    setLeaving(true);
    // Tunggu transisi keluar (300ms) sebelum kartu berpindah
    window.setTimeout(() => {
      if (isQueue) unqueueCard(card.id);
      else queueCard(card.id);
    }, 300);
  };

  const visible = mounted && !leaving;

  const motion = visible
    ? 'translate-y-0 opacity-100'
    : leaving
      ? isQueue
        ? 'translate-y-10 opacity-0'
        : '-translate-y-10 opacity-0'
      : 'translate-y-8 opacity-0';

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      aria-label={`${card.name}, ${isQueue ? 'batalkan dari antrean' : 'masukkan ke antrean'}`}
      className={`
        relative flex shrink-0 flex-col justify-between overflow-hidden rounded-2xl
        p-3 text-left text-white outline-none transition-all duration-300 ease-out
        focus-visible:ring-4 focus-visible:ring-white
        ${className}
        ${isQueue ? 'h-40 w-32 md:h-48 md:w-40' : 'h-48 w-36 md:h-60 md:w-48'}
        ${motion}
        ${!disabled && !leaving ? 'hover:-translate-y-2 active:translate-y-1' : ''}
        ${disabled ? 'cursor-not-allowed grayscale-40' : 'cursor-pointer'}
      `}
    >
      <SquigglyPattern variant={variant} />

      <div className="relative flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 md:h-12 md:w-12">
          <Icon className="h-6 w-6 md:h-7 md:w-7" strokeWidth={2.5} />
        </div>
        <span className="rounded-full bg-navy-dark/40 px-2 py-1 text-[10px] font-black uppercase tracking-widest md:text-xs">
          {label}
        </span>
      </div>

      <div className="relative">
        <h3 className="text-lg font-black leading-none tracking-tight md:text-2xl">
          {card.name}
        </h3>
        <div className="mt-2 flex flex-wrap gap-1 text-[11px] font-black md:text-sm">
          <span className="rounded-lg bg-navy-dark/40 px-2 py-0.5">
            Makan {fmt(card.effects.food)}
          </span>
          <span className="rounded-lg bg-navy-dark/40 px-2 py-0.5">
            Sehat {fmt(card.effects.health)}
          </span>
          <span className="rounded-lg bg-navy-dark/40 px-2 py-0.5">
            Harta {fmt(card.effects.wealth)}
          </span>
        </div>
      </div>
    </button>
  );
}

export default CardView;