
import { useEffect } from "react";
import { toast } from "sonner";

interface ProfileUrlHandlerProps {
  userId: string | null;
}

export const ProfileUrlHandler = ({ userId }: ProfileUrlHandlerProps) => {
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const success = queryParams.get('success');
    const plan = queryParams.get('plan');
    
    if (success === 'true' && plan) {
      toast.success(`Plan actualizado a ${plan}`);
      
      const paymentMethodId = queryParams.get('payment_method');
      if (paymentMethodId) {
        const last4 = queryParams.get('last4') || '1234';
        const brand = queryParams.get('brand') || 'visa';
        
        const paymentMethod = {
          id: paymentMethodId,
          last4,
          brand,
          userId: userId
        };
        
        const storedMethods = JSON.parse(localStorage.getItem('paymentMethods') || '[]');
        const updatedMethods = [...storedMethods, paymentMethod];
        localStorage.setItem('paymentMethods', JSON.stringify(updatedMethods));
        
        toast.success("Método de pago guardado");
      }
      
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (queryParams.get('canceled') === 'true') {
      toast.info("Pago cancelado");
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [userId]);

  return null;
};
