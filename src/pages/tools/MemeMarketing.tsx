
import { MessagesSquare } from "lucide-react";
import ToolHero from "@/components/tools/ToolHero";
import ToolInterface from "@/components/tools/ToolInterface";
import { generateMemeMarketing } from "@/lib/ai";

export default function MemeMarketing() {
  const fields = [
    {
      id: "brand",
      label: "Brand or Product Name",
      type: "text" as const,
      placeholder: "e.g., Nike, Spotify, Your Startup"
    },
    {
      id: "industry",
      label: "Industry",
      type: "text" as const,
      placeholder: "e.g., Fashion, Technology, Food & Beverage"
    },
    {
      id: "audience",
      label: "Target Audience",
      type: "select" as const,
      placeholder: "Select your primary audience",
      options: [
        { value: "gen_z", label: "Gen Z (Under 25)" },
        { value: "millennials", label: "Millennials (25-40)" },
        { value: "gen_x", label: "Gen X (41-56)" },
        { value: "boomers", label: "Baby Boomers (57+)" },
        { value: "broad", label: "Broad Audience (All Ages)" }
      ]
    },
    {
      id: "tone",
      label: "Brand Tone",
      type: "select" as const,
      placeholder: "Select your brand's tone",
      options: [
        { value: "funny", label: "Humorous & Playful" },
        { value: "professional", label: "Professional & Serious" },
        { value: "edgy", label: "Edgy & Bold" },
        { value: "friendly", label: "Friendly & Approachable" },
        { value: "inspirational", label: "Inspirational & Motivational" }
      ]
    },
    {
      id: "context",
      label: "Campaign Context or Goal",
      type: "textarea" as const,
      placeholder: "What are you promoting? What's the campaign goal? Any current trends you want to leverage?"
    }
  ];

  return (
    <div>
      <ToolHero
        title="Meme Marketing Generator"
        description="Create viral memes and trend-based content to boost your brand's social media engagement and connect with your audience authentically."
        icon={<MessagesSquare size={32} />}
      />
      
      <ToolInterface
        toolName="Meme Marketing"
        fields={fields}
        generateFunction={generateMemeMarketing}
      />
      
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <div className="glass-card rounded-xl p-8 animate-fade-in">
          <h2 className="text-2xl font-bold mb-4">Why Meme Marketing Works</h2>
          <p className="text-muted-foreground mb-6">
            Memes are the universal language of the internet. They're shareable, relatable, and have the 
            potential to make your brand go viral while connecting with audiences on a more authentic level.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-4 bg-secondary rounded-lg">
              <h3 className="font-semibold mb-2">Increased Engagement</h3>
              <p className="text-sm text-muted-foreground">
                Memes get 60% more engagement than standard branded content on social media.
              </p>
            </div>
            <div className="p-4 bg-secondary rounded-lg">
              <h3 className="font-semibold mb-2">Cultural Relevance</h3>
              <p className="text-sm text-muted-foreground">
                Stay connected to trending topics and demonstrate your brand's cultural awareness.
              </p>
            </div>
            <div className="p-4 bg-secondary rounded-lg">
              <h3 className="font-semibold mb-2">Authentic Connection</h3>
              <p className="text-sm text-muted-foreground">
                Humanize your brand and build loyalty through humor and shared experiences.
              </p>
            </div>
          </div>
          
          <h3 className="text-xl font-semibold mb-3">How Our AI Tool Works</h3>
          <p className="text-muted-foreground">
            Our AI analyzes current meme trends, your brand identity, and target audience preferences
            to generate relevant, engaging meme concepts. It provides you with content ideas, caption suggestions,
            and strategic recommendations to maximize reach and engagement across different platforms.
          </p>
        </div>
      </div>
    </div>
  );
}
