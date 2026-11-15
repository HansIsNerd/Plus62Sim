// src/components/PhoneModal.tsx
import {
  Landmark,
  X,
  Coins,
  TrendingDown,
  TrendingUp,
  ChevronLeft,
  Users,
  MessageCircle,
  ShoppingBag,
  type LucideIcon,
} from 'lucide-react';
import {
  useGameStore,
  CHAT_MENTAL_GAIN,
  CHAT_MONEY_COST,
  type PhoneApp,
} from '../store/useGameStore';
import ChatScreen from './ChatScreen';
import ShopApp from './ShopApp';
import SocialApp from './SocialApp';
import InvestApp from './InvestApp';

const AMOUNT = 50;

const APP_TITLE: Record<PhoneApp, string> = {
  home: 'Plus62 OS',
  bank: 'Bank Plus62',
  social: 'Sosmed',
  contacts: 'Kontak',
  shop: 'Shopee',
  invest: 'Pasar Modal',
};

interface HomeApp {
  key: Exclude<PhoneApp, 'home'>;
  label: string;
  Icon: LucideIcon;
  bg: string;
  shadow: string;
}

const HOME_APPS: HomeApp[] = [
  { key: 'bank', label: 'Bank', Icon: Landmark, bg: 'bg-sunny', shadow: 'shadow-sunny' },
  { key: 'social', label: 'Sosmed', Icon: Users, bg: 'bg-coral', shadow: 'shadow-coral' },
  { key: 'contacts', label: 'Kontak', Icon: MessageCircle, bg: 'bg-teal', shadow: 'shadow-teal' },
  {
    key: 'shop',
    label: 'Shopee',
    Icon: ShoppingBag,
    bg: 'bg-orange-500',
    shadow: 'shadow-[0_8px_0_0_#C2410C]',
  },
  {
    key: 'invest',
    label: 'Investasi',
    Icon: TrendingUp,
    bg: 'bg-navy',
    shadow: 'shadow-[0_8px_0_0_#1B2352]',
  },
];

function HomeScreen() {
  const setActiveApp = useGameStore((s) => s.setActiveApp);

  return (
    <div className="grid grid-cols-3 gap-4 p-5">
      {HOME_APPS.map(({ key, label, Icon, bg, shadow }) => (
        <button
          key={key}
          type="button"
          onClick={() => setActiveApp(key)}
          className="flex flex-col items-center gap-2 outline-none focus-visible:ring-4 focus-visible:ring-sunny rounded-2xl"
        >
          <span
            className={`flex h-16 w-16 items-center justify-center rounded-2xl text-white transition-all active:translate-y-1 active:shadow-none ${bg} ${shadow}`}
          >
            <Icon size={30} strokeWidth={2.5} />
          </span>
          <span className="text-[11px] font-bold text-navy">{label}</span>
        </button>
      ))}
    </div>
  );
}

function BankApp() {
  const money = useGameStore((s) => s.stats.money);
  const debt = useGameStore((s) => s.debt);
  const borrowMoney = useGameStore((s) => s.borrowMoney);
  const payDebt = useGameStore((s) => s.payDebt);

  const canPay = money >= AMOUNT && debt > 0;

  return (
    <div className="flex flex-1 flex-col gap-3 p-4">
      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2 text-navy/60">
          <Coins size={14} strokeWidth={2.5} />
          <span className="text-[10px] font-bold uppercase">money</span>
        </div>
        <p className="mt-1 text-3xl font-black text-navy">{money}</p>
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2 text-coral-dark">
          <TrendingDown size={14} strokeWidth={2.5} />
          <span className="text-[10px] font-bold uppercase">Debt</span>
        </div>
        <p className="mt-1 text-3xl font-black text-coral-dark">
          {Math.round(debt)}
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
          Pinjam {AMOUNT}
        </button>
        <button
          type="button"
          onClick={() => payDebt(AMOUNT)}
          disabled={!canPay}
          className="w-full rounded-2xl bg-teal px-4 py-3 text-base font-black text-white shadow-teal outline-none transition-all active:translate-y-1 active:shadow-none focus-visible:ring-4 focus-visible:ring-sunny disabled:cursor-not-allowed disabled:opacity-50"
        >
          Bayar {AMOUNT}
        </button>
      </div>
    </div>
  );
}

function ContactsApp() {
  const friends = useGameStore((s) => s.friends);
  const setActiveChat = useGameStore((s) => s.setActiveChat);

  return (
    <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-4">
      <p className="text-[10px] font-bold uppercase text-navy/50">
        Chat: Mental +{CHAT_MENTAL_GAIN}, money -{CHAT_MONEY_COST} per pesan
      </p>
      {friends.map((f) => (
        <div
          key={f.id}
          className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sunny text-lg font-black text-white">
            {f.name.charAt(0)}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-black text-navy">{f.name}</h3>
            <p className="truncate text-[10px] font-bold uppercase text-navy/50">
              {f.role}
            </p>
            <p className="truncate text-[10px] font-semibold text-navy/60">
              {f.buffText}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setActiveChat(f.id)}
            className="shrink-0 rounded-xl bg-teal px-3 py-2 text-xs font-black text-white outline-none transition-all active:translate-y-0.5 focus-visible:ring-4 focus-visible:ring-sunny"
          >
            Chat
          </button>
        </div>
      ))}
    </div>
  );
}

export default function PhoneModal() {
  const activeApp = useGameStore((s) => s.activeApp);
  const activeChatId = useGameStore((s) => s.activeChatId);
  const friends = useGameStore((s) => s.friends);
  const setActiveApp = useGameStore((s) => s.setActiveApp);
  const setActiveChat = useGameStore((s) => s.setActiveChat);
  const togglePhone = useGameStore((s) => s.togglePhone);

  const chatNpc =
    activeApp === 'contacts' && activeChatId
      ? friends.find((f) => f.id === activeChatId)
      : undefined;
  const inChat = !!chatNpc;

  const handleBack = () => {
    if (inChat) {
      setActiveChat(null);
    } else {
      setActiveApp('home');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 bg-navy/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <div className="w-[320px] h-150 bg-black rounded-[40px] p-3 shadow-2xl border-4 border-gray-700 relative">
        <div className="w-full h-full bg-gray-100 rounded-[30px] overflow-hidden flex flex-col relative">
          {!inChat && (
            <header className="flex items-center justify-between bg-white px-4 pb-3 pt-6 shadow-sm">
              <div className="flex items-center gap-2 text-navy">
                {activeApp !== 'home' ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    aria-label="Kembali"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-navy/10 text-navy outline-none transition-colors hover:bg-navy/20 focus-visible:ring-4 focus-visible:ring-sunny"
                  >
                    <ChevronLeft size={18} strokeWidth={2.5} />
                  </button>
                ) : (
                  <span className="h-8 w-8" aria-hidden="true" />
                )}
                <h2 className="text-lg font-black tracking-tight">
                  {APP_TITLE[activeApp]}
                </h2>
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
          )}

          <div
            className={`flex min-h-0 flex-1 flex-col overflow-hidden ${inChat ? 'pt-6' : ''}`}
          >
            {activeApp === 'home' && <HomeScreen />}
            {activeApp === 'bank' && <BankApp />}
            {activeApp === 'social' && <SocialApp />}
            {activeApp === 'shop' && <ShopApp />}
            {activeApp === 'invest' && <InvestApp />}
            {activeApp === 'contacts' && chatNpc && <ChatScreen npc={chatNpc} />}
            {activeApp === 'contacts' && !chatNpc && <ContactsApp />}
          </div>
        </div>
      </div>
    </div>
  );
}