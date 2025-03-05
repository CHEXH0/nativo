
import { Play } from "lucide-react";

interface VideoItemProps {
  video: {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    videoUrl: string;
  };
  onPlay: (videoUrl: string) => void;
}

export const VideoItem = ({ video, onPlay }: VideoItemProps) => {
  return (
    <div 
      className="relative group overflow-hidden rounded-lg border border-nativo-sage/20 cursor-pointer"
      onClick={() => onPlay(video.videoUrl)}
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
  );
};
