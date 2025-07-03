
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
    image: "/laptop-uploads/Reynita.jpg",
    bio: "Terapeuta especializada en Theta Healing, meditación y sanación enfocada en los espacios de los animales."
  }
];

const Instructors = () => {
  const { t } = useLanguage();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-nativo-cream to-nativo-beige">
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-nativo-green mb-4">
            {t('instructors.title')}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('instructors.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {instructors.map((instructor, index) => (
            <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 aspect-square relative">
              <CardContent className="p-0 h-full">
                <div 
                  className="relative w-full h-full bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${instructor.image})` }}
                >
                  {/* Dark overlay for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  
                  {/* Text content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2 text-shadow">
                      {instructor.name}
                    </h3>
                    <p className="text-sm font-medium mb-3 text-nativo-gold">
                      {instructor.role}
                    </p>
                    <p className="text-sm leading-relaxed text-white/90">
                      {instructor.bio}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="bg-nativo-cream/50 border-nativo-sage/20">
            <CardHeader>
              <CardTitle className="text-nativo-green">
                {t('instructors.join.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                {t('instructors.join.description')}
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <button className="inline-block bg-nativo-green text-white px-6 py-3 rounded-lg hover:bg-nativo-green/90 transition-colors">
                    {t('instructors.contact')}
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
                        <p className="text-lg text-nativo-green font-semibold">+52 123 456 7890</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 p-4 bg-nativo-cream/50 rounded-lg">
                      <div className="flex-shrink-0">
                        <Mail className="h-6 w-6 text-nativo-green" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-nativo-charcoal">{t('instructors.contact.email')}</p>
                        <p className="text-lg text-nativo-green font-semibold">info@nativo.com</p>
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
