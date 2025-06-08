
import { useProfileData } from "@/hooks/useProfileData";
import { ProfileUrlHandler } from "@/components/profile/ProfileUrlHandler";
import { ProfileLoading } from "@/components/profile/ProfileLoading";
import { ProfileContent } from "@/components/profile/ProfileContent";

const Profile = () => {
  const {
    userName,
    userEmail,
    isLoading,
    userId,
    avatarUrl,
    userPlan
  } = useProfileData();

  if (isLoading) {
    return <ProfileLoading />;
  }

  return (
    <>
      <ProfileUrlHandler userId={userId} />
      <ProfileContent
        userName={userName}
        userEmail={userEmail}
        avatarUrl={avatarUrl}
        userPlan={userPlan}
        isLoading={isLoading}
      />
    </>
  );
};

export default Profile;
