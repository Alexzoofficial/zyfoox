
import { Helmet } from "react-helmet-async";
import ToolHero from "@/components/tools/ToolHero";
import DownloaderInterface from "@/components/tools/DownloaderInterface";
import { Video } from "lucide-react";

export default function YouTubeVideoDownloader() {
  const formats = [
    { value: "mp4", label: "MP4 (Video)" },
    { value: "mp3", label: "MP3 (Audio)" },
    { value: "webm", label: "WebM (Video)" },
    { value: "3gp", label: "3GP (Mobile)" }
  ];

  const supportedUrls = [
    "https://www.youtube.com/watch?v=VIDEO_ID",
    "https://youtu.be/VIDEO_ID"
  ];

  const features = [
    "Download videos in multiple formats (MP4, MP3, WebM, 3GP)",
    "High-quality video downloads up to 4K resolution",
    "Fast processing and download speeds",
    "No registration or software installation required",
    "Compatible with all devices and browsers"
  ];

  return (
    <>
      <Helmet>
        <title>YouTube Video Downloader - Zyfoox</title>
        <meta 
          name="description" 
          content="Download YouTube videos in high quality for free. No registration required. Supports MP4, MP3, and more formats." 
        />
        <meta 
          name="keywords" 
          content="YouTube downloader, download YouTube videos, YouTube MP4 downloader, YouTube MP3 converter, free YouTube downloader" 
        />
        <link rel="canonical" href="https://zyfoox.com/tools/youtube-video-downloader" />
      </Helmet>

      <ToolHero
        title="YouTube Video Downloader"
        description="Download YouTube videos in high quality for free. No registration, no software installation."
        icon={<Video size={24} />}
      />

      <DownloaderInterface
        toolName="YouTube Video Downloader"
        platform="youtube"
        formats={formats}
        description="Paste the YouTube video URL in the input field below, select your preferred format, and click 'Process URL' to generate a download link."
        supportedUrls={supportedUrls}
        features={features}
      />
    </>
  );
}
