import { Card } from "@/components/ui/card";

interface ProgramCardProps {
  title: string;
  description: string;
  imageUrl: string;
}

export const ProgramCard = ({ title, description, imageUrl }: ProgramCardProps) => {
  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 bg-white">
      <div className="aspect-video overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-nativo-green mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </Card>
  );
};