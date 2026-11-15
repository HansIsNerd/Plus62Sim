import { Brain, Briefcase, Coins, Hammer, Laptop, type LucideIcon } from 'lucide-react';
import { CAREERS_POOL } from '../data/careers';
import { useGameStore } from '../store/useGameStore';

const CAREER_ICON: Record<string, LucideIcon> = {
  buruh: Hammer,
  'karyawan-swasta': Briefcase,
  programmer: Laptop,
};

export default function CareerModal() {
  const status = useGameStore((s) => s.status);
  const selectCareer = useGameStore((s) => s.selectCareer);

  if (status !== 'playing') return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 bg-navy/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-hidden"
    >
      <div className="bg-white w-full max-w-4xl max-h-[85vh] rounded-3xl shadow-2xl flex flex-col border-4 border-navy overflow-hidden">
        {/* Header (statis, tidak ikut scroll) */}
        <div className="shrink-0 p-4 bg-gray-50 border-b flex flex-col items-center gap-1 text-center">
          <h2 className="text-xl md:text-2xl font-display font-black text-navy">
            Lulus SMA! Pilih Jalan Hidupmu
          </h2>
          <p className="text-xs font-semibold text-navy/60">
            Profesi menentukan gaji dan beban mental setiap kali kamu memainkan
            kartu Kerja.
          </p>
        </div>

        {/* Area Konten (scrollable) */}
        <div className="flex-1 min-h-0 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CAREERS_POOL.map((career) => {
              const Icon = CAREER_ICON[career.id] ?? Briefcase;
              return (
                <div
                  key={career.id}
                  className="flex min-w-0 flex-col rounded-2xl border-2 border-gray-200 p-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sunny text-white">
                    <Icon size={20} strokeWidth={2.5} />
                  </div>
                  <h3 className="mt-2 text-lg font-black leading-tight text-navy wrap-break-word">
                    {career.name}
                  </h3>
                  <p className="mt-1 flex-1 text-xs font-semibold text-navy/60">
                    {career.description}
                  </p>

                  <div className="mt-3 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between gap-2 rounded-xl bg-sunny/20 px-3 py-1.5 text-xs font-bold text-navy">
                      <span className="flex items-center gap-1.5">
                        <Coins size={14} strokeWidth={2.5} />
                        Gaji
                      </span>
                      <span>+{career.salary}</span>
                    </div>
                    <div className="flex items-center justify-between gap-2 rounded-xl bg-coral/20 px-3 py-1.5 text-xs font-bold text-navy">
                      <span className="flex items-center gap-1.5">
                        <Brain size={14} strokeWidth={2.5} />
                        Beban Mental
                      </span>
                      <span>{career.mentalCost}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => selectCareer(career.id)}
                    className="mt-3 w-full rounded-2xl bg-teal px-4 py-2.5 text-sm font-black text-white shadow-teal outline-none transition-all active:translate-y-1 active:shadow-none focus-visible:ring-4 focus-visible:ring-sunny"
                  >
                    Pilih
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}