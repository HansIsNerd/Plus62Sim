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
      className="fixed inset-0 bg-navy/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-hidden"
    >
      <div className="bg-white w-full max-w-4xl max-h-[85vh] rounded-3xl shadow-2xl flex flex-col border-4 border-navy overflow-hidden">
        {/* Header (statis, tidak ikut scroll) */}
        <div className="shrink-0 p-4 bg-gray-50 border-b flex flex-col items-center gap-2">
          <div className="text-center">
            <h2 className="text-xl md:text-2xl font-display font-black text-navy">
              Pilih Jurusan Kuliah
            </h2>
            <p className="mt-0.5 text-xs font-semibold text-navy/60">
              Jurusan menentukan umur lulus serta gaji dan beban mental karirmu
              nanti.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-xs font-black text-navy">
            <span className="flex items-center gap-1.5 rounded-full bg-teal/20 px-3 py-1">
              <GraduationCap size={14} strokeWidth={2.5} />
              IQ kamu: {iq}
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-sunny/30 px-3 py-1">
              <Sparkles size={14} strokeWidth={2.5} />
              Tampang kamu: {tampang}
            </span>
          </div>
        </div>

        {/* Area Konten (scrollable) */}
        <div className="flex-1 min-h-0 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {MAJORS_POOL.map((major) => {
              const Icon = MAJOR_ICON[major.id] ?? GraduationCap;
              const eligible = iq >= major.reqIq && tampang >= major.reqTampang;

              return (
                <div
                  key={major.id}
                  className={`flex min-w-0 flex-col rounded-2xl border-2 border-gray-200 p-4 ${
                    eligible ? '' : 'opacity-80'
                  }`}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sunny text-white">
                    <Icon size={20} strokeWidth={2.5} />
                  </div>
                  <h3 className="mt-2 text-lg font-black leading-tight text-navy wrap-break-word">
                    {major.name}
                  </h3>
                  <p className="mt-1 flex-1 text-xs font-semibold text-navy/60">
                    {major.description}
                  </p>

                  <div className="mt-3 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between gap-2 rounded-xl bg-teal/20 px-3 py-1.5 text-xs font-bold text-navy">
                      <span className="flex items-center gap-1.5">
                        <GraduationCap size={14} strokeWidth={2.5} />
                        Lulus umur
                      </span>
                      <span>{major.gradAge}</span>
                    </div>
                    <div className="flex items-center justify-between gap-2 rounded-xl bg-sunny/20 px-3 py-1.5 text-xs font-bold text-navy">
                      <span className="flex items-center gap-1.5">
                        <Coins size={14} strokeWidth={2.5} />
                        Gaji
                      </span>
                      <span>+{major.salary}</span>
                    </div>
                    <div className="flex items-center justify-between gap-2 rounded-xl bg-coral/20 px-3 py-1.5 text-xs font-bold text-navy">
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
                      className="mt-3 w-full rounded-2xl bg-teal px-4 py-2.5 text-sm font-black text-white shadow-teal outline-none transition-all active:translate-y-1 active:shadow-none focus-visible:ring-4 focus-visible:ring-sunny"
                    >
                      Pilih
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="mt-3 w-full cursor-not-allowed rounded-2xl bg-gray-300 px-4 py-2.5 text-xs font-black text-gray-500 outline-none"
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
    </div>
  );
}