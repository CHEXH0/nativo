
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
      <Card className="overflow-hidden transition-all duration-300 hover:scale-[1.02] h-full border-2 border-nativo-gold/20 hover:border-nativo-gold/50 shadow-xl hover:shadow-2xl bg-gradient-to-br from-nativo-cream to-nativo-beige/80">
        <div className="relative w-full pb-[100%] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-nativo-charcoal/60 via-transparent to-transparent"></div>
        </div>
        <CardContent className="p-6 relative">
          <div className="absolute top-0 left-6 w-12 h-1 bg-gradient-to-r from-nativo-gold to-nativo-brown -mt-3 rounded-full"></div>
          <h3 className="text-2xl font-bold text-nativo-green mb-2 mt-2">{title}</h3>
          <p className="text-nativo-charcoal/70">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};
