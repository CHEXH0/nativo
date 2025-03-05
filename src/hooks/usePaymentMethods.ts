import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { validateCardDetails } from "@/components/profile/payment/utils";

interface CardDetails {
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvc: string;
}

export const usePaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState<Array<{id: string, last4: string, brand: string}>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [stripeCustomerId, setStripeCustomerId] = useState<string | null>(null);
  const [newCardDetails, setNewCardDetails] = useState<CardDetails>({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvc: ""
  });
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return;
        
        const userEmail = session.user.email;
        if (!userEmail) return;
        
        const { data, error } = await supabase.functions.invoke('payment-methods', {
          body: { 
            action: 'create_customer',
            email: userEmail
          }
        });
        
        if (error) {
          console.error("Error creating/getting Stripe customer:", error);
          return;
        }
        
        if (data?.customerId) {
          setStripeCustomerId(data.customerId);
          await loadPaymentMethods(data.customerId);
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };
    
    loadUserData();
  }, []);
  
  const loadPaymentMethods = async (customerId: string) => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase.functions.invoke('payment-methods', {
        body: { 
          action: 'list_payment_methods',
          customerId 
        }
      });
      
      if (error) {
        console.error("Error loading payment methods:", error);
        toast.error("Error al cargar los métodos de pago");
        return;
      }
      
      if (data?.paymentMethods) {
        const formattedMethods = data.paymentMethods.map((method: any) => ({
          id: method.id,
          last4: method.card.last4,
          brand: method.card.brand
        }));
        setPaymentMethods(formattedMethods);
      }
    } catch (error) {
      console.error("Error loading payment methods:", error);
      toast.error("Error al cargar los métodos de pago");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddPaymentMethod = async () => {
    setIsLoading(true);
    setValidationErrors({});
    
    const validation = validateCardDetails(newCardDetails);
    if (!validation.valid) {
      setValidationErrors(validation.errors);
      setIsLoading(false);
      return;
    }
    
    try {
      toast.info("En una implementación real, esto usaría Stripe Elements");
      
      const mockPaymentMethod = {
        id: `pm_${Math.random().toString(36).substr(2, 9)}`,
        last4: newCardDetails.cardNumber.slice(-4),
        brand: newCardDetails.cardNumber.startsWith('4') ? 'visa' : 
               newCardDetails.cardNumber.startsWith('5') ? 'mastercard' : 'unknown'
      };
      
      setPaymentMethods([...paymentMethods, mockPaymentMethod]);
        
      setNewCardDetails({
        cardNumber: "",
        cardName: "",
        expiry: "",
        cvc: ""
      });
      
      toast.success("Método de pago añadido con éxito (simulado)");
      toast.info("Para una integración real, necesitarás implementar Stripe Elements");
      
      return true;
    } catch (error) {
      console.error("Error adding payment method:", error);
      toast.error("Hubo un error al guardar el método de pago");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemovePaymentMethod = async (id: string) => {
    if (!stripeCustomerId) {
      toast.error("No se pudo identificar al cliente");
      return;
    }
    
    try {
      setIsLoading(true);
      
      toast.info("En una implementación real, esto llamaría a la API de Stripe");
      
      const { data, error } = await supabase.functions.invoke('payment-methods', {
        body: { 
          action: 'detach_payment_method',
          paymentMethodId: id 
        }
      });
      
      if (error) {
        console.error("Error removing payment method:", error);
        toast.error("Error al eliminar el método de pago");
        return;
      }
      
      setPaymentMethods(paymentMethods.filter(method => method.id !== id));
      toast.success("Método de pago eliminado");
    } catch (error) {
      console.error("Error removing payment method:", error);
      toast.error("Error al eliminar el método de pago");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const formatCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = e.target.value.replace(/\D/g, '').substring(0, 16);
    const parts = [];
    
    for (let i = 0; i < formattedValue.length; i += 4) {
      parts.push(formattedValue.substring(i, i + 4));
    }
    
    setNewCardDetails(prev => ({
      ...prev,
      cardNumber: parts.join(' ')
    }));
    
    if (validationErrors.cardNumber) {
      setValidationErrors(prev => {
        const updated = { ...prev };
        delete updated.cardNumber;
        return updated;
      });
    }
  };

  const formatExpiryDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, '').substring(0, 4);
    
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
    
    if (validationErrors.expiry) {
      setValidationErrors(prev => {
        const updated = { ...prev };
        delete updated.expiry;
        return updated;
      });
    }
  };

  return {
    paymentMethods,
    isLoading,
    stripeCustomerId,
    newCardDetails,
    validationErrors,
    handleAddPaymentMethod,
    handleRemovePaymentMethod,
    handleInputChange,
    formatCardNumber,
    formatExpiryDate,
    setValidationErrors
  };
};
