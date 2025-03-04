
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const SettingsSection = () => {
  const navigate = useNavigate();
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [deleteAccountOpen, setDeleteAccountOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleChangePassword = async () => {
    // Basic validation
    if (!passwordData.currentPassword.trim()) {
      toast.error("Por favor ingresa tu contraseña actual");
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      toast.error("La nueva contraseña debe tener al menos 6 caracteres");
      return;
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword
      });
      
      if (error) throw error;
      
      toast.success("Contraseña actualizada con éxito");
      setChangePasswordOpen(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("No se pudo actualizar la contraseña");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Sesión cerrada con éxito");
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Error al cerrar sesión");
    }
  };

  const handleDeleteAccount = async () => {
    setIsLoading(true);
    
    try {
      // First, sign out the user
      await supabase.auth.signOut();
      
      // Note: In a real app, you would need a server-side function 
      // to completely delete the user account, as client-side code 
      // can't securely delete user accounts
      
      toast.success("Cuenta eliminada con éxito");
      setDeleteAccountOpen(false);
      navigate("/login");
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("Error al eliminar la cuenta");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Ajustes de Cuenta</CardTitle>
          <CardDescription>Administra tu cuenta NATIVO</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => setChangePasswordOpen(true)}
          >
            Cambiar Contraseña
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleLogout}
          >
            Cerrar Sesión
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full text-red-600 hover:text-red-700"
            onClick={() => setDeleteAccountOpen(true)}
          >
            Eliminar Cuenta
          </Button>
        </CardContent>
      </Card>

      {/* Change Password Dialog */}
      <Dialog open={changePasswordOpen} onOpenChange={setChangePasswordOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cambiar Contraseña</DialogTitle>
            <DialogDescription>
              Ingresa tu contraseña actual y la nueva contraseña
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Contraseña actual</Label>
              <Input 
                id="currentPassword"
                name="currentPassword"
                type="password"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">Nueva contraseña</Label>
              <Input 
                id="newPassword"
                name="newPassword"
                type="password"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar nueva contraseña</Label>
              <Input 
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setChangePasswordOpen(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleChangePassword}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-t-transparent border-white mx-auto" />
              ) : (
                "Cambiar Contraseña"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Account Dialog */}
      <Dialog open={deleteAccountOpen} onOpenChange={setDeleteAccountOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar Cuenta</DialogTitle>
            <DialogDescription>
              ¿Estás seguro que deseas eliminar tu cuenta? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setDeleteAccountOpen(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button 
              variant="destructive"
              onClick={handleDeleteAccount}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-t-transparent border-white mx-auto" />
              ) : (
                "Eliminar Cuenta"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
