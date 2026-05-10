import React, { useEffect, useState } from "react";
import axios from "axios";
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
    <div className="retro-screen flex flex-col items-center justify-center">
        <div className="retro-title text-[42px]">LOADING...</div>
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
            <div className="retro-screen flex items-center justify-center">
                <div className="retro-title text-[36px]">{error}</div>
            </div>
        );
    }

    return (
        <div className="retro-screen">
            <main className="retro-content">
                <OverallLeaderboard players={overall} />
                <GameLeaderboard gameScores={gameScores} titles={gameTitles} />
            </main>
        </div>
    );
};
