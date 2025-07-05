import React from 'react';

export const NewsletterSection = () => {
  const productData = [
    { image: "/laptop-uploads/Banos.webp", link: "https://www.etsy.com/listing/1668662870/cleansing-protection-herb-bath-pure?ref=shop_home_active_8&logging_key=891621a2240191181a751c8980fcfad9f01b033c%3A1668662870" },
    { image: "/laptop-uploads/Repelente.webp", link: "https://www.etsy.com/listing/1860732472/flea-repellent-spray-for-pets-100?ref=shop_home_active_1&logging_key=d12afe1c31c73e059d069c162b4795b2d8cb5cdf%3A1860732472" }, 
    { image: "/laptop-uploads/Fluidos.webp", link: "https://www.etsy.com/listing/1668689752/ritual-scent-for-cleansing-protection?ref=shop_home_active_7&frs=1&logging_key=2f5a2b608a7c295ce7cbb01ad70fb6a357e35d1e%3A1668689752" },
    { image: "/laptop-uploads/Pets.webp", link: "https://www.etsy.com/listing/1860730374/dropper-flea-repellent-for-pets-100?ref=shop_home_active_2&logging_key=150efc7a4fe52855a1c6ed446ff5423bbdbd69b9%3A1860730374" },
    { image: "/laptop-uploads/Ointment.webp", link: "https://www.etsy.com/listing/1871512925/organic-herbal-ointment-for-joints-bumps?ref=shop_home_active_3&logging_key=a3ce93714cc941ac2df150b9cb2c2d6913892e40%3A1871512925" },
    { image: "/laptop-uploads/CleaningFluid.webp", link: "https://www.etsy.com/listing/1677498312/energy-house-cleaning-protection-herb?ref=shop_home_active_6&logging_key=bf6f90a5e6358e2e411dec1de7752afd01f18ce5%3A1677498312" },
    { image: "/laptop-uploads/Detox.jpeg", link: "https://www.etsy.com/listing/1745574171/fitness-and-wellness-coach-holistic?ref=shop_home_active_4&logging_key=02e255cc4e42860ef61d6ba7cfd9c570f86364dc%3A1745574171" },
    { image: "/laptop-uploads/PlanVida.jpg", link: "https://www.etsy.com/listing/1745574171/fitness-and-wellness-coach-holistic?ref=shop_home_active_4&logging_key=02e255cc4e42860ef61d6ba7cfd9c570f86364dc%3A1745574171" },
    { image: "/laptop-uploads/ManiaRB.webp", link: "https://www.etsy.com/listing/1534851568/green-handmade-traditional-colombian?ref=shop_home_active_11&logging_key=71278d05e7d5de7f4a468b23e954542bbe8d5c98%3A1534851568" },
    { image: "/laptop-uploads/ManiaRed.webp", link: "https://www.etsy.com/listing/1681846900/colorful-chaquira-bracelets-traditional?ref=shop_home_active_5&logging_key=c0f1bd40275407ade0226086e7e068976ffbfc8a%3A1681846900" },
    { image: "/laptop-uploads/ManiaStar.webp", link: "https://www.etsy.com/listing/1549777149/colorful-colombian-chaquira-bracelets?ref=shop_home_active_10&logging_key=5d8eef51e58dad9eceb6146b12b618e16fd1e48a%3A1549777149" },
    { image: "/laptop-uploads/ManiaRP.webp", link: "https://www.etsy.com/listing/1534839856/handmade-beads-designed-for?ref=shop_home_active_9&logging_key=23b20686e62a5fec951c5275ac6dd0b79598f9e3%3A1534839856" }
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