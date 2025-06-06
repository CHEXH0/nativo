
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AuthError } from "@supabase/supabase-js";

const Login = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/");
      }
      
      // Clear error when auth state changes
      if (event === 'SIGNED_OUT') {
        setErrorMessage("");
      }
    });
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
        default:
          setErrorMessage(error.message);
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event) => {
      if (event === 'USER_UPDATED') {
        const { error } = await supabase.auth.getSession();
        if (error) {
          handleAuthError(error);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-nativo-beige flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <div className="mb-8 text-center">
          <img
            src="/laptop-uploads/Nativo-2025.jpg"
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
          redirectTo={window.location.origin}
        />
      </div>
    </div>
  );
};

export default Login;
