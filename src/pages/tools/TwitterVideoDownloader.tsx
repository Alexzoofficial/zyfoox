
import { Helmet } from "react-helmet-async";
import ToolHero from "@/components/tools/ToolHero";
import DownloaderInterface from "@/components/tools/DownloaderInterface";
import { Twitter } from "lucide-react";

export default function TwitterVideoDownloader() {
  const formats = [
    { value: "mp4_high", label: "MP4 High Quality" },
    { value: "mp4_medium", label: "MP4 Medium Quality" },
    { value: "mp4_low", label: "MP4 Low Quality" },
    { value: "gif", label: "GIF (If available)" },
  ];

  const supportedUrls = [
    "https://twitter.com/USERNAME/status/TWEET_ID",
    "https://x.com/USERNAME/status/TWEET_ID"
  ];

  const features = [
    "Download Twitter videos in multiple qualities",
    "Download Twitter GIFs",
    "No Twitter/X account required",
    "Fast processing and download speeds",
    "Works with the new X.com domain"
  ];

  return (
    <>
      <Helmet>
        <title>Twitter Video Downloader - Zyfoox</title>
        <meta 
          name="description" 
          content="Download Twitter/X videos in high quality for free. Save videos from tweets without registration." 
        />
        <meta 
          name="keywords" 
          content="Twitter video downloader, X video downloader, download Twitter videos, Twitter saver, save Twitter videos" 
        />
        <link rel="canonical" href="https://zyfoox.com/tools/twitter-video-downloader" />
      </Helmet>

      <ToolHero
        title="Twitter Video Downloader"
        description="Download Twitter/X videos in high quality for free. No registration required."
        icon={<Twitter size={24} />}
      />

      <DownloaderInterface
        toolName="Twitter Video Downloader"
        platform="twitter"
        formats={formats}
        description="Paste the Twitter/X tweet URL containing the video in the input field below, select your preferred quality, and click 'Process URL' to generate a download link."
        supportedUrls={supportedUrls}
        features={features}
      />
    </>
  );
}
