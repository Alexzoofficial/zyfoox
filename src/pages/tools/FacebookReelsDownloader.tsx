
import { Helmet } from "react-helmet-async";
import ToolHero from "@/components/tools/ToolHero";
import DownloaderInterface from "@/components/tools/DownloaderInterface";
import { Video } from "lucide-react";

export default function FacebookReelsDownloader() {
  const formats = [
    { value: "mp4", label: "MP4 (Video)" },
    { value: "mp3", label: "MP3 (Audio)" },
  ];

  const supportedUrls = [
    "https://www.facebook.com/reel/REEL_ID",
    "https://fb.watch/SHORTCODE"
  ];

  const features = [
    "Download Facebook Reels without watermark",
    "Extract audio from Reels in MP3 format",
    "High-quality video downloads",
    "No Facebook login required",
    "Fast processing and download speeds"
  ];

  return (
    <>
      <Helmet>
        <title>Facebook Reels Downloader - Zyfoox</title>
        <meta 
          name="description" 
          content="Download Facebook Reels videos without watermark in high quality. Free, fast, and no registration required." 
        />
        <meta 
          name="keywords" 
          content="Facebook Reels downloader, download Facebook Reels, FB reel saver, Facebook shorts downloader, save Facebook Reels" 
        />
        <link rel="canonical" href="https://zyfoox.com/tools/facebook-reels-downloader" />
      </Helmet>

      <ToolHero
        title="Facebook Reels Downloader"
        description="Download Facebook Reels videos without watermark. Free online tool, no login required."
        icon={<Video size={24} />}
      />

      <DownloaderInterface
        toolName="Facebook Reels Downloader"
        platform="facebook"
        formats={formats}
        description="Paste the Facebook Reel URL in the input field below, select your preferred format, and click 'Process URL' to generate a download link."
        supportedUrls={supportedUrls}
        features={features}
      />
    </>
  );
}
