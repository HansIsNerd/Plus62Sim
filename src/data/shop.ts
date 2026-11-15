import { Coffee, Pill, Utensils } from 'lucide-react';
import type { Card } from './cards';

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  card: Card;
}

export const SHOP_ITEMS: ShopItem[] = [
  {
    id: 'shop-kopi',
    name: 'Kopi',
    description: 'Segelas kopi hangat penambah semangat.',
    price: 20,
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
];