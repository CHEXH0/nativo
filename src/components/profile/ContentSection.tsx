
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

interface ContentSectionProps {
  userPlan: string;
  onUpgrade: () => void;
}

export const ContentSection = ({ userPlan, onUpgrade }: ContentSectionProps) => {
  return (
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
            <Button onClick={onUpgrade}>Ver Planes</Button>
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
  );
};
