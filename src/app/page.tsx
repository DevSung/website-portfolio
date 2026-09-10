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
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Spring Boot",
  "Java · Kotlin",
  "MySQL · PostgreSQL",
  "AWS · Vercel",
];

/* 백엔드 사례가 결제 한 건뿐이라 "예약결제만 하는 사람"으로 읽힌다.
   범위는 표로 넓게 알리고, 깊이는 사례 한 건으로 증명한다. */
const SERVER_SCOPE = [
  {
    title: "인증 · 권한",
    body: "소셜 로그인, 토큰 발급·재발급, 역할별 접근 제어, 관리자 계정 분리.",
  },
  {
    title: "결제 · 정산",
    body: "결제 승인과 취소, 금액 검증, 정산 집계. 아래 사례에서 자세히 다뤘습니다.",
  },
  {
    title: "알림 발송",
    body: "알림톡·SMS·메일. 실패 재시도와 발송 기록, 중복 발송 차단까지.",
  },
  {
    title: "파일 · 이미지",
    body: "업로드 URL 발급, 용량·형식 검증, 썸네일 생성, 스토리지 연결.",
  },
  {
    title: "외부 API 연동",
    body: "결제사·배송사·공공데이터. 타임아웃과 재시도 정책을 호출부에 맞춰 설계합니다.",
  },
  {
    title: "배치 · 스케줄러",
    body: "정기 집계, 만료 처리, 데이터 동기화. 인스턴스가 늘어도 중복 실행되지 않게.",
  },
  {
    title: "동시성 · 정합성",
    body: "재고·좌석처럼 한 자리를 여럿이 노리는 경우. 중복 처리와 초과 판매를 막습니다.",
  },
  {
    title: "관리자 도구",
    body: "운영팀이 직접 쓰는 화면. 목록·검색·상태 변경까지 화면째로 만듭니다.",
  },
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
              Web · Server · API
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl leading-[1.15] font-bold tracking-tight sm:text-6xl">
              화면부터 서버까지
              <br />
              한 사람이 만듭니다.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              웹사이트를 짜고, 그 뒤에 붙는 API와 관리자 화면까지 직접 만듭니다.
              아래 데모는 전부 실제로 동작합니다. 휴대폰으로도 열어보세요.
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
              href="#server"
              className="rounded-full border border-line px-7 py-3.5 text-sm font-semibold transition-colors hover:bg-surface-2"
            >
              서버 · API
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

      {/* 경력 — 데모만 있는 사람으로 읽히지 않게 히어로 바로 뒤에 둔다.
          회사명은 넣지 않는다. 재직 중인 곳은 공개 전 확인이 필요하고,
          업계를 좁게 특정하면 익명화 의미가 없어진다. */}
      <section className="border-b border-line bg-surface-2 py-14 sm:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <Reveal>
              <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
                Background
              </p>
              <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
                경력 5년, 사용자가 몰리는 서비스에서
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <p className="text-base leading-relaxed text-muted">
                골프 플랫폼과 애드테크 서비스에서 일했습니다. 둘 다 사용자와
                데이터가 실제로 몰리는 쪽입니다. 기능을 만드는 것과 그게 운영에서
                버티는 것이 다른 일이라는 걸 여기서 배웠습니다.
              </p>
              <dl className="mt-8 flex flex-wrap gap-x-12 gap-y-6 border-t border-line pt-7">
                {[
                  ["5년", "실무 경력"],
                  ["골프 플랫폼 · 애드테크", "경험 도메인"],
                  ["프론트 · 백엔드", "담당 범위"],
                ].map(([v, k]) => (
                  <div key={k}>
                    <dd className="font-bold">{v}</dd>
                    <dt className="mt-1 text-xs text-muted">{k}</dt>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
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
            <h2 className="text-3xl font-bold sm:text-4xl">웹사이트 제작 범위</h2>
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

      {/* 서버 · API — 범위는 넓게 알리고 깊이는 사례 하나로 증명한다 */}
      <section id="server" className="scroll-mt-16 py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="text-3xl font-bold sm:text-4xl">서버 · API 개발</h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
              화면 뒤에 붙는 것들입니다. 프론트만 받아서 서버는 다른 사람에게
              맡기면, 붙이는 구간에서 비용이 남습니다.
            </p>
          </Reveal>

          <ul className="mt-12 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
            {SERVER_SCOPE.map((s, i) => (
              <Reveal as="li" key={s.title} delay={(i % 4) * 80}>
                <div className="border-t border-line pt-5">
                  <h3 className="font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>

          {/* 깊이 증명 — 소스와 테스트가 공개된 사례 한 건 */}
          <Reveal className="mt-16 rounded-2xl border border-line bg-surface-2 p-8 sm:p-12">
            <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
              Case study
            </p>
            <h3 className="mt-4 text-2xl font-bold sm:text-3xl">
              돈이 오가는 구간은 이렇게 만듭니다
            </h3>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
              예약·결제 시스템 한 건을 소스와 테스트까지 공개해 두었습니다.
              결제 금액 위조 차단, 정원 초과 판매 방지, 승인은 됐는데 응답이 오지
              않은 결제의 복구를 실제로 구현하고 확인했습니다. 이 처리 방식은
              결제뿐 아니라 위 항목 대부분에 그대로 쓰입니다.
            </p>

            <dl className="mt-8 flex flex-wrap gap-x-12 gap-y-6">
              {[
                ["101", "자동화 테스트"],
                ["8", "화면 (사용자 · 관리자)"],
                ["3", "결제 반영 경로"],
              ].map(([v, k]) => (
                <div key={k}>
                  <dd className="font-[family-name:var(--font-latin)] text-2xl font-bold text-brand">
                    {v}
                  </dd>
                  <dt className="mt-1 text-xs text-muted">{k}</dt>
                </div>
              ))}
            </dl>

            <a
              href="https://github.com/DevSung/oneday-class-booking"
              target="_blank"
              rel="noreferrer noopener"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-semibold transition-colors hover:bg-surface"
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
