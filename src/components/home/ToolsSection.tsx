
import { Brain, MessageSquare, Briefcase, MessagesSquare, Lightbulb, Play, MessageCircle, Video, Download, VideoVertical, Image, Instagram, CirclePlay, Facebook, MusicVideo, Twitter } from "lucide-react";
import ToolCard from "../ui/ToolCard";

export default function ToolsSection() {
  const tools = [
    // Original Tools
    {
      title: "Personal Branding Service",
      description: "Optimize your LinkedIn & X presence with AI-generated profiles, posts, and content strategies.",
      icon: <Brain size={24} />,
      path: "/tools/personal-branding",
      delay: 100
    },
    {
      title: "Study Notes & Summaries",
      description: "Transform lengthy textbooks and research papers into concise, easy-to-understand notes.",
      icon: <MessageSquare size={24} />,
      path: "/tools/study-notes",
      delay: 200
    },
    {
      title: "Business Names Generator",
      description: "Generate unique, brandable business names with available .com domain suggestions.",
      icon: <Briefcase size={24} />,
      path: "/tools/business-names",
      delay: 300
    },
    {
      title: "Meme Marketing Generator",
      description: "Create viral memes and trend-based content to boost your brand's social media engagement.",
      icon: <MessagesSquare size={24} />,
      path: "/tools/meme-marketing",
      delay: 100
    },
    {
      title: "Business Ideas Generator",
      description: "Get custom AI-generated startup ideas based on market trends and your skills.",
      icon: <Lightbulb size={24} />,
      path: "/tools/business-ideas",
      delay: 200
    },
    {
      title: "Hook Generator",
      description: "Create high-converting hooks for Instagram Reels & TikTok to capture immediate attention.",
      icon: <Play size={24} />,
      path: "/tools/hook-generator",
      delay: 300
    },
    {
      title: "WhatsApp Marketing",
      description: "Get automated promotional messages and viral marketing templates for WhatsApp.",
      icon: <MessageCircle size={24} />,
      path: "/tools/whatsapp-marketing",
      delay: 400
    },
    {
      title: "YouTube Branding Service",
      description: "Generate unique YouTube channel names, branding strategies, and niche recommendations.",
      icon: <Video size={24} />,
      path: "/tools/youtube-branding",
      delay: 500
    },
    
    // New Downloader Tools
    {
      title: "YouTube Video Downloader",
      description: "Download YouTube videos in high quality MP4, MP3, and other formats for free.",
      icon: <Download size={24} />,
      path: "/tools/youtube-video-downloader",
      delay: 100
    },
    {
      title: "YouTube Shorts Downloader",
      description: "Download YouTube Shorts videos without watermark in high quality for free.",
      icon: <VideoVertical size={24} />,
      path: "/tools/youtube-shorts-downloader",
      delay: 200
    },
    {
      title: "YouTube Thumbnail Downloader",
      description: "Download high-quality thumbnails from any YouTube video in multiple resolutions.",
      icon: <Image size={24} />,
      path: "/tools/youtube-thumbnail-downloader",
      delay: 300
    },
    {
      title: "Instagram Reels Downloader",
      description: "Download Instagram Reels videos without watermark in high quality for free.",
      icon: <Instagram size={24} />,
      path: "/tools/instagram-reels-downloader",
      delay: 400
    },
    {
      title: "Instagram Story Downloader",
      description: "Save Instagram Stories before they disappear. Download videos and images for free.",
      icon: <CirclePlay size={24} />,
      path: "/tools/instagram-story-downloader",
      delay: 500
    },
    {
      title: "Facebook Video Downloader",
      description: "Download videos from Facebook in HD quality without software installation.",
      icon: <Facebook size={24} />,
      path: "/tools/facebook-video-downloader",
      delay: 100
    },
    {
      title: "Facebook Reels Downloader",
      description: "Download Facebook Reels videos without watermark in high quality for free.",
      icon: <Video size={24} />,
      path: "/tools/facebook-reels-downloader",
      delay: 200
    },
    {
      title: "TikTok Video Downloader",
      description: "Download TikTok videos without watermark in high quality for free.",
      icon: <MusicVideo size={24} />,
      path: "/tools/tiktok-video-downloader",
      delay: 300
    },
    {
      title: "Twitter Video Downloader",
      description: "Download Twitter/X videos in high quality for free without registration.",
      icon: <Twitter size={24} />,
      path: "/tools/twitter-video-downloader",
      delay: 400
    }
  ];

  return (
    <section className="py-20 px-4" id="tools">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our AI-Powered Tools</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our collection of specialized AI tools and downloaders designed to enhance your online experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <ToolCard 
              key={index}
              title={tool.title}
              description={tool.description}
              icon={tool.icon}
              path={tool.path}
              delay={tool.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
