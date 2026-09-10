import type { Metadata } from "next";
import DemoBar from "@/components/ui/DemoBar";
import SiteFooter from "@/components/ui/SiteFooter";
import SiteHeader from "@/components/ui/SiteHeader";

export const metadata: Metadata = {
  title: "라온공방",
  description:
    "가죽공예 원데이 클래스와 핸드드립 커피. 카페·공방·스튜디오 업종 웹사이트 데모입니다.",
};

const NAV = [
  { label: "공방 소개", href: "/cafe#story" },
  { label: "클래스", href: "/cafe/classes" },
  { label: "메뉴", href: "/cafe#menu" },
  { label: "오시는 길", href: "/cafe#visit" },
];

export default function CafeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="theme-cafe bg-surface text-ink">
      <SiteHeader
        brand="라온공방"
        home="/cafe"
        nav={NAV}
        cta={{ label: "클래스 예약", href: "/cafe/contact" }}
        display
      />
      {children}
      <SiteFooter
        brand="라온공방"
        blurb="가죽과 커피를 한자리에서. 손으로 만드는 하루를 제안합니다."
        info={[
          { label: "주소", value: "서울 마포구 연남로 00길 12, 1층" },
          { label: "영업시간", value: "11:00 – 21:00 (월 휴무)" },
          { label: "전화", value: "02-000-0000" },
        ]}
        nav={[
          { label: "클래스 일정", href: "/cafe/classes" },
          { label: "예약·문의", href: "/cafe/contact" },
          { label: "포트폴리오 목록", href: "/" },
        ]}
      />
      <DemoBar current="cafe" />
    </div>
  );
}
