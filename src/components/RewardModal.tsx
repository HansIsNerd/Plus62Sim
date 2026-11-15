import { Gift } from 'lucide-react';
import { useGameStore } from '../store/useGameStore';
import { SquigglyPattern } from './SquigglyPattern';
import CardView from './CardView';

export default function RewardModal() {
  const cardRewards = useGameStore((s) => s.cardRewards);
  const claimReward = useGameStore((s) => s.claimReward);

  if (!cardRewards) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy-dark/90 px-4 backdrop-blur-md"
    >
      <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-navy p-6 text-center text-white md:p-10">
        <SquigglyPattern variant={1} />
        <div className="relative">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-sunny shadow-sunny">
            <Gift className="h-9 w-9" strokeWidth={2.5} />
          </div>
          <h2 className="mt-6 text-3xl font-black tracking-tight md:text-5xl">
            Pilih 1 Kartu Baru
          </h2>
          <p className="mt-2 text-sm font-semibold text-white/70">
            Kartu pilihanmu akan masuk ke dek.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 pb-3">
            {cardRewards.map((card) => (
              <CardView
                key={card.id}
                card={card}
                onClick={() => claimReward(card)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}