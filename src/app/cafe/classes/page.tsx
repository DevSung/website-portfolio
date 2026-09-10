import type { Metadata } from "next";
import Art from "@/components/ui/Art";
import Reveal from "@/components/ui/Reveal";
import { Container, Section, SectionHead } from "@/components/ui/Section";
import { CLASSES, won } from "@/lib/cafe-data";
import ScheduleBoard from "./ScheduleBoard";

export const metadata: Metadata = {
  title: "클래스 일정",
  description: "라온공방 원데이 클래스 일정과 잔여석 안내.",
};

export default function ClassesPage() {
  return (
    <main>
      <Section tone="surface-2" className="pt-14 pb-16 sm:pt-20">
        <Container>
          <SectionHead
            display
            eyebrow="Class"
            title="원데이 클래스 일정"
            lead="원하는 클래스와 날짜를 고르시면 남은 자리를 보여드립니다."
          />
        </Container>
      </Section>

      <Section className="pt-16">
        <Container>
          <ScheduleBoard />
        </Container>
      </Section>

      <Section tone="surface-2">
        <Container>
          <SectionHead display eyebrow="Detail" title="클래스별 안내" />
          <ul className="mt-12 space-y-6">
            {CLASSES.map((c, i) => (
              <Reveal as="li" key={c.slug} delay={i * 90}>
                <article className="grid overflow-hidden rounded-2xl border border-line bg-surface sm:grid-cols-[240px_1fr]">
                  <Art
                    variant={i === 1 ? "steam" : "stitch"}
                    className="h-40 sm:h-full"
                  />
                  <div className="p-6 sm:p-8">
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                      <h3 className="font-[family-name:var(--font-serif-kr)] text-2xl font-bold">
                        {c.name}
                      </h3>
                      <span className="rounded-full bg-surface-2 px-2.5 py-1 text-xs font-medium text-muted">
                        {c.level} · 정원 {c.capacity}명
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                      {c.summary}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-x-10 gap-y-4 border-t border-line pt-5">
                      <div>
                        <p className="text-xs text-muted">소요 시간</p>
                        <p className="mt-1 font-semibold">{c.duration}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted">수강료</p>
                        <p className="mt-1 font-semibold">{won(c.price)}</p>
                      </div>
                      <div className="min-w-[14rem] flex-1">
                        <p className="text-xs text-muted">포함 사항</p>
                        <p className="mt-1 text-sm leading-relaxed font-medium">
                          {c.includes.join(" · ")}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>
    </main>
  );
}
