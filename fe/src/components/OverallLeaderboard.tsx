import React from "react";
import type { LeaderboardResponse } from "../types/leaderboard";

interface OverallLeaderboardProps {
    leaderboard: LeaderboardResponse;
}

const getRankColorClass = (rank: number) => {
    if (rank === 1) return "rank-1";
    if (rank === 2) return "rank-2";
    if (rank === 3) return "rank-3";
    return "rank-normal";
};

export const OverallLeaderboard: React.FC<OverallLeaderboardProps> = ({
    leaderboard,
}) => {
    const topRankings = leaderboard.rankings.slice(0, 5);

    return (
        <section className="h-full flex flex-col max-w-[1080px] mx-auto w-full">
            <h1 className="retro-title text-[60px] leading-none mb-4 flex items-center justify-center gap-4">
                <span>🏆</span>
                <span>TOTAL LEADERBOARD</span>
            </h1>

            <div className="retro-panel rounded-[10px] px-14 py-8 flex-1 min-h-[400px]">
                <div className="grid grid-cols-[90px_520px_1fr] gap-[22px] mb-1 text-[16px] font-black text-[#ff2d75]">
                    <div>RANK</div>
                    <div>PLAYER</div>
                    <div className="text-right">SCORE</div>
                </div>

                {topRankings.length === 0 ? (
                    <div className="retro-empty">NO DATA</div>
                ) : (
                    <div>
                        {topRankings.map((ranking, index) => {
                            const colorClass = getRankColorClass(ranking.rank);
                            const displaySize = index + 1;

                            return (
                                <div
                                    className={`overall-row overall-size-${displaySize}`}
                                    key={`${ranking.rank}-${ranking.nickname}-${index}`}
                                >
                                    <div className={`overall-rank ${colorClass}`}>
                                        {String(ranking.rank).padStart(2, "0")}
                                    </div>

                                    <div className={`overall-name ${colorClass}`}>
                                        {ranking.nickname}
                                    </div>

                                    <div className="overall-score score-neon">
                                        {ranking.score}점
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};
