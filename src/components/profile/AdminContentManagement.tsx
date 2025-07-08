import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useContentManagement } from "@/hooks/useContentManagement";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Clock, 
  Play, 
  Shield, 
  Settings 
} from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface ContentFormData {
  title: string;
  description: string;
  video_url: string;
  thumbnail_url: string;
  category: string;
  required_plan: string;
  duration_minutes: string;
  sort_order: string;
  is_premium: boolean;
  is_active: boolean;
}

const initialFormData: ContentFormData = {
  title: "",
  description: "",
  video_url: "",
  thumbnail_url: "",
  category: "",
  required_plan: "none",
  duration_minutes: "",
  sort_order: "0",
  is_premium: false,
  is_active: true,
};

export const AdminContentManagement = () => {
  const { content, loading, isAdmin, addContent, updateContent, deleteContent, toggleContentStatus } = useContentManagement();
  const [formData, setFormData] = useState<ContentFormData>(initialFormData);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!isAdmin) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const contentData = {
      title: formData.title,
      description: formData.description || null,
      video_url: formData.video_url || null,
      thumbnail_url: formData.thumbnail_url || null,
      category: formData.category || null,
      required_plan: formData.required_plan,
      duration_minutes: formData.duration_minutes ? parseInt(formData.duration_minutes) : null,
      sort_order: parseInt(formData.sort_order) || 0,
      is_premium: formData.is_premium,
      is_active: formData.is_active,
    };

    let success = false;
    if (editingId) {
      success = await updateContent(editingId, contentData);
    } else {
      success = await addContent(contentData);
    }

    if (success) {
      setIsDialogOpen(false);
      setFormData(initialFormData);
      setEditingId(null);
    }

    setSubmitting(false);
  };

  const handleEdit = (item: any) => {
    setFormData({
      title: item.title,
      description: item.description || "",
      video_url: item.video_url || "",
      thumbnail_url: item.thumbnail_url || "",
      category: item.category || "",
      required_plan: item.required_plan,
      duration_minutes: item.duration_minutes?.toString() || "",
      sort_order: item.sort_order?.toString() || "0",
      is_premium: item.is_premium,
      is_active: item.is_active,
    });
    setEditingId(item.id);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este contenido?")) {
      await deleteContent(id);
    }
  };

  const getPlanBadgeColor = (plan: string) => {
    switch (plan) {
      case 'vip': return 'bg-purple-100 text-purple-800';
      case 'gold': return 'bg-yellow-100 text-yellow-800';
      case 'basico': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Administrar Contenido
          </CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                onClick={() => {
                  setFormData(initialFormData);
                  setEditingId(null);
                }}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Agregar Contenido
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingId ? "Editar Contenido" : "Agregar Nuevo Contenido"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Título *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Categoría</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                      placeholder="meditacion, bienestar, etc."
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="video_url">URL del Video</Label>
                    <Input
                      id="video_url"
                      value={formData.video_url}
                      onChange={(e) => setFormData(prev => ({ ...prev, video_url: e.target.value }))}
                      placeholder="https://player.vimeo.com/video/..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="thumbnail_url">URL Miniatura</Label>
                    <Input
                      id="thumbnail_url"
                      value={formData.thumbnail_url}
                      onChange={(e) => setFormData(prev => ({ ...prev, thumbnail_url: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="required_plan">Plan Requerido</Label>
                    <Select 
                      value={formData.required_plan} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, required_plan: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Gratis</SelectItem>
                        <SelectItem value="basico">Plan Básico</SelectItem>
                        <SelectItem value="gold">Plan GOLD</SelectItem>
                        <SelectItem value="vip">Plan VIP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="duration_minutes">Duración (min)</Label>
                    <Input
                      id="duration_minutes"
                      type="number"
                      value={formData.duration_minutes}
                      onChange={(e) => setFormData(prev => ({ ...prev, duration_minutes: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="sort_order">Orden</Label>
                    <Input
                      id="sort_order"
                      type="number"
                      value={formData.sort_order}
                      onChange={(e) => setFormData(prev => ({ ...prev, sort_order: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is_premium"
                      checked={formData.is_premium}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_premium: checked }))}
                    />
                    <Label htmlFor="is_premium">Contenido Premium</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is_active"
                      checked={formData.is_active}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
                    />
                    <Label htmlFor="is_active">Activo</Label>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={submitting}>
                    {submitting ? "Guardando..." : editingId ? "Actualizar" : "Crear"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-4">Cargando contenido...</div>
        ) : (
          <div className="space-y-4">
            {content.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium">{item.title}</h4>
                    <Badge className={getPlanBadgeColor(item.required_plan)}>
                      {item.required_plan === 'none' ? 'Gratis' : item.required_plan}
                    </Badge>
                    {item.is_premium && (
                      <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                        <Shield className="h-3 w-3 mr-1" />
                        Premium
                      </Badge>
                    )}
                    {!item.is_active && (
                      <Badge variant="destructive">Inactivo</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    {item.category && (
                      <span className="flex items-center gap-1">
                        <Play className="h-3 w-3" />
                        {item.category}
                      </span>
                    )}
                    {item.duration_minutes && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {item.duration_minutes} min
                      </span>
                    )}
                    <span>Orden: {item.sort_order}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleContentStatus(item.id, !item.is_active)}
                  >
                    {item.is_active ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(item)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};