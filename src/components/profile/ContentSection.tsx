
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useContentManagement } from "@/hooks/useContentManagement";
import { useSubscription } from "@/hooks/useSubscription";
import { AdminContentManagement } from "./AdminContentManagement";
import { 
  Play, 
  Clock, 
  Lock, 
  Shield, 
  Video,
  Crown 
} from "lucide-react";

interface ContentSectionProps {
  userEmail: string;
}

export const ContentSection = ({ userEmail }: ContentSectionProps) => {
  const { content, loading, isAdmin } = useContentManagement();
  const { subscription_tier, subscribed } = useSubscription();

  const canAccessContent = (requiredPlan: string) => {
    if (requiredPlan === 'none') return true;
    if (!subscribed) return false;
    
    const planHierarchy = { 'basico': 1, 'gold': 2, 'vip': 3 };
    const userPlanLevel = planHierarchy[subscription_tier as keyof typeof planHierarchy] || 0;
    const requiredLevel = planHierarchy[requiredPlan as keyof typeof planHierarchy] || 0;
    
    return userPlanLevel >= requiredLevel;
  };

  const getPlanBadgeColor = (plan: string) => {
    switch (plan) {
      case 'vip': return 'bg-purple-100 text-purple-800';
      case 'gold': return 'bg-yellow-100 text-yellow-800';
      case 'basico': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlanDisplayName = (plan: string) => {
    switch (plan) {
      case 'vip': return 'Plan VIP';
      case 'gold': return 'Plan GOLD';
      case 'basico': return 'Plan Básico';
      default: return 'Gratis';
    }
  };

  const handleVideoClick = (videoUrl: string | null, canAccess: boolean) => {
    if (!canAccess) {
      // Redirect to plans section
      window.location.href = '/#planes';
      return;
    }
    
    if (videoUrl) {
      window.open(videoUrl, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">Cargando contenido...</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {isAdmin && <AdminContentManagement />}
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="h-5 w-5" />
            Contenido Disponible
          </CardTitle>
        </CardHeader>
        <CardContent>
          {content.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No hay contenido disponible en este momento.
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {content.map((item) => {
                const canAccess = canAccessContent(item.required_plan);
                
                return (
                  <Card 
                    key={item.id} 
                    className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                      canAccess ? 'hover:scale-105' : 'opacity-75'
                    }`}
                    onClick={() => handleVideoClick(item.video_url, canAccess)}
                  >
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <h4 className="font-medium text-sm line-clamp-2">{item.title}</h4>
                          {!canAccess && (
                            <Lock className="h-4 w-4 text-muted-foreground flex-shrink-0 ml-2" />
                          )}
                        </div>
                        
                        {item.description && (
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {item.description}
                          </p>
                        )}
                        
                        <div className="flex flex-wrap gap-2">
                          <Badge className={getPlanBadgeColor(item.required_plan)}>
                            {getPlanDisplayName(item.required_plan)}
                          </Badge>
                          
                          {item.is_premium && (
                            <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                              <Shield className="h-3 w-3 mr-1" />
                              Premium
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-2">
                            {item.duration_minutes && (
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {item.duration_minutes} min
                              </span>
                            )}
                            {item.category && (
                              <span className="capitalize">{item.category}</span>
                            )}
                          </div>
                          
                          {canAccess ? (
                            <div className="flex items-center gap-1 text-green-600">
                              <Play className="h-3 w-3" />
                              <span>Ver</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 text-orange-600">
                              <Crown className="h-3 w-3" />
                              <span>Actualizar</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
