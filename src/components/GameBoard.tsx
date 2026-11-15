import {
  Heart,
  Utensils,
  Coins,
  Brain,
  Smartphone,
  Skull,
  RotateCcw,
  Sparkles,
  GraduationCap,
  type LucideIcon,
} from 'lucide-react';
import { useGameStore, MAX_AP, PATH_AGE } from '../store/useGameStore';
import { SquigglyPattern } from './SquigglyPattern';
import EventModal from './EventModal';
import PhoneModal from './PhoneModal';
import PathModal from './PathModal';
import CareerModal from './CareerModal';
import type { CardColor } from '../data/cards';

interface StatConfig {
  key: 'health' | 'food' | 'mental' | 'tampang' | 'iq';
  label: string;
  Icon: LucideIcon;
  barClass: string;
}

const STATS: StatConfig[] = [
  { key: 'health', label: 'HEALTH', Icon: Heart, barClass: 'bg-coral' },
  { key: 'food', label: 'FOOD', Icon: Utensils, barClass: 'bg-sunny' },
  { key: 'mental', label: 'MENTAL', Icon: Brain, barClass: 'bg-white' },
  { key: 'tampang', label: 'TAMPANG', Icon: Sparkles, barClass: 'bg-sunny' },
  { key: 'iq', label: 'IQ', Icon: GraduationCap, barClass: 'bg-teal' },
];

const CARD_CLASS: Record<CardColor, string> = {
  coral: 'bg-coral shadow-coral hover:shadow-coral-lg',
  sunny: 'bg-sunny shadow-sunny hover:shadow-sunny-lg',
  teal: 'bg-teal shadow-teal hover:shadow-teal-lg',
};

const VARIANT: Record<CardColor, 0 | 1 | 2> = { coral: 0, sunny: 1, teal: 2 };

