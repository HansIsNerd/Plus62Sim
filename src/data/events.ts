export interface EventEffects {
  health?: number;
  food?: number;
  money?: number;
  mental?: number;
}

export interface EventChoice {
  text: string;
  effects: EventEffects;
}

export interface GameEvent {
  id: string;
  title: string;
  description: string;
  choices: EventChoice[];
}

export const EVENTS_POOL: GameEvent[] = [
  {
    id: 'dompet',
    title: 'Ketemu Dompet',
    description:
      'Di pinggir jalan setapak kamu menemukan dompet kulit berisi koin. Pemiliknya tidak terlihat di mana pun.',
    choices: [
      { text: 'Ambil isinya', effects: { money: 20, mental: -10 } },
      { text: 'Cari pemiliknya', effects: { mental: 10, food: -5 } },
    ],
  },
  {
    id: 'sakit-perut',
    title: 'Sakit Perut',
    description:
      'Perutmu tiba-tiba melilit setelah makan buah hutan yang tidak dikenal.',
    choices: [
      { text: 'Minum ramuan herbal', effects: { health: -5, money: -5 } },
      { text: 'Tahan saja', effects: { health: -20, mental: -5 } },
    ],
  },
  {
    id: 'hujan-deras',
    title: 'Hujan Deras',
    description:
      'Hujan turun tanpa ampun dan atap gubukmu bocor di mana-mana.',
    choices: [
      { text: 'Perbaiki atap sekarang', effects: { health: -5, mental: 5, money: -5 } },
      { text: 'Berteduh dan menunggu', effects: { health: -10, mental: -10 } },
    ],
  },
  {
    id: 'pedagang-keliling',
    title: 'Pedagang Keliling',
    description:
      'Seorang pedagang lewat membawa rempah dan ikan asin dengan harga bersahabat.',
    choices: [
      { text: 'Beli ikan asin', effects: { food: 25, money: -10 } },
      { text: 'Tawar-menawar', effects: { food: 10, money: -3, mental: 5 } },
      { text: 'Abaikan', effects: {} },
    ],
  },
  {
    id: 'gotong-royong',
    title: 'Gotong Royong',
    description:
      'Warga mengajakmu membersihkan jalan desa bersama-sama.',
    choices: [
      { text: 'Ikut bergabung', effects: { mental: 15, health: -5, food: -5 } },
      { text: 'Pura-pura sibuk', effects: { mental: -10, money: 5 } },
    ],
  },
  {
    id: 'ular-sawah',
    title: 'Ular di Sawah',
    description:
      'Seekor ular besar melintas di dekat kakimu saat kamu bekerja di sawah.',
    choices: [
      { text: 'Tangkap untuk dimakan', effects: { food: 20, health: -15 } },
      { text: 'Menjauh pelan-pelan', effects: { mental: -5 } },
    ],
  },
];