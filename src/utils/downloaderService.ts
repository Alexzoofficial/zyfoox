
/**
 * This service provides functionality for downloading content from various platforms
 */

interface DownloadResponse {
  success: boolean;
  message: string;
  downloadUrl?: string;
  error?: string;
}

// Function to validate URLs for different platforms
export const validateUrl = (url: string, platform: string): boolean => {
  const patterns: Record<string, RegExp> = {
    youtube: /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/).+/,
    instagram: /^(https?:\/\/)?(www\.)?(instagram\.com\/p\/|instagram\.com\/reel\/|instagram\.com\/stories\/).+/,
    facebook: /^(https?:\/\/)?(www\.)?(facebook\.com\/watch\/?\?v=|fb\.watch\/|facebook\.com\/.*\/videos\/).+/,
    tiktok: /^(https?:\/\/)?(www\.)?(tiktok\.com\/@.+\/video\/).+/,
    twitter: /^(https?:\/\/)?(www\.)?(twitter\.com\/.*\/status\/).+/
  };

  return patterns[platform.toLowerCase()]?.test(url) || false;
};

// This is a simulation of the download process
// In a real implementation, this would connect to a backend service
export const processDownload = async (url: string, platform: string, format?: string): Promise<DownloadResponse> => {
  console.log(`Processing ${platform} download for URL: ${url}`);
  
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

  // For demonstration purposes, return a success response
  // In a real implementation, this would return data from an actual API
  return {
    success: true,
    message: `Successfully processed ${platform} download`,
    downloadUrl: "https://example.com/download/file.mp4"
  };
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
        match = url.match(/twitter\.com\/.*\/status\/(\d+)/);
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
  // In a real implementation, this would initiate a download
  // For now, we'll just show an alert
  alert(`File would be downloaded as: ${filename}`);
  
  // This code is commented out as it wouldn't work without a real file URL
  // const link = document.createElement('a');
  // link.href = url;
  // link.download = filename;
  // document.body.appendChild(link);
  // link.click();
  // document.body.removeChild(link);
};

// Function to simulate getting thumbnail URL
export const getThumbnailUrl = (videoId: string, platform: string): string => {
  switch (platform.toLowerCase()) {
    case 'youtube':
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    default:
      return '';
  }
};
