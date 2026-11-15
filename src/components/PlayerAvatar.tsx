interface Props {
  variant?: 'head' | 'full';
  className?: string;
}

const SKIN = '#FDE1D4';
const BLUSH = '#F6B2B2';
const INK = '#1C1C1C';
const STAR = '#FCD34D';
const JEANS = '#A5C1D6';
const JEANS_DARK = '#8DAEC6';
const SHOE = '#E74C3C';
const BAG = '#C0392B';
const WHITE = '#FFFFFF';
const SWEATER_LIGHT = '#2C2C2C';

function starPoints(cx: number, cy: number, outer: number, inner: number): string {
  const pts: string[] = [];
  for (let i = 0; i < 10; i += 1) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (-90 + i * 36) * (Math.PI / 180);
    pts.push(`${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`);
  }
  return pts.join(' ');
}

/** Kepala digambar di koordinat lokal 300x300, pusat wajah sekitar (150, 175) */
function Head() {
  return (
    <g>
      {/* Rambut belakang */}
      <path
        d="M62 170 C52 92 96 62 150 62 C204 62 248 92 238 170 C236 204 228 232 218 244 C206 226 198 200 198 176 L102 176 C102 200 94 226 82 244 C72 232 64 204 62 170 Z"
        fill={INK}
      />

      {/* Kuncir kiri */}
      <path
        d="M92 82 C70 82 56 64 62 46 C68 28 94 22 110 34 C124 44 124 70 112 80 C106 84 98 84 92 82 Z"
        fill={INK}
      />
      <path
        d="M72 52 C76 42 88 38 98 42"
        stroke={SWEATER_LIGHT}
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      {/* Kuncir kanan */}
      <path
        d="M208 82 C230 82 244 64 238 46 C232 28 206 22 190 34 C176 44 176 70 188 80 C194 84 202 84 208 82 Z"
        fill={INK}
      />
      <path
        d="M228 52 C224 42 212 38 202 42"
        stroke={SWEATER_LIGHT}
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />

      {/* Ikatan merah kuncir */}
      <path
        d="M88 92 C94 80 108 78 118 86 C112 98 100 102 88 98 Z"
        fill={SHOE}
      />
      <path
        d="M212 92 C206 80 192 78 182 86 C188 98 200 102 212 98 Z"
        fill={SHOE}
      />
      <circle cx="102" cy="90" r="5" fill={BAG} />
      <circle cx="198" cy="90" r="5" fill={BAG} />

      {/* Telinga */}
      <ellipse cx="82" cy="184" rx="9" ry="12" fill={SKIN} />
      <ellipse cx="218" cy="184" rx="9" ry="12" fill={SKIN} />
      {/* Anting merah */}
      <path
        d="M82 194 C77 196 76 204 82 208 C88 204 87 196 82 194 Z"
        fill={SHOE}
      />
      <path
        d="M218 194 C213 196 212 204 218 208 C224 204 223 196 218 194 Z"
        fill={SHOE}
      />

      {/* Wajah chibi */}
      <path
        d="M78 164 C78 110 108 84 150 84 C192 84 222 110 222 164 C222 208 192 244 150 244 C108 244 78 208 78 164 Z"
        fill={SKIN}
      />

      {/* Poni */}
      <path
        d="M72 164 C66 104 102 70 150 70 C198 70 234 104 228 164 C220 150 214 136 206 124 C196 134 182 138 168 130 C160 140 154 146 150 150 C146 146 140 140 132 130 C118 138 104 134 94 124 C86 136 80 150 72 164 Z"
        fill={INK}
      />
      {/* Kilau poni */}
      <path
        d="M104 96 C118 86 136 82 150 82"
        stroke={SWEATER_LIGHT}
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Alis */}
      <path
        d="M98 152 C106 147 116 147 124 151"
        stroke={INK}
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M176 151 C184 147 194 147 202 152"
        stroke={INK}
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Mata kiri */}
      <path
        d="M96 178 C96 160 106 154 118 154 C130 154 138 162 138 178 C138 194 130 202 117 202 C104 202 96 194 96 178 Z"
        fill={INK}
      />
      <path
        d="M94 170 C98 160 108 154 120 154"
        stroke={INK}
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <ellipse cx="126" cy="168" rx="7" ry="8" fill={WHITE} />
      <circle cx="108" cy="190" r="3.5" fill={WHITE} />
      {/* Mata kanan */}
      <path
        d="M162 178 C162 162 170 154 182 154 C194 154 204 160 204 178 C204 194 196 202 183 202 C170 202 162 194 162 178 Z"
        fill={INK}
      />
      <path
        d="M206 170 C202 160 192 154 180 154"
        stroke={INK}
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <ellipse cx="190" cy="168" rx="7" ry="8" fill={WHITE} />
      <circle cx="172" cy="190" r="3.5" fill={WHITE} />

      {/* Blush */}
      <path
        d="M84 206 C84 198 94 194 104 196 C112 198 114 206 108 211 C100 215 84 214 84 206 Z"
        fill={BLUSH}
        opacity="0.75"
      />
      <path
        d="M216 206 C216 198 206 194 196 196 C188 198 186 206 192 211 C200 215 216 214 216 206 Z"
        fill={BLUSH}
        opacity="0.75"
      />

      {/* Hidung */}
      <path
        d="M148 208 Q150 211 152 208"
        stroke="#E8A89A"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Mulut */}
      <path
        d="M140 220 C144 227 156 227 160 220"
        stroke={INK}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M144 223 C147 228 153 228 156 223 C153 225 147 225 144 223 Z"
        fill={BLUSH}
      />

      {/* Jepit bintang kuning (sisi kiri poni) */}
      <polygon
        points={starPoints(108, 128, 19, 8.5)}
        fill={STAR}
        stroke={INK}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M101 124 L106 119"
        stroke={WHITE}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.8"
      />
    </g>
  );
}

