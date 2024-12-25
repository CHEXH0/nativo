import { Navbar } from "@/components/Navbar";
import { ProgramCard } from "@/components/ProgramCard";
import { PricingCard } from "@/components/PricingCard";

const Index = () => {
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

  const memberships = [
    {
      title: "Básico Gratis",
      price: "Gratis",
      features: [
        "Acceso a contenido básico",
        "Comunidad en línea",
        "Newsletter mensual",
        "1 clase virtual al mes",
      ],
    },
    {
      title: "Professional",
      price: "$29/mes",
      features: [
        "Todo lo del plan Básico",
        "Acceso a todos los programas",
        "Asesoría personalizada",
        "4 clases virtuales al mes",
      ],
      isPopular: true,
    },
    {
      title: "Elite",
      price: "$59/mes",
      features: [
        "Todo lo del plan Professional",
        "Sesiones privadas",
        "Seguimiento personalizado",
        "Clases virtuales ilimitadas",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-nativo-cream to-nativo-beige">
      <Navbar />
      
      {/* Hero Section */}
      <section id="inicio" className="h-screen pt-24 pb-12 md:pt-32 md:pb-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50 bg-cover bg-center" style={{ backgroundImage: "url('/laptop-uploads/Jaguar2.jpg')" }} />
        <div className="container px-4 mx-auto relative">
        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center h-full text-center mt-28">
            <h1 className="text-4xl md:text-6xl font-bold text-nativo-green mb-8 animate-fadeIn bg-nativo-cream/80 bg-opacity-85 p-4 rounded">
              Tu Camino Hacia el Bienestar Holístico
            </h1>
            <p className="text-xl text-black mb-8 animate-fadeIn bg-nativo-cream/80 bg-opacity-85 p-4 rounded" style={{ animationDelay: "0.2s" }}>
              Descubre el equilibrio perfecto entre cuerpo, mente y espíritu con NATIVO Fitness Holístico
            </p>
            <button className="bg-nativo-green text-nativo-cream px-8 py-3 rounded-md hover:bg-nativo-brown transition-colors duration-300 animate-fadeIn shadow-lg" style={{ animationDelay: "0.4s" }}>
              Comienza Tu Viaje
            </button>
          </div>
        </div>
      </section>

      {/* Programs Section */}
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

      {/* Membership Section */}
      <section id="membresias" className="py-12 md:py-24 bg-gradient-to-t from-nativo-sage/10 to-nativo-cream/50">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-nativo-green text-center mb-12">
            Membresías
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {memberships.map((membership, index) => (
              <div key={index} className="animate-fadeIn" style={{ animationDelay: `${index * 0.2}s` }}>
                <PricingCard {...membership} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;