export default function GameBoard() {
  const stats = useGameStore((s) => s.stats);
  const hand = useGameStore((s) => s.hand);
  const age = useGameStore((s) => s.age);
  const actionPoints = useGameStore((s) => s.actionPoints);
  const status = useGameStore((s) => s.status);
  const activeEvent = useGameStore((s) => s.activeEvent);
  const activeTrait = useGameStore((s) => s.activeTrait);
  const career = useGameStore((s) => s.career);
  const pathChoice = useGameStore((s) => s.pathChoice);
  const deathReason = useGameStore((s) => s.deathReason);
  const isPhoneOpen = useGameStore((s) => s.isPhoneOpen);
  const debt = useGameStore((s) => s.debt);
  const playCard = useGameStore((s) => s.playCard);
  const togglePhone = useGameStore((s) => s.togglePhone);
  const reset = useGameStore((s) => s.reset);

  const isOver = status === 'lost';

  const needsPath = age >= PATH_AGE && pathChoice === 'none';
  const needsCareer = pathChoice === 'kerja' && career === null;
  const blockedByChoice = needsPath || needsCareer;

  // Hanya satu modal aktif pada satu waktu (prioritas: game over > event > jalan > karir > HP)
  const showEvent = status === 'playing' && !!activeEvent;
  const showPath = status === 'playing' && !showEvent && needsPath;
  const showCareer =
    status === 'playing' && !showEvent && !showPath && needsCareer;
  const showPhone =
    status === 'playing' &&
    isPhoneOpen &&
    !showEvent &&
    !showPath &&
    !showCareer;

  const locked =
    status !== 'playing' ||
    showEvent ||
    isPhoneOpen ||
    actionPoints <= 0 ||
    blockedByChoice;

  const statusLabel =
    pathChoice === 'kuliah'
      ? 'MAHASISWA'
      : pathChoice === 'kerja'
        ? `PEKERJA: ${career?.name ?? '-'}`
        : age < PATH_AGE
          ? 'PELAJAR'
          : null;

  return (
    <main className="relative flex min-h-screen flex-col bg-navy px-4 py-4 md:px-6">
      <header className="mx-auto w-full max-w-5xl">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <h1 className="text-lg font-black tracking-tight">
            Plus<span className="text-sunny">62</span>Sim
            {activeTrait && (
              <span className="ml-2 rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-bold uppercase">
                {activeTrait.name}
              </span>
            )}
          </h1>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-bold text-white/70">
              UMUR: {age} THN
            </span>
            {statusLabel && (
              <span
                className={`rounded-full px-3 py-1 text-xs font-bold uppercase text-white ${
                  pathChoice === 'none' ? 'bg-white/15' : 'bg-teal'
                }`}
              >
                {statusLabel}
              </span>
            )}
            <div className="flex items-center gap-1.5 text-navy font-bold text-sm bg-sunny px-3 py-1.5 rounded-xl shadow-sm">
              <Coins size={16} /> {stats.money}
            </div>
            <span className="rounded-full border border-white/30 bg-navy px-3 py-1 text-xs font-bold text-white">
              AP: {actionPoints}/{MAX_AP}
            </span>
            <button
              type="button"
              onClick={togglePhone}
              disabled={status !== 'playing' || showEvent || blockedByChoice}
              aria-label="Buka HP"
              className="relative rounded-xl bg-white/20 p-2 text-white outline-none transition-colors hover:bg-white/30 focus-visible:ring-4 focus-visible:ring-sunny disabled:opacity-50"
            >
              <Smartphone size={18} strokeWidth={2.5} />
              {debt > 0 && (
                <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-coral" />
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {STATS.map(({ key, label, Icon, barClass }) => (
            <div key={key} className="rounded-xl bg-navy-dark/60 px-2 py-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Icon size={14} strokeWidth={2.5} />
                  <span className="text-[10px] font-bold text-white/80">
                    {label}
                  </span>
                </div>
                <span className="text-xs font-bold">{stats[key]}</span>
              </div>
              <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/15">
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 ${barClass}`}
                  style={{ width: `${stats[key]}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </header>

      <section className="mx-auto mt-8 grid w-full max-w-5xl flex-1 grid-cols-1 content-center gap-6 pb-6 md:grid-cols-3">
        {hand.map((card) => {
          const { Icon } = card;
          const effectEntries: [string, number][] = (
            card.isDynamicWork && career
              ? [
                  ['money', career.salary],
                  ['mental', career.mentalCost],
                ]
              : Object.entries(card.effects)
          ).filter(([, v]) => typeof v === 'number' && v !== 0) as [
            string,
            number,
          ][];

          return (
            <button
              key={card.id}
              type="button"
              disabled={locked}
              onClick={() => playCard(card.id)}
              className={`group relative flex min-h-48 flex-col justify-between overflow-hidden rounded-3xl p-6 text-left text-white outline-none transition-all duration-200 ease-out hover:-translate-y-2 active:translate-y-1 disabled:opacity-50 ${CARD_CLASS[card.color]}`}
            >
              <SquigglyPattern variant={VARIANT[card.color]} />
              <div className="relative flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
                  <Icon size={30} strokeWidth={2.5} />
                </div>
                {card.type === 'curse' && (
                  <span className="rounded-full bg-navy-dark/60 px-2 py-0.5 text-[10px] font-black uppercase">
                    Curse
                  </span>
                )}
              </div>
              <div className="relative">
                <h2 className="text-3xl font-black leading-none tracking-tight">
                  {card.title}
                </h2>
                <p className="mt-2 text-sm font-semibold text-white/85">
                  {card.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {effectEntries.map(([k, v]) => (
                    <span
                      key={k}
                      className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold uppercase"
                    >
                      {k} {v > 0 ? '+' : ''}
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          );
        })}
      </section>

      {showEvent && <EventModal />}
      {showPath && <PathModal />}
      {showCareer && <CareerModal />}
      {showPhone && <PhoneModal />}

      {isOver && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        >
          <div className="w-full max-w-md rounded-3xl border-4 border-navy bg-white p-8 text-center shadow-2xl">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-red-100 text-red-500">
              <Skull size={44} strokeWidth={2.5} />
            </div>

            <h2 className="mt-5 text-5xl font-black tracking-tight text-red-500">
              GAME OVER
            </h2>

            <p className="mt-4 text-lg font-bold text-navy">
              Kamu hidup sampai umur {age} tahun.
            </p>

            <p className="mt-2 text-base font-semibold text-navy/70">
              {deathReason ?? 'Meninggal dunia.'}
            </p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-sunny px-4 py-2 text-base font-black text-navy">
              <Coins size={18} strokeWidth={2.5} />
              Uang ditinggalkan: {stats.money}
            </div>

            <button
              type="button"
              onClick={reset}
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-teal px-8 py-4 text-xl font-black text-white shadow-teal outline-none transition-all hover:-translate-y-1 active:translate-y-1 active:shadow-none focus-visible:ring-4 focus-visible:ring-sunny"
            >
              <RotateCcw size={22} strokeWidth={2.5} />
              Main Lagi
            </button>
          </div>
        </div>
      )}
    </main>
  );
}