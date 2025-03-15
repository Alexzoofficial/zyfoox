
import { Video } from "lucide-react";
import ToolHero from "@/components/tools/ToolHero";
import ToolInterface from "@/components/tools/ToolInterface";
import { generateYouTubeBranding } from "@/lib/ai";

export default function YouTubeBranding() {
  const fields = [
    {
      id: "content_type",
      label: "Content Type",
      type: "text" as const,
      placeholder: "e.g., Tutorials, Vlogs, Reviews, Gaming, Educational"
    },
    {
      id: "niche",
      label: "Specific Niche",
      type: "text" as const,
      placeholder: "e.g., Cooking, Tech, Travel, Personal Development, Finance"
    },
    {
      id: "target_audience",
      label: "Target Audience",
      type: "text" as const,
      placeholder: "e.g., Young professionals, Parents, Students, Hobbyists"
    },
    {
      id: "brand_personality",
      label: "Brand Personality",
      type: "select" as const,
      placeholder: "Select your channel's personality",
      options: [
        { value: "informative", label: "Informative & Educational" },
        { value: "entertaining", label: "Entertaining & Energetic" },
        { value: "inspirational", label: "Inspirational & Motivational" },
        { value: "authentic", label: "Authentic & Relatable" },
        { value: "professional", label: "Professional & Authoritative" }
      ]
    },
    {
      id: "channel_goals",
      label: "Channel Goals",
      type: "textarea" as const,
      placeholder: "What do you want to achieve with your YouTube channel? (e.g., Build an audience, Monetize content, Promote products/services)"
    }
  ];

  return (
    <div>
      <ToolHero
        title="YouTube Branding Service"
        description="Generate unique YouTube channel names, branding strategies, and niche recommendations to help your channel stand out and grow."
        icon={<Video size={32} />}
      />
      
      <ToolInterface
        toolName="YouTube Branding Strategy"
        fields={fields}
        generateFunction={generateYouTubeBranding}
      />
      
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <div className="glass-card rounded-xl p-8 animate-fade-in">
          <h2 className="text-2xl font-bold mb-4">Stand Out in a Crowded Platform</h2>
          <p className="text-muted-foreground mb-6">
            With over 37 million YouTube channels competing for attention, strong branding
            is essential to cut through the noise and build a loyal subscriber base. Our AI tool
            helps create a distinctive identity for your channel.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-4 bg-secondary rounded-lg">
              <h3 className="font-semibold mb-2">Memorable Identity</h3>
              <p className="text-sm text-muted-foreground">
                Unique channel name and branding that viewers remember and recognize.
              </p>
            </div>
            <div className="p-4 bg-secondary rounded-lg">
              <h3 className="font-semibold mb-2">Niche Positioning</h3>
              <p className="text-sm text-muted-foreground">
                Strategic content focus that attracts your ideal audience and builds authority.
              </p>
            </div>
            <div className="p-4 bg-secondary rounded-lg">
              <h3 className="font-semibold mb-2">Growth Strategy</h3>
              <p className="text-sm text-muted-foreground">
                Actionable branding tactics to accelerate subscriber growth and engagement.
              </p>
            </div>
          </div>
          
          <h3 className="text-xl font-semibold mb-3">How Our AI Tool Works</h3>
          <p className="text-muted-foreground">
            Our AI analyzes successful YouTube channels in your chosen niche to identify
            branding patterns and opportunities. It then generates a customized branding
            package including channel name options, visual identity recommendations,
            content pillar suggestions, and audience growth strategies aligned with
            your unique goals and target audience.
          </p>
        </div>
      </div>
    </div>
  );
}
