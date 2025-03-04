
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { useState } from "react";
import { ProfileAvatar } from "./ProfileAvatar";
import { EditableName } from "./EditableName";
import { PlanBadge } from "./PlanBadge";

interface ProfileHeaderProps {
  userName: string;
  userEmail: string;
  avatarUrl: string | null;
  userPlan: string;
  isLoading: boolean;
}

export const ProfileHeader = ({
  userName,
  userEmail,
  avatarUrl,
  userPlan,
  isLoading
}: ProfileHeaderProps) => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleProfileUpdate = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <Card className="mb-8">
      <CardContent className="flex items-center gap-6 py-6">
        <ProfileAvatar 
          userName={userName} 
          avatarUrl={avatarUrl} 
          onAvatarUpdated={handleProfileUpdate}
        />
        <div className="flex-1">
          <EditableName 
            userName={userName} 
            isLoading={isLoading} 
            onNameUpdated={handleProfileUpdate}
          />
          <p className="text-nativo-sage">
            {isLoading ? "Cargando..." : userEmail}
          </p>
          <PlanBadge userPlan={userPlan} />
        </div>
      </CardContent>
    </Card>
  );
};
