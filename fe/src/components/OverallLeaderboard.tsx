import React from "react";
import type { Player } from "../types/leaderboard";

interface OverallLeaderboardProps {
    players: Player[];
}

const getRankColorClass = (rank: number) => {
    if (rank === 1) return "rank-1";
    if (rank === 2) return "rank-2";
    if (rank === 3) return "rank-3";
    return "rank-normal";
};

export const OverallLeaderboard: React.FC<OverallLeaderboardProps> = ({
                                                                          players,
                                                                      }) => {
    const topPlayers = players.slice(0, 5);

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

                {topPlayers.length === 0 ? (
                    <div className="retro-empty">NO DATA</div>
                ) : (
                    <div>
                        {topPlayers.map((player, index) => {
                            const rank = index + 1;
                            const colorClass = getRankColorClass(rank);

                            return (
                                <div className={`overall-row overall-size-${rank}`} key={`${player.name}-${index}`}>
                                    <div className={`overall-rank ${colorClass}`}>
                                        {String(rank).padStart(2, "0")}
                                    </div>

                                    <div className={`overall-name ${colorClass}`}>
                                        {player.name}
                                    </div>

                                    <div className="overall-score score-neon">
                                        {player.score}점
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
