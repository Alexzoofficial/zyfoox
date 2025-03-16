
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Calendar, User, Tag, ArrowLeft, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getPostById, getPostsByTool, type BlogPost as BlogPostType } from "@/data/blogPosts";

function renderMarkdown(content: string) {
  // Very basic markdown parsing for demonstration
  // In a real app, you would use a markdown parser library
  
  // Handle headers
  content = content.replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold my-4">$1</h1>');
  content = content.replace(/^## (.*$)/gm, '<h2 class="text-2xl font-semibold my-3">$1</h2>');
  content = content.replace(/^### (.*$)/gm, '<h3 class="text-xl font-semibold my-2">$1</h3>');
  
  // Handle paragraphs
  content = content.replace(/^(?!<h[1-6]|<ul|<ol|<li|<blockquote|<pre)(.+)$/gm, '<p class="my-4">$1</p>');
  
  // Handle bold
  content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Handle italic
  content = content.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Handle links
  content = content.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-primary hover:underline">$1</a>');
  
  // Handle lists
  content = content.replace(/^\- (.*$)/gm, '<li class="ml-6 list-disc my-1">$1</li>');
  
  return content;
}

export default function BlogPost() {
  const { id = "" } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchedPost = getPostById(id);
    
    if (fetchedPost) {
      setPost(fetchedPost);
      
      // Get related posts from the same tool category
      const related = getPostsByTool(fetchedPost.tool)
        .filter(p => p.id !== id)
        .slice(0, 3);
      
      setRelatedPosts(related);
    } else {
      // Post not found, redirect to blog page
      navigate("/blog");
    }
  }, [id, navigate]);
  
  if (!post) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p>Loading article...</p>
      </div>
    );
  }

  const formatToolName = (toolId: string) => {
    return toolId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const shareArticle = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href
      }).catch(err => {
        console.error('Error sharing:', err);
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      <div className="mb-6">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blog
        </Button>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <Link to={`/tools/${post.tool}`}>
            <Badge variant="secondary">
              {formatToolName(post.tool)}
            </Badge>
          </Link>
          <Badge variant="outline">
            {post.category}
          </Badge>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
        
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground mb-6">
          <div className="flex items-center">
            <User className="h-4 w-4 mr-2" />
            {post.author}
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            {post.date}
          </div>
          <button onClick={shareArticle} className="flex items-center hover:text-primary">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </button>
        </div>
      </div>
      
      <div className="mb-8">
        <img 
          src={post.imageUrl} 
          alt={post.title}
          className="w-full h-[400px] object-cover rounded-xl"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className="glass-card rounded-xl p-6 mb-8">
            <div 
              className="prose prose-lg max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
            />
            
            <Separator className="my-8" />
            
            <div className="flex flex-wrap gap-2 my-4">
              {post.tags.map(tag => (
                <Link to={`/blog?tag=${tag}`} key={tag}>
                  <Badge variant="outline" className="cursor-pointer">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="glass-card rounded-xl p-6 sticky top-24">
            <h3 className="text-lg font-semibold mb-4">Related Articles</h3>
            
            {relatedPosts.length > 0 ? (
              <div className="space-y-4">
                {relatedPosts.map(relatedPost => (
                  <Link to={`/blog/${relatedPost.id}`} key={relatedPost.id} className="block">
                    <div className="group">
                      <img 
                        src={relatedPost.imageUrl} 
                        alt={relatedPost.title}
                        className="w-full h-32 object-cover rounded-md mb-2"
                      />
                      <h4 className="font-medium group-hover:text-primary transition-colors">
                        {relatedPost.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {relatedPost.date}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No related articles found.</p>
            )}
            
            <div className="mt-6">
              <Link to={`/tools/${post.tool}`}>
                <Button className="w-full">
                  Try {formatToolName(post.tool)} Tool
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
