
import { ProgramCard } from "@/components/ProgramCard";

const programs = [
  {
    title: "Talleres Holisticos",
    description: "",
    image: "/laptop-uploads/Vida.jpg",
    slug: "talleres-holisticos"
  },
  {
    title: "Programa De Bienestar",
    description: "",
    image: "/laptop-uploads/Equal.jpg",
    slug: "programa-bienestar"
  },
  {
    title: "Casa NATIVA",
    description: "",
    image: "/laptop-uploads/NativaCasa.jpg",
    slug: "casa-nativo"
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
