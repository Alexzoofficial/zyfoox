
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import ToolHero from "@/components/tools/ToolHero";
import { Image, Download, Loader2, Link as LinkIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { extractVideoId, validateUrl } from "@/utils/downloaderService";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const thumbnailQualities = [
  { id: "maxres", label: "Maximum Resolution (1280x720)", url: "maxresdefault.jpg" },
  { id: "hq", label: "High Quality (480x360)", url: "hqdefault.jpg" },
  { id: "mq", label: "Medium Quality (320x180)", url: "mqdefault.jpg" },
  { id: "sd", label: "Standard Quality (640x480)", url: "sddefault.jpg" },
  { id: "default", label: "Default Thumbnail (120x90)", url: "default.jpg" },
];

export default function YouTubeThumbnailDownloader() {
  const [url, setUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [videoId, setVideoId] = useState<string | null>(null);
  const [quality, setQuality] = useState("maxres");
  const [thumbnails, setThumbnails] = useState<{[key: string]: string}>({});
  const { toast } = useToast();

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleProcess = async () => {
    if (!url) {
      toast({
        title: "URL Required",
        description: "Please enter a valid YouTube URL",
        variant: "destructive",
      });
      return;
    }

    if (!validateUrl(url, "youtube")) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid YouTube video URL",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      const extractedId = extractVideoId(url, "youtube");
      setVideoId(extractedId);
      
      if (extractedId) {
        const thumbnailUrls: {[key: string]: string} = {};
        
        thumbnailQualities.forEach(quality => {
          thumbnailUrls[quality.id] = `https://img.youtube.com/vi/${extractedId}/${quality.url}`;
        });
        
        setThumbnails(thumbnailUrls);
        
        toast({
          title: "Success!",
          description: "Thumbnail images generated successfully",
        });
      } else {
        toast({
          title: "Processing Failed",
          description: "Failed to extract video ID from URL",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Processing error:", error);
      toast({
        title: "Processing Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = (thumbnailUrl: string) => {
    if (!videoId) return;
    
    const link = document.createElement('a');
    link.href = thumbnailUrl;
    link.download = `youtube-thumbnail-${videoId}-${quality}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Helmet>
        <title>YouTube Thumbnail Downloader - Zyfoox</title>
        <meta 
          name="description" 
          content="Download YouTube video thumbnails in high resolution for free. Get all thumbnail variations, no registration required." 
        />
        <meta 
          name="keywords" 
          content="YouTube thumbnail downloader, download YouTube thumbnails, YouTube thumbnail extractor, YouTube image downloader" 
        />
        <link rel="canonical" href="https://zyfoox.com/tools/youtube-thumbnail-downloader" />
      </Helmet>

      <ToolHero
        title="YouTube Thumbnail Downloader"
        description="Download high-quality thumbnails from any YouTube video. Get all thumbnail variations for free."
        icon={<Image size={24} />}
      />

      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="animate-fade-in">
          <div className="glass-card rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold mb-2">How to Use YouTube Thumbnail Downloader</h2>
            <p className="text-muted-foreground mb-4">
              Paste the YouTube video URL in the input field below and click 'Process URL' to generate thumbnail images.
            </p>
            
            <div className="space-y-4 mb-6">
              <div>
                <h3 className="font-medium mb-2">Supported URL Formats:</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  <li>https://www.youtube.com/watch?v=VIDEO_ID</li>
                  <li>https://youtu.be/VIDEO_ID</li>
                  <li>https://www.youtube.com/shorts/VIDEO_ID</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Features:</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  <li>Download thumbnails in multiple resolutions</li>
                  <li>Get the highest quality thumbnail available</li>
                  <li>No registration or software installation required</li>
                  <li>Works on all devices and browsers</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="url">Enter YouTube URL</Label>
                <Input
                  id="url"
                  value={url}
                  onChange={handleUrlChange}
                  placeholder="Paste YouTube video URL here"
                />
              </div>
              
              <Button
                onClick={handleProcess}
                disabled={isProcessing || !url}
                className="w-full"
              >
                {isProcessing ? (
                  <>
                    <Loader2 size={18} className="animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <LinkIcon size={18} className="mr-2" />
                    Process URL
                  </>
                )}
              </Button>
            </div>
          </div>
          
          {videoId && Object.keys(thumbnails).length > 0 && (
            <div className="glass-card rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Available Thumbnails</h2>
              
              <div className="space-y-2 mb-4">
                <Label>Select Thumbnail Quality</Label>
                <RadioGroup value={quality} onValueChange={setQuality} className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {thumbnailQualities.map((item) => (
                    <div key={item.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={item.id} id={item.id} />
                      <Label htmlFor={item.id} className="cursor-pointer">{item.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              
              <div className="mt-6">
                <div className="relative aspect-video bg-secondary/50 rounded-lg overflow-hidden mb-4">
                  {thumbnails[quality] && (
                    <img 
                      src={thumbnails[quality]} 
                      alt={`YouTube thumbnail - ${quality}`} 
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.src = 'https://placehold.co/1280x720/gray/white?text=Thumbnail+Not+Available';
                      }}
                    />
                  )}
                </div>
                
                <Button
                  onClick={() => handleDownload(thumbnails[quality])}
                  className="w-full"
                  variant="default"
                  disabled={!thumbnails[quality]}
                >
                  <Download size={18} className="mr-2" />
                  Download Thumbnail
                </Button>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-12 space-y-6 animate-fade-in">
          <h2 className="text-2xl font-semibold mb-4">About YouTube Thumbnail Downloader</h2>
          
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p>
              Our YouTube Thumbnail Downloader is a free online tool that allows you to easily download thumbnails from any YouTube video in various resolutions. These thumbnails can be used for creating video previews, blog posts, presentations, or any other personal project.
            </p>
            
            <h3>Why Download YouTube Thumbnails?</h3>
            <p>
              YouTube thumbnails are the preview images that represent videos on the platform. They play a crucial role in attracting viewers and increasing click-through rates. Whether you're a content creator looking for inspiration, a blogger wanting to reference a video, or simply like the artwork used in a thumbnail, our tool makes it easy to download these images in high quality.
            </p>
            
            <h3>Available Thumbnail Resolutions</h3>
            <ul>
              <li><strong>Maximum Resolution (1280x720):</strong> The highest quality thumbnail available for most videos.</li>
              <li><strong>High Quality (480x360):</strong> A good balance of quality and file size.</li>
              <li><strong>Medium Quality (320x180):</strong> Ideal for smaller displays or faster loading times.</li>
              <li><strong>Standard Definition (640x480):</strong> The standard resolution used on many platforms.</li>
              <li><strong>Default (120x90):</strong> The smallest thumbnail size, used for previews in the YouTube interface.</li>
            </ul>
            
            <h3>Legal Considerations</h3>
            <p>
              When downloading and using YouTube thumbnails, it's important to respect copyright and intellectual property rights. YouTube thumbnails are generally created by the video uploader and may be subject to copyright protection. If you're planning to use these thumbnails for anything other than personal use, ensure you have the appropriate permissions or that your use falls under fair use or similar doctrines in your jurisdiction.
            </p>
            
            <p>
              Zyfoox provides this tool for legitimate purposes only and does not encourage any copyright infringement or other illegal activities. Users are solely responsible for how they use the downloaded thumbnails.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
