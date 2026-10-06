import { AISection } from "@/components/AISection";
import { BlogSection } from "@/components/BlogSection";
import { FAQSection } from "@/components/FAQSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { DeliverySection } from "@/components/DeliverySection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { IntegrationsSection } from "@/components/IntegrationsSection";
import { OperationsSection } from "@/components/OperationsSection";
import { PricingSection } from "@/components/PricingSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FeaturesSection />
        <IntegrationsSection />
        <HowItWorksSection />
        <DeliverySection />
        <OperationsSection />
        <AISection />
        <PricingSection />
        <TestimonialsSection />
        <FAQSection />
        <BlogSection />
      </main>
      <Footer />
    </>
  );
}
