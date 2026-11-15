import { ChevronLeft, Coins } from 'lucide-react';
import { SHOP_ITEMS } from '../data/shop';
import { useGameStore } from '../store/useGameStore';

export default function ShopApp() {
  const money = useGameStore((s) => s.stats.money);
  const buyItem = useGameStore((s) => s.buyItem);
  const setActiveApp = useGameStore((s) => s.setActiveApp);

  const handleBuy = (index: number) => {
    const item = SHOP_ITEMS[index];
    if (!item) return;
    const ok = buyItem(item);
    if (ok) {
      alert(
        'Berhasil membeli ' + item.name + '! Cek kartu di tanganmu nanti.',
      );
    }
  };

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
        <span className="text-sm font-semibold text-black">Shopee</span>
        <div className="w-6" />
      </div>

      {/* Scrollable Content */}
      <div className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto p-4 pb-12">
        <div className="mb-3 flex w-full items-center justify-between rounded-xl bg-sunny px-3 py-2 text-sm font-black text-navy">
          <span className="flex items-center gap-1.5">
            <Coins size={16} strokeWidth={2.5} />
            Uang
          </span>
          <span>Rp {money}</span>
        </div>

        {SHOP_ITEMS.map((item, index) => {
          const canBuy = money >= item.price;
          return (
            <div
              key={item.id}
              className="mb-3 flex w-full items-center justify-between gap-3 rounded-xl bg-white p-3 shadow-sm"
            >
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-black text-navy">
                  {item.name}
                </h3>
                <p className="mt-0.5 line-clamp-2 text-[11px] font-semibold leading-snug text-navy/60">
                  {item.description}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleBuy(index)}
                disabled={!canBuy}
                className={`shrink-0 whitespace-nowrap rounded-xl px-3 py-2 text-xs font-black text-white outline-none transition-all focus-visible:ring-4 focus-visible:ring-sunny ${
                  canBuy
                    ? 'bg-teal active:translate-y-0.5'
                    : 'cursor-not-allowed bg-gray-300'
                }`}
              >
                Rp {item.price}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}