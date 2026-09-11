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
    .wrap { position: relative; height: 488px; padding: 42px 0 0 46px; }
    .badge {
      display: inline-block; background: rgba(255,255,255,.14);
      border: 1px solid rgba(255,255,255,.22); border-radius: 999px;
      padding: 8px 17px; font-size: 17px; font-weight: 800;
    }
    h1 { font-size: 42px; line-height: 1.2; margin-top: 16px; }
    h1 em { font-style: normal; color: ${C.accent}; }
    .sub { font-size: 18px; font-weight: 700; color: rgba(255,255,255,.7); margin-top: 14px; line-height: 1.5; }
    /* 겹친 화면이 캔버스 밖으로 나가면 안 된다. 맨 앞 장의 오른쪽이
       잘리면 이미지가 깨진 것처럼 보이고, 아래쪽이 잘리면 본문 한 줄이
       반만 남아 글자가 망가진 것처럼 읽힌다. 그래서 덱 전체를 안쪽에 둔다. */
    .deck { position: absolute; right: 28px; bottom: 26px; width: 340px; height: 267px; }
    .deck > div { position: absolute; width: 248px; }
    /* 뒤쪽 두 장은 어두운 히어로라 배경에 묻는다. 밝은 테두리로 떼어낸다. */
    .deck .frame { border-radius: 12px; border-color: rgba(255,255,255,.16); }
    .deck .bar { height: 19px; padding: 0 10px; gap: 5px; }
    .deck .dot { width: 6px; height: 6px; }
    /* 원본이 2160px 짜리 전체 페이지라 그대로 줄이면 글자가 뭉개진다.
       조금 확대해 히어로 영역만 보이게 한다. */
    .deck .frame img { width: 150%; object-position: left top; }
    .d1 { left: 0; top: 96px; box-shadow: -14px 16px 40px rgba(0,0,0,.5); }
    .d2 { left: 46px; top: 48px; box-shadow: -14px 16px 40px rgba(0,0,0,.5); }
    .d3 { left: 92px; top: 0; box-shadow: -14px 16px 40px rgba(0,0,0,.5); }
  </style>
  <div class="glow"></div>
  <div class="wrap">
    <span class="badge">경력 5년 개발자</span>
    <h1>화면 따로,<br>개발자 따로<br><em>쓰지 마세요</em></h1>
    <p class="sub">기획 · 디자인부터<br>예약 · 결제 서버까지</p>
    <div class="deck">
      <div class="d1">${browserFrame(shot("09-corp-home.png"), 150)}</div>
      <div class="d2">${browserFrame(shot("05-clinic-home.png"), 150)}</div>
      <div class="d3">${browserFrame(shot("01-cafe-home.png"), 150)}</div>
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

/* 이미지 제목은 서비스 설명의 소제목을 그대로 쓴다. 글과 이미지가
   같은 문구로 이어지면 스크롤할 때 한 덩어리로 읽힌다. */
