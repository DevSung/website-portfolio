export type Lang = "ko" | "en";

const ko = {
  nav: {
    product: "제품",
    metrics: "성과",
    process: "도입 절차",
    careers: "채용",
    contact: "도입 문의",
  },
  hero: {
    badge: "물류 운영 데이터 플랫폼",
    title: ["흩어진 배송 데이터를", "한 화면으로"],
    lead: "3PL, 자사몰, 오픈마켓에 흩어진 주문과 배송 상태를 한곳에 모읍니다. 지연을 먼저 찾아 알려드립니다.",
    primary: "도입 문의",
    secondary: "제품 살펴보기",
  },
  problem: {
    eyebrow: "Problem",
    title: "운영팀이 하루에 여는 탭이 몇 개인가요",
    items: [
      {
        title: "채널마다 다른 화면",
        body: "오픈마켓, 자사몰, 택배사 시스템을 따로 확인합니다. 어디서 막혔는지 찾는 데 오전이 갑니다.",
      },
      {
        title: "지연은 늘 뒤늦게 발견",
        body: "고객 문의가 들어온 뒤에 알게 됩니다. 그때는 이미 CS 비용이 발생한 상태입니다.",
      },
      {
        title: "엑셀로 만드는 주간 보고",
        body: "매주 같은 집계를 손으로 맞춥니다. 숫자가 사람마다 다릅니다.",
      },
    ],
  },
  product: {
    eyebrow: "Product",
    title: "네 가지를 대신합니다",
    items: [
      {
        title: "통합 주문 조회",
        body: "채널·창고·택배사를 하나의 주문 단위로 묶어 봅니다. 주문번호 하나로 전 구간을 추적합니다.",
      },
      {
        title: "지연 감지 알림",
        body: "구간별 평균 소요 시간을 학습해 이탈을 찾습니다. 슬랙·이메일로 담당자에게 바로 갑니다.",
      },
      {
        title: "운영 대시보드",
        body: "정시 배송률, 구간별 소요, 반품률을 매일 자동 집계합니다. 보고서를 따로 만들지 않습니다.",
      },
      {
        title: "API · 웹훅",
        body: "기존 ERP·WMS와 양방향으로 연동합니다. 필요한 이벤트만 골라 받습니다.",
      },
    ],
  },
  metrics: {
    eyebrow: "Numbers",
    title: "도입 6개월 기준",
    note: "데모용 예시 수치입니다. 실제 성과는 고객사 운영 환경에 따라 달라집니다.",
    items: [
      { value: 42, suffix: "%", label: "지연 배송 감소" },
      { value: 6.5, suffix: "시간", label: "주간 집계 업무 절감" },
      { value: 99.9, suffix: "%", label: "데이터 수집 성공률" },
      { value: 128, suffix: "개사", label: "연동 채널·택배사" },
    ],
  },
  process: {
    eyebrow: "Process",
    title: "도입은 4주",
    items: [
      { week: "1주", title: "현황 진단", body: "쓰고 있는 채널과 시스템을 목록화합니다." },
      { week: "2주", title: "연동 설정", body: "채널·택배사 계정을 붙이고 데이터를 맞춥니다." },
      { week: "3주", title: "지표 정의", body: "무엇을 지연으로 볼지 팀 기준으로 정합니다." },
      { week: "4주", title: "운영 전환", body: "담당자 교육 후 실사용으로 넘깁니다." },
    ],
  },
  clients: {
    title: "함께 일하는 팀",
    note: "데모용 가상 회사명입니다.",
    names: ["NORDVIEW", "밀레앤코", "STACKPORT", "한결물류", "OKARA", "델타랩스"],
  },
  cta: {
    title: "운영 현황부터 같이 봅니다",
    body: "30분 통화로 지금 쓰는 채널과 병목을 정리해 드립니다. 도입 여부는 그다음에 결정하셔도 됩니다.",
    button: "도입 문의하기",
  },
  footer: {
    blurb: "물류 운영 데이터를 한곳에 모아 지연을 먼저 찾습니다.",
    info: [
      { label: "주소", value: "서울 성동구 성수이로 00, 4층" },
      { label: "문의", value: "hello@example.com" },
      { label: "채용", value: "careers@example.com" },
    ],
    links: { contact: "도입 문의", careers: "채용", index: "포트폴리오 목록" },
  },
  careers: {
    eyebrow: "Careers",
    title: "같이 만들 사람을 찾습니다",
    lead: "현재 6명입니다. 각자 맡은 영역을 끝까지 가져가는 방식으로 일합니다.",
    valuesTitle: "일하는 방식",
    values: [
      { title: "결정은 문서로", body: "회의 대신 문서를 먼저 씁니다. 배경과 대안이 남아야 나중에 되돌릴 수 있습니다." },
      { title: "고객사 방문", body: "직군과 무관하게 분기마다 창고에 나갑니다. 현장을 안 보면 화면을 잘못 만듭니다." },
      { title: "온콜은 나눠서", body: "장애 대응을 특정 인원에게 몰지 않습니다. 순번을 돌리고 회고를 남깁니다." },
    ],
    openTitle: "채용 중",
    apply: "지원하기",
    positions: [
      { role: "백엔드 엔지니어", type: "정규직", place: "서울 성수 · 주 2일 재택", tags: ["Kotlin", "Spring", "PostgreSQL"] },
      { role: "프론트엔드 엔지니어", type: "정규직", place: "서울 성수 · 주 2일 재택", tags: ["TypeScript", "React", "차트"] },
      { role: "운영 매니저", type: "정규직", place: "서울 성수", tags: ["3PL 경험", "데이터 정리"] },
      { role: "제품 디자이너", type: "계약직 6개월", place: "원격 가능", tags: ["B2B", "대시보드"] },
    ],
    perksTitle: "지원하는 것",
    perks: ["주 2일 재택", "장비 선택 지원", "도서·강의 비용", "연 2회 성과 리뷰", "점심 식대"],
  },
  contact: {
    eyebrow: "Contact",
    title: "도입 문의",
    lead: "운영 규모와 쓰고 있는 시스템을 알려주시면, 연동 가능 여부를 먼저 확인해 회신드립니다.",
    submit: "문의 보내기",
    consentText:
      "문의 회신을 위해 담당자 이름, 회사명, 연락처를 수집합니다. 문의 종료 후 1년간 보관하며 이후 파기합니다.",
    doneTitle: "문의가 접수되었습니다",
    doneBody: "영업일 기준 1일 안에 담당자가 회신드립니다.",
    fields: {
      company: "회사명",
      name: "담당자 이름",
      email: "이메일",
      phone: "연락처",
      scale: "월 출고 물량",
      systems: "쓰고 있는 시스템",
      message: "문의 내용",
    },
    scaleOptions: ["1,000건 미만", "1,000 – 10,000건", "10,000 – 50,000건", "50,000건 이상"],
    systemsPlaceholder: "예: 카페24 자사몰, 스마트스토어, 자체 WMS",
    messagePlaceholder: "지금 가장 불편한 부분을 적어주시면 그 부분부터 확인해 회신드립니다.",
    sideTitle: "바로 통화를 원하시면",
    sideBody: "30분 데모 통화를 잡아드립니다. 화면을 보면서 설명하는 편이 빠릅니다.",
    sideMail: "hello@example.com",
  },
};

