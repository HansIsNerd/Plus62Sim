import { Coins } from 'lucide-react';
import { SHOP_ITEMS } from '../data/shop';
import { useGameStore } from '../store/useGameStore';

export default function ShopApp() {
  const money = useGameStore((s) => s.stats.money);
  const buyItem = useGameStore((s) => s.buyItem);

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
    <div className="flex flex-1 flex-col overflow-y-auto p-4">
      <div className="mb-3 flex items-center justify-between rounded-xl bg-sunny px-3 py-2 text-sm font-black text-navy">
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
            className="bg-white p-4 rounded-xl shadow-sm mb-3 flex justify-between items-center gap-3"
          >
            <div className="min-w-0 flex-1">
              <h3 className="text-base font-black text-navy">{item.name}</h3>
              <p className="mt-0.5 text-xs font-semibold text-navy/60">
                {item.description}
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleBuy(index)}
              disabled={!canBuy}
              className={`shrink-0 rounded-xl px-3 py-2 text-xs font-black text-white outline-none transition-all focus-visible:ring-4 focus-visible:ring-sunny ${
                canBuy
                  ? 'bg-teal active:translate-y-0.5'
                  : 'cursor-not-allowed bg-gray-300'
              }`}
            >
              Beli Rp {item.price}
            </button>
          </div>
        );
      })}
    </div>
  );
}