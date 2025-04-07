import { useState } from "react";
import { Helmet } from "react-helmet-async";
import ToolHero from "@/components/tools/ToolHero";
import { Text } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Voice options with their IDs
const voices = [
  { id: "exavitqu4vr4xnsdxmal", name: "Adam (Default)", accent: "American" },
  { id: "vr6aewltigwg4xsoukag", name: "Harry (Deep Voice)", accent: "American" },
  { id: "aznzlk1xvdvuebnxmlld", name: "Ethan (Young Adult)", accent: "American" },
  { id: "mf3mgyeycl7xywbv9v6o", name: "Liam (British)", accent: "British" },
  { id: "txgeqnhwrfwftfgw9xjx", name: "Noah (Casual)", accent: "American" },
  { id: "4PqghwFrDHK7GRGnfqeD", name: "Rachel (Female)", accent: "American" },
  { id: "29vD33N1CtxCmqQRPOHJ", name: "Emma (Female)", accent: "British" },
  { id: "kgG6OwxR3jqSxlvVbtYs", name: "Sophia (Young Female)", accent: "American" },
];

export default function TextToSpeech() {
  const [text, setText] = useState<string>("");
  const [voiceId, setVoiceId] = useState<string>(voices[0].id);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string>("sk_67a81c85d2746b1b6a49bf837119bd5137c35a8dd665c330");
  const [showApiKeyInput, setShowApiKeyInput] = useState<boolean>(false);
  
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!text.trim()) {
      toast({
        title: "Empty text",
        description: "Please enter some text to convert to speech",
        variant: "destructive",
      });
      return;
    }
    
    setIsGenerating(true);
    setAudioUrl(null);
    
    try {
      // Make an actual API call to ElevenLabs
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': apiKey
        },
        body: JSON.stringify({
          text: text,
          model_id: "eleven_monolingual_v1",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      // Get audio data and create URL
      const audioBlob = await response.blob();
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
      
      toast({
        title: "Audio generated successfully",
        description: "Your text has been converted to speech",
      });
      
    } catch (error) {
      console.error("Error generating audio:", error);
      toast({
        title: "Generation failed",
        description: "There was an error converting your text to speech. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleClearAll = () => {
    setText("");
    setAudioUrl(null);
  };

  return (
    <>
      <Helmet>
        <title>Text to Speech Converter - Convert Text to Natural Voice Audio | Zyfoox</title>
        <meta 
          name="description" 
          content="Convert text to natural-sounding speech with our free Text to Speech converter. Multiple voices, accents, and languages available for instant audio generation." 
        />
        <meta 
          name="keywords" 
          content="text to speech, TTS converter, voice generator, text to audio, AI voice generator, speech synthesis, voice converter" 
        />
        <link rel="canonical" href="https://zyfoox.com/tools/text-to-speech" />
      </Helmet>

      <ToolHero
        title="Text to Speech Converter"
        description="Convert text to natural-sounding voice audio with multiple voices and accents."
        icon={<Text size={24} />}
      />

      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="grid grid-cols-1 gap-8">
          <div className="animate-fade-in">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Convert Text to Speech</h2>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="voice-select" className="block text-sm font-medium">
                    Select Voice
                  </Label>
                  <select
                    id="voice-select"
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:ring-1 focus:ring-primary focus:outline-none"
                    value={voiceId}
                    onChange={(e) => setVoiceId(e.target.value)}
                  >
                    {voices.map((voice) => (
                      <option key={voice.id} value={voice.id}>
                        {voice.name} ({voice.accent} accent)
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="text-input" className="block text-sm font-medium">
                    Enter Text
                  </Label>
                  <Textarea
                    id="text-input"
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:ring-1 focus:ring-primary focus:outline-none"
                    placeholder="Enter the text you want to convert to speech..."
                    rows={6}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-70 flex items-center justify-center"
                  >
                    {isGenerating ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating Audio...
                      </>
                    ) : (
                      "Generate Speech"
                    )}
                  </Button>
                  
                  <Button
                    onClick={handleClearAll}
                    variant="secondary"
                    className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/90 transition-colors"
                  >
                    Clear All
                  </Button>
                </div>
              </div>
              
              {audioUrl && (
                <div className="mt-6 p-4 bg-card/50 rounded-lg">
                  <h3 className="font-medium mb-3">Generated Audio</h3>
                  <audio controls className="w-full">
                    <source src={audioUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                  <div className="mt-3 flex justify-end">
                    <a
                      href={audioUrl}
                      download="generated-speech.mp3"
                      className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm hover:bg-primary/20 transition-colors"
                    >
                      Download Audio
                    </a>
                  </div>
                </div>
              )}
            </Card>
          </div>
          
          <div className="mt-6 prose prose-gray dark:prose-invert max-w-none">
            <h2>How to Use the Text to Speech Converter</h2>
            <p>Our Text to Speech Converter transforms written text into natural-sounding speech using advanced AI voice technology. This powerful tool is perfect for creating voiceovers, accessibility content, language learning materials, or simply converting text to audio for convenient listening.</p>
            
            <h3>Simple Steps to Convert Text to Speech</h3>
            <ol>
              <li><strong>Enter your API key</strong>: Provide your ElevenLabs API key to access the high-quality voice synthesis service.</li>
              <li><strong>Select a voice</strong>: Choose from a variety of realistic voices with different characteristics and accents.</li>
              <li><strong>Enter your text</strong>: Type or paste the text you want to convert to speech in the input field.</li>
              <li><strong>Generate speech</strong>: Click the "Generate Speech" button to convert your text into audio.</li>
              <li><strong>Listen and download</strong>: Play the generated audio directly in the browser and download it if needed.</li>
            </ol>
            
            <h3>Available Voices and Accents</h3>
            <p>Our Text to Speech Converter offers a diverse range of voices to suit your specific needs:</p>
            <ul>
              <li><strong>American Accents</strong>: Adam (default), Harry (deep voice), Ethan (young adult), Noah (casual tone), Rachel (female), Sophia (young female)</li>
              <li><strong>British Accents</strong>: Liam (male), Emma (female)</li>
              <li><strong>Voice Characteristics</strong>: Choose from different age ranges, tones, and speaking styles to match your content requirements.</li>
            </ul>
            
            <div className="not-prose my-8 p-5 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-3">API Key Privacy Notice</h3>
              <p className="text-blue-700 dark:text-blue-300">
                Your ElevenLabs API key is used solely for processing your text-to-speech requests and is never stored on our servers. 
                All processing is done client-side in your browser. We take your privacy seriously and do not track or store your conversion data.
              </p>
            </div>
            
            <h2>Applications of Text to Speech Technology</h2>
            <p>Text to Speech technology has numerous practical applications across different fields:</p>
            
            <h3>Content Creation</h3>
            <p>Create professional voiceovers for videos, podcasts, and presentations without the need for expensive recording equipment or voice actors. Generate narration for explainer videos, product demonstrations, and educational content quickly and efficiently.</p>
            
            <h3>Accessibility</h3>
            <p>Make content accessible to people with visual impairments, learning disabilities, or reading difficulties. Convert written articles, books, and documents into audio format for easier consumption by audiences with diverse needs.</p>
            
            <h3>E-Learning and Education</h3>
            <p>Develop engaging educational materials with audio components. Create listening exercises for language learning, pronunciation guides, and audio textbooks that enhance the learning experience for auditory learners.</p>
            
            <h3>Customer Service</h3>
            <p>Implement voice-based interfaces for customer service applications, interactive voice response (IVR) systems, and automated messaging. Generate consistent, clear audio instructions and information for customer-facing channels.</p>
            
            <h3>Entertainment and Gaming</h3>
            <p>Add voice narration to games, interactive stories, and entertainment applications. Create dynamic dialogue for characters without relying solely on pre-recorded voice acting.</p>
            
            <h3>Multilingual Communication</h3>
            <p>Facilitate communication across language barriers by converting written text to spoken words. Help users understand how different languages sound when properly pronounced.</p>
            
            <h2>Benefits of Using Our Text to Speech Converter</h2>
            <p>Our advanced text-to-speech solution offers several advantages over traditional methods:</p>
            
            <h3>Natural-Sounding Voices</h3>
            <p>The ElevenLabs API provides exceptionally realistic voice synthesis that closely mimics human speech patterns, intonation, and emotional expression. The result is audio that sounds natural and engaging, not robotic or artificial.</p>
            
            <h3>Multiple Voice Options</h3>
            <p>Choose from a diverse selection of voices with different characteristics, accents, and speaking styles to find the perfect match for your content. This flexibility allows you to select voices that align with your brand identity or specific communication needs.</p>
            
            <h3>Time and Cost Efficiency</h3>
            <p>Generate professional-quality voiceovers in minutes without the expense of hiring voice actors or booking recording studios. This makes high-quality audio content accessible to creators with limited budgets or tight deadlines.</p>
            
            <h3>Consistency and Scalability</h3>
            <p>Maintain consistent voice quality across all your content, regardless of volume or frequency. Scale your audio production without worrying about scheduling multiple recording sessions or managing voice actor availability.</p>
            
            <h3>Easy Integration</h3>
            <p>The generated audio files can be easily downloaded and integrated into various applications, websites, or multimedia projects. This simplifies the workflow for content creators and developers who need to incorporate voice elements into their work.</p>
            
            <h2>Tips for Optimal Text to Speech Conversion</h2>
            <p>Follow these best practices to achieve the highest quality speech output:</p>
            
            <h3>Structure Your Text Properly</h3>
            <p>Use proper punctuation to guide the rhythm and pacing of the speech. Commas indicate short pauses, while periods create longer pauses. Question marks and exclamation points help convey the appropriate intonation.</p>
            
            <h3>Consider Phonetic Spelling</h3>
            <p>For uncommon words, names, or technical terms that might be mispronounced, consider using phonetic spelling or breaking them into syllables with hyphens to guide the pronunciation.</p>
            
            <h3>Test Short Segments First</h3>
            <p>When working with long texts, test a small segment first to ensure the selected voice and settings meet your expectations before processing the entire content.</p>
            
            <h3>Review for Natural Flow</h3>
            <p>After generating speech, listen carefully to ensure the flow sounds natural. If necessary, adjust your text input by adding or modifying punctuation to improve the delivery.</p>
            
            <h3>Use Appropriate Voice Selection</h3>
            <p>Different voices excel at different types of content. A deep, authoritative voice might be ideal for formal announcements, while a more conversational voice works better for dialogue or narrative content.</p>
            
            <h2>Text to Speech Technology: How It Works</h2>
            <p>Understanding the technology behind text-to-speech conversion can help you make the most of this powerful tool:</p>
            
            <h3>Natural Language Processing (NLP)</h3>
            <p>Text-to-speech systems use NLP to analyze and understand the structure, context, and meaning of written text. This analysis helps determine appropriate pronunciation, emphasis, and intonation patterns.</p>
            
            <h3>Speech Synthesis</h3>
            <p>Modern TTS engines like ElevenLabs use advanced neural networks and deep learning to generate highly realistic speech. These AI models have been trained on vast amounts of human speech data to learn natural patterns, rhythms, and nuances.</p>
            
            <h3>Voice Modeling</h3>
            <p>Each available voice is based on a sophisticated model that captures the unique characteristics of human speech, including pitch, timbre, accent, and speaking style. These models allow for consistent voice reproduction across different texts.</p>
            
            <h3>Prosody Generation</h3>
            <p>The system analyzes text to apply appropriate prosody—the patterns of stress and intonation in speech. This includes determining which words to emphasize, where to pause, and how to modulate pitch for questions, statements, or exclamations.</p>
            
            <h2>Future of Text to Speech Technology</h2>
            <p>The text-to-speech landscape continues to evolve rapidly with several exciting developments on the horizon:</p>
            
            <h3>Emotion and Context Awareness</h3>
            <p>Next-generation TTS systems will better understand the emotional context of text and apply appropriate emotional qualities to the generated speech, making it even more natural and expressive.</p>
            
            <h3>Voice Customization</h3>
            <p>Emerging technologies will enable more personalized voice creation, allowing users to customize voices with specific characteristics or even create digital replicas of their own voices.</p>
            
            <h3>Multilingual Improvements</h3>
            <p>Advanced systems will offer better support for multiple languages and dialects, including more accurate pronunciation of foreign words and names within native language contexts.</p>
            
            <h3>Real-time Adaptation</h3>
            <p>Future TTS tools will adapt in real-time to different types of content, automatically adjusting voice characteristics based on whether the text is a news article, dialogue, technical explanation, or storytelling.</p>
            
            <h2>Conclusion</h2>
            <p>Our Text to Speech Converter powered by ElevenLabs technology offers a powerful solution for transforming written content into natural-sounding audio. Whether you're creating educational materials, improving accessibility, developing multimedia content, or exploring innovative applications of voice technology, this tool provides the quality and flexibility you need.</p>
            
            <p>By following the simple steps outlined above and applying our optimization tips, you can generate professional-quality speech from your text in just minutes. The diverse range of voices and natural speech synthesis capabilities open up countless possibilities for creative expression and practical communication solutions.</p>
            
            <p>Start converting your text to speech today and experience the convenience, quality, and versatility of our advanced text-to-speech technology.</p>
          </div>
        </div>
      </div>
    </>
  );
}
