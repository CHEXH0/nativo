import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  isPopular?: boolean;
}

export const PricingCard = ({ title, price, features, isPopular }: PricingCardProps) => {
  
  return (
    <Card className={`relative p-6 bg-white ${isPopular ? 'border-2 border-nativo-green' : ''}`}>
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
      <button className="w-full mt-6 bg-nativo-green text-white py-2 px-4 rounded-md hover:bg-nativo-brown transition-colors duration-300">
        Empezar Ahora
      </button>
    </Card>
  );
};