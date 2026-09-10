import Link from "next/link";
import { Container } from "./Section";

export type FooterInfo = { label: string; value: string };

export default function SiteFooter({
  brand,
  blurb,
  info,
  nav,
  note,
}: {
  brand: string;
  blurb: string;
  info: FooterInfo[];
  nav?: { label: string; href: string }[];
  /** 업종별 고지 (의료광고, 데모 안내 등) */
  note?: string;
}) {
  return (
    <footer className="border-t border-line bg-surface-2 pt-16 pb-28 text-ink">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="text-lg font-bold">{brand}</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              {blurb}
            </p>
          </div>

          <dl className="space-y-2.5 text-sm">
            {info.map((i) => (
              <div key={i.label} className="flex gap-3">
                <dt className="w-20 shrink-0 text-muted">{i.label}</dt>
                <dd className="font-medium">{i.value}</dd>
              </div>
            ))}
          </dl>

          {nav && (
            <ul className="space-y-2.5 text-sm">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="text-muted transition-colors hover:text-ink"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-12 border-t border-line pt-6">
          {note && (
            <p className="text-xs leading-relaxed text-muted">{note}</p>
          )}
          <p className="mt-3 text-xs text-muted">
            이 사이트는 웹사이트 제작 역량을 보여주기 위한 가상 브랜드 데모입니다.
            실제 사업자와 무관합니다.
          </p>
        </div>
      </Container>
    </footer>
  );
}
