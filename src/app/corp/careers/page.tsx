"use client";

import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { Container, Section, SectionHead } from "@/components/ui/Section";
import { useLang } from "../LangContext";

export default function CareersPage() {
  const { t } = useLang();

  return (
    <main>
      <Section tone="surface-2" className="pt-14 pb-16 sm:pt-20">
        <Container>
          <SectionHead
            eyebrow={t.careers.eyebrow}
            title={t.careers.title}
            lead={t.careers.lead}
          />
        </Container>
      </Section>

      <Section className="pt-16">
        <Container>
          <SectionHead title={t.careers.valuesTitle} />
          <ul className="mt-10 grid gap-6 sm:grid-cols-3">
            {t.careers.values.map((v, i) => (
              <Reveal as="li" key={v.title} delay={i * 100}>
                <div className="h-full rounded-2xl border border-line bg-surface-2 p-7">
                  <h3 className="font-bold">{v.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">
                    {v.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="surface-2">
        <Container>
          <SectionHead title={t.careers.openTitle} />
          <ul className="mt-10 space-y-4">
            {t.careers.positions.map((p, i) => (
              <Reveal as="li" key={p.role} delay={i * 80}>
                <article className="flex flex-wrap items-center gap-x-6 gap-y-4 rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-brand sm:p-7">
                  <div className="min-w-[16rem] flex-1">
                    <h3 className="text-lg font-bold">{p.role}</h3>
                    <p className="mt-1 text-sm text-muted">
                      {p.type} · {p.place}
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {p.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full bg-surface-2 px-2.5 py-1 text-xs font-medium text-muted"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    href="/corp/contact"
                    className="rounded-full border border-line px-6 py-3 text-sm font-semibold transition-colors hover:bg-surface-2"
                  >
                    {t.careers.apply}
                  </Link>
                </article>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHead title={t.careers.perksTitle} />
          <Reveal className="mt-10 flex flex-wrap gap-3">
            {t.careers.perks.map((p) => (
              <span
                key={p}
                className="rounded-full border border-line bg-surface-2 px-5 py-3 text-sm font-medium"
              >
                {p}
              </span>
            ))}
          </Reveal>
        </Container>
      </Section>
    </main>
  );
}
