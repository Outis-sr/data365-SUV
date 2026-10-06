import { Icon, ShowcaseFrame, type ShowcaseProps } from "./Frame";

const DISTRICTS: [string, number, number][] = [
  ["Yunusobod", 55, 14],
  ["Mirzo Ulug‘bek", 40, 33],
  ["Chilonzor", 11, 54],
  ["Sergeli", 84, 72],
];
const CUSTOMERS: [number, number][] = [
  [48, 10],
  [62, 25],
  [33, 22],
  [25, 42],
  [8, 44],
  [76, 42],
  [90, 56],
  [90, 88],
  [12, 76],
  [58, 36],
  [30, 54],
];
const DONE: [number, number][] = [
  [32, 64],
  [26, 70],
  [30, 78],
  [24, 84],
];
/* upcoming stops (blue) and late-risk stops (amber), in route order */
const NEXT: [number, number, boolean][] = [
  [46, 66, false],
  [54, 61, true],
  [63, 67, false],
  [70, 76, false],
  [62, 84, false],
  [52, 88, false],
  [44, 82, true],
  [38, 90, false],
];
const DRIVERS: [string, number, number, boolean][] = [
  ["Bekzod", 49, 54, true],
  ["Sardor", 68, 27, false],
  ["Aziz", 19, 36, false],
];
const DONE_ROUTE = "400,348 320,384 260,420 300,468 240,504";
const ACTIVE_ROUTE = "400,348 460,396 540,366 630,402 700,456 620,504 520,528 440,492 380,540";

/**
 * Live delivery map (Tashkent districts): drivers, completed / upcoming / late-risk stops, the active
 * route. Keeps the original live pulses (active vehicle, "Jonli" badge); route and stops reveal once.
 */
export function DeliveryMapShowcase({ frame, className, compact = false }: ShowcaseProps & { compact?: boolean }) {
  return (
    <ShowcaseFrame
      frame={frame}
      className={`${compact ? "sc-delivery--compact" : ""} ${className ?? ""}`}
      name="delivery"
      wide
      panelClass="sc-map sc-map--delivery"
      title="Yetkazib berishni jonli kuzating"
      desc="Haydovchi, buyurtma va marshrutlarni real vaqtda boshqaring."
    >
      <div className="sc-map__canvas">
        <svg viewBox="0 0 1000 600" preserveAspectRatio="none" className="sc-map__bg" aria-hidden="true">
          <ellipse cx="170" cy="500" rx="120" ry="55" fill="#DCEFE4" />
          <ellipse cx="830" cy="470" rx="90" ry="60" fill="#DCEFE4" />
          <ellipse cx="560" cy="150" rx="110" ry="46" fill="#DCEFE4" />
          <path d="M-20 300 Q250 250 450 310 T1020 270" fill="none" stroke="#CBE3F4" strokeWidth={22} />
          <path
            d="M0 150 L1000 240 M0 420 L1000 340 M300 0 L390 600 M660 0 L600 600 M0 540 L1000 570 M120 0 L60 600 M850 0 L920 600"
            fill="none"
            stroke="#fff"
            strokeWidth={9}
            strokeLinecap="round"
          />
          <path
            d="M0 60 L1000 90 M0 240 L1000 330 M0 480 L1000 470 M210 0 L250 600 M470 0 L500 600 M760 0 L780 600"
            fill="none"
            stroke="#F6F9FC"
            strokeWidth={4}
          />
          <path
            d="M120 80 Q500 -30 900 110 Q1010 330 900 520 Q500 650 100 520 Q-10 300 120 80"
            fill="none"
            stroke="#fff"
            strokeWidth={7}
            opacity={0.9}
          />
        </svg>
        <div className="sc-map__route">
          <svg viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true">
            <polyline points={DONE_ROUTE} className="sc-map__line" style={{ stroke: "#16A36A", strokeWidth: 3.5 }} />
            <polyline points={ACTIVE_ROUTE} className="sc-map__casing" style={{ strokeWidth: 11 }} />
            <polyline points={ACTIVE_ROUTE} className="sc-map__line" style={{ strokeWidth: 4.5 }} />
          </svg>
        </div>

        {DISTRICTS.map(([n, x, y]) => (
          <div key={n} className="sc-district" style={{ left: `${x}%`, top: `${y}%` }}>
            {n}
          </div>
        ))}
        {CUSTOMERS.map(([x, y]) => (
          <div key={`c${x}-${y}`} className="sc-pin sc-pin--customer" style={{ left: `${x}%`, top: `${y}%` }} />
        ))}
        {DONE.map(([x, y]) => (
          <div key={`d${x}-${y}`} className="sc-pin sc-pin--done" style={{ left: `${x}%`, top: `${y}%` }} />
        ))}
        {NEXT.map(([x, y, risk], i) => (
          <div
            key={`n${x}-${y}`}
            className={`sc-pin sc-pin--stop ${risk ? "sc-pin--risk" : ""}`}
            style={{ left: `${x}%`, top: `${y}%`, "--d": `${500 + i * 90}ms` } as React.CSSProperties}
          />
        ))}
        <div className="sc-warehouse" style={{ left: "40%", top: "58%" }}>
          <Icon name="warehouse" size={17} width={2} />
        </div>
        {DRIVERS.map(([n, x, y, active]) => (
          <div
            key={n}
            className={`sc-vehicle ${active ? "sc-vehicle--active" : ""}`}
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <span className="sc-vehicle__icon">
              <Icon name="truck" />
            </span>
            <span className="sc-vehicle__name">{n}</span>
          </div>
        ))}
        <div className="sc-live">
          <span className="sc-live__dot" />
          Jonli
        </div>
      </div>

      <div className="sc-driver">
        <div className="sc-person">
          <span
            className="sc-avatar sc-avatar--lg"
            style={{ background: "#EAF2FD", color: "#1769E0", fontWeight: 700, fontSize: 14 }}
          >
            B
          </span>
          <div className="sc-person__text" style={{ flex: 1 }}>
            <div className="sc-strong sc-strong--15">Bekzod</div>
            <div className="sc-label">Sergeli yo‘nalishi</div>
          </div>
          <span className="sc-status sc-status--blue">
            <span className="sc-dot" style={{ background: "#1769E0" }} />
            Yo‘lda
          </span>
        </div>
        <div className="sc-amount sc-amount--tight sc-mt12">
          <b className="sc-num sc-num--driver">12 / 20</b>
          <span className="sc-label">yetkazildi</span>
        </div>
        <div className="sc-track sc-track--6">
          <div
            className="sc-grow"
            style={{ width: "60%", background: "#1769E0", "--d": "400ms" } as React.CSSProperties}
          />
        </div>
        <div className="sc-driver__left">8 ta manzil qoldi</div>
      </div>
      <div className="sc-legend">
        <span>
          <span className="sc-legend__line" />
          Faol marshrut
        </span>
        <span>
          <span className="sc-dot sc-dot--8" style={{ background: "#16A36A" }} />
          Yetkazilgan
        </span>
        <span>
          <span className="sc-dot sc-dot--8" style={{ background: "#F4A340" }} />
          Kechikish xavfi
        </span>
      </div>
    </ShowcaseFrame>
  );
}
