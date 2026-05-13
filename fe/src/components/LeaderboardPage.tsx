import React, { useEffect, useState } from "react";
import axios from "axios";
import { OverallLeaderboard } from "../components/OverallLeaderboard";
import { GameLeaderboard } from "./GameLeaderboard";
import type { LeaderboardResponse } from "../types/leaderboard";
import { apiURL } from "../components/api/api";

const gameConfigs = [
    { apiName: "green-neck" },
    { apiName: "green-blue-white" },
    { apiName: "protect-baby-green" },
    { apiName: "quickness-game" },
] as const;

const LoadingSpinner = () => (
    <div className="retro-screen flex flex-col items-center justify-center">
        <div className="retro-title text-[42px]">LOADING...</div>
    </div>
);

export const LeaderboardPage: React.FC = () => {
    const [overall, setOverall] = useState<LeaderboardResponse | null>(null);
    const [gameLeaderboards, setGameLeaderboards] = useState<LeaderboardResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const overallRes = await axios.get<LeaderboardResponse>(
                    `${apiURL}/leader-board/overall`
                );
                setOverall(overallRes.data);

                const gameResults = await Promise.all(
                    gameConfigs.map(async ({ apiName }) => {
                        const res = await axios.get<LeaderboardResponse>(
                            `${apiURL}/leader-board/${apiName}`
                        );
                        return res.data;
                    })
                );

                setGameLeaderboards(gameResults);
                setError(null);
            } catch (error) {
                setError("데이터를 불러오지 못했습니다.");
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
                {overall && <OverallLeaderboard leaderboard={overall} />}
                <GameLeaderboard leaderboards={gameLeaderboards} />
            </main>
        </div>
    );
};
