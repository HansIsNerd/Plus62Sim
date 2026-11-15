// src/components/SocialApp.tsx
import { ChevronLeft, RefreshCw, UserPlus, Users } from 'lucide-react';
import { useGameStore } from '../store/useGameStore';
import type { NPC } from '../data/npcs';

// Class ditulis literal agar tidak ter-purge Tailwind
const AVATAR_COLORS = [
  'bg-coral',
  'bg-sunny',
  'bg-teal',
  'bg-navy',
  'bg-orange-500',
  'bg-purple-500',
] as const;

// Warna deterministik berdasarkan id agar tidak berubah tiap render
const avatarColor = (id: string): string => {
  let hash = 0;
  for (let i = 0; i < id.length; i += 1) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  }
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
};

interface ProfileCardProps {
  npc: NPC;
  onFollow: (npc: NPC) => void;
}

function ProfileCard({ npc, onFollow }: ProfileCardProps) {
  return (
    <article className="flex w-full flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <header className="flex items-center gap-3">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-lg font-black text-white ${avatarColor(npc.id)}`}
        >
          {npc.name.charAt(0)}
        </div>
        <div className="min-w-0">
          <h3 className="truncate text-sm font-black text-navy">{npc.name}</h3>
          <p className="truncate text-[10px] font-bold uppercase text-navy/50">
            {npc.role}
          </p>
        </div>
      </header>

      <div className="h-32 w-full rounded-xl bg-linear-to-br from-teal/50 to-navy/50" />

      <p className="line-clamp-2 text-sm text-gray-600">{npc.buffText}</p>

      <button
        type="button"
        onClick={() => onFollow(npc)}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-coral py-2 font-bold text-white outline-none transition-all hover:bg-coral/90 active:translate-y-0.5 focus-visible:ring-4 focus-visible:ring-sunny"
      >
        <UserPlus size={18} strokeWidth={2.5} />
        Follow
      </button>
    </article>
  );
}

export default function SocialApp() {
  const socialFeed = useGameStore((s) => s.socialFeed);
  const generateFeed = useGameStore((s) => s.generateFeed);
  const followNpc = useGameStore((s) => s.followNpc);
  const setActiveApp = useGameStore((s) => s.setActiveApp);

  return (
    <div className="flex h-full w-full flex-col bg-gray-50">
      {/* iOS Sticky Header */}
      <div className="sticky top-0 z-40 flex h-12 shrink-0 items-center justify-between border-b border-gray-200 bg-white/90 px-4 backdrop-blur-md">
        <button
          type="button"
          aria-label="Kembali"
          onClick={() => setActiveApp('home')}
          className="outline-none"
        >
          <ChevronLeft className="h-6 w-6 cursor-pointer text-blue-500" />
        </button>
        <span className="text-sm font-semibold text-black">Sosmed</span>
        <button
          type="button"
          onClick={() => generateFeed()}
          aria-label="Refresh Feed"
          className="flex h-6 w-6 items-center justify-center text-blue-500 outline-none"
        >
          <RefreshCw size={16} strokeWidth={2.5} />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-x-hidden overflow-y-auto p-4 pb-12">
        {socialFeed.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 p-6 text-center">
            <Users size={40} strokeWidth={2.5} className="text-navy/30" />
            <p className="text-sm font-bold text-navy/60">
              Semua orang sudah jadi temanmu.
            </p>
          </div>
        ) : (
          socialFeed.map((npc) => (
            <ProfileCard key={npc.id} npc={npc} onFollow={followNpc} />
          ))
        )}
      </div>
    </div>
  );
}