
import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Download, Link as LinkIcon, Copy } from "lucide-react";
import { validateUrl, processDownload, extractVideoId, downloadFile, getThumbnailUrl } from "@/utils/downloaderService";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DownloaderInterfaceProps {
  toolName: string;
  platform: string;
  formats?: { value: string; label: string }[];
  description: string;
  supportedUrls: string[];
  features: string[];
}

export default function DownloaderInterface({ 
  toolName, 
  platform, 
  formats = [], 
  description,
  supportedUrls,
  features 
}: DownloaderInterfaceProps) {
  const [url, setUrl] = useState<string>("");
  const [format, setFormat] = useState<string>(formats.length > 0 ? formats[0].value : "");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [downloadUrl, setDownloadUrl] = useState<string>("");
  const [videoId, setVideoId] = useState<string | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");
  const { toast } = useToast();

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    
    // Extract video ID and set thumbnail for applicable platforms
    if (platform === "youtube") {
      const extractedId = extractVideoId(newUrl, platform);
      setVideoId(extractedId);
      if (extractedId) {
        setThumbnailUrl(getThumbnailUrl(extractedId, platform));
      } else {
        setThumbnailUrl("");
      }
    }
  };

  const handleFormatChange = (value: string) => {
    setFormat(value);
  };

  const handleProcess = useCallback(async () => {
    if (!url) {
      toast({
        title: "URL Required",
        description: "Please enter a valid URL",
        variant: "destructive",
      });
      return;
    }

    if (!validateUrl(url, platform)) {
      toast({
        title: "Invalid URL",
        description: `Please enter a valid ${platform} URL`,
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      const result = await processDownload(url, platform, format);
      
      if (result.success) {
        setDownloadUrl(result.downloadUrl || "");
        toast({
          title: "Success!",
          description: result.message,
        });
      } else {
        toast({
          title: "Processing Failed",
          description: result.error || "Failed to process the URL",
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
  }, [url, platform, format, toast]);

  const handleDownload = useCallback(() => {
    if (downloadUrl) {
      downloadFile(downloadUrl, `${platform}-download`);
    }
  }, [downloadUrl, platform]);

  const copyToClipboard = useCallback((textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    toast({
      title: "Copied to clipboard",
      description: "URL copied to clipboard",
    });
  }, [toast]);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="animate-fade-in">
        <div className="glass-card rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-2">How to Use {toolName}</h2>
          <p className="text-muted-foreground mb-4">{description}</p>
          
          <div className="space-y-4 mb-6">
            <div>
              <h3 className="font-medium mb-2">Supported URL Formats:</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                {supportedUrls.map((supportedUrl, index) => (
                  <li key={index}>{supportedUrl}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Features:</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                {features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="url">Enter {platform} URL</Label>
              <div className="flex space-x-2">
                <Input
                  id="url"
                  value={url}
                  onChange={handleUrlChange}
                  placeholder={`Paste ${platform} URL here`}
                  className="flex-1"
                />
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => copyToClipboard(url)}
                  title="Copy URL"
                >
                  <Copy size={18} />
                </Button>
              </div>
            </div>
            
            {formats.length > 0 && (
              <div className="space-y-2">
                <Label htmlFor="format">Select Format</Label>
                <Select value={format} onValueChange={handleFormatChange}>
                  <SelectTrigger id="format">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    {formats.map((fmt) => (
                      <SelectItem key={fmt.value} value={fmt.value}>
                        {fmt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            
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
        
        {(downloadUrl || thumbnailUrl) && (
          <div className="glass-card rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Download</h2>
            
            {thumbnailUrl && (
              <div className="mb-4">
                <h3 className="font-medium mb-2">Preview:</h3>
                <div className="relative aspect-video bg-secondary/50 rounded-lg overflow-hidden">
                  <img 
                    src={thumbnailUrl} 
                    alt="Video thumbnail" 
                    className="w-full h-full object-cover"
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                  />
                </div>
              </div>
            )}
            
            {downloadUrl && (
              <>
                <Separator className="my-4" />
                
                <div className="mt-4">
                  <Button
                    onClick={handleDownload}
                    className="w-full"
                    variant="default"
                  >
                    <Download size={18} className="mr-2" />
                    Download Now
                  </Button>
                  
                  <p className="text-xs text-muted-foreground mt-4 text-center">
                    By using this service, you confirm that you have the right to download this content
                    and that it doesn't violate our Terms of Service or any applicable laws.
                  </p>
                </div>
              </>
            )}
          </div>
        )}
      </div>
      
      <div className="mt-12 space-y-6 animate-fade-in">
        <h2 className="text-2xl font-semibold mb-4">About {toolName}</h2>
        
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p>
            Our {toolName} is a free online tool that allows you to easily download videos from {platform} without any registration or software installation. The tool is completely web-based and works on all devices including smartphones, tablets, and computers.
          </p>
          
          <h3>Why Use Our {toolName}?</h3>
          <ul>
            <li><strong>Fast and Reliable:</strong> Our service processes your download requests quickly and efficiently.</li>
            <li><strong>No Registration Required:</strong> You don't need to create an account or provide any personal information.</li>
            <li><strong>Free to Use:</strong> The service is completely free with no hidden charges.</li>
            <li><strong>High-Quality Downloads:</strong> Get the best possible quality for your downloads.</li>
            <li><strong>Multi-Platform Support:</strong> Works on all devices and operating systems.</li>
          </ul>
          
          <h3>How It Works</h3>
          <p>
            Our {toolName} works by analyzing the URL you provide and extracting the video content from the {platform} servers. The process is completely legal for personal use and doesn't violate any terms of service as long as you're downloading content for personal viewing.
          </p>
          
          <h3>Legal Considerations</h3>
          <p>
            When using our {toolName}, please be aware of copyright restrictions. Downloading videos for personal use is generally acceptable in most jurisdictions, but redistributing or using them commercially without permission might violate copyright laws. Always respect intellectual property rights and the platform's terms of service.
          </p>
          
          <p>
            Zyfoox provides this service for legitimate personal use and does not encourage or condone any illegal activities. If you're unsure about the legality of downloading specific content, we recommend consulting with a legal professional.
          </p>
        </div>
      </div>
    </div>
  );
}
