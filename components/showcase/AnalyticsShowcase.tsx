import { ShowcaseFrame, type ShowcaseProps } from "./Frame";
import { CountUp } from "./motion";

/** Real-time analytics: today's revenue, live chart (draws in on entry), orders / delivered. */
export function AnalyticsShowcase({ frame, className }: ShowcaseProps) {
  return (
    <ShowcaseFrame
      frame={frame}
      className={className}
      name="analytics"
      title="Real-time Analytics"
      desc="Biznes natijalarini real vaqtda kuzating."
    >
      <div className="sc-row-between">
        <div>
          <div className="sc-label sc-label--dot">
            <span className="sc-dot sc-dot--7" style={{ background: "#16A36A" }} />
            Bugungi tushum
          </div>
          <div className="sc-amount">
            <span className="sc-num sc-num--xl">
              <CountUp to={12.45} decimals={2} suffix=" mln" />
            </span>
            <span className="sc-unit">so‘m</span>
          </div>
        </div>
        <span className="sc-chip sc-chip--green">↑ +12%</span>
      </div>

      <div className="sc-chart">
        <div className="sc-chart__grid" style={{ top: "25%" }} />
        <div className="sc-chart__grid" style={{ top: "50%" }} />
        <div className="sc-chart__grid" style={{ top: "75%" }} />
        <div className="sc-chart__draw">
          <div className="sc-chart__area" />
          <svg viewBox="0 0 1000 200" preserveAspectRatio="none" className="sc-chart__svg" aria-hidden="true">
            <polyline points="0,172 91,164 182,152 273,140 364,124 455,112 545,92 636,80 727,60 818,44 909,28 1000,16" />
          </svg>
        </div>
        <div className="sc-chart__marker" />
        <div className="sc-chart__now">Hozir · 14:32</div>
      </div>
      <div className="sc-axis">
        <span>08:00</span>
        <span>11:00</span>
        <span>14:00</span>
        <span>17:00</span>
      </div>

      <div className="sc-tiles">
        <div className="sc-tile">
          <div className="sc-amount sc-amount--tight">
            <span className="sc-num sc-num--md">
              <CountUp to={128} />
            </span>
            <span className="sc-label">buyurtma</span>
          </div>
        </div>
        <div className="sc-tile">
          <div className="sc-amount sc-amount--tight">
            <span className="sc-num sc-num--md" style={{ color: "#16A36A" }}>
              <CountUp to={98} />
            </span>
            <span className="sc-label">yetkazildi</span>
          </div>
          <div className="sc-track sc-track--4">
            <div className="sc-grow" style={{ width: "76.5%", background: "#16A36A" }} />
          </div>
        </div>
      </div>
    </ShowcaseFrame>
  );
}
