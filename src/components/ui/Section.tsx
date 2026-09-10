import type { ReactNode } from "react";
import Reveal from "./Reveal";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Section({
  id,
  children,
  className = "",
  tone = "surface",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: "surface" | "surface-2" | "brand";
}) {
  const tones = {
    surface: "bg-surface text-ink",
    "surface-2": "bg-surface-2 text-ink",
    brand: "bg-brand text-brand-ink",
  } as const;

  return (
    <section
      id={id}
      className={`scroll-mt-20 py-20 sm:py-28 ${tones[tone]} ${className}`}
    >
      {children}
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lead,
  align = "left",
  display = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  /** 명조 계열 제목 (카페·공방) */
  display?: boolean;
}) {
  return (
    <Reveal
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {eyebrow && (
        <p className="mb-3 text-xs font-medium tracking-[0.18em] text-accent uppercase">
          {eyebrow}
        </p>
      )}
      <h2
        className={`text-3xl leading-tight font-bold sm:text-4xl ${
          display ? "font-[family-name:var(--font-serif-kr)]" : ""
        }`}
      >
        {title}
      </h2>
      {lead && (
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
          {lead}
        </p>
      )}
    </Reveal>
  );
}
