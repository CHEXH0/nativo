import { ProgramCard } from "@/components/ProgramCard";

const programs = [
  {
    title: "Programa de Plan De Vida",
    description: "Descubre tu camino hacia una vida más equilibrada y consciente con nuestro programa holístico personalizado.",
    image: "/laptop-uploads/Vida.jpg",
  },
  {
    title: "Programa de Fitness",
    description: "Alcanza tus objetivos físicos con un enfoque integral que combina ejercicio, nutrición y bienestar mental.",
    image: "/laptop-uploads/Fitness.jpg",
  },
  {
    title: "Programa de Detox",
    description: "Renueva tu cuerpo y mente con nuestro programa de desintoxicación natural y sostenible.",
    image: "/laptop-uploads/Detox.jpg",
  },
];

export const ProgramsSection = () => {
  return (
    <section id="programas" className="py-12 md:py-24 bg-nativo-cream/50">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-nativo-green text-center mb-12">
          Nuestros Programas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <div key={index} className="animate-fadeIn" style={{ animationDelay: `${index * 0.2}s` }}>
              <ProgramCard {...program} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};