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

// Koordinat internal viewBox (di-scale penuh ke container via preserveAspectRatio="none")
const SPARK_W = 300;
const SPARK_H = 64;
const SPARK_PAD_X = 6;
const SPARK_PAD_Y = 8;

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
    return <div className="h-full w-full" aria-hidden="true" />;
  }

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min;
  const innerW = SPARK_W - SPARK_PAD_X * 2;
  const innerH = SPARK_H - SPARK_PAD_Y * 2;

  const coords = data.map((value, i) => {
    const x = SPARK_PAD_X + (i / (data.length - 1)) * innerW;
    const y =
      range === 0
        ? SPARK_H / 2
        : SPARK_PAD_Y + innerH - ((value - min) / range) * innerH;
    return { x, y };
  });

  const points = coords
    .map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(' ');
  const areaPoints = `${SPARK_PAD_X},${SPARK_H} ${points} ${coords[coords.length - 1].x.toFixed(1)},${SPARK_H}`;
  const last = coords[coords.length - 1];
  const up = data[data.length - 1] > data[0];
  const strokeClass = up ? 'stroke-teal' : 'stroke-coral';
  const fillClass = up ? 'fill-teal' : 'fill-coral';

  return (
    <div className="relative h-full w-full">
      <svg
        viewBox={`0 0 ${SPARK_W} ${SPARK_H}`}
        preserveAspectRatio="none"
        className="h-full w-full"
        role="img"
        aria-label={up ? 'Tren naik' : 'Tren turun'}
        fill="none"
      >
        <polygon
          points={areaPoints}
          className={`${fillClass} transition-opacity duration-500 ${
            drawn ? 'opacity-10' : 'opacity-0'
          }`}
        />
        <polyline
          points={points}
          pathLength={1}
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={drawn ? 0 : 1}
          vectorEffect="non-scaling-stroke"
          className={`${strokeClass} ${
            drawn ? 'transition-all duration-500' : 'transition-none'
          }`}
        />
      </svg>
      {/* Titik akhir dirender sebagai HTML agar tidak ter-stretch oleh preserveAspectRatio="none" */}
      <span
        aria-hidden="true"
        className={`absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-500 ${
          up ? 'bg-teal' : 'bg-coral'
        } ${drawn ? 'opacity-100' : 'opacity-0'}`}
        style={{
          left: `${(last.x / SPARK_W) * 100}%`,
          top: `${(last.y / SPARK_H) * 100}%`,
        }}
      />
    </div>
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
              {/* Baris 1: Header */}
              <div className="flex items-center justify-between gap-2">
                <h4 className="min-w-0 truncate text-lg font-bold text-navy">
                  {asset.name}
                </h4>
                <p
                  className={`shrink-0 whitespace-nowrap text-xl font-bold ${
                    price > 0 ? 'text-teal' : 'text-coral-dark'
                  }`}
                >
                  Rp {price}
                </p>
              </div>

              {/* Baris 2: Grafik */}
              <div className="my-2 h-16 w-full">
                <Sparkline data={priceHistory[asset.id] || []} />
              </div>

              {/* Baris 3: Info */}
              <div className="flex items-center justify-between gap-2 text-xs">
                <span
                  className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-black uppercase ${risk.className}`}
                >
                  {risk.label}
                </span>
                <span className="min-w-0 truncate font-semibold text-gray-500">
                  Kepemilikan: {owned} unit
                </span>
              </div>

              {/* Baris 4: Tombol */}
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