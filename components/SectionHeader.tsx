import { Reveal } from "./Reveal";

export function SectionHeader({
  tag,
  title,
  id,
  align = "center",
  children,
}: {
  tag: string;
  title: string;
  id?: string;
  align?: "center" | "left";
  children?: React.ReactNode;
}) {
  return (
    <Reveal className={`sec-head ${align === "left" ? "sec-head--left" : ""}`}>
      <span className="tag">{tag}</span>
      <h2 className="t-h2" id={id}>
        {title}
      </h2>
      {children}
    </Reveal>
  );
}
