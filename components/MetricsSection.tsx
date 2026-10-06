"use client";

import { Fragment, useLayoutEffect, useRef, useState } from "react";
import { METRICS } from "@/lib/content";

type Metric = (typeof METRICS)[number];

const fmt = (m: Metric, n: number) => `${n.toFixed(m.decimals)}${m.suffix}`;

/** Counts from `from` to `value` once, the first time it scrolls into view. */
function Counter({ m }: { m: Metric }) {
  const ref = useRef<HTMLDivElement>(null);
  const final = fmt(m, m.value);
  // Server + first client render show the final value, so it is correct without JS.
  const [shown, setShown] = useState(final);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || typeof IntersectionObserver === "undefined") {
      return;
    }
    setShown(fmt(m, m.from));

    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const duration = 2000;
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setShown(p < 1 ? fmt(m, m.from + (m.value - m.from) * eased) : final);
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [m, final]);

  return (
    <div ref={ref} className="metric__num" role="img" aria-label={`${final} ${m.label}`}>
      {/* invisible copy of the final value reserves the width so the layout never shifts */}
      <span aria-hidden="true">{final}</span>
      <output aria-hidden="true">{shown}</output>
    </div>
  );
}

export function MetricsSection() {
  return (
    <div className="metrics">
      {METRICS.map((m, i) => (
        <Fragment key={m.label}>
          {i > 0 && <span className="metrics__sep" aria-hidden="true" />}
          <div className="metric">
            <Counter m={m} />
            <p className="metric__label">{m.label}</p>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
