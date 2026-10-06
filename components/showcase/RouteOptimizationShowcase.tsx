import { ShowcaseFrame, type ShowcaseProps } from "./Frame";
import { CountUp } from "./motion";

const STOPS: [number, number][] = [
  [35, 105], [30, 55], [70, 28], [110, 50], [150, 28], [165, 75], [135, 105], [95, 90],
];
const OLD = "100,135 150,28 35,105 165,75 70,28 135,105 30,55 95,90 110,50 100,135";
const OPT = "100,135 35,105 30,55 70,28 110,50 150,28 165,75 135,105 95,90 100,135";

function RouteMap({ points, optimal }: { points: string; optimal?: boolean }) {
  return (
    <div className={`sc-route__map ${optimal ? "sc-route__map--opt" : ""}`}>
      <svg viewBox="0 0 200 150" aria-hidden="true">
        <polyline className="sc-route__line" pathLength={1} points={points} />
        <g className="sc-route__stops">
          {STOPS.map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r={4.5} />
          ))}
        </g>
        <rect x={94} y={129} width={12} height={12} rx={3} fill="#0B1F3A" />
      </svg>
    </div>
  );
}

/** Old vs optimal route: the tangled route draws first, then the optimal one, then the savings badge. */
export function RouteOptimizationShowcase({ frame, className }: ShowcaseProps) {
  return (
    <ShowcaseFrame
      frame={frame}
      className={className}
      name="route"
      panelClass="sc-route__panel"
      title="Kamroq yo‘l. Ko‘proq yetkazib berish."
      desc="Marshrutlarni optimallashtirib vaqt va yo‘lni tejang."
    >
      <div className="sc-route__col">
        <div className="sc-route__label">
          <span className="sc-dot sc-dot--8" style={{ background: "#C23B3B" }} />
          Oddiy marshrut
        </div>
        <RouteMap points={OLD} />
        <div>
          <div className="sc-num sc-num--route">38.2 km</div>
          <div className="sc-label sc-label--13 sc-mt2">2 soat 24 daqiqa</div>
        </div>
      </div>
      <div className="sc-route__col">
        <div className="sc-route__label" style={{ color: "#0B1F3A" }}>
          <span className="sc-dot sc-dot--8" style={{ background: "#1769E0" }} />
          Optimal marshrut
        </div>
        <RouteMap points={OPT} optimal />
        <div>
          <div className="sc-num sc-num--route" style={{ color: "#1769E0" }}>
            <CountUp to={27.8} decimals={1} suffix=" km" />
          </div>
          <div className="sc-label sc-label--13 sc-mt2">1 soat 46 daqiqa</div>
        </div>
      </div>
      <div className="sc-route__save">
        <div className="sc-route__save-km">
          <CountUp to={10.4} decimals={1} prefix="−" suffix=" km" duration={900} />
        </div>
        <div className="sc-route__save-min">
          <CountUp to={38} prefix="−" suffix=" daqiqa" duration={900} />
        </div>
      </div>
    </ShowcaseFrame>
  );
}
