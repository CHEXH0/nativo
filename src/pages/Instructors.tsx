

import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect } from "react";

const instructors = [
  {
    name: "Juan Manuel Fonseca",
    role: "Facilitador Principal",
    image: "/laptop-uploads/JuanMa-Profile.png",
    bio: "Especialista en medicina tradicional y fitness holistico, con más de 10 años de experiencia."
  },
  {
    name: "Reyna Sanchez Chaidez",
    role: "Facilitadora de Holistica",
    image: "/laptop-uploads/Reynita.jpg",
    bio: "Terapeuta especializada en Theta Healing, meditación y sanación enfocada en los espacios de los animales."
  }
];

const Instructors = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-nativo-cream to-nativo-beige">
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-nativo-green mb-4">
            Nuestros Instructores
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Conoce a nuestro equipo de instructores especializados, cada uno comprometido 
            con guiarte en tu viaje hacia el bienestar integral y la transformación personal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {instructors.map((instructor, index) => (
            <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 aspect-square">
              <CardContent className="p-0 h-full">
                <div className="flex flex-col h-full">
                  <div className="flex-1">
                    <div className="w-full h-full overflow-hidden">
                      <img 
                        src={instructor.image} 
                        alt={instructor.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="p-6 bg-white">
                    <h3 className="text-xl font-semibold text-nativo-green mb-2">
                      {instructor.name}
                    </h3>
                    <p className="text-sm font-medium text-nativo-sage mb-3">
                      {instructor.role}
                    </p>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {instructor.bio}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="bg-nativo-cream/50 border-nativo-sage/20">
            <CardHeader>
              <CardTitle className="text-nativo-green">
                ¿Quieres formar parte de nuestro equipo?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Si eres un profesional del bienestar y compartes nuestra visión holística, 
                nos encantaría conocerte.
              </p>
              <a 
                href="mailto:info@nativo.com" 
                className="inline-block bg-nativo-green text-white px-6 py-3 rounded-lg hover:bg-nativo-green/90 transition-colors"
              >
                Contáctanos
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Instructors;

