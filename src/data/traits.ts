export interface Hobby {
  id: string;
  name: string;
  cardId: string;
  desc: string;
}

export interface Personality {
  id: string;
  name: string;
  desc: string;
}

export interface GeneratedTrait {
  id: string;
  /** Gabungan nama Hobi + Kepribadian, mis. "Gamer Introvert" */
  name: string;
  hobby: Hobby;
  personality: Personality;
}

export const HOBBIES: Hobby[] = [
  {
    id: 'gamer',
    name: 'Gamer',
    cardId: 'main_game',
    desc: 'Dapat kartu Main Game: Mental +20, IQ +5, Uang -10.',
  },
  {
    id: 'atlet',
    name: 'Atlet',
    cardId: 'olahraga',
    desc: 'Dapat kartu Olahraga: Health +20, Mental +5, Tampang +10.',
  },
  {
    id: 'kutu-buku',
    name: 'Kutu Buku',
    cardId: 'belajar_ekstra',
    desc: 'Dapat kartu Belajar Ekstra: IQ +15, Mental -10.',
  },
];

export const PERSONALITIES: Personality[] = [
  {
    id: 'introvert',
    name: 'Introvert',
    desc: 'Kartu Istirahat memberi Mental 2x lipat. Kartu Sosial menguras Mental -10.',
  },
  {
    id: 'ekstrovert',
    name: 'Ekstrovert',
    desc: 'Kartu Sosial memberi Mental 2x lipat. Kartu Istirahat menguras Mental -10.',
  },
  {
    id: 'ambis',
    name: 'Ambis',
    desc: 'Kartu Kerja memberi bonus Uang 1.5x. Tiap umur bertambah, Health -5.',
  },
];