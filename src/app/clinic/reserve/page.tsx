import type { Metadata } from "next";
import ContactForm from "@/components/ui/ContactForm";
import MapBlock from "@/components/ui/MapBlock";
import Reveal from "@/components/ui/Reveal";
import { Container, Section, SectionHead } from "@/components/ui/Section";
import { DEPARTMENTS, HOURS } from "@/lib/clinic-data";

export const metadata: Metadata = {
  title: "온라인 예약",
  description: "바른솔 정형외과의원 온라인 진료 예약.",
};

export default function ReservePage() {
  return (
    <main>
      <Section tone="surface-2" className="pt-14 pb-16 sm:pt-20">
        <Container>
          <SectionHead
            eyebrow="예약"
            title="온라인 예약"
            lead="접수 순서를 미리 잡아 대기 시간을 줄입니다. 확정은 진료시간 내 전화로 안내드립니다."
          />
        </Container>
      </Section>

      <Section className="pt-16">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <Reveal>
              <ContactForm
                submitLabel="예약 신청"
                consent="진료 예약 확인을 위해 이름과 연락처를 수집합니다. 예약 처리 후 6개월간 보관하며 이후 파기합니다. 동의를 거부하실 수 있으나 이 경우 온라인 예약은 이용할 수 없습니다."
                doneTitle="예약 신청이 접수되었습니다"
                doneBody="진료시간 내 확인 후 문자로 확정 안내를 드립니다. 급한 경우 02-000-0000으로 전화 주세요."
                fields={[
                  { name: "name", label: "이름", required: true, placeholder: "홍길동" },
                  {
                    name: "phone",
                    label: "연락처",
                    type: "tel",
                    required: true,
                    placeholder: "010-0000-0000",
                  },
                  {
                    name: "visit",
                    label: "구분",
                    type: "select",
                    required: true,
                    options: ["초진 (첫 방문)", "재진", "타 병원 영상 지참"],
                  },
                  {
                    name: "part",
                    label: "불편한 부위",
                    type: "select",
                    required: true,
                    options: DEPARTMENTS.map((d) => d.name),
                  },
                  { name: "date", label: "희망 날짜", type: "date", required: true },
                  {
                    name: "time",
                    label: "희망 시간대",
                    type: "select",
                    required: true,
                    options: [
                      "오전 09:00 – 11:00",
                      "오전 11:00 – 13:00",
                      "오후 14:00 – 16:00",
                      "오후 16:00 – 18:30",
                    ],
                  },
                  {
                    name: "symptom",
                    label: "증상",
                    type: "textarea",
                    placeholder:
                      "언제부터, 어떤 동작에서 아픈지 적어주시면 진료 시간이 줄어듭니다.",
                  },
                ]}
              />
            </Reveal>

            <Reveal delay={120} className="space-y-8">
              <div className="rounded-2xl border border-line bg-surface-2 p-7">
                <h3 className="font-bold">전화 예약</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  당일 예약이나 일정 변경은 전화가 빠릅니다.
                </p>
                <a
                  href="tel:0200000000"
                  className="mt-5 block rounded-full bg-brand py-3.5 text-center text-sm font-semibold text-brand-ink"
                >
                  02-000-0000
                </a>
              </div>

              <div>
                <h3 className="text-sm font-bold tracking-wide text-brand">
                  진료시간
                </h3>
                <dl className="mt-4 divide-y divide-line border-y border-line">
                  {HOURS.map((h) => (
                    <div key={h.day} className="flex justify-between gap-4 py-3.5">
                      <dt className="text-sm text-muted">{h.day}</dt>
                      <dd className="text-sm font-semibold tabular-nums">
                        {h.time}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="rounded-2xl border border-line bg-surface-2 p-6">
                <h3 className="text-sm font-bold">가져오시면 좋은 것</h3>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
                  <li>· 신분증 (건강보험 적용)</li>
                  <li>· 타 병원 영상 CD·판독지 (있는 경우)</li>
                  <li>· 복용 중인 약 목록</li>
                </ul>
              </div>

              <MapBlock
                address="서울 강남구 테헤란로 000, 5층"
                hint="2호선 역삼역 3번 출구 도보 5분."
              />
            </Reveal>
          </div>
        </Container>
      </Section>
    </main>
  );
}
