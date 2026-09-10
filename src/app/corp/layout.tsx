import type { Metadata } from "next";
import DemoBar from "@/components/ui/DemoBar";
import { CorpFooter, CorpHeader } from "./CorpShell";
import { LangProvider } from "./LangContext";

export const metadata: Metadata = {
  title: "Hyperlane",
  description:
    "물류 운영 데이터 플랫폼. 기업·스타트업 업종 웹사이트 데모입니다. 한국어/영어 전환을 포함합니다.",
};

export default function CorpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LangProvider>
      <div className="theme-corp bg-surface text-ink">
        <CorpHeader />
        {children}
        <CorpFooter />
        <DemoBar current="corp" />
      </div>
    </LangProvider>
  );
}
