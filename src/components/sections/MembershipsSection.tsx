
import { PricingCard } from "@/components/PricingCard";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

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
  const navigate = useNavigate();
  const location = useLocation();

  // Check for successful payment from URL parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const success = queryParams.get('success');
    const plan = queryParams.get('plan');
    
    if (success === 'true' && plan) {
      // Update user plan after successful payment
      const updateUserPlan = async () => {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (!session) {
            toast.error("Debes iniciar sesión para actualizar tu plan");
            return;
          }
          
          const userId = session.user.id;
          
          const { error } = await supabase.rpc('update_user_plan', {
            user_id: userId,
            new_plan: plan
          });
          
          if (error) throw error;
          
          toast.success(`Plan actualizado a ${plan}`);
          
          // Clean up URL parameters
          const cleanUrl = window.location.pathname;
          window.history.replaceState({}, document.title, cleanUrl);
          
          // Reload the page to reflect changes
          window.location.reload();
        } catch (error) {
          console.error("Error updating plan:", error);
          toast.error("No se pudo actualizar el plan");
        }
      };
      
      updateUserPlan();
    } else if (queryParams.get('canceled') === 'true') {
      toast.info("Pago cancelado. No se ha realizado ningún cargo.");
      // Clean up URL parameters
      const cleanUrl = window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }
  }, [location.search]);

  const handleSelectPlan = async (planId: string) => {
    setSelectedPlan(planId);
    setIsLoading(true);
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Debes iniciar sesión para suscribirte");
        setIsLoading(false);
        navigate('/login');
        return;
      }
      
      const userId = session.user.id;
      
      // Call the Stripe checkout edge function
      const response = await supabase.functions.invoke('create-checkout', {
        body: { planId, userId }
      });
      
      if (response.error) {
        throw new Error(response.error.message);
      }
      
      // Redirect to Stripe Checkout
      window.location.href = response.data.url;
      
    } catch (error) {
      console.error("Error creating checkout session:", error);
      toast.error("No se pudo procesar el pago. Intenta nuevamente.");
      setIsLoading(false);
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
