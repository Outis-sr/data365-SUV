import { ClipboardList, Route, Truck } from "lucide-react";
import { STEPS } from "@/lib/content";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import { DeliveryMapShowcase } from "./showcase/DeliveryMapShowcase";
import { OrdersShowcase } from "./showcase/OrdersShowcase";
import { RouteOptimizationShowcase } from "./showcase/RouteOptimizationShowcase";

const ICONS = [ClipboardList, Truck, Route];

const SHOWCASES: Record<(typeof STEPS)[number]["showcase"], React.ReactNode> = {
  orders: <OrdersShowcase frame="bare" />,
  delivery: <DeliveryMapShowcase frame="bare" compact />,
  route: <RouteOptimizationShowcase frame="bare" />,
};

export function HowItWorksSection() {
  return (
    <section id="how-it-works" aria-labelledby="process-title">
      <div className="container-x section-pad">
        <div className="process">
          <div className="process__head">
            <SectionHeader
              tag="Qanday ishlaydi"
              title="Buyurtmadan eshikkacha — 3 qadam."
              id="process-title"
              align="left"
            />
          </div>
          <div className="process__cards">
            {STEPS.map((s, i) => {
              const Icon = ICONS[i];
              return (
                <Reveal key={s.n} as="article" className="proc-card">
                  <span className="proc-card__icon" aria-hidden="true">
                    <Icon size={18} strokeWidth={1.8} />
                  </span>
                  <div className="proc-card__body">
                    <div className="proc-card__text">
                      <h3 className="t-h4">{s.title}</h3>
                      <p className="t-body">{s.text}</p>
                    </div>
                    <div className="proc-card__art">{SHOWCASES[s.showcase]}</div>
                  </div>
                  <span className="proc-card__num" aria-label={`${Number(s.n)}-qadam`}>
                    {s.n}
                  </span>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
