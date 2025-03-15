
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  delay?: number;
}

export default function ToolCard({ title, description, icon, path, delay = 0 }: ToolCardProps) {
  const delayClass = `animate-delay-${delay}`;

  return (
    <Link 
      to={path}
      className={`group glass-card p-6 rounded-2xl hover:shadow-md transition-all duration-300 flex flex-col h-full animate-fade-in animate-slide-in-bottom ${delayClass}`}
    >
      <div className="bg-primary/10 text-primary rounded-xl p-3 w-12 h-12 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4 flex-grow">{description}</p>
      <div className="flex items-center text-primary font-medium mt-auto">
        <span>Try now</span>
        <ArrowRight size={16} className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
