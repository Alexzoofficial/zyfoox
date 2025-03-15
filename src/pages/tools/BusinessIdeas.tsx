
import { Lightbulb } from "lucide-react";
import ToolHero from "@/components/tools/ToolHero";
import ToolInterface from "@/components/tools/ToolInterface";
import { generateBusinessIdeas } from "@/lib/ai";

export default function BusinessIdeas() {
  const fields = [
    {
      id: "industry",
      label: "Industry Interest",
      type: "text" as const,
      placeholder: "e.g., Technology, Health, Education, Sustainability"
    },
    {
      id: "skills",
      label: "Your Skills & Experience",
      type: "textarea" as const,
      placeholder: "List your skills, background, and expertise that can be leveraged"
    },
    {
      id: "target",
      label: "Target Market",
      type: "text" as const,
      placeholder: "e.g., Millennials, Small Businesses, Parents, Seniors"
    },
    {
      id: "investment",
      label: "Investment Capacity",
      type: "select" as const,
      placeholder: "Select your investment range",
      options: [
        { value: "minimal", label: "Minimal (Under $1,000)" },
        { value: "small", label: "Small ($1,000 - $10,000)" },
        { value: "medium", label: "Medium ($10,000 - $50,000)" },
        { value: "large", label: "Large ($50,000 - $250,000)" },
        { value: "venture", label: "Venture-Backed ($250,000+)" }
      ]
    }
  ];

  return (
    <div>
      <ToolHero
        title="Business Ideas Generator"
        description="Get custom AI-generated startup ideas based on market trends and your skills, with analysis of viability and implementation strategies."
        icon={<Lightbulb size={32} />}
      />
      
      <ToolInterface
        toolName="Business Ideas"
        fields={fields}
        generateFunction={generateBusinessIdeas}
      />
      
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <div className="glass-card rounded-xl p-8 animate-fade-in">
          <h2 className="text-2xl font-bold mb-4">Launch Your Entrepreneurial Journey</h2>
          <p className="text-muted-foreground mb-6">
            The right business idea aligns your skills and interests with market opportunities.
            Our AI tool helps bridge this gap by generating personalized business concepts tailored to your unique situation.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-4 bg-secondary rounded-lg">
              <h3 className="font-semibold mb-2">Market-Validated</h3>
              <p className="text-sm text-muted-foreground">
                Get ideas based on current market trends and proven business models.
              </p>
            </div>
            <div className="p-4 bg-secondary rounded-lg">
              <h3 className="font-semibold mb-2">Personalized Approach</h3>
              <p className="text-sm text-muted-foreground">
                Ideas tailored to your skills, experience, and investment capacity.
              </p>
            </div>
            <div className="p-4 bg-secondary rounded-lg">
              <h3 className="font-semibold mb-2">Implementation Roadmap</h3>
              <p className="text-sm text-muted-foreground">
                Practical strategies and actionable steps to bring your idea to life.
              </p>
            </div>
          </div>
          
          <h3 className="text-xl font-semibold mb-3">How Our AI Tool Works</h3>
          <p className="text-muted-foreground">
            Our AI analyzes market trends, consumer behavior, and emerging opportunities,
            then matches them with your skills and resources. The result is a personalized
            business concept with detailed analysis of target market, revenue models,
            competitive advantages, and implementation strategies.
          </p>
        </div>
      </div>
    </div>
  );
}
