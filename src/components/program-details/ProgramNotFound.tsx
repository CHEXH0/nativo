
import { Navbar } from "@/components/Navbar";

export const ProgramNotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-nativo-cream to-nativo-beige">
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="text-center p-8 bg-white/50 backdrop-blur-sm rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold text-nativo-green mb-4">Programa no encontrado</h2>
          <p className="text-gray-600">Lo sentimos, el programa que buscas no está disponible.</p>
        </div>
      </div>
    </div>
  );
};
