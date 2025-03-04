
interface PlanBadgeProps {
  userPlan: string;
}

export const PlanBadge = ({ userPlan }: PlanBadgeProps) => {
  const getPlanDisplayName = (plan: string) => {
    switch (plan) {
      case "basic": return "Básico";
      case "gold": return "GOLD";
      case "vip": return "VIP";
      default: return "Ninguno";
    }
  };

  return (
    <div className="mt-2">
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-nativo-green text-white">
        Plan: {getPlanDisplayName(userPlan)}
      </span>
    </div>
  );
};
