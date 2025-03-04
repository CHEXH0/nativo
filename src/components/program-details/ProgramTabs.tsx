
import { BookOpen, Video, Calendar, Users, Award, Package } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProgramTabsProps {
  details: {
    overview: string;
    schedule: string;
    instructors: string;
    includes: string[];
  };
}

export const ProgramTabs = ({ details }: ProgramTabsProps) => {
  return (
    <Tabs defaultValue="overview" className="space-y-6">
      <TabsList className="flex flex-wrap w-full md:grid md:grid-cols-4 gap-2">
        <TabsTrigger value="overview" className="flex-1 min-w-[150px] flex items-center gap-2">
          <BookOpen className="h-4 w-4" />
          <span>Descripción</span>
        </TabsTrigger>
        <TabsTrigger value="details" className="flex-1 min-w-[150px] flex items-center gap-2">
          <Package className="h-4 w-4" />
          <span>Detalles</span>
        </TabsTrigger>
        <TabsTrigger value="schedule" className="flex-1 min-w-[150px] flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>Horarios</span>
        </TabsTrigger>
        <TabsTrigger value="instructors" className="flex-1 min-w-[150px] flex items-center gap-2">
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
            <p className="text-gray-600">{details.overview}</p>
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
              {details.includes.map((item, index) => (
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
            <p className="text-gray-600">{details.schedule}</p>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="instructors">
        <Card>
          <CardHeader>
            <CardTitle>Nuestros Instructores</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">{details.instructors}</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
