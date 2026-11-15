export function SvgKopi() {
  return (
    <svg
      viewBox="0 0 120 120"
      className="h-full w-full object-contain p-2"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Uap */}
      <path
        d="M46 26 C 40 20, 52 16, 46 8"
        stroke="#9CA3AF"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M60 28 C 54 22, 66 18, 60 10"
        stroke="#9CA3AF"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M74 26 C 68 20, 80 16, 74 8"
        stroke="#9CA3AF"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Tutup */}
      <rect x="32" y="32" width="56" height="9" rx="4.5" fill="#2B3576" />
      <rect x="36" y="38" width="48" height="7" rx="3" fill="#F37A6E" />
      {/* Badan gelas */}
      <path d="M38 45 H82 L77 104 Q76 110 70 110 H50 Q44 110 43 104 Z" fill="#FFFFFF" />
      <path d="M38 45 H82 L77 104 Q76 110 70 110 H50 Q44 110 43 104 Z" fill="#F3F4F6" opacity="0.6" />
      {/* Sleeve kopi */}
      <path d="M40.5 62 H79.5 L77.2 88 H42.8 Z" fill="#F9B23C" />
      <circle cx="60" cy="75" r="7" fill="#FFFFFF" />
      <path
        d="M56.5 75 Q60 70 63.5 75 Q60 80 56.5 75 Z"
        fill="#C98A1E"
      />
      {/* Highlight */}
      <path
        d="M46 50 L48.5 100"
        stroke="#FFFFFF"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.8"
      />
      {/* Bayangan */}
      <ellipse cx="60" cy="113" rx="24" ry="3" fill="#2B3576" opacity="0.12" />
    </svg>
  );
}

export function SvgObat() {
  return (
    <svg
      viewBox="0 0 120 120"
      className="h-full w-full object-contain p-2"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Botol sirup */}
      <rect x="30" y="14" width="32" height="14" rx="4" fill="#2B3576" />
      <rect x="34" y="12" width="3" height="18" rx="1.5" fill="#1B2352" />
      <rect x="40" y="12" width="3" height="18" rx="1.5" fill="#1B2352" />
      <rect x="46" y="12" width="3" height="18" rx="1.5" fill="#1B2352" />
      <rect x="52" y="12" width="3" height="18" rx="1.5" fill="#1B2352" />
      <rect x="35" y="27" width="22" height="9" fill="#71C7A6" opacity="0.5" />
      <path
        d="M28 40 Q28 34 36 34 H56 Q64 34 64 40 V100 Q64 108 56 108 H36 Q28 108 28 100 Z"
        fill="#71C7A6"
      />
      {/* Cairan */}
      <path
        d="M28 58 H64 V100 Q64 108 56 108 H36 Q28 108 28 100 Z"
        fill="#4A9E7E"
      />
      {/* Label */}
      <rect x="31" y="64" width="30" height="30" rx="5" fill="#FFFFFF" />
      <rect x="44" y="69" width="4" height="20" rx="1.5" fill="#F37A6E" />
      <rect x="36" y="77" width="20" height="4" rx="1.5" fill="#F37A6E" />
      {/* Highlight */}
      <path
        d="M33 42 V54"
        stroke="#FFFFFF"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.7"
      />
      {/* Kapsul 1 */}
      <g transform="rotate(-28 86 84)">
        <rect x="70" y="76" width="32" height="16" rx="8" fill="#F37A6E" />
        <path d="M86 76 H94 A8 8 0 0 1 94 92 H86 Z" fill="#FFFFFF" />
        <rect x="74" y="79" width="10" height="3" rx="1.5" fill="#FFFFFF" opacity="0.5" />
      </g>
      {/* Kapsul 2 */}
      <g transform="rotate(24 88 106)">
        <rect x="74" y="99" width="28" height="14" rx="7" fill="#F9B23C" />
        <path d="M88 99 H95 A7 7 0 0 1 95 113 H88 Z" fill="#FFFFFF" />
        <rect x="78" y="102" width="8" height="3" rx="1.5" fill="#FFFFFF" opacity="0.5" />
      </g>
    </svg>
  );
}

