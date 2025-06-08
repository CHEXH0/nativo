
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface EditableNameProps {
  userName: string;
  isLoading: boolean;
  onNameUpdated?: () => void;
}

export const EditableName = ({
  userName,
  isLoading,
  onNameUpdated
}: EditableNameProps) => {
  const [editNameOpen, setEditNameOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleEditNameClick = () => {
    setNewName(userName);
    setEditNameOpen(true);
  };

  const handleNameSave = async () => {
    if (!newName.trim()) {
      toast.error("Nombre no puede estar vacío");
      return;
    }

    setIsSaving(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Debes iniciar sesión para actualizar el nombre");
        return;
      }

      const { error } = await supabase.auth.updateUser({
        data: { full_name: newName.trim() }
      });

      if (error) throw error;

      toast.success("Nombre actualizado con éxito");
      setEditNameOpen(false);
      
      // Call the callback to refresh data
      if (onNameUpdated) {
        onNameUpdated();
      }
    } catch (error) {
      console.error("Error updating name:", error);
      toast.error("No se pudo actualizar el nombre");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
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
              disabled={isSaving}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={isSaving}>Cancelar</Button>
            </DialogClose>
            <Button onClick={handleNameSave} disabled={isSaving}>
              {isSaving ? "Guardando..." : "Guardar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
