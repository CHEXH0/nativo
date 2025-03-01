
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { Settings, CreditCard, Film, Package, Edit, Camera, Lock } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { MembershipsSection } from "@/components/sections/MembershipsSection";

const Profile = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Usuario NATIVO");
  const [userEmail, setUserEmail] = useState("usuario@example.com");
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [editNameOpen, setEditNameOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [userPlan, setUserPlan] = useState("none");
  const [upgradeDialogOpen, setUpgradeDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/login');
        return;
      }
      
      // Get user details from the session
      const user = session.user;
      if (user) {
        setUserId(user.id);
        const email = user.email || "usuario@example.com";
        setUserEmail(email);
        
        // Get user's name from metadata or user email
        const fullName = user.user_metadata?.full_name || user.user_metadata?.name;
        if (fullName) {
          setUserName(fullName);
        } else {
          // If no name is found, use the first part of the email
          const nameFromEmail = email.split('@')[0];
          setUserName(nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1));
        }

        // Get avatar from user metadata if available
        const avatarUrlFromMeta = user.user_metadata?.avatar_url;
        if (avatarUrlFromMeta) {
          setAvatarUrl(avatarUrlFromMeta);
        }

        // Fetch user plan from profiles table
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('plan')
          .eq('id', user.id)
          .single();

        if (profileError) {
          console.error("Error fetching user profile:", profileError);
        } else if (profileData) {
          setUserPlan(profileData.plan);
        }
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, [navigate]);

  // Function to get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  };

  const handleEditNameClick = () => {
    setNewName(userName);
    setEditNameOpen(true);
  };

  const handleNameSave = async () => {
    if (!newName.trim() || !userId) {
      toast.error("Nombre no puede estar vacío");
      return;
    }

    try {
      setIsLoading(true);
      
      const { error } = await supabase.auth.updateUser({
        data: { full_name: newName }
      });

      if (error) {
        throw error;
      }

      setUserName(newName);
      toast.success("Nombre actualizado con éxito");
      setEditNameOpen(false);
    } catch (error) {
      console.error("Error updating name:", error);
      toast.error("No se pudo actualizar el nombre");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !userId) return;

    // Simple validation for image file
    if (!file.type.startsWith('image/')) {
      toast.error("Por favor selecciona un archivo de imagen");
      return;
    }

    try {
      setIsUploading(true);
      toast.info("Subiendo imagen...");

      // Upload the image to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}-avatar-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload to storage
      const { error: uploadError, data } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        console.error("Upload error:", uploadError);
        throw uploadError;
      }

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      // Update user metadata with the new avatar URL
      const { error: updateError } = await supabase.auth.updateUser({
        data: { avatar_url: publicUrl }
      });

      if (updateError) {
        console.error("Update user error:", updateError);
        throw updateError;
      }

      setAvatarUrl(publicUrl);
      toast.success("Avatar actualizado con éxito");
    } catch (error: any) {
      console.error("Error updating avatar:", error);
      toast.error(`No se pudo actualizar el avatar: ${error.message || 'Error desconocido'}`);
    } finally {
      setIsUploading(false);
    }
  };

  // Simulating a plan upgrade for demo purposes
  // In a real app, this would connect to a payment processor like Stripe
  const handlePlanUpgrade = async (selectedPlan: string) => {
    if (!userId) return;
    
    try {
      setIsLoading(true);
      
      // Call the security definer function to update the user's plan
      const { error } = await supabase.rpc('update_user_plan', {
        user_id: userId,
        new_plan: selectedPlan
      });
      
      if (error) throw error;
      
      setUserPlan(selectedPlan);
      toast.success(`Plan actualizado a ${selectedPlan}`);
      setUpgradeDialogOpen(false);
    } catch (error) {
      console.error("Error updating plan:", error);
      toast.error("No se pudo actualizar el plan");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to get plan display name
  const getPlanDisplayName = (plan: string) => {
    switch (plan) {
      case "basic": return "Básico";
      case "gold": return "GOLD";
      case "vip": return "VIP";
      default: return "Ninguno";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-nativo-cream to-nativo-beige">
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardContent className="flex items-center gap-6 py-6">
              <div className="relative">
                <Avatar className="h-24 w-24 cursor-pointer" onClick={handleAvatarClick}>
                  {avatarUrl ? (
                    <AvatarImage src={avatarUrl} alt={userName} />
                  ) : (
                    <AvatarFallback>{getInitials(userName)}</AvatarFallback>
                  )}
                </Avatar>
                <div 
                  className="absolute -bottom-1 -right-1 bg-nativo-green text-white p-1 rounded-full cursor-pointer"
                  onClick={handleAvatarClick}
                >
                  {isUploading ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent border-white" />
                  ) : (
                    <Camera className="h-4 w-4" />
                  )}
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleAvatarChange}
                  disabled={isUploading}
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold text-nativo-green">
                    {isLoading ? "Cargando..." : userName}
                  </h2>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 rounded-full" 
                    onClick={handleEditNameClick}
                    disabled={isLoading}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-nativo-sage">
                  {isLoading ? "Cargando..." : userEmail}
                </p>
                <div className="mt-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-nativo-green text-white">
                    Plan: {getPlanDisplayName(userPlan)}
                  </span>
                </div>
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
                    <h3 className="font-semibold text-nativo-green mb-2">
                      {getPlanDisplayName(userPlan)}
                    </h3>
                    <p className="text-nativo-sage mb-4">
                      {userPlan === "none" ? "Sin suscripción activa" : (
                        userPlan === "basic" ? "$9/mes" : 
                        userPlan === "gold" ? "$59/mes" : 
                        userPlan === "vip" ? "$109/mes" : ""
                      )}
                    </p>
                    <Button variant="outline" onClick={() => setUpgradeDialogOpen(true)}>
                      {userPlan === "none" ? "Elegir Plan" : "Cambiar Plan"}
                    </Button>
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
                  {userPlan === "none" ? (
                    <div className="text-center py-8">
                      <div className="mx-auto w-12 h-12 rounded-full bg-nativo-sage/20 flex items-center justify-center mb-4">
                        <Lock className="h-6 w-6 text-nativo-sage" />
                      </div>
                      <h3 className="text-lg font-medium text-nativo-green mb-2">Contenido Bloqueado</h3>
                      <p className="text-nativo-sage mb-4">Suscríbete a un plan para acceder a contenido exclusivo</p>
                      <Button onClick={() => setUpgradeDialogOpen(true)}>Ver Planes</Button>
                    </div>
                  ) : userPlan === "basic" ? (
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-nativo-green">Contenido Básico</h3>
                      <ul className="space-y-2">
                        <li className="p-3 bg-nativo-cream/20 rounded-md">Newsletter mensual - Junio 2023</li>
                        <li className="p-3 bg-nativo-cream/20 rounded-md">Guía de meditación para principiantes</li>
                        <li className="p-3 bg-nativo-cream/20 rounded-md">Recetas saludables - Edición verano</li>
                      </ul>
                    </div>
                  ) : userPlan === "gold" ? (
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-nativo-green">Contenido GOLD</h3>
                      <ul className="space-y-2">
                        <li className="p-3 bg-nativo-cream/20 rounded-md">Taller exclusivo: Bienestar holístico</li>
                        <li className="p-3 bg-nativo-cream/20 rounded-md">Programa detox de 7 días</li>
                        <li className="p-3 bg-nativo-cream/20 rounded-md">Serie de videos: Yoga para la espalda</li>
                        <li className="p-3 bg-nativo-cream/20 rounded-md">Asesoría en línea: Calendario de citas</li>
                      </ul>
                    </div>
                  ) : userPlan === "vip" ? (
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-nativo-green">Contenido VIP</h3>
                      <ul className="space-y-2">
                        <li className="p-3 bg-nativo-cream/20 rounded-md">Acceso a todos los talleres virtuales</li>
                        <li className="p-3 bg-nativo-cream/20 rounded-md">Programa de transformación completo</li>
                        <li className="p-3 bg-nativo-cream/20 rounded-md">Asesoría personalizada: Reservar ahora</li>
                        <li className="p-3 bg-nativo-cream/20 rounded-md">Material exclusivo: Limpieza energética</li>
                        <li className="p-3 bg-nativo-cream/20 rounded-md">Programa VIP: Transformación integral</li>
                      </ul>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-nativo-sage">
                      <p>No hay contenido premium disponible en este momento.</p>
                    </div>
                  )}
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
                  <Button variant="outline" className="w-full" onClick={handleEditNameClick}>Editar Perfil</Button>
                  <Button variant="outline" className="w-full text-red-600 hover:text-red-700">
                    Eliminar Cuenta
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Edit Name Dialog */}
      <Dialog open={editNameOpen} onOpenChange={setEditNameOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Nombre</DialogTitle>
            <DialogDescription>
              Actualiza cómo aparece tu nombre en NATIVO
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input 
              value={newName} 
              onChange={(e) => setNewName(e.target.value)} 
              placeholder="Tu nombre"
              disabled={isLoading}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button onClick={handleNameSave} disabled={isLoading}>
              {isLoading ? "Guardando..." : "Guardar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Upgrade Plan Dialog */}
      <Dialog open={upgradeDialogOpen} onOpenChange={setUpgradeDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Elige tu Plan</DialogTitle>
            <DialogDescription>
              Selecciona el plan que mejor se adapte a tus necesidades
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <MembershipsSection inDialog={true} />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;
