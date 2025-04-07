import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Activity } from "lucide-react";
import ToolHero from "@/components/tools/ToolHero";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define types for cricket data
interface Team {
  name_Full: string;
  name: string;
  shortname?: string;
}

interface MatchDetail {
  match_id: string;
  series_id: string;
  series_name: string;
  matchFormat: string;
  status: string;
  status_note: string;
  venue: string;
  date: string;
  dateTimeGMT: string;
  teams: {
    home: Team;
    away: Team;
  };
  tossResults: {
    tossWinner: string;
    decision: string;
  };
}

interface Score {
  runs: number;
  wickets: number;
  overs: number;
}

interface MatchScore {
  [key: string]: {
    inning1: Score;
    inning2?: Score;
  };
}

interface CricketMatch {
  id: string;
  name: string;
  matchType: string;
  status: string;
  venue: string;
  date: string;
  dateTimeGMT: string;
  teams: {
    home: Team;
    away: Team;
  };
  score?: MatchScore;
  scorecard?: any;
  tossResults?: {
    tossWinner: string;
    decision: string;
  };
  result?: string;
  currentInnings?: string;
}

export default function CricketScore() {
  const [matches, setMatches] = useState<CricketMatch[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("live");
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const { toast } = useToast();

  const API_KEY = "3b1ecd5b-6ebe-484a-9e35-61858f00992e";

  const fetchMatches = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Get current matches (live, upcoming and recent)
      const response = await fetch(`https://api.cricapi.com/v1/currentMatches?apikey=${API_KEY}&offset=0`);
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.status !== "success") {
        throw new Error(data.message || "Failed to fetch cricket data");
      }
      
      setMatches(data.data || []);
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
    fetchMatches();
    
    // Set up polling every 2 minutes
    const intervalId = setInterval(() => {
      fetchMatches();
    }, 2 * 60 * 1000); // 2 minutes
    
    return () => clearInterval(intervalId);
  }, []);

  const getLiveMatches = () => {
    return matches.filter(match => match.status !== "Match not started" && match.status !== "Match ended");
  };

  const getUpcomingMatches = () => {
    return matches.filter(match => match.status === "Match not started");
  };

  const getRecentMatches = () => {
    return matches.filter(match => match.status === "Match ended");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getMatchStatusBadge = (status: string) => {
    if (status === "Match not started") {
      return <Badge variant="outline" className="bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-300">Upcoming</Badge>;
    } else if (status === "Match ended") {
      return <Badge variant="outline" className="bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-300">Completed</Badge>;
    } else {
      return <Badge variant="outline" className="bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-300">Live</Badge>;
    }
  };

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
            onClick={fetchMatches} 
            disabled={loading}
            className="flex items-center gap-2"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            Refresh
          </Button>
        </div>

        <Tabs defaultValue="live" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="live" className="relative">
              Live
              {getLiveMatches().length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  {getLiveMatches().length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
          </TabsList>
          
          <TabsContent value="live" className="space-y-4">
            {loading && <div className="text-center py-8">Loading live matches...</div>}
            
            {!loading && getLiveMatches().length === 0 && (
              <div className="text-center py-8 bg-muted/30 rounded-lg">
                <p className="text-muted-foreground">No live matches at the moment</p>
              </div>
            )}
            
            {!loading && getLiveMatches().map((match) => (
              <Card key={match.id} className="p-4 overflow-hidden">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="text-xs font-medium text-muted-foreground">{match.matchType}</span>
                    <h3 className="text-sm font-medium">{match.name}</h3>
                  </div>
                  {getMatchStatusBadge(match.status)}
                </div>
                
                <div className="space-y-4">
                  {match.score && Object.keys(match.score).map((teamName) => {
                    const teamScore = match.score![teamName];
                    return (
                      <div key={teamName} className="flex justify-between items-center">
                        <div className="flex-1">
                          <p className="font-medium">{teamName}</p>
                        </div>
                        <div className="text-right">
                          {teamScore.inning1 && (
                            <p className="font-bold">
                              {teamScore.inning1.runs}/{teamScore.inning1.wickets} 
                              <span className="text-sm font-normal ml-1">
                                ({teamScore.inning1.overs} ov)
                              </span>
                            </p>
                          )}
                          {teamScore.inning2 && (
                            <p className="text-sm">
                              & {teamScore.inning2.runs}/{teamScore.inning2.wickets} 
                              <span className="text-xs font-normal ml-1">
                                ({teamScore.inning2.overs} ov)
                              </span>
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    {match.venue} • {formatDate(match.date)}
                  </p>
                  <p className="text-sm font-medium mt-1">{match.status}</p>
                </div>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="upcoming" className="space-y-4">
            {loading && <div className="text-center py-8">Loading upcoming matches...</div>}
            
            {!loading && getUpcomingMatches().length === 0 && (
              <div className="text-center py-8 bg-muted/30 rounded-lg">
                <p className="text-muted-foreground">No upcoming matches found</p>
              </div>
            )}
            
            {!loading && getUpcomingMatches().map((match) => (
              <Card key={match.id} className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="text-xs font-medium text-muted-foreground">{match.matchType}</span>
                    <h3 className="text-sm font-medium">{match.name}</h3>
                  </div>
                  {getMatchStatusBadge(match.status)}
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <p>{match.teams.home.name}</p>
                    <p>vs</p>
                    <p>{match.teams.away.name}</p>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    {match.venue} • {formatDate(match.date)}
                  </p>
                  <p className="text-sm font-medium mt-1">{new Date(match.dateTimeGMT).toLocaleTimeString()}</p>
                </div>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="recent" className="space-y-4">
            {loading && <div className="text-center py-8">Loading recent matches...</div>}
            
            {!loading && getRecentMatches().length === 0 && (
              <div className="text-center py-8 bg-muted/30 rounded-lg">
                <p className="text-muted-foreground">No recent matches found</p>
              </div>
            )}
            
            {!loading && getRecentMatches().map((match) => (
              <Card key={match.id} className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="text-xs font-medium text-muted-foreground">{match.matchType}</span>
                    <h3 className="text-sm font-medium">{match.name}</h3>
                  </div>
                  {getMatchStatusBadge(match.status)}
                </div>
                
                <div className="space-y-4">
                  {match.score && Object.keys(match.score).map((teamName) => {
                    const teamScore = match.score![teamName];
                    return (
                      <div key={teamName} className="flex justify-between items-center">
                        <div className="flex-1">
                          <p className="font-medium">{teamName}</p>
                        </div>
                        <div className="text-right">
                          {teamScore.inning1 && (
                            <p className="font-bold">
                              {teamScore.inning1.runs}/{teamScore.inning1.wickets} 
                              <span className="text-sm font-normal ml-1">
                                ({teamScore.inning1.overs} ov)
                              </span>
                            </p>
                          )}
                          {teamScore.inning2 && (
                            <p className="text-sm">
                              & {teamScore.inning2.runs}/{teamScore.inning2.wickets} 
                              <span className="text-xs font-normal ml-1">
                                ({teamScore.inning2.overs} ov)
                              </span>
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    {match.venue} • {formatDate(match.date)}
                  </p>
                  {match.result && <p className="text-sm font-medium mt-1">{match.result}</p>}
                </div>
              </Card>
            ))}
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
