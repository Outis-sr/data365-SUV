import { ProductShowcaseSection } from "./ProductShowcaseSection";
import { SectionHeader } from "./SectionHeader";
import { FinanceShowcase } from "./showcase/FinanceShowcase";
import { InventoryShowcase } from "./showcase/InventoryShowcase";
import { ReportsShowcase } from "./showcase/ReportsShowcase";

/** Warehouse, money and reporting: three alternating copy / product rows. */
export function OperationsSection() {
  return (
    <section id="operations" aria-labelledby="operations-title">
      <div className="container-x section-pad section-stack">
        <SectionHeader tag="Ombor va moliya" title="Idish, pul va hisobot — hammasi hisobda." id="operations-title" />
        <div className="ps-rows">
          <ProductShowcaseSection
            kicker="Ombor"
            title="Har bir 19 litrlik idish hisobda."
            text="Tayyor suv, bo‘sh idishlar va mijozlardagi idishlar alohida hisoblanadi — qaytmagan idish yo‘qolib ketmaydi."
            points={[
              "Tayyor, bo‘sh va mijozlardagi idishlar bir ko‘rinishda",
              "Qaytmagan idishlar avtomatik belgilanadi",
              "Ertangi talab zaxira bilan solishtiriladi",
            ]}
            visual={<InventoryShowcase frame="surface" />}
          />
          <ProductShowcaseSection
            reverse
            kicker="Moliya"
            title="Pul qayerdaligini aniq biling."
            text="Bugungi tushum to‘lov turlari bo‘yicha, qarzdorlik esa mijozlar bo‘yicha real vaqtda ko‘rinadi."
            points={["Naqd, karta va Click / Payme bo‘yicha tushum", "Qarzdorlik va qarzdor mijozlar soni", "Qarz qaysi mijozlarda to‘planganini AI ko‘rsatadi"]}
            visual={<FinanceShowcase frame="surface" />}
          />
          <ProductShowcaseSection
            kicker="Hisobotlar"
            title="Haftalik hisobot o‘zi tayyor."
            text="Buyurtmalar, tushum va yangi mijozlar har hafta avtomatik yig‘iladi — qo‘lda jadval yuritish shart emas."
            points={["Buyurtma, tushum va yangi mijozlar dinamikasi", "PDF ko‘rinishida yuklab olish", "AI xulosasi: qaysi hududda o‘sish bor"]}
            visual={<ReportsShowcase frame="surface" />}
          />
        </div>
      </div>
    </section>
  );
}
