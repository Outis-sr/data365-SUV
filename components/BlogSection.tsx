import { POSTS } from "@/lib/content";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

export function BlogSection() {
  return (
    <section id="blog" aria-labelledby="blog-title">
      <div className="container-x section-pad section-stack">
        <SectionHeader tag="Blog" title="Suv biznesi uchun foydali maqolalar." id="blog-title" />
        <div className="blog-grid">
          {POSTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <a href={p.href} className="blog-card">
                <div className="blog-card__img">
                  <img src={p.img} alt="" width={1200} height={900} loading="lazy" decoding="async" />
                </div>
                <div className="blog-card__content">
                  <h3 className="t-h5">{p.title}</h3>
                  <p className="t-body">{p.text}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
        <Reveal variant="fade" className="blog-more">
          <a href="#blog" className="btn btn--black">
            Barchasini ko‘rish
          </a>
        </Reveal>
      </div>
    </section>
  );
}
