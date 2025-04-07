
import { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import ToolHero from "@/components/tools/ToolHero";
import { Image, ArrowDown, FileImage, Download, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ImageResizer() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [originalDimensions, setOriginalDimensions] = useState<{ width: number; height: number } | null>(null);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState<boolean>(true);
  const [resizedImageUrl, setResizedImageUrl] = useState<string | null>(null);
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const [outputFormat, setOutputFormat] = useState<string>("jpeg");
  const [qualityValue, setQualityValue] = useState<number>(90);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.match('image.*')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file (JPEG, PNG, etc.)",
        variant: "destructive",
      });
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreviewUrl(result);
      setResizedImageUrl(null);
      
      // Get original image dimensions
      const img = new Image();
      img.onload = () => {
        setOriginalDimensions({
          width: img.width,
          height: img.height
        });
        setWidth(img.width);
        setHeight(img.height);
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
    setSelectedFile(file);
  };
  
  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWidth = parseInt(e.target.value) || 0;
    setWidth(newWidth);
    
    if (maintainAspectRatio && originalDimensions) {
      const aspectRatio = originalDimensions.width / originalDimensions.height;
      setHeight(Math.round(newWidth / aspectRatio));
    }
  };
  
  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHeight = parseInt(e.target.value) || 0;
    setHeight(newHeight);
    
    if (maintainAspectRatio && originalDimensions) {
      const aspectRatio = originalDimensions.width / originalDimensions.height;
      setWidth(Math.round(newHeight * aspectRatio));
    }
  };
  
  const handleAspectRatioToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaintainAspectRatio(e.target.checked);
  };
  
  const handleResize = () => {
    if (!selectedFile || !previewUrl || !width || !height) {
      toast({
        title: "Missing information",
        description: "Please select an image and set both width and height",
        variant: "destructive",
      });
      return;
    }
    
    setIsResizing(true);
    
    // Create a canvas element to resize the image
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      toast({
        title: "Error",
        description: "Could not initialize canvas context",
        variant: "destructive",
      });
      setIsResizing(false);
      return;
    }
    
    const img = new Image();
    img.onload = () => {
      // Draw the image on the canvas with the new dimensions
      ctx.drawImage(img, 0, 0, width, height);
      
      // Convert the canvas to a data URL
      let mimeType = 'image/jpeg';
      let quality = qualityValue / 100;
      
      switch (outputFormat) {
        case 'png':
          mimeType = 'image/png';
          // PNG doesn't use quality parameter
          quality = undefined as any;
          break;
        case 'webp':
          mimeType = 'image/webp';
          break;
        case 'jpeg':
        default:
          mimeType = 'image/jpeg';
          break;
      }
      
      const dataUrl = canvas.toDataURL(mimeType, quality);
      setResizedImageUrl(dataUrl);
      setIsResizing(false);
      
      toast({
        title: "Image resized successfully",
        description: `Resized to ${width}×${height} pixels`,
      });
    };
    
    img.onerror = () => {
      toast({
        title: "Error",
        description: "Failed to load the image for resizing",
        variant: "destructive",
      });
      setIsResizing(false);
    };
    
    img.src = previewUrl;
  };
  
  const handleDownload = () => {
    if (!resizedImageUrl) return;
    
    // Create a temporary anchor element to download the image
    const a = document.createElement('a');
    a.href = resizedImageUrl;
    a.download = `resized_${selectedFile?.name.split('.')[0] || 'image'}.${outputFormat}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  
  const handleClearImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setResizedImageUrl(null);
    setOriginalDimensions(null);
    setWidth(0);
    setHeight(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <Helmet>
        <title>Image Resizer - Resize Images to Exact Dimensions Online | Zyfoox</title>
        <meta 
          name="description" 
          content="Resize images to exact dimensions while maintaining quality. Perfect for social media, websites, and print with support for JPEG, PNG, and WebP formats." 
        />
        <meta 
          name="keywords" 
          content="image resizer, resize images online, image size changer, picture resizer, photo resizer tool, resize jpg, resize png, webp converter" 
        />
        <link rel="canonical" href="https://zyfoox.com/tools/image-resizer" />
      </Helmet>

      <ToolHero
        title="Image Resizer"
        description="Resize images to exact dimensions while maintaining quality. Perfect for social media and websites."
        icon={<Image size={24} />}
      />

      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="animate-fade-in">
            <div className="glass-card rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Upload & Resize</h2>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Upload Image
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label 
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-card/50 hover:bg-card/70 transition-colors border-border"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FileImage className="w-8 h-8 mb-3 text-primary" />
                        <p className="mb-2 text-sm text-foreground">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">
                          JPEG, PNG, WebP, GIF, etc.
                        </p>
                      </div>
                      <input 
                        ref={fileInputRef}
                        type="file" 
                        className="hidden" 
                        accept="image/*" 
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                </div>
                
                {previewUrl && (
                  <div className="relative">
                    <div className="aspect-video bg-card/50 rounded-lg overflow-hidden flex items-center justify-center">
                      <img 
                        src={previewUrl} 
                        alt="Preview" 
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <button
                      onClick={handleClearImage}
                      className="absolute top-2 right-2 bg-background/80 hover:bg-background p-1 rounded-full"
                    >
                      <X size={16} />
                    </button>
                    {originalDimensions && (
                      <div className="mt-2 text-sm text-muted-foreground text-center">
                        Original size: {originalDimensions.width} × {originalDimensions.height} pixels
                      </div>
                    )}
                  </div>
                )}
                
                {originalDimensions && (
                  <>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id="aspect-ratio"
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                          checked={maintainAspectRatio}
                          onChange={handleAspectRatioToggle}
                        />
                        <label htmlFor="aspect-ratio" className="text-sm">
                          Maintain aspect ratio
                        </label>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="width" className="block text-sm font-medium">
                            Width (pixels)
                          </label>
                          <input
                            type="number"
                            id="width"
                            className="glass-input w-full px-3 py-2 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none"
                            value={width}
                            onChange={handleWidthChange}
                            min="1"
                            max="10000"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="height" className="block text-sm font-medium">
                            Height (pixels)
                          </label>
                          <input
                            type="number"
                            id="height"
                            className="glass-input w-full px-3 py-2 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none"
                            value={height}
                            onChange={handleHeightChange}
                            min="1"
                            max="10000"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="format" className="block text-sm font-medium">
                            Output Format
                          </label>
                          <select
                            id="format"
                            className="glass-input w-full px-3 py-2 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none"
                            value={outputFormat}
                            onChange={(e) => setOutputFormat(e.target.value)}
                          >
                            <option value="jpeg">JPEG</option>
                            <option value="png">PNG</option>
                            <option value="webp">WebP</option>
                          </select>
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="quality" className="block text-sm font-medium">
                            Quality: {qualityValue}%
                          </label>
                          <input
                            type="range"
                            id="quality"
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                            min="10"
                            max="100"
                            step="1"
                            value={qualityValue}
                            onChange={(e) => setQualityValue(parseInt(e.target.value))}
                          />
                        </div>
                      </div>
                      
                      <button
                        onClick={handleResize}
                        disabled={isResizing}
                        className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-70 flex items-center justify-center"
                      >
                        {isResizing ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Resizing...
                          </>
                        ) : (
                          <>
                            <ArrowDown size={16} className="mr-2" />
                            Resize Image
                          </>
                        )}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <div className="animate-fade-in animate-delay-100">
            <div className="glass-card rounded-xl p-6 h-full flex flex-col">
              <h2 className="text-xl font-semibold mb-4">Resized Image</h2>
              
              {resizedImageUrl ? (
                <div className="flex flex-col flex-grow">
                  <div className="bg-card/50 rounded-lg overflow-hidden flex-grow flex items-center justify-center p-2">
                    <img 
                      src={resizedImageUrl} 
                      alt="Resized" 
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                      New size: {width} × {height} pixels
                    </div>
                    <button
                      onClick={handleDownload}
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center"
                    >
                      <Download size={16} className="mr-2" />
                      Download
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex-grow flex flex-col items-center justify-center text-center text-muted-foreground p-8">
                  <Image size={48} className="mb-4 opacity-20" />
                  <h3 className="text-lg font-medium mb-2">No Resized Image Yet</h3>
                  <p>Upload an image and adjust the dimensions, then click "Resize Image" to see the result here.</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-12 prose prose-gray dark:prose-invert max-w-none">
          <h2>How to Use the Image Resizer</h2>
          <p>Our Image Resizer is a powerful tool that allows you to precisely adjust the dimensions of your images while maintaining optimal quality. Whether you're preparing images for a website, social media, or print materials, this tool helps you achieve the exact size specifications you need without complicated software.</p>
          
          <h3>Simple Steps to Resize Your Images</h3>
          <ol>
            <li><strong>Upload your image</strong>: Click the upload area or drag and drop an image file (JPEG, PNG, WebP, GIF, etc.).</li>
            <li><strong>Adjust dimensions</strong>: Enter your desired width and height in pixels. Toggle the "Maintain aspect ratio" option to prevent image distortion.</li>
            <li><strong>Select output format and quality</strong>: Choose your preferred image format (JPEG, PNG, or WebP) and adjust the quality slider as needed.</li>
            <li><strong>Click "Resize Image"</strong>: Process your image with the new dimensions and settings.</li>
            <li><strong>Download the result</strong>: Once resizing is complete, preview the result and download your resized image.</li>
          </ol>
          
          <h3>Image Format Options</h3>
          <p>Choose the most appropriate format for your needs:</p>
          <ul>
            <li><strong>JPEG</strong>: Best for photographs and complex images with many colors. Supports adjustable compression for balancing quality and file size.</li>
            <li><strong>PNG</strong>: Ideal for images that require transparency or have text, lines, and sharp edges. Provides lossless compression but typically results in larger file sizes.</li>
            <li><strong>WebP</strong>: Modern format that offers superior compression and quality characteristics. Supports both lossy and lossless compression, as well as transparency. Ideal for web use but may not be supported by all platforms.</li>
          </ul>
          
          <h2>Common Image Resizing Scenarios</h2>
          <p>Our Image Resizer is versatile enough to handle a wide range of use cases:</p>
          
          <h3>Social Media Images</h3>
          <p>Each social media platform has specific size requirements for optimal display. Resize your images to these exact dimensions to ensure they look their best:</p>
          <ul>
            <li><strong>Facebook Profile Picture</strong>: 170 × 170 pixels</li>
            <li><strong>Facebook Cover Photo</strong>: 851 × 315 pixels</li>
            <li><strong>Instagram Post</strong>: 1080 × 1080 pixels (square), 1080 × 1350 pixels (portrait), 1080 × 566 pixels (landscape)</li>
            <li><strong>Twitter Profile Picture</strong>: 400 × 400 pixels</li>
            <li><strong>Twitter Header</strong>: 1500 × 500 pixels</li>
            <li><strong>LinkedIn Profile Picture</strong>: 400 × 400 pixels</li>
            <li><strong>LinkedIn Cover Photo</strong>: 1584 × 396 pixels</li>
            <li><strong>YouTube Thumbnail</strong>: 1280 × 720 pixels</li>
          </ul>
          
          <h3>Website Images</h3>
          <p>Optimize images for your website to ensure fast loading times and proper display:</p>
          <ul>
            <li><strong>Hero/Banner Images</strong>: Typically 1200-2000 pixels wide, with height depending on your design</li>
            <li><strong>Product Images</strong>: Usually square (800 × 800 or 1000 × 1000 pixels) for consistency</li>
            <li><strong>Blog Featured Images</strong>: Often 1200 × 630 pixels to work well with social sharing</li>
            <li><strong>Thumbnails</strong>: Commonly 150-300 pixels in width and height</li>
          </ul>
          
          <h3>Print Materials</h3>
          <p>For print purposes, images require higher resolution:</p>
          <ul>
            <li><strong>Standard Photo Print</strong>: 1800 × 1200 pixels (6" × 4" at 300 DPI)</li>
            <li><strong>Business Card</strong>: 1050 × 600 pixels (3.5" × 2" at 300 DPI)</li>
            <li><strong>Letter/A4 Document</strong>: 2550 × 3300 pixels (8.5" × 11" at 300 DPI)</li>
          </ul>
          
          <h2>Benefits of Proper Image Resizing</h2>
          <p>Taking the time to resize your images correctly offers numerous advantages:</p>
          
          <h3>Improved Website Performance</h3>
          <p>Properly sized images load faster, reducing bounce rates and improving user experience. This can also positively impact your SEO rankings, as page speed is a significant ranking factor for search engines.</p>
          
          <h3>Optimal Social Media Presence</h3>
          <p>Images that match platform specifications display correctly without awkward cropping or distortion, ensuring your visual content makes the intended impact on your audience.</p>
          
          <h3>Reduced Storage Requirements</h3>
          <p>Resizing images to appropriate dimensions can significantly reduce file sizes, saving valuable storage space on your devices and in cloud services.</p>
          
          <h3>Professional Appearance</h3>
          <p>Properly sized images give your website, presentations, and documents a polished, professional look that enhances your brand image and credibility.</p>
          
          <h3>Consistent Visual Experience</h3>
          <p>Using standardized image dimensions across your content creates a cohesive visual experience for your audience, reinforcing your brand identity.</p>
          
          <h2>Advanced Image Resizing Tips</h2>
          <p>For the best results when resizing your images, consider these professional tips:</p>
          
          <h3>Understanding Aspect Ratio</h3>
          <p>The aspect ratio is the proportional relationship between an image's width and height. Maintaining this ratio prevents distortion. When you check "Maintain aspect ratio" in our tool, changing one dimension automatically adjusts the other to preserve the original proportions.</p>
          
          <h3>Upscaling vs. Downscaling</h3>
          <p>Downscaling (making images smaller) generally produces good results with minimal quality loss. Upscaling (making images larger) can introduce pixelation or blurriness since the tool must create new pixel information. For best results, start with the highest resolution source image available.</p>
          
          <h3>Balancing Quality and File Size</h3>
          <p>The quality slider allows you to find the optimal balance between visual quality and file size. For JPEG and WebP formats, higher quality settings preserve more detail but result in larger files. Experiment with different settings to find the best compromise for your specific use case.</p>
          
          <h3>Choosing the Right Format</h3>
          <p>Beyond the basic format descriptions above, consider these additional factors:</p>
          <ul>
            <li>Use PNG for images with text, logos, or graphics with limited colors</li>
            <li>Use JPEG for photographs and complex imagery where some quality loss is acceptable</li>
            <li>Use WebP for web applications where you need the best combination of quality and compression</li>
          </ul>
          
          <h3>Batch Processing Workflow</h3>
          <p>If you need to resize multiple images to the same dimensions, establish a workflow: resize one image, download it, then upload the next image without changing your settings. This ensures consistency across all your processed images.</p>
          
          <h2>Privacy and Security</h2>
          <p>Our Image Resizer processes all images directly in your browser, meaning:</p>
          <ul>
            <li>Your images are never uploaded to our servers</li>
            <li>No one else can access your original or resized images</li>
            <li>You maintain complete privacy and control over your content</li>
            <li>The tool works even when you're offline once the page has loaded</li>
          </ul>
          
          <h2>Browser Compatibility</h2>
          <p>Our Image Resizer is designed to work with all modern browsers:</p>
          <ul>
            <li>Google Chrome</li>
            <li>Mozilla Firefox</li>
            <li>Safari</li>
            <li>Microsoft Edge</li>
            <li>Opera</li>
          </ul>
          <p>For the best experience, we recommend keeping your browser updated to the latest version.</p>
          
          <h2>Conclusion</h2>
          <p>Our Image Resizer provides a simple yet powerful solution for adjusting image dimensions to meet your specific needs. Whether you're optimizing images for websites, social media, or print, this tool offers the precision and flexibility required for professional results without complex software or technical expertise.</p>
          
          <p>By following the steps and tips outlined above, you can ensure your images are perfectly sized for their intended purpose while maintaining optimal quality and reasonable file sizes. Start resizing your images today and experience the difference properly sized images can make in your digital and print content.</p>
        </div>
      </div>
    </>
  );
}
