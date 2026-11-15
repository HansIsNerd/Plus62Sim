export interface Career {
  id: string;
  name: string;
  description: string;
  salary: number;
  mentalCost: number;
}

export const CAREERS_POOL: Career[] = [
  {
    id: 'buruh',
    name: 'Buruh',
    description: 'Kerja kasar dari pagi sampai sore. Capek badan, tapi hati tenang.',
    salary: 20,
    mentalCost: -5,
  },
  {
    id: 'karyawan-swasta',
    name: 'Karyawan Swasta',
    description: 'Jam kantor, target bulanan, dan atasan yang suka rapat dadakan.',
    salary: 40,
    mentalCost: -15,
  },
  {
    id: 'programmer',
    name: 'Programmer',
    description: 'Gaji besar, deadline lebih besar, bug muncul tengah malam.',
    salary: 80,
    mentalCost: -30,
  },
];