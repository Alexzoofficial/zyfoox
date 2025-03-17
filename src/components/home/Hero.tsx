
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  const scrollToPricing = (e: React.MouseEvent) => {
    e.preventDefault();
    const pricingSection = document.getElementById('pricing-section');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28 px-4">
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center animate-fade-in">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Powered by Zyfoox
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 mx-auto max-w-5xl">
            <span className="text-gradient">AI-powered</span> tools to transform your digital presence
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 mx-auto max-w-2xl">
            Unlock your full potential with our suite of AI tools for business, content creation, and personal branding. SEO-optimized and lightning fast.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/tools"
              className="px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium flex items-center"
            >
              Try Our Tools
              <ArrowRight size={18} className="ml-2" />
            </Link>
            <a
              href="#pricing-section"
              onClick={scrollToPricing}
              className="px-6 py-3 rounded-xl bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors font-medium"
            >
              View Pricing
            </a>
          </div>
        </div>
        
        <div className="mt-16 glass-card rounded-2xl p-2 shadow-sm animate-fade-in animate-delay-100">
          <div className="aspect-video rounded-xl overflow-hidden bg-secondary">
            <img 
              src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&h=675"
              alt="Zyfoox AI tools interface"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
