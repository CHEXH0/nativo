
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Edit, Camera } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState, useRef } from "react";
import { AvatarCropper } from "./AvatarCropper";

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
  const [editNameOpen, setEditNameOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [cropperOpen, setCropperOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    if (!newName.trim()) {
      toast.error("Nombre no puede estar vacío");
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        data: { full_name: newName }
      });

      if (error) throw error;

      toast.success("Nombre actualizado con éxito");
      setEditNameOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Error updating name:", error);
      toast.error("No se pudo actualizar el nombre");
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error("Por favor selecciona un archivo de imagen");
      return;
    }

    setSelectedFile(file);
    setCropperOpen(true);
  };

  const handleCropComplete = async (croppedBlob: Blob) => {
    setCropperOpen(false);
    
    try {
      setIsUploading(true);
      toast.info("Subiendo imagen...");

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Debes iniciar sesión para subir una imagen");
        return;
      }

      const userId = session.user.id;
      // Create a new file from the blob with the original extension
      const fileExt = selectedFile?.name.split('.').pop() || 'jpg';
      const fileName = `${userId}-avatar-${Date.now()}.${fileExt}`;
      
      // Convert blob to File for upload
      const croppedFile = new File([croppedBlob], fileName, { 
        type: selectedFile?.type || 'image/jpeg' 
      });

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, croppedFile);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      const { error: updateError } = await supabase.auth.updateUser({
        data: { avatar_url: publicUrl }
      });

      if (updateError) throw updateError;

      toast.success("Avatar actualizado con éxito");
      window.location.reload();
    } catch (error: any) {
      console.error("Error updating avatar:", error);
      toast.error(`No se pudo actualizar el avatar: ${error.message || 'Error desconocido'}`);
    } finally {
      setIsUploading(false);
      setSelectedFile(null);
    }
  };

  const handleCropCancel = () => {
    setCropperOpen(false);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getPlanDisplayName = (plan: string) => {
    switch (plan) {
      case "basic": return "Básico";
      case "gold": return "GOLD";
      case "vip": return "VIP";
      default: return "Ninguno";
    }
  };

  return (
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

      <Dialog open={editNameOpen} onOpenChange={setEditNameOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Nombre</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input 
              value={newName} 
              onChange={(e) => setNewName(e.target.value)} 
              placeholder="Tu nombre"
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button onClick={handleNameSave}>
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {selectedFile && (
        <AvatarCropper
          imageFile={selectedFile}
          onCropComplete={handleCropComplete}
          onCancel={handleCropCancel}
          isOpen={cropperOpen}
        />
      )}
    </Card>
  );
};
