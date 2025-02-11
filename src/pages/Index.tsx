
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { WelcomeSection } from "@/components/sections/WelcomeSection";
import { ProgramsSection } from "@/components/sections/ProgramsSection";
import { MembershipsSection } from "@/components/sections/MembershipsSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-nativo-cream to-nativo-beige">
      <Navbar />
      <HeroSection />
      <WelcomeSection />
      <ProgramsSection />
      <MembershipsSection />
    </div>
  );
};

export default Index;
