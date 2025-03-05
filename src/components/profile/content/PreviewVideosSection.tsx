
import { Button } from "@/components/ui/button";
import { VideoItem } from "./VideoItem";

interface PreviewVideosSectionProps {
  videos: Array<{
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    videoUrl: string;
  }>;
  onPlay: (videoUrl: string) => void;
  onUpgradeClick: () => void;
}

export const PreviewVideosSection = ({ 
  videos, 
  onPlay, 
  onUpgradeClick 
}: PreviewVideosSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-medium text-nativo-green text-center mb-2">Vista previa</h3>
      <div className="grid gap-6 md:grid-cols-2">
        {videos.map((video) => (
          <VideoItem 
            key={video.id} 
            video={video} 
            onPlay={onPlay} 
          />
        ))}
      </div>
      <div className="text-center mt-8">
        <Button onClick={onUpgradeClick} size="lg" className="px-8">Ver Planes</Button>
      </div>
    </div>
  );
};
