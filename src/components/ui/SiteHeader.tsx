"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export type NavItem = { label: string; href: string };

type Props = {
  brand: string;
  home: string;
  nav: NavItem[];
  cta?: NavItem;
  /** 제목용 명조 적용 (카페·공방) */
  display?: boolean;
  /** 우측에 끼워 넣을 요소 — 기업 사이트의 언어 전환 등 */
  extra?: React.ReactNode;
};

export default function SiteHeader({
  brand,
  home,
  nav,
  cta,
  display = false,
  extra,
}: Props) {
  const [condensed, setCondensed] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 모바일 메뉴가 열린 동안 배경 스크롤을 막는다.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        condensed
          ? "border-line bg-surface/85 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-6 px-5 sm:h-18 sm:px-8">
        <Link
          href={home}
          onClick={() => setOpen(false)}
          className={`shrink-0 text-lg font-bold tracking-tight ${
            display ? "font-[family-name:var(--font-serif-kr)] text-xl" : ""
          }`}
        >
          {brand}
        </Link>

        <nav className="ml-auto hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          {extra}
          {cta && (
            <Link
              href={cta.href}
              className="hidden rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-brand-ink transition-transform hover:-translate-y-0.5 sm:inline-block"
            >
              {cta.label}
            </Link>
          )}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="site-mobile-nav"
            aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
            className="grid h-10 w-10 place-items-center rounded-lg border border-line md:hidden"
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 block h-0.5 w-5 bg-ink transition-all duration-300 ${
                  open ? "top-1/2 rotate-45" : "top-0.5"
                }`}
              />
              <span
                className={`absolute top-1/2 left-0 block h-0.5 w-5 -translate-y-1/2 bg-ink transition-opacity duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-5 bg-ink transition-all duration-300 ${
                  open ? "top-1/2 -rotate-45" : "bottom-0.5"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* 모바일 메뉴 — 화면 밖에 두고 translate로 밀어 넣는다 */}
      <div
        id="site-mobile-nav"
        hidden={!open}
        className="border-t border-line bg-surface md:hidden"
      >
        <ul className="mx-auto max-w-6xl px-5 py-3">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="block border-b border-line py-3.5 text-base font-medium last:border-0"
              >
                {item.label}
              </Link>
            </li>
          ))}
          {cta && (
            <li className="pt-4 pb-2">
              <Link
                href={cta.href}
                onClick={() => setOpen(false)}
                className="block rounded-full bg-brand py-3.5 text-center text-base font-semibold text-brand-ink"
              >
                {cta.label}
              </Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
}
