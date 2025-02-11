
import { PricingCard } from "@/components/PricingCard";

const memberships = [
  {
    title: "Básico",
    price: "$9/mes",
    features: [
      "Acceso a contenido básico",
      "Comunidad en línea",
      "Newsletter mensual",
      "Acesoria virtual al mes",
    ],
  },
  {
    title: "GOLD",
    price: "$59/mes",
    features: [
      "Todo lo del plan Básico",
      "Acceso a dos talleres grupales al mes",
      "Seguimiento personalizado por Chat",
      "2 acesorias en vivo al mes",
    ],
    isPopular: true,
  },
  {
    title: "VIP",
    price: "$109/mes",
    features: [
      "Todo lo del plan GOLD",
      "Acesorias privadas",
      "Talleres virtuales ilimitadas",
      "Limpieza energetica medicina tradicional"
    ],
  },
];

interface MembershipsSectionProps {
  inDialog?: boolean;
}

export const MembershipsSection = ({ inDialog = false }: MembershipsSectionProps) => {
  const sectionClass = inDialog 
    ? "py-8" 
    : "py-12 md:py-24 bg-gradient-to-t from-nativo-sage/10 to-nativo-cream/50";

  return (
    <section id="membresias" className={sectionClass}>
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
  );
};
