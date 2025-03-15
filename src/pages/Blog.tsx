
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Search, 
  Calendar, 
  Tag, 
  ChevronRight,
  Filter
} from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { blogPosts, getRecentPosts } from "@/data/blogPosts";

const uniqueCategories = Array.from(new Set(blogPosts.map(post => post.category)));
const uniqueTools = Array.from(new Set(blogPosts.map(post => post.tool)));

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = searchTerm === "" || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === null || post.category === selectedCategory;
    const matchesTool = selectedTool === null || post.tool === selectedTool;
    
    return matchesSearch && matchesCategory && matchesTool;
  });
  
  const recentPosts = getRecentPosts(3);
  
  const formatToolName = (toolId: string) => {
    return toolId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };
  
  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">AIToolbox Blog</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Expert insights, tutorials, and resources to help you leverage AI tools for maximum impact
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <div className="glass-card rounded-xl p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <Select onValueChange={(value) => setSelectedCategory(value === "all" ? null : value)}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {uniqueCategories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select onValueChange={(value) => setSelectedTool(value === "all" ? null : value)}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Tool" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Tools</SelectItem>
                    {uniqueTools.map(tool => (
                      <SelectItem key={tool} value={tool}>{formatToolName(tool)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-4">
              {filteredPosts.length > 0 ? (
                filteredPosts.map(post => (
                  <Link to={`/blog/${post.id}`} key={post.id}>
                    <Card className="overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col md:flex-row">
                      <div className="w-full md:w-1/3 h-48 md:h-auto">
                        <img 
                          src={post.imageUrl} 
                          alt={post.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="w-full md:w-2/3 p-6">
                        <div className="flex flex-wrap gap-2 mb-2">
                          <Badge variant="secondary" className="text-xs">
                            {formatToolName(post.tool)}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {post.category}
                          </Badge>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                        <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-1" />
                            {post.date}
                          </div>
                          <div className="flex items-center text-primary font-medium">
                            Read more
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No articles found matching your criteria.</p>
                  <button 
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory(null);
                      setSelectedTool(null);
                    }}
                    className="mt-4 text-primary hover:underline"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="glass-card rounded-xl p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Recent Articles</h2>
            <div className="space-y-4">
              {recentPosts.map(post => (
                <Link to={`/blog/${post.id}`} key={post.id} className="block">
                  <div className="flex gap-4 group">
                    <div className="w-20 h-20 flex-shrink-0">
                      <img 
                        src={post.imageUrl} 
                        alt={post.title} 
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{post.date}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          
          <div className="glass-card rounded-xl p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Categories</h2>
            <div className="space-y-2">
              {uniqueCategories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className="block w-full text-left px-3 py-2 rounded-md hover:bg-secondary transition-colors flex justify-between items-center"
                >
                  <span>{category}</span>
                  <span className="text-sm text-muted-foreground">
                    {blogPosts.filter(post => post.category === category).length}
                  </span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="glass-card rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Popular Tags</h2>
            <div className="flex flex-wrap gap-2">
              {Array.from(new Set(blogPosts.flatMap(post => post.tags)))
                .slice(0, 15)
                .map(tag => (
                  <Badge 
                    key={tag} 
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => setSearchTerm(tag)}
                  >
                    <Tag className="h-3 w-3 mr-1" /> {tag}
                  </Badge>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
