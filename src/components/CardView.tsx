import {
  Drumstick,
  Moon,
  Flame,
  Hammer,
  Coins,
  Users,
  Wheat,
  Ship,
  Music,
  Briefcase,
  Coffee,
  Laptop,
  Zap,
  Brain,
  type LucideIcon,
} from 'lucide-react';
import { SquigglyPattern } from './SquigglyPattern';
import { MAX_QUEUE, useGameStore } from '../store/useGameStore';
import type { Card, CardColor, CardIconName, Stats } from '../types/card';

const ICONS: Record<CardIconName, LucideIcon> = {
  drumstick: Drumstick,
  moon: Moon,
  flame: Flame,
  hammer: Hammer,
  coins: Coins,
  users: Users,
  wheat: Wheat,
  ship: Ship,
  music: Music,
  briefcase: Briefcase,
  coffee: Coffee,
  laptop: Laptop,
};

// Class ditulis literal agar tidak ter-purge Tailwind
const COLOR_CLASS: Record<CardColor, string> = {
  coral: 'bg-coral shadow-coral',
  sunny: 'bg-sunny shadow-sunny',
  teal: 'bg-teal shadow-teal',
};

const STAT_META: { key: keyof Stats; Icon: LucideIcon }[] = [
  { key: 'money', Icon: Coins },
  { key: 'energy', Icon: Zap },
  { key: 'mental', Icon: Brain },
];

const VARIANT_BY_COLOR: Record<CardColor, 0 | 1 | 2> = {
  coral: 0,
  sunny: 1,
  teal: 2,
};

interface Props {
  card: Card;
  /** 'hand' = klik untuk masuk antrean, 'queue' = klik untuk kembali ke hand */
  location: 'hand' | 'queue';
}

export default function CardView({ card, location }: Props) {
  const queueCard = useGameStore((s) => s.queueCard);
  const unqueueCard = useGameStore((s) => s.unqueueCard);
  const queueFull = useGameStore((s) => s.queue.length >= MAX_QUEUE);
  const isGameOver = useGameStore((s) => s.isGameOver);

  const Icon = ICONS[card.icon];
  const disabled = isGameOver || (location === 'hand' && queueFull);

  const handleClick = () => {
    if (location === 'hand') queueCard(card.id);
    else unqueueCard(card.id);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      aria-label={
        location === 'hand'
          ? `Masukkan ${card.title} ke antrean`
          : `Kembalikan ${card.title} ke tangan`
      }
      className={`
        group relative flex h-56 w-40 shrink-0 flex-col justify-between overflow-hidden
        rounded-2xl p-4 text-left text-white outline-none
        transition-all duration-200 ease-out
        enabled:hover:-translate-y-2 enabled:active:translate-y-1
        focus-visible:ring-4 focus-visible:ring-white/70
        disabled:cursor-not-allowed disabled:opacity-50
        md:h-64 md:w-48
        ${COLOR_CLASS[card.color]}
      `}
    >
      <SquigglyPattern variant={VARIANT_BY_COLOR[card.color]} />

      <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-white/20">
        <Icon className="h-6 w-6" strokeWidth={2.5} />
      </div>

      <div className="relative">
        <h3 className="text-xl font-black leading-tight tracking-tight">
          {card.title}
        </h3>
        <p className="mt-1 text-xs font-semibold leading-snug text-white/85">
          {card.description}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {STAT_META.map(({ key, Icon: StatIcon }) => {
            const v = card.effect[key];
            if (!v) return null;
            return (
              <span
                key={key}
                className="inline-flex items-center gap-1 rounded-full bg-navy-dark/30 px-2 py-0.5 text-xs font-extrabold"
              >
                <StatIcon className="h-3 w-3" strokeWidth={3} />
                {v > 0 ? `+${v}` : v}
              </span>
            );
          })}
        </div>
      </div>
    </button>
  );
}