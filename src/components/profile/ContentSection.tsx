import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, BookOpen, Video, FileText, Calendar, Play } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { MembershipsSection } from "@/components/sections/MembershipsSection";

interface ContentSectionProps {
  userPlan: string;
  onUpgrade: () => void;
}

export const ContentSection = ({ userPlan, onUpgrade }: ContentSectionProps) => {
  const [showMemberships, setShowMemberships] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const previewVideos = [
    {
      id: "preview1",
      title: "Introducción a Nativo",
      description: "Conoce nuestra filosofía y propuesta de valor",
      thumbnail: "/laptop-uploads/Jaguar.jpg",
      videoUrl: "/laptop-uploads/NativoIntro.mp4",
    },
    {
      id: "preview2",
      title: "Meditación guiada",
      description: "Ejercicio básico de respiración y conexión",
      thumbnail: "/laptop-uploads/Copal.jpg",
      videoUrl: "/laptop-uploads/NativoIntro.mp4",
    }
  ];

  const handlePlayVideo = (videoUrl: string) => {
    setActiveVideo(videoUrl);
  };

  const handleUpgradeClick = () => {
    setShowMemberships(true);
  };

  return (
    <>
      <Dialog open={showMemberships} onOpenChange={setShowMemberships}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-nativo-cream">
          <MembershipsSection inDialog={true} />
        </DialogContent>
      </Dialog>

      <Dialog open={!!activeVideo} onOpenChange={() => setActiveVideo(null)}>
        <DialogContent className="max-w-5xl max-h-[90vh] p-1 sm:p-2 overflow-hidden bg-black">
          {activeVideo && (
            <video 
              src={activeVideo} 
              controls 
              autoPlay 
              className="w-full h-auto max-h-[80vh]"
            />
          )}
        </DialogContent>
      </Dialog>

      <Card className="border-nativo-sage/30 shadow-lg">
        <CardHeader className="bg-nativo-cream/30 border-b border-nativo-sage/20">
          <CardTitle className="text-nativo-green text-2xl">Contenido Premium</CardTitle>
          <CardDescription className="text-nativo-sage/80 text-base">
            Accede a tu contenido exclusivo según tu plan
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {userPlan === "none" ? (
            <div className="space-y-6">
              <div className="text-center py-8 px-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-nativo-sage/20 flex items-center justify-center mb-6">
                  <Lock className="h-8 w-8 text-nativo-sage" />
                </div>
                <h3 className="text-xl font-medium text-nativo-green mb-3">Contenido Bloqueado</h3>
                <p className="text-nativo-sage mb-6 max-w-md mx-auto">
                  Suscríbete a un plan para acceder a contenido exclusivo diseñado para tu bienestar integral
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-medium text-nativo-green text-center mb-2">Vista previa</h3>
                <div className="grid gap-6 md:grid-cols-2">
                  {previewVideos.map((video) => (
                    <div 
                      key={video.id}
                      className="relative group overflow-hidden rounded-lg border border-nativo-sage/20 cursor-pointer"
                      onClick={() => handlePlayVideo(video.videoUrl)}
                    >
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-48 object-cover transition-transform group-hover:scale-105" 
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-14 h-14 rounded-full bg-nativo-green/80 flex items-center justify-center">
                          <Play className="h-8 w-8 text-white ml-1" />
                        </div>
                      </div>
                      <div className="p-3">
                        <h4 className="font-medium text-nativo-green">{video.title}</h4>
                        <p className="text-sm text-nativo-sage">{video.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-8">
                  <Button onClick={handleUpgradeClick} size="lg" className="px-8">Ver Planes</Button>
                </div>
              </div>
            </div>
          ) : userPlan === "basic" ? (
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-nativo-green border-b pb-2 border-nativo-sage/20">
                Contenido Básico
              </h3>
              <ul className="grid gap-4">
                <li className="p-4 bg-nativo-cream/30 rounded-md border border-nativo-sage/20 hover:bg-nativo-cream/50 transition-colors flex gap-3 items-center cursor-pointer">
                  <FileText className="h-5 w-5 text-nativo-green flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Newsletter mensual - Junio 2023</h4>
                    <p className="text-sm text-nativo-sage">Consejos de bienestar y novedades</p>
                  </div>
                </li>
                <li className="p-4 bg-nativo-cream/30 rounded-md border border-nativo-sage/20 hover:bg-nativo-cream/50 transition-colors flex gap-3 items-center cursor-pointer">
                  <BookOpen className="h-5 w-5 text-nativo-green flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Guía de meditación para principiantes</h4>
                    <p className="text-sm text-nativo-sage">PDF descargable con ejercicios prácticos</p>
                  </div>
                </li>
                <li className="p-4 bg-nativo-cream/30 rounded-md border border-nativo-sage/20 hover:bg-nativo-cream/50 transition-colors flex gap-3 items-center cursor-pointer">
                  <FileText className="h-5 w-5 text-nativo-green flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Recetas saludables - Edición verano</h4>
                    <p className="text-sm text-nativo-sage">20 recetas con ingredientes locales</p>
                  </div>
                </li>
              </ul>
              <div className="pt-4 text-center">
                <Button variant="outline" onClick={handleUpgradeClick}>Mejorar mi Plan</Button>
              </div>
            </div>
          ) : userPlan === "gold" ? (
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-nativo-green border-b pb-2 border-nativo-sage/20">
                Contenido GOLD
              </h3>
              <ul className="grid gap-4">
                <li className="p-4 bg-nativo-cream/30 rounded-md border border-nativo-sage/20 hover:bg-nativo-cream/50 transition-colors flex gap-3 items-center cursor-pointer">
                  <Video className="h-5 w-5 text-nativo-green flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Taller exclusivo: Bienestar holístico</h4>
                    <p className="text-sm text-nativo-sage">Grabación completa del taller (2h 15m)</p>
                  </div>
                </li>
                <li className="p-4 bg-nativo-cream/30 rounded-md border border-nativo-sage/20 hover:bg-nativo-cream/50 transition-colors flex gap-3 items-center cursor-pointer">
                  <FileText className="h-5 w-5 text-nativo-green flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Programa detox de 7 días</h4>
                    <p className="text-sm text-nativo-sage">Guía completa con menús y rutinas</p>
                  </div>
                </li>
                <li className="p-4 bg-nativo-cream/30 rounded-md border border-nativo-sage/20 hover:bg-nativo-cream/50 transition-colors flex gap-3 items-center cursor-pointer">
                  <Video className="h-5 w-5 text-nativo-green flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Serie de videos: Yoga para la espalda</h4>
                    <p className="text-sm text-nativo-sage">5 sesiones guiadas de 30 minutos</p>
                  </div>
                </li>
                <li className="p-4 bg-nativo-cream/30 rounded-md border border-nativo-sage/20 hover:bg-nativo-cream/50 transition-colors flex gap-3 items-center cursor-pointer">
                  <Calendar className="h-5 w-5 text-nativo-green flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Asesoría en línea: Calendario de citas</h4>
                    <p className="text-sm text-nativo-sage">Agenda tu sesión mensual</p>
                  </div>
                </li>
              </ul>
              <div className="pt-4 text-center">
                <Button variant="outline" onClick={handleUpgradeClick}>Mejorar a VIP</Button>
              </div>
            </div>
          ) : userPlan === "vip" ? (
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-nativo-green border-b pb-2 border-nativo-sage/20">
                Contenido VIP
              </h3>
              <ul className="grid gap-4">
                <li className="p-4 bg-nativo-cream/30 rounded-md border border-nativo-sage/20 hover:bg-nativo-cream/50 transition-colors flex gap-3 items-center cursor-pointer">
                  <Video className="h-5 w-5 text-nativo-green flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Acceso a todos los talleres virtuales</h4>
                    <p className="text-sm text-nativo-sage">Biblioteca completa de contenidos</p>
                  </div>
                </li>
                <li className="p-4 bg-nativo-cream/30 rounded-md border border-nativo-sage/20 hover:bg-nativo-cream/50 transition-colors flex gap-3 items-center cursor-pointer">
                  <FileText className="h-5 w-5 text-nativo-green flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Programa de transformación completo</h4>
                    <p className="text-sm text-nativo-sage">Acceso al programa premium de 12 semanas</p>
                  </div>
                </li>
                <li className="p-4 bg-nativo-cream/30 rounded-md border border-nativo-sage/20 hover:bg-nativo-cream/50 transition-colors flex gap-3 items-center cursor-pointer">
                  <Calendar className="h-5 w-5 text-nativo-green flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Asesoría personalizada: Reservar ahora</h4>
                    <p className="text-sm text-nativo-sage">Accede a todas tus sesiones mensuales</p>
                  </div>
                </li>
                <li className="p-4 bg-nativo-cream/30 rounded-md border border-nativo-sage/20 hover:bg-nativo-cream/50 transition-colors flex gap-3 items-center cursor-pointer">
                  <FileText className="h-5 w-5 text-nativo-green flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Material exclusivo: Limpieza energética</h4>
                    <p className="text-sm text-nativo-sage">Guía completa con ejercicios y meditaciones</p>
                  </div>
                </li>
                <li className="p-4 bg-nativo-cream/30 rounded-md border border-nativo-sage/20 hover:bg-nativo-cream/50 transition-colors flex gap-3 items-center cursor-pointer">
                  <Video className="h-5 w-5 text-nativo-green flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Programa VIP: Transformación integral</h4>
                    <p className="text-sm text-nativo-sage">Sesiones en vivo y material complementario</p>
                  </div>
                </li>
              </ul>
            </div>
          ) : (
            <div className="text-center py-8 text-nativo-sage">
              <p>No hay contenido premium disponible en este momento.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};
