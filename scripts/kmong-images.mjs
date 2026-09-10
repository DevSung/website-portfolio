/**
 * 크몽 서비스 등록용 이미지 생성.
 *
 * 크몽 규격
 *   메인 이미지  652 x 488 px 고정
 *   상세 이미지  가로 652~2000px, 세로 3000px 이하
 *
 * 기존 스크린샷은 전체 페이지 캡처라 세로가 5000~11000px 이어서 그대로 못 쓴다.
 * 그래서 HTML 로 판을 짜고 스크린샷 안에서 잘라 넣은 뒤 규격대로 다시 찍는다.
 *
 *   node scripts/kmong-images.mjs
 */
import { chromium } from "playwright";
import { mkdir, writeFile, rm } from "node:fs/promises";
import { resolve } from "node:path";

const OUT = "docs/kmong";

// setContent 로 만든 문서는 origin 이 about:blank 라 file:// 하위 자원을
// 불러오지 못한다(빈 이미지가 찍힌다). 그래서 HTML 을 docs/kmong 안에 임시
// 파일로 쓰고 file:// 로 직접 열어, 스크린샷을 상대 경로로 참조한다.
const shot = (n) => `../screenshots/${n}`;
const TMP = `${OUT}/.render.html`;

async function render(page, html) {
  await writeFile(TMP, html);
  await page.goto(`file://${resolve(TMP)}`, { waitUntil: "load" });
  // 이미지 디코딩까지 끝나야 프레임이 비어 보이지 않는다.
  await page.evaluate(() =>
    Promise.all(
      [...document.images].map((i) =>
        i.complete ? Promise.resolve() : new Promise((r) => {
          i.onload = i.onerror = r;
        }),
      ),
    ),
  );
  const broken = await page.evaluate(
    () => [...document.images].filter((i) => !i.naturalWidth).length,
  );
  if (broken) throw new Error(`이미지 ${broken}장을 불러오지 못했다`);
  await page.waitForTimeout(300);
}

const C = {
  bg: "#0b0d14",
  bg2: "#141826",
  line: "#242b3e",
  ink: "#eef1f8",
  muted: "#96a0b8",
  brand: "#5b74ff",
  accent: "#00d3a7",
};

