import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Navbar } from "@/components/Navbar";

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  link: string;
}

const products: Product[] = [
  {
    id: "banos",
    name: "Baños de Limpieza",
    description: "Cleansing Protection Herb Bath",
    image: "/laptop-uploads/Banos.webp",
    link: "https://www.etsy.com/listing/1668662870/cleansing-protection-herb-bath-pure?ref=shop_home_active_8&logging_key=891621a2240191181a751c8980fcfad9f01b033c%3A1668662870"
  },
  {
    id: "repelente",
    name: "Repelente para Mascotas",
    description: "Flea Repellent Spray for Pets",
    image: "/laptop-uploads/Repelente.webp",
    link: "https://www.etsy.com/listing/1860732472/flea-repellent-spray-for-pets-100?ref=shop_home_active_1&logging_key=d12afe1c31c73e059d069c162b4795b2d8cb5cdf%3A1860732472"
  },
  {
    id: "fluidos",
    name: "Fluidos Rituales",
    description: "Ritual Scent for Cleansing Protection",
    image: "/laptop-uploads/Fluidos.webp",
    link: "https://www.etsy.com/listing/1668689752/ritual-scent-for-cleansing-protection?ref=shop_home_active_7&frs=1&logging_key=2f5a2b608a7c295ce7cbb01ad70fb6a357e35d1e%3A1668689752"
  },
  {
    id: "pets",
    name: "Tratamiento para Mascotas",
    description: "Dropper Flea Repellent for Pets",
    image: "/laptop-uploads/Pets.webp",
    link: "https://www.etsy.com/listing/1860730374/dropper-flea-repellent-for-pets-100?ref=shop_home_active_2&logging_key=150efc7a4fe52855a1c6ed446ff5423bbdbd69b9%3A1860730374"
  },
  {
    id: "ointment",
    name: "Ungüento Herbal",
    description: "Organic Herbal Ointment for Joints",
    image: "/laptop-uploads/Ointment.webp",
    link: "https://www.etsy.com/listing/1871512925/organic-herbal-ointment-for-joints-bumps?ref=shop_home_active_3&logging_key=a3ce93714cc941ac2df150b9cb2c2d6913892e40%3A1871512925"
  },
  {
    id: "cleaning",
    name: "Fluido de Limpieza",
    description: "Energy House Cleaning Protection",
    image: "/laptop-uploads/CleaningFluid.webp",
    link: "https://www.etsy.com/listing/1677498312/energy-house-cleaning-protection-herb?ref=shop_home_active_6&logging_key=bf6f90a5e6358e2e411dec1de7752afd01f18ce5%3A1677498312"
  },
  {
    id: "detox",
    name: "Coach Holístico",
    description: "Fitness and Wellness Coach Holistic",
    image: "/laptop-uploads/Detox.jpeg",
    link: "https://www.etsy.com/listing/1745574171/fitness-and-wellness-coach-holistic?ref=shop_home_active_4&logging_key=02e255cc4e42860ef61d6ba7cfd9c570f86364dc%3A1745574171"
  },
  {
    id: "planvida",
    name: "Plan de Vida",
    description: "Fitness and Wellness Coach Holistic",
    image: "/laptop-uploads/PlanVida.jpg",
    link: "https://www.etsy.com/listing/1745574171/fitness-and-wellness-coach-holistic?ref=shop_home_active_4&logging_key=02e255cc4e42860ef61d6ba7cfd9c570f86364dc%3A1745574171"
  },
  {
    id: "maniarb",
    name: "Manía Verde",
    description: "Green Handmade Traditional Colombian",
    image: "/laptop-uploads/ManiaRB.webp",
    link: "https://www.etsy.com/listing/1534851568/green-handmade-traditional-colombian?ref=shop_home_active_11&logging_key=71278d05e7d5de7f4a468b23e954542bbe8d5c98%3A1534851568"
  },
  {
    id: "maniared",
    name: "Manía Colorida",
    description: "Colorful Chaquira Bracelets Traditional",
    image: "/laptop-uploads/ManiaRed.webp",
    link: "https://www.etsy.com/listing/1681846900/colorful-chaquira-bracelets-traditional?ref=shop_home_active_5&logging_key=c0f1bd40275407ade0226086e7e068976ffbfc8a%3A1681846900"
  },
  {
    id: "maniastar",
    name: "Manía Estrella",
    description: "Colorful Colombian Chaquira Bracelets",
    image: "/laptop-uploads/ManiaStar.webp",
    link: "https://www.etsy.com/listing/1549777149/colorful-colombian-chaquira-bracelets?ref=shop_home_active_10&logging_key=5d8eef51e58dad9eceb6146b12b618e16fd1e48a%3A1549777149"
  },
  {
    id: "maniarp",
    name: "Manía Diseñada",
    description: "Handmade Beads Designed",
    image: "/laptop-uploads/ManiaRP.webp",
    link: "https://www.etsy.com/listing/1534839856/handmade-beads-designed-for?ref=shop_home_active_9&logging_key=23b20686e62a5fec951c5275ac6dd0b79598f9e3%3A1534839856"
  }
];

const Store = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [loading, setLoading] = useState<string | null>(null);

  const handleVisitEtsy = (product: Product) => {
    window.open(product.link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-nativo-cream via-nativo-beige to-nativo-sage/20">
      <Navbar />
      <div className="pt-20 pb-12 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-nativo-green via-nativo-brown to-nativo-gold bg-clip-text text-transparent mb-4">
              {t('store.title')}
            </h1>
            <p className="text-xl text-nativo-brown/80 max-w-2xl mx-auto">
              Descubre nuestra colección exclusiva de productos holísticos
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {products.map((product, index) => (
              <Card 
                key={product.id} 
                className="group overflow-hidden transform transition-all duration-200 hover:scale-105 hover:shadow-2xl border-2 border-nativo-gold/20 hover:border-nativo-gold/60 bg-white/90 backdrop-blur-sm animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </div>
                <div className="p-6 relative">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-nativo-green via-nativo-gold to-nativo-brown transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
                  <h3 className="text-2xl font-bold text-nativo-green mb-3 group-hover:text-nativo-brown transition-colors duration-200">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
                  <div className="flex justify-center">
                    <Button
                      onClick={() => handleVisitEtsy(product)}
                      className="relative overflow-hidden bg-gradient-to-r from-nativo-green to-nativo-brown hover:from-nativo-brown hover:to-nativo-gold text-white font-semibold px-8 py-3 rounded-full transform transition-all duration-150 hover:scale-105 group/btn w-full"
                    >
                      <span className="relative z-10">
                        Ver en Etsy
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-nativo-gold to-nativo-brown opacity-0 group-hover/btn:opacity-100 transition-opacity duration-150" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
      </div>
      </div>
    </div>
  );
};

export default Store;