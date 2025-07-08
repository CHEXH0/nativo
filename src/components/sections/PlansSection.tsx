import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Crown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSubscription } from "@/hooks/useSubscription";

const plans = [
  {
    id: "basico",
    title: "Plan Básico",
    price: "$19/mes",
    features: [
      "Acceso a contenido básico",
      "Newsletter mensual",
      "Guías de meditación",
      "Soporte por email"
    ],
    popular: false
  },
  {
    id: "gold",
    title: "Plan GOLD",
    price: "$59/mes",
    features: [
      "Todo lo del Plan Básico",
      "Talleres exclusivos",
      "Sesiones de bienestar",
      "Consultas personalizadas",
      "Acceso prioritario"
    ],
    popular: true
  },
  {
    id: "vip",
    title: "Plan VIP",
    price: "$109/mes",
    features: [
      "Todo lo del Plan GOLD",
      "Sesiones 1 a 1",
      "Programa personalizado",
      "Acceso completo",
      "Soporte 24/7"
    ],
    popular: false
  }
];

export const PlansSection = () => {
  const { t } = useLanguage();
  const { subscription_tier, createCheckout, loading } = useSubscription();

  const handleSelectPlan = (planId: string) => {
    if (subscription_tier === planId) {
      // User already has this plan
      return;
    }
    createCheckout(planId);
  };

  return (
    <section className="py-12 md:py-24 bg-gradient-to-br from-nativo-sage/10 via-nativo-cream/50 to-nativo-beige/30">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-nativo-green via-nativo-brown to-nativo-gold bg-clip-text text-transparent">
            Nuestros Planes
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-nativo-green via-nativo-gold to-nativo-brown mx-auto rounded-full mb-4"></div>
          <p className="text-lg text-nativo-brown/80 max-w-2xl mx-auto">
            Elige el plan perfecto para tu viaje hacia el bienestar holístico
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const isCurrentPlan = subscription_tier === plan.id;
            const isPopular = plan.popular;
            
            return (
              <div 
                key={plan.id} 
                className="animate-fade-in transform hover:scale-105 transition-all duration-200 group relative" 
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card className={`relative p-6 bg-white ${
                  isCurrentPlan 
                    ? 'border-2 border-nativo-green shadow-2xl ring-2 ring-nativo-green/20' 
                    : isPopular 
                      ? 'border-2 border-nativo-green shadow-2xl' 
                      : 'border border-nativo-sage/30 shadow-lg'
                } hover:shadow-xl transition-all duration-300`}>
                  {isCurrentPlan && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-nativo-green text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <Crown className="h-3 w-3" />
                      Tu Plan Actual
                    </div>
                  )}
                  {isPopular && !isCurrentPlan && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-nativo-green text-white px-4 py-1 rounded-full text-sm font-medium">
                      Más Popular
                    </div>
                  )}
                
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-nativo-green mb-2">
                    {plan.title}
                  </CardTitle>
                  <div className="text-4xl font-bold text-nativo-charcoal mb-4">
                    {plan.price}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-nativo-sage">
                        <Check className="h-5 w-5 text-nativo-green mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                      isCurrentPlan
                        ? 'bg-nativo-sage text-white cursor-default'
                        : isPopular 
                          ? 'bg-nativo-green text-white hover:bg-nativo-brown shadow-lg hover:shadow-xl' 
                          : 'bg-nativo-cream text-nativo-green border-2 border-nativo-green hover:bg-nativo-green hover:text-white'
                    }`}
                    onClick={() => handleSelectPlan(plan.id)}
                    disabled={loading || isCurrentPlan}
                  >
                    {isCurrentPlan ? 'Plan Actual' : 'Seleccionar Plan'}
                  </Button>
                </CardContent>
                
                <div className="absolute inset-0 bg-gradient-to-t from-nativo-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg pointer-events-none" />
               </Card>
             </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};