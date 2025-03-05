
import { Button } from "@/components/ui/button";
import { Video, FileText, Calendar } from "lucide-react";
import { ContentItem } from "./ContentItem";

interface GoldContentProps {
  onUpgradeClick: () => void;
}

export const GoldContent = ({ onUpgradeClick }: GoldContentProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium text-nativo-green border-b pb-2 border-nativo-sage/20">
        Contenido GOLD
      </h3>
      <ul className="grid gap-4">
        <ContentItem 
          icon={Video}
          title="Taller exclusivo: Bienestar holístico"
          description="Grabación completa del taller (2h 15m)"
        />
        <ContentItem 
          icon={FileText}
          title="Programa detox de 7 días"
          description="Guía completa con menús y rutinas"
        />
        <ContentItem 
          icon={Video}
          title="Serie de videos: Yoga para la espalda"
          description="5 sesiones guiadas de 30 minutos"
        />
        <ContentItem 
          icon={Calendar}
          title="Asesoría en línea: Calendario de citas"
          description="Agenda tu sesión mensual"
        />
      </ul>
      <div className="pt-4 text-center">
        <Button variant="outline" onClick={onUpgradeClick}>Mejorar a VIP</Button>
      </div>
    </div>
  );
};
