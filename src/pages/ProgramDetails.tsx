
import { useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { useEffect } from "react";
import { usePrograms, programs } from "@/components/program-details/programsData";
import { ProgramList } from "@/components/program-details/ProgramList";
import { ProgramHeader } from "@/components/program-details/ProgramHeader";
import { ProgramTabs } from "@/components/program-details/ProgramTabs";
import { ProgramNotFound } from "@/components/program-details/ProgramNotFound";

const ProgramDetails = () => {
  const { programId } = useParams();
  const translatedPrograms = usePrograms();
  const program = translatedPrograms[programId as keyof typeof translatedPrograms] || 
                 programs[programId as keyof typeof programs];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [programId]);

  if (!program) {
    return <ProgramNotFound />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-nativo-cream to-nativo-beige">
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-16">
        <ProgramList programs={translatedPrograms} currentProgramId={programId as string} />
        <ProgramHeader
          title={program.title}
          description={program.description}
          image={program.image}
          video={program.video}
        />
        <ProgramTabs details={{
          overview: program.details.overview,
          schedule: program.details.schedule,
          includes: program.details.includes
        }} />
      </div>
    </div>
  );
};

export default ProgramDetails;
