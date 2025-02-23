
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface ProgramCardProps {
  title: string;
  description: string;
  image: string;
  slug: string;
}

export const ProgramCard = ({ title, description, image, slug }: ProgramCardProps) => {
  return (
    <Link to={`/program/${slug}`}>
      <Card className="overflow-hidden transition-transform duration-300 hover:scale-[1.02] h-full">
        <div className="relative w-full pb-[100%]">
          <img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <CardContent className="p-6">
          <h3 className="text-2xl font-bold text-nativo-green mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};
