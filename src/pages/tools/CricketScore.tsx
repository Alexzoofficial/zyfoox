
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Activity, RotateCw } from "lucide-react";
import ToolHero from "@/components/tools/ToolHero";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MatchList } from "@/components/cricket/MatchList";
import { CricketMatch } from "@/types/cricket";
import { 
  fetchCricketMatches, 
  filterLiveMatches, 
  filterUpcomingMatches, 
  filterRecentMatches 
} from "@/services/cricketService";

export default function CricketScore() {
  const [matches, setMatches] = useState<CricketMatch[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("live");
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const { toast } = useToast();

  const handleFetchMatches = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchCricketMatches();
      setMatches(data);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Error fetching cricket data:", err);
      setError(err instanceof Error ? err.message : "Unknown error occurred");
      toast({
        title: "Error fetching cricket data",
        description: err instanceof Error ? err.message : "Unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchMatches();
    
    // Set up polling every 2 minutes
    const intervalId = setInterval(() => {
      handleFetchMatches();
    }, 2 * 60 * 1000); // 2 minutes
    
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Helmet>
        <title>Live Cricket Scores & Updates | Zyfoox</title>
        <meta 
          name="description" 
          content="Get real-time cricket scores, match details, and updates from around the world. Follow international matches, IPL, T20 leagues and more." 
        />
        <meta 
          name="keywords" 
          content="cricket score, live cricket, cricket match, IPL score, T20 cricket, test match score, cricket scoreboard" 
        />
      </Helmet>

      <ToolHero
        title="Live Cricket Scores"
        description="Get real-time cricket scores and match updates from around the world."
        icon={<Activity size={24} />}
      />

      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold">Match Center</h2>
            <p className="text-sm text-muted-foreground">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={handleFetchMatches} 
            disabled={loading}
            className="flex items-center gap-2"
          >
            <RotateCw size={16} className={loading ? "animate-spin" : ""} />
            Refresh
          </Button>
        </div>

        <Tabs defaultValue="live" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="live" className="relative">
              Live
              {filterLiveMatches(matches).length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  {filterLiveMatches(matches).length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
          </TabsList>
          
          <TabsContent value="live">
            <MatchList 
              matches={filterLiveMatches(matches)} 
              loading={loading} 
              emptyMessage="No live matches at the moment" 
              loadingMessage="Loading live matches..." 
            />
          </TabsContent>
          
          <TabsContent value="upcoming">
            <MatchList 
              matches={filterUpcomingMatches(matches)} 
              loading={loading} 
              emptyMessage="No upcoming matches found" 
              loadingMessage="Loading upcoming matches..." 
            />
          </TabsContent>
          
          <TabsContent value="recent">
            <MatchList 
              matches={filterRecentMatches(matches)} 
              loading={loading} 
              emptyMessage="No recent matches found" 
              loadingMessage="Loading recent matches..." 
            />
          </TabsContent>
        </Tabs>
        
        <div className="mt-12 prose prose-gray dark:prose-invert max-w-none">
          <h2>Cricket Score Tool</h2>
          <p>
            Stay up to date with the latest cricket action from around the world with our live cricket score tool. 
            Whether you're following international matches, IPL, T20 leagues, or Test cricket, get real-time updates 
            on scores, wickets, and match status.
          </p>
          
          <h3>Features of Our Cricket Score Tool</h3>
          <ul>
            <li><strong>Live Scores:</strong> Real-time updates for ongoing matches with ball-by-ball information.</li>
            <li><strong>Match Details:</strong> Comprehensive information including venue, match type, and team lineups.</li>
            <li><strong>Upcoming Fixtures:</strong> Stay informed about upcoming cricket matches with dates and times.</li>
            <li><strong>Recent Results:</strong> Quick access to recently concluded matches and their outcomes.</li>
            <li><strong>Auto-Refresh:</strong> Scores update automatically every 2 minutes to keep you informed.</li>
          </ul>
          
          <h3>Why Follow Cricket Scores Online?</h3>
          <p>
            Cricket is a global sport with matches happening across different time zones. Our cricket score tool gives you the 
            convenience of following multiple matches simultaneously, getting instant notifications for wickets and other key 
            events, and having access to in-depth statistics and commentary - all from a single dashboard.
          </p>
          
          <h3>How to Use This Tool</h3>
          <ol>
            <li><strong>View Live Matches:</strong> The "Live" tab displays all currently ongoing cricket matches.</li>
            <li><strong>Check Upcoming Matches:</strong> Switch to the "Upcoming" tab to see scheduled fixtures.</li>
            <li><strong>Review Recent Results:</strong> The "Recent" tab shows recently concluded matches with results.</li>
            <li><strong>Refresh Data:</strong> Click the refresh button to get the latest updates manually.</li>
          </ol>
          
          <p>
            Whether you're a cricket fan following your favorite team or just want to keep track of important tournaments, 
            our cricket score tool provides you with a reliable and convenient way to stay connected to the game you love.
          </p>
        </div>
      </div>
    </>
  );
}
