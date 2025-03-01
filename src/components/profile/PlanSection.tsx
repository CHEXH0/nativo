
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { MembershipsSection } from "@/components/sections/MembershipsSection";

interface PlanSectionProps {
  userPlan: string;
}

export const PlanSection = ({ userPlan }: PlanSectionProps) => {
  const [upgradeDialogOpen, setUpgradeDialogOpen] = useState(false);

  const getPlanDisplayName = (plan: string) => {
    switch (plan) {
      case "basic": return "Básico";
      case "gold": return "GOLD";
      case "vip": return "VIP";
      default: return "Ninguno";
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Plan Actual</CardTitle>
          <CardDescription>Detalles de tu suscripción a NATIVO</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-nativo-cream/50 rounded-lg">
            <h3 className="font-semibold text-nativo-green mb-2">
              {getPlanDisplayName(userPlan)}
            </h3>
            <p className="text-nativo-sage mb-4">
              {userPlan === "none" ? "Sin suscripción activa" : (
                userPlan === "basic" ? "$9/mes" : 
                userPlan === "gold" ? "$59/mes" : 
                userPlan === "vip" ? "$109/mes" : ""
              )}
            </p>
            <Button variant="outline" onClick={() => setUpgradeDialogOpen(true)}>
              {userPlan === "none" ? "Elegir Plan" : "Cambiar Plan"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={upgradeDialogOpen} onOpenChange={setUpgradeDialogOpen}>
        <DialogContent className="max-w-4xl">
          <MembershipsSection inDialog={true} />
        </DialogContent>
      </Dialog>
    </>
  );
};
