
import { Helmet } from "react-helmet-async";
import ToolHero from "@/components/tools/ToolHero";
import DownloaderInterface from "@/components/tools/DownloaderInterface";
import { MusicVideo } from "lucide-react";

export default function TikTokVideoDownloader() {
  const formats = [
    { value: "mp4", label: "MP4 (No Watermark)" },
    { value: "mp4_watermark", label: "MP4 (With Watermark)" },
    { value: "mp3", label: "MP3 (Audio Only)" },
  ];

  const supportedUrls = [
    "https://www.tiktok.com/@USERNAME/video/VIDEO_ID",
    "https://vm.tiktok.com/SHORTCODE"
  ];

  const features = [
    "Download TikTok videos without watermark",
    "Extract audio from TikTok videos",
    "High-quality video downloads",
    "No TikTok login required",
    "Fast processing and download speeds"
  ];

  return (
    <>
      <Helmet>
        <title>TikTok Video Downloader - Zyfoox</title>
        <meta 
          name="description" 
          content="Download TikTok videos without watermark in high quality. Free, fast, and no registration required." 
        />
        <meta 
          name="keywords" 
          content="TikTok downloader, download TikTok videos, TikTok video saver, TikTok no watermark, save TikTok videos" 
        />
        <link rel="canonical" href="https://zyfoox.com/tools/tiktok-video-downloader" />
      </Helmet>

      <ToolHero
        title="TikTok Video Downloader"
        description="Download TikTok videos without watermark. Free online tool, no login required."
        icon={<MusicVideo size={24} />}
      />

      <DownloaderInterface
        toolName="TikTok Video Downloader"
        platform="tiktok"
        formats={formats}
        description="Paste the TikTok video URL in the input field below, select your preferred format, and click 'Process URL' to generate a download link."
        supportedUrls={supportedUrls}
        features={features}
      />
    </>
  );
}
