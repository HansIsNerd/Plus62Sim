import { X, Cake, BadgeCheck } from 'lucide-react';
import { useGameStore, PATH_AGE } from '../store/useGameStore';
import { PlayerAvatar } from './PlayerAvatar';

export default function ProfileModal() {
  const playerName = useGameStore((s) => s.playerName);
  const age = useGameStore((s) => s.age);
  const pathChoice = useGameStore((s) => s.pathChoice);
  const major = useGameStore((s) => s.major);
  const career = useGameStore((s) => s.career);
  const graduated = useGameStore((s) => s.graduated);
  const toggleProfile = useGameStore((s) => s.toggleProfile);

  let statusLabel = 'Pelajar';
  if (pathChoice === 'kuliah') {
    if (major && (graduated || age >= major.gradAge)) {
      statusLabel = `Karir: ${career?.name ?? '-'}`;
    } else if (major) {
      statusLabel = `Mahasiswa: ${major.name}`;
    } else {
      statusLabel = 'Mahasiswa';
    }
  } else if (pathChoice === 'kerja') {
    statusLabel = `Karir: ${career?.name ?? '-'}`;
  } else if (age >= PATH_AGE) {
    statusLabel = 'Menentukan Jalan Hidup';
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={toggleProfile}
      className="fixed inset-0 bg-navy/80 backdrop-blur-sm z-100 flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-sm rounded-3xl shadow-2xl p-6 relative border-4 border-navy animate-phone flex flex-col items-center"
      >
        <button
          type="button"
          aria-label="Tutup"
          onClick={toggleProfile}
          className="absolute top-4 right-4 rounded-lg text-navy outline-none hover:opacity-70 focus-visible:ring-4 focus-visible:ring-sunny"
        >
          <X size={22} strokeWidth={2.5} />
        </button>

        <div className="mt-2 flex h-64 items-center justify-center rounded-2xl bg-sunny/20 px-8 py-2">
          <PlayerAvatar variant="full" className="h-full w-auto" />
        </div>

        <h2 className="mt-4 text-2xl font-bold text-navy">{playerName}</h2>

        <div className="mt-3 flex w-full flex-col gap-2">
          <div className="flex items-center justify-between rounded-xl bg-teal/20 px-3 py-2 text-sm font-bold text-navy">
            <span className="flex items-center gap-1.5">
              <Cake size={16} strokeWidth={2.5} />
              Umur
            </span>
            <span>{age} Tahun</span>
          </div>
          <div className="flex items-center justify-between gap-3 rounded-xl bg-coral/20 px-3 py-2 text-sm font-bold text-navy">
            <span className="flex shrink-0 items-center gap-1.5">
              <BadgeCheck size={16} strokeWidth={2.5} />
              Status
            </span>
            <span className="min-w-0 truncate text-right">{statusLabel}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={toggleProfile}
          className="mt-5 w-full rounded-xl bg-navy py-2 font-bold text-white outline-none transition-all active:translate-y-0.5 focus-visible:ring-4 focus-visible:ring-sunny"
        >
          Kembali
        </button>
      </div>
    </div>
  );
}