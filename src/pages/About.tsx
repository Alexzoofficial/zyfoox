
import { Building, LightbulbIcon, HeartHandshake, Rocket, Users, Award, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <section className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">About AIToolbox</h1>
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-8 rounded-xl mb-12">
          <p className="text-xl text-center text-muted-foreground leading-relaxed">
            Empowering creators, entrepreneurs, and professionals with AI-powered tools
            designed to transform ideas into impact.
          </p>
        </div>
        
        <div className="glass-card rounded-xl p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <div className="text-muted-foreground space-y-4">
            <p>
              AIToolbox began with a simple yet powerful idea: What if we could make advanced AI capabilities accessible to everyone? 
              In 2022, as artificial intelligence was rapidly transforming from a specialized field into a transformative technology, 
              our founding team of AI researchers, software engineers, and product designers came together with a shared vision.
            </p>
            <p>
              We had witnessed firsthand how AI tools were revolutionizing workflows for those with technical expertise or 
              enterprise-level resources. But we also saw a significant gap - entrepreneurs, content creators, educators, and small 
              business owners were often left behind, unable to harness these powerful capabilities without significant technical knowledge 
              or prohibitive costs.
            </p>
            <p>
              Founded by former researchers from leading AI labs and technologists from global technology companies, we set out to 
              democratize access to AI capabilities that could multiply human creativity and productivity. Our first prototype was a 
              simple web application that could generate professional marketing copy in seconds - a task that typically required hours 
              of focused work or expensive agency resources.
            </p>
            <p>
              The response was overwhelming. Users from diverse backgrounds - from solo entrepreneurs launching their first business 
              to marketing teams at established companies - found immediate value in our solution. This early success fueled our 
              expansion into a comprehensive suite of AI-powered tools spanning content creation, business development, educational 
              resources, and professional development.
            </p>
            <p>
              Today, AIToolbox serves over 500,000 users across 160 countries, ranging from individual professionals to Fortune 500 
              companies. Our platform processes millions of AI-generated outputs daily, saving our users countless hours and unlocking 
              creative possibilities previously unimaginable.
            </p>
            <p>
              What began as a mission to make AI accessible has evolved into something much more profound: we're not just providing tools; 
              we're empowering people to achieve their goals, bring their ideas to life, and focus on what truly matters - creating value 
              and making an impact in their respective fields.
            </p>
          </div>
        </div>
        
        <div className="glass-card rounded-xl p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <div className="text-muted-foreground space-y-4">
            <p>
              At AIToolbox, our mission is to democratize access to artificial intelligence, putting powerful AI tools into the hands 
              of creators, entrepreneurs, educators, and professionals worldwide. We believe that AI should be an amplifier of human 
              creativity and productivity, not a replacement for it.
            </p>
            <p>
              We are committed to developing intuitive, ethical, and effective AI solutions that address real-world challenges across 
              various domains. By removing technical barriers and prohibitive costs, we aim to level the playing field, allowing individuals 
              and organizations of all sizes to harness the transformative potential of AI.
            </p>
            <p>
              Our tools are designed not just to automate tasks but to enhance human capabilities, spark innovation, and create space 
              for the kind of deep, creative work that drives progress and fulfillment. We envision a world where AI becomes a trusted 
              companion in the creative and professional journey, handling the routine so humans can focus on the remarkable.
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
                  <h3 className="text-xl font-semibold mb-2">Human-Centered AI</h3>
                  <p className="text-muted-foreground">
                    We design our tools to augment human intelligence and creativity, not replace it. 
                    Every feature we build starts with understanding human needs and challenges.
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
                  <h3 className="text-xl font-semibold mb-2">Accessibility</h3>
                  <p className="text-muted-foreground">
                    We believe powerful AI tools should be available to everyone, regardless of technical 
                    expertise or resource constraints. Simplicity and affordability drive our design decisions.
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
                  <h3 className="text-xl font-semibold mb-2">Excellence</h3>
                  <p className="text-muted-foreground">
                    We hold ourselves to the highest standards in AI development, user experience, and customer service. 
                    Good enough is never enough – we continuously refine our offerings based on user feedback and technological advances.
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
                  <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                  <p className="text-muted-foreground">
                    We embrace curiosity and experimentation, constantly exploring new ways AI can solve problems and create opportunities. 
                    Our culture celebrates creative thinking and responsible risk-taking.
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
                  <h3 className="text-xl font-semibold mb-2">Diversity & Inclusion</h3>
                  <p className="text-muted-foreground">
                    We build for a global audience with diverse needs and perspectives. Our team reflects this commitment, 
                    bringing together varied backgrounds, experiences, and viewpoints to inform our work.
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
                  <h3 className="text-xl font-semibold mb-2">Ethical AI</h3>
                  <p className="text-muted-foreground">
                    We commit to developing AI responsibly, with careful consideration of potential impacts. Transparency, 
                    fairness, and privacy are non-negotiable aspects of our approach to AI development.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
        
        <div className="glass-card rounded-xl p-8">
          <h2 className="text-3xl font-bold mb-6">Our Team</h2>
          <div className="text-muted-foreground space-y-4">
            <p>
              The AIToolbox team brings together diverse expertise from AI research, software engineering, product design, and various 
              industry domains. Our leadership team includes former researchers from leading AI labs, product managers from global 
              technology companies, and entrepreneurs who have built and scaled successful technology ventures.
            </p>
            <p>
              Beyond our technical capabilities, what truly defines our team is our shared commitment to the responsible development 
              and application of AI. We believe in building technology that empowers rather than replaces human capabilities, that 
              amplifies creativity rather than standardizing it, and that solves meaningful problems rather than creating new ones.
            </p>
            <p>
              We operate as a distributed team across North America, Europe, and Asia, bringing global perspectives to our work while 
              maintaining a unified culture centered on innovation, impact, and inclusivity. This distributed approach allows us to 
              recruit exceptional talent regardless of geography and to better understand the diverse needs of our global user base.
            </p>
            <p>
              As we continue to grow, we remain committed to building a team that not only possesses technical excellence but also 
              embodies the values that drive our mission: empathy for users, passion for innovation, and dedication to using AI as a 
              force for positive change in the world.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
