import { Icon, ShowcaseFrame, type ShowcaseProps } from "./Frame";

/** AI analyst: the warning card enters, its recommendation follows, the reorder opportunity comes last. */
export function AITahlilchiShowcase({ frame, className }: ShowcaseProps) {
  return (
    <ShowcaseFrame
      frame={frame}
      className={className}
      name="ai"
      panelClass="sc-panel--center"
      title="AI Tahlilchi"
      desc="Muammo va imkoniyatlarni AI sizdan oldin aniqlaydi."
    >
      <div className="sc-card sc-card--lift sc-ai__warn sc-enter">
        <div className="sc-kicker sc-kicker--icon" style={{ color: "#9A5F0B" }}>
          <span className="sc-icon-box" style={{ background: "#FEF3E2" }}>
            <Icon name="alert" color="#F4A340" />
          </span>
          Bugun e&apos;tibor talab qiladi
        </div>
        <div className="sc-ai__title">
          Sergeli yo‘nalishida
          <br />5 ta buyurtma kechikish xavfida
        </div>
        <div className="sc-ai__sub">14 ta buyurtma bitta haydovchiga tushgan.</div>
        <div className="sc-ai__actions sc-enter" style={{ "--d": "450ms" } as React.CSSProperties}>
          <span className="sc-chip sc-chip--green sc-chip--icon">
            <Icon name="clock" />
            ~35 daqiqa tejash mumkin
          </span>
          <span className="sc-btn">
            Marshrutni optimallashtirish
            <Icon name="arrow" width={2.3} />
          </span>
        </div>
      </div>
      <div className="sc-ai__opp sc-enter" style={{ "--d": "850ms" } as React.CSSProperties}>
        <div>
          <div className="sc-kicker" style={{ color: "#0B6C78" }}>
            Qayta buyurtma imkoniyati
          </div>
          <div className="sc-ai__opp-val">23 mijoz</div>
        </div>
        <div className="sc-ai__opp-sum">~2.1 mln so‘m</div>
      </div>
    </ShowcaseFrame>
  );
}
