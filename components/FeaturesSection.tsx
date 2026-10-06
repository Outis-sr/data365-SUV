import { InlineSvg } from "@/lib/inline-svg";
import { FEATURES } from "@/lib/content";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

function FeatureCard({ f, i }: { f: (typeof FEATURES)[number]; i: number }) {
  return (
    <Reveal variant="scale" delay={(i % 3) * 80} className="feat-card" as="article">
      <div className="feat-card__content">
        <h3 className="t-h4">{f.title}</h3>
        <p className="t-body">{f.text}</p>
      </div>
      <div className="feat-card__art">
        <InlineSvg src={f.art} />
      </div>
    </Reveal>
  );
}

export function FeaturesSection() {
  return (
    <section id="features" aria-labelledby="features-title">
      <div className="container-x section-pad section-stack">
        <SectionHeader tag="Imkoniyatlar" title="Suv biznesini oson boshqaring." id="features-title" />
        <div className="feat-grid">
          <div className="feat-row feat-row--3">
            {FEATURES.slice(0, 3).map((f, i) => (
              <FeatureCard key={f.title} f={f} i={i} />
            ))}
          </div>
          <div className="feat-row feat-row--2">
            {FEATURES.slice(3).map((f, i) => (
              <FeatureCard key={f.title} f={f} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
