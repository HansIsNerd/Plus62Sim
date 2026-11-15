import {
  Brain,
  Coins,
  GraduationCap,
  Sparkles,
  Stethoscope,
  Scale,
  Laptop,
  TrendingUp,
  Palette,
  BookOpen,
  type LucideIcon,
} from 'lucide-react';
import { MAJORS_POOL } from '../data/majors';
import { useGameStore } from '../store/useGameStore';

const MAJOR_ICON: Record<string, LucideIcon> = {
  kedokteran: Stethoscope,
  hukum: Scale,
  'teknik-informatika': Laptop,
  'bisnis-manajemen': TrendingUp,
  'seni-komunikasi': Palette,
  pendidikan: BookOpen,
};

export default function MajorModal() {
  const status = useGameStore((s) => s.status);
  const iq = useGameStore((s) => s.stats.iq);
  const tampang = useGameStore((s) => s.stats.tampang);
  const selectMajor = useGameStore((s) => s.selectMajor);

  if (status !== 'playing') return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 bg-navy/80 backdrop-blur-sm z-50 flex items-start md:items-center justify-center p-4 overflow-y-auto"
    >
      <div className="bg-white rounded-3xl p-6 md:p-8 max-w-4xl w-full shadow-2xl border-4 border-navy my-4">
        <h2 className="text-2xl md:text-3xl font-display font-black text-navy mb-2">
          Pilih Jurusan Kuliah
        </h2>
        <p className="text-gray-600 mb-2">
          Jurusan menentukan umur lulus serta gaji dan beban mental karirmu nanti.
        </p>
        <div className="mb-6 flex flex-wrap gap-2 text-xs font-black text-navy">
          <span className="flex items-center gap-1.5 rounded-full bg-teal/20 px-3 py-1">
            <GraduationCap size={14} strokeWidth={2.5} />
            IQ kamu: {iq}
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-sunny/30 px-3 py-1">
            <Sparkles size={14} strokeWidth={2.5} />
            Tampang kamu: {tampang}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {MAJORS_POOL.map((major) => {
            const Icon = MAJOR_ICON[major.id] ?? GraduationCap;
            const eligible = iq >= major.reqIq && tampang >= major.reqTampang;

            return (
              <div
                key={major.id}
                className={`flex flex-col rounded-2xl border-2 border-gray-200 p-4 ${
                  eligible ? '' : 'opacity-80'
                }`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sunny text-white">
                  <Icon size={24} strokeWidth={2.5} />
                </div>
                <h3 className="mt-3 text-xl font-black leading-tight text-navy">
                  {major.name}
                </h3>
                <p className="mt-1 flex-1 text-sm font-semibold text-navy/60">
                  {major.description}
                </p>

                <div className="mt-3 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between rounded-xl bg-teal/20 px-3 py-1.5 text-xs font-bold text-navy">
                    <span className="flex items-center gap-1.5">
                      <GraduationCap size={14} strokeWidth={2.5} />
                      Lulus umur
                    </span>
                    <span>{major.gradAge}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-sunny/20 px-3 py-1.5 text-xs font-bold text-navy">
                    <span className="flex items-center gap-1.5">
                      <Coins size={14} strokeWidth={2.5} />
                      Gaji
                    </span>
                    <span>+{major.salary}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-coral/20 px-3 py-1.5 text-xs font-bold text-navy">
                    <span className="flex items-center gap-1.5">
                      <Brain size={14} strokeWidth={2.5} />
                      Beban Mental
                    </span>
                    <span>-{major.mentalCost}</span>
                  </div>
                </div>

                {eligible ? (
                  <button
                    type="button"
                    onClick={() => selectMajor(major.id)}
                    className="mt-4 w-full rounded-2xl bg-teal px-4 py-3 text-base font-black text-white shadow-teal outline-none transition-all active:translate-y-1 active:shadow-none focus-visible:ring-4 focus-visible:ring-sunny"
                  >
                    Pilih
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="mt-4 w-full cursor-not-allowed rounded-2xl bg-gray-300 px-4 py-3 text-sm font-black text-gray-500 outline-none"
                  >
                    Syarat: IQ {major.reqIq} / Tampang {major.reqTampang}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}