"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { FAQS } from "@/lib/content";
import { Reveal } from "./Reveal";

/** Independent accordion: any number of rows can stay open. */
export function FAQSection() {
  const [open, setOpen] = useState<ReadonlySet<number>>(new Set());
  const uid = useId();

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <section id="faq" aria-labelledby="faq-title">
      <div className="container-x section-pad">
        <div className="faq-wrap">
          <div className="faq-head">
            <Reveal className="faq-head__text">
              <div className="faq-head__title">
                <span className="tag">Savollar</span>
                <h2 className="t-h2" id="faq-title">
                  Ko‘p beriladigan savollar.
                </h2>
              </div>
              <p className="t-lead">Boshlashdan oldin bilishingiz kerak bo‘lgan hamma narsa.</p>
            </Reveal>
            <Reveal delay={100}>
              <a href="#contact" className="btn btn--outline">
                Savol berish
              </a>
            </Reveal>
          </div>

          <Reveal className="faq-list" delay={100}>
            {FAQS.map((f, i) => {
              const isOpen = open.has(i);
              const btnId = `${uid}-q${i}`;
              const panelId = `${uid}-a${i}`;
              return (
                <div key={f.q} className="faq-item" data-open={isOpen}>
                  <h3>
                    <button
                      type="button"
                      id={btnId}
                      className="faq-item__q"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggle(i)}
                    >
                      <span>{f.q}</span>
                      <Plus className="faq-item__plus" size={20} strokeWidth={1.8} aria-hidden="true" />
                    </button>
                  </h3>
                  <div id={panelId} role="region" aria-labelledby={btnId} className="faq-item__a" inert={!isOpen}>
                    <div>
                      <p>{f.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
