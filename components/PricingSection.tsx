import { CircleCheck, Rocket, Sprout, Zap } from "lucide-react";
import { PLANS } from "@/lib/content";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

const ICONS = [Sprout, Zap, Rocket];

export function PricingSection() {
  return (
    <section id="pricing" aria-labelledby="pricing-title">
      <div className="container-x section-pad section-stack">
        <SectionHeader tag="Narxlar" title="Biznesingizga mos tarifni tanlang." id="pricing-title" />
        <div className="price-grid">
          {PLANS.map((p, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal
                key={p.name}
                as="article"
                delay={i * 80}
                className={`plan${p.highlight ? " plan--hl" : ""}`}
              >
                {p.highlight && <span className="plan__badge">Eng mashhur</span>}
                <div className="plan__inner">
                  <div className="plan__head">
                    <div>
                      <div className="plan__title">
                        <span className="plan__icon" aria-hidden="true">
                          <Icon size={18} strokeWidth={1.8} />
                        </span>
                        <h3 className="t-h4">{p.name}</h3>
                      </div>
                      <div className="plan__price">
                        <span className="plan__amount">{p.price}</span>
                        <span className="plan__per">{p.per}</span>
                      </div>
                      <p className="t-body plan__desc">{p.desc}</p>
                    </div>
                    <a
                      href="#contact"
                      className={`btn btn--${p.ctaStyle} btn--block`}
                    >
                      {p.cta}
                    </a>
                  </div>
                  <div className="plan__rest">
                    <div className="plan__divider" aria-hidden="true" />
                    <ul className="plan__list">
                      {p.features.map((f) => (
                        <li key={f}>
                          <CircleCheck size={20} strokeWidth={1.6} aria-hidden="true" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
