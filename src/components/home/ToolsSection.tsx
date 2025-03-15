
import { Brain, MessageSquare, Briefcase, MessagesSquare, Lightbulb, Play, MessageCircle, Video } from "lucide-react";
import ToolCard from "../ui/ToolCard";

export default function ToolsSection() {
  const tools = [
    {
      title: "Personal Branding Service",
      description: "Optimize your LinkedIn & X presence with AI-generated profiles, posts, and content strategies.",
      icon: <Brain size={24} />,
      path: "/tools/personal-branding",
      delay: 100
    },
    {
      title: "Study Notes & Summaries",
      description: "Transform lengthy textbooks and research papers into concise, easy-to-understand notes.",
      icon: <MessageSquare size={24} />,
      path: "/tools/study-notes",
      delay: 200
    },
    {
      title: "Business Names Generator",
      description: "Generate unique, brandable business names with available .com domain suggestions.",
      icon: <Briefcase size={24} />,
      path: "/tools/business-names",
      delay: 300
    },
    {
      title: "Meme Marketing Generator",
      description: "Create viral memes and trend-based content to boost your brand's social media engagement.",
      icon: <MessagesSquare size={24} />,
      path: "/tools/meme-marketing",
      delay: 100
    },
    {
      title: "Business Ideas Generator",
      description: "Get custom AI-generated startup ideas based on market trends and your skills.",
      icon: <Lightbulb size={24} />,
      path: "/tools/business-ideas",
      delay: 200
    },
    {
      title: "Hook Generator",
      description: "Create high-converting hooks for Instagram Reels & TikTok to capture immediate attention.",
      icon: <Play size={24} />,
      path: "/tools/hook-generator",
      delay: 300
    },
    {
      title: "WhatsApp Marketing",
      description: "Get automated promotional messages and viral marketing templates for WhatsApp.",
      icon: <MessageCircle size={24} />,
      path: "/tools/whatsapp-marketing",
      delay: 400
    },
    {
      title: "YouTube Branding Service",
      description: "Generate unique YouTube channel names, branding strategies, and niche recommendations.",
      icon: <Video size={24} />,
      path: "/tools/youtube-branding",
      delay: 500
    }
  ];

  return (
    <section className="py-20 px-4" id="tools">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our AI-Powered Tools</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our collection of specialized AI tools designed to enhance your online presence and business growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, index) => (
            <ToolCard 
              key={index}
              title={tool.title}
              description={tool.description}
              icon={tool.icon}
              path={tool.path}
              delay={tool.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
