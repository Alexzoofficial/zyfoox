import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";

// Layouts
import Layout from "./components/layout/Layout";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Disclaimer from "./pages/Disclaimer";
import DMCA from "./pages/DMCA";
import Sitemap from "./pages/Sitemap";

// Tool Pages - Lazy loaded
const PersonalBranding = lazy(() => import("./pages/tools/PersonalBranding"));
const StudyNotes = lazy(() => import("./pages/tools/StudyNotes"));
const BusinessNames = lazy(() => import("./pages/tools/BusinessNames"));
const MemeMarketing = lazy(() => import("./pages/tools/MemeMarketing"));
const BusinessIdeas = lazy(() => import("./pages/tools/BusinessIdeas"));
const HookGenerator = lazy(() => import("./pages/tools/HookGenerator"));
const WhatsAppMarketing = lazy(() => import("./pages/tools/WhatsAppMarketing"));
const YouTubeBranding = lazy(() => import("./pages/tools/YouTubeBranding"));

// Downloader Tool Pages - Lazy loaded
const YouTubeVideoDownloader = lazy(() => import("./pages/tools/YouTubeVideoDownloader"));
const YouTubeShortsDownloader = lazy(() => import("./pages/tools/YouTubeShortsDownloader"));
const YouTubeThumbnailDownloader = lazy(() => import("./pages/tools/YouTubeThumbnailDownloader"));
const InstagramReelsDownloader = lazy(() => import("./pages/tools/InstagramReelsDownloader"));
const InstagramStoryDownloader = lazy(() => import("./pages/tools/InstagramStoryDownloader"));
const FacebookVideoDownloader = lazy(() => import("./pages/tools/FacebookVideoDownloader"));
const FacebookReelsDownloader = lazy(() => import("./pages/tools/FacebookReelsDownloader"));
const TikTokVideoDownloader = lazy(() => import("./pages/tools/TikTokVideoDownloader"));
const TwitterVideoDownloader = lazy(() => import("./pages/tools/TwitterVideoDownloader"));

// Utility Tool Pages - Lazy loaded
const FakeDataGenerator = lazy(() => import("./pages/tools/FakeDataGenerator"));
const PasswordGenerator = lazy(() => import("./pages/tools/PasswordGenerator"));
const ImageCompressor = lazy(() => import("./pages/tools/ImageCompressor"));
const ImageFormatConverter = lazy(() => import("./pages/tools/ImageFormatConverter"));

// New Tool Pages - Lazy loaded
const BackgroundRemover = lazy(() => import("./pages/tools/BackgroundRemover"));
const UrlShortener = lazy(() => import("./pages/tools/UrlShortener"));
const AgeCalculator = lazy(() => import("./pages/tools/AgeCalculator"));
const SipCalculator = lazy(() => import("./pages/tools/SipCalculator"));
const ImageResizer = lazy(() => import("./pages/tools/ImageResizer"));
const ImageCropper = lazy(() => import("./pages/tools/ImageCropper"));
const TextToSpeech = lazy(() => import("./pages/tools/TextToSpeech"));
const EmiCalculator = lazy(() => import("./pages/tools/EmiCalculator"));
const GstCalculator = lazy(() => import("./pages/tools/GstCalculator"));
const ArticleGenerator = lazy(() => import("./pages/tools/ArticleGenerator"));
const NameCustomizer = lazy(() => import("./pages/tools/NameCustomizer"));
const CricketScore = lazy(() => import("./pages/tools/CricketScore"));

