
import { 
  Brain, MessageSquare, Briefcase, MessagesSquare, Lightbulb, Play, 
  MessageCircle, Video, Download, MoveVertical, Image, Instagram, 
  CirclePlay, Facebook, Music, Twitter, Copy, FileText, FileImage, 
  Database, Key, Link, Clock, Calculator, Crop, Text, Activity 
} from "lucide-react";
import { ReactNode, createElement } from "react";

export interface ToolItem {
  title: string;
  description: string;
  icon: ReactNode;
  path: string;
  delay: number;
}

export const marketingTools: ToolItem[] = [
  {
    title: "Personal Branding Service",
    description: "Optimize your LinkedIn & X presence with AI-generated profiles, posts, and content strategies.",
    icon: createElement(Brain, { size: 24 }),
    path: "/tools/personal-branding",
    delay: 100
  },
  {
    title: "Study Notes & Summaries",
    description: "Transform lengthy textbooks and research papers into concise, easy-to-understand notes.",
    icon: createElement(MessageSquare, { size: 24 }),
    path: "/tools/study-notes",
    delay: 200
  },
  {
    title: "Business Names Generator",
    description: "Generate unique, brandable business names with available .com domain suggestions.",
    icon: createElement(Briefcase, { size: 24 }),
    path: "/tools/business-names",
    delay: 300
  },
  {
    title: "Meme Marketing Generator",
    description: "Create viral memes and trend-based content to boost your brand's social media engagement.",
    icon: createElement(MessagesSquare, { size: 24 }),
    path: "/tools/meme-marketing",
    delay: 100
  },
  {
    title: "Business Ideas Generator",
    description: "Get custom AI-generated startup ideas based on market trends and your skills.",
    icon: createElement(Lightbulb, { size: 24 }),
    path: "/tools/business-ideas",
    delay: 200
  },
  {
    title: "Hook Generator",
    description: "Create high-converting hooks for Instagram Reels & TikTok to capture immediate attention.",
    icon: createElement(Play, { size: 24 }),
    path: "/tools/hook-generator",
    delay: 300
  },
  {
    title: "WhatsApp Marketing",
    description: "Get automated promotional messages and viral marketing templates for WhatsApp.",
    icon: createElement(MessageCircle, { size: 24 }),
    path: "/tools/whatsapp-marketing",
    delay: 400
  },
  {
    title: "YouTube Branding Service",
    description: "Generate unique YouTube channel names, branding strategies, and niche recommendations.",
    icon: createElement(Video, { size: 24 }),
    path: "/tools/youtube-branding",
    delay: 500
  },
];

export const downloaderTools: ToolItem[] = [
  {
    title: "YouTube Video Downloader",
    description: "Download YouTube videos in high quality MP4, MP3, and other formats for free.",
    icon: createElement(Download, { size: 24 }),
    path: "/tools/youtube-video-downloader",
    delay: 100
  },
  {
    title: "YouTube Shorts Downloader",
    description: "Download YouTube Shorts videos without watermark in high quality for free.",
    icon: createElement(MoveVertical, { size: 24 }),
    path: "/tools/youtube-shorts-downloader",
    delay: 200
  },
  {
    title: "YouTube Thumbnail Downloader",
    description: "Download high-quality thumbnails from any YouTube video in multiple resolutions.",
    icon: createElement(Image, { size: 24 }),
    path: "/tools/youtube-thumbnail-downloader",
    delay: 300
  },
  {
    title: "Instagram Reels Downloader",
    description: "Download Instagram Reels videos without watermark in high quality for free.",
    icon: createElement(Instagram, { size: 24 }),
    path: "/tools/instagram-reels-downloader",
    delay: 400
  },
  {
    title: "Instagram Story Downloader",
    description: "Save Instagram Stories before they disappear. Download videos and images for free.",
    icon: createElement(CirclePlay, { size: 24 }),
    path: "/tools/instagram-story-downloader",
    delay: 500
  },
  {
    title: "Facebook Video Downloader",
    description: "Download videos from Facebook in HD quality without software installation.",
    icon: createElement(Facebook, { size: 24 }),
    path: "/tools/facebook-video-downloader",
    delay: 100
  },
  {
    title: "Facebook Reels Downloader",
    description: "Download Facebook Reels videos without watermark in high quality for free.",
    icon: createElement(Video, { size: 24 }),
    path: "/tools/facebook-reels-downloader",
    delay: 200
  },
  {
    title: "TikTok Video Downloader",
    description: "Download TikTok videos without watermark in high quality for free.",
    icon: createElement(Music, { size: 24 }),
    path: "/tools/tiktok-video-downloader",
    delay: 300
  },
  {
    title: "Twitter Video Downloader",
    description: "Download Twitter/X videos in high quality for free without registration.",
    icon: createElement(Twitter, { size: 24 }),
    path: "/tools/twitter-video-downloader",
    delay: 400
  },
];