function Body() {
  return (
    <g>
      {/* Bayangan tanah */}
      <ellipse cx="150" cy="578" rx="112" ry="12" fill={INK} opacity="0.12" />

      {/* Kaki celana kiri */}
      <path
        d="M92 352 C86 420 76 490 66 538 C84 548 124 548 140 538 C144 490 148 430 150 360 Z"
        fill={JEANS}
      />
      {/* Kaki celana kanan */}
      <path
        d="M208 352 C214 420 224 490 234 538 C216 548 176 548 160 538 C156 490 152 430 150 360 Z"
        fill={JEANS}
      />
      {/* Bayangan lipatan antar kaki */}
      <path
        d="M150 360 C148 430 152 490 160 538 C156 490 152 430 150 360 Z"
        fill={JEANS_DARK}
      />
      <path
        d="M150 360 C152 430 148 490 140 538"
        stroke={JEANS_DARK}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Jahitan tepi kaki */}
      <path
        d="M100 376 C94 430 86 486 78 530"
        stroke={WHITE}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="5 6"
        fill="none"
        opacity="0.9"
      />
      <path
        d="M200 376 C206 430 214 486 222 530"
        stroke={WHITE}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="5 6"
        fill="none"
        opacity="0.9"
      />
      <path
        d="M138 380 C138 430 136 486 132 528"
        stroke={WHITE}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="5 6"
        fill="none"
        opacity="0.9"
      />
      <path
        d="M162 380 C162 430 164 486 168 528"
        stroke={WHITE}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="5 6"
        fill="none"
        opacity="0.9"
      />

      {/* Lipatan kain bawah celana */}
      <path
        d="M72 508 C90 516 118 516 136 508"
        stroke={JEANS_DARK}
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M70 522 C90 530 120 530 138 522"
        stroke={JEANS_DARK}
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M164 508 C182 516 210 516 228 508"
        stroke={JEANS_DARK}
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M162 522 C180 530 210 530 230 522"
        stroke={JEANS_DARK}
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Lipatan paha */}
      <path
        d="M104 420 C112 426 122 428 130 426"
        stroke={JEANS_DARK}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M196 420 C188 426 178 428 170 426"
        stroke={JEANS_DARK}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Sepatu kiri: sol putih tebal */}
      <path
        d="M56 546 C52 560 52 572 60 578 L148 578 C150 568 148 556 142 546 Z"
        fill={WHITE}
        stroke={INK}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Upper merah kiri */}
      <path
        d="M60 548 C60 532 76 526 96 528 C112 530 128 534 140 540 C148 544 150 552 146 558 L56 562 C54 556 56 550 60 548 Z"
        fill={SHOE}
        stroke={INK}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Moncong putih kiri */}
      <path
        d="M52 556 C48 560 50 568 58 568 L84 566 C80 558 68 554 52 556 Z"
        fill={WHITE}
        opacity="0.9"
      />
      {/* Tali kiri */}
      <path
        d="M92 534 L100 546 M104 536 L112 548 M116 538 L124 550"
        stroke={WHITE}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M60 570 L146 570"
        stroke="#D9D9D9"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Sepatu kanan */}
      <path
        d="M244 546 C248 560 248 572 240 578 L152 578 C150 568 152 556 158 546 Z"
        fill={WHITE}
        stroke={INK}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M240 548 C240 532 224 526 204 528 C188 530 172 534 160 540 C152 544 150 552 154 558 L244 562 C246 556 244 550 240 548 Z"
        fill={SHOE}
        stroke={INK}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M248 556 C252 560 250 568 242 568 L216 566 C220 558 232 554 248 556 Z"
        fill={WHITE}
        opacity="0.9"
      />
      <path
        d="M208 534 L200 546 M196 536 L188 548 M184 538 L176 550"
        stroke={WHITE}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M240 570 L154 570"
        stroke="#D9D9D9"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Pinggang celana */}
      <path
        d="M80 340 C110 352 190 352 220 340 L222 372 C190 384 110 384 78 372 Z"
        fill={JEANS}
      />
      <path
        d="M82 350 C112 362 188 362 218 350"
        stroke={WHITE}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="5 6"
        fill="none"
        opacity="0.9"
      />
      {/* Saku miring (tempat tangan masuk) */}
      <path
        d="M86 352 C100 362 112 376 118 396"
        stroke={JEANS_DARK}
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M214 352 C200 362 188 376 182 396"
        stroke={JEANS_DARK}
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Sweater oversized: badan */}
      <path
        d="M96 250 C120 262 180 262 204 250 C236 262 262 300 268 352 C270 366 262 374 250 374 C220 384 80 384 50 374 C38 374 30 366 32 352 C38 300 64 262 96 250 Z"
        fill={INK}
      />
      {/* Ujung bawah sweater (ribbed) */}
      <path
        d="M50 366 C80 378 220 378 250 366 L252 380 C220 392 80 392 48 380 Z"
        fill={SWEATER_LIGHT}
      />
      <path
        d="M70 372 L70 386 M92 376 L92 390 M114 378 L114 392 M136 379 L136 393 M158 379 L158 393 M180 378 L180 392 M202 376 L202 390 M224 372 L224 386 M244 368 L244 382"
        stroke={INK}
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Lengan kiri: lebar, mengarah ke saku */}
      <path
        d="M64 270 C44 292 32 330 38 362 C54 392 92 398 118 394 C124 384 122 368 112 356 C98 336 88 306 92 276 C82 268 72 266 64 270 Z"
        fill={INK}
      />
      <path
        d="M52 300 C46 322 48 346 56 366"
        stroke={SWEATER_LIGHT}
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M86 374 C98 384 110 388 122 386"
        stroke={SWEATER_LIGHT}
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Lengan kanan */}
      <path
        d="M236 270 C256 292 268 330 262 362 C246 392 208 398 182 394 C176 384 178 368 188 356 C202 336 212 306 208 276 C218 268 228 266 236 270 Z"
        fill={INK}
      />
      <path
        d="M248 300 C254 322 252 346 244 366"
        stroke={SWEATER_LIGHT}
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M214 374 C202 384 190 388 178 386"
        stroke={SWEATER_LIGHT}
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Lipatan kain sweater */}
      <path
        d="M120 330 C136 340 164 340 180 330"
        stroke={SWEATER_LIGHT}
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M100 300 C104 312 106 322 104 334"
        stroke={SWEATER_LIGHT}
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M200 300 C196 312 194 322 196 334"
        stroke={SWEATER_LIGHT}
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Kerah */}
      <path
        d="M110 246 C124 266 176 266 190 246 C178 238 122 238 110 246 Z"
        fill={SWEATER_LIGHT}
      />
      <path
        d="M118 248 C132 262 168 262 182 248"
        stroke={INK}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Tas selempang merah: tali menyilang bahu kanan (sisi kanan layar) ke pinggang kiri */}
      <path
        d="M196 252 C208 258 216 266 220 274 L120 372 C112 368 106 362 102 356 Z"
        fill={BAG}
      />
      <path
        d="M204 256 L112 364"
        stroke="#E2574A"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="4 6"
        fill="none"
      />
      {/* Badan tas di pinggul kiri */}
      <path
        d="M70 362 C68 350 78 342 92 342 L128 344 C142 346 146 358 142 372 C140 386 128 394 112 394 L90 394 C76 392 70 380 70 362 Z"
        fill={BAG}
        stroke="#8E271C"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M72 358 C90 366 122 366 142 358"
        stroke="#8E271C"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M78 352 C86 348 100 346 112 348"
        stroke="#E2574A"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        opacity="0.8"
      />
      <circle cx="107" cy="368" r="5" fill={STAR} stroke="#8E271C" strokeWidth="1.5" />
    </g>
  );
}

export function PlayerAvatar({ variant = 'full', className }: Props) {
  if (variant === 'head') {
    return (
      <svg
        viewBox="0 0 200 200"
        className={className ?? 'h-full w-full'}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Avatar pemain"
      >
        {/* Layer background */}
        <rect width="200" height="200" fill={STAR} opacity="0.25" />
        {/* Kepala di-crop: koordinat 300x300 diskalakan ke 200x200 dan diposisikan tengah */}
        <g transform="translate(-30 -22) scale(1.4)">
          <g transform="translate(-19 -17) scale(1)">
            <g transform="translate(0 0)">
              <Head />
            </g>
          </g>
        </g>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 300 600"
      className={className ?? 'h-full w-full'}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Avatar pemain"
    >
      <Body />
      {/* Leher */}
      <path
        d="M132 236 C132 248 134 254 140 258 L160 258 C166 254 168 248 168 236 Z"
        fill={SKIN}
      />
      {/* Kepala chibi besar, digeser ke atas badan */}
      <g transform="translate(0 -20)">
        <Head />
      </g>
    </svg>
  );
}

export default PlayerAvatar;