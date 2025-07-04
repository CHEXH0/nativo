export const NewsletterSection = () => {
  const productImages = [
    "/laptop-uploads/Banos.webp",
    "/laptop-uploads/Repelente.webp", 
    "/laptop-uploads/Fluidos.webp",
    "/laptop-uploads/Pets.webp",
    "/laptop-uploads/Ointment.webp",
    "/laptop-uploads/CleaningFluid.webp",
    "/laptop-uploads/Detox.jpeg",
    "/laptop-uploads/PlanVida.jpg",
    "/laptop-uploads/ManiaRB.webp",
    "/laptop-uploads/ManiaRed.webp",
    "/laptop-uploads/ManiaStar.webp",
    "/laptop-uploads/ManiaRP.webp"
  ];

  // Duplicate images for seamless infinite scroll
  const duplicatedImages = [...productImages, ...productImages];

  return (
    <section className="py-8 bg-gradient-to-b from-nativo-sage/10 via-nativo-cream/50 to-nativo-beige/30 overflow-hidden">
      <div className="relative">
        <div 
          className="flex"
          style={{
            animation: 'scroll 30s linear infinite',
          }}
        >
          {duplicatedImages.map((image, index) => (
            <div key={index} className="flex-shrink-0 w-60 h-60 mx-4">
              <img
                src={image}
                alt={`Product ${(index % productImages.length) + 1}`}
                className="w-full h-full object-cover rounded-xl shadow-lg border-2 border-nativo-gold/30"
              />
            </div>
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-2448px);
          }
        }
      `}</style>
    </section>
  );
};