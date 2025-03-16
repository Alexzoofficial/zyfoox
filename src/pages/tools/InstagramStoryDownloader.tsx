
import { Helmet } from "react-helmet-async";
import ToolHero from "@/components/tools/ToolHero";
import DownloaderInterface from "@/components/tools/DownloaderInterface";
import { CirclePlay } from "lucide-react";

export default function InstagramStoryDownloader() {
  const formats = [
    { value: "mp4", label: "MP4 (Video)" },
    { value: "jpg", label: "JPG (Image)" },
  ];

  const supportedUrls = [
    "https://www.instagram.com/stories/USERNAME/STORY_ID",
    "https://instagram.com/stories/USERNAME/STORY_ID"
  ];

  const features = [
    "Download Instagram Stories videos and images without watermark",
    "Save Stories before they disappear after 24 hours",
    "High-quality video downloads",
    "Fast processing and download speeds",
    "No Instagram login or registration required"
  ];

  return (
    <>
      <Helmet>
        <title>Instagram Story Downloader - Zyfoox</title>
        <meta 
          name="description" 
          content="Download Instagram Stories before they disappear. Save videos and images in high quality without watermark." 
        />
        <meta 
          name="keywords" 
          content="Instagram Story downloader, download Instagram Stories, save Instagram Stories, Instagram Story saver, story downloader" 
        />
        <link rel="canonical" href="https://zyfoox.com/tools/instagram-story-downloader" />
      </Helmet>

      <ToolHero
        title="Instagram Story Downloader"
        description="Download Instagram Stories before they disappear. Save videos and images without watermark."
        icon={<CirclePlay size={24} />}
      />

      <DownloaderInterface
        toolName="Instagram Story Downloader"
        platform="instagram"
        formats={formats}
        description="Paste the Instagram Story URL in the input field below, select your preferred format, and click 'Process URL' to generate a download link."
        supportedUrls={supportedUrls}
        features={features}
      />
    </>
  );
}
