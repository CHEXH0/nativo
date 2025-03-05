
import { useState } from "react";
import { 
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PaymentMethodsList } from "./payment/PaymentMethodsList";
import { AddPaymentDialog } from "./payment/AddPaymentDialog";
import { usePaymentMethods } from "@/hooks/usePaymentMethods";

export const PaymentSection = () => {
  const [addPaymentDialogOpen, setAddPaymentDialogOpen] = useState(false);
  
  const {
    paymentMethods,
    isLoading,
    newCardDetails,
    validationErrors,
    handleAddPaymentMethod,
    handleRemovePaymentMethod,
    handleInputChange,
    formatCardNumber,
    formatExpiryDate
  } = usePaymentMethods();

  const onAddPayment = async () => {
    const success = await handleAddPaymentMethod();
    if (success) {
      setAddPaymentDialogOpen(false);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Métodos de Pago</CardTitle>
          <CardDescription>Gestiona tus métodos de pago para suscripciones y compras</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <PaymentMethodsList 
            paymentMethods={paymentMethods} 
            onRemovePaymentMethod={handleRemovePaymentMethod} 
            isLoading={isLoading}
          />
          <Button 
            className="w-full" 
            onClick={() => setAddPaymentDialogOpen(true)}
            disabled={isLoading}
          >
            Agregar Método de Pago
          </Button>
        </CardContent>
      </Card>

      <AddPaymentDialog
        open={addPaymentDialogOpen}
        onOpenChange={setAddPaymentDialogOpen}
        onAddPayment={onAddPayment}
        newCardDetails={newCardDetails}
        onInputChange={handleInputChange}
        formatCardNumber={formatCardNumber}
        formatExpiryDate={formatExpiryDate}
        isLoading={isLoading}
        errors={validationErrors}
      />
    </>
  );
};
