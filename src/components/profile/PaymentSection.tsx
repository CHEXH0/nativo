
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { PaymentMethodsList } from "./payment/PaymentMethodsList";
import { AddPaymentDialog, CardDetails } from "./payment/AddPaymentDialog";
import { determineBrand } from "./payment/utils";

export const PaymentSection = () => {
  const [paymentMethods, setPaymentMethods] = useState<Array<{id: string, last4: string, brand: string}>>([]);
  const [addPaymentDialogOpen, setAddPaymentDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newCardDetails, setNewCardDetails] = useState<CardDetails>({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvc: ""
  });

  const handleAddPaymentMethod = async () => {
    setIsLoading(true);
    
    // Validate input (simplified validation)
    if (
      !newCardDetails.cardNumber.trim() || 
      !newCardDetails.cardName.trim() || 
      !newCardDetails.expiry.trim() || 
      !newCardDetails.cvc.trim()
    ) {
      toast.error("Por favor completa todos los campos");
      setIsLoading(false);
      return;
    }
    
    try {
      // Get the current user session
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Debes iniciar sesión para guardar un método de pago");
        setIsLoading(false);
        return;
      }

      // Create a mock payment method (in a real app, this would use Stripe API)
      const last4 = newCardDetails.cardNumber.slice(-4);
      const mockPaymentMethod = {
        id: `pm_${Math.random().toString(36).substr(2, 9)}`,
        last4,
        brand: determineBrand(newCardDetails.cardNumber),
        userId: session.user.id
      };
      
      // In a real app, this would be stored using the Stripe API
      // For this demo, we'll simulate storing it locally
      setPaymentMethods([...paymentMethods, mockPaymentMethod]);
      
      // Store in localStorage to simulate persistence between page reloads
      const storedMethods = JSON.parse(localStorage.getItem('paymentMethods') || '[]');
      localStorage.setItem('paymentMethods', JSON.stringify([...storedMethods, mockPaymentMethod]));
      
      setAddPaymentDialogOpen(false);
      setNewCardDetails({
        cardNumber: "",
        cardName: "",
        expiry: "",
        cvc: ""
      });
      toast.success("Método de pago añadido con éxito");
    } catch (error) {
      console.error("Error adding payment method:", error);
      toast.error("Hubo un error al guardar el método de pago");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemovePaymentMethod = (id: string) => {
    // Remove from state
    setPaymentMethods(paymentMethods.filter(method => method.id !== id));
    
    // Remove from localStorage
    const storedMethods = JSON.parse(localStorage.getItem('paymentMethods') || '[]');
    localStorage.setItem('paymentMethods', JSON.stringify(storedMethods.filter((method: any) => method.id !== id)));
    
    toast.success("Método de pago eliminado");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Load payment methods from localStorage on component mount
  useState(() => {
    const storedMethods = JSON.parse(localStorage.getItem('paymentMethods') || '[]');
    // Filter to only show methods belonging to the current user
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        const userMethods = storedMethods.filter((method: any) => method.userId === session.user.id);
        setPaymentMethods(userMethods);
      }
    });
  });

  // Format card number input with spaces
  const formatCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, '').substring(0, 16); // Remove non-digits and limit to 16 characters
    const parts = [];
    
    for (let i = 0; i < input.length; i += 4) {
      parts.push(input.substring(i, i + 4));
    }
    
    setNewCardDetails(prev => ({
      ...prev,
      cardNumber: parts.join(' ')
    }));
  };

  // Format expiration date input (MM/YY)
  const formatExpiryDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, '').substring(0, 4); // Remove non-digits and limit to 4 characters
    
    if (input.length > 2) {
      setNewCardDetails(prev => ({
        ...prev,
        expiry: input.substring(0, 2) + '/' + input.substring(2)
      }));
    } else {
      setNewCardDetails(prev => ({
        ...prev,
        expiry: input
      }));
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
          />
          <Button 
            className="w-full" 
            onClick={() => setAddPaymentDialogOpen(true)}
          >
            Agregar Método de Pago
          </Button>
        </CardContent>
      </Card>

      <AddPaymentDialog
        open={addPaymentDialogOpen}
        onOpenChange={setAddPaymentDialogOpen}
        onAddPayment={handleAddPaymentMethod}
        newCardDetails={newCardDetails}
        onInputChange={handleInputChange}
        formatCardNumber={formatCardNumber}
        formatExpiryDate={formatExpiryDate}
        isLoading={isLoading}
      />
    </>
  );
};
