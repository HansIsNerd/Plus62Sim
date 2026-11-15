import { Landmark, X, Coins, TrendingDown } from 'lucide-react';
import { useGameStore } from '../store/useGameStore';

const AMOUNT = 50;

export default function PhoneModal() {
  const wealth = useGameStore((s) => s.stats.wealth);
  const debt = useGameStore((s) => s.debt);
  const togglePhone = useGameStore((s) => s.togglePhone);
  const borrowMoney = useGameStore((s) => s.borrowMoney);
  const payDebt = useGameStore((s) => s.payDebt);

  const canPay = wealth >= AMOUNT && debt > 0;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 bg-navy/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <div className="w-[320px] h-150 bg-black rounded-[40px] p-3 shadow-2xl border-4 border-gray-700 relative">
        <div className="w-full h-full bg-gray-100 rounded-[30px] overflow-hidden flex flex-col relative">
          <header className="flex items-center justify-between bg-white px-5 pb-3 pt-6 shadow-sm">
            <div className="flex items-center gap-2 text-navy">
              <Landmark size={22} strokeWidth={2.5} />
              <h2 className="text-lg font-black tracking-tight">Bank Plus62</h2>
            </div>
            <button
              type="button"
              onClick={togglePhone}
              aria-label="Tutup"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-navy/10 text-navy outline-none transition-colors hover:bg-navy/20 focus-visible:ring-4 focus-visible:ring-sunny"
            >
              <X size={18} strokeWidth={2.5} />
            </button>
          </header>

          <div className="flex flex-1 flex-col gap-3 p-4">
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2 text-navy/60">
                <Coins size={14} strokeWidth={2.5} />
                <span className="text-[10px] font-bold uppercase">
                  Uang (Wealth)
                </span>
              </div>
              <p className="mt-1 text-3xl font-black text-navy">
                Rp {wealth}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2 text-coral-dark">
                <TrendingDown size={14} strokeWidth={2.5} />
                <span className="text-[10px] font-bold uppercase">
                  Utang (Debt)
                </span>
              </div>
              <p className="mt-1 text-3xl font-black text-coral-dark">
                Rp {Math.round(debt)}
              </p>
              <p className="mt-1 text-[10px] font-semibold text-navy/50">
                Bunga 20% per pinjaman. Utang membuat mental turun tiap hari.
              </p>
            </div>

            <div className="mt-auto flex flex-col gap-3 pb-2">
              <button
                type="button"
                onClick={() => borrowMoney(AMOUNT)}
                className="w-full rounded-2xl bg-coral px-4 py-3 text-base font-black text-white shadow-coral outline-none transition-all active:translate-y-1 active:shadow-none focus-visible:ring-4 focus-visible:ring-sunny"
              >
                Pinjam Rp {AMOUNT}
              </button>
              <button
                type="button"
                onClick={() => payDebt(AMOUNT)}
                disabled={!canPay}
                className="w-full rounded-2xl bg-teal px-4 py-3 text-base font-black text-white shadow-teal outline-none transition-all active:translate-y-1 active:shadow-none focus-visible:ring-4 focus-visible:ring-sunny disabled:cursor-not-allowed disabled:opacity-50"
              >
                Bayar Rp {AMOUNT}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}