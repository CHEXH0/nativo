
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Video, Calendar, Users, Award, Package, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const programs = {
  "talleres-holisticos": {
    title: "Talleres Holisticos",
    description: "Descubre tu camino hacia una vida más equilibrada y consciente con nuestros talleres.",
    image: "/laptop-uploads/Equal.jpg",
    video: "https://player.vimeo.com/video/824906699",
    details: {
      overview: "Nuestros talleres holísticos están diseñados para ayudarte a encontrar el equilibrio en todas las áreas de tu vida. A través de prácticas ancestrales y modernas, te guiaremos en un viaje de autodescubrimiento y crecimiento personal.",
      schedule: "Sesiones semanales de 2 horas | Grupos reducidos de máximo 12 personas",
      instructors: "Expertos certificados en diferentes disciplinas holísticas",
      includes: [
        "Materiales de trabajo",
        "Acceso a comunidad en línea",
        "Sesiones de seguimiento personalizadas",
        "Certificado de participación"
      ]
    }
  },
  "programa-bienestar": {
    title: "Programa De Bienestar",
    description: "Lleva una vida saludable integrando el ejercicio la nutricion, las emociones, y la espirutualidad mediante ascesorias personalizadas.",
    image: "/laptop-uploads/Muscle_Man.jpg",
    video: "https://player.vimeo.com/video/824906699",
    details: {
      overview: "Un programa integral que combina ejercicio físico, nutrición personalizada y apoyo emocional para alcanzar un estado óptimo de bienestar. Trabajamos con un enfoque personalizado para ayudarte a alcanzar tus objetivos de salud.",
      schedule: "Planes personalizados | Seguimiento semanal",
      instructors: "Equipo multidisciplinario de profesionales de la salud",
      includes: [
        "Plan de nutrición personalizado",
        "Rutinas de ejercicio adaptadas",
        "Sesiones de coaching emocional",
        "Seguimiento continuo"
      ]
    }
  },
  "casa-nativo": {
    title: "Casa NATIVA",
    description: "Es un lugar donde podras conectar contigomismo, con las plantas, con los animales, y con la espiritualidad.",
    image: "/laptop-uploads/Casa_Nativa.jpg",
    video: "https://player.vimeo.com/video/824906699",
    details: {
      overview: "Un espacio sagrado diseñado para reconectar con tu esencia natural. Casa NATIVO te ofrece un ambiente único donde podrás experimentar la conexión con la naturaleza, las prácticas ancestrales y la sabiduría tradicional.",
      schedule: "Retiros de fin de semana | Experiencias diarias",
      instructors: "Guías espirituales y facilitadores experimentados",
      includes: [
        "Ceremonias tradicionales",
        "Talleres de conexión con la naturaleza",
        "Meditaciones guiadas",
        "Experiencias de sanación"
      ]
    }
  }
};

const ProgramDetails = () => {
  const { programId } = useParams();
  const navigate = useNavigate();
  const program = programs[programId as keyof typeof programs];
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [programId]);

  const handleProgramClick = (slug: string) => {
    if (slug !== programId) {
      navigate(`/program/${slug}`);
    }
  };

  if (!program) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-nativo-cream to-nativo-beige">
        <Navbar />
        <div className="container mx-auto px-4 py-8 mt-16">
          <div>Programa no encontrado</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-nativo-cream to-nativo-beige">
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="flex flex-wrap gap-4 mb-6">
          {Object.entries(programs).map(([slug, programInfo]) => (
            <Button
              key={slug}
              variant={slug === programId ? "default" : "outline"}
              onClick={() => handleProgramClick(slug)}
              className="flex-grow md:flex-grow-0"
              type="button"
            >
              {programInfo.title}
            </Button>
          ))}
        </div>

        <div key={programId} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="aspect-video overflow-hidden rounded-lg relative group">
            {!isPlaying ? (
              <>
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setIsPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <Play className="w-16 h-16 text-white" />
                </button>
              </>
            ) : (
              <iframe
                src={`${program.video}?autoplay=1`}
                allow="autoplay; fullscreen; picture-in-picture"
                className="w-full h-full"
                style={{ border: 0 }}
              />
            )}
          </div>
          <div>
            <h1 className="text-4xl font-bold text-nativo-green mb-4">{program.title}</h1>
            <p className="text-lg text-gray-600 mb-6">{program.description}</p>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>Descripción</span>
            </TabsTrigger>
            <TabsTrigger value="details" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              <span>Detalles</span>
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Horarios</span>
            </TabsTrigger>
            <TabsTrigger value="instructors" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Instructores</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Descripción General</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{program.details.overview}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Incluye</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {program.details.includes.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Award className="h-5 w-5 text-nativo-green mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle>Horarios y Disponibilidad</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{program.details.schedule}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="instructors">
            <Card>
              <CardHeader>
                <CardTitle>Nuestros Instructores</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{program.details.instructors}</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProgramDetails;
