"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
} from "react";
import { DICT, type Lang } from "@/lib/corp-data";

const KEY = "hyperlane-lang";

/* ---------------------------------------------------------------
   언어 선택은 localStorage 에 있는 외부 상태다.
   이펙트로 읽어 setState 하면 첫 렌더 직후 한 번 더 렌더되고,
   다른 탭에서 바꾼 값도 따라오지 않는다. useSyncExternalStore 로
   붙이면 서버 렌더는 기본값, 하이드레이션 후 저장값으로 한 번에
   맞춰지고 탭 간 동기화도 공짜로 얻는다.
   --------------------------------------------------------------- */

const listeners = new Set<() => void>();
let snapshot: Lang | null = null;

function read(): Lang {
  if (snapshot) return snapshot;
  try {
    snapshot = localStorage.getItem(KEY) === "en" ? "en" : "ko";
  } catch {
    // 사파리 프라이빗 모드 등에서는 접근 자체가 던진다.
    snapshot = "ko";
  }
  return snapshot;
}

function write(next: Lang) {
  snapshot = next;
  try {
    localStorage.setItem(KEY, next);
  } catch {
    /* 저장 실패는 무시 — 이번 세션에만 적용된다 */
  }
  listeners.forEach((fn) => fn());
}

function subscribe(fn: () => void) {
  listeners.add(fn);
  const onStorage = (e: StorageEvent) => {
    if (e.key !== KEY) return;
    snapshot = e.newValue === "en" ? "en" : "ko";
    fn();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(fn);
    window.removeEventListener("storage", onStorage);
  };
}

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "ko",
  setLang: () => {},
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const lang = useSyncExternalStore(subscribe, read, () => "ko" as Lang);
  const setLang = useCallback((l: Lang) => write(l), []);

  // 스크린리더가 읽는 언어도 같이 바꿔준다.
  useEffect(() => {
    document.documentElement.lang = lang;
    return () => {
      document.documentElement.lang = "ko";
    };
  }, [lang]);

  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>;
}

export function useLang() {
  const { lang, setLang } = useContext(Ctx);
  return { lang, setLang, t: DICT[lang] };
}

export function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div
      className="flex items-center rounded-full border border-line p-0.5"
      role="group"
      aria-label="언어 선택 / Language"
    >
      {(["ko", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase transition-colors ${
            lang === l ? "bg-brand text-brand-ink" : "text-muted hover:text-ink"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
