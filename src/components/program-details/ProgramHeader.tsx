
import { Play } from "lucide-react";
import { useState } from "react";

interface ProgramHeaderProps {
  title: string;
  description: string;
  image: string;
  video: string;
}

export const ProgramHeader = ({ title, description, image, video }: ProgramHeaderProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
      <div className="aspect-video overflow-hidden rounded-lg relative group">
        {!isPlaying ? (
          <>
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <Play className="w-16 h-16 text-white" />
            </button>
          </>
        ) : (
          <iframe
            src={`${video}?autoplay=1`}
            allow="autoplay; fullscreen; picture-in-picture"
            className="w-full h-full"
            style={{ border: 0 }}
          />
        )}
      </div>
      <div>
        <h1 className="text-4xl font-bold text-nativo-green mb-4">{title}</h1>
        <p className="text-lg text-gray-600 mb-6">{description}</p>
      </div>
    </div>
  );
};
