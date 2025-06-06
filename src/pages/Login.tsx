
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { AuthError, Session } from "@supabase/supabase-js";

const Login = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const checkInitialAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Error checking initial session:", error);
          setErrorMessage("Error al verificar la sesión");
        } else if (session && mounted) {
          navigate("/profile");
          return;
        }
      } catch (error) {
        console.error("Error in checkInitialAuth:", error);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth event:', event);
        
        if (!mounted) return;

        if (event === 'SIGNED_IN' && session) {
          navigate("/profile");
        } else if (event === 'SIGNED_OUT') {
          setErrorMessage("");
        } else if (event === 'TOKEN_REFRESHED') {
          console.log('Token refreshed successfully');
        }
        
        setIsLoading(false);
      }
    );

    checkInitialAuth();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  // Handle auth errors
  useEffect(() => {
    const handleAuthError = (error: AuthError) => {
      switch (error.message) {
        case "User already registered":
          setErrorMessage("Este correo ya está registrado. Por favor inicia sesión.");
          break;
        case "Invalid login credentials":
          setErrorMessage("Correo o contraseña incorrectos. Por favor verifica tus credenciales e intenta de nuevo.");
          break;
        case "Email not confirmed":
          setErrorMessage("Por favor confirma tu correo electrónico antes de iniciar sesión.");
          break;
        case "Too many requests":
          setErrorMessage("Demasiados intentos. Por favor espera unos minutos antes de intentar de nuevo.");
          break;
        default:
          setErrorMessage(`Error de autenticación: ${error.message}`);
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'USER_UPDATED') {
        const { error } = await supabase.auth.getSession();
        if (error) {
          handleAuthError(error);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-nativo-beige flex items-center justify-center p-4">
        <div className="flex items-center gap-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-nativo-green"></div>
          <span className="text-nativo-green">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-nativo-beige flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <div className="mb-8 text-center">
          <img
            src="/laptop-uploads/Nativo-2025.png"
            alt="NATIVO Logo"
            className="h-16 mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-nativo-green">Bienvenido a NATIVO</h1>
          <p className="text-gray-600">Inicia sesión para continuar</p>
        </div>
        
        {errorMessage && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#2D5235',
                  brandAccent: '#557C5F',
                }
              }
            }
          }}
          providers={[]}
          redirectTo={`${window.location.origin}/profile`}
          showLinks={true}
          view="sign_in"
        />
      </div>
    </div>
  );
};

export default Login;
