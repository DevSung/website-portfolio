import type { Metadata } from "next";
import DemoBar from "@/components/ui/DemoBar";
import SiteFooter from "@/components/ui/SiteFooter";
import SiteHeader from "@/components/ui/SiteHeader";

export const metadata: Metadata = {
  // 가상 의료기관이 검색에 노출되면 실제 환자가 오해한다. 반드시 막는다.
  robots: { index: false, follow: false },
  title: "바른솔 정형외과의원",
  description:
    "무릎·어깨·척추 통증의 원인부터 확인합니다. 병원·클리닉 업종 웹사이트 데모입니다.",
};

const NAV = [
  { label: "진료과목", href: "/clinic#departments" },
  { label: "의료진", href: "/clinic/doctors" },
  { label: "진료시간", href: "/clinic#hours" },
  { label: "비급여 안내", href: "/clinic#non-covered" },
  { label: "오시는 길", href: "/clinic#visit" },
];

export default function ClinicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="theme-clinic bg-surface text-ink">
      <SiteHeader
        brand="바른솔 정형외과의원"
        home="/clinic"
        nav={NAV}
        cta={{ label: "온라인 예약", href: "/clinic/reserve" }}
      />
      {children}
      <SiteFooter
        brand="바른솔 정형외과의원"
        blurb="통증의 원인을 나누어 확인하고, 필요한 치료만 안내합니다."
        info={[
          { label: "주소", value: "서울 강남구 테헤란로 000, 5층" },
          { label: "대표번호", value: "02-000-0000" },
          { label: "진료시간", value: "평일 09:00 – 18:30 / 토 09:00 – 13:00" },
        ]}
        nav={[
          { label: "온라인 예약", href: "/clinic/reserve" },
          { label: "의료진 소개", href: "/clinic/doctors" },
          { label: "포트폴리오 목록", href: "/" },
        ]}
        note="본 화면의 의료기관명·의료진·주소·연락처는 모두 가상입니다. 실제 의료광고로 사용하려면 의료법 제56조에 따른 사전심의 대상 여부 검토와 전문가 확인을 권장합니다."
      />
      <DemoBar current="clinic" />
    </div>
  );
}
