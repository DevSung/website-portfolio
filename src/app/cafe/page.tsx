import Link from "next/link";
import Accordion from "@/components/ui/Accordion";
import Art from "@/components/ui/Art";
import MapBlock from "@/components/ui/MapBlock";
import Reveal from "@/components/ui/Reveal";
import { Container, Section, SectionHead } from "@/components/ui/Section";
import { CLASSES, FAQ, MENU, won } from "@/lib/cafe-data";

const STORY = [
  {
    title: "재단부터 마감까지",
    body: "가죽 고르는 것부터 끝손질까지 직접 하십니다. 완성품을 사가는 게 아니라 만드는 시간을 사가는 곳입니다.",
  },
  {
    title: "정원 4–8명",
    body: "손이 닿는 만큼만 받습니다. 처음이라 손이 느려도 옆에서 같이 잡아드릴 수 있는 인원입니다.",
  },
  {
    title: "커피는 곁들임이 아니라 본업",
    body: "직접 볶은 원두로 내립니다. 클래스 없이 커피만 마시러 오셔도 됩니다.",
  },
];

export default function CafeHome() {
  return (
    <main>
      {/* 히어로 */}
      <section className="relative">
        <div className="grid items-stretch lg:min-h-[82vh] lg:grid-cols-[1.05fr_1fr]">
          <div className="order-2 flex items-center bg-surface px-5 py-16 sm:px-8 lg:order-1 lg:py-24 lg:pl-[max(2rem,calc((100vw-72rem)/2))]">
            <Reveal className="max-w-xl">
              <p className="text-xs font-semibold tracking-[0.22em] text-accent">
                LEATHER · COFFEE
              </p>
              <h1 className="mt-6 font-[family-name:var(--font-serif-kr)] text-4xl leading-[1.25] font-bold sm:text-5xl lg:text-[3.4rem]">
                손으로 만드는
                <br />
                하루의 결
              </h1>
              <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
                연남동 골목의 작은 가죽공방입니다. 세 시간이면 반지갑 한 점이
                손에 남습니다. 커피는 직접 볶아 내립니다.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="/cafe/classes"
                  className="rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-brand-ink transition-transform hover:-translate-y-0.5"
                >
                  클래스 일정 보기
                </Link>
                <a
                  href="#visit"
                  className="rounded-full border border-line px-7 py-3.5 text-sm font-semibold transition-colors hover:bg-surface-2"
                >
                  오시는 길
                </a>
              </div>

              <dl className="mt-12 grid max-w-md grid-cols-3 gap-4 border-t border-line pt-8">
                {[
                  ["운영", "5년"],
                  ["누적 수강", "2,400명"],
                  ["재방문율", "38%"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-xs text-muted">{k}</dt>
                    <dd className="mt-1 font-[family-name:var(--font-serif-kr)] text-xl font-bold">
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <div className="grain relative order-1 min-h-[46vh] lg:order-2 lg:min-h-full">
            <Art variant="blob" className="absolute inset-0 h-full w-full" />
          </div>
        </div>
      </section>

      {/* 소개 */}
      <Section id="story" tone="surface-2">
        <Container>
          <SectionHead
            display
            eyebrow="About"
            title="오래 쓸 물건을 직접 만드는 자리"
            lead="공방 수업 다섯 해, 손에 익은 순서대로 알려드립니다."
          />
          <ul className="mt-14 grid gap-8 sm:grid-cols-3">
            {STORY.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 110}>
                <span className="font-[family-name:var(--font-serif-kr)] text-3xl font-bold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  {s.body}
                </p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 클래스 */}
      <Section id="classes">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead
              display
              eyebrow="Class"
              title="원데이 클래스"
              lead="잔여석은 실시간으로 반영됩니다."
            />
            <Reveal>
              <Link
                href="/cafe/classes"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand"
              >
                전체 일정
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

          <ul className="mt-14 grid gap-6 md:grid-cols-3">
            {CLASSES.map((c, i) => {
              const left = c.capacity - c.taken;
              const soldOut = left <= 0;
              return (
                <Reveal as="li" key={c.slug} delay={i * 110}>
                  <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface">
                    <Art variant={i === 1 ? "steam" : "stitch"} className="h-44" />
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-surface-2 px-2.5 py-1 text-xs font-medium text-muted">
                          {c.level}
                        </span>
                        <span className="rounded-full bg-surface-2 px-2.5 py-1 text-xs font-medium text-muted">
                          {c.duration}
                        </span>
                      </div>
                      <h3 className="mt-4 font-[family-name:var(--font-serif-kr)] text-xl font-bold">
                        {c.name}
                      </h3>
                      <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">
                        {c.summary}
                      </p>
                      <div className="mt-6 flex items-end justify-between border-t border-line pt-5">
                        <p className="text-lg font-bold">{won(c.price)}</p>
                        <p
                          className={`text-sm font-semibold ${
                            soldOut ? "text-muted" : "text-accent"
                          }`}
                        >
                          {soldOut ? "마감" : `잔여 ${left}석`}
                        </p>
                      </div>
                      <Link
                        href={soldOut ? "/cafe/classes" : "/cafe/contact"}
                        className={`mt-5 block rounded-full py-3 text-center text-sm font-semibold transition-colors ${
                          soldOut
                            ? "border border-line text-muted hover:bg-surface-2"
                            : "bg-brand text-brand-ink"
                        }`}
                      >
                        {soldOut ? "다른 일정 보기" : "예약하기"}
                      </Link>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </ul>
        </Container>
      </Section>

      {/* 메뉴 */}
      <Section id="menu" tone="surface-2">
        <Container>
          <SectionHead display eyebrow="Menu" title="커피와 디저트" />
          <div className="mt-14 grid gap-12 sm:grid-cols-3">
            {MENU.map((g, i) => (
              <Reveal key={g.group} delay={i * 110}>
                <h3 className="border-b border-line pb-3 text-sm font-bold tracking-wide text-accent">
                  {g.group}
                </h3>
                <ul className="mt-5 space-y-5">
                  {g.items.map((m) => (
                    <li key={m.name} className="flex gap-4">
                      <div className="flex-1">
                        <p className="font-semibold">{m.name}</p>
                        <p className="mt-0.5 text-xs text-muted">{m.note}</p>
                      </div>
                      <p className="text-sm font-medium tabular-nums">
                        {m.price.toLocaleString("ko-KR")}
                      </p>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* 갤러리 */}
      <Section id="gallery">
        <Container>
          <SectionHead
            display
            eyebrow="Gallery"
            title="공방의 기록"
            lead="실제 납품에서는 이 자리에 촬영본이 들어갑니다."
          />
          <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            {(
              [
                ["stitch", "aspect-[4/5]"],
                ["blob", "aspect-[4/5] sm:aspect-auto sm:row-span-2"],
                ["steam", "aspect-[4/5]"],
                ["blob", "aspect-square"],
                ["stitch", "aspect-square"],
              ] as const
            ).map(([v, cls], i) => (
              <Reveal key={i} delay={i * 70} className={cls}>
                <Art
                  variant={v}
                  className="h-full w-full rounded-xl border border-line"
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* 오시는 길 */}
      <Section id="visit" tone="surface-2">
        <Container>
          <SectionHead display eyebrow="Visit" title="오시는 길" />
          <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            <Reveal>
              <MapBlock
                address="서울 마포구 연남로 00길 12, 1층"
                hint="경의선숲길 출구에서 도보 4분. 파란 간판 옆 골목으로 들어오세요."
              />
            </Reveal>
            <Reveal delay={120}>
              <dl className="divide-y divide-line border-y border-line">
                {[
                  ["영업시간", "화–일 11:00 – 21:00"],
                  ["휴무", "매주 월요일, 명절 연휴"],
                  ["전화", "02-000-0000"],
                  ["주차", "도보 3분 공영주차장 (2시간 무료 정산)"],
                ].map(([k, v]) => (
                  <div key={k} className="flex gap-5 py-4">
                    <dt className="w-20 shrink-0 text-sm text-muted">{k}</dt>
                    <dd className="text-sm leading-relaxed font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
              <Link
                href="/cafe/contact"
                className="mt-8 block rounded-full bg-brand py-3.5 text-center text-sm font-semibold text-brand-ink"
              >
                예약·문의하기
              </Link>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section id="faq">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionHead display eyebrow="FAQ" title="자주 묻는 질문" />
            <Reveal>
              <Accordion items={FAQ} />
            </Reveal>
          </div>
        </Container>
      </Section>
    </main>
  );
}
