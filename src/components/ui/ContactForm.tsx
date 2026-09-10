"use client";

import { useState } from "react";

export type FieldDef = {
  name: string;
  label: string;
  type?: "text" | "tel" | "email" | "date" | "textarea" | "select";
  options?: string[];
  required?: boolean;
  placeholder?: string;
};

type Props = {
  fields: FieldDef[];
  submitLabel: string;
  /** 개인정보 수집·이용 동의 문구 (업종별로 다름) */
  consent: string;
  /** 제출 후 안내 */
  doneTitle: string;
  doneBody: string;
};

/** 객체에서 키 하나를 뺀 새 객체. 구조분해로 버리는 관용구보다 의도가 분명하다. */
function omit<T extends object>(obj: T, key: string) {
  const next = { ...obj };
  delete (next as Record<string, unknown>)[key];
  return next;
}

const isPhone = (v: string) => /^0\d{1,2}-?\d{3,4}-?\d{4}$/.test(v.trim());
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

export default function ContactForm({
  fields,
  submitLabel,
  consent,
  doneTitle,
  doneBody,
}: Props) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");

  const set = (name: string, v: string) => {
    setValues((prev) => ({ ...prev, [name]: v }));
    if (errors[name]) setErrors((prev) => omit(prev, name));
  };

  const validate = () => {
    const next: Record<string, string> = {};
    for (const f of fields) {
      const v = (values[f.name] ?? "").trim();
      if (f.required && !v) {
        next[f.name] = `${f.label}을(를) 입력해 주세요.`;
        continue;
      }
      if (!v) continue;
      if (f.type === "tel" && !isPhone(v)) next[f.name] = "연락처 형식을 확인해 주세요.";
      if (f.type === "email" && !isEmail(v)) next[f.name] = "이메일 형식을 확인해 주세요.";
    }
    if (!agreed) next.__consent = "개인정보 수집·이용에 동의해 주세요.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setState("sending");
    // 데모에는 수신 서버가 없다. 실제 납품에서는 이 자리에 메일 발송 또는
    // 관리자 페이지 저장이 들어간다.
    await new Promise((r) => setTimeout(r, 700));
    setState("done");
  };

  if (state === "done") {
    return (
      <div className="rounded-2xl border border-line bg-surface-2 p-8 text-center sm:p-10">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-brand text-brand-ink">
          <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden>
            <path
              d="M4 10.5 8 14.5 16 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="mt-5 text-xl font-bold">{doneTitle}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{doneBody}</p>
        <p className="mt-6 text-xs text-muted">
          데모 화면이라 실제로 전송되지는 않았습니다.
        </p>
        <button
          type="button"
          onClick={() => {
            setValues({});
            setAgreed(false);
            setState("idle");
          }}
          className="mt-4 text-sm font-semibold text-brand underline underline-offset-4"
        >
          다시 입력해 보기
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="grid gap-5">
      {fields.map((f) => {
        const err = errors[f.name];
        const base = `w-full rounded-xl border bg-surface px-4 py-3 text-base outline-none transition-colors placeholder:text-muted/70 focus:border-brand ${
          err ? "border-red-400" : "border-line"
        }`;
        return (
          <div key={f.name} className={f.type === "textarea" ? "sm:col-span-2" : ""}>
            <label
              htmlFor={f.name}
              className="mb-2 block text-sm font-semibold"
            >
              {f.label}
              {f.required && (
                <span aria-hidden className="ml-1 text-accent">
                  *
                </span>
              )}
            </label>

            {f.type === "textarea" ? (
              <textarea
                id={f.name}
                rows={5}
                className={base}
                placeholder={f.placeholder}
                value={values[f.name] ?? ""}
                onChange={(e) => set(f.name, e.target.value)}
                aria-invalid={!!err}
                aria-required={f.required}
              />
            ) : f.type === "select" ? (
              <select
                id={f.name}
                className={base}
                value={values[f.name] ?? ""}
                onChange={(e) => set(f.name, e.target.value)}
                aria-invalid={!!err}
                aria-required={f.required}
              >
                <option value="">선택해 주세요</option>
                {f.options?.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={f.name}
                type={f.type ?? "text"}
                inputMode={f.type === "tel" ? "tel" : undefined}
                className={base}
                placeholder={f.placeholder}
                value={values[f.name] ?? ""}
                onChange={(e) => set(f.name, e.target.value)}
                aria-invalid={!!err}
                aria-required={f.required}
              />
            )}

            {err && <p className="mt-1.5 text-sm text-red-500">{err}</p>}
          </div>
        );
      })}

      <div className="rounded-xl border border-line bg-surface-2 p-4">
        <label
          htmlFor="consent"
          className="flex cursor-pointer items-start gap-3 text-sm"
        >
          <input
            id="consent"
            type="checkbox"
            checked={agreed}
            aria-label="개인정보 수집·이용 동의"
            aria-describedby="consent-detail"
            onChange={(e) => {
              setAgreed(e.target.checked);
              if (e.target.checked)
                setErrors((prev) => omit(prev, "__consent"));
            }}
            className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--color-brand)]"
          />
          <span id="consent-detail" className="leading-relaxed text-muted">
            {consent}
          </span>
        </label>
        {errors.__consent && (
          <p className="mt-2 text-sm text-red-500">{errors.__consent}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={state === "sending"}
        className="rounded-full bg-brand px-8 py-4 text-base font-semibold text-brand-ink transition-transform hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-60"
      >
        {state === "sending" ? "전송 중…" : submitLabel}
      </button>
    </form>
  );
}
