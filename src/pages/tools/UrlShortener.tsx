
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import ToolHero from "@/components/tools/ToolHero";
import { Link as LinkIcon, Trash, Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface ShortenedUrl {
  originalUrl: string;
  shortCode: string;
  createdAt: string;
}

export default function UrlShortener() {
  const { toast } = useToast();
  const [urlInput, setUrlInput] = useState('');
  const [shortenedUrls, setShortenedUrls] = useState<ShortenedUrl[]>([]);
  const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);

  // Load existing URLs from localStorage
  useEffect(() => {
    loadUrlsFromStorage();
    checkForRedirect();
  }, []);

  const loadUrlsFromStorage = () => {
    const urls = getUrlsFromStorage();
    setShortenedUrls(urls);
  };

  const getUrlsFromStorage = (): ShortenedUrl[] => {
    const urls = localStorage.getItem('shortenedUrls');
    return urls ? JSON.parse(urls) : [];
  };

  const checkForRedirect = () => {
    const hash = window.location.hash.substring(1);
    if (hash) {
      const urls = getUrlsFromStorage();
      const urlObject = urls.find(url => url.shortCode === hash);
      
      if (urlObject) {
        window.location.href = urlObject.originalUrl;
      }
    }
  };

  const isValidUrl = (url: string): boolean => {
    try {
      // Add http:// prefix if missing
      if (!url.match(/^[a-zA-Z]+:\/\//)) {
        url = 'http://' + url;
      }
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const generateShortCode = (): string => {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let shortCode = '';
    
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      shortCode += characters.charAt(randomIndex);
    }
    
    return shortCode;
  };

  const saveUrl = (originalUrl: string, shortCode: string) => {
    const urls = getUrlsFromStorage();
    
    // Check if URL already exists
    const existingUrl = urls.find(url => url.originalUrl === originalUrl);
    if (existingUrl) {
      setShortenedUrl(window.location.origin + window.location.pathname + '#' + existingUrl.shortCode);
      return existingUrl.shortCode;
    }
    
    // Add new URL
    const newUrl: ShortenedUrl = {
      originalUrl,
      shortCode,
      createdAt: new Date().toISOString()
    };
    
    urls.push(newUrl);
    localStorage.setItem('shortenedUrls', JSON.stringify(urls));
    loadUrlsFromStorage();
    return shortCode;
  };

  const handleShortenClick = () => {
    let longUrl = urlInput.trim();
    
    if (!longUrl) {
      toast({
        title: "Empty URL",
        description: "Please enter a URL to shorten.",
        variant: "destructive"
      });
      return;
    }
    
    // Add http:// prefix if missing
    if (!longUrl.match(/^[a-zA-Z]+:\/\//)) {
      longUrl = 'http://' + longUrl;
    }
    
    // Validate URL
    if (!isValidUrl(longUrl)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL.",
        variant: "destructive"
      });
      return;
    }
    
    // Generate a short code
    const shortCode = generateShortCode();
    
    // Create the shortened URL
    const shortUrl = window.location.origin + window.location.pathname + '#' + shortCode;
    
    // Save to localStorage
    saveUrl(longUrl, shortCode);
    
    // Display the result
    setShortenedUrl(shortUrl);
    
    toast({
      title: "URL Shortened",
      description: "Your shortened URL has been created."
    });
    
    // Clear input
    setUrlInput('');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast({
          title: "Copied!",
          description: "URL copied to clipboard."
        });
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        toast({
          title: "Copy Failed",
          description: "Could not copy to clipboard.",
          variant: "destructive"
        });
      });
  };

  const deleteUrl = (shortCode: string) => {
    let urls = getUrlsFromStorage();
    urls = urls.filter(url => url.shortCode !== shortCode);
    localStorage.setItem('shortenedUrls', JSON.stringify(urls));
    loadUrlsFromStorage();
    
    toast({
      title: "URL Deleted",
      description: "The shortened URL has been removed."
    });
    
    if (shortenedUrl && shortenedUrl.includes('#' + shortCode)) {
      setShortenedUrl(null);
    }
  };

  return (
    <>
      <Helmet>
        <title>URL Shortener - Create Short Links Instantly | Zyfoox</title>
        <meta 
          name="description" 
          content="Shorten long URLs with our free URL shortener tool. Create compact, shareable links that are easy to remember and track." 
        />
        <meta 
          name="keywords" 
          content="URL shortener, link shortener, short URL, shorten link, URL redirect, tiny URL" 
        />
      </Helmet>

      <ToolHero
        title="URL Shortener"
        description="Create short, trackable links from long URLs. Share them easily on social media, emails, or messages."
        icon={<LinkIcon size={28} />}
      />

      <div className="container mx-auto py-12 px-4 max-w-3xl">
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Shorten Your URL</h2>
            
            <div className="flex flex-col md:flex-row gap-3 mb-6">
              <Input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="Enter your long URL"
                className="flex-1"
              />
              <Button onClick={handleShortenClick} className="whitespace-nowrap">
                Shorten URL
              </Button>
            </div>
            
            {shortenedUrl && (
              <div className="bg-muted p-4 rounded-md">
                <p className="text-sm mb-2">Your shortened URL:</p>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
                  <code className="bg-background p-2 rounded text-sm flex-1 break-all">
                    {shortenedUrl}
                  </code>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(shortenedUrl)}
                    className="whitespace-nowrap"
                  >
                    <Copy size={16} className="mr-2" /> Copy
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Your Shortened URLs</h2>
            
            {shortenedUrls.length === 0 ? (
              <p className="text-muted-foreground text-center py-6">
                No URLs yet. Start shortening!
              </p>
            ) : (
              <div className="space-y-4">
                {shortenedUrls
                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .map((url, index) => {
                    const shortUrl = window.location.origin + window.location.pathname + '#' + url.shortCode;
                    
                    return (
                      <div 
                        key={index}
                        className="p-3 border rounded-md hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex flex-col gap-2">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium text-sm break-all">
                              {url.originalUrl}
                            </h3>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteUrl(url.shortCode)}
                              className="h-8 w-8 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                            >
                              <Trash size={16} />
                            </Button>
                          </div>
                          
                          <div className="flex justify-between items-center mt-1">
                            <code className="text-primary text-sm break-all">
                              {shortUrl}
                            </code>
                            <div className="flex gap-1 ml-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => copyToClipboard(shortUrl)}
                                className="h-8 w-8"
                              >
                                <Copy size={16} />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => window.open(url.originalUrl, '_blank')}
                                className="h-8 w-8"
                              >
                                <ExternalLink size={16} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-16 space-y-6 prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold" id="about">About URL Shortener Tool</h2>
          
          <p>
            Our URL Shortener tool allows you to transform long, complex URLs into short, manageable links that are easy to share and track. Whether you're sharing links on social media, in emails, or through messaging apps, our tool provides you with concise URLs that take up less space and look cleaner.
          </p>
          
          <h3>How to Shorten URLs</h3>
          
          <ol>
            <li><strong>Enter your URL:</strong> Paste the long URL you want to shorten into the input field.</li>
            <li><strong>Click "Shorten URL":</strong> Our system will generate a unique, shortened link instantly.</li>
            <li><strong>Copy and share:</strong> Use the "Copy" button to copy your new short URL to the clipboard and share it anywhere.</li>
          </ol>
          
          <h3>Features of Our URL Shortener</h3>
          
          <ul>
            <li><strong>No Registration Required:</strong> Create shortened URLs instantly without signing up.</li>
            <li><strong>Link Management:</strong> Access and manage all your shortened URLs in one place.</li>
            <li><strong>Persistent Links:</strong> Your shortened URLs are saved in your browser for future access.</li>
            <li><strong>Privacy-Focused:</strong> We don't track or analyze the content of your original URLs.</li>
            <li><strong>Free to Use:</strong> All features are available at no cost.</li>
          </ul>
          
          <h3>Common Use Cases</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose mt-4 mb-6">
            <div className="border rounded-lg p-4 bg-card">
              <h4 className="font-semibold mb-2">Social Media Sharing</h4>
              <p className="text-sm text-muted-foreground">Create short, clean links for Twitter, Instagram, and other platforms with character limits. Make your posts look professional and save space.</p>
            </div>
            
            <div className="border rounded-lg p-4 bg-card">
              <h4 className="font-semibold mb-2">Marketing Campaigns</h4>
              <p className="text-sm text-muted-foreground">Use shortened URLs in marketing materials, both digital and print. They're easier to type manually from physical media.</p>
            </div>
            
            <div className="border rounded-lg p-4 bg-card">
              <h4 className="font-semibold mb-2">Email Communications</h4>
              <p className="text-sm text-muted-foreground">Long URLs can break in email clients. Short URLs ensure your links remain clickable and look cleaner in professional communications.</p>
            </div>
            
            <div className="border rounded-lg p-4 bg-card">
              <h4 className="font-semibold mb-2">SMS and Messaging</h4>
              <p className="text-sm text-muted-foreground">Send concise links in text messages and chat applications where space is limited and long URLs can look messy.</p>
            </div>
          </div>
          
          <h3>How It Works</h3>
          
          <p>
            Our URL shortener uses a simple yet effective process to create short links:
          </p>
          
          <ol>
            <li>When you enter a long URL, our system generates a unique alphanumeric code.</li>
            <li>This code becomes part of your new shortened URL.</li>
            <li>When someone clicks the shortened URL, they're quickly redirected to your original destination.</li>
            <li>The shortened URLs are stored locally in your browser, giving you easy access to manage them later.</li>
          </ol>
          
          <h3>Best Practices for URL Shortening</h3>
          
          <ul>
            <li><strong>Use for sharing:</strong> Shortened URLs are perfect for sharing on platforms with character limits.</li>
            <li><strong>Verify destinations:</strong> Always make sure the destination URL is correct before shortening.</li>
            <li><strong>Consider context:</strong> In some professional contexts, seeing the full URL may be preferred for transparency.</li>
            <li><strong>Manage your URLs:</strong> Regularly review and clean up your shortened URLs list to remove outdated links.</li>
          </ul>
          
          <h3>Privacy and Security</h3>
          
          <p>
            Our URL shortener is designed with privacy in mind. We don't store your original URLs on servers - all shortened URLs are saved locally in your browser's storage. This means your data stays on your device, providing an added layer of privacy.
          </p>
          
          <h2 className="text-2xl font-bold mt-8">Frequently Asked Questions</h2>
          
          <div className="space-y-4 mt-4">
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold">How long do shortened URLs last?</h4>
              <p className="mt-1 text-muted-foreground">Shortened URLs are stored in your browser's local storage and will remain active as long as you don't clear your browser data or manually delete them.</p>
            </div>
            
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold">Are there any limits to URL shortening?</h4>
              <p className="mt-1 text-muted-foreground">There are no explicit limits to how many URLs you can shorten, though browser storage limitations may apply if you create a very large number of short URLs.</p>
            </div>
            
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold">Can I customize my shortened URLs?</h4>
              <p className="mt-1 text-muted-foreground">Currently, our tool automatically generates short codes. Custom vanity URLs are not available in this version.</p>
            </div>
            
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold">What happens if I access the site from a different device?</h4>
              <p className="mt-1 text-muted-foreground">Since URLs are stored in your browser's local storage, you won't see your previously shortened URLs when accessing from a different device or browser.</p>
            </div>
            
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold">Is there any tracking or analytics for my shortened URLs?</h4>
              <p className="mt-1 text-muted-foreground">The current version doesn't include click tracking or analytics. It's focused on providing simple, private URL shortening functionality.</p>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mt-8">Simplify Your Links Today</h2>
          
          <p>
            Stop sharing long, unwieldy URLs that look unprofessional and take up unnecessary space. Our URL Shortener gives you clean, compact links in seconds, with no registration required.
          </p>
          
          <p>
            Whether you're a social media marketer, content creator, or just someone who needs to share links regularly, our tool simplifies the process and makes your shared links look better everywhere they appear.
          </p>
          
          <p>
            Try our URL Shortener now and experience the convenience of short, manageable links!
          </p>
        </div>
      </div>
    </>
  );
}
