
import { CricketMatch } from "@/types/cricket";

const API_KEY = "3b1ecd5b-6ebe-484a-9e35-61858f00992e";

export const fetchCricketMatches = async (): Promise<CricketMatch[]> => {
  const response = await fetch(`https://api.cricapi.com/v1/currentMatches?apikey=${API_KEY}&offset=0`);
  
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }
  
  const data = await response.json();
  
  if (data.status !== "success") {
    throw new Error(data.message || "Failed to fetch cricket data");
  }
  
  return data.data || [];
};

export const filterLiveMatches = (matches: CricketMatch[]) => {
  return matches.filter(match => match.status !== "Match not started" && match.status !== "Match ended");
};

export const filterUpcomingMatches = (matches: CricketMatch[]) => {
  return matches.filter(match => match.status === "Match not started");
};

export const filterRecentMatches = (matches: CricketMatch[]) => {
  return matches.filter(match => match.status === "Match ended");
};
