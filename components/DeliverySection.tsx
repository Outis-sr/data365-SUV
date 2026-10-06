import { ArrowRight } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { DeliveryMapShowcase } from "./showcase/DeliveryMapShowcase";
import { RouteOptimizationShowcase } from "./showcase/RouteOptimizationShowcase";
import { YandexRouteShowcase } from "./showcase/YandexRouteShowcase";

/**
 * Operations: the live delivery map as the section's hero visual, then the route story —
 * optimise the route, then send the ready route to the driver (Yandex Navigator).
 */
export function DeliverySection() {
  return (
    <section id="delivery" className="ps-band" aria-labelledby="delivery-title">
      <div className="container-x section-pad section-stack">
        <SectionHeader tag="Yetkazib berish" title="Har bir haydovchi — jonli xaritada." id="delivery-title">
          <p className="t-lead">
            Kim qayerda, qaysi buyurtma kechikish xavfida va qancha manzil qoldi — operator bir qarashda ko‘radi.
          </p>
        </SectionHeader>
        <div className="ps-map">
          <DeliveryMapShowcase frame="surface" />
        </div>

        <div className="ps-route">
          <div className="ps-route__head">
            <h3 className="ps-title">Marshrutni optimallashtiring. Haydovchiga yuboring.</h3>
            <p className="t-lead">Tizim eng qisqa ketma-ketlikni tuzadi, tayyor marshrut esa bir bosishda haydovchiga boradi.</p>
          </div>
          <div className="ps-route__flow">
            <div className="ps-route__step">
              <span className="ps-step">
                <b>1</b>Marshrutni optimallashtirish
              </span>
              <RouteOptimizationShowcase />
            </div>
            <div className="ps-route__arrow" aria-hidden="true">
              <ArrowRight size={18} strokeWidth={2} />
            </div>
            <div className="ps-route__step">
              <span className="ps-step">
                <b>2</b>Tayyor marshrut haydovchida
              </span>
              <YandexRouteShowcase />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
