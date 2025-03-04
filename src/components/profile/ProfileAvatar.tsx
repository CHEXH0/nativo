
import { useState, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";
import { AvatarCropper } from "./AvatarCropper";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ProfileAvatarProps {
  userName: string;
  avatarUrl: string | null;
  onAvatarUpdated?: () => void;
}

export const ProfileAvatar = ({
  userName,
  avatarUrl,
  onAvatarUpdated
}: ProfileAvatarProps) => {
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
      if (onAvatarUpdated) {
        onAvatarUpdated();
      } else {
        window.location.reload();
      }
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

  return (
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
      
      {selectedFile && (
        <AvatarCropper
          imageFile={selectedFile}
          onCropComplete={handleCropComplete}
          onCancel={handleCropCancel}
          isOpen={cropperOpen}
        />
      )}
    </div>
  );
};
