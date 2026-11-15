export interface Trait {
  id: string;
  name: string;
  description: string;
  startStats: {
    food: number;
    health: number;
    money: number;
    mental: number;
  };
}

export const TRAITS: Trait[] = [
  {
    id: 'anak-kos',
    name: 'Anak Kos',
    description: 'Dompet tipis di akhir bulan, mental di ambang batas.',
    startStats: { food: 70, health: 80, money: 15, mental: 30 },
  },
  {
    id: 'anak-sultan',
    name: 'Anak Sultan',
    description: 'Harta melimpah, tapi hati kosong dan mudah rapuh.',
    startStats: { food: 100, health: 100, money: 100, mental: 40 },
  },
  {
    id: 'pekerja-keras',
    name: 'Pekerja Keras',
    description: 'Uang mengalir, tubuh kelelahan.',
    startStats: { food: 70, health: 40, money: 90, mental: 70 },
  },
];