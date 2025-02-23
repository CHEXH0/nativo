
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { Settings, CreditCard, Film, Package } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
      }
    };

    checkAuth();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-nativo-cream to-nativo-beige">
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardContent className="flex items-center gap-6 py-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>UN</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold text-nativo-green">Usuario NATIVO</h2>
                <p className="text-nativo-sage">usuario@example.com</p>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="subscription" className="space-y-6">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <TabsTrigger value="subscription" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                <span>Suscripción</span>
              </TabsTrigger>
              <TabsTrigger value="payment" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                <span>Pagos</span>
              </TabsTrigger>
              <TabsTrigger value="content" className="flex items-center gap-2">
                <Film className="h-4 w-4" />
                <span>Contenido</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>Ajustes</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="subscription">
              <Card>
                <CardHeader>
                  <CardTitle>Plan Actual</CardTitle>
                  <CardDescription>Detalles de tu suscripción a NATIVO</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-nativo-cream/50 rounded-lg">
                    <h3 className="font-semibold text-nativo-green mb-2">Plan GOLD</h3>
                    <p className="text-nativo-sage mb-4">$59/mes</p>
                    <Button variant="outline">Cambiar Plan</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payment">
              <Card>
                <CardHeader>
                  <CardTitle>Métodos de Pago</CardTitle>
                  <CardDescription>Gestiona tus métodos de pago</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full">Agregar Método de Pago</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content">
              <Card>
                <CardHeader>
                  <CardTitle>Contenido Premium</CardTitle>
                  <CardDescription>Accede a tu contenido exclusivo</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-nativo-sage">
                    <p>No hay contenido premium disponible en este momento.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Ajustes de Cuenta</CardTitle>
                  <CardDescription>Administra tu cuenta NATIVO</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full">Cambiar Contraseña</Button>
                  <Button variant="outline" className="w-full">Editar Perfil</Button>
                  <Button variant="outline" className="w-full text-red-600 hover:text-red-700">
                    Eliminar Cuenta
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