const PAGES = [
  {
    id: "01-hook",
    html: `
    <style>${BASE_CSS}
      .glow { position:absolute; inset:0;
        background: radial-gradient(50% 45% at 10% 5%, rgba(91,116,255,.42), transparent 70%),
                    radial-gradient(40% 40% at 95% 25%, rgba(0,211,167,.2), transparent 70%); }
      body { position: relative; }
      h1 { font-size: 62px; }
      h1 em { font-style: normal; color: ${C.accent}; }
      .lead { font-size: 25px; }
    </style>
    <div class="glow"></div>
    <div class="wrap" style="position:relative">
      <h1>화면 따로, 개발자 따로<br><em>쓰지 마세요</em></h1>
      <p class="lead" style="max-width:880px">
        기획과 디자인부터 예약·결제 서버 개발까지 한 사람이 책임지고 완성합니다.
        화면 개발자와 서버 개발자가 다르면 소통 비용과 납품 지연이 생기고,
        결제가 안 된다며 서로 책임을 떠넘기는 일이 흔히 일어납니다.
      </p>
      <div style="margin-top:46px;display:flex;gap:14px;flex-wrap:wrap">
        ${["Next.js", "React", "TypeScript", "Spring Boot", "Java · Kotlin", "MySQL", "AWS"]
          .map((s) => `<span class="chip" style="font-size:19px;padding:13px 26px">${s}</span>`).join("")}
      </div>
    </div>`,
  },

  {
    id: "02-target",
    html: `
    <style>${BASE_CSS}
      .t { padding: 34px 40px; display: flex; gap: 24px; align-items: flex-start; }
      .t .no { font-size: 26px; font-weight: 800; color: ${C.accent}; flex: none; }
      .t p { font-size: 25px; line-height: 1.5; font-weight: 700; }
    </style>
    <div class="wrap">
      <p class="eyebrow">For</p>
      <h2>이런 대표님께 추천합니다</h2>
      <div style="margin-top:44px;display:grid;gap:18px">
        ${[
          "흔한 템플릿 복사 사이트가 아닌, 업종 특성에 맞춘 화면이 필요한 분",
          "PC는 물론 모바일 최적화가 필수적인 분",
          "문의 폼, 예약, 결제가 실제로 안정 동작해야 하는 분",
          "화면과 서버를 따로 발주해 소통하기 번거로운 분",
        ].map((t, i) => `
          <div class="card t">
            <span class="no">0${i + 1}</span>
            <p>${t}</p>
          </div>`).join("")}
      </div>
    </div>`,
  },

  {
    id: "03-cases",
    html: `
    <style>${BASE_CSS}
      .case { margin-top: 34px; }
      .case .meta { display: flex; align-items: baseline; gap: 18px; margin-bottom: 14px; }
      .case h3 { font-size: 32px; }
      .case .cat { font-size: 20px; font-weight: 700; color: ${C.accent}; }
      .case .p { font-size: 20px; margin-top: 8px; max-width: 900px; }
    </style>
    <div class="wrap">
      <p class="eyebrow">Demo</p>
      <h2>실제 동작하는 업종별 데모 사이트</h2>
      <p class="lead" style="max-width:900px;font-size:22px">
        직접 기획하고 제작한 3가지 업종의 데모입니다. 동작 주소는 메시지로 안내해 드립니다.
      </p>
      ${[
        ["카페 / 공방", "라온공방", "감성 브랜딩 화면, 원데이 클래스 일정과 잔여 좌석 안내", "01-cafe-home.png"],
        ["병원 / 클리닉", "바른솔 정형외과의원", "모바일 맞춤 진료 안내, 온라인 예약 및 비급여 항목 안내", "05-clinic-home.png"],
        ["B2B / 스타트업", "Hyperlane", "전문적인 테크 기업 디자인, 국·영문 다국어 전환", "09-corp-home.png"],
      ].map(([cat, brand, note, img]) => `
        <div class="case">
          <div class="meta"><span class="cat">${cat}</span><h3>${brand}</h3></div>
          <p class="p">${note}</p>
          <div style="margin-top:14px">${browserFrame(shot(img), 350)}</div>
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
      <p class="eyebrow">Responsive</p>
      <h2>PC는 물론, 모바일이 더 중요합니다</h2>
      <p class="lead" style="max-width:900px;font-size:23px">
        모바일 화면을 먼저 만들고 데스크톱으로 넓힙니다. 메뉴는 접히고, 표는 가로로
        스크롤되고, 폼은 한 줄씩 내려갑니다. 크롬, 사파리, 엣지에서 모두 확인합니다.
      </p>
      <div class="mob">
        ${["04-cafe-mobile.png", "15-cafe-classes-mobile.png", "08-clinic-mobile.png", "12-corp-mobile.png"]
          .map((f) => browserFrame(shot(f), 700)).join("")}
      </div>
    </div>`,
  },

  {
    id: "05-about",
    html: `
    <style>${BASE_CSS}
      .stat { padding: 34px 38px; }
      .stat .num { font-size: 50px; }
      .stat .num-label { font-size: 18px; margin-top: 10px; }
    </style>
    <div class="wrap">
      <p class="eyebrow">About</p>
      <h2>운영에서 버티는 개발을 합니다</h2>
      <p class="lead" style="max-width:920px;font-size:23px">
        실무 개발 경력 5년 차입니다. 트래픽과 데이터가 몰리는 골프 플랫폼과 애드테크
        서비스에서 백엔드를 담당했습니다. 현재는 광고 데이터 플랫폼에서 수천만 행
        규모의 리포팅 데이터를 다루며, 집계 프로시저 실행시간을 4~10배 단축했습니다.
      </p>
      <div class="grid3" style="margin-top:48px">
        ${[["5년", "실무 경력"], ["수천만 행", "리포팅 데이터"], ["4~10배", "집계 속도 개선"]]
          .map(([v, k]) => `
          <div class="card stat">
            <p class="num" style="font-size:${v.length > 3 ? 38 : 50}px">${v}</p>
            <p class="num-label">${k}</p>
          </div>`).join("")}
      </div>
      <h3 style="margin-top:56px;font-size:30px">함께 맡기실 수 있는 범위</h3>
      <div class="grid3" style="margin-top:24px">
        ${["인증 · 권한", "결제 · 정산", "알림 발송", "예약 · 재고", "관리자 도구", "배치 · 스케줄러"]
          .map((t) => `<div class="card" style="padding:26px 30px"><h3 style="font-size:25px">${t}</h3></div>`).join("")}
      </div>
    </div>`,
  },

  {
    id: "06-safety",
    html: `
    <style>${BASE_CSS}
      .item { padding: 32px 36px; }
      .item h3 { font-size: 27px; }
      .item p { font-size: 19px; color: ${C.muted}; margin-top: 12px; line-height: 1.6; }
    </style>
    <div class="wrap">
      <p class="eyebrow">Safety</p>
      <h2>돈과 자리가 오가는 기능,<br>이렇게 안전하게 만듭니다</h2>
      <p class="lead" style="max-width:900px;font-size:22px">
        결제 오류는 곧 금전 손실과 고객 이탈로 이어집니다. 예외 처리와 테스트로
        검증했습니다.
      </p>
      <div class="grid2" style="margin-top:42px">
        ${[
          ["결제 금액 위조 차단", "클라이언트가 전달한 금액을 신뢰하지 않고, 서버 산정액과 결제사 승인액을 교차 검증합니다."],
          ["초과 판매 및 중복 예약 방지", "정원 10석에 100건이 동시 신청해도 자리가 마이너스가 되지 않도록 동시성을 제어합니다."],
          ["통신 장애 예외 처리", "승인은 됐으나 응답이 유실되어도 예약을 타인에게 재판매하지 않고, 결제사 상태를 재대조해 정상화합니다."],
          ["중복 결제 방지", "결제 중 새로고침이나 중복 클릭으로 인한 다중 청구를 차단합니다."],
        ].map(([t, b]) => `<div class="card item"><h3>${t}</h3><p>${b}</p></div>`).join("")}
      </div>
      <div class="row" style="margin-top:38px">
        ${[["101", "자동화 테스트"], ["8", "화면"], ["3", "결제 반영 경로"]]
          .map(([v, k]) => `
          <div class="card" style="padding:26px 38px">
            <p class="num" style="font-size:40px">${v}</p>
            <p class="num-label" style="font-size:17px">${k}</p>
          </div>`).join("")}
      </div>
    </div>`,
  },

  {
    id: "07-price",
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
      <h2>필요한 만큼만 고르시면 됩니다</h2>
      <div class="grid3" style="margin-top:44px">
        ${[
          ["STANDARD", "66만원", false, ["반응형 5페이지", "문의 폼 수신 연동", "도메인 연결 + 배포", "수정 2회 · 작업 14일"]],
          ["DELUXE", "177만원", true, ["STANDARD 전체 포함", "페이지 8개까지", "예약 신청 기능", "관리자 대시보드", "수정 3회 · 작업 25일"]],
          ["PREMIUM", "297만원", false, ["DELUXE 전체 포함", "PG 결제 연동", "중복 결제 차단", "소스 코드 제공", "수정 4회 · 작업 35일"]],
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
    id: "08-process",
    html: `
    <style>${BASE_CSS}${LIGHT_CSS}
      .step { padding: 30px 34px; }
      .step h3 { font-size: 26px; }
      .step p { font-size: 19px; line-height: 1.6; margin-top: 10px; }
    </style>
    <div class="wrap">
      <p class="eyebrow">Process</p>
      <h2>진행 순서와 안내 사항</h2>
      <div class="grid2" style="margin-top:42px">
        ${[
          ["01  상담 · 견적", "업종과 원하시는 기능을 알려주시면 제작 방식과 기간, 견적을 안내합니다."],
          ["02  구조 설계", "화면 순서와 메뉴 구조를 먼저 잡아 보여드립니다."],
          ["03  디자인 · 퍼블리싱", "모바일 우선으로 만들고 중간에 실제 주소로 보여드립니다."],
          ["04  기능 연동", "문의 폼, 예약, 결제를 붙입니다."],
          ["05  배포 · 인수인계", "도메인을 연결하고 직접 수정하실 수 있는 안내서를 드립니다."],
          ["06  수정 대응", "패키지에 포함된 횟수만큼 수정해 드립니다."],
        ].map(([t, b]) => `
          <div class="card step"><h3>${t}</h3><p class="p">${b}</p></div>`).join("")}
      </div>
      <div class="grid2" style="margin-top:34px">
        <div class="card" style="padding:34px 38px">
          <h3 style="font-size:25px">준비해 주시면 더 좋은 것</h3>
          <p class="p" style="margin-top:14px;font-size:19px;line-height:1.65">
            로고, 매장 및 제품 사진, 소개 문구. 준비되지 않았더라도 임시 소재로
            제작 가능하나, 실제 자료가 있을 때 완성도가 훨씬 높아집니다.
          </p>
        </div>
        <div class="card" style="padding:34px 38px">
          <h3 style="font-size:25px">불포함 내역</h3>
          <p class="p" style="margin-top:14px;font-size:19px;line-height:1.65">
            도메인 구입비와 서버 이용료 (세팅과 연결 작업은 포함), 로고 디자인과
            사진 촬영, PG사 가입 심사, 납품 후 정기 유지보수.
          </p>
        </div>
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
