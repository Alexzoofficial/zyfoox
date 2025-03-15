
interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay?: number;
}

export default function FeatureCard({ title, description, icon, delay = 0 }: FeatureCardProps) {
  const delayClass = `animate-delay-${delay}`;

  return (
    <div className={`animate-fade-in animate-slide-in-bottom ${delayClass}`}>
      <div className="flex flex-col h-full p-6 rounded-2xl bg-white dark:bg-card shadow-sm border border-border">
        <div className="text-primary rounded-xl mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-medium mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
