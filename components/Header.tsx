"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { href: "#features", label: "Imkoniyatlar" },
  { href: "#pricing", label: "Narxlar" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Aloqa" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1200 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <div className="nav-wrap">
      <nav className="nav" aria-label="Primary">
        <a href="#top" className="nav__logo" aria-label="data365 SUV — bosh sahifa" onClick={() => setOpen(false)}>
          <span className="nav__brand">data365 <b>SUV</b></span>
        </a>

        <div className="nav__links">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="nav__link">
              {l.label}
            </a>
          ))}
        </div>

        <div className="nav__controls">
          <a href="#contact" className="btn btn--black nav__cta">
            Bog‘lanish
          </a>
          <button
            type="button"
            className="nav__menu"
            aria-label={open ? "Menyuni yopish" : "Menyuni ochish"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.8" strokeLinecap="round">
              {open ? (
                <>
                  <path d="M6 6l12 12" />
                  <path d="M18 6L6 18" />
                </>
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </>
              )}
            </svg>
          </button>
        </div>

        <div id="mobile-menu" className="nav__panel" data-open={open} aria-hidden={!open}>
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href="#contact" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
            Bog‘lanish
          </a>
        </div>
      </nav>
    </div>
  );
}
