
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Settings } from "lucide-react";
import { ProfileHeader } from "@/components/profile/ProfileHeader";

import { ContentSection } from "@/components/profile/ContentSection";
import { PaymentSection } from "@/components/profile/PaymentSection";
import { SettingsSection } from "@/components/profile/SettingsSection";

interface ProfileContentProps {
  userName: string;
  userEmail: string;
  avatarUrl: string | null;
  isLoading: boolean;
  onProfileUpdate?: () => void;
}

export const ProfileContent = ({
  userName,
  userEmail,
  avatarUrl,
  isLoading,
  onProfileUpdate
}: ProfileContentProps) => {
  const [activeTab, setActiveTab] = useState("content");

  return (
    <div className="min-h-screen bg-gradient-to-b from-nativo-cream to-nativo-beige">
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-4xl mx-auto">
          <ProfileHeader 
            userName={userName}
            userEmail={userEmail}
            avatarUrl={avatarUrl}
            isLoading={isLoading}
            onProfileUpdate={onProfileUpdate}
          />

          <div className="mb-8">
            <ContentSection 
              userEmail={userEmail}
            />
          </div>

          <div className="border-t border-nativo-sage/20 pt-6 mt-8">
            <h3 className="text-xl font-medium text-nativo-green mb-4">Configuración de Cuenta</h3>
            
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab} 
              className="space-y-6"
            >
              <TabsList className="grid grid-cols-2 gap-4 mb-6">
                <TabsTrigger value="payment" className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  <span>Pagos</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  <span>Configuración</span>
                </TabsTrigger>
              </TabsList>

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
