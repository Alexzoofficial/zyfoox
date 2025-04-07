
import { Badge } from "@/components/ui/badge";

interface MatchStatusBadgeProps {
  status: string;
}

export const MatchStatusBadge = ({ status }: MatchStatusBadgeProps) => {
  if (status === "Match not started") {
    return <Badge variant="outline" className="bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-300">Upcoming</Badge>;
  } else if (status === "Match ended") {
    return <Badge variant="outline" className="bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-300">Completed</Badge>;
  } else {
    return <Badge variant="outline" className="bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-300">Live</Badge>;
  }
};
