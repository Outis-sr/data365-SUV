import { Icon, ShowcaseFrame, type ShowcaseProps } from "./Frame";
import { CountUp } from "./motion";

const BARS = [58, 66, 52, 78, 70, 84, 100];

/** Weekly report: the report card, its bars rise in turn, then the AI conclusion slides in. */
export function ReportsShowcase({ frame, className }: ShowcaseProps) {
  return (
    <ShowcaseFrame
      frame={frame}
      className={className}
      name="reports"
      panelClass="sc-panel--center"
      title="Hisobotlar o‘zi tayyor"
      desc="Natijalarni avtomatik tahlil qiling."
    >
      <div className="sc-card sc-card--lift sc-enter">
        <div className="sc-row-between sc-row-between--top">
          <div>
            <div className="sc-kicker" style={{ color: "#0B6C78" }}>
              Haftalik hisobot
            </div>
            <div className="sc-report__range">30 Sent — 6 Okt</div>
          </div>
          <span className="sc-tag">PDF</span>
        </div>
        <div className="sc-report__stats">
          <div>
            <div className="sc-num sc-num--lg">
              <CountUp to={842} />
            </div>
            <div className="sc-label sc-mt4">Buyurtmalar</div>
            <div className="sc-delta">+14%</div>
          </div>
          <div>
            <div className="sc-num sc-num--lg">
              <CountUp to={72.4} decimals={1} suffix=" mln" />
            </div>
            <div className="sc-label sc-mt4">Tushum</div>
            <div className="sc-delta">+9%</div>
          </div>
          <div>
            <div className="sc-num sc-num--lg" style={{ color: "#1769E0" }}>
              <CountUp to={31} prefix="+" />
            </div>
            <div className="sc-label sc-mt4">Yangi mijoz</div>
          </div>
        </div>
        <div className="sc-report__bars">
          {BARS.map((h, i) => (
            <div
              key={i}
              className="sc-bar"
              style={{ height: `${h}%`, background: i === 6 ? "#1769E0" : "#CFE0F7", "--d": `${300 + i * 70}ms` } as React.CSSProperties}
            />
          ))}
        </div>
      </div>
      <div className="sc-ai-note sc-enter" style={{ "--d": "900ms" } as React.CSSProperties}>
        <div className="sc-kicker sc-kicker--icon" style={{ color: "#0B6C78" }}>
          <Icon name="spark" width={2} />
          AI xulosasi
        </div>
        <div className="sc-ai-note__text">
          Eng yuqori o‘sish Yunusobodda: <b style={{ color: "#0E7A4F" }}>+21%</b>
        </div>
      </div>
    </ShowcaseFrame>
  );
}
