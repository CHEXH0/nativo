
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, CreditCard, Settings } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { PlanSection } from "@/components/profile/PlanSection";
import { ContentSection } from "@/components/profile/ContentSection";
import { PaymentSection } from "@/components/profile/PaymentSection";
import { SettingsSection } from "@/components/profile/SettingsSection";

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

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const success = queryParams.get('success');
    const plan = queryParams.get('plan');
    
    if (success === 'true' && plan) {
      toast.success(`Plan actualizado a ${plan}`);
      
      // After successful payment, try to load payment method data
      const paymentMethodId = queryParams.get('payment_method');
      if (paymentMethodId) {
        // In a real implementation, this would fetch the payment method details from Stripe
        // For this demo, we'll simulate saving the payment method
        const last4 = queryParams.get('last4') || '1234';
        const brand = queryParams.get('brand') || 'visa';
        
        const paymentMethod = {
          id: paymentMethodId,
          last4,
          brand,
          userId: userId
        };
        
        // Store in localStorage to simulate persistence
        const storedMethods = JSON.parse(localStorage.getItem('paymentMethods') || '[]');
        const updatedMethods = [...storedMethods, paymentMethod];
        localStorage.setItem('paymentMethods', JSON.stringify(updatedMethods));
        
        toast.success("Método de pago guardado");
      }
      
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (queryParams.get('canceled') === 'true') {
      toast.info("Pago cancelado");
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [userId]);

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
                <PaymentSection />
              </TabsContent>

              <TabsContent value="settings">
                <SettingsSection />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
