import { Check } from "lucide-react";
import { Reveal } from "./Reveal";

/** Bullet list used next to product showcases. */
export function ShowcasePoints({ points }: { points: readonly string[] }) {
  return (
    <ul className="ps-points">
      {points.map((p) => (
        <li key={p}>
          <span className="ps-points__icon" aria-hidden="true">
            <Check size={12} strokeWidth={2.6} />
          </span>
          {p}
        </li>
      ))}
    </ul>
  );
}

/**
 * One marketing row: copy on one side, a DATA365 SUV product showcase on the other
 * (alternate with `reverse`). Stacks copy-first on phones and tablets.
 */
export function ProductShowcaseSection({
  kicker,
  title,
  text,
  points,
  visual,
  reverse = false,
}: {
  kicker: string;
  title: string;
  text: string;
  points: readonly string[];
  visual: React.ReactNode;
  reverse?: boolean;
}) {
  return (
    <div className={`ps-split ${reverse ? "ps-split--rev" : ""}`}>
      <Reveal className="ps-split__text">
        <span className="ps-kicker">{kicker}</span>
        <h3 className="ps-title">{title}</h3>
        <p className="t-lead">{text}</p>
        <ShowcasePoints points={points} />
      </Reveal>
      <div className="ps-split__visual">{visual}</div>
    </div>
  );
}
