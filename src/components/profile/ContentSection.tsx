
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { LockedContent } from "./content/LockedContent";
import { BasicContent } from "./content/BasicContent";
import { GoldContent } from "./content/GoldContent";
import { VipContent } from "./content/VipContent";
import { DefaultContent } from "./content/DefaultContent";
import { VideoDialog } from "./content/VideoDialog";
import { MembershipsDialog } from "./content/MembershipsDialog";

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
      videoUrl: "https://player.vimeo.com/video/1091659873?h=59873e941b&badge=0&autopause=0&player_id=0&app_id=58479",
    },
    {
      id: "preview2",
      title: "Meditación guiada",
      description: "Ejercicio básico de respiración y conexión",
      thumbnail: "/laptop-uploads/Copal.jpg",
      videoUrl: "https://player.vimeo.com/video/1091659873?h=59873e941b&badge=0&autopause=0&player_id=0&app_id=58479",
    }
  ];

  const handlePlayVideo = (videoUrl: string) => {
    setActiveVideo(videoUrl);
  };

  const handleUpgradeClick = () => {
    setShowMemberships(true);
  };

  const renderContent = () => {
    switch(userPlan) {
      case "none":
        return (
          <LockedContent
            previewVideos={previewVideos}
            onPlay={handlePlayVideo}
            onUpgradeClick={handleUpgradeClick}
          />
        );
      case "basic":
        return <BasicContent onUpgradeClick={handleUpgradeClick} />;
      case "gold":
        return <GoldContent onUpgradeClick={handleUpgradeClick} />;
      case "vip":
        return <VipContent />;
      default:
        return <DefaultContent />;
    }
  };

  return (
    <>
      <MembershipsDialog
        open={showMemberships}
        onOpenChange={setShowMemberships}
      />

      <VideoDialog
        videoUrl={activeVideo}
        onClose={() => setActiveVideo(null)}
      />

      <Card className="border-nativo-sage/30 shadow-lg">
        <CardHeader className="bg-nativo-cream/30 border-b border-nativo-sage/20">
          <CardTitle className="text-nativo-green text-2xl">Contenido Premium</CardTitle>
          <CardDescription className="text-nativo-sage/80 text-base">
            Accede a tu contenido exclusivo según tu plan
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {renderContent()}
        </CardContent>
      </Card>
    </>
  );
};
