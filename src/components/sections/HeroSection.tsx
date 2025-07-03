
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MembershipsSection } from "./MembershipsSection";
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export const HeroSection = () => {
  const { t } = useLanguage();
  
  useEffect(() => {
    // Preload the Jaguar image
    const preloadImage = new Image();
    preloadImage.src = "/laptop-uploads/Jaguar2.jpg";
  }, []);

  return (
    <section id="inicio" className="h-screen pt-24 pb-12 md:pt-32 md:pb-24 relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-gradient-to-b from-nativo-charcoal/40 via-nativo-green/30 to-nativo-brown/40 bg-cover bg-center" 
        style={{ backgroundImage: "url('/laptop-uploads/Jaguar2.jpg')" }} 
      />
      <div className="absolute inset-0" />
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center h-full text-center mt-28">
          <h1 className="text-4xl md:text-6xl font-bold text-nativo-cream mb-8 animate-fadeIn backdrop-blur-sm bg-nativo-green/20 p-6 rounded-2xl">
            {t('hero.title')}
          </h1>
          <p 
            className="text-xl text-nativo-cream mb-8 animate-fadeIn backdrop-blur-sm bg-nativo-sage/20 p-4 rounded-xl shadow-xl" 
            style={{ animationDelay: "0.2s" }}
          >
            {t('hero.subtitle')}
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                className="relative overflow-hidden bg-gradient-to-r from-nativo-green to-nativo-brown hover:from-nativo-gold hover:to-nativo-brown text-white px-8 py-3 rounded-full font-semibold transform transition-all duration-200 hover:scale-105 animate-fade-in shadow-2xl group" 
                style={{ animationDelay: "300ms" }}
              >
                <span className="relative z-10">{t('hero.cta')}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-nativo-gold to-nativo-brown opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-nativo-cream border-2 border-nativo-gold/30">
              <DialogTitle className="text-2xl font-bold text-nativo-green mb-4">
                {t('hero.memberships.title')}
              </DialogTitle>
              <DialogDescription className="text-nativo-charcoal/70 mb-6">
                {t('hero.memberships.subtitle')}
              </DialogDescription>
              <MembershipsSection inDialog={true} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};
