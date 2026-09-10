import type { Metadata } from "next";
import { Geist, Nanum_Myeongjo, Noto_Sans_KR } from "next/font/google";
import "./globals.css";

// Noto Sans KR은 구글이 unicode-range 로 잘게 쪼개 서비스한다.
// subsets에 "latin"만 넣어도 한글 청크까지 함께 내려오고, 브라우저는
// 실제로 쓰인 글자 범위만 받는다.
const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

// 카페·공방 사이트의 제목용. 본문에는 쓰지 않으므로 preload는 끈다.
const nanumMyeongjo = Nanum_Myeongjo({
  variable: "--font-nanum-myeongjo",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  preload: false,
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "웹사이트 제작 포트폴리오",
    template: "%s · 웹사이트 제작 포트폴리오",
  },
  description:
    "업종별 반응형 웹사이트 데모 3종. Next.js · TypeScript · Tailwind CSS로 제작한 제작 사례입니다.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ko"
      className={`${notoSansKr.variable} ${nanumMyeongjo.variable} ${geist.variable} h-full`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
