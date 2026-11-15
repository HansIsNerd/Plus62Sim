export interface Major {
  id: string;
  name: string;
  reqIq: number;
  reqTampang: number;
  gradAge: number;
  salary: number;
  mentalCost: number;
  description: string;
}

export const MAJORS_POOL: Major[] = [
  {
    id: 'kedokteran',
    name: 'Kedokteran',
    reqIq: 80,
    reqTampang: 0,
    gradAge: 25,
    salary: 120,
    mentalCost: 40,
    description: 'Gaji besar, mental terkuras.',
  },
  {
    id: 'hukum',
    name: 'Hukum',
    reqIq: 70,
    reqTampang: 0,
    gradAge: 23,
    salary: 80,
    mentalCost: 30,
    description: 'Kuasai undang-undang, kerja lembur.',
  },
  {
    id: 'teknik-informatika',
    name: 'Teknik Informatika',
    reqIq: 75,
    reqTampang: 0,
    gradAge: 22,
    salary: 70,
    mentalCost: 25,
    description: 'Koding, kopi, dan bug.',
  },
  {
    id: 'bisnis-manajemen',
    name: 'Bisnis/Manajemen',
    reqIq: 60,
    reqTampang: 0,
    gradAge: 22,
    salary: 50,
    mentalCost: 15,
    description: 'Jalan ninja jadi CEO.',
  },
  {
    id: 'seni-komunikasi',
    name: 'Seni/Komunikasi',
    reqIq: 0,
    reqTampang: 60,
    gradAge: 22,
    salary: 40,
    mentalCost: 10,
    description: 'Kreatif, butuh tampang biar eksis.',
  },
  {
    id: 'pendidikan',
    name: 'Pendidikan',
    reqIq: 60,
    reqTampang: 0,
    gradAge: 22,
    salary: 30,
    mentalCost: 5,
    description: 'Guru, hidup tenang, gaji cukup.',
  },
];