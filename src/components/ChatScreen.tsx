import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ChevronLeft, Coins, Send } from 'lucide-react';
import {
  useGameStore,
  CHAT_MENTAL_GAIN,
  CHAT_MONEY_COST,
} from '../store/useGameStore';
import type { NPC } from '../data/npcs';

interface Props {
  npc: NPC;
}

export default function ChatScreen({ npc }: Props) {
  const chatHistories = useGameStore((s) => s.chatHistories);
  const sendMessage = useGameStore((s) => s.sendMessage);
  const setActiveChat = useGameStore((s) => s.setActiveChat);
  const money = useGameStore((s) => s.stats.money);

  const [text, setText] = useState('');
  const [notice, setNotice] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const messages = chatHistories[npc.id] ?? [];
  const canSend = money >= CHAT_MONEY_COST;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages.length]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;

    const ok = sendMessage(npc.id, value);
    if (ok) {
      setText('');
      setNotice(null);
    } else {
      setNotice(`Uang tidak cukup (butuh ${CHAT_MONEY_COST}).`);
    }
  };

  return (
    <div className="flex h-full flex-1 flex-col overflow-hidden">
      <div className="flex items-center justify-between bg-white px-3 py-2 shadow-sm">
        <div className="flex min-w-0 items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveChat(null)}
            aria-label="Kembali ke kontak"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy/10 text-navy outline-none transition-colors hover:bg-navy/20 focus-visible:ring-4 focus-visible:ring-sunny"
          >
            <ChevronLeft size={18} strokeWidth={2.5} />
          </button>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sunny text-sm font-black text-white">
            {npc.name.charAt(0)}
          </div>
          <h3 className="truncate text-sm font-black text-navy">{npc.name}</h3>
        </div>
        <div className="flex shrink-0 items-center gap-1 rounded-xl bg-sunny px-2 py-1 text-xs font-bold text-navy">
          <Coins size={12} strokeWidth={2.5} />
          {money}
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto bg-gray-50 p-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.sender === 'player' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] wrap-break-words rounded-2xl px-3 py-2 text-sm font-semibold shadow-sm ${
                m.sender === 'player'
                  ? 'rounded-br-sm bg-teal text-white'
                  : 'rounded-bl-sm bg-white text-navy'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="bg-white px-3 pb-3 pt-2 shadow-[0_-1px_4px_rgba(0,0,0,0.06)]">
        <p className="mb-1 text-[10px] font-bold text-navy/50">
          {notice ??
            `Kirim pesan: Mental +${CHAT_MENTAL_GAIN}, money -${CHAT_MONEY_COST}`}
        </p>
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ketik pesan..."
            maxLength={120}
            className="min-w-0 flex-1 rounded-xl bg-navy/10 px-3 py-2 text-sm font-semibold text-navy outline-none placeholder:text-navy/40 focus-visible:ring-4 focus-visible:ring-sunny"
          />
          <button
            type="submit"
            disabled={!canSend || !text.trim()}
            aria-label="Kirim"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal text-white outline-none transition-all active:translate-y-0.5 focus-visible:ring-4 focus-visible:ring-sunny disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send size={18} strokeWidth={2.5} />
          </button>
        </form>
      </div>
    </div>
  );
}