
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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
        className="absolute inset-0 bg-black bg-opacity-50 bg-cover bg-center" 
        style={{ backgroundImage: "url('/laptop-uploads/Jaguar2.jpg')" }} 
      />
      <div className="container px-4 mx-auto relative">
        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center h-full text-center mt-28">
          <h1 className="text-4xl md:text-6xl font-bold text-nativo-green mb-8 animate-fadeIn bg-nativo-cream/80 bg-opacity-85 p-4 rounded">
            Tu Camino Hacia el Bienestar Holístico
          </h1>
          <p 
            className="text-xl text-black mb-8 animate-fadeIn bg-nativo-cream/80 bg-opacity-85 p-4 rounded" 
            style={{ animationDelay: "0.2s" }}
          >
            Descubre el equilibrio perfecto entre cuerpo, mente y espíritu con NATIVO Holístico
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                className="bg-nativo-green text-nativo-cream px-8 py-3 rounded-md hover:bg-nativo-brown transition-colors duration-300 animate-fadeIn shadow-lg" 
                style={{ animationDelay: "0.4s" }}
              >
                Comienza Tu Viaje
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-nativo-cream">
              <MembershipsSection inDialog={true} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};
