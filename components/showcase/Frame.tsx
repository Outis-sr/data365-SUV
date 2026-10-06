import { InView } from "./motion";

/**
 * How a showcase is mounted:
 * - "full":    white surface with its own title + description (standalone, as designed);
 * - "surface": white surface without the heading (the page section supplies the copy);
 * - "bare":    only the grey inner panel (inside an existing feature / process card).
 * The outer `.sc` element is the size container the showcase CSS queries.
 */
export type Frame = "full" | "surface" | "bare";

export type ShowcaseProps = { frame?: Frame; className?: string };

export function ShowcaseFrame({
  frame = "full",
  title,
  desc,
  name,
  className = "",
  panelClass = "",
  wide = false,
  children,
}: {
  frame?: Frame;
  title: string;
  desc: string;
  name: string;
  className?: string;
  panelClass?: string;
  wide?: boolean;
  children: React.ReactNode;
}) {
  const panel = <div className={`sc-panel ${panelClass}`}>{children}</div>;
  if (frame === "bare") {
    return <InView className={`sc sc--bare sc-${name} ${className}`}>{panel}</InView>;
  }
  return (
    <InView as="article" className={`sc sc-${name} ${className}`}>
      <div className={`sc-surface ${wide ? "sc-surface--wide" : ""}`}>
        {frame === "full" && (
          <div className="sc-head">
            <h3 className="sc-head__title">{title}</h3>
            <p className="sc-head__desc">{desc}</p>
          </div>
        )}
        {panel}
      </div>
    </InView>
  );
}

/* Icons used by the designs (stroke paths copied from the source components) */
const P = {
  alert: "M21.73 18l-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3 M12 9v4 M12 17h.01",
  clock: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 6v6l4 2",
  arrow: "M5 12h14 M12 5l7 7-7 7",
  spark: "M12 3l1.9 5.6L19.5 10.5l-5.6 1.9L12 18l-1.9-5.6L4.5 10.5l5.6-1.9z",
  check: "M20 6 9 17l-5-5",
  truck: "M10 17h4V5H2v12h3 M14 8h4l4 4v5h-2 M5 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0 M15 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0",
  warehouse: "M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35z M6 18h12 M6 14h12",
  external: "M7 17 17 7 M8 7h9v9",
};

export function Icon({
  name,
  size = 13,
  width = 2.2,
  color = "currentColor",
  className,
}: {
  name: keyof typeof P;
  size?: number;
  width?: number;
  color?: string;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      style={{ flex: "none", fill: "none", stroke: color, strokeWidth: width, strokeLinecap: "round", strokeLinejoin: "round" }}
    >
      <path d={P[name]} />
    </svg>
  );
}
