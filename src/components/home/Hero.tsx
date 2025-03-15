
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28 px-4">
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center animate-fade-in">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Powered by OpenRouter GPT-4
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 mx-auto max-w-5xl">
            <span className="text-gradient">AI-powered</span> tools to transform your digital presence
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 mx-auto max-w-2xl">
            Unlock your full potential with our suite of AI tools for business, content creation, and personal branding. SEO-optimized and lightning fast.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/tools/personal-branding"
              className="px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium flex items-center"
            >
              Try Our Tools
              <ArrowRight size={18} className="ml-2" />
            </Link>
            <Link
              to="/pricing"
              className="px-6 py-3 rounded-xl bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors font-medium"
            >
              View Pricing
            </Link>
          </div>
        </div>
        
        <div className="mt-16 glass-card rounded-2xl p-2 shadow-sm animate-fade-in animate-delay-100">
          <div className="aspect-video rounded-xl overflow-hidden bg-secondary">
            <img 
              src="https://placehold.co/1200x675/f5f7fa/a2aebb"
              alt="Zyfoox platform interface"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
