/**
 * 데모의 상호작용이 실제로 동작하는지 확인한다.
 * 캡처만 믿으면 "보이기는 하는데 눌리지 않는" 상태를 놓친다.
 *
 *   node scripts/check.mjs
 */
import { chromium } from "playwright";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const results = [];

const check = async (name, fn) => {
  try {
    await fn();
    results.push(["PASS", name, ""]);
  } catch (e) {
    results.push(["FAIL", name, e.message.split("\n")[0]]);
  }
};

const browser = await chromium.launch({ channel: "chrome" });

// 1. 모바일 메뉴
await check("모바일 햄버거 메뉴가 열리고 링크가 눌린다", async () => {
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/clinic`);

  const nav = page.locator("#site-mobile-nav");
  if (await nav.isVisible()) throw new Error("메뉴가 처음부터 열려 있다");

  await page.getByRole("button", { name: "메뉴 열기" }).click();
  await nav.waitFor({ state: "visible", timeout: 3000 });

  await nav.getByRole("link", { name: "의료진" }).click();
  await page.waitForURL("**/clinic/doctors");

  // 이동 후에는 닫혀 있어야 한다
  if (await page.locator("#site-mobile-nav").isVisible())
    throw new Error("이동 후에도 메뉴가 열려 있다");
  await ctx.close();
});

// 2. 아코디언
await check("FAQ 아코디언이 열리고 닫힌다", async () => {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/cafe`);

  const second = page.getByRole("button", { name: /당일 예약도 되나요/ });
  await second.scrollIntoViewIfNeeded();
  if ((await second.getAttribute("aria-expanded")) !== "false")
    throw new Error("두 번째 항목이 이미 펼쳐져 있다");

  await second.click();
  await page.waitForFunction(
    () =>
      [...document.querySelectorAll('[aria-expanded="true"]')].length === 1,
    null,
    { timeout: 3000 },
  );
  if ((await second.getAttribute("aria-expanded")) !== "true")
    throw new Error("클릭해도 펼쳐지지 않는다");

  await second.click();
  if ((await second.getAttribute("aria-expanded")) !== "false")
    throw new Error("다시 클릭해도 접히지 않는다");
  await ctx.close();
});

// 3. 폼 검증
await check("빈 폼 제출이 막히고 오류가 표시된다", async () => {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 1000 } });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/clinic/reserve`);

  await page.getByRole("button", { name: "예약 신청" }).click();
  await page.getByText("이름을(를) 입력해 주세요.").waitFor({ timeout: 3000 });
  await page.getByText("개인정보 수집·이용에 동의해 주세요.").waitFor({ timeout: 3000 });
  await ctx.close();
});

await check("잘못된 연락처 형식이 걸러진다", async () => {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 1000 } });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/clinic/reserve`);

  await page.getByLabel("이름").fill("홍길동");
  await page.getByLabel("연락처").fill("01012");
  await page.getByRole("button", { name: "예약 신청" }).click();
  await page.getByText("연락처 형식을 확인해 주세요.").waitFor({ timeout: 3000 });
  await ctx.close();
});

await check("올바르게 채우면 완료 화면이 나온다", async () => {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 1000 } });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/clinic/reserve`);

  await page.getByLabel("이름").fill("홍길동");
  await page.getByLabel("연락처").fill("010-0000-0000");
  await page.getByLabel("구분").selectOption({ index: 1 });
  await page.getByLabel("불편한 부위").selectOption({ index: 1 });
  await page.getByLabel("희망 날짜").fill("2026-10-01");
  await page.getByLabel("희망 시간대").selectOption({ index: 1 });
  await page.getByRole("checkbox", { name: "개인정보 수집·이용 동의" }).check();
  await page.getByRole("button", { name: "예약 신청" }).click();

  await page.getByText("예약 신청이 접수되었습니다").waitFor({ timeout: 5000 });
  await page.getByText("데모 화면이라 실제로 전송되지는 않았습니다.").waitFor();
  await ctx.close();
});

// 4. 언어 전환
await check("언어 전환이 본문에 반영되고 새로고침 후에도 유지된다", async () => {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/corp`);

  await page.getByText("흩어진 배송 데이터를").waitFor({ timeout: 3000 });
  await page.getByRole("button", { name: "en", exact: true }).click();
  await page.getByText("Scattered delivery data,").waitFor({ timeout: 3000 });

  if ((await page.locator("html").getAttribute("lang")) !== "en")
    throw new Error("html lang 이 바뀌지 않았다");

  await page.reload();
  await page.getByText("Scattered delivery data,").waitFor({ timeout: 3000 });
  await ctx.close();
});

// 5. 잔여석 마감 처리
await check("마감된 시간대는 예약 버튼이 눌리지 않는다", async () => {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 1000 } });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/cafe/classes`);

  const closed = page.getByRole("link", { name: "예약 마감" });
  const n = await closed.count();
  if (n === 0) return; // 날짜에 따라 마감 슬롯이 없을 수 있다
  const cls = await closed.first().getAttribute("class");
  if (!cls?.includes("pointer-events-none"))
    throw new Error("마감 버튼이 여전히 클릭 가능하다");
  await ctx.close();
});

// 6. 데모 안내 바
await check("데모 안내 바로 사이트 간 이동이 된다", async () => {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/cafe`);

  const bar = page.locator("[data-demobar]");
  await bar.waitFor({ timeout: 3000 });
  await bar.getByRole("link", { name: "Hyperlane" }).click();
  await page.waitForURL("**/corp");
  await ctx.close();
});

await browser.close();

const pad = Math.max(...results.map((r) => r[1].length));
for (const [state, name, msg] of results) {
  console.log(
    `${state === "PASS" ? "  ok  " : "  FAIL"} ${name.padEnd(pad)} ${msg}`,
  );
}
const failed = results.filter((r) => r[0] === "FAIL").length;
console.log(
  `\n${results.length - failed}/${results.length} 통과${failed ? ` · ${failed}건 실패` : ""}`,
);
process.exit(failed ? 1 : 0);
