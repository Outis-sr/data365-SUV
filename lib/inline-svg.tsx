import fs from "node:fs";
import path from "node:path";

const cache = new Map<string, string>();

function load(src: string): string {
  const hit = cache.get(src);
  if (hit) return hit;
  const file = path.join(process.cwd(), "public", "art", src);
  let svg = "";
  try {
    svg = fs
      .readFileSync(file, "utf8")
      .replace(/<\?xml[^>]*\?>/g, "")
      .replace(/<!--[\s\S]*?-->/g, "")
      .trim();
  } catch {
    svg = "";
  }
  cache.set(src, svg);
  return svg;
}

/**
 * Server-side inline SVG so the artwork can inherit the page font and
 * `currentColor`. Files live in /public/art.
 */
export function InlineSvg({
  src,
  className = "",
  label,
}: {
  src: string;
  className?: string;
  label?: string;
}) {
  return (
    <span
      className={`inline-svg ${className}`}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      dangerouslySetInnerHTML={{ __html: load(src) }}
    />
  );
}
