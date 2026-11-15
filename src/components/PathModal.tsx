import { Briefcase, GraduationCap } from 'lucide-react';
import { useGameStore } from '../store/useGameStore';

export default function PathModal() {
  const status = useGameStore((s) => s.status);
  const choosePath = useGameStore((s) => s.choosePath);

  if (status !== 'playing') return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 bg-navy/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="bg-white rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl border-4 border-navy">
        <h2 className="text-3xl font-display font-black text-navy mb-2">
          Masa Depan Menanti
        </h2>
        <p className="text-gray-600 mb-6">
          Kamu sudah lulus SMA. Mau kemana selanjutnya?
        </p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <button
            type="button"
            onClick={() => choosePath('kuliah')}
            className="flex flex-col items-center gap-3 rounded-3xl bg-teal px-6 py-8 text-white shadow-teal outline-none transition-all hover:-translate-y-1 active:translate-y-1 active:shadow-none focus-visible:ring-4 focus-visible:ring-sunny"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20">
              <GraduationCap size={34} strokeWidth={2.5} />
            </span>
            <span className="text-2xl font-black leading-none">
              Lanjut Kuliah
            </span>
          </button>

          <button
            type="button"
            onClick={() => choosePath('kerja')}
            className="flex flex-col items-center gap-3 rounded-3xl bg-coral px-6 py-8 text-white shadow-coral outline-none transition-all hover:-translate-y-1 active:translate-y-1 active:shadow-none focus-visible:ring-4 focus-visible:ring-sunny"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20">
              <Briefcase size={34} strokeWidth={2.5} />
            </span>
            <span className="text-2xl font-black leading-none">
              Langsung Kerja
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}