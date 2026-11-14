import type { Card, CardColor, CardEffects } from '../data/cards';

interface Props {
  card: Card;
  onClick?: () => void;
  disabled?: boolean;
}

const COLOR_CLASS: Record<CardColor, string> = {
  coral: 'bg-coral shadow-coral hover:shadow-coral-lg',
  sunny: 'bg-sunny shadow-sunny hover:shadow-sunny-lg',
  teal: 'bg-teal shadow-teal hover:shadow-teal-lg',
};

const LABEL: Record<keyof CardEffects, string> = {
  health: 'Sehat',
  food: 'Makan',
  wealth: 'Harta',
  mental: 'Mental',
};

function formatEffects(effects: CardEffects): string {
  return (Object.entries(effects) as [keyof CardEffects, number | undefined][])
    .filter(([, v]) => typeof v === 'number' && v !== 0)
    .map(([k, v]) => `${LABEL[k]} ${v! > 0 ? '+' : ''}${v}`)
    .join(' · ');
}

export default function CardView({ card, onClick, disabled = false }: Props) {
  const { Icon } = card;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`relative flex h-60 w-40 select-none flex-col overflow-hidden rounded-3xl bg-white text-left outline-none transition-all duration-200 ease-out hover:-translate-y-2 active:translate-y-1 focus-visible:ring-4 focus-visible:ring-sunny disabled:opacity-50 ${COLOR_CLASS[card.color]}`}
    >
      <div className="flex h-1/2 w-full items-center justify-center bg-white/20">
        <Icon className="h-14 w-14 text-white" strokeWidth={2.5} />
      </div>
      <div className="flex h-1/2 flex-col justify-center bg-white p-4">
        <h3 className="text-lg font-black leading-tight text-navy">
          {card.title}
        </h3>
        <p className="mt-1 text-xs font-semibold text-navy/60">
          {formatEffects(card.effects)}
        </p>
      </div>
    </button>
  );
}