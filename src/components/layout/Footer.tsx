
import { Github, Twitter, Instagram, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary mt-20 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <Link to="/" className="text-2xl font-bold font-display text-gradient mb-4 inline-block">
              Zyfoox
            </Link>
            <p className="text-muted-foreground mt-2 mb-4">
              AI-powered tools to supercharge your digital presence, content creation, and business. 
              All our tools are completely free to use with no limitations.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Github">
                <Github size={20} />
              </a>
              <a href="mailto:contact@zyfoox.com" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Email">
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-4">Tools</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/tools/personal-branding" className="text-muted-foreground hover:text-foreground transition-colors">
                  Personal Branding
                </Link>
              </li>
              <li>
                <Link to="/tools/study-notes" className="text-muted-foreground hover:text-foreground transition-colors">
                  Study Notes
                </Link>
              </li>
              <li>
                <Link to="/tools/business-names" className="text-muted-foreground hover:text-foreground transition-colors">
                  Business Names
                </Link>
              </li>
              <li>
                <Link to="/tools/meme-marketing" className="text-muted-foreground hover:text-foreground transition-colors">
                  Meme Marketing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-4">More Tools</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/tools/business-ideas" className="text-muted-foreground hover:text-foreground transition-colors">
                  Business Ideas
                </Link>
              </li>
              <li>
                <Link to="/tools/hook-generator" className="text-muted-foreground hover:text-foreground transition-colors">
                  Hook Generator
                </Link>
              </li>
              <li>
                <Link to="/tools/whatsapp-marketing" className="text-muted-foreground hover:text-foreground transition-colors">
                  WhatsApp Marketing
                </Link>
              </li>
              <li>
                <Link to="/tools/youtube-branding" className="text-muted-foreground hover:text-foreground transition-colors">
                  YouTube Branding
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                  Free Access
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            &copy; {currentYear} Zyfoox. All rights reserved. All tools are completely free.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
