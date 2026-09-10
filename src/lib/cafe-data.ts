export type ClassItem = {
  slug: string;
  name: string;
  summary: string;
  duration: string;
  price: number;
  capacity: number;
  taken: number;
  level: "입문" | "초급" | "중급";
  includes: string[];
};

export const CLASSES: ClassItem[] = [
  {
    slug: "signature-wallet",
    name: "시그니처 반지갑",
    summary:
      "이탈리아 베지터블 가죽으로 반지갑 한 점을 완성합니다. 이니셜 각인까지 포함입니다.",
    duration: "3시간",
    price: 50000,
    capacity: 6,
    taken: 4,
    level: "입문",
    includes: ["가죽·부자재 전량", "이니셜 각인", "핸드드립 커피 1잔", "포장 상자"],
  },
  {
    slug: "card-case",
    name: "미니 카드지갑",
    summary:
      "처음 오시는 분께 권합니다. 재단된 가죽으로 바느질만 배워도 한 점이 나옵니다.",
    duration: "1시간 30분",
    price: 32000,
    capacity: 8,
    taken: 8,
    level: "입문",
    includes: ["가죽·부자재 전량", "이니셜 각인", "음료 1잔"],
  },
  {
    slug: "tote-bag",
    name: "데일리 토트백",
    summary:
      "재단부터 마감까지 직접 합니다. 가죽 두께와 손잡이 길이를 골라 만듭니다.",
    duration: "6시간 (2회 분할 가능)",
    price: 145000,
    capacity: 4,
    taken: 1,
    level: "중급",
    includes: ["가죽 선택 3종", "금속 부자재", "음료·간식", "보관용 더스트백"],
  },
];

export const MENU = [
  { group: "핸드드립", items: [
    { name: "에티오피아 구지", note: "자스민, 복숭아", price: 6500 },
    { name: "콜롬비아 우일라", note: "카카오, 흑설탕", price: 6000 },
  ]},
  { group: "에스프레소", items: [
    { name: "라온 라떼", note: "고소한 기본 배합", price: 5500 },
    { name: "흑임자 라떼", note: "직접 볶은 흑임자", price: 6500 },
  ]},
  { group: "디저트", items: [
    { name: "레몬 파운드", note: "당일 소진", price: 5000 },
    { name: "쑥 스콘", note: "클로티드 크림 곁들임", price: 5500 },
  ]},
];

export const FAQ = [
  {
    q: "가죽공예를 한 번도 해본 적 없어도 되나요?",
    a: "입문 클래스는 모두 처음 오시는 분 기준으로 진행합니다. 도구 쓰는 법부터 알려드리고, 바느질이 어려우면 옆에서 같이 잡아드립니다.",
  },
  {
    q: "당일 예약도 되나요?",
    a: "잔여석이 있으면 가능합니다. 다만 가죽을 미리 재단해 두어야 하는 클래스가 있어 전화로 확인 후 오시는 편이 확실합니다.",
  },
  {
    q: "만든 제품은 바로 가져갈 수 있나요?",
    a: "네. 클래스 시간 안에 완성해서 포장까지 해드립니다. 토트백은 2회로 나눠 진행하는 경우 두 번째 방문 때 가져가십니다.",
  },
  {
    q: "예약 변경이나 취소는 어떻게 하나요?",
    a: "수업 3일 전까지는 전액 환불, 2일 전 50%, 당일 취소는 환불이 어렵습니다. 가죽을 미리 재단하기 때문입니다. 일정 변경은 한 번까지 무료입니다.",
  },
  {
    q: "주차가 되나요?",
    a: "건물 자체 주차장은 없습니다. 도보 3분 거리 공영주차장을 이용하시면 2시간 무료 정산을 도와드립니다.",
  },
];

export const won = (n: number) => `${n.toLocaleString("ko-KR")}원`;