export function SvgNasiPadang() {
  return (
    <svg
      viewBox="0 0 120 120"
      className="h-full w-full object-contain p-2"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Uap */}
      <path
        d="M52 22 C 47 17, 57 14, 52 8"
        stroke="#9CA3AF"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M68 22 C 63 17, 73 14, 68 8"
        stroke="#9CA3AF"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      {/* Piring */}
      <ellipse cx="60" cy="82" rx="52" ry="26" fill="#2B3576" />
      <ellipse cx="60" cy="78" rx="52" ry="26" fill="#FFFFFF" />
      <ellipse cx="60" cy="78" rx="42" ry="20" fill="#E5E7EB" />
      <ellipse cx="60" cy="77" rx="42" ry="19" fill="#F9FAFB" />
      {/* Nasi */}
      <path
        d="M34 76 Q34 44 60 44 Q86 44 86 76 Q86 88 60 88 Q34 88 34 76 Z"
        fill="#FFFFFF"
        stroke="#E5E7EB"
        strokeWidth="2"
      />
      <circle cx="48" cy="58" r="2.5" fill="#E5E7EB" />
      <circle cx="58" cy="52" r="2.5" fill="#E5E7EB" />
      <circle cx="68" cy="58" r="2.5" fill="#E5E7EB" />
      <circle cx="54" cy="66" r="2.5" fill="#E5E7EB" />
      <circle cx="66" cy="68" r="2.5" fill="#E5E7EB" />
      {/* Rendang / ayam */}
      <path
        d="M16 78 Q16 62 32 62 Q46 62 46 76 Q46 90 30 90 Q16 90 16 78 Z"
        fill="#C9564A"
      />
      <path
        d="M20 76 Q22 66 32 66 Q40 66 42 74"
        stroke="#F37A6E"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="30" cy="80" r="4" fill="#F37A6E" />
      {/* Sayur daun singkong */}
      <path
        d="M74 82 Q74 66 90 66 Q106 66 106 80 Q106 92 90 92 Q74 92 74 82 Z"
        fill="#4A9E7E"
      />
      <path
        d="M80 80 Q90 70 100 80"
        stroke="#71C7A6"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M82 86 Q90 80 98 86"
        stroke="#71C7A6"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      {/* Sambal & irisan */}
      <circle cx="60" cy="40" r="6" fill="#F37A6E" />
      <circle cx="60" cy="40" r="2.5" fill="#F9B23C" />
    </svg>
  );
}

export function SvgBaju() {
  return (
    <svg
      viewBox="0 0 120 120"
      className="h-full w-full object-contain p-2"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Bayangan */}
      <ellipse cx="60" cy="108" rx="40" ry="4" fill="#2B3576" opacity="0.12" />
      {/* Badan kaos terlipat */}
      <path
        d="M22 40 L40 24 H80 L98 40 L98 98 Q98 102 94 102 H26 Q22 102 22 98 Z"
        fill="#9F7AEA"
      />
      {/* Lengan kiri */}
      <path
        d="M22 40 L40 24 L46 36 L22 62 Z"
        fill="#B794F4"
      />
      {/* Lengan kanan */}
      <path
        d="M98 40 L80 24 L74 36 L98 62 Z"
        fill="#B794F4"
      />
      {/* Kerah */}
      <path
        d="M46 24 Q60 40 74 24 Z"
        fill="#6B46C1"
      />
      <path
        d="M50 24 Q60 34 70 24"
        stroke="#F9B23C"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      {/* Garis lipatan */}
      <path
        d="M22 70 H98"
        stroke="#805AD5"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="1 6"
      />
      {/* Logo brand */}
      <circle cx="60" cy="62" r="11" fill="#FFFFFF" />
      <path
        d="M54 62 L58.5 66.5 L66.5 57.5"
        stroke="#F37A6E"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Label tag */}
      <rect x="80" y="82" width="16" height="9" rx="2" fill="#F9B23C" />
      <circle cx="84" cy="86.5" r="1.5" fill="#FFFFFF" />
      {/* Highlight */}
      <path
        d="M28 88 V96"
        stroke="#FFFFFF"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

export function SvgParfum() {
  return (
    <svg
      viewBox="0 0 120 120"
      className="h-full w-full object-contain p-2"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Percikan */}
      <path
        d="M94 22 L97 14 L100 22 L108 25 L100 28 L97 36 L94 28 L86 25 Z"
        fill="#F9B23C"
      />
      <circle cx="20" cy="30" r="3" fill="#F37A6E" />
      <circle cx="102" cy="58" r="2.5" fill="#71C7A6" />
      {/* Tutup emas */}
      <rect x="44" y="12" width="32" height="24" rx="6" fill="#F9B23C" />
      <rect x="44" y="12" width="10" height="24" rx="5" fill="#FBD38D" />
      <rect x="44" y="30" width="32" height="6" fill="#C98A1E" />
      {/* Leher */}
      <rect x="52" y="36" width="16" height="10" fill="#C98A1E" />
      {/* Botol kaca */}
      <rect x="24" y="46" width="72" height="62" rx="14" fill="#F37A6E" />
      <rect x="28" y="50" width="64" height="54" rx="11" fill="#FBB6B0" />
      {/* Cairan */}
      <path
        d="M28 68 H92 V93 Q92 104 81 104 H39 Q28 104 28 93 Z"
        fill="#F37A6E"
      />
      {/* Label */}
      <rect x="40" y="72" width="40" height="22" rx="5" fill="#FFFFFF" />
      <path
        d="M60 76 L62.5 81 L68 81.8 L64 85.6 L65 91 L60 88.4 L55 91 L56 85.6 L52 81.8 L57.5 81 Z"
        fill="#F9B23C"
      />
      {/* Highlight */}
      <path
        d="M34 56 V84"
        stroke="#FFFFFF"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.75"
      />
      {/* Bayangan */}
      <ellipse cx="60" cy="113" rx="34" ry="3" fill="#2B3576" opacity="0.12" />
    </svg>
  );
}