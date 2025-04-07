
import { CricketMatch } from "@/types/cricket";
import { MatchCard } from "./MatchCard";

interface MatchListProps {
  matches: CricketMatch[];
  loading: boolean;
  emptyMessage: string;
  loadingMessage: string;
}

export const MatchList = ({ matches, loading, emptyMessage, loadingMessage }: MatchListProps) => {
  if (loading) {
    return <div className="text-center py-8">{loadingMessage}</div>;
  }
  
  if (matches.length === 0) {
    return (
      <div className="text-center py-8 bg-muted/30 rounded-lg">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {matches.map((match) => (
        <MatchCard key={match.id} match={match} />
      ))}
    </div>
  );
};
