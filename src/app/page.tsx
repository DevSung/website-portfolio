import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Section";
import { SITES } from "@/lib/sites";

const SCOPE = [
  {
    title: "기획 · 구조 설계",
    body: "업종별로 방문자가 찾는 정보가 다릅니다. 화면 순서와 메뉴 구조를 먼저 잡고 시작합니다.",
  },
  {
    title: "디자인 · 퍼블리싱",
    body: "모바일 우선으로 만들고 데스크톱까지 넓힙니다. 스크롤 동작과 여백까지 직접 조정합니다.",
  },
  {
    title: "폼 · 예약 연동",
    body: "문의·상담 신청이 담당자 메일이나 관리자 화면으로 들어오게 연결합니다.",
  },
  {
    title: "배포 · 인수인계",
    body: "도메인 연결, 검색 노출 설정, 수정 방법 문서까지 넘겨드립니다.",
  },
];

const STACK = [
  "Next.js 16",
  "React 19",
  "TypeScript",
  "Tailwind CSS 4",
  "반응형",
  "웹 접근성",
  "Vercel 배포",
];

export default function Home() {
  return (
    <main className="theme-corp min-h-screen bg-surface text-ink">
      {/* 히어로 */}
      <section className="relative overflow-hidden border-b border-line">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(60% 60% at 15% 10%, color-mix(in srgb, var(--color-brand) 45%, transparent), transparent 70%), radial-gradient(50% 50% at 85% 30%, color-mix(in srgb, var(--color-accent) 30%, transparent), transparent 70%)",
          }}
        />
        <Container className="relative py-24 sm:py-32">
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
              Website Portfolio
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl leading-[1.15] font-bold tracking-tight sm:text-6xl">
              업종에 맞는 웹사이트를
              <br />
              직접 만듭니다.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              템플릿을 골라 드리는 게 아니라 화면을 짭니다. 아래 세 개는 실제로
              동작하는 데모입니다. 휴대폰으로도 열어보세요.
            </p>
          </Reveal>

          <Reveal delay={120} className="mt-10 flex flex-wrap gap-3">
            <a
              href="#demos"
              className="rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-brand-ink transition-transform hover:-translate-y-0.5"
            >
              데모 보기
            </a>
            <a
              href="#scope"
              className="rounded-full border border-line px-7 py-3.5 text-sm font-semibold transition-colors hover:bg-surface-2"
            >
              제작 범위
            </a>
          </Reveal>

          <Reveal delay={200} className="mt-14 flex flex-wrap gap-2">
            {STACK.map((s) => (
              <span
                key={s}
                className="rounded-full border border-line bg-surface-2/70 px-3.5 py-1.5 text-xs font-medium text-muted"
              >
                {s}
              </span>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* 데모 3종 */}
      <section id="demos" className="scroll-mt-16 py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="text-3xl font-bold sm:text-4xl">제작 사례</h2>
            <p className="mt-3 text-base text-muted">
              업종마다 필요한 게 다릅니다. 무엇을 우선했는지 함께 적어 두었습니다.
            </p>
          </Reveal>

          <ul className="mt-12 grid gap-6 lg:grid-cols-3">
            {SITES.map((site, i) => (
              <Reveal as="li" key={site.key} delay={i * 110}>
                <Link
                  href={`/${site.key}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface-2 transition-all duration-300 hover:-translate-y-1 hover:border-brand"
                >
                  {/* 색 미리보기 — 사이트 무드를 한눈에 */}
                  <div className="flex h-32 overflow-hidden">
                    {site.swatch.map((c) => (
                      <div
                        key={c}
                        className="flex-1 transition-[flex] duration-500 group-hover:first:flex-[2]"
                        style={{ background: c }}
                      />
                    ))}
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-xs font-semibold tracking-wide text-accent">
                      {site.category}
                    </p>
                    <h3 className="mt-2 text-xl font-bold">{site.brand}</h3>
                    <p className="mt-1.5 text-sm text-muted">{site.tagline}</p>

                    <ul className="mt-5 flex-1 space-y-2 border-t border-line pt-5">
                      {site.focus.map((f) => (
                        <li
                          key={f}
                          className="flex gap-2 text-sm leading-relaxed text-muted"
                        >
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                      데모 열기
                      <svg
                        viewBox="0 0 16 16"
                        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden
                      >
                        <path
                          d="M3 8h9M8 4l4 4-4 4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* 제작 범위 */}
      <section id="scope" className="scroll-mt-16 border-y border-line bg-surface-2 py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="text-3xl font-bold sm:text-4xl">제작 범위</h2>
          </Reveal>
          <ol className="mt-12 grid gap-6 sm:grid-cols-2">
            {SCOPE.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 90}>
                <div className="h-full rounded-2xl border border-line bg-surface p-7">
                  <span className="font-[family-name:var(--font-latin)] text-sm font-semibold text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-lg font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* 백엔드 사례 연결 */}
      <section className="py-20 sm:py-28">
        <Container>
          <Reveal className="rounded-2xl border border-line bg-surface-2 p-8 sm:p-12">
            <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
              Also
            </p>
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
              예약·결제처럼 돈이 오가는 기능도 만듭니다
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
              결제 금액 위조 차단, 좌석 동시성 처리, 타임아웃 시 결제 상태 복구까지
              구현한 예약·결제 시스템을 별도로 공개해 두었습니다. 소스와 테스트를
              전부 볼 수 있습니다.
            </p>
            <a
              href="https://github.com/DevSung/oneday-class-booking"
              target="_blank"
              rel="noreferrer noopener"
              className="mt-7 inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-semibold transition-colors hover:bg-surface"
            >
              원데이클래스 예약·결제 시스템
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden>
                <path
                  d="M5 11 11 5M11 5H6.5M11 5v4.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </Reveal>
        </Container>
      </section>

      <footer className="border-t border-line py-10">
        <Container>
          <p className="text-xs leading-relaxed text-muted">
            데모에 등장하는 브랜드명·연락처·주소·의료진 정보는 모두 가상이며 실제
            사업자와 무관합니다. 사진 대신 직접 제작한 그래픽을 사용했습니다.
          </p>
        </Container>
      </footer>
    </main>
  );
}
