"use client";

import SiteFooter from "@/components/ui/SiteFooter";
import SiteHeader from "@/components/ui/SiteHeader";
import { LangToggle, useLang } from "./LangContext";

/** 헤더·푸터도 언어를 따라야 해서 클라이언트 컴포넌트로 감싼다. */
export function CorpHeader() {
  const { t } = useLang();
  return (
    <SiteHeader
      brand="Hyperlane"
      home="/corp"
      nav={[
        { label: t.nav.product, href: "/corp#product" },
        { label: t.nav.metrics, href: "/corp#metrics" },
        { label: t.nav.process, href: "/corp#process" },
        { label: t.nav.careers, href: "/corp/careers" },
      ]}
      cta={{ label: t.nav.contact, href: "/corp/contact" }}
      extra={<LangToggle />}
    />
  );
}

export function CorpFooter() {
  const { t } = useLang();
  return (
    <SiteFooter
      brand="Hyperlane"
      blurb={t.footer.blurb}
      info={t.footer.info}
      nav={[
        { label: t.footer.links.contact, href: "/corp/contact" },
        { label: t.footer.links.careers, href: "/corp/careers" },
        { label: t.footer.links.index, href: "/" },
      ]}
    />
  );
}
