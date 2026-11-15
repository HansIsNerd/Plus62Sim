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
  const age = useGameStore((s) => s.age);
  const money = useGameStore((s) => s.stats.money);
  const debt = useGameStore((s) => s.debt);
  const friends = useGameStore((s) => s.friends);

  const hasBadge: Record<Exclude<PhoneApp, 'home'>, boolean> = {
    bank: debt > 0,
    contacts: friends.length > 1,
    social: true,
    shop: false,
    invest: false,
  };

  return (
    <div className="min-h-0 w-full flex-1 overflow-x-hidden overflow-y-auto px-4 pt-2 pb-10">
      <div className="mb-5 rounded-3xl bg-white/20 px-4 py-3 text-white shadow-lg backdrop-blur-md">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-white/80">
          Plus62 Life
        </p>
        <p className="mt-0.5 whitespace-nowrap text-2xl font-bold leading-tight">
          Umur: {age} Thn
        </p>
        <p className="mt-0.5 whitespace-nowrap text-sm font-medium text-white/90">
          Uang: Rp {money}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-x-4 gap-y-6">
        {HOME_APPS.map(({ key, label, Icon, gradient }) => (
          <button
            key={key}
            type="button"
            onClick={() => setActiveApp(key)}
            aria-label={label}
            className="flex flex-col items-center rounded-2xl outline-none focus-visible:ring-4 focus-visible:ring-white/70"
          >
            <span
              className={`relative flex h-14 w-14 cursor-pointer items-center justify-center rounded-2xl shadow-lg transition-transform duration-150 active:scale-90 ${gradient}`}
            >
              {hasBadge[key] && (
                <div className="absolute -top-1 -right-1 z-10 h-3.5 w-3.5 rounded-full border-2 border-white bg-red-500"></div>
              )}
              <Icon size={28} strokeWidth={2.25} className="text-white" />
            </span>
            <span className="mt-1.5 text-center text-[11px] font-medium text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.35)]">
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function BankApp() {
  const money = useGameStore((s) => s.stats.money);
  const debt = useGameStore((s) => s.debt);
  const borrowMoney = useGameStore((s) => s.borrowMoney);
  const payDebt = useGameStore((s) => s.payDebt);
  const setActiveApp = useGameStore((s) => s.setActiveApp);

  const canPay = money >= AMOUNT && debt > 0;

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
        <span className="text-sm font-semibold text-black">Bank Plus62</span>
        <div className="w-6" />
      </div>

      {/* Scrollable Content */}
      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-x-hidden overflow-y-auto p-4 pb-12">
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
    </div>
  );
}

function ContactsApp() {
  const friends = useGameStore((s) => s.friends);
  const setActiveChat = useGameStore((s) => s.setActiveChat);
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
        <span className="text-sm font-semibold text-black">Kontak</span>
        <div className="w-6" />
      </div>

      {/* Scrollable Content */}
      <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-x-hidden overflow-y-auto p-4 pb-12">
        <p className="text-[10px] font-semibold uppercase text-gray-500">
          Chat: Mental +{CHAT_MENTAL_GAIN}, money -{CHAT_MONEY_COST} per pesan
        </p>
        {friends.map((f) => (
          <div
            key={f.id}
            className="flex w-full items-center gap-3 rounded-2xl bg-white p-3 shadow-sm"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-gray-300 to-gray-500 text-lg font-semibold text-white">
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
    </div>
  );
}

export default function PhoneModal() {
  const activeApp = useGameStore((s) => s.activeApp);
  const activeChatId = useGameStore((s) => s.activeChatId);
  const friends = useGameStore((s) => s.friends);
  const setActiveApp = useGameStore((s) => s.setActiveApp);
  const togglePhone = useGameStore((s) => s.togglePhone);

  const chatNpc =
    activeApp === 'contacts' && activeChatId
      ? friends.find((f) => f.id === activeChatId)
      : undefined;
  const isHome = activeApp === 'home';

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={togglePhone}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-phone relative h-175 max-h-[85vh] w-85 max-w-[95vw] overflow-hidden rounded-[50px] border-[6px] border-gray-800 bg-black p-2.5 shadow-2xl"
      >
        <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[40px] bg-gray-50">
          {/* Dynamic Island */}
          <div className="pointer-events-none absolute top-3 left-1/2 z-50 h-6 w-32 -translate-x-1/2 rounded-full bg-black" />

          {/* Status Bar */}
          <div
            className={`pointer-events-none absolute top-0 right-0 left-0 z-40 flex h-12 items-end justify-between px-6 pb-2 text-xs font-semibold ${
              isHome ? 'text-white' : 'text-black'
            }`}
          >
            <span>09:41</span>
            <div className="flex items-center gap-1">
              <Signal size={14} strokeWidth={2.5} />
              <Wifi size={14} strokeWidth={2.5} />
              <BatteryFull size={16} strokeWidth={2.5} />
            </div>
          </div>

          {/* Area Konten */}
          <div
            className={`absolute inset-0 flex flex-col pt-12 ${
              isHome
                ? 'bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500'
                : 'bg-gray-50 pb-6'
            }`}
          >
            {activeApp === 'home' && <HomeScreen />}
            {activeApp === 'bank' && <BankApp />}
            {activeApp === 'social' && <SocialApp />}
            {activeApp === 'shop' && <ShopApp />}
            {activeApp === 'invest' && <InvestApp />}
            {activeApp === 'contacts' && chatNpc && <ChatScreen npc={chatNpc} />}
            {activeApp === 'contacts' && !chatNpc && <ContactsApp />}
          </div>

          {/* Home Indicator (tap untuk menutup / kembali ke home) */}
          <button
            type="button"
            onClick={isHome ? togglePhone : () => setActiveApp('home')}
            aria-label={isHome ? 'Tutup HP' : 'Kembali ke layar utama'}
            className="absolute bottom-0 left-1/2 z-50 flex h-6 w-40 -translate-x-1/2 items-center justify-center outline-none"
          >
            <span
              className={`absolute bottom-2 left-1/2 h-1.5 w-32 -translate-x-1/2 rounded-full ${
                isHome ? 'bg-white/50' : 'bg-gray-900/40'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}