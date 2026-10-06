"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIALS } from "@/lib/content";
import { MetricsSection } from "./MetricsSection";
import { Reveal } from "./Reveal";
import { StarRow } from "./Star";

function TestimonialCard({ t }: { t: (typeof TESTIMONIALS)[number] }) {
  // Light cards: author + quote on top, stars at the bottom. Dark cards flip that.
  const main = (
    <div className="t-card__main">
      <div className="t-card__who">
        <img src={t.avatar} alt="" width={42} height={42} loading="lazy" decoding="async" />
        <div>
          <p className="t-card__name">{t.name}</p>
          <p className="t-card__role">{t.role}</p>
        </div>
      </div>
      <div className="t-card__text">
        <h3 className="t-card__title">{t.title}</h3>
        <p className="t-card__body">{t.body}</p>
      </div>
    </div>
  );

  return (
    <article className={`t-card${t.dark ? " t-card--dark" : ""}`}>
      {t.dark && <StarRow />}
      {main}
      {!t.dark && <StarRow />}
    </article>
  );
}

export function TestimonialsSection() {
  const viewport = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const step = useCallback(() => {
    const el = viewport.current;
    const item = el?.firstElementChild as HTMLElement | null;
    if (!el || !item) return 0;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    return item.offsetWidth + gap;
  }, []);

  const sync = useCallback(() => {
    const el = viewport.current;
    const s = step();
    if (!el || !s) return;
    setIndex(Math.round(el.scrollLeft / s));
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 2);
  }, [step]);

  useEffect(() => {
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [sync]);

  const go = (dir: 1 | -1) => viewport.current?.scrollBy({ left: dir * step(), behavior: "smooth" });
  const goTo = (i: number) => viewport.current?.scrollTo({ left: i * step(), behavior: "smooth" });

  return (
    <section id="reviews" aria-labelledby="reviews-title">
      <div className="container-x section-pad section-stack">
        <div className="rev-head">
          <Reveal className="rev-head__text">
            <h2 className="t-h2" id="reviews-title">
              Mijozlarimiz nima deydi.
            </h2>
            <p className="t-lead">
              Suv yetkazib berish bizneslari buyurtma, yetkazib berish va to‘lovlarni bitta tizimda boshqaradi.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <a href="#contact" className="btn btn--outline">
              Fikr qoldirish
            </a>
          </Reveal>
        </div>

        <Reveal variant="fade" className="slider">
          <div
            ref={viewport}
            className="slider__viewport"
            role="region"
            aria-roledescription="carousel"
            aria-label="Mijozlar fikrlari"
            tabIndex={0}
            onScroll={sync}
          >
            {TESTIMONIALS.map((t) => (
              <div className="slider__item" key={t.title}>
                <TestimonialCard t={t} />
              </div>
            ))}
          </div>

          <div className="slider__arrows">
            <button type="button" className="slider__arrow" aria-label="Oldingi fikr" disabled={atStart} onClick={() => go(-1)}>
              <ChevronLeft size={16} strokeWidth={2} aria-hidden="true" />
            </button>
            <button type="button" className="slider__arrow" aria-label="Keyingi fikr" disabled={atEnd} onClick={() => go(1)}>
              <ChevronRight size={16} strokeWidth={2} aria-hidden="true" />
            </button>
          </div>

          <div className="slider__dots">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.title}
                type="button"
                aria-label={`${TESTIMONIALS.length} ta fikrdan ${i + 1}-si`}
                aria-current={i === index}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        </Reveal>

        <MetricsSection />
      </div>
    </section>
  );
}
