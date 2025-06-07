
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

export const HeroSection = () => {
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
      <div className="absolute inset-0 bg-natural-texture" />
      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center h-full text-center mt-28">
          <h1 className="text-4xl md:text-6xl font-bold text-nativo-cream mb-8 animate-fadeIn backdrop-blur-sm bg-nativo-green/20 border border-nativo-gold/30 p-6 rounded-2xl shadow-2xl">
            Tu Camino Hacia el Bienestar Holístico
          </h1>
          <p 
            className="text-xl text-nativo-cream mb-8 animate-fadeIn backdrop-blur-sm bg-nativo-sage/20 border border-nativo-gold/20 p-4 rounded-xl shadow-xl" 
            style={{ animationDelay: "0.2s" }}
          >
            Descubre el equilibrio perfecto entre cuerpo, mente y espíritu con NATIVO Holístico
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                className="bg-gradient-to-r from-nativo-gold to-nativo-brown text-nativo-cream px-8 py-4 text-lg rounded-full hover:from-nativo-brown hover:to-nativo-gold transition-all duration-300 animate-fadeIn shadow-2xl border-2 border-nativo-gold/50 hover:border-nativo-gold hover:scale-105 transform" 
                style={{ animationDelay: "0.4s" }}
              >
                Comienza Tu Viaje
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-nativo-cream border-2 border-nativo-gold/30">
              <DialogTitle className="text-2xl font-bold text-nativo-green mb-4">
                Nuestras Membresías
              </DialogTitle>
              <DialogDescription className="text-nativo-charcoal/70 mb-6">
                Elige el plan que mejor se adapte a tu viaje hacia el bienestar holístico
              </DialogDescription>
              <MembershipsSection inDialog={true} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};
