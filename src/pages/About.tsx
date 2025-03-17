
import React from "react";
import { Helmet } from "react-helmet-async";
import { Building, LightbulbIcon, HeartHandshake, Rocket, Users, Award, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Zyfoox | AI-Powered Tools & Content Downloaders</title>
        <meta name="description" content="Discover Zyfoox's journey, mission, and vision. We're dedicated to providing free AI tools and content downloaders that make digital creation and social media management accessible to everyone." />
        <meta name="keywords" content="Zyfoox, AI tools, content downloaders, digital tools, social media tools, free AI platform" />
        <link rel="canonical" href="https://zyfoox.com/about" />
      </Helmet>

      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <section className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">About Zyfoox</h1>
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-8 rounded-xl mb-12">
            <p className="text-xl text-center text-muted-foreground leading-relaxed">
              Empowering creators, entrepreneurs, and professionals with AI-powered tools
              designed to transform ideas into impact — 100% free and accessible to everyone.
            </p>
          </div>
          
          <div className="glass-card rounded-xl p-8 mb-12">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="text-muted-foreground space-y-4">
              <p>
                Zyfoox was born from a simple yet powerful observation: advanced digital tools that enhance productivity and 
                creativity were typically restricted to those with technical expertise or financial resources. This digital divide 
                prevented countless talented individuals from unlocking their full potential in the increasingly competitive online landscape.
              </p>
              <p>
                Founded in 2023 by a diverse team of AI researchers, software engineers, and digital creators, Zyfoox emerged as a 
                response to this inequality. Our founding team had firsthand experience with the transformative power of AI and 
                automation tools, but we were equally aware of how inaccessible these technologies remained for the average person.
              </p>
              <p>
                Our journey began with a bold vision: to democratize access to cutting-edge AI tools and content downloaders that 
                would normally require technical know-how or premium subscriptions. We committed to making these tools entirely free, 
                with no hidden fees, paywalls, or functionality restrictions — a truly uncommon approach in today's digital ecosystem.
              </p>
              <p>
                The initial months were challenging as we balanced developing user-friendly interfaces with ensuring our underlying 
                AI algorithms delivered professional-quality results. We prioritized tools that addressed real-world needs: helping 
                entrepreneurs develop business ideas, enabling content creators to repurpose material across platforms, supporting 
                students with study assistance, and facilitating seamless content downloading from major social media platforms.
              </p>
              <p>
                What began as a modest collection of tools quickly gained popularity as users discovered they could access enterprise-grade 
                functionality without technical barriers or financial investment. Through word of mouth and community support, our user 
                base expanded across more than 150 countries, encompassing students, small business owners, content creators, marketers, 
                and professionals from diverse industries.
              </p>
              <p>
                Today, Zyfoox processes millions of AI-generated outputs and content downloads monthly, helping users save countless 
                hours of work while achieving results that previously would have required specialized skills or expensive software. 
                Despite our growth, we remain committed to our founding principle: powerful digital tools should be accessible to everyone, 
                regardless of technical background or financial capacity.
              </p>
            </div>
          </div>
          
          <div className="glass-card rounded-xl p-8 mb-12">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <div className="text-muted-foreground space-y-4">
              <p>
                At Zyfoox, our mission goes beyond providing free tools — we're building a more equitable digital ecosystem where 
                creativity, entrepreneurship, and knowledge sharing can flourish without technical or financial barriers. We believe 
                that artificial intelligence and automation should serve as amplifiers of human potential, not privileges reserved for a select few.
              </p>
              <p>
                We're committed to developing and maintaining a comprehensive suite of AI-powered tools and content downloaders that remain 
                100% free and accessible to anyone with an internet connection. By removing traditional obstacles to these technologies, 
                we aim to level the playing field and enable users from all backgrounds to participate fully in the digital economy.
              </p>
              <p>
                Our platform is designed to solve real-world challenges across multiple domains: helping entrepreneurs validate and develop 
                business ideas, enabling content creators to optimize their workflows, supporting students and researchers with educational 
                resources, and facilitating seamless content sharing across digital platforms. 
              </p>
              <p>
                In an era where digital capability increasingly determines economic opportunity, we view our work as essential to 
                promoting greater equity and inclusion. By democratizing access to advanced tools, we hope to unleash waves of creativity 
                and innovation from previously underrepresented communities and individuals.
              </p>
              <p>
                As we continue to grow, we remain guided by our foundational question: "How can we make powerful digital tools accessible 
                to everyone?" This inquiry shapes our product development, user experience design, and overall strategy as we work toward 
                a future where technological advancement benefits humanity at large, not just those with specialized knowledge or resources.
              </p>
            </div>
          </div>
          
          <div className="glass-card rounded-xl p-8 mb-12">
            <h2 className="text-3xl font-bold mb-6">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 border border-border/50 bg-background/50">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Accessibility First</h3>
                    <p className="text-muted-foreground">
                      We believe that powerful tools should be available to everyone. We design our platform to be intuitive for users 
                      of all technical levels, and we're committed to keeping our services free of charge with no hidden limitations.
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 border border-border/50 bg-background/50">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <HeartHandshake className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">User Empowerment</h3>
                    <p className="text-muted-foreground">
                      We develop tools that multiply human capabilities rather than replace them. Our AI solutions are designed to 
                      enhance creativity, productivity, and knowledge-sharing while keeping users in full control of the final output.
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 border border-border/50 bg-background/50">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Quality Without Compromise</h3>
                    <p className="text-muted-foreground">
                      Free doesn't mean basic. We're committed to delivering professional-grade tools that produce high-quality results. 
                      We continuously refine our algorithms and interfaces based on user feedback and technological advances.
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 border border-border/50 bg-background/50">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <LightbulbIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Innovation With Purpose</h3>
                    <p className="text-muted-foreground">
                      We focus on developing tools that solve real-world problems rather than pursuing technology for its own sake. 
                      Every feature we build addresses specific challenges faced by our diverse user community.
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 border border-border/50 bg-background/50">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Global Perspective</h3>
                    <p className="text-muted-foreground">
                      We build for a worldwide audience with diverse needs and contexts. Our team and user community span more than 
                      150 countries, informing our inclusive approach to product development and user experience design.
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 border border-border/50 bg-background/50">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Rocket className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Ethical Technology</h3>
                    <p className="text-muted-foreground">
                      We develop and deploy AI responsibly, with careful consideration of potential impacts. We prioritize user privacy, 
                      data security, and transparent practices in all aspects of our platform.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
          
          <div className="glass-card rounded-xl p-8">
            <h2 className="text-3xl font-bold mb-6">Join Us On This Journey</h2>
            <div className="text-muted-foreground space-y-4">
              <p>
                Zyfoox is more than just a collection of tools — we're building a community of creators, innovators, and problem-solvers 
                united by the belief that technology should be an equalizer, not a divider. Whether you're a student working on research, 
                an entrepreneur launching a business, a content creator building your brand, or simply someone looking to make daily 
                digital tasks more efficient, our platform is designed for you.
              </p>
              <p>
                We're constantly expanding our toolkit based on user feedback and emerging needs. If you have suggestions for new features 
                or tools that would help you achieve your goals, we welcome your input through our <a href="/contact" className="text-primary hover:underline">contact page</a>.
              </p>
              <p>
                As we continue to grow and evolve, our commitment remains unchanged: to provide powerful, accessible, and free digital tools 
                that help people around the world turn their ideas into reality. Thank you for being part of this journey.
              </p>
              
              <Separator className="my-8" />
              
              <div className="text-center">
                <p className="font-medium">
                  Ready to experience what Zyfoox has to offer? Explore our complete suite of 
                  <a href="/" className="text-primary hover:underline ml-1">free AI tools and content downloaders</a>.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
