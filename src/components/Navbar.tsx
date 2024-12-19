import { useState } from "react";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <img src="/lovable-uploads/4ce2f22a-9027-492f-9194-5ccea4d31a29.png" alt="NATIVO" className="h-12" />
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="#inicio" className="text-nativo-green hover:text-nativo-brown px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Inicio
              </a>
              <a href="#programas" className="text-nativo-green hover:text-nativo-brown px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Programas
              </a>
              <a href="#membresias" className="text-nativo-green hover:text-nativo-brown px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Membresías
              </a>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-nativo-green hover:text-nativo-brown focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="#inicio"
              className="text-nativo-green hover:text-nativo-brown block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Inicio
            </a>
            <a
              href="#programas"
              className="text-nativo-green hover:text-nativo-brown block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Programas
            </a>
            <a
              href="#membresias"
              className="text-nativo-green hover:text-nativo-brown block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Membresías
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};