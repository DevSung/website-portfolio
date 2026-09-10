/**
 * 사진 없이 화면을 채우는 SVG/CSS 그래픽.
 *
 * 스톡 사진을 끌어다 쓰면 라이선스가 걸리고, 회색 박스를 두면 데모가 죽는다.
 * 그래서 직접 그린 도형으로 무드만 잡아두고, 실제 납품에서는 이 자리에
 * 촬영본이 들어간다. 색은 전부 테마 변수를 따라간다.
 */

type Variant =
  | "blob" // 카페 히어로 — 겹친 유기적 면
  | "stitch" // 가죽 제품 — 사선 스티치
  | "steam" // 커피 — 김 오르는 선
  | "grid" // 클리닉 — 정렬된 격자 + 십자
  | "pulse" // 클리닉 — 동심원
  | "mesh" // 기업 — 그라디언트 메시 + 점
  | "chart"; // 기업 — 추상 지표 그래프

export default function Art({
  variant,
  className = "",
  label,
}: {
  variant: Variant;
  className?: string;
  /** 장식이 아니라 의미가 있을 때만 넣는다 */
  label?: string;
}) {
  const a11y = label
    ? { role: "img" as const, "aria-label": label }
    : { "aria-hidden": true as const };

  // 루트에 position 유틸리티를 박아두면 안 된다. Tailwind 는 클래스 문자열
  // 순서가 아니라 스타일시트 순서로 승자를 정하기 때문에, relative 를 넣어두면
  // 호출부가 넘긴 absolute 를 덮어써 레이아웃이 어긋난다.
  return (
    <div className={`overflow-hidden ${className}`} {...a11y}>
      {shapes[variant]}
    </div>
  );
}

const shapes: Record<Variant, React.ReactNode> = {
  blob: (
    <svg viewBox="0 0 400 400" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="400" fill="var(--color-surface-2)" />
      <g opacity="0.9">
        <ellipse cx="150" cy="170" rx="160" ry="140" fill="var(--color-brand)" opacity="0.28" />
        <ellipse cx="270" cy="250" rx="140" ry="120" fill="var(--color-accent)" opacity="0.4" />
        <ellipse cx="215" cy="120" rx="90" ry="80" fill="var(--color-brand)" opacity="0.5" />
      </g>
      <g stroke="var(--color-brand)" strokeWidth="1.2" opacity="0.5" fill="none">
        <circle cx="215" cy="120" r="104" />
        <circle cx="215" cy="120" r="128" />
      </g>
    </svg>
  ),

  stitch: (
    <svg viewBox="0 0 400 300" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill="var(--color-brand)" opacity="0.9" />
      <rect width="400" height="300" fill="var(--color-ink)" opacity="0.12" />
      <g
        stroke="var(--color-surface)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="9 11"
        opacity="0.55"
      >
        <path d="M40 40 L360 40" />
        <path d="M40 260 L360 260" />
        <path d="M40 40 L40 260" />
        <path d="M360 40 L360 260" />
      </g>
      <path
        d="M120 40 L120 260 M200 40 L200 260 M280 40 L280 260"
        stroke="var(--color-surface)"
        strokeWidth="1"
        opacity="0.14"
      />
    </svg>
  ),

  steam: (
    <svg viewBox="0 0 240 240" className="h-full w-full">
      <rect width="240" height="240" fill="var(--color-surface-2)" />
      <g
        stroke="var(--color-brand)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      >
        <path d="M95 100 C 80 78, 110 66, 95 44" />
        <path d="M122 100 C 107 74, 137 60, 122 34" />
        <path d="M149 100 C 134 78, 164 66, 149 44" />
      </g>
      <path
        d="M62 118 H182 L168 186 A18 18 0 0 1 150 202 H94 A18 18 0 0 1 76 186 Z"
        fill="var(--color-brand)"
        opacity="0.85"
      />
      <path
        d="M182 130 A24 24 0 1 1 178 168"
        stroke="var(--color-brand)"
        strokeWidth="9"
        fill="none"
        opacity="0.85"
      />
    </svg>
  ),

  grid: (
    <svg viewBox="0 0 400 300" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill="var(--color-surface-2)" />
      <defs>
        <pattern id="art-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0 H0 V40" fill="none" stroke="var(--color-line)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="400" height="300" fill="url(#art-grid)" />
      <g fill="var(--color-brand)" opacity="0.9">
        <rect x="176" y="104" width="48" height="14" rx="4" />
        <rect x="193" y="87" width="14" height="48" rx="4" />
      </g>
      <circle cx="200" cy="111" r="70" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" opacity="0.6" />
      <circle cx="200" cy="111" r="96" fill="none" stroke="var(--color-accent)" strokeWidth="1" opacity="0.3" />
    </svg>
  ),

  pulse: (
    <svg viewBox="0 0 400 200" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="200" fill="var(--color-brand)" />
      <g opacity="0.25" stroke="var(--color-brand-ink)" fill="none" strokeWidth="1.5">
        <circle cx="60" cy="100" r="40" />
        <circle cx="60" cy="100" r="70" />
        <circle cx="60" cy="100" r="100" />
        <circle cx="60" cy="100" r="130" />
      </g>
      <path
        d="M20 120 H120 l16 -44 l22 78 l18 -58 l16 24 H380"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),

  mesh: (
    <svg viewBox="0 0 400 300" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="art-mesh-a" cx="20%" cy="20%" r="70%">
          <stop offset="0%" stopColor="var(--color-brand)" stopOpacity="0.62" />
          <stop offset="100%" stopColor="var(--color-brand)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="art-mesh-b" cx="85%" cy="70%" r="65%">
          <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.34" />
          <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
        </radialGradient>
        <pattern id="art-dots" width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.5" fill="var(--color-ink)" opacity="0.16" />
        </pattern>
      </defs>
      <rect width="400" height="300" fill="var(--color-surface-2)" />
      <rect width="400" height="300" fill="url(#art-dots)" />
      <rect width="400" height="300" fill="url(#art-mesh-a)" />
      <rect width="400" height="300" fill="url(#art-mesh-b)" />
    </svg>
  ),

  chart: (
    <svg viewBox="0 0 400 220" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="220" fill="var(--color-surface-2)" />
      <g stroke="var(--color-line)" strokeWidth="1">
        <path d="M0 60 H400 M0 110 H400 M0 160 H400" />
      </g>
      <path
        d="M0 180 C 60 172, 90 140, 140 132 C 190 124, 210 96, 260 82 C 310 68, 340 44, 400 30 L400 220 L0 220 Z"
        fill="var(--color-brand)"
        opacity="0.18"
      />
      <path
        d="M0 180 C 60 172, 90 140, 140 132 C 190 124, 210 96, 260 82 C 310 68, 340 44, 400 30"
        fill="none"
        stroke="var(--color-brand)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <g fill="var(--color-accent)">
        <circle cx="140" cy="132" r="5" />
        <circle cx="260" cy="82" r="5" />
      </g>
    </svg>
  ),
};
