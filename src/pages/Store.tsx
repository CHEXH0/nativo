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
  price: number;
  image: string;
}

const products: Product[] = [
  {
    id: "fluidos",
    name: "Fluidos",
    description: "Fluides para limpieza espiritual",
    price: 15,
    image: "/laptop-uploads/Fluidos.jpg",
  },
  {
    id: "manias",
    name: "Manías",
    description: "Pulseras inspiradas en Colombia",
    price: 15,
    image: "/laptop-uploads/Manias.jpg",
  },
  {
    id: "copal",
    name: "Copal",
    description: "Incienso natural de resina de árbol",
    price: 20,
    image: "/laptop-uploads/Copal.jpg",
  },
];

const Store = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [loading, setLoading] = useState<string | null>(null);

  const handleBuyNow = async (product: Product) => {
    setLoading(product.id);
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId: product.id,
          productName: product.name,
          amount: product.price,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: t('store.error.title'),
        description: t('store.error.description'),
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
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
                  <div className="flex justify-between items-center">
                    <span className="text-3xl font-bold bg-gradient-to-r from-nativo-brown to-nativo-gold bg-clip-text text-transparent">
                      ${product.price}
                    </span>
                    <Button
                      onClick={() => handleBuyNow(product)}
                      disabled={loading === product.id}
                      className="relative overflow-hidden bg-gradient-to-r from-nativo-green to-nativo-brown hover:from-nativo-brown hover:to-nativo-gold text-white font-semibold px-6 py-3 rounded-full transform transition-all duration-150 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed group/btn"
                    >
                      <span className="relative z-10">
                        {loading === product.id ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>{t('store.processing')}</span>
                          </div>
                        ) : (
                          t('store.buy')
                        )}
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