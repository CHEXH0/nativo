import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

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
    image: "https://images.unsplash.com/photo-1612198526331-66fcc90c44cd?w=500",
  },
  {
    id: "manias",
    name: "Manías",
    description: "Pulseras inspiradas en Colombia",
    price: 15,
    image: "https://images.unsplash.com/photo-1573880642673-3d7b45f2a130?w=500",
  },
  {
    id: "copal",
    name: "Copal",
    description: "Incienso natural de resina de árbol",
    price: 20,
    image: "https://images.unsplash.com/photo-1523293836414-f04e712e1f3b?w=500",
  },
];

const Store = () => {
  const { toast } = useToast();
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
        title: "Error",
        description: "Hubo un problema al procesar tu compra. Por favor intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-nativo-beige py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-nativo-green text-center mb-12">Nuestra Tienda</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-nativo-green mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-nativo-brown">${product.price}</span>
                  <Button
                    onClick={() => handleBuyNow(product)}
                    disabled={loading === product.id}
                    className="bg-nativo-green hover:bg-nativo-brown text-white"
                  >
                    {loading === product.id ? "Procesando..." : "Comprar Ahora"}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Store;