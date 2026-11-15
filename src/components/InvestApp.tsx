import { useEffect, useState } from 'react';
import {
  ChevronLeft,
  Coins,
  TrendingDown,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import { ASSETS, type AssetRisk } from '../data/investments';
import { useGameStore } from '../store/useGameStore';

const RISK_META: Record<AssetRisk, { label: string; className: string }> = {
  safe: { label: 'Aman', className: 'bg-teal/20 text-teal-dark' },
  gacha: { label: 'Gacha', className: 'bg-sunny/30 text-sunny-dark' },
  extreme: { label: 'Ekstrem', className: 'bg-coral/20 text-coral-dark' },
};

const SPARK_W = 96;
const SPARK_H = 40;
const SPARK_PAD = 4;

interface SparklineProps {
  data: number[];
}

function Sparkline({ data }: SparklineProps) {
  const [drawn, setDrawn] = useState(true);
  const dataKey = data.join(',');

  // Setiap data berubah: garis "digambar ulang" dari awal
  useEffect(() => {
    setDrawn(false);
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setDrawn(true));
    });
    return () => cancelAnimationFrame(id);
  }, [dataKey]);

  if (data.length < 2) {
    return <div className="h-10 w-24 shrink-0" aria-hidden="true" />;
  }

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min;
  const innerW = SPARK_W - SPARK_PAD * 2;
  const innerH = SPARK_H - SPARK_PAD * 2;

  const coords = data.map((value, i) => {
    const x = SPARK_PAD + (i / (data.length - 1)) * innerW;
    const y =
      range === 0
        ? SPARK_H / 2
        : SPARK_PAD + innerH - ((value - min) / range) * innerH;
    return { x, y };
  });

  const points = coords
    .map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(' ');
  const last = coords[coords.length - 1];
  const up = data[data.length - 1] > data[0];
  const strokeClass = up ? 'stroke-teal' : 'stroke-coral';
  const fillClass = up ? 'fill-teal' : 'fill-coral';

  return (
    <svg
      viewBox={`0 0 ${SPARK_W} ${SPARK_H}`}
      className="h-10 w-24 shrink-0"
      role="img"
      aria-label={up ? 'Tren naik' : 'Tren turun'}
      fill="none"
    >
      <polyline
        points={points}
        pathLength={1}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={1}
        strokeDashoffset={drawn ? 0 : 1}
        className={`${strokeClass} ${
          drawn ? 'transition-all duration-500' : 'transition-none'
        }`}
      />
      <circle
        cx={last.x}
        cy={last.y}
        r={3}
        className={`${fillClass} transition-all duration-500 ${
          drawn ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </svg>
  );
}

export default function InvestApp() {
  const money = useGameStore((s) => s.stats.money);
  const assetPrices = useGameStore((s) => s.assetPrices);
  const portfolio = useGameStore((s) => s.portfolio);
  const priceHistory = useGameStore((s) => s.priceHistory);
  const buyAsset = useGameStore((s) => s.buyAsset);
  const sellAsset = useGameStore((s) => s.sellAsset);
  const setActiveApp = useGameStore((s) => s.setActiveApp);

  const portfolioValue = ASSETS.reduce(
    (sum, a) => sum + (assetPrices[a.id] ?? 0) * (portfolio[a.id] ?? 0),
    0,
  );

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
        <span className="text-sm font-semibold text-black">Pasar Modal</span>
        <div className="w-6" />
      </div>

      {/* Scrollable Content */}
      <div className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto p-4 pb-12">
        <div className="mb-3 flex w-full flex-col gap-2">
          <div className="flex w-full items-center justify-between rounded-xl bg-sunny px-3 py-2 text-sm font-black text-navy">
            <span className="flex items-center gap-1.5">
              <Coins size={16} strokeWidth={2.5} />
              Uang
            </span>
            <span>Rp {money}</span>
          </div>
          <div className="flex w-full items-center justify-between rounded-xl bg-white px-3 py-2 text-xs font-bold text-navy/70 shadow-sm">
            <span className="flex items-center gap-1.5">
              <Wallet size={14} strokeWidth={2.5} />
              Nilai Portofolio
            </span>
            <span>Rp {portfolioValue}</span>
          </div>
        </div>

        {ASSETS.map((asset) => {
          const price = assetPrices[asset.id] ?? 0;
          const owned = portfolio[asset.id] ?? 0;
          const canBuy = price > 0 && money >= price;
          const canSell = owned > 0;
          const risk = RISK_META[asset.risk];

          return (
            <div
              key={asset.id}
              className="mb-3 w-full rounded-2xl bg-white p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h4 className="truncate text-base font-black text-navy">
                    {asset.name}
                  </h4>
                  <span
                    className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-black uppercase ${risk.className}`}
                  >
                    {risk.label}
                  </span>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-[10px] font-bold uppercase text-navy/50">
                    Harga
                  </p>
                  <p
                    className={`whitespace-nowrap text-lg font-black ${
                      price > 0 ? 'text-navy' : 'text-coral-dark'
                    }`}
                  >
                    Rp {price}
                  </p>
                </div>
              </div>

              <div className="mt-2 flex items-center justify-between gap-2">
                <p className="min-w-0 truncate text-xs font-bold text-navy/60">
                  Kepemilikan: {owned} unit
                </p>
                <Sparkline data={priceHistory[asset.id] || []} />
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => buyAsset(asset.id, 1)}
                  disabled={!canBuy}
                  className="flex items-center justify-center gap-1.5 rounded-xl bg-teal px-3 py-2 text-xs font-black text-white shadow-teal outline-none transition-all active:translate-y-1 active:shadow-none focus-visible:ring-4 focus-visible:ring-sunny disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <TrendingUp size={14} strokeWidth={2.5} />
                  Beli 1
                </button>
                <button
                  type="button"
                  onClick={() => sellAsset(asset.id, 1)}
                  disabled={!canSell}
                  className="flex items-center justify-center gap-1.5 rounded-xl bg-coral px-3 py-2 text-xs font-black text-white shadow-coral outline-none transition-all active:translate-y-1 active:shadow-none focus-visible:ring-4 focus-visible:ring-sunny disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <TrendingDown size={14} strokeWidth={2.5} />
                  Jual 1
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}