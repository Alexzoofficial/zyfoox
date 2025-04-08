
import { 
  marketingTools, 
  downloaderTools, 
  utilityTools, 
  financeTools, 
  miscTools 
} from "@/data/toolsData";
import ToolsCategory from "./tool-sections/ToolsCategory";

export default function ToolsSection() {
  return (
    <section id="tools-section" className="py-20 px-4 bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our AI-Powered Tools</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our collection of specialized AI tools and downloaders designed to enhance your online experience.
          </p>
        </div>

        <ToolsCategory 
          title="Marketing & Branding" 
          description="Boost your online presence and marketing efforts with AI-powered tools"
          tools={marketingTools} 
        />
        
        <ToolsCategory 
          title="Content Downloaders" 
          description="Download videos and media from popular social platforms without watermarks"
          tools={downloaderTools} 
        />
        
        <ToolsCategory 
          title="Utility Tools" 
          description="Essential utilities to help with common digital tasks"
          tools={utilityTools} 
        />
        
        <ToolsCategory 
          title="Financial Tools" 
          description="Calculate and plan your finances with precision"
          tools={financeTools} 
        />
        
        <ToolsCategory 
          title="Other Useful Tools" 
          description="Additional tools to enhance your productivity and creativity"
          tools={miscTools} 
        />
      </div>
    </section>
  );
}
