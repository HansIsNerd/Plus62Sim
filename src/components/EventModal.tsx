import { useGameStore } from '../store/useGameStore';

export default function EventModal() {
  const activeEvent = useGameStore((s) => s.activeEvent);
  const resolveEvent = useGameStore((s) => s.resolveEvent);
  const money = useGameStore((s) => s.stats.money);

  if (!activeEvent) return null;

  const isBill = activeEvent.id === 'bill';

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 bg-navy/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border-4 border-navy">
        <h2 className="text-2xl font-display font-bold text-navy mb-2">
          {activeEvent.title}
        </h2>
        <p className="text-gray-600 mb-6">{activeEvent.description}</p>
        {activeEvent.choices.map((choice, index) => {
          const cost = choice.effects.money ?? 0;
          const cannotAfford = isBill && cost < 0 && money < Math.abs(cost);
          const isRunAway = isBill && (choice.effects.debt ?? 0) > 0;

          if (cannotAfford) {
            return (
              <button
                key={index}
                type="button"
                disabled
                className="w-full text-left p-3 rounded-xl border-2 border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed font-semibold mb-2"
              >
                {choice.text}
                <span className="block text-xs font-bold uppercase mt-0.5">
                  Uang Tidak Cukup
                </span>
              </button>
            );
          }

          if (isRunAway) {
            return (
              <button
                key={index}
                type="button"
                onClick={() => resolveEvent(index)}
                className="w-full text-left p-3 rounded-xl border-2 border-coral text-coral hover:bg-coral/10 transition-colors font-semibold mb-2"
              >
                {choice.text}
              </button>
            );
          }

          return (
            <button
              key={index}
              type="button"
              onClick={() => resolveEvent(index)}
              className="w-full text-left p-3 rounded-xl border-2 border-gray-200 hover:border-navy hover:bg-gray-50 transition-colors font-semibold text-navy mb-2"
            >
              {choice.text}
            </button>
          );
        })}
      </div>
    </div>
  );
}