
import { Navbar } from "@/components/Navbar";
import { useLanguage } from "@/contexts/LanguageContext";

export const ProgramNotFound = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-nativo-cream to-nativo-beige">
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="text-center p-8 bg-white/50 backdrop-blur-sm rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold text-nativo-green mb-4">{t('program.notfound.title')}</h2>
          <p className="text-gray-600">{t('program.notfound.message')}</p>
        </div>
      </div>
    </div>
  );
};
