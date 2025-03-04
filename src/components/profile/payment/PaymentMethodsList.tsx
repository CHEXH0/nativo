
import { PaymentMethodItem } from "./PaymentMethodItem";
import { Loader2 } from "lucide-react";

type PaymentMethodsListProps = {
  paymentMethods: Array<{id: string, last4: string, brand: string}>;
  onRemovePaymentMethod: (id: string) => void;
  isLoading?: boolean;
};

export const PaymentMethodsList = ({ paymentMethods, onRemovePaymentMethod, isLoading }: PaymentMethodsListProps) => {
  if (isLoading) {
    return (
      <div className="text-center py-6">
        <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2 text-nativo-green" />
        <p className="text-muted-foreground">Cargando métodos de pago...</p>
      </div>
    );
  }
  
  if (paymentMethods.length === 0) {
    return (
      <div className="text-center py-6 text-muted-foreground">
        No tienes métodos de pago guardados
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {paymentMethods.map((method) => (
        <PaymentMethodItem 
          key={method.id} 
          method={method} 
          onRemove={onRemovePaymentMethod} 
        />
      ))}
    </div>
  );
};
