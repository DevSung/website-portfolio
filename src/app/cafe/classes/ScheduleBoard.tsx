"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CLASSES, won } from "@/lib/cafe-data";

const SLOTS = ["11:00", "14:00", "17:00"] as const;
const DAYS = ["일", "월", "화", "수", "목", "금", "토"] as const;

/** 날짜·슬롯에서 잔여석을 만들어내는 결정적 함수.
 *  데모에 DB가 없으니 새로고침마다 숫자가 흔들리지 않게 고정 규칙을 쓴다. */
function seatsLeft(dayIndex: number, slot: number, capacity: number) {
  const h = (dayIndex * 31 + slot * 17 + capacity * 7) % 11;
  return Math.max(0, Math.min(capacity, h - 2));
}

function buildDays() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    return d;
  });
}

export default function ScheduleBoard() {
  // 렌더 시점의 오늘부터 2주. 빌드 시각에 박히면 안 되므로 클라이언트에서 만든다.
  const days = useMemo(() => buildDays(), []);
  const [dayIdx, setDayIdx] = useState(0);
  const [classSlug, setClassSlug] = useState(CLASSES[0].slug);

  const selectedDay = days[dayIdx];
  const selectedClass = CLASSES.find((c) => c.slug === classSlug)!;
  const closed = selectedDay.getDay() === 1; // 월요일 휴무

  return (
    <div>
      {/* 클래스 선택 */}
      <div
        role="tablist"
        aria-label="클래스 선택"
        className="flex flex-wrap gap-2"
      >
        {CLASSES.map((c) => (
          <button
            key={c.slug}
            role="tab"
            aria-selected={c.slug === classSlug}
            onClick={() => setClassSlug(c.slug)}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
              c.slug === classSlug
                ? "bg-brand text-brand-ink"
                : "border border-line text-muted hover:bg-surface-2"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* 날짜 선택 — 모바일에서는 가로 스크롤 */}
      <div className="mt-8 -mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
        <div className="flex gap-2 pb-2">
          {days.map((d, i) => {
            const isClosed = d.getDay() === 1;
            const active = i === dayIdx;
            return (
              <button
                key={i}
                onClick={() => setDayIdx(i)}
                aria-pressed={active}
                className={`w-16 shrink-0 rounded-xl border py-3 text-center transition-colors ${
                  active
                    ? "border-brand bg-brand text-brand-ink"
                    : isClosed
                      ? "border-line bg-surface-2 text-muted/60"
                      : "border-line hover:bg-surface-2"
                }`}
              >
                <span className="block text-[11px]">
                  {DAYS[d.getDay()]}
                </span>
                <span className="mt-0.5 block text-base font-bold tabular-nums">
                  {d.getDate()}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 시간대 */}
      <div className="mt-10 rounded-2xl border border-line bg-surface-2 p-6 sm:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h3 className="font-[family-name:var(--font-serif-kr)] text-xl font-bold">
            {selectedDay.getMonth() + 1}월 {selectedDay.getDate()}일 (
            {DAYS[selectedDay.getDay()]}) · {selectedClass.name}
          </h3>
          <p className="text-sm text-muted">
            {selectedClass.duration} · {won(selectedClass.price)}
          </p>
        </div>

        {closed ? (
          <p className="mt-8 rounded-xl border border-line bg-surface py-10 text-center text-sm text-muted">
            매주 월요일은 휴무입니다. 다른 날짜를 선택해 주세요.
          </p>
        ) : (
          <ul className="mt-7 grid gap-3 sm:grid-cols-3">
            {SLOTS.map((slot, si) => {
              const left = seatsLeft(dayIdx, si, selectedClass.capacity);
              const soldOut = left === 0;
              return (
                <li key={slot}>
                  <div
                    className={`rounded-xl border bg-surface p-5 ${
                      soldOut ? "border-line opacity-60" : "border-line"
                    }`}
                  >
                    <p className="text-lg font-bold tabular-nums">{slot}</p>
                    <p
                      className={`mt-1 text-sm font-semibold ${
                        soldOut ? "text-muted" : "text-accent"
                      }`}
                    >
                      {soldOut ? "마감" : `잔여 ${left}석`}
                    </p>
                    <Link
                      href="/cafe/contact"
                      aria-disabled={soldOut}
                      tabIndex={soldOut ? -1 : undefined}
                      className={`mt-4 block rounded-full py-2.5 text-center text-sm font-semibold ${
                        soldOut
                          ? "pointer-events-none border border-line text-muted"
                          : "bg-brand text-brand-ink"
                      }`}
                    >
                      {soldOut ? "예약 마감" : "예약"}
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
