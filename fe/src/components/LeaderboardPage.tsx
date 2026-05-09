import React, { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "../components/Header";
import { OverallLeaderboard } from "../components/OverallLeaderboard";
import { GameLeaderboard } from "./GameLeaderboard";
import type { Player, GameScore } from "../types/leaderboard";
import { apiURL } from "../components/api/api";

const gameConfigs = [
  { title: "그린이 목 늘리기", apiName: "green-neck" },
  { title: "그린이 청기 백기", apiName: "green-blue-white" },
  { title: "아기 그린이 지키기", apiName: "protect-baby-green" },
  { title: "순발력 게임", apiName: "quickness-game" },
] as const;

const gameTitles = gameConfigs.map((game) => game.title);

const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#007354]"></div>
      <p className="mt-4 text-gray-600">로딩 중...</p>
    </div>
);

export const LeaderboardPage: React.FC = () => {
  const [overall, setOverall] = useState<Player[]>([]);
  const [gameScores, setGameScores] = useState<Record<string, GameScore[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const overallRes = await axios.get(`${apiURL}/leader-board/overall`);

        const overallPlayers: Player[] = overallRes.data.rankings.map(
            (entry: any) => ({
              name: entry.nickname,
              score: entry.score,
            })
        );

        setOverall(overallPlayers);

        const gameResults = await Promise.all(
            gameConfigs.map(async ({ title, apiName }) => {
              const res = await axios.get(`${apiURL}/leader-board/${apiName}`);

              const scores: GameScore[] = res.data.rankings.map((entry: any) => ({
                name: entry.nickname,
                score: entry.score,
              }));

              return [title, scores] as [string, GameScore[]];
            })
        );

        setGameScores(Object.fromEntries(gameResults));
        setError(null);
      } catch (error) {
        setError("데이터를 불러오는데 실패했습니다.");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
        <div className="flex justify-center items-center h-screen text-red-500">
          {error}
        </div>
    );
  }

  return (
      <div className="min-w-[1440px] min-h-[1024px] relative overflow-visible bg-white font-sans">
        <Header />
        <OverallLeaderboard players={overall} />
        <GameLeaderboard gameScores={gameScores} titles={gameTitles} />
      </div>
  );
};
