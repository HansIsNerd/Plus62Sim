import { useMemo, type ReactElement } from 'react';
import { ChevronLeft, Search } from 'lucide-react';
import { SHOP_ITEMS, type ShopSvgId } from '../data/shop';
import { useGameStore } from '../store/useGameStore';
import {
  SvgBaju,
  SvgKopi,
  SvgNasiPadang,
  SvgObat,
  SvgParfum,
} from './ShopIcons';

const SVG_MAP: Record<ShopSvgId, () => ReactElement> = {
  kopi: () => <SvgKopi />,
  obat: () => <SvgObat />,
  nasi: () => <SvgNasiPadang />,
  baju: () => <SvgBaju />,
  parfum: () => <SvgParfum />,
};

function renderProductSvg(svgId: ShopSvgId): ReactElement {
  switch (svgId) {
    case 'kopi':
      return SVG_MAP.kopi();
    case 'obat':
      return SVG_MAP.obat();
    case 'nasi':
      return SVG_MAP.nasi();
    case 'baju':
      return SVG_MAP.baju();
    case 'parfum':
      return SVG_MAP.parfum();
    default:
      return SVG_MAP.kopi();
  }
}

export default function ShopApp() {
  const money = useGameStore((s) => s.stats.money);
  const buyItem = useGameStore((s) => s.buyItem);
  const setActiveApp = useGameStore((s) => s.setActiveApp);

  // Angka "terjual" dibuat sekali per mount agar tidak berubah tiap render
  const soldCounts = useMemo<Record<string, number>>(
    () =>
      Object.fromEntries(
        SHOP_ITEMS.map((item) => [
          item.id,
          Math.floor(Math.random() * 500) + 10,
        ]),
      ),
    [],
  );

  const handleBuy = (index: number) => {
    const item = SHOP_ITEMS[index];
    if (!item) return;
    if (money < item.price) {
      alert('Uang tidak cukup untuk membeli ' + item.name + '.');
      return;
    }
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

      {/* Fake Search Bar */}
      <div className="shrink-0 border-b bg-white p-2">
        <div className="flex items-center rounded-full bg-gray-100 px-3 py-1.5 text-xs text-gray-400">
          <Search size={14} className="mr-2" /> Cari di Shopee...
        </div>
      </div>

      {/* Saldo */}
      <div className="shrink-0 bg-sunny/20 p-2 text-center text-xs font-bold text-navy">
        Uang kamu: Rp {money}
      </div>

      {/* Scroll Container */}
      <div className="min-h-0 w-full flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 pb-20">
        {/* Product Grid */}
        <div className="grid grid-cols-2 items-stretch gap-2 p-2">
          {SHOP_ITEMS.map((item, index) => {
            const canBuy = money >= item.price;

            return (
              <div
                key={item.id}
                onClick={() => handleBuy(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleBuy(index);
                  }
                }}
                className={`relative flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm outline-none transition-transform active:scale-95 focus-visible:ring-4 focus-visible:ring-sunny ${
                  canBuy ? '' : 'opacity-60'
                }`}
              >
                <div className="h-24 w-full flex items-center justify-center bg-gray-50 shrink-0 border-b border-gray-100">
                  {renderProductSvg(item.svgId)}
                </div>
                <div className="flex flex-1 flex-col justify-between p-2">
                  <h3 className="min-h-7 text-[10px] font-semibold leading-tight text-navy line-clamp-2">
                    {item.name}
                  </h3>
                  <div className="mt-1">
                    <p className="text-[11px] font-bold text-coral">
                      Rp {item.price}
                    </p>
                    <p className="mt-0.5 text-[9px] text-gray-400">
                      {soldCounts[item.id]} terjual
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}