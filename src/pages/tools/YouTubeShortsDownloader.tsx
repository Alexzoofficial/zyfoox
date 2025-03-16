
import { Helmet } from "react-helmet-async";
import ToolHero from "@/components/tools/ToolHero";
import DownloaderInterface from "@/components/tools/DownloaderInterface";
import { MoveVertical } from "lucide-react";

export default function YouTubeShortsDownloader() {
  const formats = [
    { value: "mp4", label: "MP4 (Video)" },
    { value: "mp3", label: "MP3 (Audio)" },
  ];

  const supportedUrls = [
    "https://www.youtube.com/shorts/VIDEO_ID",
    "https://youtube.com/shorts/VIDEO_ID"
  ];

  const features = [
    "Download YouTube Shorts in MP4 format",
    "Extract audio from Shorts in MP3 format",
    "No watermarks or quality loss",
    "Fast and reliable processing",
    "No registration or software installation required"
  ];

  return (
    <>
      <Helmet>
        <title>YouTube Shorts Downloader - Zyfoox</title>
        <meta 
          name="description" 
          content="Download YouTube Shorts videos in high quality without watermark. Free, fast, and no registration required." 
        />
        <meta 
          name="keywords" 
          content="YouTube Shorts downloader, download YouTube Shorts, Shorts MP4 downloader, save YouTube Shorts, YouTube Shorts saver" 
        />
        <link rel="canonical" href="https://zyfoox.com/tools/youtube-shorts-downloader" />
      </Helmet>

      <ToolHero
        title="YouTube Shorts Downloader"
        description="Download YouTube Shorts videos without watermark. Free online tool, no registration required."
        icon={<MoveVertical size={24} />}
      />

      <DownloaderInterface
        toolName="YouTube Shorts Downloader"
        platform="youtube"
        formats={formats}
        description="Paste the YouTube Shorts URL in the input field below, select your preferred format, and click 'Process URL' to generate a download link."
        supportedUrls={supportedUrls}
        features={features}
      />
    </>
  );
}
