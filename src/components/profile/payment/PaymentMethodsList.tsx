
import { PaymentMethodItem } from "./PaymentMethodItem";

type PaymentMethodsListProps = {
  paymentMethods: Array<{id: string, last4: string, brand: string}>;
  onRemovePaymentMethod: (id: string) => void;
};

export const PaymentMethodsList = ({ paymentMethods, onRemovePaymentMethod }: PaymentMethodsListProps) => {
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
