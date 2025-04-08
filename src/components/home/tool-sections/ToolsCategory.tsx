
import ToolCard from "../../ui/ToolCard";
import { ToolItem } from "@/data/toolsData";

interface ToolsCategoryProps {
  title: string;
  description?: string;
  tools: ToolItem[];
}

export default function ToolsCategory({ title, description, tools }: ToolsCategoryProps) {
  return (
    <div className="mb-16">
      <div className="text-center mb-8 animate-fade-in">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        {description && (
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, index) => (
          <ToolCard 
            key={index}
            title={tool.title}
            description={tool.description}
            icon={tool.icon}
            path={tool.path}
            delay={tool.delay}
          />
        ))}
      </div>
    </div>
  );
}
