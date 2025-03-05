
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface VideoDialogProps {
  videoUrl: string | null;
  onClose: () => void;
}

export const VideoDialog = ({ videoUrl, onClose }: VideoDialogProps) => {
  return (
    <Dialog open={!!videoUrl} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] p-1 sm:p-2 overflow-hidden bg-black">
        {videoUrl && (
          <video 
            src={videoUrl} 
            controls 
            autoPlay 
            className="w-full h-auto max-h-[80vh]"
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
