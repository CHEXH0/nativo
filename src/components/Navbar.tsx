import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, LogOut, LogIn, User } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./ui/use-toast";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { MembershipsSection } from "./sections/MembershipsSection";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMemberships, setShowMemberships] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const location = useLocation();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const menuItems = [
    { 
      href: "/", 
      label: "Inicio",
      action: handleHomeClick
    },
    { 
      href: "/program/talleres-holisticos", 
      label: "Programas"
    },
    { 
      href: "/instructors", 
      label: "Instructores"
    },
    { 
      href: "#", 
      label: "Membresías",
      action: () => setShowMemberships(true)
    },
    { 
      href: "https://www.etsy.com/es/shop/TiendaNativa", 
      label: "Tienda",
      external: true 
    },
  ];

  const handleNavigation = (href: string, external?: boolean, action?: (e: React.MouseEvent) => void) => {
    setIsOpen(false);
    
    if (action) {
      action(new MouseEvent('click') as unknown as React.MouseEvent);
      return;
    }
    
    if (external) {
      window.open(href, '_blank');
      return;
    }
    
    navigate(href);
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
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

  const handleLogin = () => {
    navigate("/login");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const AuthButton = () => {
    if (isAuthenticated) {
      return (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-nativo-sage hover:text-nativo-green hover:bg-nativo-cream/50"
            onClick={handleProfile}
          >
            <User className="h-4 w-4 mr-2" />
            Perfil
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-nativo-sage hover:text-nativo-green hover:bg-nativo-cream/50"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Cerrar sesión
          </Button>
        </div>
      );
    }
    return (
      <Button
        variant="ghost"
        size="sm"
        className="text-nativo-sage hover:text-nativo-green hover:bg-nativo-cream/50"
        onClick={handleLogin}
      >
        <LogIn className="h-4 w-4 mr-2" />
        Iniciar sesión
      </Button>
    );
  };

  const NavLinks = () => (
    <>
      {menuItems.map((item) => (
        <button
          key={item.href}
          onClick={(e) => handleNavigation(item.href, item.external, item.action)}
          className="text-nativo-sage hover:text-nativo-green transition-colors"
        >
          {item.label}
        </button>
      ))}
      <AuthButton />
    </>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 bg-nativo-cream/80 backdrop-blur-md z-50 border-b border-nativo-sage/20">
      <Dialog open={showMemberships} onOpenChange={setShowMemberships}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-nativo-cream">
          <MembershipsSection inDialog={true} />
        </DialogContent>
      </Dialog>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" onClick={handleHomeClick} className="flex items-center space-x-2">
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
