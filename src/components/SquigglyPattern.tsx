interface Props {
  variant?: 0 | 1 | 2;
}

// Tiga set path berbeda supaya tiap kartu punya pola unik
const PATHS: string[][] = [
  [
    'M-20 60 C 40 10, 80 110, 140 60 S 240 10, 300 70',
    'M-20 140 C 50 90, 100 190, 170 140 S 260 90, 320 150',
    'M-20 230 C 40 180, 110 280, 180 230 S 270 180, 330 240',
    'M-20 320 C 60 270, 100 370, 170 320 S 250 270, 320 330',
  ],
  [
    'M-20 40 C 30 100, 90 -10, 150 50 S 250 110, 310 40',
    'M-20 120 C 40 180, 100 70, 170 130 S 260 190, 320 120',
    'M-20 210 C 50 270, 110 160, 180 220 S 270 280, 330 210',
    'M-20 300 C 40 360, 100 250, 170 310 S 260 370, 320 300',
  ],
  [
    'M-20 80 C 60 20, 60 140, 140 80 S 220 20, 300 80',
    'M-20 170 C 60 110, 60 230, 140 170 S 220 110, 300 170',
    'M-20 260 C 60 200, 60 320, 140 260 S 220 200, 300 260',
    'M-20 350 C 60 290, 60 410, 140 350 S 220 290, 300 350',
  ],
];

export function SquigglyPattern({ variant = 0 }: Props) {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 280 400"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {PATHS[variant].map((d, i) => (
        <path
          key={i}
          d={d}
          stroke="#FFFFFF"
          strokeOpacity={0.2}
          strokeWidth={6}
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}