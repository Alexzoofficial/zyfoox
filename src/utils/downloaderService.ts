
/**
 * This service provides functionality for downloading content from various platforms
 */

interface DownloadResponse {
  success: boolean;
  message: string;
  downloadUrl?: string;
  error?: string;
  qualities?: DownloadQuality[];
}

interface DownloadQuality {
  label: string;
  value: string;
  size?: string;
  url: string;
}

// Function to validate URLs for different platforms
export const validateUrl = (url: string, platform: string): boolean => {
  const patterns: Record<string, RegExp> = {
    youtube: /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/).+/,
    instagram: /^(https?:\/\/)?(www\.)?(instagram\.com\/p\/|instagram\.com\/reel\/|instagram\.com\/stories\/).+/,
    facebook: /^(https?:\/\/)?(www\.)?(facebook\.com\/watch\/?\?v=|fb\.watch\/|facebook\.com\/.*\/videos\/).+/,
    tiktok: /^(https?:\/\/)?(www\.)?(tiktok\.com\/@.+\/video\/|vm\.tiktok\.com\/).+/,
    twitter: /^(https?:\/\/)?(www\.)?(twitter\.com\/.*\/status\/|x\.com\/.*\/status\/).+/
  };

  return patterns[platform.toLowerCase()]?.test(url) || false;
};

// This is a simulation of the download process
// In a real implementation, this would connect to a backend service
export const processDownload = async (url: string, platform: string, format?: string): Promise<DownloadResponse> => {
  console.log(`Processing ${platform} download for URL: ${url} in format: ${format}`);
  
  // Validate the URL
  if (!validateUrl(url, platform)) {
    return {
      success: false,
      message: "Invalid URL format for the selected platform",
      error: "Please enter a valid URL"
    };
  }

  // Simulate API processing time
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Generate mock download qualities based on platform and format
  const mockQualities = generateMockQualities(platform, format);
  
  // For demonstration purposes, return a success response with mock data
  return {
    success: true,
    message: `Successfully processed ${platform} download`,
    downloadUrl: mockQualities[0]?.url || "https://example.com/download/file.mp4",
    qualities: mockQualities
  };
};

// Helper function to generate mock quality options based on platform and format
const generateMockQualities = (platform: string, format?: string): DownloadQuality[] => {
  const videoId = Math.floor(Math.random() * 1000000).toString();
  
  if (format === "mp3") {
    // Audio only options
    return [
      { 
        label: "High Quality MP3", 
        value: "320kbps", 
        size: "8.2 MB",
        url: `https://example.com/download/${platform}-${videoId}-audio-high.mp3` 
      },
      { 
        label: "Medium Quality MP3", 
        value: "192kbps", 
        size: "5.4 MB",
        url: `https://example.com/download/${platform}-${videoId}-audio-medium.mp3` 
      },
      { 
        label: "Low Quality MP3", 
        value: "128kbps", 
        size: "3.8 MB",
        url: `https://example.com/download/${platform}-${videoId}-audio-low.mp3` 
      }
    ];
  }
  
  // Video format options specific to each platform
  switch (platform) {
    case 'youtube':
      return [
        { 
          label: "4K (2160p)", 
          value: "2160p", 
          size: "845 MB",
          url: `https://example.com/download/${platform}-${videoId}-2160p.mp4` 
        },
        { 
          label: "1080p Full HD", 
          value: "1080p", 
          size: "285 MB",
          url: `https://example.com/download/${platform}-${videoId}-1080p.mp4` 
        },
        { 
          label: "720p HD", 
          value: "720p", 
          size: "175 MB",
          url: `https://example.com/download/${platform}-${videoId}-720p.mp4` 
        },
        { 
          label: "480p", 
          value: "480p", 
          size: "85 MB",
          url: `https://example.com/download/${platform}-${videoId}-480p.mp4` 
        },
        { 
          label: "360p", 
          value: "360p", 
          size: "45 MB",
          url: `https://example.com/download/${platform}-${videoId}-360p.mp4` 
        }
      ];
    
    case 'tiktok':
      if (format === "mp4_watermark") {
        return [
          { 
            label: "With Watermark (HD)", 
            value: "watermark_hd", 
            size: "24.5 MB",
            url: `https://example.com/download/${platform}-${videoId}-watermark-hd.mp4` 
          },
          { 
            label: "With Watermark (SD)", 
            value: "watermark_sd", 
            size: "12.8 MB",
            url: `https://example.com/download/${platform}-${videoId}-watermark-sd.mp4` 
          }
        ];
      }
      return [
        { 
          label: "No Watermark (HD)", 
          value: "nowatermark_hd", 
          size: "24.5 MB",
          url: `https://example.com/download/${platform}-${videoId}-nowatermark-hd.mp4` 
        },
        { 
          label: "No Watermark (SD)", 
          value: "nowatermark_sd", 
          size: "12.8 MB",
          url: `https://example.com/download/${platform}-${videoId}-nowatermark-sd.mp4` 
        }
      ];
      
    case 'instagram':
      return [
        { 
          label: "High Quality", 
          value: "high", 
          size: "32.7 MB",
          url: `https://example.com/download/${platform}-${videoId}-high.mp4` 
        },
        { 
          label: "Medium Quality", 
          value: "medium", 
          size: "18.5 MB",
          url: `https://example.com/download/${platform}-${videoId}-medium.mp4` 
        },
        { 
          label: "Low Quality", 
          value: "low", 
          size: "8.2 MB",
          url: `https://example.com/download/${platform}-${videoId}-low.mp4` 
        }
      ];
      
    case 'facebook':
      return [
        { 
          label: "HD Quality", 
          value: "hd", 
          size: "125.4 MB",
          url: `https://example.com/download/${platform}-${videoId}-hd.mp4` 
        },
        { 
          label: "SD Quality", 
          value: "sd", 
          size: "65.8 MB",
          url: `https://example.com/download/${platform}-${videoId}-sd.mp4` 
        },
        { 
          label: "Mobile Quality", 
          value: "mobile", 
          size: "28.3 MB",
          url: `https://example.com/download/${platform}-${videoId}-mobile.mp4` 
        }
      ];
      
    case 'twitter':
      if (format === 'gif') {
        return [
          { 
            label: "GIF Format", 
            value: "gif", 
            size: "4.8 MB",
            url: `https://example.com/download/${platform}-${videoId}.gif` 
          }
        ];
      }
      return [
        { 
          label: "High Quality", 
          value: "high", 
          size: "45.2 MB",
          url: `https://example.com/download/${platform}-${videoId}-high.mp4` 
        },
        { 
          label: "Medium Quality", 
          value: "medium", 
          size: "22.7 MB",
          url: `https://example.com/download/${platform}-${videoId}-medium.mp4` 
        },
        { 
          label: "Low Quality", 
          value: "low", 
          size: "10.5 MB",
          url: `https://example.com/download/${platform}-${videoId}-low.mp4` 
        }
      ];
      
    default:
      return [
        { 
          label: "High Quality", 
          value: "high", 
          size: "45.2 MB",
          url: `https://example.com/download/${platform}-${videoId}-high.mp4` 
        },
        { 
          label: "Medium Quality", 
          value: "medium", 
          size: "22.7 MB",
          url: `https://example.com/download/${platform}-${videoId}-medium.mp4` 
        },
        { 
          label: "Low Quality", 
          value: "low", 
          size: "10.5 MB",
          url: `https://example.com/download/${platform}-${videoId}-low.mp4` 
        }
      ];
  }
};

