import { InlineSvg } from "@/lib/inline-svg";
import { BRAND_LOGOS } from "@/lib/content";

function Group({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="logos__group" aria-hidden={hidden || undefined}>
      {BRAND_LOGOS.map((l) => (
        <li key={l.name} style={{ height: 32 }}>
          <InlineSvg src={l.src} label={hidden ? undefined : l.name} />
        </li>
      ))}
    </ul>
  );
}

/** Seamless CSS marquee: two identical groups, track translates -50%. */
export function LogoMarquee() {
  return (
    <section className="logos" aria-label="Trusted by">
      <div className="container-x" style={{ paddingBlock: 64 }}>
        <div className="logos__viewport">
          <div className="logos__track">
            <Group />
            <Group hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
