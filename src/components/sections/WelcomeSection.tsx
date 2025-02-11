
import { Card } from "@/components/ui/card";

export const WelcomeSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-nativo-cream/50 to-nativo-beige/50">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-nativo-green text-center mb-8 animate-fadeIn">
          Bienvenido a NATIVO
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Video Card */}
          <Card className="overflow-hidden shadow-lg animate-fadeIn" style={{ animationDelay: "0.2s" }}>
            <div className="aspect-video bg-nativo-sage/20 flex items-center justify-center">
              <p className="text-nativo-sage">Video Placeholder</p>
            </div>
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
