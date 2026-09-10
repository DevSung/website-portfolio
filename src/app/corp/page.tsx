"use client";

import Link from "next/link";
import Art from "@/components/ui/Art";
import Counter from "@/components/ui/Counter";
import Reveal from "@/components/ui/Reveal";
import { Container, Section, SectionHead } from "@/components/ui/Section";
import { useLang } from "./LangContext";

export default function CorpHome() {
  const { t } = useLang();

  return (
    <main>
      {/* 히어로 */}
      <section className="relative overflow-hidden border-b border-line">
        <Art variant="mesh" className="absolute inset-0 h-full w-full" />
        <Container className="relative py-24 sm:py-32">
          <Reveal className="max-w-3xl">
            <p className="inline-flex rounded-full border border-line bg-surface-2/70 px-4 py-2 text-xs font-semibold text-accent backdrop-blur">
              {t.hero.badge}
            </p>
            <h1 className="mt-7 text-4xl leading-[1.15] font-bold tracking-tight sm:text-6xl">
              {t.hero.title[0]}
              <br />
              {t.hero.title[1]}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {t.hero.lead}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/corp/contact"
                className="rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-brand-ink transition-transform hover:-translate-y-0.5"
              >
                {t.hero.primary}
              </Link>
              <a
                href="#product"
                className="rounded-full border border-line px-7 py-3.5 text-sm font-semibold transition-colors hover:bg-surface-2"
              >
                {t.hero.secondary}
              </a>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 고객사 마키 */}
      <section className="overflow-hidden border-b border-line bg-surface-2 py-10">
        <p className="mb-6 text-center text-xs font-semibold tracking-[0.18em] text-muted uppercase">
          {t.clients.title}
        </p>
        <div className="marquee-mask relative flex overflow-hidden">
          {/* 같은 목록을 두 번 이어 붙이고 -50% 이동시키면 끊김 없이 돈다 */}
          <ul className="marquee-track flex shrink-0 items-center gap-14 pr-14">
            {[...t.clients.names, ...t.clients.names].map((n, i) => (
              <li
                key={i}
                className="font-[family-name:var(--font-latin)] text-lg font-bold whitespace-nowrap text-muted/60"
              >
                {n}
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-6 text-center text-[11px] text-muted/70">
          {t.clients.note}
        </p>
      </section>

      {/* 문제 */}
      <Section>
        <Container>
          <SectionHead eyebrow={t.problem.eyebrow} title={t.problem.title} />
          <ul className="mt-14 grid gap-6 sm:grid-cols-3">
            {t.problem.items.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 100}>
                <div className="h-full rounded-2xl border border-line bg-surface-2 p-7">
                  <h3 className="font-bold">{p.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 제품 */}
      <Section id="product" tone="surface-2">
        <Container>
          <SectionHead eyebrow={t.product.eyebrow} title={t.product.title} />
          <ul className="mt-14 grid gap-6 sm:grid-cols-2">
            {t.product.items.map((p, i) => (
              <Reveal as="li" key={p.title} delay={(i % 2) * 110}>
                <article className="flex h-full gap-5 rounded-2xl border border-line bg-surface p-7">
                  <span className="font-[family-name:var(--font-latin)] text-sm font-bold text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {p.body}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 지표 */}
      <Section id="metrics">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <SectionHead
                eyebrow={t.metrics.eyebrow}
                title={t.metrics.title}
              />
              <Reveal delay={80}>
                <p className="mt-6 max-w-sm text-xs leading-relaxed text-muted">
                  {t.metrics.note}
                </p>
              </Reveal>
            </div>

            <Reveal delay={120}>
              <Art
                variant="chart"
                className="h-48 rounded-2xl border border-line sm:h-56"
              />
              <dl className="mt-6 grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4">
                {t.metrics.items.map((m) => (
                  <div key={m.label}>
                    <dd className="font-[family-name:var(--font-latin)] text-3xl font-bold text-brand">
                      <Counter to={m.value} suffix={m.suffix} />
                    </dd>
                    <dt className="mt-1.5 text-xs leading-relaxed text-muted">
                      {m.label}
                    </dt>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* 도입 절차 */}
      <Section id="process" tone="surface-2">
        <Container>
          <SectionHead eyebrow={t.process.eyebrow} title={t.process.title} />
          <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.process.items.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 100}>
                <div className="h-full rounded-2xl border border-line bg-surface p-7">
                  <p className="font-[family-name:var(--font-latin)] text-xs font-bold tracking-wide text-accent uppercase">
                    {s.week}
                  </p>
                  <h3 className="mt-3 font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* CTA */}
      <Section>
        <Container>
          <Reveal className="relative overflow-hidden rounded-3xl border border-line p-10 sm:p-16">
            <Art variant="mesh" className="absolute inset-0 h-full w-full" />
            <div className="relative max-w-xl">
              <h2 className="text-2xl font-bold sm:text-3xl">{t.cta.title}</h2>
              <p className="mt-4 text-base leading-relaxed text-muted">
                {t.cta.body}
              </p>
              <Link
                href="/corp/contact"
                className="mt-8 inline-block rounded-full bg-brand px-8 py-4 text-sm font-semibold text-brand-ink transition-transform hover:-translate-y-0.5"
              >
                {t.cta.button}
              </Link>
            </div>
          </Reveal>
        </Container>
      </Section>
    </main>
  );
}
