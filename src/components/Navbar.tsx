import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./ui/use-toast";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const menuItems = [
    { href: "/", label: "Inicio" },
    { href: "/#programas", label: "Programas" },
    { href: "/#membresias", label: "Membresías" },
    { href: "/store", label: "Tienda" },
  ];

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/login");
      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión exitosamente",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo cerrar la sesión",
        variant: "destructive",
      });
    }
  };

  const NavLinks = () => (
    <>
      {menuItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className="text-nativo-sage hover:text-nativo-green transition-colors"
          onClick={() => setIsOpen(false)}
        >
          {item.label}
        </Link>
      ))}
      <Button
        variant="ghost"
        size="sm"
        className="text-nativo-sage hover:text-nativo-green hover:bg-nativo-cream/50"
        onClick={handleLogout}
      >
        <LogOut className="h-4 w-4 mr-2" />
        Cerrar sesión
      </Button>
    </>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 bg-nativo-cream/80 backdrop-blur-md z-50 border-b border-nativo-sage/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/lovable-uploads/4ce2f22a-9027-492f-9194-5ccea4d31a29.png" alt="NATIVO Logo" className="h-12" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <NavLinks />
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <button className="p-2">
                <Menu className="h-6 w-6 text-nativo-sage" />
              </button>
            </SheetTrigger>
            <SheetContent className="bg-nativo-cream">
              <div className="flex flex-col space-y-4 mt-8">
                <NavLinks />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};