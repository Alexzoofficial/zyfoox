
import { useState, useRef, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import ToolHero from "@/components/tools/ToolHero";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Copy, FileImage, Download, Upload, Image as ImageIcon, RefreshCw, Check, Info } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

export default function ImageFormatConverter() {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [originalFormat, setOriginalFormat] = useState<string>("");
  const [targetFormat, setTargetFormat] = useState<string>("jpeg");
  const [jpegQuality, setJpegQuality] = useState<number>(90);
  const [pngCompression, setPngCompression] = useState<number>(6);
  const [webpQuality, setWebpQuality] = useState<number>(80);
  const [originalImageUrl, setOriginalImageUrl] = useState<string>("");
  const [convertedImageUrl, setConvertedImageUrl] = useState<string>("");
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [convertedSize, setConvertedSize] = useState<number>(0);
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
      
      // Extract and set original format
      const format = fileType.split("/")[1];
      setOriginalFormat(format);
      
      // Create object URL for original image preview
      const objectUrl = URL.createObjectURL(file);
      setOriginalImageUrl(objectUrl);
      
      // Reset converted image
      setConvertedImageUrl("");
      setConvertedSize(0);
      
      // Suggest a different format than the original
      if (format === "jpeg" || format === "jpg") {
        setTargetFormat("webp");
      } else if (format === "png") {
        setTargetFormat("webp");
      } else if (format === "webp") {
        setTargetFormat("jpeg");
      } else if (format === "gif") {
        setTargetFormat("webp");
      } else {
        setTargetFormat("jpeg");
      }
      
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

  // Convert image format
  const convertImage = useCallback(async () => {
    if (!selectedFile) {
      toast({
        title: "No Image Selected",
        description: "Please select an image to convert.",
        variant: "destructive",
      });
      return;
    }
    
    setIsConverting(true);
    
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
      
      // Create canvas
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      
      if (!ctx) {
        throw new Error("Could not get canvas context");
      }
      
      // Draw image on canvas
      ctx.drawImage(img, 0, 0, img.width, img.height);
      
      // Convert to target format
      let convertedBlob: Blob;
      let mimeType = `image/${targetFormat}`;
      
      // Handle different formats with their quality settings
      if (targetFormat === "jpeg" || targetFormat === "jpg") {
        const quality = jpegQuality / 100;
        convertedBlob = await new Promise<Blob>((resolve) => {
          canvas.toBlob(
            (blob) => resolve(blob as Blob),
            "image/jpeg",
            quality
          );
        });
      } else if (targetFormat === "webp") {
        const quality = webpQuality / 100;
        convertedBlob = await new Promise<Blob>((resolve) => {
          canvas.toBlob(
            (blob) => resolve(blob as Blob),
            "image/webp",
            quality
          );
        });
      } else if (targetFormat === "png") {
        // PNG doesn't use quality parameter in the same way
        convertedBlob = await new Promise<Blob>((resolve) => {
          canvas.toBlob(
            (blob) => resolve(blob as Blob),
            "image/png"
          );
        });
      } else if (targetFormat === "gif") {
        // Simple GIF conversion (note: this won't preserve animation)
        convertedBlob = await new Promise<Blob>((resolve) => {
          canvas.toBlob(
            (blob) => resolve(blob as Blob),
            "image/gif"
          );
        });
      } else if (targetFormat === "bmp") {
        convertedBlob = await new Promise<Blob>((resolve) => {
          canvas.toBlob(
            (blob) => resolve(blob as Blob),
            "image/bmp"
          );
        });
      } else {
        // Default fallback to PNG
        convertedBlob = await new Promise<Blob>((resolve) => {
          canvas.toBlob(
            (blob) => resolve(blob as Blob),
            "image/png"
          );
        });
      }
      
      // Create object URL for converted image preview
      const convertedObjectUrl = URL.createObjectURL(convertedBlob);
      setConvertedImageUrl(convertedObjectUrl);
      setConvertedSize(convertedBlob.size);
      
      toast({
        title: "Image Converted",
        description: `Successfully converted from ${originalFormat.toUpperCase()} to ${targetFormat.toUpperCase()}`,
      });
    } catch (error) {
      console.error("Error converting image:", error);
      toast({
        title: "Conversion Failed",
        description: "There was an error converting your image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsConverting(false);
    }
  }, [selectedFile, originalImageUrl, targetFormat, jpegQuality, webpQuality, pngCompression, originalFormat, toast]);

  // Calculate size change
  const sizeChangePercentage = (): number => {
    if (originalSize === 0 || convertedSize === 0) return 0;
    const change = ((convertedSize - originalSize) / originalSize) * 100;
    return parseFloat(change.toFixed(1));
  };

  // Get size change text and color
  const getSizeChangeInfo = () => {
    const change = sizeChangePercentage();
    if (change === 0) return { text: "No Change", color: "text-foreground" };
    if (change < 0) return { text: `${Math.abs(change)}% Smaller`, color: "text-green-500" };
    return { text: `${change}% Larger`, color: "text-yellow-500" };
  };

  // Download converted image
  const downloadConvertedImage = () => {
    if (convertedImageUrl) {
      const a = document.createElement("a");
      a.href = convertedImageUrl;
      
      // Create filename with new extension
      let fileName = selectedFile?.name || "image";
      const fileNameWithoutExt = fileName.substring(0, fileName.lastIndexOf(".")) || fileName;
      a.download = `${fileNameWithoutExt}.${targetFormat}`;
      
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
    setOriginalFormat("");
    setOriginalSize(0);
    setConvertedSize(0);
    setOriginalImageUrl("");
    setConvertedImageUrl("");
    setJpegQuality(90);
    setPngCompression(6);
    setWebpQuality(80);
  };

  return (
    <>
      <Helmet>
        <title>Image Format Converter | Convert Images Between Formats</title>
        <meta name="description" content="Free online image format converter. Convert images between JPEG, PNG, WEBP, GIF, and BMP formats while maintaining quality. No upload limits." />
        <meta name="keywords" content="image converter, format converter, jpg to png, png to jpg, webp converter, image format conversion, picture format changer" />
      </Helmet>

      <ToolHero
        title="Image Format Converter"
        description="Convert images between different formats like JPEG, PNG, WEBP, GIF, and BMP while maintaining quality."
        icon={<Copy size={32} />}
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
                      Upload an image to convert to another format
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
                  
                  <div className="space-y-4">
                    <div>
                      <Label className="text-lg font-medium">Output Format</Label>
                      
                      {originalFormat && (
                        <div className="text-sm text-muted-foreground mb-3">
                          Converting from {originalFormat.toUpperCase()}
                        </div>
                      )}
                      
                      <RadioGroup 
                        value={targetFormat} 
                        onValueChange={setTargetFormat}
                        className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="jpeg" id="jpeg" />
                          <Label htmlFor="jpeg" className="cursor-pointer">JPEG</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="png" id="png" />
                          <Label htmlFor="png" className="cursor-pointer">PNG</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="webp" id="webp" />
                          <Label htmlFor="webp" className="cursor-pointer">WEBP</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="gif" id="gif" />
                          <Label htmlFor="gif" className="cursor-pointer">GIF</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="bmp" id="bmp" />
                          <Label htmlFor="bmp" className="cursor-pointer">BMP</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <Tabs 
                      defaultValue="quality" 
                      className="w-full"
                      value={targetFormat === "jpeg" || targetFormat === "webp" ? "quality" : "info"}
                    >
                      <TabsList className="grid grid-cols-2 mb-4">
                        <TabsTrigger 
                          value="quality" 
                          disabled={targetFormat !== "jpeg" && targetFormat !== "webp"}
                        >
                          Quality Settings
                        </TabsTrigger>
                        <TabsTrigger value="info">Format Info</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="quality">
                        {targetFormat === "jpeg" && (
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between mb-2">
                                <Label htmlFor="jpegQuality">JPEG Quality: {jpegQuality}%</Label>
                              </div>
                              <Slider
                                id="jpegQuality"
                                min={1}
                                max={100}
                                step={1}
                                value={[jpegQuality]}
                                onValueChange={(values) => setJpegQuality(values[0])}
                              />
                              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                <span>Smaller File Size</span>
                                <span>Higher Quality</span>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {targetFormat === "webp" && (
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between mb-2">
                                <Label htmlFor="webpQuality">WebP Quality: {webpQuality}%</Label>
                              </div>
                              <Slider
                                id="webpQuality"
                                min={1}
                                max={100}
                                step={1}
                                value={[webpQuality]}
                                onValueChange={(values) => setWebpQuality(values[0])}
                              />
                              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                <span>Smaller File Size</span>
                                <span>Higher Quality</span>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {(targetFormat !== "jpeg" && targetFormat !== "webp") && (
                          <div className="flex items-center justify-center py-4 text-center text-muted-foreground">
                            <p>Quality settings not available for {targetFormat.toUpperCase()} format</p>
                          </div>
                        )}
                      </TabsContent>
                      
                      <TabsContent value="info">
                        <div className="space-y-2">
                          <h3 className="font-medium">{targetFormat.toUpperCase()} Format</h3>
                          
                          {targetFormat === "jpeg" && (
                            <p className="text-sm text-muted-foreground">
                              JPEG offers small file sizes ideal for photos and complex images. 
                              It uses lossy compression which may reduce quality slightly. Not suitable 
                              for images requiring transparency.
                            </p>
                          )}
                          
                          {targetFormat === "png" && (
                            <p className="text-sm text-muted-foreground">
                              PNG provides high-quality images with lossless compression. Supports 
                              transparency and is ideal for graphics, logos, and screenshots. Files 
                              are typically larger than JPEG or WebP.
                            </p>
                          )}
                          
                          {targetFormat === "webp" && (
                            <p className="text-sm text-muted-foreground">
                              WebP offers superior compression for both lossy and lossless images. 
                              It provides smaller file sizes than JPEG and PNG while maintaining 
                              quality. Supports transparency and animation.
                            </p>
                          )}
                          
                          {targetFormat === "gif" && (
                            <p className="text-sm text-muted-foreground">
                              GIF supports basic animation and transparency. Limited to 256 colors, 
                              making it less suitable for photos. Best for simple animations and 
                              graphics with few colors.
                            </p>
                          )}
                          
                          {targetFormat === "bmp" && (
                            <p className="text-sm text-muted-foreground">
                              BMP is an uncompressed format that preserves every pixel detail. 
                              This results in very large file sizes but no quality loss. 
                              Mainly used in specific applications requiring raw pixel data.
                            </p>
                          )}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button 
                      className="flex-grow" 
                      onClick={convertImage}
                      disabled={!selectedFile || isConverting || (originalFormat === targetFormat)}
                    >
                      {isConverting ? (
                        <>
                          <RefreshCw size={16} className="mr-2 animate-spin" />
                          Converting...
                        </>
                      ) : (
                        `Convert to ${targetFormat.toUpperCase()}`
                      )}
                    </Button>
                    
                    <Button variant="outline" onClick={resetForm}>
                      Reset
                    </Button>
                  </div>
                  
                  {originalFormat === targetFormat && (
                    <div className="flex items-center space-x-2 p-2 bg-yellow-500/10 text-yellow-500 rounded-md text-sm">
                      <Info size={16} />
                      <p>Please select a different output format than the original format.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6 animate-fade-in animate-delay-100">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Converted Image</h2>
                  
                  {convertedImageUrl && (
                    <Button 
                      variant="secondary" 
                      size="sm"
                      onClick={downloadConvertedImage}
                    >
                      <Download size={16} className="mr-2" />
                      Download
                    </Button>
                  )}
                </div>
                
                {convertedImageUrl ? (
                  <div className="space-y-6">
                    <div className="bg-secondary/40 rounded-lg p-4">
                      <div className="grid grid-cols-2 gap-4 mb-2">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Original</p>
                          <p className="font-medium">{originalFormat.toUpperCase()}</p>
                          <p className="text-sm">{formatFileSize(originalSize)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Converted</p>
                          <p className="font-medium">{targetFormat.toUpperCase()}</p>
                          <p className="text-sm">{formatFileSize(convertedSize)}</p>
                        </div>
                      </div>
                      
                      <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                        <span className="text-sm">Size Change:</span>
                        <span className={`text-sm font-medium ${getSizeChangeInfo().color}`}>
                          {getSizeChangeInfo().text}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
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
                        <h3 className="font-medium mb-2">Converted Image</h3>
                        <div className="relative aspect-video bg-secondary/20 rounded-md overflow-hidden flex items-center justify-center">
                          {convertedImageUrl ? (
                            <img 
                              src={convertedImageUrl} 
                              alt="Converted" 
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
                    <p className="font-medium">Converted image will appear here</p>
                    <p className="text-sm max-w-md mt-2">
                      Select an image and format to convert
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="mt-16 space-y-8 animate-fade-in animate-delay-200">
          <h2 className="text-3xl font-bold">Understanding Image Formats</h2>
          
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <h3>Why Image Formats Matter</h3>
            <p>
              Image formats determine how visual information is encoded, compressed, and stored digitally. Choosing the right format for your specific use case can significantly impact image quality, file size, loading time, and compatibility across different platforms and devices.
            </p>
            
            <p>
              Different image formats employ various compression algorithms and encoding techniques that make certain formats better suited for specific types of images and use cases. Understanding these differences helps you make informed decisions about which format to use for your images.
            </p>
            
            <h3>Common Image Formats Explained</h3>
            
            <h4>JPEG (Joint Photographic Experts Group)</h4>
            <p>
              JPEG is one of the most widely used image formats, particularly for photographs and complex images with gradients and many colors.
            </p>
            
            <p><strong>Key Characteristics:</strong></p>
            <ul>
              <li><strong>Lossy Compression</strong>: JPEG uses lossy compression, which means it permanently discards some image data to achieve smaller file sizes.</li>
              <li><strong>Variable Quality</strong>: You can adjust the compression level to balance between file size and image quality.</li>
              <li><strong>No Transparency</strong>: JPEG doesn't support transparency/alpha channels.</li>
              <li><strong>24-Bit Color</strong>: Supports up to 16.7 million colors, making it excellent for photographs.</li>
            </ul>
            
            <p><strong>Best Uses:</strong></p>
            <ul>
              <li>Photographs and realistic images</li>
              <li>Web content where file size matters</li>
              <li>Images with gradients and many colors</li>
              <li>When transparency is not needed</li>
            </ul>
            
            <p><strong>Not Ideal For:</strong></p>
            <ul>
              <li>Text or line art (may appear blurry)</li>
              <li>Images requiring transparency</li>
              <li>Images that will be edited multiple times (quality degrades with each save)</li>
            </ul>
            
            <h4>PNG (Portable Network Graphics)</h4>
            <p>
              PNG was developed as an improved, non-patented replacement for GIF, offering lossless compression and transparency support.
            </p>
            
            <p><strong>Key Characteristics:</strong></p>
            <ul>
              <li><strong>Lossless Compression</strong>: Preserves all image data, resulting in higher quality but larger file sizes than JPEG.</li>
              <li><strong>Transparency Support</strong>: Supports alpha channels for partial and full transparency.</li>
              <li><strong>24-Bit Color</strong>: Supports up to 16.7 million colors (PNG-24) or 256 colors (PNG-8).</li>
              <li><strong>No Animation</strong>: Unlike GIF, standard PNG doesn't support animation (though APNG format does).</li>
            </ul>
            
            <p><strong>Best Uses:</strong></p>
            <ul>
              <li>Images requiring transparency</li>
              <li>Logos, icons, and graphics with solid colors</li>
              <li>Screenshots and images with text</li>
              <li>Images that need to be edited repeatedly</li>
            </ul>
            
            <p><strong>Not Ideal For:</strong></p>
            <ul>
              <li>Photographs where file size is a concern</li>
              <li>Very large images like high-resolution photos</li>
              <li>Animated content</li>
            </ul>
            
            <h4>WebP</h4>
            <p>
              WebP is a modern image format developed by Google that provides superior lossless and lossy compression for web images.
            </p>
            
            <p><strong>Key Characteristics:</strong></p>
            <ul>
              <li><strong>Advanced Compression</strong>: Offers both lossy and lossless compression methods that are more efficient than JPEG and PNG.</li>
              <li><strong>Smaller File Sizes</strong>: Typically 25-35% smaller than JPEG at equivalent visual quality.</li>
              <li><strong>Transparency Support</strong>: Supports alpha channel transparency like PNG but with smaller file sizes.</li>
              <li><strong>Animation Support</strong>: Can replace animated GIFs with much smaller file sizes.</li>
            </ul>
            
            <p><strong>Best Uses:</strong></p>
            <ul>
              <li>Web images where loading speed is critical</li>
              <li>Modern websites and applications</li>
              <li>Images requiring both high quality and small file size</li>
              <li>Replacing both JPEG and PNG in web contexts</li>
            </ul>
            
            <p><strong>Not Ideal For:</strong></p>
            <ul>
              <li>Situations requiring maximum compatibility with older browsers</li>
              <li>Print materials (industry standard remains JPEG/TIFF)</li>
            </ul>
            
            <h4>GIF (Graphics Interchange Format)</h4>
            <p>
              GIF is one of the oldest image formats still in common use, known primarily for its animation capabilities.
            </p>
            
            <p><strong>Key Characteristics:</strong></p>
            <ul>
              <li><strong>Limited Color Palette</strong>: Supports only 256 colors, which severely limits its use for photographs.</li>
              <li><strong>Lossless Compression</strong>: Uses lossless compression but is less efficient than PNG for static images.</li>
              <li><strong>Animation Support</strong>: The most widely supported format for simple animations.</li>
              <li><strong>Binary Transparency</strong>: Supports only full transparency or no transparency per pixel (no partial transparency).</li>
            </ul>
            
            <p><strong>Best Uses:</strong></p>
            <ul>
              <li>Simple animations and short video clips</li>
              <li>Images with few colors and sharp edges</li>
              <li>Social media content requiring animation</li>
            </ul>
            
            <p><strong>Not Ideal For:</strong></p>
            <ul>
              <li>Photographs or complex images with many colors</li>
              <li>Large animations (file sizes become prohibitively large)</li>
              <li>Images requiring partial transparency</li>
            </ul>
            
            <h4>BMP (Bitmap)</h4>
            <p>
              BMP is a relatively simple raster graphics image file format developed by Microsoft.
            </p>
            
            <p><strong>Key Characteristics:</strong></p>
            <ul>
              <li><strong>Uncompressed Format</strong>: Typically stores image data without compression, resulting in very large file sizes.</li>
              <li><strong>Perfect Quality</strong>: Preserves every pixel exactly as intended with no quality loss.</li>
              <li><strong>Simple Structure</strong>: Easy to read and write programmatically, with minimal processing overhead.</li>
              <li><strong>Limited Compatibility</strong>: Not widely supported on the web.</li>
            </ul>
            
            <p><strong>Best Uses:</strong></p>
            <ul>
              <li>Applications requiring raw pixel data</li>
              <li>Temporary storage during image editing</li>
              <li>Windows system graphics</li>
            </ul>
            
            <p><strong>Not Ideal For:</strong></p>
            <ul>
              <li>Web use (extremely inefficient)</li>
              <li>Sharing images (too large)</li>
              <li>Any application where file size matters</li>
            </ul>
            
            <h3>When to Convert Between Formats</h3>
            
            <h4>Converting from JPEG to PNG</h4>
            <p>
              <strong>Consider when:</strong>
            </p>
            <ul>
              <li>You need to add transparency to an image</li>
              <li>You're working with text or graphics that show compression artifacts in JPEG format</li>
              <li>You plan to edit the image multiple times (to avoid cumulative quality loss)</li>
            </ul>
            <p>
              <strong>Keep in mind:</strong> Converting from JPEG to PNG won't recover detail already lost in the JPEG compression. The resulting PNG will be larger but won't improve quality.
            </p>
            
            <h4>Converting from PNG to JPEG</h4>
            <p>
              <strong>Consider when:</strong>
            </p>
            <ul>
              <li>File size needs to be reduced for web use</li>
              <li>The image is a photograph without transparency needs</li>
              <li>Slightly reduced quality is acceptable</li>
            </ul>
            <p>
              <strong>Keep in mind:</strong> Any transparency in the PNG will be lost when converting to JPEG, typically replaced with a white background.
            </p>
            
            <h4>Converting to WebP</h4>
            <p>
              <strong>Consider when:</strong>
            </p>
            <ul>
              <li>Optimizing images for web performance</li>
              <li>Your target audience uses modern browsers</li>
              <li>You want the best balance of quality and file size</li>
            </ul>
            <p>
              <strong>Keep in mind:</strong> While WebP support is now excellent across modern browsers, you may need fallbacks for older systems.
            </p>
            
            <h4>Converting from GIF to Other Formats</h4>
            <p>
              <strong>Consider when:</strong>
            </p>
            <ul>
              <li>Converting static GIFs to PNG for better quality and smaller size</li>
              <li>Converting animated GIFs to WebP for significant size reduction</li>
              <li>You need higher color fidelity than GIF's 256 colors</li>
            </ul>
            <p>
              <strong>Keep in mind:</strong> Converting animated GIFs to other formats may require specialized tools to preserve the animation.
            </p>
            
            <h3>Image Format Conversion Best Practices</h3>
            
            <h4>Preserve Original Files</h4>
            <p>
              Always keep your original image files, especially if they're in high-quality formats. This gives you the option to create optimized versions for specific uses without repeatedly degrading quality.
            </p>
            
            <h4>Consider the Purpose</h4>
            <p>
              Choose your conversion target based on how the image will be used:
            </p>
            <ul>
              <li><strong>Web Images</strong>: Prioritize formats with smaller file sizes (JPEG for photos, PNG for graphics with transparency, WebP where supported)</li>
              <li><strong>Print Materials</strong>: Favor quality over file size (TIFF or high-quality JPEG)</li>
              <li><strong>Archiving</strong>: Use lossless formats (PNG, TIFF) to preserve all details</li>
              <li><strong>Editing</strong>: Use formats that support layers and don't degrade with repeated saves (PSD, PNG)</li>
            </ul>
            
            <h4>Adjust Quality Settings Appropriately</h4>
            <p>
              When converting to lossy formats like JPEG or WebP:
            </p>
            <ul>
              <li>Use higher quality settings (85-95%) for important images or those with fine details</li>
              <li>Use medium quality settings (70-85%) for general web use and social media</li>
              <li>Use lower quality settings (50-70%) only when file size is extremely critical</li>
            </ul>
            
            <h4>Test Before Finalizing</h4>
            <p>
              Always check your converted images before deploying them:
            </p>
            <ul>
              <li>View images at their intended display size</li>
              <li>Check for artifacts, especially around text and sharp edges</li>
              <li>Verify that transparency works as expected (if applicable)</li>
              <li>Test load times in the intended environment</li>
            </ul>
            
            <h3>Format-Specific Optimization Tips</h3>
            
            <h4>JPEG Optimization</h4>
            <ul>
              <li><strong>Choose the Right Quality Level</strong>: 70-85% is often the sweet spot for web images</li>
              <li><strong>Consider Progressive JPEGs</strong>: These load gradually, improving perceived performance</li>
              <li><strong>Remove Metadata</strong>: Strip EXIF data to reduce file size when privacy and file size are concerns</li>
            </ul>
            
            <h4>PNG Optimization</h4>
            <ul>
              <li><strong>Use PNG-8 When Possible</strong>: For images with limited colors, PNG-8 (256 colors) can be much smaller than PNG-24</li>
              <li><strong>Consider Indexed Color</strong>: Converting to indexed color mode can significantly reduce file size for simple images</li>
              <li><strong>Try Compression Tools</strong>: Tools like pngquant and zopfli can further optimize PNGs without quality loss</li>
            </ul>
            
            <h4>WebP Optimization</h4>
            <ul>
              <li><strong>Adjust Quality Settings</strong>: Like JPEG, finding the right quality balance is important</li>
              <li><strong>Use Lossless for Graphics</strong>: WebP supports both lossy and lossless compression; choose lossless for graphics with text</li>
              <li><strong>Consider Animation Needs</strong>: WebP can replace animated GIFs with much smaller files</li>
            </ul>
            
            <h3>Advanced Considerations</h3>
            
            <h4>Responsive Images</h4>
            <p>
              Modern websites often serve different image sizes and formats based on device capabilities:
            </p>
            <ul>
              <li>Convert images to multiple formats (WebP with JPEG fallback)</li>
              <li>Create versions at different resolutions for different screen sizes</li>
              <li>Use HTML features like &lt;picture&gt; and srcset to serve the right format and size</li>
            </ul>
            
            <h4>Image Formats for Special Use Cases</h4>
            <p>
              Some situations call for specialized formats:
            </p>
            <ul>
              <li><strong>SVG</strong>: For vector graphics, logos, and icons that need to scale perfectly</li>
              <li><strong>AVIF</strong>: A newer format with even better compression than WebP, though with more limited support</li>
              <li><strong>HEIF/HEIC</strong>: Used by Apple devices, offering excellent compression for photos</li>
              <li><strong>TIFF</strong>: For print publishing and professional photography where maximum quality is needed</li>
            </ul>
            
            <h3>Conclusion</h3>
            <p>
              Converting between image formats isn't just about changing file extensions—it's about understanding the strengths and weaknesses of each format and choosing the right one for your specific needs. By selecting appropriate formats and optimization settings, you can significantly improve your website's performance, reduce storage requirements, and ensure your images look their best across all platforms.
            </p>
            <p>
              Our Image Format Converter tool simplifies this process, allowing you to quickly convert between formats while maintaining the highest possible quality. Whether you're optimizing images for a website, preparing files for print, or just need to change formats for compatibility, our tool provides the flexibility and control you need to get the best results.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
