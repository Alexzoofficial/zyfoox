
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PricingSection() {
  const features = [
    "Access to all AI Tools (Personal Branding, Study Notes, Business Names, etc.)",
    "All Video Downloaders (YouTube, Instagram, Facebook, TikTok)",
    "No watermarks on downloads",
    "High-quality media downloads",
    "Unlimited usage with no restrictions",
    "Priority customer support",
    "Ad-free experience",
    "Fast processing for all tools",
  ];

  return (
    <section id="pricing-section" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Unlock all our premium features with a single affordable plan.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <div className="bg-white dark:bg-card border border-primary/20 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/50 animate-fade-in">
            <div className="bg-primary text-primary-foreground p-6 text-center">
              <h3 className="text-2xl font-bold mb-1">Premium</h3>
              <p className="text-lg opacity-90 mb-4">All features included</p>
              <div className="flex items-baseline justify-center">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-lg ml-1 opacity-80">/month</span>
              </div>
            </div>
            
            <div className="p-6">
              <ul className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="bg-primary/10 text-primary p-1 rounded-full mr-3 mt-0.5">
                      <Check size={16} />
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button className="w-full py-6 text-lg" size="lg">
                Get Premium Access
              </Button>
              
              <p className="text-center text-sm text-muted-foreground mt-4">
                Secure payment processing. Cancel anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
