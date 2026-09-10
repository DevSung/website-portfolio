"use client";

import ContactForm from "@/components/ui/ContactForm";
import Reveal from "@/components/ui/Reveal";
import { Container, Section, SectionHead } from "@/components/ui/Section";
import { useLang } from "../LangContext";

export default function CorpContactPage() {
  const { t, lang } = useLang();
  const f = t.contact.fields;

  return (
    <main>
      <Section tone="surface-2" className="pt-14 pb-16 sm:pt-20">
        <Container>
          <SectionHead
            eyebrow={t.contact.eyebrow}
            title={t.contact.title}
            lead={t.contact.lead}
          />
        </Container>
      </Section>

      <Section className="pt-16">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <Reveal>
              {/* 언어를 바꾸면 라벨만 갈아끼우는 게 아니라 폼 상태도 리셋되는
                  편이 낫다. key 에 lang 을 넣어 새 인스턴스를 만든다. */}
              <ContactForm
                key={lang}
                submitLabel={t.contact.submit}
                consent={t.contact.consentText}
                doneTitle={t.contact.doneTitle}
                doneBody={t.contact.doneBody}
                fields={[
                  { name: "company", label: f.company, required: true },
                  { name: "name", label: f.name, required: true },
                  { name: "email", label: f.email, type: "email", required: true },
                  { name: "phone", label: f.phone, type: "tel" },
                  {
                    name: "scale",
                    label: f.scale,
                    type: "select",
                    required: true,
                    options: t.contact.scaleOptions,
                  },
                  {
                    name: "systems",
                    label: f.systems,
                    placeholder: t.contact.systemsPlaceholder,
                  },
                  {
                    name: "message",
                    label: f.message,
                    type: "textarea",
                    placeholder: t.contact.messagePlaceholder,
                  },
                ]}
              />
            </Reveal>

            <Reveal delay={120}>
              <div className="rounded-2xl border border-line bg-surface-2 p-7">
                <h3 className="font-bold">{t.contact.sideTitle}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  {t.contact.sideBody}
                </p>
                <a
                  href={`mailto:${t.contact.sideMail}`}
                  className="mt-6 block rounded-full bg-brand py-3.5 text-center text-sm font-semibold text-brand-ink"
                >
                  {t.contact.sideMail}
                </a>
              </div>

              <dl className="mt-8 divide-y divide-line border-y border-line">
                {t.footer.info.map((i) => (
                  <div key={i.label} className="flex gap-5 py-4">
                    <dt className="w-24 shrink-0 text-sm text-muted">
                      {i.label}
                    </dt>
                    <dd className="text-sm leading-relaxed font-medium">
                      {i.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </Container>
      </Section>
    </main>
  );
}
