import { Icon, ShowcaseFrame, type ShowcaseProps } from "./Frame";

/* stop positions in % of the map (1 = start, 8 = last stop) */
const PINS: [number, number][] = [
  [56, 84],
  [50, 66],
  [64, 54],
  [78, 64],
  [88, 44],
  [76, 30],
  [62, 22],
  [82, 14],
];
const ROUTE = "560,504 500,396 640,324 780,384 880,264 760,180 620,132 820,84";

/** Ready route: the route draws from the depot upward, stops pop in order, the CTA pulses once. */
export function YandexRouteShowcase({ frame, className }: ShowcaseProps) {
  return (
    <ShowcaseFrame
      frame={frame}
      className={className}
      name="yandex"
      panelClass="sc-map sc-map--yandex"
      title="Marshrut tayyor. Yo‘lga chiqing."
      desc="Tayyor yetkazib berish marshrutini Yandex Navigator’da oching."
    >
      <div className="sc-map__canvas">
        <svg viewBox="0 0 1000 600" preserveAspectRatio="none" className="sc-map__bg" aria-hidden="true">
          <ellipse cx="860" cy="520" rx="110" ry="60" fill="#DCEFE4" />
          <ellipse cx="560" cy="120" rx="90" ry="40" fill="#DCEFE4" />
          <path d="M-20 360 Q300 300 560 380 T1020 330" fill="none" stroke="#CBE3F4" strokeWidth={24} />
          <path
            d="M0 160 L1000 230 M0 470 L1000 420 M420 0 L500 600 M720 0 L680 600 M240 0 L200 600 M900 0 L940 600"
            fill="none"
            stroke="#fff"
            strokeWidth={9}
            strokeLinecap="round"
          />
          <path
            d="M0 60 L1000 90 M0 300 L1000 280 M0 540 L1000 560 M580 0 L600 600 M840 0 L830 600"
            fill="none"
            stroke="#F6F9FC"
            strokeWidth={4}
          />
        </svg>
        <div className="sc-map__route sc-map__route--up">
          <svg viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true">
            <polyline points={ROUTE} className="sc-map__casing" style={{ strokeWidth: 12 }} />
            <polyline points={ROUTE} className="sc-map__line" style={{ strokeWidth: 5 }} />
          </svg>
        </div>
        {PINS.map(([x, y], i) => (
          <div
            key={i}
            className="sc-pin-num"
            style={
              {
                left: `${x}%`,
                top: `${y}%`,
                background: i === 7 ? "#0B1F3A" : "#1769E0",
                "--d": `${250 + i * 110}ms`,
              } as React.CSSProperties
            }
          >
            {i + 1}
          </div>
        ))}
      </div>
      <div className="sc-ya__card">
        <div className="sc-kicker sc-kicker--icon" style={{ color: "#0E7A4F" }}>
          <span className="sc-icon-circle" style={{ background: "#E7F6EF" }}>
            <Icon name="check" size={12} width={3} color="#16A36A" />
          </span>
          Marshrut tayyor
        </div>
        <div className="sc-ya__stats">
          <div>
            <div className="sc-num sc-num--route">8</div>
            <div className="sc-label sc-mt2">ta manzil</div>
          </div>
          <div>
            <div className="sc-num sc-num--route">23.4</div>
            <div className="sc-label sc-mt2">km</div>
          </div>
          <div className="sc-ya__time">
            <div className="sc-ya__time-val">1 soat 42 daqiqa</div>
            <div className="sc-label sc-mt2">taxminiy vaqt</div>
          </div>
        </div>
        <div className="sc-ya__note">
          <Icon name="spark" size={14} width={2} color="#18B8C9" />
          Optimal ketma-ketlik avtomatik tuzildi
        </div>
        <span className="sc-ya__cta">
          <span>Yandex Navigator&apos;da ochish</span>
          <Icon name="external" size={16} width={2.3} />
        </span>
      </div>
    </ShowcaseFrame>
  );
}
