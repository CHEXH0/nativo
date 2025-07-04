
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Phone, Mail } from "lucide-react";
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const instructors = [
  {
    name: "Juan Manuel Fonseca",
    role: "Facilitador Principal",
    image: "/laptop-uploads/JuanMa-Profile.png",
    bio: "Especialista en medicina tradicional y fitness holistico, con más de 10 años de experiencia."
  },
  {
    name: "Reyna Sanchez Chaidez",
    role: "Facilitadora de Holistica",
    image: "/lovable-uploads/24efda63-28a3-4e80-bb2c-597a21a96a3a.png",
    bio: "Terapeuta especializada en Theta Healing, meditación y sanación enfocada en los espacios de los animales."
  }
];

const Instructors = () => {
  const { t } = useLanguage();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-nativo-cream via-nativo-beige to-nativo-sage/20">
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-nativo-green via-nativo-brown to-nativo-gold bg-clip-text text-transparent">
            {t('instructors.title')}
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-nativo-green via-nativo-gold to-nativo-brown mx-auto rounded-full mb-4"></div>
          <p className="text-lg text-nativo-brown/80 max-w-3xl mx-auto">
            {t('instructors.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {instructors.map((instructor, index) => (
            <Card 
              key={index} 
              className="group overflow-hidden transform transition-all duration-200 hover:scale-105 hover:shadow-2xl aspect-square relative border-2 border-nativo-gold/20 hover:border-nativo-gold/60 animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-0 h-full">
                <div 
                  className="relative w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundImage: `url(${instructor.image})` }}
                >
                  {/* Enhanced gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent group-hover:from-nativo-green/80 group-hover:via-nativo-brown/40 transition-all duration-300"></div>
                  
                  {/* Text content overlay with enhanced styling */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-200">
                    <h3 className="text-2xl font-bold mb-2 text-shadow group-hover:text-nativo-gold transition-colors duration-200">
                      {instructor.name}
                    </h3>
                    <p className="text-sm font-medium mb-3 text-nativo-gold group-hover:text-white transition-colors duration-200">
                      {instructor.role}
                    </p>
                    <p className="text-sm leading-relaxed text-white/90 group-hover:text-white transition-colors duration-200">
                      {instructor.bio}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center animate-fade-in" style={{ animationDelay: "400ms" }}>
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-nativo-gold/20 hover:border-nativo-gold/60 transition-all duration-200 group">
            <CardHeader>
              <CardTitle className="text-nativo-green group-hover:bg-gradient-to-r group-hover:from-nativo-green group-hover:to-nativo-brown group-hover:bg-clip-text group-hover:text-transparent transition-all duration-200">
                {t('instructors.join.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-nativo-brown/80 mb-6">
                {t('instructors.join.description')}
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <button className="relative overflow-hidden bg-gradient-to-r from-nativo-green to-nativo-brown hover:from-nativo-gold hover:to-nativo-brown text-white px-8 py-3 rounded-full font-semibold transform transition-all duration-200 hover:scale-105 group/btn">
                    <span className="relative z-10">{t('instructors.contact')}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-nativo-gold to-nativo-brown opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200" />
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-nativo-green text-center mb-4">
                      {t('instructors.contact.title')}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4 p-4 bg-nativo-cream/50 rounded-lg">
                      <div className="flex-shrink-0">
                        <Phone className="h-6 w-6 text-nativo-green" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-nativo-charcoal">{t('instructors.contact.phone')}</p>
                        <p className="text-lg text-nativo-green font-semibold">+52 56 1055 1068</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 p-4 bg-nativo-cream/50 rounded-lg">
                      <div className="flex-shrink-0">
                        <Mail className="h-6 w-6 text-nativo-green" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-nativo-charcoal">{t('instructors.contact.email')}</p>
                        <p className="text-lg text-nativo-green font-semibold">nativoholisticomedia@gmail.com</p>
                      </div>
                    </div>
                    
                    <div className="text-center pt-4">
                      <p className="text-sm text-gray-600">
                        {t('instructors.contact.message')}
                      </p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Instructors;
