
import { ProgramCard } from "@/components/ProgramCard";
import { useLanguage } from "@/contexts/LanguageContext";

const programs = [
  {
    title: "Talleres Holisticos",
    description: "Descubre tu camino hacia una vida más equilibrada y consciente con nuestros talleres.",
    image: "/laptop-uploads/Vida.jpg",
    slug: "talleres-holisticos"
  },
  {
    title: "Programa De Bienestar",
    description: "Lleva una vida saludable integrando el ejercicio la nutrición, las emociones, y la espiritualidad mediante asesorías personalizadas.",
    image: "/laptop-uploads/Equal.jpg",
    slug: "programa-bienestar"
  },
  {
    title: "Casa NATIVA",
    description: "Es un lugar donde podrás conectar contigo mismo, con las plantas, con los animales, y con la espiritualidad.",
    image: "/laptop-uploads/NativaCasa.jpg",
    slug: "casa-nativo"
  },
];

export const ProgramsSection = () => {
  const { t } = useLanguage();
  return (
    <section id="programas" className="py-12 md:py-24 bg-gradient-to-br from-nativo-sage/10 via-nativo-cream to-nativo-beige/50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-nativo-green via-nativo-brown to-nativo-gold bg-clip-text text-transparent">
            {t('programs.title')}
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-nativo-green via-nativo-gold to-nativo-brown mx-auto rounded-full mb-4"></div>
          <p className="text-lg text-nativo-brown/80 max-w-2xl mx-auto">
            Descubre nuestros programas diseñados para tu bienestar integral
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {programs.map((program, index) => (
            <div key={index} className="animate-fade-in transform hover:scale-105 transition-all duration-200 group" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="relative">
                <ProgramCard {...program} />
                <div className="absolute inset-0 bg-gradient-to-t from-nativo-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
