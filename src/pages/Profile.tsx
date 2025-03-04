import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Settings, CreditCard, Film, Package } from "lucide-react";
import { toast } from "sonner";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { PlanSection } from "@/components/profile/PlanSection";
import { ContentSection } from "@/components/profile/ContentSection";

const Profile = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Usuario NATIVO");
  const [userEmail, setUserEmail] = useState("usuario@example.com");
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [userPlan, setUserPlan] = useState("none");
  const [upgradeDialogOpen, setUpgradeDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("subscription");

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/login');
        return;
      }
      
      const user = session.user;
      if (user) {
        setUserId(user.id);
        const email = user.email || "usuario@example.com";
        setUserEmail(email);
        
        const fullName = user.user_metadata?.full_name || user.user_metadata?.name;
        if (fullName) {
          setUserName(fullName);
        } else {
          const nameFromEmail = email.split('@')[0];
          setUserName(nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1));
        }

        const avatarUrlFromMeta = user.user_metadata?.avatar_url;
        if (avatarUrlFromMeta) {
          setAvatarUrl(avatarUrlFromMeta);
        }

        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('plan')
          .eq('id', user.id)
          .single();

        if (profileError) {
          console.error("Error fetching user profile:", profileError);
        } else if (profileData) {
          setUserPlan(profileData.plan);
        }
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-nativo-cream to-nativo-beige">
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-4xl mx-auto">
          <ProfileHeader 
            userName={userName}
            userEmail={userEmail}
            avatarUrl={avatarUrl}
            userPlan={userPlan}
            isLoading={isLoading}
          />

          <div className="mb-8">
            <ContentSection 
              userPlan={userPlan} 
              onUpgrade={() => setUpgradeDialogOpen(true)} 
            />
          </div>

          <div className="border-t border-nativo-sage/20 pt-6 mt-8">
            <h3 className="text-xl font-medium text-nativo-green mb-4">Ajustes de cuenta</h3>
            
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab} 
              className="space-y-6"
            >
              <TabsList className="grid grid-cols-3 gap-4 mb-6">
                <TabsTrigger value="subscription" className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  <span>Suscripción</span>
                </TabsTrigger>
                <TabsTrigger value="payment" className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  <span>Pagos</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  <span>Ajustes</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="subscription">
                <PlanSection userPlan={userPlan} />
              </TabsContent>

              <TabsContent value="payment">
                <Card>
                  <CardHeader>
                    <CardTitle>Métodos de Pago</CardTitle>
                    <CardDescription>Gestiona tus métodos de pago</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="w-full">Agregar Método de Pago</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Ajustes de Cuenta</CardTitle>
                    <CardDescription>Administra tu cuenta NATIVO</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full">Cambiar Contraseña</Button>
                    <Button variant="outline" className="w-full text-red-600 hover:text-red-700">
                      Eliminar Cuenta
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
