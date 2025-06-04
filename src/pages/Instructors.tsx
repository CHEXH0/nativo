
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect } from "react";

const instructors = [
  {
    name: "Ana García",
    role: "Instructora de Yoga y Meditación",
    image: "/laptop-uploads/SenoraTest.jpg",
    bio: "Con más de 10 años de experiencia en yoga y mindfulness, Ana guía a nuestros estudiantes hacia un estado de paz interior y bienestar físico."
  },
  {
    name: "Carlos Mendoza",
    role: "Especialista en Terapias Holísticas",
    image: "/laptop-uploads/Muscle_Man.jpg",
    bio: "Terapeuta certificado en medicina alternativa y sanación energética, Carlos combina técnicas ancestrales con enfoques modernos."
  },
  {
    name: "María Silva",
    role: "Coach de Bienestar Integral",
    image: "/laptop-uploads/BrendaTest.jpg",
    bio: "Especialista en coaching de vida y nutrición consciente, María ayuda a crear hábitos saludables y transformaciones duraderas."
  },
  {
    name: "David Ruiz",
    role: "Instructor de Movimiento Consciente",
    image: "/laptop-uploads/VilmaTest.jpg",
    bio: "Experto en técnicas de movimiento terapéutico y danza consciente, David facilita la conexión cuerpo-mente a través del movimiento."
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {instructors.map((instructor, index) => (
            <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3">
                    <Avatar className="w-full h-48 md:h-full rounded-none">
                      <AvatarImage 
                        src={instructor.image} 
                        alt={instructor.name}
                        className="object-cover"
                      />
                      <AvatarFallback className="rounded-none">
                        {instructor.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="md:w-2/3 p-6">
                    <h3 className="text-xl font-semibold text-nativo-green mb-2">
                      {instructor.name}
                    </h3>
                    <p className="text-sm font-medium text-nativo-sage mb-3">
                      {instructor.role}
                    </p>
                    <p className="text-gray-600 leading-relaxed">
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