const queryClient = new QueryClient();

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Index />} />
                
                {/* About and Blog Routes */}
                <Route path="/about" element={<About />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogPost />} />
                
                {/* Legal Pages */}
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/disclaimer" element={<Disclaimer />} />
                <Route path="/dmca" element={<DMCA />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/sitemap" element={<Sitemap />} />
                
                {/* Original Tool Routes */}
                <Route path="/tools" element={<Navigate to="/tools/personal-branding" />} />
                
                {/* Tool Routes */}
                <Route 
                  path="/tools/personal-branding" 
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <PersonalBranding />
                    </Suspense>
                  } 
                />
                <Route 
                  path="/tools/study-notes" 
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <StudyNotes />
                    </Suspense>
                  } 
                />
                <Route 
                  path="/tools/business-names" 
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <BusinessNames />
                    </Suspense>
                  } 
                />
                <Route 
                  path="/tools/meme-marketing" 
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <MemeMarketing />
                    </Suspense>
                  } 
                />
                <Route 
                  path="/tools/business-ideas" 
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <BusinessIdeas />
                    </Suspense>
                  } 
                />
                <Route 
                  path="/tools/hook-generator" 
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <HookGenerator />
                    </Suspense>
                  } 
                />
                <Route 
                  path="/tools/whatsapp-marketing" 
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <WhatsAppMarketing />
                    </Suspense>
                  } 
                />
                <Route 
                  path="/tools/youtube-branding" 
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <YouTubeBranding />
                    </Suspense>
                  } 
                />
                
                {/* Downloader Tool Routes */}
                <Route 
                  path="/tools/youtube-video-downloader" 
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <YouTubeVideoDownloader />
                    </Suspense>
                  } 
                />
                <Route 
                  path="/tools/youtube-shorts-downloader" 
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <YouTubeShortsDownloader />
                    </Suspense>
                  } 
                />
                <Route 
                  path="/tools/youtube-thumbnail-downloader" 
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <YouTubeThumbnailDownloader />
                    </Suspense>
                  } 
                />
                <Route 
                  path="/tools/instagram-reels-downloader" 
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <InstagramReelsDownloader />
                    </Suspense>
                  } 
                />
                <Route 
                  path="/tools/instagram-story-downloader" 
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <InstagramStoryDownloader />
                    </Suspense>
                  } 
                />
                <Route 
                  path="/tools/facebook-video-downloader" 
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <FacebookVideoDownloader />
                    </Suspense>
                  } 
                />
                <Route 
                  path="/tools/facebook-reels-downloader" 
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <FacebookReelsDownloader />
                    </Suspense>
                  } 
                />
                <Route 
                  path="/tools/tiktok-video-downloader" 
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <TikTokVideoDownloader />
                    </Suspense>
                  } 
                />
                <Route 
                  path="/tools/twitter-video-downloader" 
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <TwitterVideoDownloader />
                    </Suspense>
                  } 
                />
                
                {/* Utility Tool Routes */}
                <Route 
                  path="/tools/fake-data-generator" 
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <FakeDataGenerator />
                    </Suspense>
                  } 
                />
                <Route 
                  path="/tools/password-generator" 
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <PasswordGenerator />
                    </Suspense>
                  } 
                />
                <Route 
                  path="/tools/image-compressor" 
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <ImageCompressor />
                    </Suspense>
                  } 
                />
                <Route 
                  path="/tools/image-format-converter" 
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <ImageFormatConverter />
                    </Suspense>
                  } 
                />
                
                {/* New Tool Routes */}
                <Route 
                  path="/tools/background-remover" 
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <BackgroundRemover />
                    </Suspense>
                  } 
                />
                <Route 
                  path="/tools/url-shortener" 
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <UrlShortener />
                    </Suspense>
                  } 
                />
                <Route 
                  path="/tools/age-calculator" 
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <AgeCalculator />
                    </Suspense>
                  } 
                />
                <Route 
                  path="/tools/sip-calculator" 
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <SipCalculator />
                    </Suspense>
                  } 
                />
                <Route 
                  path="/tools/image-resizer" 
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <ImageResizer />
                    </Suspense>
                  } 
                />
                <Route 
                  path="/tools/image-cropper" 
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <ImageCropper />
                    </Suspense>
                  } 
                />
                <Route 
                  path="/tools/text-to-speech" 
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <TextToSpeech />
                    </Suspense>
                  } 
                />
                <Route 
                  path="/tools/emi-calculator" 
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <EmiCalculator />
                    </Suspense>
                  } 
                />
                <Route 
                  path="/tools/gst-calculator" 
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <GstCalculator />
                    </Suspense>
                  } 
                />
                <Route 
                  path="/tools/article-generator" 
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <ArticleGenerator />
                    </Suspense>
                  } 
                />
                <Route 
                  path="/tools/name-customizer" 
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <NameCustomizer />
                    </Suspense>
                  } 
                />
                <Route 
                  path="/tools/cricket-score" 
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <CricketScore />
                    </Suspense>
                  } 
                />
                
                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
