
import { Video, FileText, Calendar } from "lucide-react";
import { ContentItem } from "./ContentItem";

export const VipContent = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium text-nativo-green border-b pb-2 border-nativo-sage/20">
        Contenido VIP
      </h3>
      <ul className="grid gap-4">
        <ContentItem 
          icon={Video}
          title="Acceso a todos los talleres virtuales"
          description="Biblioteca completa de contenidos"
        />
        <ContentItem 
          icon={FileText}
          title="Programa de transformación completo"
          description="Acceso al programa premium de 12 semanas"
        />
        <ContentItem 
          icon={Calendar}
          title="Asesoría personalizada: Reservar ahora"
          description="Accede a todas tus sesiones mensuales"
        />
        <ContentItem 
          icon={FileText}
          title="Material exclusivo: Limpieza energética"
          description="Guía completa con ejercicios y meditaciones"
        />
        <ContentItem 
          icon={Video}
          title="Programa VIP: Transformación integral"
          description="Sesiones en vivo y material complementario"
        />
      </ul>
    </div>
  );
};
