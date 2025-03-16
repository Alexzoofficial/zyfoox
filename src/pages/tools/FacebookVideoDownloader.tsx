
import { Helmet } from "react-helmet-async";
import ToolHero from "@/components/tools/ToolHero";
import DownloaderInterface from "@/components/tools/DownloaderInterface";
import { Facebook } from "lucide-react";

export default function FacebookVideoDownloader() {
  const formats = [
    { value: "hd", label: "HD Quality" },
    { value: "sd", label: "SD Quality" },
    { value: "mp3", label: "MP3 (Audio)" },
  ];

  const supportedUrls = [
    "https://www.facebook.com/watch?v=VIDEO_ID",
    "https://www.facebook.com/USERNAME/videos/VIDEO_ID",
    "https://fb.watch/SHORTCODE"
  ];

  const features = [
    "Download Facebook videos in HD quality",
    "Extract audio from videos in MP3 format",
    "Download public and shared videos",
    "No Facebook login required",
    "Fast processing and download speeds"
  ];

  return (
    <>
      <Helmet>
        <title>Facebook Video Downloader - Zyfoox</title>
        <meta 
          name="description" 
          content="Download Facebook videos in high quality for free. No registration required. Save videos from any public Facebook page." 
        />
        <meta 
          name="keywords" 
          content="Facebook video downloader, download Facebook videos, FB video downloader, save Facebook videos, Facebook video saver" 
        />
        <link rel="canonical" href="https://zyfoox.com/tools/facebook-video-downloader" />
      </Helmet>

      <ToolHero
        title="Facebook Video Downloader"
        description="Download Facebook videos in high quality for free. No registration, no software installation."
        icon={<Facebook size={24} />}
      />

      <DownloaderInterface
        toolName="Facebook Video Downloader"
        platform="facebook"
        formats={formats}
        description="Paste the Facebook video URL in the input field below, select your preferred quality, and click 'Process URL' to generate a download link."
        supportedUrls={supportedUrls}
        features={features}
      />
    </>
  );
}
