import { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Upload, Image as ImageIcon, Trash, Download } from "lucide-react";
import ToolHero from "@/components/tools/ToolHero";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function BackgroundRemover() {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState("upload");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const urlInputRef = useRef<HTMLInputElement>(null);
  const [apiKey, setApiKey] = useState<string>("sk_67a81c85d2746b1b6a49bf837119bd5137c35a8dd665c330");
  const [showApiKeyInput, setShowApiKeyInput] = useState<boolean>(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.match('image.*')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setOriginalImage(e.target?.result as string);
          setProcessedImage(null);
        };
        reader.readAsDataURL(file);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file (JPEG, PNG, etc.)",
          variant: "destructive",
        });
      }
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = urlInputRef.current?.value;
    if (url) {
      setOriginalImage(url);
      setProcessedImage(null);
    } else {
      toast({
        title: "URL required",
        description: "Please enter an image URL",
        variant: "destructive",
      });
    }
  };

  const removeBackground = async () => {
    if (!originalImage) {
      toast({
        title: "No image selected",
        description: "Please upload an image or provide a URL first",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Prepare the image data
      let formData = new FormData();
      
      if (originalImage.startsWith('data:')) {
        // Handle base64 image from file upload
        const base64Data = originalImage.split(',')[1];
        const byteCharacters = atob(base64Data);
        const byteArrays = [];
        
        for (let i = 0; i < byteCharacters.length; i++) {
          byteArrays.push(byteCharacters.charCodeAt(i));
        }
        
        const byteArray = new Uint8Array(byteArrays);
        const blob = new Blob([byteArray], { type: 'image/png' });
        formData.append('image_file', blob);
      } else {
        // Handle image URL
        formData.append('image_url', originalImage);
      }

      // Make API request to remove.bg
      const response = await fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: {
          'X-Api-Key': apiKey,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setProcessedImage(url);

      toast({
        title: "Success!",
        description: "Background removed successfully",
      });
    } catch (error) {
      console.error('Error removing background:', error);
      toast({
        title: "Processing failed",
        description: "There was an error removing the background. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadImage = () => {
    if (processedImage) {
      const link = document.createElement('a');
      link.href = processedImage;
      link.download = 'removed-background.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const resetImages = () => {
    setOriginalImage(null);
    setProcessedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (urlInputRef.current) urlInputRef.current.value = '';
  };

  return (
    <>
      <Helmet>
        <title>Background Remover - Remove Image Backgrounds Online | Zyfoox</title>
        <meta 
          name="description" 
          content="Remove image backgrounds instantly with our free online background remover tool. Get transparent backgrounds for product photos, portraits, and more in seconds." 
        />
        <meta 
          name="keywords" 
          content="background remover, remove background from image, transparent background, image background eraser, photo background remover" 
        />
      </Helmet>

      <ToolHero
        title="Background Remover"
        description="Remove backgrounds from images with AI in seconds. Get high-quality transparent background images for free."
        icon={<ImageIcon size={28} />}
      />

      <div className="container mx-auto py-12 px-4 max-w-5xl">
        <div className="mb-8">
          <Tabs defaultValue="upload" onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="upload">Upload Image</TabsTrigger>
              <TabsTrigger value="url">Image URL</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="space-y-4">
              <Card className="p-6">
                <div className="flex flex-col items-center justify-center py-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <Upload className="mb-4 text-gray-500" />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PNG, JPG or WEBP (MAX. 5MB)
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileUpload}
                  />
                  <Button
                    className="mt-4"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Choose File
                  </Button>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="url">
              <Card className="p-6">
                <form onSubmit={handleUrlSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="image-url">Image URL</Label>
                    <Input
                      ref={urlInputRef}
                      id="image-url"
                      placeholder="https://example.com/image.jpg"
                      type="url"
                    />
                  </div>
                  <Button type="submit">Load Image</Button>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {originalImage && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-4 flex flex-col">
                <h3 className="text-lg font-medium mb-2">Original Image</h3>
                <div className="flex-1 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden p-2">
                  <img
                    src={originalImage}
                    alt="Original"
                    className="max-w-full max-h-[300px] object-contain"
                  />
                </div>
              </Card>
              
              <Card className="p-4 flex flex-col">
                <h3 className="text-lg font-medium mb-2">Processed Image</h3>
                <div className="flex-1 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden p-2">
                  {processedImage ? (
                    <img
                      src={processedImage}
                      alt="With Removed Background"
                      className="max-w-full max-h-[300px] object-contain"
                    />
                  ) : (
                    <div className="text-gray-500 text-center flex flex-col items-center">
                      <ImageIcon size={48} className="mb-2 opacity-30" />
                      <p>Click "Remove Background" to process the image</p>
                    </div>
                  )}
                </div>
              </Card>
            </div>
            
            <div className="flex flex-wrap gap-3 justify-center">
              <Button 
                onClick={removeBackground} 
                disabled={isProcessing || !originalImage}
                className="min-w-[150px]"
              >
                {isProcessing ? "Processing..." : "Remove Background"}
              </Button>
              
              <Button 
                onClick={downloadImage} 
                disabled={!processedImage}
                variant="outline"
                className="min-w-[150px]"
              >
                <Download className="mr-2 h-4 w-4" /> Download
              </Button>
              
              <Button 
                onClick={resetImages} 
                variant="destructive"
                className="min-w-[150px]"
              >
                <Trash className="mr-2 h-4 w-4" /> Reset
              </Button>
            </div>
          </div>
        )}

        <div className="mt-16 space-y-6 prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold" id="about">About Background Remover Tool</h2>
          
          <p>
            Our Background Remover tool uses advanced AI technology to automatically detect and remove backgrounds from your images in seconds. Whether you need transparent product images for your online store, professional headshots, or creative photo edits, our tool delivers high-quality results without the need for complex photo editing software.
          </p>
          
          <h3>How to Remove Image Backgrounds</h3>
          
          <ol>
            <li><strong>Upload your image:</strong> Select a file from your device or provide an image URL.</li>
            <li><strong>Process the image:</strong> Click the "Remove Background" button and let our AI do the work.</li>
            <li><strong>Download the result:</strong> Save your new image with a transparent background.</li>
          </ol>
          
          <h3>Features of Our Background Remover</h3>
          
          <ul>
            <li><strong>AI-Powered Precision:</strong> Advanced algorithms detect subjects and remove backgrounds with precision.</li>
            <li><strong>Fast Processing:</strong> Get results in seconds, not minutes.</li>
            <li><strong>High-Quality Output:</strong> Maintain image quality and detail in the processed result.</li>
            <li><strong>Transparent Backgrounds:</strong> Perfect for product photography, design work, and more.</li>
            <li><strong>User-Friendly Interface:</strong> Simple to use with no technical skills required.</li>
          </ul>
          
          <h3>Common Use Cases</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose mt-4 mb-6">
            <div className="border rounded-lg p-4 bg-card">
              <h4 className="font-semibold mb-2">E-commerce Photography</h4>
              <p className="text-sm text-muted-foreground">Create professional product images with transparent backgrounds for your online store. Increase conversion rates with clean, consistent product photos.</p>
            </div>
            
            <div className="border rounded-lg p-4 bg-card">
              <h4 className="font-semibold mb-2">Professional Portraits</h4>
              <p className="text-sm text-muted-foreground">Perfect for LinkedIn profiles, company websites, and professional portfolios. Get studio-quality headshots without expensive photography sessions.</p>
            </div>
            
            <div className="border rounded-lg p-4 bg-card">
              <h4 className="font-semibold mb-2">Design Projects</h4>
              <p className="text-sm text-muted-foreground">Remove backgrounds for graphic design work, marketing materials, social media posts, and digital art creation.</p>
            </div>
            
            <div className="border rounded-lg p-4 bg-card">
              <h4 className="font-semibold mb-2">Photo Editing</h4>
              <p className="text-sm text-muted-foreground">Isolate subjects to place them on new backgrounds, create collages, or develop creative composite images.</p>
            </div>
          </div>
          
          <h3>Tips for Best Results</h3>
          
          <ul>
            <li><strong>Use high-quality images:</strong> Higher resolution photos typically yield better results.</li>
            <li><strong>Good lighting helps:</strong> Images with well-defined contrast between subject and background work best.</li>
            <li><strong>Check the edges:</strong> For professional use, zoom in to ensure the edges are clean and precise.</li>
            <li><strong>Complex backgrounds:</strong> Even with busy backgrounds, our AI can typically isolate subjects accurately.</li>
          </ul>
          
          <h3>Technical Specifications</h3>
          
          <ul>
            <li><strong>Supported formats:</strong> JPG, PNG, WEBP</li>
            <li><strong>Max file size:</strong> 5MB</li>
            <li><strong>Output format:</strong> PNG with transparent background</li>
            <li><strong>Processing time:</strong> Typically 2-5 seconds per image (depends on size and complexity)</li>
          </ul>
          
          <p>
            Our Background Remover tool is powered by advanced AI technology from remove.bg, a leading provider of background removal solutions. The tool uses deep learning algorithms to analyze images and precisely separate subjects from their backgrounds, producing professional results without manual editing.
          </p>
          
          <h3>Privacy and Security</h3>
          
          <p>
            We take your privacy seriously. Images you upload are processed securely and are not stored permanently on our servers. All processing is done via encrypted connections to ensure your data remains private and secure.
          </p>
          
          <h2 className="text-2xl font-bold mt-8">Frequently Asked Questions</h2>
          
          <div className="space-y-4 mt-4">
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold">Is this background remover free to use?</h4>
              <p className="mt-1 text-muted-foreground">Yes, our basic background removal service is free to use. For high-volume needs or commercial usage, consider checking usage limits.</p>
            </div>
            
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold">How accurate is the background removal?</h4>
              <p className="mt-1 text-muted-foreground">Our AI-powered tool provides highly accurate results for most images. It works best with clear subjects and well-defined edges, but can handle complex backgrounds too.</p>
            </div>
            
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold">Can I remove backgrounds from multiple images at once?</h4>
              <p className="mt-1 text-muted-foreground">Currently, our tool processes one image at a time to ensure optimal quality. For batch processing needs, you may need to process images individually.</p>
            </div>
            
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold">What happens to my uploaded images?</h4>
              <p className="mt-1 text-muted-foreground">Your privacy is important to us. Images are processed securely and are not permanently stored on our servers after processing is complete.</p>
            </div>
            
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold">Can I use the processed images commercially?</h4>
              <p className="mt-1 text-muted-foreground">Yes, the images you process with our tool are yours to use for personal or commercial purposes, as long as you have the rights to the original images.</p>
            </div>
            
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold">Does the tool work with all types of images?</h4>
              <p className="mt-1 text-muted-foreground">Our tool works well with most image types, but results may vary with extremely complex images or those with very low contrast between subject and background.</p>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mt-8">Remove Image Backgrounds in Seconds</h2>
          
          <p>
            Don't waste time manually cutting out backgrounds in Photoshop. Our Background Remover tool gives you professional results in seconds with just a few clicks. Perfect for e-commerce, social media, design projects, and more.
          </p>
          
          <p>
            Try our Background Remover tool today and transform your images instantly!
          </p>
        </div>
      </div>
    </>
  );
}
