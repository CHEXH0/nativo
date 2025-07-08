
import { useProfileData } from "@/hooks/useProfileData";
import { ProfileLoading } from "@/components/profile/ProfileLoading";
import { ProfileContent } from "@/components/profile/ProfileContent";

const Profile = () => {
  const {
    userName,
    userEmail,
    isLoading,
    userId,
    avatarUrl,
    refreshUserData
  } = useProfileData();

  if (isLoading) {
    return <ProfileLoading />;
  }

  return (
    <ProfileContent
      userName={userName}
      userEmail={userEmail}
      avatarUrl={avatarUrl}
      isLoading={isLoading}
      onProfileUpdate={refreshUserData}
    />
  );
};

export default Profile;
