
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FinanceActionButtonProps {
  onClick: () => void;
  label?: string;
}

export const FinanceActionButton = ({ onClick, label = "Add" }: FinanceActionButtonProps) => {
  return (
    <Button 
      onClick={onClick} 
      className="flex items-center gap-1 bg-primary text-white hover:bg-primary/90"
    >
      <Plus size={16} />
      <span>{label}</span>
    </Button>
  );
};
