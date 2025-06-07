
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useEffect } from "react";

interface ProgramHeaderProps {
  title: string;
  description: string;
  image: string;
  video: string;
}

export const ProgramHeader = ({ title, description, image, video }: ProgramHeaderProps) => {
  useEffect(() => {
    // Preload the video thumbnail
    const preloadImage = new Image();
    preloadImage.src = image;
    console.log(`Loading program: ${title}`);
    console.log(`Video path: ${video}`);
    console.log(`Image path: ${image}`);
  }, [image, title, video]);

  return (
    <div className="grid md:grid-cols-2 gap-8 items-start mb-8">
      {/* Video Card with square aspect ratio */}
      <Card className="overflow-hidden shadow-2xl border-2 border-nativo-gold/30 bg-gradient-to-br from-nativo-cream to-nativo-beige">
        <AspectRatio ratio={1/1} className="bg-nativo-sage/20">
          <div className="relative w-full h-full">
            <video 
              key={video}
              className="w-full h-full object-cover rounded-lg"
              controls
              preload="metadata"
              poster={image}
              playsInline
              controlsList="nodownload"
              onError={(e) => {
                console.error(`Video error for ${title}:`, e);
                console.error(`Failed video path: ${video}`);
              }}
              onLoadStart={() => console.log(`${title} video loading started`)}
              onCanPlay={() => console.log(`${title} video can play`)}
              onLoadedData={() => console.log(`${title} video data loaded`)}
              onLoadedMetadata={() => console.log(`${title} video metadata loaded`)}
            >
              <source src={video} type="video/mp4" />
              Tu navegador no soporta la etiqueta de video.
            </video>
          </div>
        </AspectRatio>
      </Card>

      {/* Program Info */}
      <div className="space-y-6 bg-gradient-to-br from-nativo-cream/50 to-nativo-beige/30 p-6 rounded-2xl border border-nativo-gold/20 shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold text-nativo-green border-b-2 border-nativo-gold/30 pb-2">
          {title}
        </h1>
        <p className="text-lg text-nativo-charcoal/80 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};
