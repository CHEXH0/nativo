
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { ProfileAvatar } from "./ProfileAvatar";
import { EditableName } from "./EditableName";


interface ProfileHeaderProps {
  userName: string;
  userEmail: string;
  avatarUrl: string | null;
  isLoading: boolean;
  onProfileUpdate?: () => void;
}

export const ProfileHeader = ({
  userName,
  userEmail,
  avatarUrl,
  isLoading,
  onProfileUpdate
}: ProfileHeaderProps) => {
  return (
    <Card className="mb-8">
      <CardContent className="flex items-center gap-6 py-6">
        <ProfileAvatar 
          userName={userName} 
          avatarUrl={avatarUrl} 
          onAvatarUpdated={onProfileUpdate}
        />
        <div className="flex-1">
          <EditableName 
            userName={userName} 
            isLoading={isLoading} 
            onNameUpdated={onProfileUpdate}
          />
          <p className="text-nativo-sage">
            {isLoading ? "Cargando..." : userEmail}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
