
import { Zap, Globe, Lock, Smartphone, Moon, Search } from "lucide-react";
import FeatureCard from "../ui/FeatureCard";

export default function FeaturesSection() {
  const features = [
    {
      title: "Ultra-Lightweight & Fast",
      description: "Optimized performance with minimal JavaScript and efficient CSS for lightning-fast loading.",
      icon: <Zap size={32} className="text-yellow-500" />,
      delay: 100,
    },
    {
      title: "SEO-Optimized",
      description: "Built with proper meta tags, schema markup, and structured content for better rankings.",
      icon: <Search size={32} className="text-blue-500" />,
      delay: 200,
    },
    {
      title: "Dedicated Tool Pages",
      description: "Each tool has its own dedicated URL and comprehensive documentation.",
      icon: <Globe size={32} className="text-green-500" />,
      delay: 300,
    },
    {
      title: "Google AdSense Safe",
      description: "100% compliant with Google AdSense policies with proper ad placements.",
      icon: <Lock size={32} className="text-red-500" />,
      delay: 100,
    },
    {
      title: "Mobile-Optimized",
      description: "Fully responsive design that works perfectly on all devices and screen sizes.",
      icon: <Smartphone size={32} className="text-purple-500" />,
      delay: 200,
    },
    {
      title: "Dark Mode Support",
      description: "Automatic theme adaptation for better user experience day and night.",
      icon: <Moon size={32} className="text-indigo-500" />,
      delay: 300,
    },
  ];

  return (
    <section className="py-20 bg-secondary px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Features</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Built with performance, usability, and search engine optimization in mind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
