import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import WhatsNewSection from "@/components/WhatsNewSection";
import ServicesSection from "@/components/ServicesSection";
import AIToolsSection from "@/components/AIToolsSection";
import ProofSection from "@/components/ProofSection";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <HeroSection />
        <WhatsNewSection />
        <ServicesSection />
        <AIToolsSection />
        <ProofSection />
      </main>
      <Footer />
    </>
  );
}
