import { ShowcasePoints } from "./ProductShowcaseSection";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import { AITahlilchiShowcase } from "./showcase/AITahlilchiShowcase";
import { CustomerIntelligenceShowcase } from "./showcase/CustomerIntelligenceShowcase";

/** AI analyst: sticky copy on the left, the two AI product views scroll past on the right. */
export function AISection() {
  return (
    <section id="ai" className="ps-band" aria-labelledby="ai-title">
      <div className="container-x section-pad">
        <div className="ps-ai">
          <div className="ps-ai__copy">
            <SectionHeader tag="AI Tahlilchi" title="Muammoni sizdan oldin ko‘radi." id="ai-title" align="left">
              <p className="t-lead">
                AI Tahlilchi buyurtma, haydovchi va mijoz ma’lumotlarini doimiy kuzatadi va nima qilish kerakligini aniq
                aytadi.
              </p>
            </SectionHeader>
            <Reveal>
              <ShowcasePoints
                points={[
                  "Kechikish xavfi bor buyurtmalar",
                  "Haddan tashqari yuklangan haydovchilar",
                  "Marshrutni optimallashtirish imkoniyati",
                  "Qayta buyurtma vaqti kelgan mijozlar",
                  "Qaytarib olish mumkin bo‘lgan daromad",
                ]}
              />
            </Reveal>
          </div>
          <div className="ps-ai__visuals">
            <AITahlilchiShowcase />
            <CustomerIntelligenceShowcase />
          </div>
        </div>
      </div>
    </section>
  );
}
