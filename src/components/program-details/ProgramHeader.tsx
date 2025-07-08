
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProgramHeaderProps {
  title: string;
  description: string;
  image: string;
  video: string;
}

export const ProgramHeader = ({ title, description, image, video }: ProgramHeaderProps) => {
  const { t } = useLanguage();
  
  useEffect(() => {
    // Preload the video thumbnail
    const preloadImage = new Image();
    preloadImage.src = image;
    console.log(`Loading program: ${title}`);
    console.log(`Video path: ${video}`);
    console.log(`Image path: ${image}`);
  }, [image, title, video]);

  const isVimeoEmbed = video.includes('player.vimeo.com');
  const isProgramaBienestar = title === "Programa De Bienestar";

  return (
    <div className="grid md:grid-cols-2 gap-8 items-start mb-8">
      {/* Video Card with square aspect ratio */}
      <Card className="overflow-hidden shadow-2xl border-2 border-nativo-gold/30 bg-gradient-to-br from-nativo-cream to-nativo-beige">
        <AspectRatio ratio={1/1} className="bg-nativo-sage/20">
          <div className="relative w-full h-full">
            {isVimeoEmbed ? (
              <iframe
                src={video}
                className="w-full h-full rounded-lg"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                title={title}
              />
            ) : (
              <video 
                key={video}
                className="w-full h-full object-cover rounded-lg"
                controls={!isProgramaBienestar}
                preload="metadata"
                poster={image}
                playsInline
                autoPlay={isProgramaBienestar}
                loop={isProgramaBienestar}
                muted={isProgramaBienestar}
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
                {t('program.video.unsupported')}
              </video>
            )}
          </div>
        </AspectRatio>
      </Card>

      {/* Program Info */}
      <div className="space-y-6 bg-gradient-to-br from-nativo-cream/50 to-nativo-beige/30 p-6 rounded-2xl border border-nativo-gold/20 shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold text-nativo-green border-b-2 border-nativo-gold/30 pb-2">
          {title}
        </h1>
      </div>
    </div>
  );
};
