
import { useState, useRef, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import ToolHero from "@/components/tools/ToolHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { FileImage, Upload, Download, RefreshCw, Image as ImageIcon, Info, CheckCircle2, AlertCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function ImageCompressor() {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [quality, setQuality] = useState<number>(80);
  const [maxWidth, setMaxWidth] = useState<number>(1920);
  const [maxHeight, setMaxHeight] = useState<number>(1080);
  const [preserveAspectRatio, setPreserveAspectRatio] = useState<boolean>(true);
  const [targetSize, setTargetSize] = useState<number>(200);
  const [targetUnit, setTargetUnit] = useState<string>("KB");
  const [originalImageUrl, setOriginalImageUrl] = useState<string>("");
  const [compressedImageUrl, setCompressedImageUrl] = useState<string>("");
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [compressMode, setCompressMode] = useState<string>("quality");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const fileType = file.type;
      
      // Check if file is an image
      if (!fileType.startsWith("image/")) {
        toast({
          title: "Invalid File Type",
          description: "Please select an image file (JPEG, PNG, GIF, etc.).",
          variant: "destructive",
        });
        return;
      }
      
      setSelectedFile(file);
      setOriginalSize(file.size);
      
      // Create object URL for original image preview
      const objectUrl = URL.createObjectURL(file);
      setOriginalImageUrl(objectUrl);
      
      // Reset compressed image
      setCompressedImageUrl("");
      setCompressedSize(0);
      
      toast({
        title: "Image Selected",
        description: `${file.name} (${formatFileSize(file.size)})`,
      });
    }
  };

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Convert target size to bytes
  const targetSizeInBytes = (): number => {
    switch (targetUnit) {
      case "KB":
        return targetSize * 1024;
      case "MB":
        return targetSize * 1024 * 1024;
      default:
        return targetSize;
    }
  };

  // Compress image
  const compressImage = useCallback(async () => {
    if (!selectedFile) {
      toast({
        title: "No Image Selected",
        description: "Please select an image to compress.",
        variant: "destructive",
      });
      return;
    }
    
    setIsCompressing(true);
    
    try {
      // Create a new promise to handle image loading
      const loadImage = (url: string): Promise<HTMLImageElement> => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = url;
        });
      };
      
      // Load the image
      const img = await loadImage(originalImageUrl);
      
      // Calculate new dimensions based on max width/height while preserving aspect ratio if needed
      let newWidth = img.width;
      let newHeight = img.height;
      
      if (compressMode === "dimensions") {
        if (preserveAspectRatio) {
          const ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
          newWidth = Math.floor(img.width * ratio);
          newHeight = Math.floor(img.height * ratio);
        } else {
          newWidth = Math.min(img.width, maxWidth);
          newHeight = Math.min(img.height, maxHeight);
        }
      }
      
      // Create canvas with new dimensions
      const canvas = document.createElement("canvas");
      canvas.width = newWidth;
      canvas.height = newHeight;
      const ctx = canvas.getContext("2d");
      
      if (!ctx) {
        throw new Error("Could not get canvas context");
      }
      
      // Draw image on canvas
      ctx.drawImage(img, 0, 0, newWidth, newHeight);
      
      // Compress the image
      let compressionQuality = quality / 100;
      let imageBlob: Blob;
      let imageType = selectedFile.type;
      
      // For target size mode, use binary search to find optimal quality
      if (compressMode === "targetSize") {
        let minQuality = 0.01;
        let maxQuality = 1;
        let currentQuality = 0.7; // Start at 70%
        let iterations = 0;
        const maxIterations = 10;
        const targetBytes = targetSizeInBytes();
        
        while (iterations < maxIterations) {
          imageBlob = await new Promise<Blob>((resolve) => {
            canvas.toBlob(
              (blob) => resolve(blob as Blob),
              imageType,
              currentQuality
            );
          });
          
          if (Math.abs(imageBlob.size - targetBytes) < targetBytes * 0.05 || maxQuality - minQuality < 0.01) {
            // Within 5% of target or quality range is too small
            break;
          }
          
          if (imageBlob.size > targetBytes) {
            // Too large, reduce quality
            maxQuality = currentQuality;
            currentQuality = (minQuality + maxQuality) / 2;
          } else {
            // Too small, increase quality
            minQuality = currentQuality;
            currentQuality = (minQuality + maxQuality) / 2;
          }
          
          iterations++;
        }
        
        // Use final quality to set slider
        setQuality(Math.round(currentQuality * 100));
      } else {
        // For quality mode, use the selected quality
        imageBlob = await new Promise<Blob>((resolve) => {
          canvas.toBlob(
            (blob) => resolve(blob as Blob),
            imageType,
            compressionQuality
          );
        });
      }
      
      // Create object URL for compressed image preview
      const compressedObjectUrl = URL.createObjectURL(imageBlob);
      setCompressedImageUrl(compressedObjectUrl);
      setCompressedSize(imageBlob.size);
      
      toast({
        title: "Image Compressed",
        description: `Reduced from ${formatFileSize(originalSize)} to ${formatFileSize(imageBlob.size)} (${Math.round((1 - imageBlob.size / originalSize) * 100)}% reduction)`,
      });
    } catch (error) {
      console.error("Error compressing image:", error);
      toast({
        title: "Compression Failed",
        description: "There was an error compressing your image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCompressing(false);
    }
  }, [selectedFile, originalImageUrl, quality, maxWidth, maxHeight, preserveAspectRatio, targetSize, targetUnit, compressMode, originalSize, toast]);

  // Calculate compression percentage
  const compressionPercentage = (): number => {
    if (originalSize === 0 || compressedSize === 0) return 0;
    return Math.round((1 - compressedSize / originalSize) * 100);
  };

  // Download compressed image
  const downloadCompressedImage = () => {
    if (compressedImageUrl) {
      const a = document.createElement("a");
      a.href = compressedImageUrl;
      a.download = `compressed_${selectedFile?.name || "image"}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  // Reset form
  const resetForm = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setSelectedFile(null);
    setOriginalSize(0);
    setCompressedSize(0);
    setOriginalImageUrl("");
    setCompressedImageUrl("");
    setQuality(80);
    setMaxWidth(1920);
    setMaxHeight(1080);
    setPreserveAspectRatio(true);
    setTargetSize(200);
    setTargetUnit("KB");
    setCompressMode("quality");
  };

  return (
    <>
      <Helmet>
        <title>Image Compressor | Reduce Image File Size Online</title>
        <meta name="description" content="Compress and optimize your images online. Reduce file size while maintaining quality for faster websites and easier sharing. No upload limits, 100% free." />
        <meta name="keywords" content="image compressor, compress images, image optimizer, reduce image size, image compression tool, photo compressor, file size reducer" />
      </Helmet>

      <ToolHero
        title="Image Compressor"
        description="Reduce image file sizes while maintaining quality for faster websites and easier sharing."
        icon={<FileImage size={32} />}
      />

      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6 animate-fade-in">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Upload Your Image</h2>
                
                <div className="space-y-6">
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:bg-secondary/30 transition-colors" onClick={() => fileInputRef.current?.click()}>
                    <Upload size={48} className="text-muted-foreground mb-4" />
                    <p className="font-medium mb-1">Click or drag and drop to upload</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Supported formats: JPG, PNG, WEBP, GIF
                    </p>
                    {selectedFile ? (
                      <div className="w-full bg-background rounded-md p-2 flex items-center justify-between">
                        <div className="flex items-center">
                          <FileImage size={20} className="mr-2" />
                          <div className="text-sm truncate max-w-[200px]">{selectedFile.name}</div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {formatFileSize(originalSize)}
                        </div>
                      </div>
                    ) : (
                      <Button variant="secondary" size="sm">
                        Select Image
                      </Button>
                    )}
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>
                  
                  <Tabs 
                    defaultValue="quality" 
                    className="w-full"
                    value={compressMode}
                    onValueChange={setCompressMode}
                  >
                    <TabsList className="grid grid-cols-3 mb-6">
                      <TabsTrigger value="quality">Quality</TabsTrigger>
                      <TabsTrigger value="dimensions">Dimensions</TabsTrigger>
                      <TabsTrigger value="targetSize">Target Size</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="quality">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-2">
                            <Label htmlFor="quality">Quality: {quality}%</Label>
                          </div>
                          <Slider
                            id="quality"
                            min={1}
                            max={100}
                            step={1}
                            value={[quality]}
                            onValueChange={(values) => setQuality(values[0])}
                          />
                          <div className="flex justify-between text-xs text-muted-foreground mt-1">
                            <span>Smaller File Size</span>
                            <span>Higher Quality</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Info size={14} />
                          <p>
                            Lower quality = smaller file size but may introduce artifacts. 
                            80% is usually a good balance.
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="dimensions">
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="maxWidth">Max Width (px)</Label>
                            <Input
                              id="maxWidth"
                              type="number"
                              min={1}
                              max={10000}
                              value={maxWidth}
                              onChange={(e) => setMaxWidth(parseInt(e.target.value) || 1)}
                              className="mt-1"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="maxHeight">Max Height (px)</Label>
                            <Input
                              id="maxHeight"
                              type="number"
                              min={1}
                              max={10000}
                              value={maxHeight}
                              onChange={(e) => setMaxHeight(parseInt(e.target.value) || 1)}
                              className="mt-1"
                            />
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="preserveAspectRatio"
                            checked={preserveAspectRatio}
                            onChange={(e) => setPreserveAspectRatio(e.target.checked)}
                            className="rounded border-gray-300"
                          />
                          <Label htmlFor="preserveAspectRatio">Preserve aspect ratio</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Info size={14} />
                          <p>
                            Reducing dimensions significantly decreases file size while maintaining quality.
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="targetSize">
                      <div className="space-y-4">
                        <div className="flex space-x-2">
                          <div className="flex-grow">
                            <Label htmlFor="targetSize">Target Size</Label>
                            <Input
                              id="targetSize"
                              type="number"
                              min={1}
                              value={targetSize}
                              onChange={(e) => setTargetSize(parseInt(e.target.value) || 1)}
                              className="mt-1"
                            />
                          </div>
                          
                          <div className="w-24">
                            <Label htmlFor="targetUnit">Unit</Label>
                            <Select
                              value={targetUnit}
                              onValueChange={setTargetUnit}
                            >
                              <SelectTrigger id="targetUnit">
                                <SelectValue placeholder="Select unit" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="KB">KB</SelectItem>
                                <SelectItem value="MB">MB</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Info size={14} />
                          <p>
                            The compressor will try to get as close as possible to your target size
                            while maintaining maximum quality.
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                  
                  <div className="flex space-x-3">
                    <Button 
                      className="flex-grow" 
                      onClick={compressImage}
                      disabled={!selectedFile || isCompressing}
                    >
                      {isCompressing ? (
                        <>
                          <RefreshCw size={16} className="mr-2 animate-spin" />
                          Compressing...
                        </>
                      ) : (
                        "Compress Image"
                      )}
                    </Button>
                    
                    <Button variant="outline" onClick={resetForm}>
                      Reset
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6 animate-fade-in animate-delay-100">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Results</h2>
                  
                  {compressedImageUrl && (
                    <Button 
                      variant="secondary" 
                      size="sm"
                      onClick={downloadCompressedImage}
                    >
                      <Download size={16} className="mr-2" />
                      Download
                    </Button>
                  )}
                </div>
                
                {compressedImageUrl ? (
                  <div className="space-y-4">
                    <div className="bg-secondary/40 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <span className="font-medium">Size Reduction</span>
                        </div>
                        <div className="text-sm font-medium flex items-center">
                          <span className={compressionPercentage() > 50 ? "text-green-500" : "text-yellow-500"}>
                            {compressionPercentage()}% Saved
                          </span>
                          {compressionPercentage() > 50 ? (
                            <CheckCircle2 size={16} className="ml-1 text-green-500" />
                          ) : (
                            <AlertCircle size={16} className="ml-1 text-yellow-500" />
                          )}
                        </div>
                      </div>
                      
                      <Progress value={compressionPercentage()} className="h-2" />
                      
                      <div className="flex justify-between text-sm text-muted-foreground mt-2">
                        <div>Original: {formatFileSize(originalSize)}</div>
                        <div>Compressed: {formatFileSize(compressedSize)}</div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-2">Original Image</h3>
                        <div className="relative aspect-video bg-secondary/20 rounded-md overflow-hidden flex items-center justify-center">
                          {originalImageUrl ? (
                            <img 
                              src={originalImageUrl} 
                              alt="Original" 
                              className="max-w-full max-h-full object-contain" 
                            />
                          ) : (
                            <ImageIcon size={48} className="text-muted-foreground" />
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-2">Compressed Image</h3>
                        <div className="relative aspect-video bg-secondary/20 rounded-md overflow-hidden flex items-center justify-center">
                          {compressedImageUrl ? (
                            <img 
                              src={compressedImageUrl} 
                              alt="Compressed" 
                              className="max-w-full max-h-full object-contain" 
                            />
                          ) : (
                            <ImageIcon size={48} className="text-muted-foreground" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[400px] text-center text-muted-foreground">
                    <ImageIcon size={64} className="mb-4 opacity-40" />
                    <p className="font-medium">Compressed image will appear here</p>
                    <p className="text-sm max-w-md mt-2">
                      Select an image and adjust compression settings to see the result
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="mt-16 space-y-8 animate-fade-in animate-delay-200">
          <h2 className="text-3xl font-bold">Image Compression Guide</h2>
          
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <h3>What is Image Compression?</h3>
            <p>
              Image compression is the process of reducing the file size of an image while attempting to maintain its visual quality. This is done by eliminating redundant image data or by using more efficient encoding methods. The goal is to make images more manageable for storage, sharing, and website loading times without significant loss in quality.
            </p>
            
            <p>
              There are two main types of image compression:
            </p>
            
            <ul>
              <li>
                <strong>Lossless Compression</strong>: Reduces file size without losing any image quality or data. The compressed image is identical to the original when decompressed. Formats like PNG use lossless compression.
              </li>
              <li>
                <strong>Lossy Compression</strong>: Achieves greater file size reduction by permanently removing some image data. The compression algorithm makes educated decisions about which information to discard, attempting to remove details that are less noticeable to human vision. JPEG is the most common lossy format.
              </li>
            </ul>
            
            <h3>Why Compress Images?</h3>
            <p>
              There are several compelling reasons to compress your images:
            </p>
            
            <ol>
              <li>
                <strong>Faster Website Loading</strong>: Large images are often the primary reason for slow-loading websites. Compressed images load faster, improving user experience and reducing bounce rates.
              </li>
              <li>
                <strong>Improved SEO</strong>: Page speed is a ranking factor for search engines. Faster-loading pages with optimized images tend to rank higher.
              </li>
              <li>
                <strong>Reduced Storage Requirements</strong>: Compressed images take up less space on your devices, servers, and cloud storage.
              </li>
              <li>
                <strong>Lower Bandwidth Usage</strong>: Smaller images consume less bandwidth, which is particularly important for users on limited data plans or slow connections.
              </li>
              <li>
                <strong>Faster Email Sharing</strong>: Email systems often have size limits for attachments. Compressed images are easier to share via email.
              </li>
            </ol>
            
            <h3>How Our Image Compressor Works</h3>
            <p>
              Our image compression tool provides three primary approaches to reduce file size, each with its own advantages:
            </p>
            
            <h4>Quality-Based Compression</h4>
            <p>
              This method reduces file size by adjusting the image quality level. As you lower the quality percentage, more visual data is discarded, resulting in a smaller file size but potentially introducing compression artifacts (visual imperfections). The quality slider lets you find the sweet spot between file size and visual quality.
            </p>
            <p>
              For most purposes, a quality setting between 70-85% offers an excellent balance, often reducing file size by 60-80% while maintaining visually acceptable quality.
            </p>
            
            <h4>Dimension-Based Compression</h4>
            <p>
              This method reduces file size by scaling down the image dimensions. Many images are captured at resolutions far higher than needed for their intended use. For example, a 12-megapixel smartphone photo (4000×3000 pixels) is much larger than necessary for displaying on most websites.
            </p>
            <p>
              By reducing dimensions to fit their intended use case (e.g., 1200×900 for web display), you can dramatically decrease file size while maintaining apparent quality when viewed at normal sizes.
            </p>
            
            <h4>Target Size Compression</h4>
            <p>
              This intelligent approach automatically finds the optimal balance between quality and dimensions to reach your specified file size target. It's particularly useful when you have strict file size requirements, such as email attachment limits or platform upload restrictions.
            </p>
            <p>
              The algorithm intelligently adjusts compression parameters to get as close as possible to your target size while preserving maximum quality.
            </p>
            
            <h3>Best Practices for Image Compression</h3>
            <p>
              Follow these guidelines to get the best results when compressing images:
            </p>
            
            <h4>Choose the Right Compression Method</h4>
            <ul>
              <li><strong>For Photos and Complex Images</strong>: Quality-based compression usually works best, as photos can withstand some quality reduction without obvious degradation.</li>
              <li><strong>For Graphics, Screenshots, and Text</strong>: Dimension-based compression often works better, as these images may show noticeable artifacts with quality reduction.</li>
              <li><strong>For Specific Requirements</strong>: Target size compression is ideal when you have strict file size limits.</li>
            </ul>
            
            <h4>Understand Your Use Case</h4>
            <ul>
              <li><strong>Web/Social Media</strong>: Aim for files under 200KB for optimal loading. Quality settings around 70-80% are usually sufficient.</li>
              <li><strong>Email</strong>: Keep attachments under 5MB total, ideally under 1MB per image.</li>
              <li><strong>Print</strong>: Use higher quality settings (90%+) and maintain original dimensions if the image will be printed.</li>
              <li><strong>Archiving</strong>: Consider using lossless compression or minimal lossy compression to preserve details.</li>
            </ul>
            
            <h4>Consider the Image Content</h4>
            <ul>
              <li><strong>Photos with Fine Details</strong> (landscapes, textures): Require higher quality settings to preserve details.</li>
              <li><strong>Photos with Smooth Areas</strong> (sky, simple backgrounds): Can withstand more aggressive compression.</li>
              <li><strong>Graphics/Illustrations</strong>: Often compress better with dimension reduction rather than quality reduction.</li>
              <li><strong>Text in Images</strong>: Text can become blurry or illegible with too much lossy compression.</li>
            </ul>
            
            <h4>Test Before Finalizing</h4>
            <p>
              Always check your compressed image at its intended viewing size and context before finalizing. What looks acceptable on your screen might appear differently on other devices or when printed. Our tool provides side-by-side comparison to help with this assessment.
            </p>
            
            <h3>Image Formats and Compression</h3>
            <p>
              Different image formats handle compression differently:
            </p>
            
            <h4>JPEG (JPG)</h4>
            <p>
              JPEG is the most common format for photos and complex images. It uses lossy compression that works well for photographs but can cause noticeable quality loss with text or sharp edges. Our compressor works particularly well with JPEG files.
            </p>
            
            <h4>PNG</h4>
            <p>
              PNG uses lossless compression by default, which preserves quality but results in larger file sizes than JPEG for photos. PNG is ideal for images with transparency or sharp contrast (like logos, icons, and screenshots). Our compressor can apply quality and dimension reduction to PNG files.
            </p>
            
            <h4>WebP</h4>
            <p>
              WebP is a modern format that offers both lossy and lossless compression with significantly smaller file sizes than JPEG or PNG. It's increasingly supported by browsers and platforms. Our tool maintains WebP format when compressing these images.
            </p>
            
            <h4>GIF</h4>
            <p>
              GIF uses lossless compression but is limited to 256 colors. It's best for simple animations and images with limited colors. Our compressor can reduce GIF dimensions while maintaining animation functionality.
            </p>
            
            <h3>Image Compression for Specific Purposes</h3>
            
            <h4>Website Optimization</h4>
            <p>
              For websites, image optimization is crucial for performance:
            </p>
            <ul>
              <li><strong>Hero Images/Banners</strong>: Typically 1500-2000px wide, compressed to 150-300KB</li>
              <li><strong>Content Images</strong>: Usually 800-1200px wide, compressed to 50-150KB</li>
              <li><strong>Thumbnails</strong>: 150-300px, compressed to under 30KB</li>
              <li><strong>Consider Serving Multiple Sizes</strong>: Using HTML's srcset attribute to serve different image sizes based on device size</li>
            </ul>
            
            <h4>E-commerce Photography</h4>
            <p>
              Product images need to balance quality with loading speed:
            </p>
            <ul>
              <li><strong>Main Product Images</strong>: 1000-1500px, compressed to 100-200KB</li>
              <li><strong>Gallery/Additional Views</strong>: 800-1200px, compressed to 80-150KB</li>
              <li><strong>Thumbnails</strong>: 200-300px, compressed to 20-40KB</li>
            </ul>
            
            <h4>Social Media</h4>
            <p>
              Each platform has its own optimal sizes and compression recommendations:
            </p>
            <ul>
              <li><strong>Instagram</strong>: 1080×1080px (square), 1080×1350px (portrait), or 1080×608px (landscape), ideally under 1MB</li>
              <li><strong>Facebook</strong>: 1200×630px for shared links, 1200×1200px for posts, under 1MB</li>
              <li><strong>Twitter</strong>: 1200×675px for timeline images, under 5MB</li>
              <li><strong>LinkedIn</strong>: 1200×627px for shared links, under 5MB</li>
            </ul>
            
            <h4>Email Marketing</h4>
            <p>
              Email images should be optimized for quick loading and limited data usage:
            </p>
            <ul>
              <li><strong>Header Images</strong>: 600-650px wide, under 200KB</li>
              <li><strong>Content Images</strong>: 600px or less, under 100KB</li>
              <li><strong>Total Email Size</strong>: Keep under 1MB total including all images</li>
            </ul>
            
            <h3>Advanced Compression Techniques</h3>
            
            <h4>Batch Processing</h4>
            <p>
              For large collections of images, establish consistent compression settings based on image type and intended use. Process images in batches using the same parameters for consistency.
            </p>
            
            <h4>Progressive Loading</h4>
            <p>
              JPEG images can be saved in a "progressive" format, which loads in increasing detail. This gives users a preview while the full image loads, improving perceived performance.
            </p>
            
            <h4>Responsive Images</h4>
            <p>
              Create multiple versions of each image at different sizes for different devices. Modern web development uses HTML features like srcset and sizes attributes to serve the appropriate image size based on the user's device.
            </p>
            
            <h4>Image CDNs</h4>
            <p>
              For websites with many images, consider using an image CDN (Content Delivery Network) that automatically optimizes and delivers images based on device type, screen size, and connection speed.
            </p>
            
            <h3>Common Compression Mistakes to Avoid</h3>
            
            <ul>
              <li><strong>Over-Compression</strong>: Reducing quality too much can create noticeable artifacts that detract from the image.</li>
              <li><strong>Repeated Compression</strong>: Re-compressing an already compressed JPEG introduces additional quality loss. Always start with the highest quality version available.</li>
              <li><strong>Wrong Format Choice</strong>: Using JPEG for images with text or sharp lines, or using PNG for photographs.</li>
              <li><strong>Ignoring Image Dimensions</strong>: Uploading images at much higher resolutions than needed, which wastes bandwidth even after compression.</li>
              <li><strong>One-Size-Fits-All Approach</strong>: Using the same compression settings for all images regardless of content or purpose.</li>
            </ul>
            
            <h3>Conclusion</h3>
            <p>
              Image compression is an essential skill in today's digital world, where visual content is abundant but bandwidth and storage remain finite resources. By understanding the principles of compression and using our tool effectively, you can significantly reduce file sizes while maintaining acceptable visual quality.
            </p>
            <p>
              Remember that image compression is about finding the right balance for each specific use case. The best compression approach preserves the important details while eliminating unnecessary data, resulting in efficient file sizes without compromising the viewer's experience.
            </p>
            <p>
              Our image compressor tool gives you the flexibility to find that perfect balance, whether you're optimizing images for a fast-loading website, sharing photos via email, or preparing graphics for social media.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
