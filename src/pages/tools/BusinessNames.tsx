
import { Briefcase } from "lucide-react";
import ToolHero from "@/components/tools/ToolHero";
import ToolInterface from "@/components/tools/ToolInterface";
import { generateBusinessNames } from "@/lib/ai";

export default function BusinessNames() {
  const fields = [
    {
      id: "industry",
      label: "Industry",
      type: "text" as const,
      placeholder: "e.g., Fitness, Technology, Food, Fashion"
    },
    {
      id: "location",
      label: "Location (optional)",
      type: "text" as const,
      placeholder: "e.g., New York, Global, Online"
    },
    {
      id: "keywords",
      label: "Keywords",
      type: "text" as const,
      placeholder: "e.g., innovative, eco-friendly, premium, budget"
    },
    {
      id: "business_type",
      label: "Business Type",
      type: "select" as const,
      placeholder: "Select your business type",
      options: [
        { value: "service", label: "Service Business" },
        { value: "retail", label: "Retail / E-commerce" },
        { value: "saas", label: "Software / SaaS" },
        { value: "consulting", label: "Consulting / Agency" },
        { value: "manufacturing", label: "Manufacturing / Product" }
      ]
    },
    {
      id: "description",
      label: "Brief Business Description",
      type: "textarea" as const,
      placeholder: "Describe your business concept, target customers, and unique value proposition"
    }
  ];

  return (
    <div>
      <ToolHero
        title="Business Names Generator"
        description="Generate unique, brandable business names with available .com domain suggestions tailored to your industry and target audience."
        icon={<Briefcase size={32} />}
      />
      
      <ToolInterface
        toolName="Business Names"
        fields={fields}
        generateFunction={generateBusinessNames}
      />
      
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <div className="glass-card rounded-xl p-8 animate-fade-in">
          <h2 className="text-2xl font-bold mb-4">The Perfect Business Name Matters</h2>
          <p className="text-muted-foreground mb-6">
            Your business name is often the first touchpoint with potential customers. 
            It should be memorable, reflect your brand values, and be available as a domain name.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-4 bg-secondary rounded-lg">
              <h3 className="font-semibold mb-2">Brand Identity</h3>
              <p className="text-sm text-muted-foreground">
                Get names that align with your brand values and resonate with your target audience.
              </p>
            </div>
            <div className="p-4 bg-secondary rounded-lg">
              <h3 className="font-semibold mb-2">Domain Availability</h3>
              <p className="text-sm text-muted-foreground">
                Receive suggestions with available .com domains to secure your online presence.
              </p>
            </div>
            <div className="p-4 bg-secondary rounded-lg">
              <h3 className="font-semibold mb-2">Market Appeal</h3>
              <p className="text-sm text-muted-foreground">
                Stand out from competitors with unique, memorable names that capture attention.
              </p>
            </div>
          </div>
          
          <h3 className="text-xl font-semibold mb-3">How Our AI Tool Works</h3>
          <p className="text-muted-foreground">
            Our AI analyzes successful business names in your industry and generates creative,
            relevant options based on your requirements. It considers linguistic patterns, 
            memorability factors, and cultural associations to provide you with the best possible
            name suggestions for your new venture.
          </p>
        </div>
      </div>
    </div>
  );
}
