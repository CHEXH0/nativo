
import { Button } from "@/components/ui/button";
import { FileText, BookOpen } from "lucide-react";
import { ContentItem } from "./ContentItem";

interface BasicContentProps {
  onUpgradeClick: () => void;
}

export const BasicContent = ({ onUpgradeClick }: BasicContentProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium text-nativo-green border-b pb-2 border-nativo-sage/20">
        Contenido Básico
      </h3>
      <ul className="grid gap-4">
        <ContentItem 
          icon={FileText}
          title="Newsletter mensual - Junio 2023"
          description="Consejos de bienestar y novedades"
        />
        <ContentItem 
          icon={BookOpen}
          title="Guía de meditación para principiantes"
          description="PDF descargable con ejercicios prácticos"
        />
        <ContentItem 
          icon={FileText}
          title="Recetas saludables - Edición verano"
          description="20 recetas con ingredientes locales"
        />
      </ul>
      <div className="pt-4 text-center">
        <Button variant="outline" onClick={onUpgradeClick}>Mejorar mi Plan</Button>
      </div>
    </div>
  );
};
