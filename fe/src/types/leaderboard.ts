export interface Ranking {
  rank: number;
  nickname: string;
  score: number;
}

export interface LeaderboardResponse {
  gameName: string;
  unit: string;
  rankings: Ranking[];
}
