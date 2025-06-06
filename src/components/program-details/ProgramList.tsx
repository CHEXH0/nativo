
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

type Program = {
  title: string;
  description: string;
  image: string;
  video: string;
  details: {
    overview: string;
    schedule: string;
    includes: string[];
  };
};

type ProgramsData = {
  [key: string]: Program;
};

interface ProgramListProps {
  programs: ProgramsData;
  currentProgramId: string;
}

export const ProgramList = ({ programs, currentProgramId }: ProgramListProps) => {
  const navigate = useNavigate();

  const handleProgramClick = (slug: string) => {
    if (slug !== currentProgramId) {
      navigate(`/program/${slug}`);
    }
  };

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      {Object.entries(programs).map(([slug, programInfo]) => (
        <Button
          key={slug}
          variant={slug === currentProgramId ? "default" : "outline"}
          onClick={() => handleProgramClick(slug)}
          className="flex-grow md:flex-grow-0"
          type="button"
        >
          {programInfo.title}
        </Button>
      ))}
    </div>
  );
};
