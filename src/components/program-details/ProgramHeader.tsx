
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { MembershipsSection } from "@/components/sections/MembershipsSection";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface ProgramHeaderProps {
  title: string;
  description: string;
  image: string;
  video?: string;
}

export const ProgramHeader = ({ title, description, image, video }: ProgramHeaderProps) => {
  const [upgradeDialogOpen, setUpgradeDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleJoinProgram = async () => {
    // Check if user is logged in
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      // Redirect to login if not authenticated
      navigate('/login', { state: { returnUrl: window.location.pathname } });
      return;
    }
    
    // Open membership dialog for authenticated users
    setUpgradeDialogOpen(true);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-10 my-8">
      <div className="w-full md:w-1/2">
        {video ? (
          <div className="aspect-video bg-black rounded-lg overflow-hidden">
            <iframe
              src={video}
              className="w-full h-full"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title={title}
            ></iframe>
          </div>
        ) : (
          <img
            src={image}
            alt={title}
            className="w-full h-auto rounded-lg object-cover aspect-video"
          />
        )}
      </div>
      <div className="w-full md:w-1/2 flex flex-col justify-center">
        <h1 className="text-3xl md:text-4xl font-bold text-nativo-green mb-4">
          {title}
        </h1>
        <p className="text-nativo-sage text-lg mb-6">{description}</p>
        
        <div className="space-y-4">
          <Button 
            onClick={handleJoinProgram}
            className="w-full md:w-auto bg-nativo-green hover:bg-nativo-brown text-white"
          >
            Unirse a Este Programa
          </Button>
          <p className="text-sm text-nativo-sage">
            Se requiere una membresía para acceder a este programa.
          </p>
        </div>

        <Dialog open={upgradeDialogOpen} onOpenChange={setUpgradeDialogOpen}>
          <DialogContent className="max-w-4xl">
            <MembershipsSection inDialog={true} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
