
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";

const tools = [
  { name: "Personal Branding", path: "/tools/personal-branding" },
  { name: "Study Notes", path: "/tools/study-notes" },
  { name: "Business Names", path: "/tools/business-names" },
  { name: "Meme Marketing", path: "/tools/meme-marketing" },
  { name: "Business Ideas", path: "/tools/business-ideas" },
  { name: "Hook Generator", path: "/tools/hook-generator" },
  { name: "WhatsApp Marketing", path: "/tools/whatsapp-marketing" },
  { name: "YouTube Branding", path: "/tools/youtube-branding" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "py-3 glass shadow-sm" 
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link 
          to="/" 
          className="text-2xl font-bold font-display text-foreground flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <span className="text-gradient">Zyfoox</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <div className="relative group">
            <button className="px-4 py-2 rounded-lg text-foreground hover:bg-secondary transition-colors">
              Tools
            </button>
            <div className="absolute left-0 mt-1 w-56 rounded-xl overflow-hidden glass-card opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left">
              <div className="py-2">
                {tools.map((tool) => (
                  <Link
                    key={tool.path}
                    to={tool.path}
                    className="block px-4 py-2 hover:bg-secondary transition-colors"
                  >
                    {tool.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Link to="/blog" className="px-4 py-2 rounded-lg text-foreground hover:bg-secondary transition-colors">
            Blog
          </Link>
          <Link to="/pricing" className="px-4 py-2 rounded-lg text-foreground hover:bg-secondary transition-colors">
            Pricing
          </Link>
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-foreground hover:bg-secondary transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-card fixed inset-x-0 top-[60px] z-50 animate-fade-in animate-slide-in-bottom">
          <div className="px-4 py-5 space-y-1">
            <div className="space-y-1 mb-3">
              <p className="text-sm font-medium text-muted-foreground px-3 pb-1">
                Tools
              </p>
              {tools.map((tool) => (
                <Link
                  key={tool.path}
                  to={tool.path}
                  className="block px-3 py-2 rounded-lg hover:bg-secondary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {tool.name}
                </Link>
              ))}
            </div>
            <Link 
              to="/blog" 
              className="block px-3 py-2 rounded-lg hover:bg-secondary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link 
              to="/pricing" 
              className="block px-3 py-2 rounded-lg hover:bg-secondary transition-colors" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
