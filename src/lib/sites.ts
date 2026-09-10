export type SiteKey = "cafe" | "clinic" | "corp";

export type SiteMeta = {
  key: SiteKey;
  /** 데모용 가상 브랜드명 */
  brand: string;
  category: string;
  tagline: string;
  /** 이 업종에서 실제로 요구되는 것 — 상세페이지 설명용 */
  focus: string[];
  themeClass: string;
  /** 인덱스 카드 미리보기 색 */
  swatch: [string, string, string];
};

export const SITES: SiteMeta[] = [
  {
    key: "cafe",
    brand: "라온공방",
    category: "카페 · 공방 · 스튜디오",
    tagline: "가죽과 커피, 하루의 결을 만드는 곳",
    focus: [
      "브랜드 무드가 첫 화면에서 전달되어야 한다",
      "클래스 일정과 잔여석을 보여줘야 문의가 줄어든다",
      "인스타그램에서 넘어온 모바일 방문자가 대부분",
    ],
    themeClass: "theme-cafe",
    swatch: ["#6b4a32", "#c1734a", "#f2e8dd"],
  },
  {
    key: "clinic",
    brand: "바른솔 정형외과의원",
    category: "병원 · 클리닉",
    tagline: "통증의 원인부터 찾습니다",
    focus: [
      "진료과목·의료진 정보를 빠르게 찾게 해야 한다",
      "전화 대신 비대면 예약으로 응대 부담을 줄인다",
      "의료광고 사전심의를 통과할 수 있는 문구 구조",
    ],
    themeClass: "theme-clinic",
    swatch: ["#1b5fa8", "#2fa8a0", "#f1f6fc"],
  },
  {
    key: "corp",
    brand: "Hyperlane",
    category: "기업 · 스타트업",
    tagline: "물류 데이터를 한 화면에",
    focus: [
      "투자자·고객사·지원자가 같은 사이트를 본다",
      "지표와 도입 절차가 신뢰를 만든다",
      "한국어 / 영어 전환이 사실상 필수",
    ],
    themeClass: "theme-corp",
    swatch: ["#5b74ff", "#00d3a7", "#141826"],
  },
];

export const siteOf = (key: SiteKey) => SITES.find((s) => s.key === key)!;
