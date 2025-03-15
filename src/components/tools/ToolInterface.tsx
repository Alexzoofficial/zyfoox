
import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface ToolInterfaceProps {
  toolName: string;
  fields: {
    id: string;
    label: string;
    type: "text" | "textarea" | "select";
    placeholder: string;
    options?: { value: string; label: string }[];
  }[];
  generateFunction: (formData: Record<string, string>) => Promise<string>;
}

export default function ToolInterface({ toolName, fields, generateFunction }: ToolInterfaceProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [result, setResult] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const missingFields = fields
      .filter(field => !formData[field.id] || formData[field.id].trim() === "")
      .map(field => field.label);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing information",
        description: `Please fill in the following fields: ${missingFields.join(", ")}`,
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      const generatedContent = await generateFunction(formData);
      setResult(generatedContent);
      toast({
        title: "Success!",
        description: `Your ${toolName.toLowerCase()} has been generated.`,
      });
    } catch (error) {
      console.error("Generation error:", error);
      toast({
        title: "Generation failed",
        description: "There was an error generating your content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  }, [fields, formData, generateFunction, toast, toolName]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    toast({
      title: "Copied to clipboard",
      description: "The generated content has been copied to your clipboard.",
    });
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="animate-fade-in">
          <div className="glass-card rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Generate Your {toolName}</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {fields.map((field) => (
                <div key={field.id} className="space-y-2">
                  <label htmlFor={field.id} className="block text-sm font-medium">
                    {field.label}
                  </label>
                  
                  {field.type === "textarea" ? (
                    <textarea
                      id={field.id}
                      rows={4}
                      className="glass-input w-full px-3 py-2 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none"
                      placeholder={field.placeholder}
                      value={formData[field.id] || ""}
                      onChange={handleChange}
                    />
                  ) : field.type === "select" ? (
                    <select
                      id={field.id}
                      className="glass-input w-full px-3 py-2 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none"
                      value={formData[field.id] || ""}
                      onChange={handleChange}
                    >
                      <option value="">Select an option</option>
                      {field.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      id={field.id}
                      className="glass-input w-full px-3 py-2 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none"
                      placeholder={field.placeholder}
                      value={formData[field.id] || ""}
                      onChange={handleChange}
                    />
                  )}
                </div>
              ))}
              
              <button
                type="submit"
                disabled={isGenerating}
                className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-70 flex items-center justify-center"
              >
                {isGenerating ? (
                  <>
                    <Loader2 size={18} className="animate-spin mr-2" />
                    Generating...
                  </>
                ) : (
                  `Generate ${toolName}`
                )}
              </button>
            </form>
          </div>
        </div>
        
        <div className="animate-fade-in animate-delay-100">
          <div className="glass-card rounded-xl p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Result</h2>
              {result && (
                <button
                  onClick={copyToClipboard}
                  className="text-sm px-3 py-1 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
                >
                  Copy
                </button>
              )}
            </div>
            
            <div className="flex-grow bg-card/50 rounded-lg p-4 overflow-auto whitespace-pre-wrap min-h-[300px] font-mono text-sm">
              {result || "Your generated content will appear here..."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
