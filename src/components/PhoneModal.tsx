import {
  Landmark,
  Coins,
  TrendingDown,
  TrendingUp,
  ChevronLeft,
  Users,
  Phone,
  ShoppingBag,
  Signal,
  Wifi,
  BatteryFull,
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
  gradient: string;
}

// Class ditulis literal agar tidak ter-purge Tailwind
const HOME_APPS: HomeApp[] = [
  {
    key: 'bank',
    label: 'Bank',
    Icon: Landmark,
    gradient: 'bg-gradient-to-br from-green-400 to-green-600',
  },
  {
    key: 'social',
    label: 'Sosmed',
    Icon: Users,
    gradient: 'bg-gradient-to-br from-blue-400 to-blue-600',
  },
  {
    key: 'contacts',
    label: 'Kontak',
    Icon: Phone,
    gradient: 'bg-gradient-to-br from-gray-300 to-gray-500',
  },
  {
    key: 'shop',
    label: 'Shopee',
    Icon: ShoppingBag,
    gradient: 'bg-gradient-to-br from-orange-400 to-red-500',
  },
  {
    key: 'invest',
    label: 'Investasi',
    Icon: TrendingUp,
    gradient: 'bg-gradient-to-br from-purple-500 to-indigo-600',
  },
];

function HomeScreen() {
  const setActiveApp = useGameStore((s) => s.setActiveApp);

  return (
    <div className="grid grid-cols-4 gap-x-4 gap-y-8 px-4 mt-20">
      {HOME_APPS.map(({ key, label, Icon, gradient }) => (
        <button
          key={key}
          type="button"
          onClick={() => setActiveApp(key)}
          aria-label={label}
          className="flex flex-col items-center outline-none focus-visible:ring-4 focus-visible:ring-white/70 rounded-2xl"
        >
          <span
            className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg cursor-pointer transition-transform duration-150 active:scale-90 ${gradient}`}
          >
            <Icon size={28} strokeWidth={2.25} className="text-white" />
          </span>
          <span className="text-[11px] text-white font-medium text-center mt-1.5 shadow-sm [text-shadow:0_1px_2px_rgba(0,0,0,0.35)]">
            {label}
          </span>
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
    <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2 text-gray-500">
          <Coins size={14} strokeWidth={2.5} />
          <span className="text-[10px] font-semibold uppercase">Saldo</span>
        </div>
        <p className="mt-1 text-3xl font-bold text-gray-900">{money}</p>
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2 text-red-500">
          <TrendingDown size={14} strokeWidth={2.5} />
          <span className="text-[10px] font-semibold uppercase">Utang</span>
        </div>
        <p className="mt-1 text-3xl font-bold text-red-500">
          {Math.round(debt)}
        </p>
        <p className="mt-1 text-[10px] font-medium text-gray-500">
          Bunga 20% per pinjaman. Utang membuat mental turun tiap hari.
        </p>
      </div>

      <div className="mt-auto flex flex-col gap-2.5 pb-2">
        <button
          type="button"
          onClick={() => borrowMoney(AMOUNT)}
          className="w-full rounded-xl bg-blue-500 px-4 py-3 text-base font-semibold text-white outline-none transition-all active:scale-[0.98] active:bg-blue-600 focus-visible:ring-4 focus-visible:ring-blue-300"
        >
          Pinjam {AMOUNT}
        </button>
        <button
          type="button"
          onClick={() => payDebt(AMOUNT)}
          disabled={!canPay}
          className="w-full rounded-xl bg-green-500 px-4 py-3 text-base font-semibold text-white outline-none transition-all active:scale-[0.98] active:bg-green-600 focus-visible:ring-4 focus-visible:ring-green-300 disabled:cursor-not-allowed disabled:opacity-40"
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
      <p className="text-[10px] font-semibold uppercase text-gray-500">
        Chat: Mental +{CHAT_MENTAL_GAIN}, money -{CHAT_MONEY_COST} per pesan
      </p>
      {friends.map((f) => (
        <div
          key={f.id}
          className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gray-300 to-gray-500 text-lg font-semibold text-white">
            {f.name.charAt(0)}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-semibold text-gray-900">
              {f.name}
            </h3>
            <p className="truncate text-[10px] font-semibold uppercase text-gray-500">
              {f.role}
            </p>
            <p className="truncate text-[10px] font-medium text-gray-500">
              {f.buffText}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setActiveChat(f.id)}
            className="shrink-0 rounded-full bg-blue-500 px-3.5 py-1.5 text-xs font-semibold text-white outline-none transition-all active:scale-95 active:bg-blue-600 focus-visible:ring-4 focus-visible:ring-blue-300"
          >
            Chat
          </button>
        </div>
      ))}
    </div>
  );
}

function StatusBar({ dark }: { dark: boolean }) {
  return (
    <div
      className={`absolute top-4 px-6 w-full flex justify-between items-center z-40 text-xs font-semibold pointer-events-none transition-colors duration-200 ${
        dark ? 'text-gray-900' : 'text-white'
      }`}
    >
      <span>09:41</span>
      <div className="flex items-center gap-1">
        <Signal size={14} strokeWidth={2.5} />
        <Wifi size={14} strokeWidth={2.5} />
        <BatteryFull size={16} strokeWidth={2.5} />
      </div>
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
  const isHome = activeApp === 'home';

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
      <div className="w-[340px] h-[680px] bg-black rounded-[50px] p-2.5 shadow-2xl border-[6px] border-gray-800 relative">
        <div
          className={`w-full h-full rounded-[40px] overflow-hidden relative flex flex-col ${
            isHome
              ? 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500'
              : 'bg-gray-50'
          }`}
        >
          {/* Dynamic Island */}
          <div className="w-32 h-6 bg-black rounded-full absolute top-3 left-1/2 -translate-x-1/2 z-50" />

          <StatusBar dark={!isHome} />

          {/* Header app gaya iOS */}
          {!isHome && !inChat && (
            <header className="relative z-30 flex shrink-0 items-center justify-between border-b border-gray-200 bg-white/80 px-3 pb-2.5 pt-14 backdrop-blur-md">
              <button
                type="button"
                onClick={handleBack}
                aria-label="Kembali"
                className="flex w-16 items-center gap-0.5 text-blue-500 outline-none transition-opacity active:opacity-50 focus-visible:ring-4 focus-visible:ring-blue-300 rounded-lg"
              >
                <ChevronLeft size={22} strokeWidth={2.5} />
                <span className="text-sm font-medium">Kembali</span>
              </button>
              <h2 className="text-base font-semibold text-gray-900">
                {APP_TITLE[activeApp]}
              </h2>
              <button
                type="button"
                onClick={togglePhone}
                aria-label="Tutup"
                className="w-16 text-right text-sm font-semibold text-blue-500 outline-none transition-opacity active:opacity-50 focus-visible:ring-4 focus-visible:ring-blue-300 rounded-lg"
              >
                Tutup
              </button>
            </header>
          )}

          <div
            className={`flex min-h-0 flex-1 flex-col overflow-hidden ${
              inChat ? 'pt-12' : ''
            } ${isHome ? '' : 'pb-6'}`}
          >
            {activeApp === 'home' && <HomeScreen />}
            {activeApp === 'bank' && <BankApp />}
            {activeApp === 'social' && <SocialApp />}
            {activeApp === 'shop' && <ShopApp />}
            {activeApp === 'invest' && <InvestApp />}
            {activeApp === 'contacts' && chatNpc && <ChatScreen npc={chatNpc} />}
            {activeApp === 'contacts' && !chatNpc && <ContactsApp />}
          </div>

          {/* Tombol Tutup di layar Home */}
          {isHome && (
            <button
              type="button"
              onClick={togglePhone}
              className="absolute bottom-8 left-1/2 z-40 -translate-x-1/2 rounded-full bg-white/25 px-5 py-1.5 text-xs font-semibold text-white outline-none backdrop-blur-md transition-all active:scale-95 focus-visible:ring-4 focus-visible:ring-white/70"
            >
              Tutup
            </button>
          )}

          {/* Home Indicator (tap untuk menutup / kembali ke home) */}
          <button
            type="button"
            onClick={isHome ? togglePhone : () => setActiveApp('home')}
            aria-label={isHome ? 'Tutup HP' : 'Kembali ke layar utama'}
            className="absolute bottom-0 left-1/2 z-50 flex h-6 w-40 -translate-x-1/2 items-center justify-center outline-none"
          >
            <span
              className={`absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 rounded-full ${
                isHome ? 'bg-white/50' : 'bg-gray-900/40'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}