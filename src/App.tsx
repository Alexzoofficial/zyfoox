
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

// Layouts
import Layout from "./components/layout/Layout";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

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
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            
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
            
            {/* Placeholder Routes */}
            <Route path="/tools/study-notes" element={<NotFound />} />
            <Route path="/tools/business-names" element={<NotFound />} />
            <Route path="/tools/meme-marketing" element={<NotFound />} />
            <Route path="/tools/business-ideas" element={<NotFound />} />
            <Route path="/tools/hook-generator" element={<NotFound />} />
            <Route path="/tools/whatsapp-marketing" element={<NotFound />} />
            <Route path="/tools/youtube-branding" element={<NotFound />} />
            
            {/* Other Routes */}
            <Route path="/blog" element={<NotFound />} />
            <Route path="/pricing" element={<NotFound />} />
            <Route path="/about" element={<NotFound />} />
            <Route path="/contact" element={<Navigate to="/" />} />
            <Route path="/privacy" element={<NotFound />} />
            <Route path="/terms" element={<NotFound />} />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
