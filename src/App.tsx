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

// Tool Pages - Lazy loaded
const PersonalBranding = lazy(() => import("./pages/tools/PersonalBranding"));
const StudyNotes = lazy(() => import("./pages/tools/StudyNotes"));
const BusinessNames = lazy(() => import("./pages/tools/BusinessNames"));
const MemeMarketing = lazy(() => import("./pages/tools/MemeMarketing"));
const BusinessIdeas = lazy(() => import("./pages/tools/BusinessIdeas"));
const HookGenerator = lazy(() => import("./pages/tools/HookGenerator"));
const WhatsAppMarketing = lazy(() => import("./pages/tools/WhatsAppMarketing"));
const YouTubeBranding = lazy(() => import("./pages/tools/YouTubeBranding"));

const queryClient = new QueryClient();

const App = () => (
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
              
              {/* Tool Routes */}
              <Route path="/tools" element={<Navigate to="/tools/personal-branding" />} />
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
              
              {/* Other Routes */}
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/pricing" element={<NotFound />} />
              
              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
