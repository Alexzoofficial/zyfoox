
import { Brain } from "lucide-react";
import ToolHero from "@/components/tools/ToolHero";
import ToolInterface from "@/components/tools/ToolInterface";
import { generatePersonalBranding } from "@/lib/ai";

export default function PersonalBranding() {
  const fields = [
    {
      id: "name",
      label: "Your Name",
      type: "text" as const,
      placeholder: "e.g., John Smith"
    },
    {
      id: "industry",
      label: "Industry",
      type: "text" as const,
      placeholder: "e.g., Technology, Finance, Healthcare"
    },
    {
      id: "experience",
      label: "Experience Level",
      type: "select" as const,
      placeholder: "Select your experience level",
      options: [
        { value: "entry", label: "Entry Level (0-2 years)" },
        { value: "mid", label: "Mid Level (3-5 years)" },
        { value: "senior", label: "Senior Level (6-10 years)" },
        { value: "executive", label: "Executive (10+ years)" }
      ]
    },
    {
      id: "skills",
      label: "Key Skills (comma separated)",
      type: "text" as const,
      placeholder: "e.g., Project Management, Data Analysis, Leadership"
    },
    {
      id: "goals",
      label: "Personal Branding Goals",
      type: "textarea" as const,
      placeholder: "What do you want to achieve with your personal brand? e.g., Thought leadership, job opportunities, networking"
    }
  ];

  return (
    <div>
      <ToolHero
        title="Personal Branding Service"
        description="Optimize your LinkedIn & X profiles with AI-generated content, posts, and engagement strategies to grow your professional influence."
        icon={<Brain size={32} />}
      />
      
      <ToolInterface
        toolName="Personal Branding Strategy"
        fields={fields}
        generateFunction={generatePersonalBranding}
      />
      
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <div className="glass-card rounded-xl p-8 animate-fade-in">
          <h2 className="text-2xl font-bold mb-4">Why Personal Branding Matters</h2>
          <p className="text-muted-foreground mb-6">
            In today's digital landscape, your online presence is often the first impression you make. 
            A strong personal brand helps you stand out in your industry, build credibility,
            and open doors to new opportunities.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-4 bg-secondary rounded-lg">
              <h3 className="font-semibold mb-2">Increased Visibility</h3>
              <p className="text-sm text-muted-foreground">
                Make yourself discoverable to potential employers, clients, and collaborators.
              </p>
            </div>
            <div className="p-4 bg-secondary rounded-lg">
              <h3 className="font-semibold mb-2">Professional Authority</h3>
              <p className="text-sm text-muted-foreground">
                Establish yourself as a trusted voice and thought leader in your field.
              </p>
            </div>
            <div className="p-4 bg-secondary rounded-lg">
              <h3 className="font-semibold mb-2">Career Advancement</h3>
              <p className="text-sm text-muted-foreground">
                Attract better opportunities aligned with your expertise and interests.
              </p>
            </div>
          </div>
          
          <h3 className="text-xl font-semibold mb-3">How Our AI Tool Works</h3>
          <p className="text-muted-foreground">
            Our advanced AI analyzes successful profiles in your industry and creates personalized 
            recommendations optimized for LinkedIn and X (Twitter). You'll receive strategic content 
            ideas, engagement tactics, and profile optimization tips tailored to your specific goals.
          </p>
        </div>
      </div>
    </div>
  );
}
