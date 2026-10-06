import { Icon, ShowcaseFrame, type ShowcaseProps } from "./Frame";
import { CountUp } from "./motion";

const SPLIT = [
  { label: "Naqd", v: 4.2, d: 1, color: "#0B1F3A", radius: "5px 2px 2px 5px" },
  { label: "Karta", v: 5.8, d: 1, color: "#1769E0", radius: "2px" },
  { label: "Click / Payme", v: 2.45, d: 2, color: "#18B8C9", radius: "2px 5px 5px 2px" },
];

/** Finance: today's revenue and its payment split (bar grows in), then the debt card with its insight. */
export function FinanceShowcase({ frame, className }: ShowcaseProps) {
  return (
    <ShowcaseFrame
      frame={frame}
      className={className}
      name="finance"
      title="Pul qayerdaligini aniq biling"
      desc="Tushum, to‘lov va qarzdorliklarni real vaqtda kuzating."
    >
      <div className="sc-card sc-card--soft">
        <div className="sc-label sc-label--500">Bugungi tushum</div>
        <div className="sc-amount sc-mt4">
          <span className="sc-num sc-num--xl" style={{ lineHeight: 1.1 }}>
            <CountUp to={12.45} decimals={2} suffix=" mln" />
          </span>
          <span className="sc-unit">so‘m</span>
        </div>
        <div className="sc-split">
          {SPLIT.map((s, i) => (
            <div
              key={s.label}
              className="sc-split__seg"
              style={{ flex: s.v, background: s.color, borderRadius: s.radius, "--d": `${200 + i * 180}ms` } as React.CSSProperties}
            />
          ))}
        </div>
        <div className="sc-split__legend">
          {SPLIT.map((s) => (
            <div key={s.label}>
              <div className="sc-label sc-label--dot">
                <span className="sc-sq" style={{ background: s.color }} />
                {s.label}
              </div>
              <div className="sc-fin__val">{s.v.toFixed(s.d === 2 ? 2 : 1)} mln</div>
            </div>
          ))}
        </div>
      </div>
      <div className="sc-fin__debt sc-enter" style={{ "--d": "700ms" } as React.CSSProperties}>
        <div className="sc-row-between sc-wrap">
          <div>
            <div className="sc-label sc-label--500">Qarzdorlik</div>
            <div className="sc-amount sc-amount--tight sc-mt2">
              <span className="sc-num sc-num--debt">
                <CountUp to={3.72} decimals={2} suffix=" mln" />
              </span>
              <span className="sc-fin__debt-unit">so‘m</span>
            </div>
          </div>
          <span className="sc-chip sc-chip--amber">18 mijoz</span>
        </div>
        <div className="sc-track sc-track--debt">
          <div className="sc-grow" style={{ width: "61%", background: "#F4A340", "--d": "900ms" } as React.CSSProperties} />
        </div>
        <div className="sc-insight">
          <Icon name="spark" size={14} width={2} color="#18B8C9" />
          <span>
            Qarzdorlikning <b>61%</b> i 5 ta mijozga to‘g‘ri keladi.
          </span>
        </div>
      </div>
    </ShowcaseFrame>
  );
}
