
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "María González",
    role: "Participante del Programa de Bienestar",
    quote: "NATIVO cambió mi vida por completo. Los talleres holísticos me ayudaron a encontrar equilibrio y paz interior.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop"
  },
  {
    name: "Carlos Rodríguez",
    role: "Miembro de Casa NATIVO",
    quote: "La conexión con la naturaleza y la comunidad que encontré aquí es invaluable. Un espacio único para el crecimiento personal.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop"
  },
  {
    name: "Ana Valencia",
    role: "Estudiante de Talleres Holísticos",
    quote: "Los facilitadores son increíbles. Su conocimiento y dedicación han sido fundamentales en mi proceso de transformación.",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=400&fit=crop"
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
                  <div className="flex items-start gap-4 mb-6">
                    <Avatar className="h-12 w-12 border-2 border-nativo-sage/20">
                      <AvatarImage src={testimonial.image} alt={testimonial.name} />
                      <AvatarFallback className="bg-nativo-sage/20">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <Quote className="h-8 w-8 text-nativo-sage" />
                  </div>
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
