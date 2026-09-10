import Link from "next/link";
import Accordion from "@/components/ui/Accordion";
import Art from "@/components/ui/Art";
import MapBlock from "@/components/ui/MapBlock";
import Reveal from "@/components/ui/Reveal";
import { Container, Section, SectionHead } from "@/components/ui/Section";
import {
  CLINIC_FAQ,
  DEPARTMENTS,
  DOCTORS,
  HOURS,
  NON_COVERED,
  STEPS,
} from "@/lib/clinic-data";

export default function ClinicHome() {
  return (
    <main>
      {/* 히어로 — 예약과 전화가 첫 화면에서 눌려야 한다 */}
      <section className="relative overflow-hidden bg-surface-2">
        {/* 격자는 SVG viewBox 로 그리면 컨테이너 폭에 따라 같이 확대돼
            격자로 안 보인다. 배경 그라디언트로 32px 간격을 고정한다. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-line) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            maskImage:
              "radial-gradient(75% 65% at 70% 40%, #000 0%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(75% 65% at 70% 40%, #000 0%, transparent 75%)",
          }}
        />
        <Container className="relative py-20 sm:py-28">
          <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-xs font-semibold text-brand">
                정형외과 · 재활의학과 전문의 진료
              </p>
              <h1 className="mt-6 text-4xl leading-[1.2] font-bold tracking-tight sm:text-5xl">
                통증의 원인부터
                <br />
                찾습니다
              </h1>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
                같은 무릎 통증도 연골, 인대, 관절염이 원인이면 치료가 달라집니다.
                문진과 검사로 먼저 나눈 뒤 필요한 치료를 안내합니다.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="/clinic/reserve"
                  className="rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-brand-ink transition-transform hover:-translate-y-0.5"
                >
                  온라인 예약
                </Link>
                <a
                  href="tel:0200000000"
                  className="rounded-full border border-line bg-surface px-7 py-3.5 text-sm font-semibold transition-colors hover:bg-surface-2"
                >
                  02-000-0000
                </a>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div className="rounded-2xl border border-line bg-surface p-7 shadow-sm sm:p-8">
                <h2 className="text-sm font-bold tracking-wide text-brand">
                  진료시간
                </h2>
                <dl className="mt-5 divide-y divide-line">
                  {HOURS.map((h) => (
                    <div
                      key={h.day}
                      className="flex items-baseline justify-between gap-4 py-3"
                    >
                      <dt className="text-sm text-muted">{h.day}</dt>
                      <dd
                        className={`text-sm font-semibold tabular-nums ${
                          h.time === "휴진" ? "text-muted" : ""
                        }`}
                      >
                        {h.time}
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-5 rounded-xl bg-surface-2 p-4 text-xs leading-relaxed text-muted">
                  접수는 진료 종료 30분 전까지 받습니다. 토요일 오전은 대기가
                  길어 예약을 권합니다.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 진료과목 — 증상으로 찾게 한다 */}
      <Section id="departments">
        <Container>
          <SectionHead
            eyebrow="진료과목"
            title="어디가 어떻게 아프신가요"
            lead="병명보다 증상으로 찾는 편이 빠릅니다."
          />
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {DEPARTMENTS.map((d, i) => (
              <Reveal as="li" key={d.slug} delay={(i % 3) * 100}>
                <article className="flex h-full flex-col rounded-2xl border border-line bg-surface p-7 transition-colors hover:border-brand">
                  <h3 className="text-lg font-bold">{d.name}</h3>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">
                    {d.body}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-1.5 border-t border-line pt-5">
                    {d.symptoms.map((s) => (
                      <li
                        key={s}
                        className="rounded-full bg-surface-2 px-2.5 py-1 text-xs font-medium text-muted"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 진료 절차 */}
      <Section tone="surface-2">
        <Container>
          <SectionHead
            eyebrow="진료 절차"
            title="처음 오시면 이렇게 진행합니다"
          />
          <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 100}>
                <div className="relative h-full rounded-2xl border border-line bg-surface p-7">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-brand text-sm font-bold text-brand-ink">
                    {i + 1}
                  </span>
                  <h3 className="mt-4 font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* 의료진 */}
      <Section id="doctors">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead eyebrow="의료진" title="진료하는 의사" />
            <Reveal>
              <Link
                href="/clinic/doctors"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand"
              >
                약력 자세히 보기
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden>
                  <path
                    d="M3 8h9M8 4l4 4-4 4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </Reveal>
          </div>

          <ul className="mt-14 grid gap-6 sm:grid-cols-3">
            {DOCTORS.map((d, i) => (
              <Reveal as="li" key={d.name} delay={i * 100}>
                <article className="overflow-hidden rounded-2xl border border-line bg-surface">
                  <Art variant="pulse" className="h-32" />
                  <div className="p-6">
                    <h3 className="text-lg font-bold">{d.name}</h3>
                    <p className="mt-1 text-sm text-brand">{d.role}</p>
                    <p className="mt-3 text-sm text-muted">
                      주 진료 · {d.field}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 비급여 진료비 — 게시 의무 항목 */}
      <Section id="non-covered" tone="surface-2">
        <Container>
          <SectionHead
            eyebrow="비급여 안내"
            title="비급여 진료비용"
            lead="의료법에 따라 주요 비급여 항목의 비용을 안내합니다."
          />
          <Reveal className="mt-12 overflow-hidden rounded-2xl border border-line bg-surface">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[26rem] text-sm">
                <caption className="sr-only">비급여 진료비용 안내</caption>
                <thead className="bg-surface-2 text-left">
                  <tr>
                    <th scope="col" className="px-6 py-4 font-semibold">
                      항목
                    </th>
                    <th scope="col" className="px-6 py-4 text-right font-semibold">
                      비용
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {NON_COVERED.map((n) => (
                    <tr key={n.item}>
                      <td className="px-6 py-4">{n.item}</td>
                      <td className="px-6 py-4 text-right font-semibold tabular-nums">
                        {n.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-5 text-xs leading-relaxed text-muted">
              환자 상태와 치료 범위에 따라 실제 비용은 달라질 수 있습니다.
              데모용 예시 금액이며, 실제 게시 금액은 의료기관이 직접 확정해야
              합니다.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* 진료시간 · 오시는 길 */}
      <Section id="visit">
        <Container>
          <SectionHead eyebrow="오시는 길" title="찾아오시는 방법" />
          <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            <Reveal>
              <MapBlock
                address="서울 강남구 테헤란로 000, 5층"
                hint="2호선 역삼역 3번 출구에서 도보 5분. 건물 지하 주차장 이용 가능(진료 시 2시간 무료)."
              />
            </Reveal>
            <Reveal delay={120} id="hours" className="scroll-mt-24">
              <dl className="divide-y divide-line border-y border-line">
                {HOURS.map((h) => (
                  <div key={h.day} className="flex justify-between gap-4 py-4">
                    <dt className="text-sm text-muted">{h.day}</dt>
                    <dd className="text-sm font-semibold tabular-nums">
                      {h.time}
                    </dd>
                  </div>
                ))}
              </dl>
              <Link
                href="/clinic/reserve"
                className="mt-8 block rounded-full bg-brand py-3.5 text-center text-sm font-semibold text-brand-ink"
              >
                온라인 예약하기
              </Link>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="surface-2">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionHead eyebrow="FAQ" title="자주 묻는 질문" />
            <Reveal>
              <Accordion items={CLINIC_FAQ} />
            </Reveal>
          </div>
        </Container>
      </Section>
    </main>
  );
}
