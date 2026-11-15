// src/components/SocialApp.tsx
import { RefreshCw, Search, UserPlus, Users } from 'lucide-react';
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
    <article className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col gap-3">
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

      <p className="text-sm text-gray-600">{npc.buffText}</p>

      <button
        type="button"
        onClick={() => onFollow(npc)}
        className="w-full bg-coral text-white font-bold py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-coral/90 outline-none transition-all active:translate-y-0.5 focus-visible:ring-4 focus-visible:ring-sunny"
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

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden bg-gray-100">
      <div className="flex shrink-0 items-center justify-between bg-white px-3 py-2 shadow-sm">
        <div className="flex items-center gap-2 text-navy">
          <Search size={18} strokeWidth={2.5} />
          <h3 className="text-base font-black tracking-tight">Sosmed</h3>
        </div>
        <button
          type="button"
          onClick={() => generateFeed()}
          aria-label="Refresh Feed"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-navy/10 text-navy outline-none transition-colors hover:bg-navy/20 focus-visible:ring-4 focus-visible:ring-sunny"
        >
          <RefreshCw size={16} strokeWidth={2.5} />
        </button>
      </div>

      <div className="flex flex-col gap-3 p-3 overflow-y-auto h-full bg-gray-100">
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