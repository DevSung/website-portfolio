"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** ms. 같은 줄의 카드들을 순차로 띄울 때 사용 */
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
  /** 앵커 링크 대상으로 쓸 때 */
  id?: string;
};

export default function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
  id,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // 이미 화면 안이면(새로고침, 앵커 진입) 관찰 없이 바로 띄운다.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShown(true);
        io.disconnect();
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      id={id}
      className={`reveal ${className}`}
      data-shown={shown}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
