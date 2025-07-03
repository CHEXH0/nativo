
import { BookOpen, Calendar, Award, Package } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProgramTabsProps {
  details: {
    overview: string;
    schedule: string;
    includes: string[];
  };
}

export const ProgramTabs = ({ details }: ProgramTabsProps) => {
  const { t } = useLanguage();
  
  return (
    <Tabs defaultValue="overview" className="space-y-6">
      <TabsList className="w-full flex flex-wrap gap-2 p-1 h-auto">
        <TabsTrigger 
          value="overview" 
          className="flex items-center gap-2 flex-1 min-w-[120px] h-10 data-[state=active]:bg-background"
        >
          <BookOpen className="h-4 w-4" />
          <span className="whitespace-nowrap">{t('program.tabs.overview')}</span>
        </TabsTrigger>
        <TabsTrigger 
          value="details" 
          className="flex items-center gap-2 flex-1 min-w-[120px] h-10 data-[state=active]:bg-background"
        >
          <Package className="h-4 w-4" />
          <span className="whitespace-nowrap">{t('program.tabs.details')}</span>
        </TabsTrigger>
        <TabsTrigger 
          value="schedule" 
          className="flex items-center gap-2 flex-1 min-w-[120px] h-10 data-[state=active]:bg-background"
        >
          <Calendar className="h-4 w-4" />
          <span className="whitespace-nowrap">{t('program.tabs.schedule')}</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <Card>
          <CardHeader>
            <CardTitle>{t('program.overview.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">{details.overview}</p>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="details">
        <Card>
          <CardHeader>
            <CardTitle>{t('program.details.title')}</CardTitle>
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
            <CardTitle>{t('program.schedule.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">{details.schedule}</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
