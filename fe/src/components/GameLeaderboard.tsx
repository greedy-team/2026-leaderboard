import React from "react";
import type { LeaderboardResponse } from "../types/leaderboard";

interface GameLeaderboardProps {
    leaderboards: LeaderboardResponse[];
}

const getRankColorClass = (rank: number) => {
    if (rank === 1) return "rank-1";
    if (rank === 2) return "rank-2";
    if (rank === 3) return "rank-3";
    return "rank-normal";
};

export const GameLeaderboard: React.FC<GameLeaderboardProps> = ({
    leaderboards,
}) => {
    return (
        <section className="h-full min-h-0 flex flex-col">
            <h2 className="retro-title text-[40px] leading-none mb-5">
                MINI GAME RANKING
            </h2>

            <div className="grid grid-cols-4 gap-8">
                {leaderboards.map(({ gameName, unit, rankings }) => (
                    <article
                        key={gameName}
                        className="retro-card rounded-[10px] px-5 py-4 min-h-[340px]"
                    >
                        <h3 className="text-center text-[30px] leading-[1.15] font-black text-[#fff8dc] mb-3 h-[48px] flex items-center justify-center drop-shadow-[0_0_10px_rgba(255,248,220,0.7)]">
                            {gameName}
                        </h3>

                        {rankings.length === 0 ? (
                            <div className="retro-empty text-[17px]">NO RECORD</div>
                        ) : (
                            <div>
                                {rankings.slice(0, 5).map((ranking, index) => {
                                    const colorClass = getRankColorClass(ranking.rank);
                                    const displaySize = index + 1;

                                    return (
                                        <div
                                            className={`game-row game-size-${displaySize}`}
                                            key={`${gameName}-${ranking.rank}-${ranking.nickname}-${index}`}
                                        >
                                            <div className={`game-rank ${colorClass}`}>
                                                {ranking.rank}
                                            </div>

                                            <div className={`game-name ${colorClass}`}>
                                                {ranking.nickname}
                                            </div>

                                            <div className="game-score score-neon">
                                                {ranking.score}
                                                {unit}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </article>
                ))}
            </div>
        </section>
    );
};
