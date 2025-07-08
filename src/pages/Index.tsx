
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { PlansSection } from "@/components/sections/PlansSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-nativo-cream via-nativo-beige to-nativo-sage/20">
      <Navbar />
      <HeroSection />
      <PlansSection />
      <TestimonialsSection />
    </div>
  );
};

export default Index;
