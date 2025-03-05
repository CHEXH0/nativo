
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { CardDetails, validateCardDetails } from "@/components/profile/payment/utils";

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

  // Get current user session and load payment methods
  useEffect(() => {
    const loadUserData = async () => {
      try {
        // Get current user session
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return;
        
        const userEmail = session.user.email;
        if (!userEmail) return;
        
        // Create or retrieve Stripe customer for current user
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
  
  // Load payment methods from Stripe
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
    
    // Validate input
    const validation = validateCardDetails(newCardDetails);
    if (!validation.valid) {
      setValidationErrors(validation.errors);
      setIsLoading(false);
      return;
    }
    
    try {
      // In a real implementation, we would use Stripe.js and Elements to securely collect 
      // payment details and create a payment method or setup intent
      // This is just a simulation
      
      toast.info("En una implementación real, esto usaría Stripe Elements");
      
      // Simulate successful payment method addition
      const mockPaymentMethod = {
        id: `pm_${Math.random().toString(36).substr(2, 9)}`,
        last4: newCardDetails.cardNumber.slice(-4),
        brand: newCardDetails.cardNumber.startsWith('4') ? 'visa' : 
               newCardDetails.cardNumber.startsWith('5') ? 'mastercard' : 'unknown'
      };
      
      // Add to the list for demonstration
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
      
      // In a real implementation, this would call the Stripe API
      // For this demo, we'll just simulate it
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
      
      // Remove from state
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
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  // Format card number input with spaces
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
    
    // Clear validation error
    if (validationErrors.cardNumber) {
      setValidationErrors(prev => {
        const updated = { ...prev };
        delete updated.cardNumber;
        return updated;
      });
    }
  };

  // Format expiration date input (MM/YY)
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
    
    // Clear validation error
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
