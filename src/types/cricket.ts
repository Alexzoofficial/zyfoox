
export interface Team {
  name_Full: string;
  name: string;
  shortname?: string;
}

export interface MatchDetail {
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

export interface Score {
  runs: number;
  wickets: number;
  overs: number;
}

export interface MatchScore {
  [key: string]: {
    inning1: Score;
    inning2?: Score;
  };
}

export interface CricketMatch {
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
