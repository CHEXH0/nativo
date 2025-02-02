import { ProgramCard } from "@/components/ProgramCard";

const programs = [
  {
    title: "Talleres Holisticos",
    description: "Descubre tu camino hacia una vida más equilibrada y consciente con nuestros reuniones.",
    image: "/laptop-uploads/Vida.jpg",
  },
  {
    title: "Programa De Bienestar",
    description: "Lleva una vida saludable integrando el ejercicio la nutricion, las emociones, y la espirutualidad.",
    image: "/laptop-uploads/Fitness.jpg",
  },
  {
    title: "Casa NATIVO",
    description: "Es un lugar donde te podras conectar contigomismo, la naturaleza, y con la espiritualidad.",
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