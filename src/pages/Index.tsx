
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { NewsletterSection } from "@/components/sections/NewsletterSection";

import { ProgramsSection } from "@/components/sections/ProgramsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-nativo-cream via-nativo-beige to-nativo-sage/20">
      <Navbar />
      <HeroSection />
      <ProgramsSection />
      <NewsletterSection />
      <TestimonialsSection />
    </div>
  );
};

export default Index;
