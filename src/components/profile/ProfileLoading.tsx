
import { Navbar } from "@/components/Navbar";

export const ProfileLoading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-nativo-cream to-nativo-beige">
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-nativo-green"></div>
        </div>
      </div>
    </div>
  );
};
