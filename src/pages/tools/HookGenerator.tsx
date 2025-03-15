
import { Play } from "lucide-react";
import ToolHero from "@/components/tools/ToolHero";
import ToolInterface from "@/components/tools/ToolInterface";
import { generateHooks } from "@/lib/ai";

export default function HookGenerator() {
  const fields = [
    {
      id: "content_type",
      label: "Content Type",
      type: "select" as const,
      placeholder: "Select your content type",
      options: [
        { value: "product", label: "Product Promotion" },
        { value: "educational", label: "Educational Content" },
        { value: "entertainment", label: "Entertainment" },
        { value: "storytime", label: "Story Time / Personal Experience" },
        { value: "challenge", label: "Challenge or Trend" }
      ]
    },
    {
      id: "niche",
      label: "Niche/Industry",
      type: "text" as const,
      placeholder: "e.g., Beauty, Fitness, Finance, Tech, Fashion"
    },
    {
      id: "target_audience",
      label: "Target Audience",
      type: "text" as const,
      placeholder: "e.g., Gen Z, Working Professionals, Parents, Fitness Enthusiasts"
    },
    {
      id: "content_description",
      label: "Content Description",
      type: "textarea" as const,
      placeholder: "Describe the content you're creating. What's the main message or value you want to deliver?"
    },
    {
      id: "hook_style",
      label: "Hook Style Preference",
      type: "select" as const,
      placeholder: "Select your preferred hook style",
      options: [
        { value: "question", label: "Question-Based Hook" },
        { value: "statistic", label: "Shocking Statistic/Fact" },
        { value: "controversial", label: "Controversial Statement" },
        { value: "curiosity", label: "Curiosity Gap" },
        { value: "storytelling", label: "Storytelling Hook" },
        { value: "mixed", label: "Mix of Styles (Recommended)" }
      ]
    }
  ];

  return (
    <div>
      <ToolHero
        title="Hook Generator"
        description="Create high-converting hooks for Instagram Reels & TikTok to capture immediate attention and stop viewers from scrolling."
        icon={<Play size={32} />}
      />
      
      <ToolInterface
        toolName="Video Hooks"
        fields={fields}
        generateFunction={generateHooks}
      />
      
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <div className="glass-card rounded-xl p-8 animate-fade-in">
          <h2 className="text-2xl font-bold mb-4">Hooks: The Make-or-Break Moment</h2>
          <p className="text-muted-foreground mb-6">
            You have just 3 seconds to grab viewer attention on social media. A powerful hook
            is the difference between viral content and being scrolled past. Our AI generator
            creates compelling hooks that stop thumbs in their tracks.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-4 bg-secondary rounded-lg">
              <h3 className="font-semibold mb-2">Higher Completion Rates</h3>
              <p className="text-sm text-muted-foreground">
                Hooks that keep viewers watching past the critical first few seconds.
              </p>
            </div>
            <div className="p-4 bg-secondary rounded-lg">
              <h3 className="font-semibold mb-2">Algorithm-Friendly</h3>
              <p className="text-sm text-muted-foreground">
                Higher watch time means more algorithmic promotion on TikTok and Instagram.
              </p>
            </div>
            <div className="p-4 bg-secondary rounded-lg">
              <h3 className="font-semibold mb-2">More Conversions</h3>
              <p className="text-sm text-muted-foreground">
                Turn casual viewers into engaged followers and customers with compelling openings.
              </p>
            </div>
          </div>
          
          <h3 className="text-xl font-semibold mb-3">How Our AI Tool Works</h3>
          <p className="text-muted-foreground">
            Our AI studies thousands of high-performing TikTok and Instagram Reels to identify
            patterns in successful hooks. It applies these insights to your specific content,
            creating custom hook options that align with your niche, audience, and content style.
            Each hook is crafted to maximize viewer retention and engagement.
          </p>
        </div>
      </div>
    </div>
  );
}
