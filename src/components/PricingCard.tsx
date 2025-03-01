
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PricingCardProps {
  id?: string;
  title: string;
  price: string;
  features: string[];
  isPopular?: boolean;
  onSelect?: () => void;
  isSelected?: boolean;
  isLoading?: boolean;
  inDialog?: boolean;
}

export const PricingCard = ({ 
  id, 
  title, 
  price, 
  features, 
  isPopular, 
  onSelect, 
  isSelected, 
  isLoading,
  inDialog 
}: PricingCardProps) => {
  
  return (
    <Card className={`relative p-6 bg-white ${isPopular ? 'border-2 border-nativo-green' : ''} ${isSelected ? 'ring-2 ring-nativo-green ring-offset-2' : ''}`}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-nativo-green text-white px-4 py-1 rounded-full text-sm">
          Más Popular
        </div>
      )}
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-nativo-green mb-2">{title}</h3>
        <div className="text-3xl font-bold text-gray-900 mb-4">{price}</div>
      </div>
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-600">
            <Check className="h-5 w-5 text-nativo-green mr-2 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Button 
        className="w-full mt-6 bg-nativo-green text-white py-2 px-4 rounded-md hover:bg-nativo-brown transition-colors duration-300"
        onClick={onSelect}
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-t-transparent border-white mx-auto" />
        ) : inDialog ? (
          "Seleccionar Plan"
        ) : (
          "Empezar Ahora"
        )}
      </Button>
    </Card>
  );
};
