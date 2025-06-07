
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useEffect } from "react";

export const WelcomeSection = () => {
  useEffect(() => {
    // Preload the video thumbnail
    const preloadImage = new Image();
    preloadImage.src = "/laptop-uploads/Nativo-2025.png";
  }, []);

  return (
    <section className="py-16 bg-gradient-to-b from-nativo-cream via-nativo-beige/80 to-nativo-sage/20">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-nativo-green text-center mb-8 animate-fadeIn">
          Bienvenido a NATIVO
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Video Card with elegant border */}
          <Card className="overflow-hidden shadow-2xl animate-fadeIn border-2 border-nativo-gold/30 bg-gradient-to-br from-nativo-cream to-nativo-beige" style={{ animationDelay: "0.2s" }}>
            <AspectRatio ratio={1/1} className="bg-nativo-sage/20">
              <div className="relative w-full h-full">
                <video 
                  className="w-full h-full object-cover rounded-lg"
                  controls
                  preload="metadata"
                  poster="/laptop-uploads/Nativo-2025.png"
                  playsInline
                  muted
                >
                  <source src="/laptop-uploads/NativoIntro.mp4" type="video/mp4" />
                  Tu navegador no soporta la etiqueta de video.
                </video>
              </div>
            </AspectRatio>
          </Card>

          {/* Welcome Message with enhanced styling */}
          <div 
            className="space-y-6 animate-fadeIn text-nativo-green bg-gradient-to-br from-nativo-cream/50 to-nativo-beige/30 p-6 rounded-2xl border border-nativo-gold/20 shadow-lg" 
            style={{ animationDelay: "0.4s" }}
          >
            <h3 className="text-2xl font-semibold text-nativo-green border-b-2 border-nativo-gold/30 pb-2">
              Tu Viaje Hacia el Bienestar Comienza Aquí
            </h3>
            <p className="text-lg leading-relaxed text-nativo-charcoal/80">
              En NATIVO, creemos en un enfoque holístico del bienestar que nutre el cuerpo, 
              la mente y el espíritu. Nuestro espacio está diseñado para ser tu santuario, 
              donde podrás reconectar con tu esencia natural y descubrir un camino hacia 
              una vida más equilibrada y consciente.
            </p>
            <p className="text-lg leading-relaxed text-nativo-charcoal/80">
              Te invitamos a ser parte de nuestra comunidad, donde cada persona es 
              valorada en su individualidad y apoyada en su viaje hacia el bienestar integral.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
