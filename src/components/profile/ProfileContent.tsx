
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, CreditCard, Settings } from "lucide-react";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { PlanSection } from "@/components/profile/PlanSection";
import { ContentSection } from "@/components/profile/ContentSection";
import { PaymentSection } from "@/components/profile/PaymentSection";
import { SettingsSection } from "@/components/profile/SettingsSection";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProfileContentProps {
  userName: string;
  userEmail: string;
  avatarUrl: string | null;
  userPlan: string;
  isLoading: boolean;
  onProfileUpdate?: () => void;
}

export const ProfileContent = ({
  userName,
  userEmail,
  avatarUrl,
  userPlan,
  isLoading,
  onProfileUpdate
}: ProfileContentProps) => {
  const { t } = useLanguage();
  const [upgradeDialogOpen, setUpgradeDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("subscription");

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
            onProfileUpdate={onProfileUpdate}
          />

          <div className="mb-8">
            <ContentSection 
              userPlan={userPlan} 
              userEmail={userEmail}
              onUpgrade={() => setUpgradeDialogOpen(true)} 
            />
          </div>

          <div className="border-t border-nativo-sage/20 pt-6 mt-8">
            <h3 className="text-xl font-medium text-nativo-green mb-4">{t('profile.account.settings')}</h3>
            
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab} 
              className="space-y-6"
            >
              <TabsList className="grid grid-cols-3 gap-4 mb-6">
                <TabsTrigger value="subscription" className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  <span>{t('profile.tabs.subscription')}</span>
                </TabsTrigger>
                <TabsTrigger value="payment" className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  <span>{t('profile.tabs.payment')}</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  <span>{t('profile.tabs.settings')}</span>
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
