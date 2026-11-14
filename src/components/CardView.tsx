import { Utensils, Heart, Coins, type LucideIcon } from 'lucide-react';
import type { Card, CardTag } from '../data/cards';

interface Props {
  card: Card;
  onClick?: () => void;
}

const TAG_STYLE: Record<CardTag, { bg: string; Icon: LucideIcon }> = {
  food: { bg: 'bg-sunny', Icon: Utensils },
  health: { bg: 'bg-coral', Icon: Heart },
  wealth: { bg: 'bg-teal', Icon: Coins },
};

const LABEL: Record<string, string> = {
  food: 'Makan',
  health: 'Sehat',
  wealth: 'Harta',
};

function formatEffects(effects: Card['effects']): string {
  return Object.entries(effects)
    .filter(([, v]) => typeof v === 'number' && v !== 0)
    .map(([k, v]) => `${LABEL[k]} ${(v as number) > 0 ? '+' : ''}${v}`)
    .join(' · ');
}

export default function CardView({ card, onClick }: Props) {
  const { bg, Icon } = TAG_STYLE[card.tag];

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      className="w-40 h-60 bg-white rounded-3xl overflow-hidden shadow-xl hover:-translate-y-2 transition-transform cursor-pointer flex flex-col select-none"
    >
      <div className={`h-1/2 w-full flex items-center justify-center ${bg}`}>
        <Icon className="h-14 w-14 text-white" strokeWidth={2.5} />
      </div>
      <div className="h-1/2 p-4 flex flex-col justify-center">
        <h3 className="font-display font-bold text-navy text-lg leading-tight">
          {card.name}
        </h3>
        <p className="mt-1 text-xs font-semibold text-navy/60">
          {formatEffects(card.effects)}
        </p>
      </div>
    </div>
  );
}