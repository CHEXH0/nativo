
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { MembershipsSection } from "@/components/sections/MembershipsSection";

interface MembershipsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const MembershipsDialog = ({ open, onOpenChange }: MembershipsDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-nativo-cream">
        <MembershipsSection inDialog={true} />
      </DialogContent>
    </Dialog>
  );
};
