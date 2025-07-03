
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export const WelcomeSection = () => {
  const { t } = useLanguage();
  
  useEffect(() => {
    // Preload the video thumbnail
    const preloadImage = new Image();
    preloadImage.src = "/laptop-uploads/Nativo-2025.png";
  }, []);

  return (
    <section className="py-16 bg-gradient-to-b from-nativo-cream via-nativo-beige/80 to-nativo-sage/20">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-nativo-green text-center mb-8 animate-fadeIn">
          {t('welcome.title')}
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Vimeo Video Card with elegant border */}
          <Card className="overflow-hidden shadow-2xl animate-fadeIn border-2 border-nativo-gold/30 bg-gradient-to-br from-nativo-cream to-nativo-beige" style={{ animationDelay: "0.2s" }}>
            <AspectRatio ratio={1/1} className="bg-nativo-sage/20">
              <div className="relative w-full h-full">
                <iframe
                  src="https://player.vimeo.com/video/1091659873?h=59873e941b&badge=0&autopause=0&player_id=0&app_id=58479"
                  className="w-full h-full rounded-lg"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                  title="NATIVO Intro"
                />
              </div>
            </AspectRatio>
          </Card>

          {/* Welcome Message with enhanced styling */}
          <div 
            className="space-y-6 animate-fadeIn text-nativo-green bg-gradient-to-br from-nativo-cream/50 to-nativo-beige/30 p-6 rounded-2xl border border-nativo-gold/20 shadow-lg" 
            style={{ animationDelay: "0.4s" }}
          >
            <h3 className="text-2xl font-semibold text-nativo-green border-b-2 border-nativo-gold/30 pb-2">
              {t('welcome.subtitle')}
            </h3>
            <p className="text-lg leading-relaxed text-nativo-charcoal/80">
              {t('welcome.description1')}
            </p>
            <p className="text-lg leading-relaxed text-nativo-charcoal/80">
              {t('welcome.description2')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