const BASE_CSS = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: ${C.bg};
    color: ${C.ink};
    font-family: -apple-system, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif;
    word-break: keep-all;
    -webkit-font-smoothing: antialiased;
  }
  .wrap { padding: 64px 72px; }
  .eyebrow {
    font-size: 15px; font-weight: 700; letter-spacing: .14em;
    color: ${C.accent}; text-transform: uppercase; margin-bottom: 18px;
  }
  h1 { font-size: 54px; line-height: 1.2; letter-spacing: -.02em; font-weight: 800; }
  h2 { font-size: 42px; line-height: 1.25; letter-spacing: -.02em; font-weight: 800; }
  h3 { font-size: 26px; font-weight: 700; }
  .lead { font-size: 21px; line-height: 1.65; color: ${C.muted}; margin-top: 22px; }
  .p { font-size: 18px; line-height: 1.7; color: ${C.muted}; }
  .card { background: ${C.bg2}; border: 1px solid ${C.line}; border-radius: 20px; }
  .row { display: flex; gap: 22px; }
  .grid3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
  .grid2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 22px; }
  .chip {
    display: inline-block; border: 1px solid ${C.line}; background: ${C.bg2};
    border-radius: 999px; padding: 10px 20px; font-size: 16px; font-weight: 600;
    color: ${C.muted};
  }
  /* 스크린샷은 위쪽만 잘라 쓴다 — 히어로가 그 사이트의 얼굴이다 */
  .frame { border: 1px solid ${C.line}; border-radius: 16px; overflow: hidden; background: ${C.bg2}; }
  .frame img { display: block; width: 100%; object-fit: cover; object-position: top; }
  .bar { height: 30px; background: #1b2032; display: flex; align-items: center; gap: 7px; padding: 0 14px; }
  .dot { width: 9px; height: 9px; border-radius: 999px; background: #39415c; }
  .num { font-size: 46px; font-weight: 800; color: ${C.brand}; letter-spacing: -.02em; }
  .num-label { font-size: 15px; color: ${C.muted}; margin-top: 8px; }
  .tag { font-size: 14px; font-weight: 700; color: ${C.accent}; }
`;

/* 가격과 절차는 밝은 배경으로 뺀다. 다크만 이어지면 스크롤이 지루하고,
   홈페이지 제작 카테고리 구매자에게 다크 UI 자체가 낯설다. */
const LIGHT_CSS = `
  body { background: #ffffff; color: #12233b; }
  .eyebrow { color: #00916f; }
  .lead, .p, .num-label { color: #5b6b80; }
  .card { background: #f7f9fc; border-color: #e3e8f0; }
  .chip { background: #f7f9fc; border-color: #e3e8f0; color: #47566b; }
  .num { color: #3b4bd8; }
  .tag { color: #00916f; }
  .frame { border-color: #e3e8f0; background: #f7f9fc; }
  .bar { background: #eef2f8; }
  .dot { background: #c7d0de; }
  .best { border-color: #3b4bd8 !important; }
`;


const browserFrame = (src, h) => `
  <div class="frame">
    <div class="bar"><i class="dot"></i><i class="dot"></i><i class="dot"></i></div>
    <img src="${src}" style="height:${h}px">
  </div>`;

/* ── 메인 이미지 (652x488) ─────────────────────────────────────
   검색 결과에서는 280px 정도로 줄어든다. 그 크기에서 읽히지 않는
   요소는 질감만 남으므로 문구는 한 덩어리로 두고, 세 업종을 한다는
   사실이 보이도록 화면 세 장을 겹쳐 배치한다.
   ────────────────────────────────────────────────────────────── */
const MAIN = `
  <style>${BASE_CSS}
    body { width: 652px; height: 488px; overflow: hidden; position: relative; }
    .glow {
      position: absolute; inset: 0;
      background:
        radial-gradient(70% 70% at 0% 0%, rgba(91,116,255,.55), transparent 68%),
        radial-gradient(50% 50% at 100% 100%, rgba(0,211,167,.28), transparent 70%);
    }
    .wrap { position: relative; height: 488px; padding: 44px 0 0 46px; }
    .badge {
      display: inline-block; background: rgba(255,255,255,.14);
      border: 1px solid rgba(255,255,255,.22); border-radius: 999px;
      padding: 8px 17px; font-size: 18px; font-weight: 800;
    }
    h1 { font-size: 40px; line-height: 1.24; margin-top: 18px; }
    h1 em { font-style: normal; color: ${C.accent}; }
    .sub { font-size: 19px; font-weight: 700; color: rgba(255,255,255,.7); margin-top: 14px; }
    /* 세 장을 사선으로 겹친다 — 업종이 여러 개라는 게 한눈에 보이게 */
    .deck { position: absolute; right: -60px; bottom: -26px; width: 420px; height: 300px; }
    /* 위치를 잡는 건 래퍼 div 다. .frame 에 absolute 를 주면 세 장이
       같은 자리에 겹쳐 한 장만 보인다. */
    .deck > div { position: absolute; width: 300px; }
    .deck .frame { border-radius: 12px; }
    .deck .frame img { height: 200px; }
    .deck .bar { height: 20px; padding: 0 10px; gap: 5px; }
    .deck .dot { width: 6px; height: 6px; }
    .d1 { left: 0; top: 74px; box-shadow: -14px 16px 40px rgba(0,0,0,.5); }
    .d2 { left: 58px; top: 37px; box-shadow: -14px 16px 40px rgba(0,0,0,.5); }
    .d3 { left: 116px; top: 0; box-shadow: -14px 16px 40px rgba(0,0,0,.5); }
  </style>
  <div class="glow"></div>
  <div class="wrap">
    <span class="badge">경력 5년 개발자</span>
    <h1>홈페이지 제작부터<br><em>기능 개발까지</em></h1>
    <p class="sub">화면과 서버를 한 사람이</p>
    <div class="deck">
      <div class="d1">${browserFrame(shot("09-corp-home.png"), 200)}</div>
      <div class="d2">${browserFrame(shot("05-clinic-home.png"), 200)}</div>
      <div class="d3">${browserFrame(shot("01-cafe-home.png"), 200)}</div>
    </div>
  </div>`;

/* ── 상세 이미지 ───────────────────────────────────────────────── */
const CASES = [
  {
    id: "cafe",
    cat: "카페 · 공방 · 스튜디오",
    brand: "라온공방",
    point: "브랜드 무드가 첫 화면에서 전달되어야 하고, 클래스 일정과 잔여석이 보여야 문의 전화가 줄어듭니다. 인스타그램에서 넘어오는 모바일 방문자가 대부분이라 모바일을 먼저 만들었습니다.",
    desk: "01-cafe-home.png",
    sub: ["02-cafe-classes.png", "03-cafe-contact.png"],
    mob: "04-cafe-mobile.png",
  },
  {
    id: "clinic",
    cat: "병원 · 클리닉",
    brand: "바른솔 정형외과의원",
    point: "진료과목과 의료진을 빠르게 찾게 하고, 전화 대신 온라인 예약으로 응대 부담을 줄였습니다. 비급여 진료비용은 의료법상 고지 항목이라 표로 넣었습니다.",
    desk: "05-clinic-home.png",
    sub: ["06-clinic-doctors.png", "07-clinic-reserve.png"],
    mob: "08-clinic-mobile.png",
  },
  {
    id: "corp",
    cat: "기업 · 스타트업",
    brand: "Hyperlane",
    point: "투자자·고객사·지원자가 같은 사이트를 봅니다. 지표와 도입 절차로 신뢰를 만들고, 한국어 / 영어 전환을 넣었습니다.",
    desk: "09-corp-home.png",
    sub: ["10-corp-careers.png", "13-corp-en.png"],
    mob: "12-corp-mobile.png",
  },
];

const casePage = (c) => `
  <style>${BASE_CSS}</style>
  <div class="wrap">
    <p class="eyebrow">${c.cat}</p>
    <h2>${c.brand}</h2>
    <p class="lead" style="max-width:900px">${c.point}</p>
    <div style="margin-top:40px">${browserFrame(shot(c.desk), 560)}</div>
    <div class="grid2" style="margin-top:22px">
      ${c.sub.map((s) => browserFrame(shot(s), 320)).join("")}
    </div>
  </div>`;

const PAGES = [
  {
    id: "01-cover",
    html: `
    <style>${BASE_CSS}
      .glow { position:absolute; inset:0;
        background: radial-gradient(50% 45% at 10% 5%, rgba(91,116,255,.42), transparent 70%),
                    radial-gradient(40% 40% at 95% 25%, rgba(0,211,167,.2), transparent 70%); }
      body { position: relative; }
      h1 { font-size: 60px; }
      .lead { font-size: 24px; }
    </style>
    <div class="glow"></div>
    <div class="wrap" style="position:relative">
      <p class="eyebrow">Stack</p>
      <h1>반응형 웹 + 서버 기능</h1>
      <p class="lead" style="max-width:860px">
        Next.js와 TypeScript로 화면을 구현하고, 예약과 결제, 관리자처럼 서버가
        필요한 부분은 Spring Boot로 붙입니다. 정적 파일로 빌드해 배포하며
        도메인 연결까지 진행합니다.
      </p>
      <div style="margin-top:46px;display:flex;gap:14px;flex-wrap:wrap">
        ${["Next.js", "React", "TypeScript", "Spring Boot", "Java · Kotlin", "MySQL", "AWS"]
          .map((s) => `<span class="chip" style="font-size:19px;padding:13px 26px">${s}</span>`).join("")}
      </div>
    </div>`,
  },

  {
    id: "02-about",
    html: `
    <style>${BASE_CSS}
      .stat { padding: 34px 38px; }
      .stat .num { font-size: 52px; }
      .stat .num-label { font-size: 18px; margin-top: 10px; }
      .item { padding: 26px 30px; }
      .item h3 { font-size: 26px; }
    </style>
    <div class="wrap">
      <p class="eyebrow">Background</p>
      <h2>백엔드 5년</h2>
      <p class="lead" style="max-width:900px;font-size:23px">
        골프 플랫폼과 애드테크에서 백엔드를 담당했습니다. 현재 광고 데이터
        플랫폼에서 수천만 행 규모의 리포팅 데이터를 다루며, 집계 프로시저
        실행시간을 4~10배 단축했습니다.
      </p>
      <div class="grid3" style="margin-top:46px">
        ${[["5년", "실무 경력"], ["프론트 + 백엔드", "담당 범위"], ["4건", "공개 포트폴리오"]]
          .map(([v, k]) => `
          <div class="card stat">
            <p class="num" style="font-size:${v.length > 4 ? 34 : 52}px">${v}</p>
            <p class="num-label">${k}</p>
          </div>`).join("")}
      </div>
      <h3 style="margin-top:60px;font-size:30px">구현 범위</h3>
      <div class="grid3" style="margin-top:26px">
        ${["인증 · 권한", "결제 · 정산", "알림 발송", "예약 · 재고", "관리자 도구", "배치 · 스케줄러"]
          .map((t) => `<div class="card item"><h3>${t}</h3></div>`).join("")}
      </div>
    </div>`,
  },

  /* 사례를 서비스 안에도 되살린다. 구매자가 제일 먼저 보고 싶은 것이
     "이 사람이 만든 화면"이고, 포트폴리오까지 클릭하는 사람은 소수다. */
  {
    id: "03-cases",
    html: `
    <style>${BASE_CSS}
      .case { margin-top: 34px; }
      .case .meta { display: flex; align-items: baseline; gap: 18px; margin-bottom: 16px; }
      .case h3 { font-size: 32px; }
      .case .cat { font-size: 20px; font-weight: 700; color: ${C.accent}; }
      .case .p { font-size: 19px; margin-top: 10px; max-width: 900px; }
    </style>
    <div class="wrap">
      <p class="eyebrow">Cases</p>
      <h2>구현 사례</h2>
      ${[
        ["카페 · 공방", "라온공방", "날짜와 클래스 선택에 따라 시간대별 잔여 좌석을 계산하고, 마감 슬롯은 예약 버튼을 비활성 처리합니다.", "01-cafe-home.png"],
        ["병원 · 클리닉", "바른솔 정형외과의원", "진료과목을 증상 태그로 색인했습니다. 비급여 진료비용 표에 caption과 th scope를 명시했습니다.", "05-clinic-home.png"],
        ["기업 · 스타트업", "Hyperlane", "useSyncExternalStore 로 한국어 / 영어를 전환합니다. 탭 간 동기화와 html lang 속성 변경을 함께 처리합니다.", "09-corp-home.png"],
      ].map(([cat, brand, note, img]) => `
        <div class="case">
          <div class="meta"><span class="cat">${cat}</span><h3>${brand}</h3></div>
          <p class="p">${note}</p>
          <div style="margin-top:16px">${browserFrame(shot(img), 380)}</div>
        </div>`).join("")}
    </div>`,
  },

  {
    id: "04-mobile",
    html: `
    <style>${BASE_CSS}
      .mob { display:grid; grid-template-columns: repeat(4,1fr); gap:24px; margin-top:44px; }
      .mob .frame img { height: 700px; }
    </style>
    <div class="wrap">
      <p class="eyebrow">Mobile first</p>
      <h2>모바일 우선 구현</h2>
      <p class="lead" style="max-width:900px;font-size:23px">
        모바일 뷰포트를 기준으로 작성하고 미디어 쿼리로 확장합니다. 내비게이션은
        햄버거로 전환되고, 표는 컨테이너 가로 스크롤, 폼은 1열로 배치됩니다.
        스크롤 등장 효과는 prefers-reduced-motion 설정을 따라 비활성화됩니다.
      </p>
      <div class="mob">
        ${["04-cafe-mobile.png", "08-clinic-mobile.png", "12-corp-mobile.png", "14-mobile-nav.png"]
          .map((f) => browserFrame(shot(f), 700)).join("")}
      </div>
    </div>`,
  },

  /* 카드 본문을 없애고 항목명만 크게 둔다. 1800px 이미지를 폰 폭으로
     줄이면 16px 본문은 3.5px가 되어 읽히지 않는다. 설명은 서비스
     설명 본문에 이미 들어가 있다. */
  {
    id: "05-server",
    html: `
    <style>${BASE_CSS}
      .item { padding: 32px 36px; }
      .item h3 { font-size: 30px; }
      .item p { font-size: 19px; color: ${C.muted}; margin-top: 10px; }
    </style>
    <div class="wrap">
      <p class="eyebrow">Server · API</p>
      <h2>서버 · API</h2>
      <p class="lead" style="max-width:900px;font-size:23px">
        아래 항목은 화면 작업과 같은 저장소, 같은 일정으로 진행합니다. 별도 발주나
        인수인계 과정이 없습니다.
      </p>
      <div class="grid2" style="margin-top:44px">
        ${[
          ["인증 · 권한", "소셜 로그인 · 접근 제어"],
          ["예약 · 재고", "중복 처리 차단"],
          ["결제 · 정산", "금액 검증 · 정산 집계"],
          ["알림 발송", "알림톡 · SMS · 메일"],
        ].map(([t, b]) => `<div class="card item"><h3>${t}</h3><p>${b}</p></div>`).join("")}
      </div>
      <div class="card" style="margin-top:36px;padding:38px 42px">
        <p class="tag" style="font-size:20px">결제 정합성</p>
        <p class="p" style="margin-top:16px;font-size:22px;line-height:1.65">
          클라이언트가 전송한 금액을 신뢰하지 않고, 서버 산정 금액과 PG 승인 금액을
          이중 대조합니다. 좌석 차감은 행 단위 배타 락과 DB 제약으로 이중 처리하며,
          100 스레드 동시 요청으로 검증했습니다.
        </p>
        <div class="row" style="margin-top:30px">
          ${[["101", "자동화 테스트"], ["8", "화면"], ["3", "결제 반영 경로"]]
            .map(([v, k]) => `
            <div>
              <p class="num" style="font-size:42px">${v}</p>
              <p class="num-label" style="font-size:17px">${k}</p>
            </div>`).join("")}
        </div>
      </div>
    </div>`,
  },

  {
    id: "06-price",
    light: true,
    html: `
    <style>${BASE_CSS}${LIGHT_CSS}
      .pk { padding: 40px; }
      .pk .price { font-size: 46px; font-weight: 800; letter-spacing:-.02em; margin-top: 8px; }
      .pk .tag { font-size: 20px; }
      .pk ul { list-style: none; margin-top: 28px; }
      .pk li { font-size: 19px; line-height: 1.6; padding-left: 24px; position: relative; margin-bottom: 14px; }
      .pk li:before { content: ""; position: absolute; left: 0; top: 11px; width: 7px; height: 7px; border-radius: 999px; background: #00916f; }
      .best { border-width: 2px; }
    </style>
    <div class="wrap">
      <p class="eyebrow">Package</p>
      <h2>패키지</h2>
      <div class="grid3" style="margin-top:44px">
        ${[
          ["STANDARD", "66만원", false, ["반응형 5페이지", "문의 폼 수신 연동", "도메인 연결 + 배포", "수정 2회 · 작업 14일"]],
          ["DELUXE", "177만원", true, ["STANDARD 전체 포함", "페이지 8개까지", "예약 신청 기능", "관리자 화면", "수정 3회 · 작업 25일"]],
          ["PREMIUM", "297만원", false, ["DELUXE 전체 포함", "결제 연동", "중복 결제 차단", "소스 코드 제공", "수정 4회 · 작업 35일"]],
        ].map(([n, p, best, items]) => `
          <div class="card pk ${best ? "best" : ""}">
            <p class="tag">${n}</p>
            <p class="price">${p}</p>
            <ul>${items.map((i) => `<li>${i}</li>`).join("")}</ul>
          </div>`).join("")}
      </div>
      <h3 style="margin-top:56px;font-size:30px">추가 옵션</h3>
      <div style="margin-top:24px;display:flex;gap:14px;flex-wrap:wrap">
        ${[
          "페이지 추가 9만원",
          "다국어 (한 / 영) 29만원",
          "수정 2회 추가 12만원",
          "관리자 메뉴 추가 19만원",
          "빠른 작업 15만원부터",
        ].map((s) => `<span class="chip" style="font-size:19px;padding:14px 26px">${s}</span>`).join("")}
      </div>
    </div>`,
  },

  {
    id: "07-process",
    light: true,
    html: `
    <style>${BASE_CSS}${LIGHT_CSS}
      .step { padding: 32px 36px; }
      .step h3 { font-size: 27px; }
      .step p { font-size: 19px; line-height: 1.6; margin-top: 12px; }
    </style>
    <div class="wrap">
      <p class="eyebrow">Process</p>
      <h2>진행 순서</h2>
      <div class="grid2" style="margin-top:44px">
        ${[
          ["01  상담 · 견적", "필요한 페이지와 기능을 정하고 견적을 확정합니다."],
          ["02  구조 설계", "화면 순서와 메뉴 구조를 먼저 잡아 보여드립니다."],
          ["03  디자인 · 퍼블리싱", "모바일 우선으로 만들고 중간에 실제 주소로 보여드립니다."],
          ["04  기능 연동", "문의 폼, 예약, 결제를 붙입니다."],
          ["05  배포 · 인수인계", "도메인을 연결하고 수정 방법 문서를 드립니다."],
          ["06  수정 대응", "패키지에 포함된 횟수만큼 수정해 드립니다."],
        ].map(([t, b]) => `
          <div class="card step"><h3>${t}</h3><p class="p">${b}</p></div>`).join("")}
      </div>
      <div class="card" style="margin-top:40px;padding:38px 42px">
        <h3 style="font-size:27px">진행 방식</h3>
        <p class="p" style="margin-top:16px;font-size:21px;line-height:1.65">
          중간 산출물은 실제 배포 주소로 공유합니다. 인수인계 시 수정 가이드 문서를
          함께 드려 문구와 이미지는 직접 교체하실 수 있습니다. 회신은 평일 기준 1일
          이내입니다. 도메인과 서버 이용료는 별도이며 연결 작업은 제가 합니다.
        </p>
      </div>
    </div>`,
  },
];

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch({ channel: "chrome" });

// 메인 이미지 — 규격이 652x488 고정이라 배율을 1로 둬야 픽셀이 정확히 맞는다.
{
  const ctx = await browser.newContext({
    viewport: { width: 652, height: 488 },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();
  await render(page, MAIN);
  await page.screenshot({ path: `${OUT}/main-652x488.png` });
  console.log("  main-652x488");
  await ctx.close();
}

// 상세 이미지 — 가로 1800px(1200 x 1.5), 세로는 3000px 이하로 유지해야 한다.
for (const p of PAGES) {
  const ctx = await browser.newContext({
    viewport: { width: 1200, height: 900 },
    deviceScaleFactor: 1.5,
  });
  const page = await ctx.newPage();
  await render(page, p.html);
  const h = await page.evaluate(() => document.body.scrollHeight);
  await page.screenshot({ path: `${OUT}/${p.id}.png`, fullPage: true });
  const over = h * 1.5 > 3000 ? "  ⚠ 세로 초과" : "";
  console.log(`  ${p.id.padEnd(14)} ${Math.round(h * 1.5)}px${over}`);
  await ctx.close();
}

console.log(`\n${PAGES.length + 1}장 → ${OUT}/`);

/* ── 포트폴리오 대표 이미지 (1:1) ───────────────────────────────
   크몽 포트폴리오는 대표 이미지를 정사각형으로만 받는다.
   ────────────────────────────────────────────────────────────── */
{
  const SQUARES = [
    { id: "pf-cafe", cat: "카페 · 공방", brand: "라온공방",
      note: "가죽공예 클래스 예약", shot: "01-cafe-home.png",
      a: "#6b4a32", b: "#c1734a" },
    { id: "pf-clinic", cat: "병원 · 클리닉", brand: "바른솔 정형외과의원",
      note: "온라인 예약 · 비급여 안내", shot: "05-clinic-home.png",
      a: "#1b5fa8", b: "#2fa8a0" },
    { id: "pf-corp", cat: "기업 · 스타트업", brand: "Hyperlane",
      note: "B2B SaaS · 한국어 / 영어", shot: "09-corp-home.png",
      a: "#3b4bd8", b: "#00d3a7" },
  ];

  const ctx = await browser.newContext({
    viewport: { width: 800, height: 800 },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();

  for (const s of SQUARES) {
    const html = `
      <style>${BASE_CSS}
        body { width: 800px; height: 800px; overflow: hidden; position: relative; background: #0b0d14; }
        .glow { position: absolute; inset: 0;
          background: radial-gradient(70% 70% at 8% 4%, ${s.a}, transparent 70%),
                      radial-gradient(55% 55% at 100% 100%, ${s.b}, transparent 72%);
          opacity: .85; }
        .wrap { position: relative; height: 800px; padding: 60px; display: flex; flex-direction: column; }
        .cat { font-size: 24px; font-weight: 700; color: rgba(255,255,255,.72); }
        h1 { font-size: 58px; line-height: 1.18; margin-top: 16px; }
        .note { font-size: 24px; font-weight: 600; color: rgba(255,255,255,.72); margin-top: 18px; }
        .frame { margin-top: auto; border-radius: 16px 16px 0 0; border-bottom: none;
                 box-shadow: 0 -18px 50px rgba(0,0,0,.45); }
        .frame img { height: 330px; }
      </style>
      <div class="glow"></div>
      <div class="wrap">
        <p class="cat">${s.cat}</p>
        <h1>${s.brand}</h1>
        <p class="note">${s.note}</p>
        ${browserFrame(shot(s.shot), 330)}
      </div>`;
    await render(page, html);
    await page.screenshot({ path: `${OUT}/${s.id}.png` });
    console.log(`  ${s.id}`);
  }
  await ctx.close();
}

await browser.close();
await rm(TMP, { force: true });
