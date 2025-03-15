
import Hero from "@/components/home/Hero";
import ToolsSection from "@/components/home/ToolsSection";
import FeaturesSection from "@/components/home/FeaturesSection";

export default function Index() {
  return (
    <div className="min-h-screen">
      <Hero />
      <ToolsSection />
      <FeaturesSection />
      
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Creating with AI</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of individuals and businesses using our AI tools to transform their digital presence.
            </p>
          </div>
          
          <div className="glass-card rounded-2xl p-8 md:p-12 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Ready to elevate your online presence?</h3>
                <p className="text-muted-foreground mb-6">
                  Our suite of AI tools helps you create professional content, optimize your profiles, and generate business ideas in minutes, not hours.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <span className="bg-primary/10 text-primary p-1 rounded-full mr-3 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
                    </span>
                    <span>Save time with AI-generated content</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary/10 text-primary p-1 rounded-full mr-3 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
                    </span>
                    <span>Improve engagement with optimized strategies</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary/10 text-primary p-1 rounded-full mr-3 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
                    </span>
                    <span>Stand out with unique, professional content</span>
                  </li>
                </ul>
                <a 
                  href="/tools/personal-branding" 
                  className="inline-block px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
                >
                  Try for Free
                </a>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden bg-secondary">
                  <img 
                    src="https://placehold.co/800x800/f5f7fa/a2aebb"
                    alt="AI tool demonstration"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 glass-card rounded-xl p-4 shadow-sm max-w-[200px]">
                  <p className="text-sm font-medium">
                    "Transformed my LinkedIn profile and increased connection requests by 300%"
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    — Sarah J, Marketing Director
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
