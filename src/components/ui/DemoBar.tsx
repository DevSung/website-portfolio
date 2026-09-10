"use client";

import Link from "next/link";
import { useState } from "react";
import { SITES, type SiteKey } from "@/lib/sites";

/**
 * 데모 사이트 하단에 고정되는 안내 바.
 * 방문자가 실제 업체 사이트로 오해하지 않게 하고, 3개 데모를 바로
 * 넘나들 수 있게 한다.
 */
export default function DemoBar({ current }: { current: SiteKey }) {
  const [hidden, setHidden] = useState(false);
  if (hidden) return null;

  return (
    <div
      data-demobar
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#0b0d14]/95 text-white backdrop-blur"
    >
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2.5 sm:px-8">
        <Link
          href="/"
          className="hidden shrink-0 items-center gap-1.5 text-xs font-semibold text-white/70 transition-colors hover:text-white sm:flex"
        >
          <svg viewBox="0 0 16 16" className="h-3 w-3" aria-hidden>
            <path
              d="M10 3 5 8l5 5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          목록
        </Link>

        <span className="hidden h-4 w-px bg-white/15 sm:block" />

        <span className="shrink-0 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold tracking-wide">
          데모
        </span>

        <div className="flex min-w-0 flex-1 gap-1.5 overflow-x-auto">
          {SITES.map((s) => (
            <Link
              key={s.key}
              href={`/${s.key}`}
              aria-current={s.key === current ? "page" : undefined}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                s.key === current
                  ? "bg-white text-[#0b0d14]"
                  : "text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              {s.brand}
            </Link>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setHidden(true)}
          aria-label="안내 바 닫기"
          className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white"
        >
          <svg viewBox="0 0 14 14" className="h-3 w-3" aria-hidden>
            <path
              d="M2 2l10 10M12 2L2 12"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
