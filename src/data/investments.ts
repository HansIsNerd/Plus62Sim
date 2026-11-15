export type AssetRisk = 'safe' | 'gacha' | 'extreme';

export interface Asset {
  id: string;
  name: string;
  basePrice: number;
  risk: AssetRisk;
}

export const ASSETS: Asset[] = [
  { id: 'saham', name: 'Saham', basePrice: 100, risk: 'safe' },
  { id: 'crypto', name: 'Crypto', basePrice: 1000, risk: 'gacha' },
  { id: 'koin-meme', name: 'Koin Meme', basePrice: 10, risk: 'extreme' },
];