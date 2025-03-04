
import { CreditCard, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type PaymentMethodItemProps = {
  method: {
    id: string;
    last4: string;
    brand: string;
  };
  onRemove: (id: string) => void;
};

export const PaymentMethodItem = ({ method, onRemove }: PaymentMethodItemProps) => {
  return (
    <div className="flex items-center justify-between p-3 border rounded-md">
      <div className="flex items-center gap-3">
        <CreditCard className="h-5 w-5 text-nativo-green" />
        <div>
          <p className="font-medium">{method.brand.toUpperCase()}</p>
          <p className="text-sm text-muted-foreground">•••• {method.last4}</p>
        </div>
      </div>
      <Button 
        variant="ghost" 
        size="icon"
        onClick={() => onRemove(method.id)}
      >
        <Trash2 className="h-4 w-4 text-red-500" />
      </Button>
    </div>
  );
};
