
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "María González",
    role: "Participante del Programa de Bienestar",
    quote: "NATIVO cambió mi vida por completo. Los talleres holísticos me ayudaron a encontrar equilibrio y paz interior.",
  },
  {
    name: "Carlos Rodríguez",
    role: "Miembro de Casa NATIVO",
    quote: "La conexión con la naturaleza y la comunidad que encontré aquí es invaluable. Un espacio único para el crecimiento personal.",
  },
  {
    name: "Ana Valencia",
    role: "Estudiante de Talleres Holísticos",
    quote: "Los facilitadores son increíbles. Su conocimiento y dedicación han sido fundamentales en mi proceso de transformación.",
  },
];

export const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-nativo-beige/50 to-nativo-cream/50">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-nativo-green text-center mb-12 animate-fadeIn">
          Testimonios
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="animate-fadeIn" 
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <Card className="h-full bg-white/80 backdrop-blur-sm border-nativo-sage/20 hover:border-nativo-sage/40 transition-colors">
                <CardContent className="pt-6">
                  <Quote className="h-8 w-8 text-nativo-sage mb-4" />
                  <p className="text-nativo-green text-lg mb-6 italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="space-y-1">
                    <h4 className="font-semibold text-nativo-green">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-nativo-sage">
                      {testimonial.role}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
