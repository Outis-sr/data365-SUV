import { ShowcaseFrame, type ShowcaseProps } from "./Frame";
import { CountUp } from "./motion";

const ORDERS = [
  { ini: "SM", av: ["#E6F7F9", "#0B6C78"], name: "Smart Market", qty: "12 × 19L", sum: "900 000 so‘m", st: "Yetkazilmoqda", dot: "#18B8C9" },
  { ini: "NT", av: ["#EAF2FD", "#1257B8"], name: "Najot Ta'lim", qty: "10 × 19L", sum: "750 000 so‘m", st: "Yo‘lda", dot: "#1769E0" },
  { ini: "AM", av: ["#E7F6EF", "#0E7A4F"], name: "Akmal Market", qty: "5 × 19L", sum: "375 000 so‘m", st: "Yetkazildi", dot: "#16A36A" },
];

/** Orders under control: today's count and a stack of order cards whose statuses appear in turn. */
export function OrdersShowcase({ frame, className }: ShowcaseProps) {
  return (
    <ShowcaseFrame
      frame={frame}
      className={className}
      name="orders"
      title="Buyurtmalar nazorat ostida"
      desc="Yangi buyurtmadan yetkazib berishgacha — barchasi bir joyda."
    >
      <div className="sc-amount">
        <span className="sc-num sc-num--xxl">
          <CountUp to={128} />
        </span>
        <span className="sc-unit sc-unit--sm">bugungi buyurtma</span>
      </div>
      <div className="sc-orders__stack">
        {ORDERS.map((o, i) => (
          <div key={o.name} className={`sc-order sc-order--${i}`} style={{ "--d": `${i * 160}ms` } as React.CSSProperties}>
            <div className="sc-person">
              <span className="sc-avatar" style={{ background: o.av[0], color: o.av[1] }}>
                {o.ini}
              </span>
              <div className="sc-person__text">
                <div className="sc-strong">{o.name}</div>
                <div className="sc-label">{o.qty}</div>
              </div>
            </div>
            <div className="sc-order__right">
              <div className="sc-strong">{o.sum}</div>
              <div className={`sc-status ${i === 2 ? "sc-status--done" : ""}`} style={{ "--d": `${500 + i * 220}ms` } as React.CSSProperties}>
                <span className="sc-dot" style={{ background: o.dot }} />
                {o.st}
              </div>
            </div>
          </div>
        ))}
      </div>
    </ShowcaseFrame>
  );
}
