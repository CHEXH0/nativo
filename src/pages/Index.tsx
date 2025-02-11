
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { WelcomeSection } from "@/components/sections/WelcomeSection";
import { ProgramsSection } from "@/components/sections/ProgramsSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-nativo-cream to-nativo-beige">
      <Navbar />
      <HeroSection />
      <WelcomeSection />
      <ProgramsSection />
    </div>
  );
};

export default Index;
