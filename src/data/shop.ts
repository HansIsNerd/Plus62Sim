import { Coffee, Pill, Shirt, Sparkles, Utensils } from 'lucide-react';
import type { Card } from './cards';

export type ShopSvgId = 'kopi' | 'obat' | 'nasi' | 'baju' | 'parfum';

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  svgId: ShopSvgId;
  card: Card;
}

export const SHOP_ITEMS: ShopItem[] = [
  {
    id: 'shop-kopi',
    name: 'Kopi',
    description: 'Segelas kopi hangat penambah semangat.',
    price: 20,
    svgId: 'kopi',
    card: {
      id: 'item_kopi',
      title: 'Kopi',
      description: 'Seruput kopi, pikiran lebih tenang.',
      Icon: Coffee,
      color: 'sunny',
      type: 'action',
      tag: 'consumable',
      effects: { mental: 20 },
    },
  },
  {
    id: 'shop-obat',
    name: 'Obat',
    description: 'Obat warung untuk memulihkan badan.',
    price: 50,
    svgId: 'obat',
    card: {
      id: 'item_obat',
      title: 'Obat',
      description: 'Minum obat, badan kembali fit.',
      Icon: Pill,
      color: 'teal',
      type: 'action',
      tag: 'consumable',
      effects: { health: 30 },
    },
  },
  {
    id: 'shop-nasi-padang',
    name: 'Nasi Padang',
    description: 'Nasi dengan lauk lengkap, kenyang maksimal.',
    price: 30,
    svgId: 'nasi',
    card: {
      id: 'item_nasi_padang',
      title: 'Nasi Padang',
      description: 'Lauk lengkap, perut pun senang.',
      Icon: Utensils,
      color: 'coral',
      type: 'action',
      tag: 'consumable',
      effects: { food: 40 },
    },
  },
  {
    id: 'shop-baju-branded',
    name: 'Baju Branded',
    description: 'Outfit mahal bikin penampilan dan percaya diri naik.',
    price: 50,
    svgId: 'baju',
    card: {
      id: 'item_baju_branded',
      title: 'Baju Branded',
      description: 'Pakai baju keren, percaya diri melejit.',
      Icon: Shirt,
      color: 'sunny',
      type: 'action',
      tag: 'consumable',
      effects: { tampang: 25, mental: 10 },
    },
  },
  {
    id: 'shop-parfum-mahal',
    name: 'Parfum Mahal',
    description: 'Wangi semerbak, orang pun menoleh.',
    price: 40,
    svgId: 'parfum',
    card: {
      id: 'item_parfum_mahal',
      title: 'Parfum Mahal',
      description: 'Semprot sekali, aura langsung beda.',
      Icon: Sparkles,
      color: 'teal',
      type: 'action',
      tag: 'consumable',
      effects: { tampang: 15 },
    },
  },
];