// Function to extract video ID from different platform URLs
export const extractVideoId = (url: string, platform: string): string | null => {
  try {
    let match: RegExpMatchArray | null;
    
    switch (platform.toLowerCase()) {
      case 'youtube':
        // Match for standard videos and shorts
        match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([^&\?\/]+)/);
        return match ? match[1] : null;
      
      case 'instagram':
        match = url.match(/instagram\.com\/(p|reel|stories)\/([^\/]+)/);
        return match ? match[2] : null;
      
      case 'facebook':
        match = url.match(/(?:facebook\.com\/watch\/?\?v=|fb\.watch\/)([^&\?\/]+)/);
        return match ? match[1] : null;
      
      case 'tiktok':
        match = url.match(/tiktok\.com\/@[^\/]+\/video\/(\d+)/);
        return match ? match[1] : null;
      
      case 'twitter':
        match = url.match(/(?:twitter|x)\.com\/.*\/status\/(\d+)/);
        return match ? match[1] : null;
      
      default:
        return null;
    }
  } catch (error) {
    console.error("Error extracting video ID:", error);
    return null;
  }
};

// Function to download a file given a URL
export const downloadFile = (url: string, filename: string): void => {
  console.log(`Downloading file: ${filename} from URL: ${url}`);
  
  // In a real implementation, this would trigger an actual file download
  // Since we can't actually download in this demo, we'll just simulate it with console logs
  console.log(`Download started for: ${filename}`);
  
  // This code would work in a real application with actual file URLs
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Function to simulate getting thumbnail URL
export const getThumbnailUrl = (videoId: string, platform: string): string => {
  switch (platform.toLowerCase()) {
    case 'youtube':
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    case 'tiktok':
      // Note: This is a mock URL, real TikTok thumbnails require API access
      return `https://p16-sign-va.tiktokcdn.com/obj/tos-useast2a-p-0037-aiso/${videoId}?x-expires=1651824000&x-signature=example`;
    case 'instagram':
      // Mock URL for Instagram
      return `https://example.com/instagram-thumbnails/${videoId}.jpg`;
    case 'twitter':
      // Mock URL for Twitter
      return `https://example.com/twitter-thumbnails/${videoId}.jpg`;
    case 'facebook':
      // Mock URL for Facebook
      return `https://example.com/facebook-thumbnails/${videoId}.jpg`;
    default:
      return '';
  }
};
