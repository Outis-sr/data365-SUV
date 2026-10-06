import { FOOTER_COLS } from "@/lib/content";

const SOCIAL = [
  {
    label: "X",
    href: "https://x.com",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="container-x">
        <div className="footer__main">
          <div className="footer__brand">
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <a href="#top" aria-label="data365 SUV — bosh sahifa" style={{ display: "inline-flex", width: "fit-content" }}>
                <span className="nav__brand footer__brand-name">data365 <b>SUV</b></span>
              </a>
              <p className="t-h4 footer__tag">Suv yetkazib berish biznesini boshqarish uchun yagona tizim.</p>
            </div>
            <ul className="footer__social">
              {SOCIAL.map((s) => (
                <li key={s.label}>
                  <a href={s.href} aria-label={s.label} target="_blank" rel="noopener noreferrer">
                    {s.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav className="footer__nav" aria-label="Pastki menyu">
            {FOOTER_COLS.map((c) => (
              <div key={c.title} className="footer__col">
                <h6>{c.title}</h6>
                {c.links.map((l) => (
                  <a key={l.label} href={l.href}>
                    {l.label}
                  </a>
                ))}
              </div>
            ))}
          </nav>
        </div>

        <div className="footer__divider" />
        <p className="footer__legal">© 2026 data365 SUV. Barcha huquqlar himoyalangan.</p>
      </div>
    </footer>
  );
}
