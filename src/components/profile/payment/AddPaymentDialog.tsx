
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export type CardDetails = {
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvc: string;
};

type AddPaymentDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddPayment: () => void;
  newCardDetails: CardDetails;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formatCardNumber: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formatExpiryDate: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
};

export const AddPaymentDialog = ({
  open,
  onOpenChange,
  onAddPayment,
  newCardDetails,
  onInputChange,
  formatCardNumber,
  formatExpiryDate,
  isLoading
}: AddPaymentDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
              onChange={onInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Número de tarjeta</Label>
            <Input 
              id="cardNumber" 
              name="cardNumber"
              placeholder="1234 5678 9012 3456" 
              value={newCardDetails.cardNumber}
              onChange={formatCardNumber}
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
                onChange={formatExpiryDate}
                maxLength={5}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvc">CVC</Label>
              <Input 
                id="cvc" 
                name="cvc"
                placeholder="123" 
                value={newCardDetails.cvc}
                onChange={onInputChange}
                maxLength={4}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button 
            onClick={onAddPayment}
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
  );
};