export const utilityTools: ToolItem[] = [
  {
    title: "Fake Data Generator",
    description: "Generate realistic fake data including names, emails, addresses, and phone numbers for testing.",
    icon: createElement(Database, { size: 24 }),
    path: "/tools/fake-data-generator",
    delay: 100
  },
  {
    title: "Password Generator",
    description: "Create strong, secure passwords with customizable length, symbols, numbers, and more.",
    icon: createElement(Key, { size: 24 }),
    path: "/tools/password-generator",
    delay: 200
  },
  {
    title: "Image Compressor",
    description: "Reduce image file sizes while maintaining quality for faster website loading and sharing.",
    icon: createElement(FileImage, { size: 24 }),
    path: "/tools/image-compressor",
    delay: 300
  },
  {
    title: "Image Format Converter",
    description: "Convert images between different formats: JPG, PNG, WEBP, SVG, and more with ease.",
    icon: createElement(Copy, { size: 24 }),
    path: "/tools/image-format-converter",
    delay: 400
  },
];

export const financeTools: ToolItem[] = [
  {
    title: "EMI Calculator",
    description: "Calculate your Equated Monthly Installments for loans with customizable interest rates and terms.",
    icon: createElement(Calculator, { size: 24 }),
    path: "/tools/emi-calculator",
    delay: 300
  },
  {
    title: "SIP Calculator",
    description: "Plan your investments with our Systematic Investment Plan calculator. Calculate returns and growth.",
    icon: createElement(Calculator, { size: 24 }),
    path: "/tools/sip-calculator",
    delay: 400
  },
  {
    title: "GST Calculator",
    description: "Calculate GST amounts and final prices with our easy-to-use Goods and Services Tax calculator.",
    icon: createElement(Calculator, { size: 24 }),
    path: "/tools/gst-calculator",
    delay: 400
  },
];

export const miscTools: ToolItem[] = [
  {
    title: "Background Remover",
    description: "Remove backgrounds from images instantly with AI. Get transparent background images in seconds.",
    icon: createElement(Image, { size: 24 }),
    path: "/tools/background-remover",
    delay: 100
  },
  {
    title: "URL Shortener",
    description: "Create short, shareable links from long URLs. Track clicks and manage your shortened links easily.",
    icon: createElement(Link, { size: 24 }),
    path: "/tools/url-shortener",
    delay: 200
  },
  {
    title: "Age Calculator",
    description: "Calculate exact age in years, months, and days between any two dates with precision.",
    icon: createElement(Clock, { size: 24 }),
    path: "/tools/age-calculator",
    delay: 300
  },
  {
    title: "Image Resizer",
    description: "Resize images to exact dimensions while maintaining quality. Perfect for social media and websites.",
    icon: createElement(Image, { size: 24 }),
    path: "/tools/image-resizer",
    delay: 500
  },
  {
    title: "Image Cropper",
    description: "Crop images precisely with our easy-to-use tool. Perfect for profile pictures and focused content.",
    icon: createElement(Crop, { size: 24 }),
    path: "/tools/image-cropper",
    delay: 100
  },
  {
    title: "Text to Speech",
    description: "Convert text to natural-sounding voice audio in multiple languages and accents.",
    icon: createElement(Text, { size: 24 }),
    path: "/tools/text-to-speech",
    delay: 200
  },
  {
    title: "Article Generator",
    description: "Generate high-quality, SEO-optimized articles on any topic with our AI-powered tool.",
    icon: createElement(FileText, { size: 24 }),
    path: "/tools/article-generator",
    delay: 500
  },
  {
    title: "Name Customizer",
    description: "Create stylish, unique names with special symbols and fonts for social media profiles and more.",
    icon: createElement(Text, { size: 24 }),
    path: "/tools/name-customizer",
    delay: 100
  },
  {
    title: "Cricket Score",
    description: "Get live cricket scores, match schedules, and results from around the world in real-time.",
    icon: createElement(Activity, { size: 24 }),
    path: "/tools/cricket-score",
    delay: 200
  }
];

export const allTools: ToolItem[] = [
  ...marketingTools,
  ...downloaderTools,
  ...utilityTools,
  ...financeTools,
  ...miscTools
];
