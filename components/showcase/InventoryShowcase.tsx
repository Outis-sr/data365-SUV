import { Icon, ShowcaseFrame, type ShowcaseProps } from "./Frame";
import { CountUp } from "./motion";

const STOCK = [
  { v: 710, label: "Tayyor 19L", color: "#18B8C9", radius: "5px 2px 2px 5px" },
  { v: 284, label: "Bo‘sh idish", color: "#A9B8CC", radius: "2px" },
  { v: 1426, label: "Mijozlarda", color: "#1769E0", radius: "2px" },
  { v: 38, label: "Qaytmagan", color: "#E45454", radius: "2px 5px 5px 2px", alert: true },
];

/** Inventory: the 19L bottle with stock counts, the container split, tomorrow's demand vs stock. */
export function InventoryShowcase({ frame, className }: ShowcaseProps) {
  return (
    <ShowcaseFrame
      frame={frame}
      className={className}
      name="inventory"
      title="Har bir idish hisobda"
      desc="Suv va qaytariladigan idishlarni aniq nazorat qiling."
    >
      <div className="sc-inv__top">
        <img
          className="sc-inv__bottle"
          src="/images/hero-bottle.webp"
          alt="data365 uchun SUV 19L"
          width={1024}
          height={1536}
          loading="lazy"
          decoding="async"
        />
        <div className="sc-inv__grid">
          {STOCK.map((s) => (
            <div key={s.label}>
              <div className="sc-num sc-num--inv" style={s.alert ? { color: "#C23B3B" } : undefined}>
                <CountUp to={s.v} />
              </div>
              <div className="sc-label sc-label--dot sc-mt4">
                <span className="sc-sq" style={{ background: s.color }} />
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="sc-split sc-split--inv">
        {STOCK.map((s, i) => (
          <div
            key={s.label}
            className="sc-split__seg"
            style={{ flex: s.v, background: s.color, borderRadius: s.radius, "--d": `${200 + i * 150}ms` } as React.CSSProperties}
          />
        ))}
      </div>
      <div className="sc-tile sc-inv__demand sc-enter" style={{ "--d": "700ms" } as React.CSSProperties}>
        <div className="sc-row-between sc-row-between--base sc-wrap">
          <span className="sc-label sc-label--13">Ertangi talab</span>
          <span className="sc-num sc-num--demand">620 dona</span>
        </div>
        <div className="sc-inv__bar">
          <div className="sc-inv__bar-bg" />
          <div className="sc-grow sc-inv__bar-fill" style={{ "--d": "900ms" } as React.CSSProperties} />
          <div className="sc-inv__bar-mark" />
        </div>
        <div className="sc-row-between sc-wrap sc-mt12">
          <span className="sc-ok">
            <Icon name="check" size={14} width={2.6} />
            Zaxira yetarli
          </span>
          <span className="sc-chip sc-chip--green sc-chip--sm">+90 dona</span>
        </div>
      </div>
    </ShowcaseFrame>
  );
}
