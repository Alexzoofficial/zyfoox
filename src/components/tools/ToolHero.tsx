
interface ToolHeroProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function ToolHero({ title, description, icon }: ToolHeroProps) {
  return (
    <div className="pt-16 pb-8 md:pt-24 md:pb-12 px-4 bg-gradient-to-b from-secondary to-background">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6">
            {icon}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {title}
          </h1>
          
          <p className="text-xl text-muted-foreground mb-6 mx-auto max-w-2xl">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
