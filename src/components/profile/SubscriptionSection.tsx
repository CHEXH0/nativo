import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSubscription } from "@/hooks/useSubscription";
import { Crown, Calendar, CreditCard, RefreshCw } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const planNames = {
  basico: "Plan Básico",
  gold: "Plan GOLD",
  vip: "Plan VIP",
  none: "Sin suscripción"
};

const planColors = {
  basico: "bg-blue-100 text-blue-800",
  gold: "bg-yellow-100 text-yellow-800",
  vip: "bg-purple-100 text-purple-800",
  none: "bg-gray-100 text-gray-800"
};

export const SubscriptionSection = () => {
  const { 
    subscribed, 
    subscription_tier, 
    subscription_end, 
    loading, 
    checkSubscription, 
    manageSubscription 
  } = useSubscription();

  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5" />
            Suscripción
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-10 w-40" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Crown className="h-5 w-5" />
          Mi Suscripción
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Badge className={planColors[subscription_tier as keyof typeof planColors] || planColors.none}>
                {planNames[subscription_tier as keyof typeof planNames] || planNames.none}
              </Badge>
              {subscribed && (
                <Badge variant="outline" className="text-green-600 border-green-600">
                  Activa
                </Badge>
              )}
            </div>
            
            {subscription_end && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Renovación: {formatDate(subscription_end)}</span>
              </div>
            )}
            
            {!subscribed && (
              <p className="text-sm text-muted-foreground">
                No tienes una suscripción activa
              </p>
            )}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={checkSubscription}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Actualizar
          </Button>
        </div>

        <div className="flex gap-3">
          {subscribed && (
            <Button
              onClick={manageSubscription}
              className="flex items-center gap-2"
            >
              <CreditCard className="h-4 w-4" />
              Gestionar Suscripción
            </Button>
          )}
          
          <Button
            variant="outline"
            onClick={() => window.location.href = '/#planes'}
          >
            {subscribed ? 'Cambiar Plan' : 'Ver Planes'}
          </Button>
        </div>

        {subscribed && (
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-green-800">
              ✨ Tienes acceso completo a todas las funciones de tu plan {planNames[subscription_tier as keyof typeof planNames]}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};