
import { BookOpen } from "lucide-react";
import ToolHero from "@/components/tools/ToolHero";
import ToolInterface from "@/components/tools/ToolInterface";
import { generateStudyNotes } from "@/lib/ai";

export default function StudyNotes() {
  const fields = [
    {
      id: "topic",
      label: "Topic",
      type: "text" as const,
      placeholder: "e.g., Machine Learning, World History, Organic Chemistry"
    },
    {
      id: "level",
      label: "Learning Level",
      type: "select" as const,
      placeholder: "Select your learning level",
      options: [
        { value: "beginner", label: "Beginner" },
        { value: "intermediate", label: "Intermediate" },
        { value: "advanced", label: "Advanced" },
        { value: "expert", label: "Expert" }
      ]
    },
    {
      id: "focus",
      label: "Key Areas to Focus On",
      type: "textarea" as const,
      placeholder: "Specific concepts, theories, or aspects you want to focus on"
    }
  ];

  return (
    <div>
      <ToolHero
        title="Study Notes & Summaries"
        description="Transform lengthy textbooks and research papers into concise, easy-to-understand notes and summaries tailored to your learning level."
        icon={<BookOpen size={32} />}
      />
      
      <ToolInterface
        toolName="Study Notes"
        fields={fields}
        generateFunction={generateStudyNotes}
      />
      
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <div className="glass-card rounded-xl p-8 animate-fade-in">
          <h2 className="text-2xl font-bold mb-4">Supercharge Your Learning</h2>
          <p className="text-muted-foreground mb-6">
            Our AI-powered study notes generator helps you understand complex topics quickly
            by transforming dense material into clear, concise notes tailored to your learning level.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-4 bg-secondary rounded-lg">
              <h3 className="font-semibold mb-2">Save Time</h3>
              <p className="text-sm text-muted-foreground">
                Convert hours of reading into minutes of focused learning with AI-generated summaries.
              </p>
            </div>
            <div className="p-4 bg-secondary rounded-lg">
              <h3 className="font-semibold mb-2">Improve Comprehension</h3>
              <p className="text-sm text-muted-foreground">
                Complex concepts explained in straightforward language you can understand.
              </p>
            </div>
            <div className="p-4 bg-secondary rounded-lg">
              <h3 className="font-semibold mb-2">Study Smarter</h3>
              <p className="text-sm text-muted-foreground">
                Focus on key concepts with study notes tailored to your specific learning level.
              </p>
            </div>
          </div>
          
          <h3 className="text-xl font-semibold mb-3">How Our AI Tool Works</h3>
          <p className="text-muted-foreground">
            Our advanced AI processes and distills information based on your specified topic and learning level.
            It identifies key concepts, important facts, and critical relationships, then presents them in
            a structured format optimized for learning and retention.
          </p>
        </div>
      </div>
    </div>
  );
}
