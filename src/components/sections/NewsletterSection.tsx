import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";

export const NewsletterSection = () => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const productImages = [
    "/laptop-uploads/Copal.jpg",
    "/laptop-uploads/Detox.jpg", 
    "/laptop-uploads/Equal.jpg",
    "/laptop-uploads/Fitness.jpg",
    "/laptop-uploads/Fluidos.jpg",
    "/laptop-uploads/Gold.jpg",
    "/laptop-uploads/Manias.jpg",
    "/laptop-uploads/Muscle_Man.jpg",
    "/laptop-uploads/PlanVida.jpg"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === productImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [productImages.length]);

  return (
    <section className="py-16 bg-gradient-to-b from-nativo-sage/10 via-nativo-cream/50 to-nativo-beige/30">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-nativo-green mb-4 animate-fadeIn">
            {t('newsletter.title')}
          </h2>
          <p className="text-lg text-nativo-charcoal/80 max-w-2xl mx-auto animate-fadeIn" style={{ animationDelay: "0.2s" }}>
            {t('newsletter.subtitle')}
          </p>
        </div>

        {/* Product Image Slider */}
        <div className="relative overflow-hidden rounded-2xl shadow-2xl max-w-4xl mx-auto border-2 border-nativo-gold/30">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {productImages.map((image, index) => (
              <div key={index} className="min-w-full">
                <img
                  src={image}
                  alt={`Product ${index + 1}`}
                  className="w-full h-96 object-cover"
                />
              </div>
            ))}
          </div>
          
          {/* Slider Dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {productImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-nativo-gold shadow-lg' 
                    : 'bg-nativo-cream/50 hover:bg-nativo-cream/80'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};