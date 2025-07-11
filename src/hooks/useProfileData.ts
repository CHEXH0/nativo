
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { Session, User } from "@supabase/supabase-js";

export const useProfileData = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Usuario NATIVO");
  const [userEmail, setUserEmail] = useState("usuario@example.com");
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const updateUserData = useCallback(async (user: User) => {
    try {
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

      // User profile data loaded successfully
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  }, []);

  const refreshUserData = useCallback(async () => {
    const { data: { session: currentSession } } = await supabase.auth.getSession();
    if (currentSession?.user) {
      await updateUserData(currentSession.user);
    }
  }, [updateUserData]);

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      
      try {
        // Set up auth state listener first
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            console.log('Auth state changed:', event, session?.user?.id);
            setSession(session);
            setUser(session?.user ?? null);
            
            if (!session) {
              navigate('/login');
              return;
            }
            
            // Update user data when session changes
            if (session.user) {
              await updateUserData(session.user);
            }
            
            setIsLoading(false);
          }
        );

        // Check for existing session
        const { data: { session: currentSession }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Error getting session:", error);
          navigate('/login');
          return;
        }
        
        if (!currentSession) {
          navigate('/login');
          return;
        }
        
        setSession(currentSession);
        setUser(currentSession.user);
        await updateUserData(currentSession.user);
        setIsLoading(false);

        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error("Error in checkAuth:", error);
        setIsLoading(false);
        navigate('/login');
      }
    };

    checkAuth();
  }, [navigate, updateUserData]);

  return {
    userName,
    userEmail,
    isLoading,
    userId,
    avatarUrl,
    session,
    user,
    refreshUserData
  };
};
