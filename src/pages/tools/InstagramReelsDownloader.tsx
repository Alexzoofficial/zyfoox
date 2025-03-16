
import { Helmet } from "react-helmet-async";
import ToolHero from "@/components/tools/ToolHero";
import DownloaderInterface from "@/components/tools/DownloaderInterface";
import { Instagram } from "lucide-react";

export default function InstagramReelsDownloader() {
  const formats = [
    { value: "mp4", label: "MP4 (Video)" },
    { value: "mp3", label: "MP3 (Audio)" },
  ];

  const supportedUrls = [
    "https://www.instagram.com/reel/CODE",
    "https://instagram.com/reel/CODE"
  ];

  const features = [
    "Download Instagram Reels without watermark",
    "Extract audio from Reels in MP3 format",
    "High-quality video downloads",
    "Fast processing and download speeds",
    "No login or registration required"
  ];

  return (
    <>
      <Helmet>
        <title>Instagram Reels Downloader - Zyfoox</title>
        <meta 
          name="description" 
          content="Download Instagram Reels videos without watermark in high quality. Free, fast, and no registration required." 
        />
        <meta 
          name="keywords" 
          content="Instagram Reels downloader, download Instagram Reels, Instagram reel saver, Instagram video downloader, save Instagram videos" 
        />
        <link rel="canonical" href="https://zyfoox.com/tools/instagram-reels-downloader" />
      </Helmet>

      <ToolHero
        title="Instagram Reels Downloader"
        description="Download Instagram Reels videos without watermark. Free online tool, no login required."
        icon={<Instagram size={24} />}
      />

      <DownloaderInterface
        toolName="Instagram Reels Downloader"
        platform="instagram"
        formats={formats}
        description="Paste the Instagram Reel URL in the input field below, select your preferred format, and click 'Process URL' to generate a download link."
        supportedUrls={supportedUrls}
        features={features}
      />
    </>
  );
}