// as const 를 붙이면 한국어 문장이 리터럴 타입이 되어 영어 사전이
// 그 타입에 들어가지 못한다. 구조만 맞추는 것이 목적이라 넓힌 타입을 쓴다.
type Dict = typeof ko;

const en: Dict = {
  nav: {
    product: "Product",
    metrics: "Results",
    process: "Onboarding",
    careers: "Careers",
    contact: "Contact",
  },
  hero: {
    badge: "Logistics operations data platform",
    title: ["Scattered delivery data,", "on one screen"],
    lead: "Orders and shipment states spread across 3PLs, your own store, and marketplaces — collected in one place. We surface delays before your customers do.",
    primary: "Talk to us",
    secondary: "See the product",
  },
  problem: {
    eyebrow: "Problem",
    title: "How many tabs does your ops team open each morning?",
    items: [
      {
        title: "A different screen per channel",
        body: "Marketplaces, your own store, carrier systems — checked one by one. Finding where a shipment stalled eats the morning.",
      },
      {
        title: "Delays surface too late",
        body: "You hear about them from the customer. By then the support cost is already spent.",
      },
      {
        title: "Weekly reports built in spreadsheets",
        body: "The same aggregation, by hand, every week — and the numbers differ per person.",
      },
    ],
  },
  product: {
    eyebrow: "Product",
    title: "Four things we take over",
    items: [
      {
        title: "Unified order view",
        body: "Channel, warehouse, and carrier tied to a single order. One order number tracks the whole route.",
      },
      {
        title: "Delay detection",
        body: "We learn the normal duration of each leg and flag the outliers. Alerts go straight to Slack or email.",
      },
      {
        title: "Operations dashboard",
        body: "On-time rate, per-leg duration, and return rate aggregated daily. No report to assemble.",
      },
      {
        title: "API and webhooks",
        body: "Two-way integration with your existing ERP and WMS. Subscribe only to the events you need.",
      },
    ],
  },
  metrics: {
    eyebrow: "Numbers",
    title: "Six months after onboarding",
    note: "Illustrative figures for this demo. Actual results depend on each customer's operating environment.",
    items: [
      { value: 42, suffix: "%", label: "fewer delayed shipments" },
      { value: 6.5, suffix: " hrs", label: "weekly reporting saved" },
      { value: 99.9, suffix: "%", label: "data collection success" },
      { value: 128, suffix: "", label: "channels and carriers" },
    ],
  },
  process: {
    eyebrow: "Process",
    title: "Live in four weeks",
    items: [
      { week: "Week 1", title: "Assessment", body: "We list the channels and systems you run today." },
      { week: "Week 2", title: "Integration", body: "Channel and carrier accounts connected, data reconciled." },
      { week: "Week 3", title: "Define metrics", body: "Your team decides what counts as a delay." },
      { week: "Week 4", title: "Handover", body: "Training, then your team runs it." },
    ],
  },
  clients: {
    title: "Teams we work with",
    note: "Fictional company names, for this demo.",
    names: ["NORDVIEW", "MILLE & CO", "STACKPORT", "HANGYEOL", "OKARA", "DELTA LABS"],
  },
  cta: {
    title: "Let's look at your operation first",
    body: "In a 30-minute call we map your channels and bottlenecks. Deciding on the product can come after.",
    button: "Get in touch",
  },
  footer: {
    blurb: "We collect logistics operations data in one place and surface delays early.",
    info: [
      { label: "Office", value: "4F, Seongsui-ro 00, Seongdong-gu, Seoul" },
      { label: "Sales", value: "hello@example.com" },
      { label: "Careers", value: "careers@example.com" },
    ],
    links: { contact: "Contact", careers: "Careers", index: "All demos" },
  },
  careers: {
    eyebrow: "Careers",
    title: "We're hiring",
    lead: "Six people today. Each owns an area end to end.",
    valuesTitle: "How we work",
    values: [
      { title: "Decisions in writing", body: "A document before a meeting. Context and alternatives have to survive so a decision can be revisited." },
      { title: "Visit the warehouse", body: "Every quarter, whatever your role. Build screens without seeing the floor and you build the wrong ones." },
      { title: "On-call is shared", body: "Incident response isn't one person's job. We rotate and write the retro." },
    ],
    openTitle: "Open roles",
    apply: "Apply",
    positions: [
      { role: "Backend Engineer", type: "Full-time", place: "Seoul · 2 days remote", tags: ["Kotlin", "Spring", "PostgreSQL"] },
      { role: "Frontend Engineer", type: "Full-time", place: "Seoul · 2 days remote", tags: ["TypeScript", "React", "Charts"] },
      { role: "Operations Manager", type: "Full-time", place: "Seoul", tags: ["3PL background", "Data hygiene"] },
      { role: "Product Designer", type: "6-month contract", place: "Remote friendly", tags: ["B2B", "Dashboards"] },
    ],
    perksTitle: "What we cover",
    perks: ["2 days remote", "Your choice of hardware", "Books and courses", "Reviews twice a year", "Lunch stipend"],
  },
  contact: {
    eyebrow: "Contact",
    title: "Talk to us",
    lead: "Tell us your volume and the systems you run — we check what we can integrate and come back to you.",
    submit: "Send",
    consentText:
      "We collect your name, company, and contact details to reply to this enquiry. Retained for one year after the enquiry closes, then deleted.",
    doneTitle: "Thanks — we've got it",
    doneBody: "Someone will reply within one business day.",
    fields: {
      company: "Company",
      name: "Your name",
      email: "Email",
      phone: "Phone",
      scale: "Monthly shipment volume",
      systems: "Systems in use",
      message: "How can we help?",
    },
    scaleOptions: ["Under 1,000", "1,000 – 10,000", "10,000 – 50,000", "Over 50,000"],
    systemsPlaceholder: "e.g. Shopify store, marketplace, in-house WMS",
    messagePlaceholder: "Tell us the part that hurts most right now and we'll start there.",
    sideTitle: "Prefer a call?",
    sideBody: "We'll book a 30-minute demo. It's faster with the screen in front of you.",
    sideMail: "hello@example.com",
  },
};

export const DICT: Record<Lang, Dict> = { ko, en };
