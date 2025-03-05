
import { LucideIcon } from "lucide-react";

interface ContentItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const ContentItem = ({ icon: Icon, title, description }: ContentItemProps) => {
  return (
    <li className="p-4 bg-nativo-cream/30 rounded-md border border-nativo-sage/20 hover:bg-nativo-cream/50 transition-colors flex gap-3 items-center cursor-pointer">
      <Icon className="h-5 w-5 text-nativo-green flex-shrink-0" />
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-nativo-sage">{description}</p>
      </div>
    </li>
  );
};
