
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";

export default function Sitemap() {
  // Get unique tools from blog posts
  const toolCategories = Array.from(new Set(blogPosts.map((post) => post.tool)));

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <Helmet>
        <title>Sitemap - Zyfoox</title>
        <meta name="description" content="Complete sitemap of all pages on Zyfoox.com - Tools, blog posts, and more" />
      </Helmet>

      <h1 className="text-3xl md:text-4xl font-bold mb-8">Sitemap</h1>
      
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Main Pages</h2>
          <ul className="space-y-2">
            <li><Link to="/" className="text-primary hover:underline">Home</Link></li>
            <li><Link to="/about" className="text-primary hover:underline">About Us</Link></li>
            <li><Link to="/blog" className="text-primary hover:underline">Blog</Link></li>
            <li><Link to="/contact" className="text-primary hover:underline">Contact</Link></li>
          </ul>
        </section>
        
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Legal Pages</h2>
          <ul className="space-y-2">
            <li><Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link></li>
            <li><Link to="/terms" className="text-primary hover:underline">Terms of Service</Link></li>
            <li><Link to="/disclaimer" className="text-primary hover:underline">Disclaimer</Link></li>
            <li><Link to="/dmca" className="text-primary hover:underline">DMCA</Link></li>
          </ul>
        </section>
        
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">AI Tools</h2>
          <ul className="space-y-2">
            <li><Link to="/tools/personal-branding" className="text-primary hover:underline">Personal Branding Service</Link></li>
            <li><Link to="/tools/study-notes" className="text-primary hover:underline">Study Notes & Summaries</Link></li>
            <li><Link to="/tools/business-names" className="text-primary hover:underline">Business Names Generator</Link></li>
            <li><Link to="/tools/meme-marketing" className="text-primary hover:underline">Meme Marketing Generator</Link></li>
            <li><Link to="/tools/business-ideas" className="text-primary hover:underline">Business Ideas Generator</Link></li>
            <li><Link to="/tools/hook-generator" className="text-primary hover:underline">Hook Generator</Link></li>
            <li><Link to="/tools/whatsapp-marketing" className="text-primary hover:underline">WhatsApp Marketing</Link></li>
            <li><Link to="/tools/youtube-branding" className="text-primary hover:underline">YouTube Branding Service</Link></li>
          </ul>
        </section>
        
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Downloader Tools</h2>
          <ul className="space-y-2">
            <li><Link to="/tools/youtube-video-downloader" className="text-primary hover:underline">YouTube Video Downloader</Link></li>
            <li><Link to="/tools/youtube-shorts-downloader" className="text-primary hover:underline">YouTube Shorts Downloader</Link></li>
            <li><Link to="/tools/youtube-thumbnail-downloader" className="text-primary hover:underline">YouTube Thumbnail Downloader</Link></li>
            <li><Link to="/tools/instagram-reels-downloader" className="text-primary hover:underline">Instagram Reels Downloader</Link></li>
            <li><Link to="/tools/instagram-story-downloader" className="text-primary hover:underline">Instagram Story Downloader</Link></li>
            <li><Link to="/tools/facebook-video-downloader" className="text-primary hover:underline">Facebook Video Downloader</Link></li>
            <li><Link to="/tools/facebook-reels-downloader" className="text-primary hover:underline">Facebook Reels Downloader</Link></li>
            <li><Link to="/tools/tiktok-video-downloader" className="text-primary hover:underline">TikTok Video Downloader</Link></li>
            <li><Link to="/tools/twitter-video-downloader" className="text-primary hover:underline">Twitter Video Downloader</Link></li>
          </ul>
        </section>
        
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Utility Tools</h2>
          <ul className="space-y-2">
            <li><Link to="/tools/fake-data-generator" className="text-primary hover:underline">Fake Data Generator</Link></li>
            <li><Link to="/tools/password-generator" className="text-primary hover:underline">Password Generator</Link></li>
            <li><Link to="/tools/image-compressor" className="text-primary hover:underline">Image Compressor</Link></li>
            <li><Link to="/tools/image-format-converter" className="text-primary hover:underline">Image Format Converter</Link></li>
            <li><Link to="/tools/background-remover" className="text-primary hover:underline">Background Remover</Link></li>
            <li><Link to="/tools/url-shortener" className="text-primary hover:underline">URL Shortener</Link></li>
          </ul>
        </section>
        
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Blog Posts by Category</h2>
          
          {toolCategories.map(tool => {
            const toolPosts = blogPosts.filter(post => post.tool === tool);
            
            if (toolPosts.length === 0) return null;
            
            // Convert tool id to readable name
            const toolName = tool.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            
            return (
              <div key={tool} className="mb-8">
                <h3 className="text-xl font-medium mb-3">{toolName}</h3>
                <ul className="space-y-2 ml-4">
                  {toolPosts.map(post => (
                    <li key={post.id}>
                      <Link 
                        to={`/blog/${post.id}`} 
                        className="text-primary hover:underline"
                      >
                        {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
}
