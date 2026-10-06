import { INTEGRATION_ICONS } from "@/lib/content";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

const TILES = ["a", "b", "c", "d", "e"] as const;

export function IntegrationsSection() {
  return (
    <section id="integrations" className="integ-section" aria-labelledby="integrations-title">
      <div className="container-x section-pad section-stack">
        <SectionHeader tag="Integratsiyalar" title="Ishlayotgan tizimlaringiz bilan bog‘lanadi." id="integrations-title">
          <p className="t-lead">Xabar almashish, to‘lov va boshqa ish vositalaringizni DATA365 SUV bilan bir joyga ulang.</p>
        </SectionHeader>
        <Reveal variant="fade" className="dome">
          <div className="dome__bg" aria-hidden="true" />
          {TILES.map((t, i) => (
            <span key={t} className={`dome__tile dome__tile--${t}`} aria-hidden="true">
              <img src={INTEGRATION_ICONS[i]} alt="" width={48} height={48} loading="lazy" decoding="async" />
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
