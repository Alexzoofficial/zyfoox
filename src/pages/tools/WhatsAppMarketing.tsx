
import { MessageCircle } from "lucide-react";
import ToolHero from "@/components/tools/ToolHero";
import ToolInterface from "@/components/tools/ToolInterface";
import { generateWhatsAppMarketing } from "@/lib/ai";

export default function WhatsAppMarketing() {
  const fields = [
    {
      id: "business_type",
      label: "Business Type",
      type: "text" as const,
      placeholder: "e.g., E-commerce, Restaurant, Consulting Service, Salon"
    },
    {
      id: "campaign_type",
      label: "Campaign Type",
      type: "select" as const,
      placeholder: "Select campaign type",
      options: [
        { value: "promotion", label: "Sales Promotion" },
        { value: "announcement", label: "New Product/Service Announcement" },
        { value: "re_engagement", label: "Customer Re-engagement" },
        { value: "event", label: "Event Invitation" },
        { value: "loyalty", label: "Loyalty Program" }
      ]
    },
    {
      id: "target_audience",
      label: "Target Audience",
      type: "text" as const,
      placeholder: "e.g., Existing Customers, New Leads, Local Community"
    },
    {
      id: "key_benefits",
      label: "Key Benefits or Offers",
      type: "textarea" as const,
      placeholder: "Describe the main selling points, discounts, or benefits you want to highlight"
    },
    {
      id: "tone",
      label: "Communication Tone",
      type: "select" as const,
      placeholder: "Select your preferred tone",
      options: [
        { value: "professional", label: "Professional & Formal" },
        { value: "friendly", label: "Friendly & Conversational" },
        { value: "urgent", label: "Urgent & Compelling" },
        { value: "humorous", label: "Humorous & Light" },
        { value: "exclusive", label: "Exclusive & Premium" }
      ]
    }
  ];

  return (
    <div>
      <ToolHero
        title="WhatsApp Marketing"
        description="Get automated promotional messages and viral marketing templates for WhatsApp to engage directly with your customers."
        icon={<MessageCircle size={32} />}
      />
      
      <ToolInterface
        toolName="WhatsApp Marketing"
        fields={fields}
        generateFunction={generateWhatsAppMarketing}
      />
      
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <div className="glass-card rounded-xl p-8 animate-fade-in">
          <h2 className="text-2xl font-bold mb-4">WhatsApp: The Direct Marketing Channel</h2>
          <p className="text-muted-foreground mb-6">
            With over 2 billion users worldwide and a 98% open rate, WhatsApp offers unparalleled 
            direct access to your customers. Our tool helps you create effective WhatsApp marketing 
            messages that drive action without feeling spammy.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-4 bg-secondary rounded-lg">
              <h3 className="font-semibold mb-2">High Engagement</h3>
              <p className="text-sm text-muted-foreground">
                Messages that encourage replies and meaningful customer interactions.
              </p>
            </div>
            <div className="p-4 bg-secondary rounded-lg">
              <h3 className="font-semibold mb-2">Personalized Touch</h3>
              <p className="text-sm text-muted-foreground">
                Templates that can be customized for different customer segments.
              </p>
            </div>
            <div className="p-4 bg-secondary rounded-lg">
              <h3 className="font-semibold mb-2">Compliance-Friendly</h3>
              <p className="text-sm text-muted-foreground">
                Marketing messages that respect WhatsApp's business policies and best practices.
              </p>
            </div>
          </div>
          
          <h3 className="text-xl font-semibold mb-3">How Our AI Tool Works</h3>
          <p className="text-muted-foreground">
            Our AI analyzes successful WhatsApp marketing campaigns across various industries
            to identify patterns that drive engagement. It then applies these insights to your
            specific business context, creating messages that balance promotional content with
            value-adding information to maximize response rates while maintaining customer trust.
          </p>
        </div>
      </div>
    </div>
  );
}
