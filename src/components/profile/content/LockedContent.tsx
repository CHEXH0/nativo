
import { Lock } from "lucide-react";
import { PreviewVideosSection } from "./PreviewVideosSection";

interface LockedContentProps {
  previewVideos: Array<{
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    videoUrl: string;
  }>;
  onPlay: (videoUrl: string) => void;
  onUpgradeClick: () => void;
}

export const LockedContent = ({ 
  previewVideos, 
  onPlay, 
  onUpgradeClick 
}: LockedContentProps) => {
  return (
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

      <PreviewVideosSection 
        videos={previewVideos} 
        onPlay={onPlay} 
        onUpgradeClick={onUpgradeClick} 
      />
    </div>
  );
};
