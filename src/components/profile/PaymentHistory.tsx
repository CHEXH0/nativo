
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";

interface PaymentRecord {
  id: string;
  created: string;
  amount: number;
  currency: string;
  status: string;
  description: string;
}

export const PaymentHistory = () => {
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          throw new Error("Usuario no autenticado");
        }
        
        // Fetch payment history from subscriptions table
        const { data, error } = await supabase
          .from('subscriptions')
          .select('id, created, amount, currency, status, description')
          .eq('user_id', session.user.id)
          .order('created', { ascending: false });
          
        if (error) throw error;
        
        setPayments(data || []);
      } catch (err: any) {
        console.error("Error fetching payment history:", err);
        setError("No se pudieron cargar los pagos. Por favor intenta más tarde.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPaymentHistory();
  }, []);

  const formatAmount = (amount: number, currency: string) => {
    // Stripe stores amounts in cents, convert to dollars/pesos
    const value = amount / 100;
    
    // Format based on currency
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: currency || 'MXN'
    }).format(value);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'complete':
      case 'active':
      case 'paid':
        return <Badge className="bg-green-500">Pagado</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">Pendiente</Badge>;
      case 'failed':
        return <Badge className="bg-red-500">Fallido</Badge>;
      default:
        return <Badge className="bg-gray-500">{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Historial de Pagos</CardTitle>
        <CardDescription>Registro de tus pagos y suscripciones</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="py-8 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-2 text-sm text-gray-500">Cargando pagos...</p>
          </div>
        ) : error ? (
          <div className="py-8 text-center">
            <p className="text-red-500">{error}</p>
          </div>
        ) : payments.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-gray-500">No hay historial de pagos disponible.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {payments.map((payment) => (
              <div key={payment.id} className="flex justify-between items-center border-b pb-4">
                <div>
                  <h4 className="font-medium">{payment.description || "Pago de suscripción"}</h4>
                  <p className="text-sm text-gray-500">
                    {payment.created ? format(new Date(payment.created), "d 'de' MMMM, yyyy", { locale: es }) : "Fecha no disponible"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{payment.amount ? formatAmount(payment.amount, payment.currency) : "Monto no disponible"}</p>
                  {getStatusBadge(payment.status)}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
