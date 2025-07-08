
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

interface ContentSectionProps {
  userEmail: string;
}

export const ContentSection = ({ userEmail }: ContentSectionProps) => {
  // Admin emails with full access
  const adminEmails = [
    'sergio.ramrz21@gmail.com',
    'nativoholisticomedia@gmail.com'
  ];

  const isAdmin = adminEmails.includes(userEmail);

  const contentVideos = [
    {
      id: "video1",
      title: "Introducción a Nativo",
      description: "Conoce nuestra filosofía y propuesta de valor",
      thumbnail: "/laptop-uploads/Jaguar.jpg",
      videoUrl: "https://player.vimeo.com/video/1091659873?h=59873e941b&badge=0&autopause=0&player_id=0&app_id=58479",
    },
    {
      id: "video2",
      title: "Meditación guiada",
      description: "Ejercicio básico de respiración y conexión",
      thumbnail: "/laptop-uploads/Copal.jpg",
      videoUrl: "https://player.vimeo.com/video/1091659873?h=59873e941b&badge=0&autopause=0&player_id=0&app_id=58479",
    }
  ];

  const handlePlayVideo = (videoUrl: string) => {
    window.open(videoUrl, '_blank');
  };

  return (
    <Card className="border-nativo-sage/30 shadow-lg">
      <CardHeader className="bg-nativo-cream/30 border-b border-nativo-sage/20">
        <CardTitle className="text-nativo-green text-2xl">
          Contenido NATIVO
          {isAdmin && (
            <span className="ml-2 text-sm bg-nativo-gold text-white px-2 py-1 rounded">
              Acceso Administrador
            </span>
          )}
        </CardTitle>
        <CardDescription className="text-nativo-sage/80 text-base">
          Explora nuestro contenido espiritual y de bienestar
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-nativo-green">Contenido Disponible</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {contentVideos.map((video) => (
              <div
                key={video.id}
                className="bg-nativo-cream/50 rounded-lg p-4 border border-nativo-sage/20 cursor-pointer hover:bg-nativo-cream/70 transition-colors"
                onClick={() => handlePlayVideo(video.videoUrl)}
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-32 object-cover rounded-md mb-3"
                />
                <h4 className="font-medium text-nativo-green">{video.title}</h4>
                <p className="text-sm text-nativo-sage">{video.description}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
