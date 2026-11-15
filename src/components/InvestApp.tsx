import { Coins, TrendingDown, TrendingUp, Wallet } from 'lucide-react';
import { ASSETS, type AssetRisk } from '../data/investments';
import { useGameStore } from '../store/useGameStore';

const RISK_META: Record<AssetRisk, { label: string; className: string }> = {
  safe: { label: 'Aman', className: 'bg-teal/20 text-teal-dark' },
  gacha: { label: 'Gacha', className: 'bg-sunny/30 text-sunny-dark' },
  extreme: { label: 'Ekstrem', className: 'bg-coral/20 text-coral-dark' },
};

export default function InvestApp() {
  const money = useGameStore((s) => s.stats.money);
  const assetPrices = useGameStore((s) => s.assetPrices);
  const portfolio = useGameStore((s) => s.portfolio);
  const buyAsset = useGameStore((s) => s.buyAsset);
  const sellAsset = useGameStore((s) => s.sellAsset);

  const portfolioValue = ASSETS.reduce(
    (sum, a) => sum + (assetPrices[a.id] ?? 0) * (portfolio[a.id] ?? 0),
    0,
  );

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-gray-100 p-4">
      <h3 className="mb-3 text-xl font-black tracking-tight text-navy">
        Pasar Modal
      </h3>

      <div className="mb-3 flex flex-col gap-2">
        <div className="flex items-center justify-between rounded-xl bg-sunny px-3 py-2 text-sm font-black text-navy">
          <span className="flex items-center gap-1.5">
            <Coins size={16} strokeWidth={2.5} />
            Uang
          </span>
          <span>Rp {money}</span>
        </div>
        <div className="flex items-center justify-between rounded-xl bg-white px-3 py-2 text-xs font-bold text-navy/70 shadow-sm">
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
            className="mb-3 rounded-2xl bg-white p-4 shadow-sm"
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
              <div className="text-right">
                <p className="text-[10px] font-bold uppercase text-navy/50">
                  Harga
                </p>
                <p
                  className={`text-lg font-black ${
                    price > 0 ? 'text-navy' : 'text-coral-dark'
                  }`}
                >
                  Rp {price}
                </p>
              </div>
            </div>

            <p className="mt-2 text-xs font-bold text-navy/60">
              Kepemilikan: {owned} unit
            </p>

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
  );
}