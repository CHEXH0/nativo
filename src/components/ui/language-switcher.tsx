import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Languages } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="text-nativo-green hover:text-nativo-green hover:bg-nativo-cream/50">
          <Languages className="h-4 w-4 mr-2" />
          {language === 'es' ? 'ES' : 'EN'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-nativo-cream border-nativo-sage/20">
        <DropdownMenuItem 
          onClick={() => setLanguage('es')}
          className="hover:bg-nativo-beige/50 focus:bg-nativo-beige/50"
        >
          🇪🇸 Español
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLanguage('en')}
          className="hover:bg-nativo-beige/50 focus:bg-nativo-beige/50"
        >
          🇺🇸 English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};