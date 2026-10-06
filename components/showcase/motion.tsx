"use client";

import { useEffect, useRef, useState } from "react";

/** Adds `is-in` once the element enters the viewport; showcase.css keys every entry animation off it. */
export function InView({
  children,
  className = "",
  as = "div",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article";
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.disconnect();
          }
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const Tag = as as React.ElementType;
  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}

function format(v: number, decimals: number, group: boolean) {
  const s = v.toFixed(decimals);
  if (!group) return s;
  const [int, dec] = s.split(".");
  const g = int.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return dec ? `${g}.${dec}` : g;
}

/**
 * Counts up to `to` once, the first time it scrolls into view. Server/no-JS render shows the final
 * value; reduced motion skips the count.
 */
export function CountUp({
  to,
  decimals = 0,
  group = true,
  prefix = "",
  suffix = "",
  duration = 1200,
}: {
  to: number;
  decimals?: number;
  group?: boolean;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [val, setVal] = useState(to);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) return; // already visible on load: keep final
    setVal(0);
    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / duration);
          const e = 1 - Math.pow(1 - p, 3);
          setVal(to * e);
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);
  return (
    <span ref={ref}>
      {prefix}
      {format(val, decimals, group)}
      {suffix}
    </span>
  );
}
