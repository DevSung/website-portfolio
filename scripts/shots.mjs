/**
 * 데모 화면 캡처. 시스템 Chrome을 그대로 쓴다(플레이라이트 번들 브라우저 미설치).
 *
 *   node scripts/shots.mjs            # 전체
 *   node scripts/shots.mjs cafe       # 특정 사이트만
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const OUT = "docs/screenshots";

const SHOTS = [
  { id: "00-index", url: "/", label: "포트폴리오 목록" },

  { id: "01-cafe-home", url: "/cafe", label: "라온공방 — 메인" },
  { id: "02-cafe-classes", url: "/cafe/classes", label: "라온공방 — 클래스 일정" },
  { id: "03-cafe-contact", url: "/cafe/contact", label: "라온공방 — 예약 문의" },
  { id: "04-cafe-mobile", url: "/cafe", label: "라온공방 — 모바일", mobile: true },

  { id: "05-clinic-home", url: "/clinic", label: "바른솔 정형외과 — 메인" },
  { id: "06-clinic-doctors", url: "/clinic/doctors", label: "바른솔 정형외과 — 의료진" },
  { id: "07-clinic-reserve", url: "/clinic/reserve", label: "바른솔 정형외과 — 예약" },
  { id: "08-clinic-mobile", url: "/clinic", label: "바른솔 정형외과 — 모바일", mobile: true },

  { id: "09-corp-home", url: "/corp", label: "Hyperlane — 메인" },
  { id: "10-corp-careers", url: "/corp/careers", label: "Hyperlane — 채용" },
  { id: "11-corp-contact", url: "/corp/contact", label: "Hyperlane — 도입 문의" },
  { id: "12-corp-mobile", url: "/corp", label: "Hyperlane — 모바일", mobile: true },
  { id: "13-corp-en", url: "/corp", label: "Hyperlane — 영어 전환", lang: "en" },
  {
    id: "15-cafe-classes-mobile",
    url: "/cafe/classes",
    label: "라온공방 클래스 — 모바일",
    mobile: true,
  },
  {
    id: "14-mobile-nav",
    url: "/clinic",
    label: "모바일 메뉴 열림",
    mobile: true,
    viewportOnly: true,
    openNav: true,
  },
];

const only = process.argv[2];
const targets = only ? SHOTS.filter((s) => s.id.includes(only)) : SHOTS;

const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch({ channel: "chrome" });

for (const shot of targets) {
  const ctx = await browser.newContext({
    viewport: shot.mobile ? MOBILE : DESKTOP,
    // 2배로 뜨면 어두운 그라디언트 화면이 장당 2.5MB를 넘는다.
    // 1.5배(가로 2160px)면 크몽 상세페이지와 README 모두 충분하다.
    deviceScaleFactor: 1.5,
    isMobile: !!shot.mobile,
    hasTouch: !!shot.mobile,
    locale: "ko-KR",
    timezoneId: "Asia/Seoul",
  });
  // 언어 선택은 localStorage 에 있으므로 첫 렌더 전에 심어둔다.
  if (shot.lang) {
    await ctx.addInitScript((l) => {
      try {
        localStorage.setItem("hyperlane-lang", l);
      } catch {}
    }, shot.lang);
  }

  const page = await ctx.newPage();
  await page.goto(BASE + shot.url, { waitUntil: "networkidle" });

  // 하단 고정 안내 바는 fullPage 캡처에서 문서 중간에 찍혀 결과물을 망친다.
  // goto 가 문서를 새로 만들기 때문에 스타일 주입은 이동 뒤에 해야 남는다.
  await page.addStyleTag({
    content: "[data-demobar]{display:none !important}",
  });

  // 스크롤 등장 애니메이션을 전부 발동시킨 뒤 맨 위로 되돌린다.
  // html { scroll-behavior: smooth } 가 걸려 있으면 scrollTo 가 애니메이션으로
  // 처리돼 목표 지점에 닿기 전에 다음 호출이 덮어써진다. 그래서 스윕 동안만 끈다.
  await page.evaluate(async () => {
    const html = document.documentElement;
    const prev = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";

    const step = window.innerHeight * 0.6;
    for (let y = 0; y < html.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 140));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 500));
    html.style.scrollBehavior = prev;
  });
  await page.waitForTimeout(500);

  // 모바일 메뉴는 열린 상태를 보여줘야 의미가 있다.
  if (shot.openNav) {
    await page.getByRole("button", { name: "메뉴 열기" }).click();
    await page.locator("#site-mobile-nav").waitFor({ state: "visible" });
    await page.waitForTimeout(400);
  }

  const file = `${OUT}/${shot.id}.png`;
  await page.screenshot({ path: file, fullPage: !shot.viewportOnly });
  console.log(`  ${shot.id.padEnd(18)} ${shot.label}`);
  await ctx.close();
}

await browser.close();
console.log(`\n${targets.length}장 저장 → ${OUT}/`);
