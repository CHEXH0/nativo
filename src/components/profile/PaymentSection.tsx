
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Trash2 } from "lucide-react";
import { toast } from "sonner";

export const PaymentSection = () => {
  const [paymentMethods, setPaymentMethods] = useState<Array<{id: string, last4: string, brand: string}>>([]);
  const [addPaymentDialogOpen, setAddPaymentDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newCardDetails, setNewCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvc: ""
  });

  const handleAddPaymentMethod = () => {
    setIsLoading(true);
    
    // Simulate adding payment method
    setTimeout(() => {
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
      
      // Create a mock payment method
      const last4 = newCardDetails.cardNumber.slice(-4);
      const mockPaymentMethod = {
        id: `pm_${Math.random().toString(36).substr(2, 9)}`,
        last4,
        brand: "visa",
      };
      
      setPaymentMethods([...paymentMethods, mockPaymentMethod]);
      setAddPaymentDialogOpen(false);
      setNewCardDetails({
        cardNumber: "",
        cardName: "",
        expiry: "",
        cvc: ""
      });
      toast.success("Método de pago añadido con éxito");
      setIsLoading(false);
    }, 1500);
  };

  const handleRemovePaymentMethod = (id: string) => {
    setPaymentMethods(paymentMethods.filter(method => method.id !== id));
    toast.success("Método de pago eliminado");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Métodos de Pago</CardTitle>
          <CardDescription>Gestiona tus métodos de pago</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {paymentMethods.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              No tienes métodos de pago guardados
            </div>
          ) : (
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <div 
                  key={method.id} 
                  className="flex items-center justify-between p-3 border rounded-md"
                >
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
                    onClick={() => handleRemovePaymentMethod(method.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              ))}
            </div>
          )}
          <Button 
            className="w-full" 
            onClick={() => setAddPaymentDialogOpen(true)}
          >
            Agregar Método de Pago
          </Button>
        </CardContent>
      </Card>

      <Dialog open={addPaymentDialogOpen} onOpenChange={setAddPaymentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar método de pago</DialogTitle>
            <DialogDescription>
              Añade un nuevo método de pago a tu cuenta
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="cardName">Nombre en la tarjeta</Label>
              <Input 
                id="cardName" 
                name="cardName"
                placeholder="Nombre Apellido" 
                value={newCardDetails.cardName}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Número de tarjeta</Label>
              <Input 
                id="cardNumber" 
                name="cardNumber"
                placeholder="1234 5678 9012 3456" 
                value={newCardDetails.cardNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Fecha de vencimiento</Label>
                <Input 
                  id="expiry" 
                  name="expiry"
                  placeholder="MM/AA" 
                  value={newCardDetails.expiry}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input 
                  id="cvc" 
                  name="cvc"
                  placeholder="123" 
                  value={newCardDetails.cvc}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setAddPaymentDialogOpen(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleAddPaymentMethod}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-t-transparent border-white mx-auto" />
              ) : (
                "Guardar"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
