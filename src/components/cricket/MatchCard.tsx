
import { Card } from "@/components/ui/card";
import { MatchStatusBadge } from "./MatchStatusBadge";
import { CricketMatch } from "@/types/cricket";
import { formatDate } from "@/utils/dateUtils";

interface MatchCardProps {
  match: CricketMatch;
}

export const MatchCard = ({ match }: MatchCardProps) => {
  return (
    <Card key={match.id} className="p-4 overflow-hidden">
      <div className="flex justify-between items-start mb-3">
        <div>
          <span className="text-xs font-medium text-muted-foreground">{match.matchType}</span>
          <h3 className="text-sm font-medium">{match.name}</h3>
        </div>
        <MatchStatusBadge status={match.status} />
      </div>
      
      {match.status !== "Match not started" ? (
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
      ) : (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <p>{match.teams.home.name}</p>
            <p>vs</p>
            <p>{match.teams.away.name}</p>
          </div>
        </div>
      )}
      
      <div className="mt-3 pt-3 border-t border-border">
        <p className="text-sm text-muted-foreground">
          {match.venue} • {formatDate(match.date)}
        </p>
        {match.status !== "Match not started" ? (
          <p className="text-sm font-medium mt-1">{match.result || match.status}</p>
        ) : (
          <p className="text-sm font-medium mt-1">{new Date(match.dateTimeGMT).toLocaleTimeString()}</p>
        )}
      </div>
    </Card>
  );
};
