
import { useState, useRef, ChangeEvent } from "react";
import { Helmet } from "react-helmet-async";
import ToolHero from "@/components/tools/ToolHero";
import { Image, Download, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

export default function ImageResizer() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resizedUrl, setResizedUrl] = useState<string | null>(null);
  const [width, setWidth] = useState<number>(800);
  const [height, setHeight] = useState<number>(600);
  const [quality, setQuality] = useState<number>(90);
  const [format, setFormat] = useState<string>("jpeg");
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const [originalDimensions, setOriginalDimensions] = useState<{width: number, height: number} | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) return;
    
    // Check if the file is an image
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file (JPEG, PNG, etc.)",
        variant: "destructive",
      });
      return;
    }
    
    setSelectedFile(file);
    
    // Create a preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setResizedUrl(null);
    
    // Get original dimensions
    const img = new Image();
    img.onload = () => {
      setOriginalDimensions({
        width: img.width,
        height: img.height
      });
      
      // Set initial resized dimensions to match original
      setWidth(img.width);
      setHeight(img.height);
    };
    img.src = url;
  };

  const resetForm = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setResizedUrl(null);
    setOriginalDimensions(null);
    
    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleResize = async () => {
    if (!selectedFile || !previewUrl) {
      toast({
        title: "No image selected",
        description: "Please select an image to resize",
        variant: "destructive",
      });
      return;
    }
    
    setIsResizing(true);
    
    try {
      // Create a canvas to resize the image
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      
      if (!ctx) {
        throw new Error("Failed to get canvas context");
      }
      
      // Load the image
      const img = new Image();
      img.src = previewUrl;
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });
      
      // Draw the image on the canvas, resizing it
      ctx.drawImage(img, 0, 0, width, height);
      
      // Convert the canvas to a Blob
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            toast({
              title: "Error",
              description: "Failed to resize the image",
              variant: "destructive",
            });
            setIsResizing(false);
            return;
          }
          
          // Create a URL for the resized image
          const resizedImageUrl = URL.createObjectURL(blob);
          setResizedUrl(resizedImageUrl);
          
          toast({
            title: "Success",
            description: "Image resized successfully",
          });
          setIsResizing(false);
        },
        `image/${format}`,
        quality / 100
      );
    } catch (error) {
      console.error("Error resizing image:", error);
      toast({
        title: "Error",
        description: "Failed to resize the image",
        variant: "destructive",
      });
      setIsResizing(false);
    }
  };

  const handleDownload = () => {
    if (!resizedUrl) return;
    
    const link = document.createElement("a");
    link.href = resizedUrl;
    link.download = `resized-image.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handleFormatChange = (value: string) => {
    setFormat(value);
  };

  return (
    <>
      <Helmet>
        <title>Image Resizer - Resize Photos to Custom Dimensions | Zyfoox</title>
        <meta 
          name="description" 
          content="Resize your images easily with our free online Image Resizer tool. Change dimensions, maintain aspect ratio, and download in various formats without losing quality." 
        />
        <meta 
          name="keywords" 
          content="image resizer, resize photos, image dimensions, picture resizer, resize image online, free image resizer" 
        />
        <link rel="canonical" href="https://zyfoox.com/tools/image-resizer" />
      </Helmet>

      <ToolHero
        title="Image Resizer"
        description="Resize your images to exact dimensions without losing quality. Perfect for social media, web, or print."
        icon={<Image size={24} />}
      />

      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="animate-fade-in">
            <div className="glass-card rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Upload & Configure</h2>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="imageUpload">Upload Image</Label>
                  <Input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="cursor-pointer"
                  />
                </div>
                
                {originalDimensions && (
                  <div className="text-sm text-muted-foreground">
                    Original size: {originalDimensions.width} × {originalDimensions.height} px
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="width">Width (px)</Label>
                    <Input
                      id="width"
                      type="number"
                      min="1"
                      max="10000"
                      value={width}
                      onChange={(e) => setWidth(parseInt(e.target.value) || 1)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height">Height (px)</Label>
                    <Input
                      id="height"
                      type="number"
                      min="1"
                      max="10000"
                      value={height}
                      onChange={(e) => setHeight(parseInt(e.target.value) || 1)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="quality">Quality ({quality}%)</Label>
                  <Input
                    id="quality"
                    type="range"
                    min="10"
                    max="100"
                    value={quality}
                    onChange={(e) => setQuality(parseInt(e.target.value))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="format">Format</Label>
                  <Select value={format} onValueChange={handleFormatChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="jpeg">JPEG</SelectItem>
                        <SelectItem value="png">PNG</SelectItem>
                        <SelectItem value="webp">WebP</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={handleResize}
                    disabled={!selectedFile || isResizing}
                    className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                  >
                    {isResizing ? "Resizing..." : "Resize Image"}
                  </button>
                  
                  <button
                    onClick={resetForm}
                    disabled={!selectedFile}
                    className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg font-medium hover:bg-destructive/90 transition-colors disabled:opacity-50"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="animate-fade-in animate-delay-100">
            <div className="glass-card rounded-xl p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Preview</h2>
                {resizedUrl && (
                  <button
                    onClick={handleDownload}
                    className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors flex items-center gap-2"
                  >
                    <Download size={16} />
                    Download
                  </button>
                )}
              </div>
              
              <div className="flex-grow bg-card/50 rounded-lg p-4 flex items-center justify-center overflow-hidden">
                {resizedUrl ? (
                  <img
                    src={resizedUrl}
                    alt="Resized"
                    className="max-w-full max-h-[400px] object-contain"
                  />
                ) : previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="max-w-full max-h-[400px] object-contain"
                  />
                ) : (
                  <div className="text-center text-muted-foreground">
                    <Image size={48} className="mx-auto mb-2 opacity-20" />
                    <p>Upload an image to see preview</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 prose prose-gray dark:prose-invert max-w-none">
          <h2>How to Resize Images Online</h2>
          <p>Our Image Resizer tool allows you to easily resize your images to specific dimensions for various purposes - social media posts, website graphics, profile pictures, or any other use case. The process is simple, secure, and completely free.</p>
          
          <h3>Simple Steps to Resize Your Images</h3>
          <ol>
            <li><strong>Upload your image</strong> - Select any image from your device in common formats like JPEG, PNG, or WebP.</li>
            <li><strong>Set dimensions</strong> - Enter your desired width and height in pixels. You'll see the original dimensions for reference.</li>
            <li><strong>Adjust quality</strong> - Use the slider to select the quality level (higher quality means larger file size).</li>
            <li><strong>Choose format</strong> - Select your preferred output format: JPEG (best for photos), PNG (best for graphics with transparency), or WebP (best overall compression).</li>
            <li><strong>Resize and download</strong> - Click "Resize Image" and then download your resized image.</li>
          </ol>
          
          <h3>Why Use Our Image Resizer?</h3>
          <ul>
            <li><strong>No registration required</strong> - Use the tool instantly without creating an account.</li>
            <li><strong>Privacy focused</strong> - Your images are processed in your browser and never uploaded to any server.</li>
            <li><strong>High quality</strong> - Advanced algorithms preserve image quality even when resizing.</li>
            <li><strong>Multiple formats</strong> - Convert between JPEG, PNG, and WebP while resizing.</li>
            <li><strong>Adjustable quality</strong> - Fine-tune the balance between image quality and file size.</li>
          </ul>
          
          <h2>Common Image Resizing Scenarios</h2>
          
          <h3>Social Media Platform Requirements</h3>
          <p>Different social media platforms require specific image dimensions for optimal display:</p>
          <ul>
            <li><strong>Instagram profile picture</strong>: 320 × 320 pixels</li>
            <li><strong>Facebook profile picture</strong>: 170 × 170 pixels</li>
            <li><strong>Twitter profile image</strong>: 400 × 400 pixels</li>
            <li><strong>LinkedIn profile photo</strong>: 400 × 400 pixels</li>
            <li><strong>YouTube channel art</strong>: 2560 × 1440 pixels</li>
          </ul>
          
          <h3>Website and Email Optimization</h3>
          <p>Properly sized images are crucial for website performance and email deliverability:</p>
          <ul>
            <li><strong>Website headers</strong>: Typically 1200-2000 pixels wide, height varies</li>
            <li><strong>Blog post featured images</strong>: 1200 × 630 pixels is common</li>
            <li><strong>Product photos</strong>: 800 × 800 pixels works well for most e-commerce sites</li>
            <li><strong>Email images</strong>: Keep under 600 pixels wide for optimal display across email clients</li>
          </ul>
          
          <h2>Understanding Image Resizing Concepts</h2>
          
          <h3>Resolution vs. File Size</h3>
          <p>When resizing images, it's important to understand the relationship between resolution (dimensions in pixels) and file size:</p>
          <ul>
            <li>Higher resolution = more detail but larger file size</li>
            <li>Lower resolution = smaller file size but less detail</li>
            <li>The quality setting affects compression level, which impacts file size without changing dimensions</li>
          </ul>
          
          <h3>Image Formats Explained</h3>
          <p>Each image format has specific characteristics that make it suitable for different purposes:</p>
          <ul>
            <li><strong>JPEG</strong>: Best for photographs and complex images with gradients. Uses lossy compression that reduces quality slightly but creates smaller files.</li>
            <li><strong>PNG</strong>: Ideal for graphics, logos, and images that require transparency. Uses lossless compression that maintains quality but results in larger files.</li>
            <li><strong>WebP</strong>: A modern format that offers both lossy and lossless compression with smaller file sizes than JPEG or PNG. Excellent choice for web use but not supported by all older software.</li>
          </ul>
          
          <h3>Aspect Ratio Considerations</h3>
          <p>When resizing images, maintaining the correct aspect ratio is often important to prevent distortion:</p>
          <ul>
            <li>Common aspect ratios include 1:1 (square), 4:3, 16:9 (widescreen), and 3:2</li>
            <li>Changing width and height independently can cause images to look stretched or squished</li>
            <li>For profile pictures and icons, square formats (1:1) are typically preferred</li>
          </ul>
          
          <h2>Tips for Perfect Image Resizing</h2>
          
          <h3>Start with High-Quality Originals</h3>
          <p>For best results, always start with the highest quality image available:</p>
          <ul>
            <li>You can reduce an image's dimensions, but you can't effectively enlarge a small image without losing quality</li>
            <li>Whenever possible, use original, uncompressed images as your starting point</li>
          </ul>
          
          <h3>Optimize for Use Case</h3>
          <p>Consider where and how your resized image will be used:</p>
          <ul>
            <li>For web use, prioritize smaller file sizes to improve page load times</li>
            <li>For printing, maintain higher resolution (at least 300 DPI) and use lossless formats</li>
            <li>For email attachments, compress more aggressively to avoid delivery issues</li>
          </ul>
          
          <h3>Batch Processing for Multiple Images</h3>
          <p>If you need to resize many images to the same dimensions:</p>
          <ul>
            <li>Process them one after another using the same settings</li>
            <li>Keep notes of your preferred settings for consistency</li>
          </ul>
          
          <h2>Troubleshooting Common Image Resizing Issues</h2>
          
          <h3>Image Appears Blurry After Resizing</h3>
          <p>If your resized image looks blurry or pixelated:</p>
          <ul>
            <li>Avoid enlarging small images beyond their original dimensions</li>
            <li>Try using a higher quality setting</li>
            <li>Consider using the PNG format which doesn't use lossy compression</li>
          </ul>
          
          <h3>File Size Too Large After Resizing</h3>
          <p>If your resized image is still too large for your needs:</p>
          <ul>
            <li>Reduce the quality setting (70-80% is often indistinguishable from 100% to the human eye)</li>
            <li>Switch to a more efficient format like WebP</li>
            <li>Consider further reducing the dimensions if appropriate for your use case</li>
          </ul>
          
          <h3>Colors Look Different After Resizing</h3>
          <p>If colors appear different in your resized image:</p>
          <ul>
            <li>Try using PNG format which preserves colors more accurately</li>
            <li>Increase the quality setting when using JPEG format</li>
            <li>Be aware that different devices and browsers may display colors slightly differently</li>
          </ul>
          
          <h2>Frequently Asked Questions</h2>
          
          <h3>Is this image resizer completely free?</h3>
          <p>Yes, our image resizer is 100% free to use with no hidden costs or watermarks added to your images.</p>
          
          <h3>Do you store the images I upload?</h3>
          <p>No, we don't store your images. All processing happens directly in your browser, and your images are never uploaded to our servers, ensuring complete privacy.</p>
          
          <h3>What is the maximum file size I can resize?</h3>
          <p>The maximum file size depends on your device's memory capabilities. Most modern browsers can handle images up to 20-30MB, but for optimal performance, we recommend keeping input files under 10MB.</p>
          
          <h3>Will resizing reduce the quality of my image?</h3>
          <p>Reducing an image's dimensions always involves some data loss, but our tool uses high-quality algorithms to maintain visual quality. You can adjust the quality setting to find the perfect balance between file size and image quality.</p>
          
          <h3>Can I resize copyrighted images?</h3>
          <p>You should only resize images that you have the rights to use or modify. Resizing copyrighted images without permission may violate copyright laws.</p>
          
          <h2>Conclusion</h2>
          <p>Image resizing is an essential skill for anyone working with digital content. Whether you're preparing images for social media, optimizing web graphics, or just organizing your photo collection, our free online Image Resizer tool makes the process quick and simple.</p>
          
          <p>With features like quality adjustment, format conversion, and instant previews, you can achieve professional results without needing expensive photo editing software. Try our Image Resizer today and experience the perfect balance of simplicity and power for all your image resizing needs.</p>
        </div>
      </div>
    </>
  );
}
