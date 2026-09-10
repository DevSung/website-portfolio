import type { Metadata } from "next";
import ContactForm from "@/components/ui/ContactForm";
import MapBlock from "@/components/ui/MapBlock";
import Reveal from "@/components/ui/Reveal";
import { Container, Section, SectionHead } from "@/components/ui/Section";
import { CLASSES } from "@/lib/cafe-data";

export const metadata: Metadata = {
  title: "예약 · 문의",
  description: "라온공방 클래스 예약 및 문의.",
};

export default function CafeContactPage() {
  return (
    <main>
      <Section tone="surface-2" className="pt-14 pb-16 sm:pt-20">
        <Container>
          <SectionHead
            display
            eyebrow="Reservation"
            title="예약 · 문의"
            lead="남겨주시면 영업시간 내 한 시간 안에 문자로 답을 드립니다."
          />
        </Container>
      </Section>

      <Section className="pt-16">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <Reveal>
              <ContactForm
                submitLabel="예약 신청하기"
                consent="예약 상담을 위해 이름과 연락처를 수집합니다. 상담 종료 후 3개월간 보관하며, 이후 파기합니다."
                doneTitle="예약 신청이 접수되었습니다"
                doneBody="영업시간 내 한 시간 안에 문자로 확정 안내를 드립니다."
                fields={[
                  {
                    name: "name",
                    label: "이름",
                    required: true,
                    placeholder: "홍길동",
                  },
                  {
                    name: "phone",
                    label: "연락처",
                    type: "tel",
                    required: true,
                    placeholder: "010-0000-0000",
                  },
                  {
                    name: "class",
                    label: "희망 클래스",
                    type: "select",
                    required: true,
                    options: CLASSES.map((c) => c.name),
                  },
                  {
                    name: "date",
                    label: "희망 날짜",
                    type: "date",
                    required: true,
                  },
                  {
                    name: "people",
                    label: "인원",
                    type: "select",
                    required: true,
                    options: ["1명", "2명", "3명", "4명 이상"],
                  },
                  {
                    name: "message",
                    label: "남기실 말씀",
                    type: "textarea",
                    placeholder:
                      "가죽 색 선호, 도착 예정 시간, 선물 포장 여부 등 알려주시면 미리 준비합니다.",
                  },
                ]}
              />
            </Reveal>

            <Reveal delay={120} className="space-y-8">
              <div className="rounded-2xl border border-line bg-surface-2 p-7">
                <h3 className="font-[family-name:var(--font-serif-kr)] text-lg font-bold">
                  전화가 빠릅니다
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  당일 예약이나 급한 일정 변경은 전화로 연락 주세요.
                </p>
                <a
                  href="tel:0200000000"
                  className="mt-5 block rounded-full bg-brand py-3.5 text-center text-sm font-semibold text-brand-ink"
                >
                  02-000-0000
                </a>
              </div>

              <dl className="divide-y divide-line border-y border-line">
                {[
                  ["영업시간", "화–일 11:00 – 21:00"],
                  ["휴무", "매주 월요일"],
                  ["환불", "3일 전 전액 · 2일 전 50% · 당일 불가"],
                ].map(([k, v]) => (
                  <div key={k} className="flex gap-5 py-4">
                    <dt className="w-16 shrink-0 text-sm text-muted">{k}</dt>
                    <dd className="text-sm leading-relaxed font-medium">{v}</dd>
                  </div>
                ))}
              </dl>

              <MapBlock
                address="서울 마포구 연남로 00길 12, 1층"
                hint="경의선숲길 출구에서 도보 4분."
              />
            </Reveal>
          </div>
        </Container>
      </Section>
    </main>
  );
}
