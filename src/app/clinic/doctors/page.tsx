import type { Metadata } from "next";
import Link from "next/link";
import Art from "@/components/ui/Art";
import Reveal from "@/components/ui/Reveal";
import { Container, Section, SectionHead } from "@/components/ui/Section";
import { DOCTORS } from "@/lib/clinic-data";

export const metadata: Metadata = {
  title: "의료진 소개",
  description: "바른솔 정형외과의원 의료진 약력 안내.",
};

export default function DoctorsPage() {
  return (
    <main>
      <Section tone="surface-2" className="pt-14 pb-16 sm:pt-20">
        <Container>
          <SectionHead
            eyebrow="의료진"
            title="진료하는 의사"
            lead="주 진료 분야와 약력을 안내합니다."
          />
        </Container>
      </Section>

      <Section className="pt-16">
        <Container>
          <ul className="space-y-8">
            {DOCTORS.map((d, i) => (
              <Reveal as="li" key={d.name} delay={i * 90}>
                <article className="grid overflow-hidden rounded-2xl border border-line bg-surface sm:grid-cols-[260px_1fr]">
                  <Art variant="pulse" className="h-40 sm:h-full" />
                  <div className="p-7 sm:p-9">
                    <h2 className="text-2xl font-bold">{d.name}</h2>
                    <p className="mt-1.5 text-sm font-semibold text-brand">
                      {d.role}
                    </p>
                    <p className="mt-4 inline-block rounded-full bg-surface-2 px-3 py-1.5 text-sm font-medium text-muted">
                      주 진료 · {d.field}
                    </p>
                    <ul className="mt-6 space-y-2 border-t border-line pt-6">
                      {d.career.map((c) => (
                        <li
                          key={c}
                          className="flex gap-2.5 text-sm leading-relaxed text-muted"
                        >
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-12 rounded-2xl border border-line bg-surface-2 p-7">
            <p className="text-sm leading-relaxed text-muted">
              위 의료진 정보는 데모용 가상 인물입니다. 실제 의료기관 웹사이트에
              약력을 게시할 때는 의료법 제56조에 따라 사실과 다른 내용이나
              객관적으로 인정되지 않는 내용을 넣을 수 없으며, 사전심의 대상
              여부를 확인해야 합니다. 전문가 확인을 권장합니다.
            </p>
          </Reveal>

          <Reveal delay={100} className="mt-10">
            <Link
              href="/clinic/reserve"
              className="inline-block rounded-full bg-brand px-8 py-4 text-sm font-semibold text-brand-ink"
            >
              진료 예약하기
            </Link>
          </Reveal>
        </Container>
      </Section>
    </main>
  );
}
