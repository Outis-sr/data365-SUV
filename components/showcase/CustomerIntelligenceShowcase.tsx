import { ShowcaseFrame, type ShowcaseProps } from "./Frame";
import { CountUp } from "./motion";

/** Customer intelligence: reorder timeline (marker travels to "18 kun"), stacked customers behind. */
export function CustomerIntelligenceShowcase({ frame, className }: ShowcaseProps) {
  return (
    <ShowcaseFrame
      frame={frame}
      className={className}
      name="ci"
      title="Mijozni yo‘qotishdan oldin biling"
      desc="AI qayta buyurtma vaqti kelgan mijozlarni aniqlaydi."
    >
      <div className="sc-ci__stack">
        <div className="sc-ci__ghost sc-ci__ghost--1">
          <b>Orzu Med</b>
          <span>7 kun oldin</span>
        </div>
        <div className="sc-ci__ghost sc-ci__ghost--2">
          <b>Smart Market</b>
          <span>9 kun oldin</span>
        </div>
        <div className="sc-ci__main sc-enter">
          <div className="sc-row-between sc-wrap">
            <div className="sc-person">
              <span className="sc-avatar sc-avatar--lg" style={{ background: "#EAF2FD", color: "#1257B8" }}>
                NT
              </span>
              <div className="sc-ci__name">Najot Ta&apos;lim</div>
            </div>
            <span className="sc-chip sc-chip--amber sc-chip--dot">
              <span className="sc-dot" style={{ background: "#F4A340" }} />
              Qayta buyurtma vaqti o&apos;tgan
            </span>
          </div>
          <div className="sc-ci__facts">
            <div>
              <div className="sc-label sc-label--xs">Oxirgi buyurtma</div>
              <div className="sc-ci__fact">18 kun oldin</div>
            </div>
            <div className="sc-ci__fact-2">
              <div className="sc-label sc-label--xs">Odatda buyurtma</div>
              <div className="sc-ci__fact">har 12–14 kunda</div>
            </div>
          </div>
          <div className="sc-ci__timeline">
            <div className="sc-ci__window" />
            <div className="sc-ci__elapsed" />
            <div className="sc-ci__marker" />
          </div>
          <div className="sc-axis sc-axis--ci">
            <span>0 kun</span>
            <span style={{ color: "#0B6C78", fontWeight: 500 }}>12–14 kun</span>
            <span style={{ color: "#9A5F0B", fontWeight: 600 }}>18 kun</span>
          </div>
          <div className="sc-row-between sc-wrap sc-ci__foot">
            <div>
              <div className="sc-label sc-label--xs">Potensial</div>
              <div className="sc-ci__potential">750 000 so‘m</div>
            </div>
            <span className="sc-btn sc-btn--lg">Eslatma yuborish</span>
          </div>
        </div>
      </div>
      <div className="sc-row-between sc-wrap sc-ci__summary">
        <div className="sc-amount sc-amount--tight">
          <span className="sc-num sc-num--ci" style={{ color: "#8A5200" }}>
            <CountUp to={23} />
          </span>
          <span className="sc-body-sm">mijoz</span>
        </div>
        <div className="sc-body-sm">
          <b className="sc-ci__sum">~2.1 mln so‘m</b> potensial
        </div>
      </div>
    </ShowcaseFrame>
  );
}
