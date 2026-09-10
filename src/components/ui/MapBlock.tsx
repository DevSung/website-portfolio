/**
 * 지도 자리. 실제 납품에서는 카카오맵/네이버지도 JS SDK를 붙인다
 * (도메인 등록 + 앱 키가 필요해 데모에는 넣지 않았다).
 */
export default function MapBlock({
  address,
  hint,
}: {
  address: string;
  hint: string;
}) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-surface-2 sm:aspect-[16/7]">
      <svg
        viewBox="0 0 800 350"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <rect width="800" height="350" fill="var(--color-surface-2)" />
        {/* 블록 */}
        <g fill="var(--color-brand)" opacity="0.16">
          <rect x="40" y="30" width="200" height="110" rx="6" />
          <rect x="270" y="30" width="150" height="110" rx="6" />
          <rect x="450" y="30" width="300" height="80" rx="6" />
          <rect x="40" y="200" width="130" height="120" rx="6" />
          <rect x="200" y="200" width="220" height="120" rx="6" />
          <rect x="450" y="170" width="180" height="150" rx="6" />
          <rect x="660" y="140" width="100" height="180" rx="6" />
        </g>
        {/* 도로 */}
        <g stroke="var(--color-brand)" strokeOpacity="0.28" strokeWidth="15" strokeLinecap="round">
          <path d="M0 170 H800" />
          <path d="M255 0 V350" />
          <path d="M435 110 V350" />
        </g>
        {/* 핀 */}
        <g transform="translate(255 170)">
          <circle r="26" fill="var(--color-brand)" opacity="0.18" />
          <circle r="14" fill="var(--color-brand)" opacity="0.3" />
          <path
            d="M0 -22 a11 11 0 0 1 11 11 c0 8 -11 19 -11 19 s-11 -11 -11 -19 a11 11 0 0 1 11 -11 z"
            fill="var(--color-brand)"
          />
          <circle cy="-11" r="4" fill="var(--color-brand-ink)" />
        </g>
      </svg>

      <div className="absolute inset-x-3 bottom-3 rounded-xl border border-line bg-surface/92 p-4 backdrop-blur sm:inset-x-5 sm:bottom-5 sm:max-w-md">
        <p className="text-sm font-semibold">{address}</p>
        <p className="mt-1 text-xs leading-relaxed text-muted">{hint}</p>
      </div>
    </div>
  );
}
