export interface NPC {
  id: string;
  name: string;
  role: string;
  buffText: string;
}

export const IBU_NPC: NPC = {
  id: 'npc-ibu',
  name: 'Ibu',
  role: 'Ibu Tercinta',
  buffText: 'Doa Ibu menenangkan hati.',
};

export const NPC_POOL: NPC[] = [
  {
    id: 'npc-budi',
    name: 'Budi',
    role: 'Anak Kos',
    buffText: 'Curhat sambil makan mie instan.',
  },
  {
    id: 'npc-siti',
    name: 'Siti',
    role: 'HRD',
    buffText: 'Kasih tips lolos wawancara.',
  },
  {
    id: 'npc-joni',
    name: 'Joni',
    role: 'Freelancer',
    buffText: 'Ngopi santai sambil ngobrol proyek.',
  },
  {
    id: 'npc-rina',
    name: 'Rina',
    role: 'Barista',
    buffText: 'Menyeduhkan kopi dan dengar keluhanmu.',
  },
  {
    id: 'npc-agus',
    name: 'Agus',
    role: 'Ojol',
    buffText: 'Cerita kocak di jalanan.',
  },
  {
    id: 'npc-dewi',
    name: 'Dewi',
    role: 'Mahasiswi',
    buffText: 'Ngobrol ringan soal masa depan.',
  },
  {
    id: 'npc-tono',
    name: 'Tono',
    role: 'Tukang Warung',
    buffText: 'Ngobrol di warung sambil ngopi.',
  },
];