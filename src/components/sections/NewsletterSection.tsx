import React from 'react';

export const NewsletterSection = () => {
  const productData = [
    { image: "/laptop-uploads/Banos.webp", link: "https://www.etsy.com/es/shop/TiendaNativa" },
    { image: "/laptop-uploads/Repelente.webp", link: "https://www.etsy.com/es/shop/TiendaNativa" }, 
    { image: "/laptop-uploads/Fluidos.webp", link: "https://www.etsy.com/es/shop/TiendaNativa" },
    { image: "/laptop-uploads/Pets.webp", link: "https://www.etsy.com/es/shop/TiendaNativa" },
    { image: "/laptop-uploads/Ointment.webp", link: "https://www.etsy.com/es/shop/TiendaNativa" },
    { image: "/laptop-uploads/CleaningFluid.webp", link: "https://www.etsy.com/es/shop/TiendaNativa" },
    { image: "/laptop-uploads/Detox.jpeg", link: "https://www.etsy.com/es/shop/TiendaNativa" },
    { image: "/laptop-uploads/PlanVida.jpg", link: "https://www.etsy.com/es/shop/TiendaNativa" },
    { image: "/laptop-uploads/ManiaRB.webp", link: "https://www.etsy.com/es/shop/TiendaNativa" },
    { image: "/laptop-uploads/ManiaRed.webp", link: "https://www.etsy.com/es/shop/TiendaNativa" },
    { image: "/laptop-uploads/ManiaStar.webp", link: "https://www.etsy.com/es/shop/TiendaNativa" },
    { image: "/laptop-uploads/ManiaRP.webp", link: "https://www.etsy.com/es/shop/TiendaNativa" }
  ];

  // Duplicate products for seamless infinite scroll
  const duplicatedProducts = [...productData, ...productData];

  // Calculate the width for seamless looping
  // Each item: 240px (w-60) + 32px (mx-4 = 16px each side) = 272px
  const itemWidth = 272;
  const totalItems = productData.length;
  const scrollDistance = itemWidth * totalItems;

  return (
    <section className="py-8 bg-gradient-to-b from-nativo-sage/10 via-nativo-cream/50 to-nativo-beige/30 overflow-hidden">
      <div className="relative">
        <div 
          className="flex animate-scroll"
          style={{
            '--scroll-distance': `${scrollDistance}px`,
          } as React.CSSProperties}
        >
          {duplicatedProducts.map((product, index) => (
            <div key={index} className="flex-shrink-0 w-60 h-60 mx-4">
              <a
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full hover:scale-105 transition-transform duration-200"
              >
                <img
                  src={product.image}
                  alt={`Product ${(index % productData.length) + 1}`}
                  className="w-full h-full object-cover rounded-xl shadow-lg border-2 border-nativo-gold/30 cursor-pointer"
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};