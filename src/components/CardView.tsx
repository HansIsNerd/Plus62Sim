import { Briefcase, Moon, Users, BookOpen, Shield, type LucideIcon } from 'lucide-react';
import type { Card, CardTag } from '../types/card';

interface TagStyle {
  Icon: LucideIcon;
  // Class ditulis literal agar tidak ter-purge oleh Tailwind
  border: string;
  shadow: string;
  iconBg: string;
}

const TAG_STYLES: Record<CardTag, TagStyle> = {
  work: {
    Icon: Briefcase,
    border: 'border-sunny',
    shadow: 'hover:shadow-sunny',
    iconBg: 'bg-sunny',
  },
  rest: {
    Icon: Moon,
    border: 'border-sky-400',
    shadow: 'hover:shadow-[0_8px_0_0_#0284C7]',
    iconBg: 'bg-sky-400',
  },
  social: {
    Icon: Users,
    border: 'border-coral',
    shadow: 'hover:shadow-coral',
    iconBg: 'bg-coral',
  },
  learn: {
    Icon: BookOpen,
    border: 'border-teal',
    shadow: 'hover:shadow-teal',
    iconBg: 'bg-teal',
  },
  survive: {
    Icon: Shield,
    border: 'border-navy',
    shadow: 'hover:shadow-[0_8px_0_0_#1B2352]',
    iconBg: 'bg-navy',
  },
};

interface Props {
  card: Card;
  onClick?: () => void;
  disabled?: boolean;
}

export default function CardView({ card, onClick, disabled = false }: Props) {
  const { Icon, border, shadow, iconBg } = TAG_STYLES[card.tag];

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        relative flex h-full w-full flex-col rounded-2xl border-4 bg-white p-4
        text-left text-navy outline-none
        transition-all duration-200 ease-out
        enabled:cursor-pointer enabled:hover:-translate-y-2 enabled:active:translate-y-0
        disabled:cursor-default
        focus-visible:ring-4 focus-visible:ring-white/60
        ${border} ${shadow}
      `}
    >
      <div
        className={`absolute -right-3 -top-3 flex h-9 w-9 items-center justify-center rounded-xl text-white ${iconBg}`}
      >
        <Icon className="h-5 w-5" strokeWidth={2.5} />
      </div>

      <h3 className="pr-6 text-xl font-bold leading-tight">{card.title}</h3>
      <p className="mt-2 text-sm font-normal leading-snug text-navy/75">
        {card.description}
      </p>
    </button>
  );
}