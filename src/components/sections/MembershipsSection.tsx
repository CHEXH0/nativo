
import { PricingCard } from "@/components/PricingCard";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const memberships = [
  {
    id: "basic",
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
    id: "gold",
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
    id: "vip",
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
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleSelectPlan = async (planId: string) => {
    setSelectedPlan(planId);
    
    // In a real application, this would redirect to a payment page
    // For this demo, we'll simulate a successful payment and update the plan directly
    if (inDialog) {
      try {
        setIsLoading(true);
        
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          toast.error("Debes iniciar sesión para suscribirte");
          return;
        }
        
        const userId = session.user.id;
        
        // Call the security definer function to update the user's plan
        const { error } = await supabase.rpc('update_user_plan', {
          user_id: userId,
          new_plan: planId
        });
        
        if (error) throw error;
        
        toast.success(`Plan actualizado a ${planId}`);
        
        // Reload the page to reflect changes
        window.location.reload();
      } catch (error) {
        console.error("Error updating plan:", error);
        toast.error("No se pudo actualizar el plan");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const sectionClass = inDialog 
    ? "py-8" 
    : "py-12 md:py-24 bg-gradient-to-t from-nativo-sage/10 to-nativo-cream/50";

  return (
    <section id="membresias" className={sectionClass}>
      <div className="container px-4 mx-auto">
        {!inDialog && (
          <h2 className="text-3xl md:text-4xl font-bold text-nativo-green text-center mb-12">
            Membresías
          </h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {memberships.map((membership, index) => (
            <div key={index} className="animate-fadeIn" style={{ animationDelay: `${index * 0.2}s` }}>
              <PricingCard 
                {...membership} 
                onSelect={() => handleSelectPlan(membership.id)}
                isSelected={selectedPlan === membership.id}
                isLoading={isLoading && selectedPlan === membership.id}
                inDialog={inDialog}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
