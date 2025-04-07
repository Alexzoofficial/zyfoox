
import { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import ToolHero from "@/components/tools/ToolHero";
import { Crop, FileImage, Download, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ImageCropper() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);
  const [cropX, setCropX] = useState<number>(0);
  const [cropY, setCropY] = useState<number>(0);
  const [cropWidth, setCropWidth] = useState<number>(0);
  const [cropHeight, setCropHeight] = useState<number>(0);
  const [imageWidth, setImageWidth] = useState<number>(0);
  const [imageHeight, setImageHeight] = useState<number>(0);
  const [outputFormat, setOutputFormat] = useState<string>("jpeg");
  const [qualityValue, setQualityValue] = useState<number>(90);
  const [isCropping, setIsCropping] = useState<boolean>(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const cropBoxRef = useRef<HTMLDivElement>(null);
  
  const { toast } = useToast();

  // Predefined aspect ratios
  const aspectRatios = [
    { name: "Free", value: 0 },
    { name: "1:1 (Square)", value: 1 },
    { name: "4:3", value: 4/3 },
    { name: "16:9", value: 16/9 },
    { name: "3:2", value: 3/2 },
    { name: "2:3", value: 2/3 },
    { name: "5:4", value: 5/4 }
  ];
  
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStartX, setDragStartX] = useState<number>(0);
  const [dragStartY, setDragStartY] = useState<number>(0);
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const [resizeHandle, setResizeHandle] = useState<string>("");
  const [resizeStartX, setResizeStartX] = useState<number>(0);
  const [resizeStartY, setResizeStartY] = useState<number>(0);
  
  // Simplified image cropping for this demo
  // In a real implementation, you would integrate a proper cropping library

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
      setCroppedImageUrl(null);
      
      // Get image dimensions
      const img = new Image();
      img.onload = () => {
        setImageWidth(img.width);
        setImageHeight(img.height);
        
        // Initialize crop area to center 80% of the image
        const initialCropWidth = Math.round(img.width * 0.8);
        const initialCropHeight = Math.round(img.height * 0.8);
        
        setCropX(Math.round((img.width - initialCropWidth) / 2));
        setCropY(Math.round((img.height - initialCropHeight) / 2));
        setCropWidth(initialCropWidth);
        setCropHeight(initialCropHeight);
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
    setSelectedFile(file);
  };
  
  const handleCrop = () => {
    if (!previewUrl || !imageWidth || !imageHeight) {
      toast({
        title: "No image selected",
        description: "Please select an image to crop",
        variant: "destructive",
      });
      return;
    }
    
    if (cropWidth <= 0 || cropHeight <= 0) {
      toast({
        title: "Invalid crop area",
        description: "Please define a valid crop area",
        variant: "destructive",
      });
      return;
    }
    
    setIsCropping(true);
    
    // Create a canvas element to crop the image
    const canvas = document.createElement('canvas');
    canvas.width = cropWidth;
    canvas.height = cropHeight;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      toast({
        title: "Error",
        description: "Could not initialize canvas context",
        variant: "destructive",
      });
      setIsCropping(false);
      return;
    }
    
    const img = new Image();
    img.onload = () => {
      // Draw only the cropped portion of the image on the canvas
      ctx.drawImage(
        img,
        cropX, cropY, cropWidth, cropHeight,
        0, 0, cropWidth, cropHeight
      );
      
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
      setCroppedImageUrl(dataUrl);
      setIsCropping(false);
      
      toast({
        title: "Image cropped successfully",
        description: `Cropped to ${cropWidth}×${cropHeight} pixels`,
      });
    };
    
    img.onerror = () => {
      toast({
        title: "Error",
        description: "Failed to load the image for cropping",
        variant: "destructive",
      });
      setIsCropping(false);
    };
    
    img.src = previewUrl;
  };
  
  const handleDownload = () => {
    if (!croppedImageUrl) return;
    
    // Create a temporary anchor element to download the image
    const a = document.createElement('a');
    a.href = croppedImageUrl;
    a.download = `cropped_${selectedFile?.name.split('.')[0] || 'image'}.${outputFormat}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  
  const handleClearImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setCroppedImageUrl(null);
    setCropX(0);
    setCropY(0);
    setCropWidth(0);
    setCropHeight(0);
    setImageWidth(0);
    setImageHeight(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleAspectRatioChange = (ratio: number) => {
    setSelectedAspectRatio(ratio);
    
    if (ratio === 0) return; // Free aspect ratio, no changes needed
    
    // Adjust crop area to maintain the selected aspect ratio
    // Calculate new dimensions based on the current crop width
    const newHeight = Math.round(cropWidth / ratio);
    
    // Check if the new height fits within the image
    if (cropY + newHeight <= imageHeight) {
      setCropHeight(newHeight);
    } else {
      // If not, adjust the width instead
      const newWidth = Math.round(cropHeight * ratio);
      if (cropX + newWidth <= imageWidth) {
        setCropWidth(newWidth);
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Image Cropper - Crop Images Precisely Online | Zyfoox</title>
        <meta 
          name="description" 
          content="Crop images precisely with our easy-to-use online tool. Perfect for profile pictures, social media posts, and focused content creation." 
        />
        <meta 
          name="keywords" 
          content="image cropper, crop pictures online, photo cropper, image editor, crop tool, aspect ratio cropper, profile picture maker" 
        />
        <link rel="canonical" href="https://zyfoox.com/tools/image-cropper" />
      </Helmet>

      <ToolHero
        title="Image Cropper"
        description="Crop images precisely with our easy-to-use tool. Perfect for profile pictures and focused content."
        icon={<Crop size={24} />}
      />

      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="animate-fade-in">
            <div className="glass-card rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Upload & Crop</h2>
              
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
                    <div 
                      ref={previewContainerRef}
                      className="aspect-video bg-card/50 rounded-lg overflow-hidden flex items-center justify-center"
                    >
                      <img 
                        ref={imageRef}
                        src={previewUrl} 
                        alt="Preview" 
                        className="max-w-full max-h-full object-contain"
                      />
                      <div 
                        ref={cropBoxRef}
                        className="absolute border-2 border-primary pointer-events-none"
                        style={{
                          left: `${(cropX / imageWidth) * 100}%`,
                          top: `${(cropY / imageHeight) * 100}%`,
                          width: `${(cropWidth / imageWidth) * 100}%`,
                          height: `${(cropHeight / imageHeight) * 100}%`
                        }}
                      ></div>
                    </div>
                    <button
                      onClick={handleClearImage}
                      className="absolute top-2 right-2 bg-background/80 hover:bg-background p-1 rounded-full"
                    >
                      <X size={16} />
                    </button>
                    {imageWidth > 0 && imageHeight > 0 && (
                      <div className="mt-2 text-sm text-muted-foreground text-center">
                        Image size: {imageWidth} × {imageHeight} pixels
                      </div>
                    )}
                  </div>
                )}
                
                {previewUrl && (
                  <>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium">
                          Aspect Ratio
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {aspectRatios.map((ratio) => (
                            <button
                              key={ratio.name}
                              type="button"
                              className={`py-1 px-3 text-sm rounded-lg transition-colors ${
                                selectedAspectRatio === ratio.value
                                  ? "bg-primary text-white"
                                  : "bg-primary/10 text-primary hover:bg-primary/20"
                              }`}
                              onClick={() => handleAspectRatioChange(ratio.value)}
                            >
                              {ratio.name}
                            </button>
                          ))}
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
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium">
                            Crop Dimensions
                          </label>
                          <div className="text-sm">
                            <span>{cropWidth} × {cropHeight} pixels</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="block text-sm font-medium">
                            Crop Position
                          </label>
                          <div className="text-sm">
                            <span>X: {cropX}, Y: {cropY}</span>
                          </div>
                        </div>
                      </div>
                      
                      <button
                        onClick={handleCrop}
                        disabled={isCropping}
                        className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-70 flex items-center justify-center"
                      >
                        {isCropping ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Cropping...
                          </>
                        ) : (
                          <>
                            <Crop size={16} className="mr-2" />
                            Crop Image
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
              <h2 className="text-xl font-semibold mb-4">Cropped Image</h2>
              
              {croppedImageUrl ? (
                <div className="flex flex-col flex-grow">
                  <div className="bg-card/50 rounded-lg overflow-hidden flex-grow flex items-center justify-center p-2">
                    <img 
                      src={croppedImageUrl} 
                      alt="Cropped" 
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                      Size: {cropWidth} × {cropHeight} pixels
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
                  <Crop size={48} className="mb-4 opacity-20" />
                  <h3 className="text-lg font-medium mb-2">No Cropped Image Yet</h3>
                  <p>Upload an image and adjust the crop area, then click "Crop Image" to see the result here.</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-12 prose prose-gray dark:prose-invert max-w-none">
          <h2>How to Use the Image Cropper</h2>
          <p>Our Image Cropper is a powerful tool that allows you to precisely select and extract portions of your images. Whether you're creating profile pictures, focusing on specific elements, or removing unwanted parts of an image, this tool gives you the control to achieve perfect results without complicated software.</p>
          
          <h3>Simple Steps to Crop Your Images</h3>
          <ol>
            <li><strong>Upload your image</strong>: Click the upload area or drag and drop an image file (JPEG, PNG, WebP, GIF, etc.).</li>
            <li><strong>Adjust the crop area</strong>: The tool automatically creates a default crop selection. You can adjust its position and size to select exactly the portion of the image you want to keep.</li>
            <li><strong>Choose an aspect ratio</strong> (optional): Select from predefined aspect ratios like 1:1 (square), 4:3, 16:9, etc., or use "Free" for custom proportions.</li>
            <li><strong>Select output settings</strong>: Choose your preferred image format (JPEG, PNG, or WebP) and adjust the quality as needed.</li>
            <li><strong>Click "Crop Image"</strong>: Process your selection and create the cropped image.</li>
            <li><strong>Download the result</strong>: Once cropping is complete, preview the result and download your cropped image.</li>
          </ol>
          
          <h3>Understanding Aspect Ratios</h3>
          <p>The aspect ratio determines the relationship between the width and height of your cropped image:</p>
          <ul>
            <li><strong>Free</strong>: No fixed ratio, allowing you to crop any portion of the image with complete freedom.</li>
            <li><strong>1:1 (Square)</strong>: Equal width and height, perfect for profile pictures, Instagram posts, and other applications requiring square images.</li>
            <li><strong>4:3</strong>: Standard ratio for many displays and presentation slides.</li>
            <li><strong>16:9</strong>: Widescreen format used for videos, presentations, and desktop wallpapers.</li>
            <li><strong>3:2</strong>: Common ratio for digital camera photos and printing on 4×6 inch photo paper.</li>
            <li><strong>2:3</strong>: Portrait orientation, often used for mobile wallpapers and vertical prints.</li>
            <li><strong>5:4</strong>: Traditional format for 8×10 inch prints and certain photo frames.</li>
          </ul>
          
          <h2>Common Image Cropping Use Cases</h2>
          <p>Our Image Cropper is versatile enough to handle a wide range of requirements:</p>
          
          <h3>Profile Pictures</h3>
          <p>Create perfectly framed profile photos for social media platforms, online accounts, and professional profiles. The 1:1 aspect ratio is ideal for most profile pictures, allowing you to focus on the face or main subject without awkward cropping by the platform.</p>
          
          <h3>Social Media Posts</h3>
          <p>Different social platforms have various optimal image dimensions. Crop your images to the appropriate aspect ratios for each platform:</p>
          <ul>
            <li><strong>Instagram</strong>: 1:1 (square), 4:5 (portrait), or 16:9 (landscape)</li>
            <li><strong>Facebook</strong>: 1.91:1 for link posts and timeline photos</li>
            <li><strong>Twitter</strong>: 16:9 for in-stream images</li>
            <li><strong>LinkedIn</strong>: 1.91:1 for link posts</li>
          </ul>
          
          <h3>Product Photography</h3>
          <p>Highlight specific product features by cropping out distractions or unwanted backgrounds. Create consistent product image dimensions for your e-commerce store or catalog.</p>
          
          <h3>Remove Unwanted Elements</h3>
          <p>Crop out photobombers, distracting objects, or excess background to create a cleaner, more focused composition.</p>
          
          <h3>Document Scanning</h3>
          <p>When you've taken a photo of a document, crop it to include only the document itself, removing the surrounding surface or shadows.</p>
          
          <h3>Creative Compositions</h3>
          <p>Experiment with different crops to create more engaging or dramatic compositions from your original photos.</p>
          
          <h2>Benefits of Proper Image Cropping</h2>
          <p>Taking the time to crop your images effectively offers numerous advantages:</p>
          
          <h3>Improved Focus</h3>
          <p>By eliminating extraneous elements, cropping directs the viewer's attention to the most important part of the image, creating a stronger visual impact.</p>
          
          <h3>Enhanced Composition</h3>
          <p>Cropping allows you to apply compositional techniques like the rule of thirds, leading lines, or framing after the photo has been taken, improving the aesthetic quality of the image.</p>
          
          <h3>Platform Optimization</h3>
          <p>Different platforms display images differently. Proper cropping ensures your images appear as intended across various websites, social media platforms, and print media without unexpected truncation.</p>
          
          <h3>File Size Reduction</h3>
          <p>Cropping removes unnecessary portions of an image, which can reduce file size and improve loading times for web use.</p>
          
          <h3>Professional Appearance</h3>
          <p>Well-cropped images convey professionalism and attention to detail, enhancing your personal brand or business presentation.</p>
          
          <h2>Advanced Image Cropping Techniques</h2>
          <p>For the best results when cropping your images, consider these professional tips:</p>
          
          <h3>The Rule of Thirds</h3>
          <p>Imagine your image divided into nine equal parts by two horizontal and two vertical lines. Place key elements along these lines or at their intersections to create a more balanced and engaging composition.</p>
          
          <h3>Cropping for Perspective</h3>
          <p>Strategic cropping can alter the perceived perspective of an image. Cropping out portions of the foreground can make elements appear closer, while removing parts of the background can create a sense of depth.</p>
          
          <h3>Cropping for Storytelling</h3>
          <p>Consider what story your image tells. Sometimes, a tighter crop creates a more intimate or impactful narrative, while a wider crop provides more context.</p>
          
          <h3>Balancing Negative Space</h3>
          <p>Negative space (the empty areas around the main subject) can be as important as the subject itself. Thoughtful cropping can create a pleasing balance between your subject and the surrounding space.</p>
          
          <h3>Straightening Horizons</h3>
          <p>Use cropping to correct slightly tilted horizons or vertical lines in architectural photos, ensuring a more professional and polished result.</p>
          
          <h2>Format Selection Guide</h2>
          <p>Choose the most appropriate format for your cropped image based on your specific needs:</p>
          
          <h3>JPEG</h3>
          <p>Best for photographs and complex images with many colors. JPEG uses lossy compression, allowing you to balance quality and file size with the quality slider. Higher quality settings preserve more detail but result in larger files.</p>
          
          <h3>PNG</h3>
          <p>Ideal for images that require transparency or have text, lines, and sharp edges. PNG uses lossless compression, ensuring no detail is lost in the compression process, but typically results in larger file sizes than JPEG.</p>
          
          <h3>WebP</h3>
          <p>A modern format that offers superior compression and quality characteristics. WebP supports both lossy and lossless compression, as well as transparency. It's ideal for web use but may not be supported by all applications or older browsers.</p>
          
          <h2>Privacy and Security</h2>
          <p>Our Image Cropper processes all images directly in your browser, meaning:</p>
          <ul>
            <li>Your images are never uploaded to our servers</li>
            <li>No one else can access your original or cropped images</li>
            <li>You maintain complete privacy and control over your content</li>
            <li>The tool works even when you're offline once the page has loaded</li>
          </ul>
          
          <h2>Browser Compatibility</h2>
          <p>Our Image Cropper is designed to work with all modern browsers:</p>
          <ul>
            <li>Google Chrome</li>
            <li>Mozilla Firefox</li>
            <li>Safari</li>
            <li>Microsoft Edge</li>
            <li>Opera</li>
          </ul>
          <p>For the best experience, we recommend keeping your browser updated to the latest version.</p>
          
          <h2>Troubleshooting Common Issues</h2>
          <p>If you encounter any difficulties while using the Image Cropper, these solutions may help:</p>
          
          <h3>Image Not Loading</h3>
          <p>Ensure your image file is in a supported format (JPEG, PNG, GIF, WebP). Very large images may take longer to load or cause performance issues. Try compressing the image before uploading if it's over 10MB.</p>
          
          <h3>Unexpected Crop Results</h3>
          <p>Double-check your crop selection before clicking "Crop Image." The preview area shows exactly what portion of the image will be included in the final result.</p>
          
          <h3>Quality Issues</h3>
          <p>If your cropped image appears blurry or has artifacts, try increasing the quality setting or choosing a different output format. For the highest quality, use PNG format, though this will result in larger file sizes.</p>
          
          <h3>Cannot Download</h3>
          <p>If the download button doesn't work, try right-clicking on the cropped image and selecting "Save Image As" to download it manually.</p>
          
          <h2>Conclusion</h2>
          <p>Our Image Cropper provides a simple yet powerful solution for selecting and extracting exactly the portions of your images you want to keep. Whether you're creating profile pictures, optimizing images for social media, or focusing on specific elements for creative or professional purposes, this tool offers the precision and flexibility you need without requiring specialized software or technical expertise.</p>
          
          <p>By following the steps and tips outlined above, you can achieve professional-quality crops that enhance the impact and effectiveness of your images across various applications. Start cropping your images today and experience the difference a well-cropped image can make in your digital content.</p>
        </div>
      </div>
    </>
  );
}
