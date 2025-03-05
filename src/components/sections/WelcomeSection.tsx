
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export const WelcomeSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-nativo-cream/50 to-nativo-beige/50">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-nativo-green text-center mb-8 animate-fadeIn">
          Bienvenido a NATIVO
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Video Card with strict 1:1 aspect ratio */}
          <Card className="overflow-hidden shadow-lg animate-fadeIn" style={{ animationDelay: "0.2s" }}>
            <AspectRatio ratio={1/1} className="bg-nativo-sage/20">
              <div className="relative w-full h-full video-container">
                <video 
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ objectPosition: "center bottom" }}
                  controls
                  preload="metadata"
                  poster="/laptop-uploads/Gold.jpg"
                  playsInline
                  autoPlay={false}
                >
                  <source src="/laptop-uploads/NativoIntro.mp4" type="video/mp4" />
                  Tu navegador no soporta la etiqueta de video.
                </video>
              </div>
            </AspectRatio>
          </Card>

          {/* Welcome Message */}
          <div 
            className="space-y-4 animate-fadeIn text-nativo-green" 
            style={{ animationDelay: "0.4s" }}
          >
            <h3 className="text-2xl font-semibold">Tu Viaje Hacia el Bienestar Comienza Aquí</h3>
            <p className="text-lg leading-relaxed">
              En NATIVO, creemos en un enfoque holístico del bienestar que nutre el cuerpo, 
              la mente y el espíritu. Nuestro espacio está diseñado para ser tu santuario, 
              donde podrás reconectar con tu esencia natural y descubrir un camino hacia 
              una vida más equilibrada y consciente.
            </p>
            <p className="text-lg leading-relaxed">
              Te invitamos a ser parte de nuestra comunidad, donde cada persona es 
              valorada en su individualidad y apoyada en su viaje hacia el bienestar integral.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
