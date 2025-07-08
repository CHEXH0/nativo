
import { ProgramCard } from "@/components/ProgramCard";
import { useLanguage } from "@/contexts/LanguageContext";

const programs = [
  {
    title: "Limpieza Indígena Ancestral",
    description: "Purificación del cuerpo las emociones la mente y el alma",
    image: "/laptop-uploads/Detox.jpg",
    slug: "limpieza-indigena-ancestral"
  },
  {
    title: "Armonización y Protección",
    description: "De casas, negocios y coches. Los espacios guardan memorias, limpiar las memorias de los lugares y sembrar energía armoniosa y abundante.",
    image: "/laptop-uploads/Casa_Nativa.jpg",
    slug: "armonizacion-proteccion"
  },
  {
    title: "Conciencia Corporal y Recuperación Física",
    description: "Nuestro cuerpo habla y las memorias salen a la superficie, la terapia física hace fluir los conflictos represados",
    image: "/laptop-uploads/Bienestar.jpg",
    slug: "conciencia-corporal"
  },
  {
    title: "Conexión con tu Mascota",
    description: "Mediante la técnica de meditación guiada el vínculo con nuestro peludito se hace más profundo",
    image: "/laptop-uploads/Pets.webp",
    slug: "conexion-mascota"
  },
];

export const ProgramsSection = () => {
  const { t } = useLanguage();
  return (
    <section id="programas" className="py-12 md:py-24 bg-gradient-to-br from-nativo-sage/10 via-nativo-cream to-nativo-beige/50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-nativo-green via-nativo-brown to-nativo-gold bg-clip-text text-transparent">
            Terapias Premium
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-nativo-green via-nativo-gold to-nativo-brown mx-auto rounded-full mb-4"></div>
          <p className="text-lg text-nativo-brown/80 max-w-2xl mx-auto">
            Servicios de sanación y armonización para tu bienestar integral
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {programs.map((program, index) => (
            <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <ProgramCard {...program} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
