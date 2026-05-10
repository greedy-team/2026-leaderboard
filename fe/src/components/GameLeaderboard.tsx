import React from "react";
import type {GameScore} from "../types/leaderboard";

interface GameLeaderboardProps {
    gameScores: Record<string, GameScore[]>;
    titles: string[];
}

const getRankColorClass = (rank: number) => {
    if (rank === 1) return "rank-1";
    if (rank === 2) return "rank-2";
    if (rank === 3) return "rank-3";
    return "rank-normal";
};

const getGameSizeClass = (rank: number) => {
    if (rank === 1) {
        return {
            rank: "text-[22px]",
            name: "text-[22px]",
            score: "text-[22px]",
            row: "py-[7px]",
        };
    }

    if (rank === 2) {
        return {
            rank: "text-[20px]",
            name: "text-[20px]",
            score: "text-[20px]",
            row: "py-[6px]",
        };
    }

    if (rank === 3) {
        return {
            rank: "text-[19px]",
            name: "text-[19px]",
            score: "text-[19px]",
            row: "py-[5px]",
        };
    }

    return {
        rank: "text-[17px]",
        name: "text-[17px]",
        score: "text-[17px]",
        row: "py-[4px]",
    };
};

export const GameLeaderboard: React.FC<GameLeaderboardProps> = ({
                                                                    gameScores,
                                                                    titles,
                                                                }) => {
    return (
        <section className="h-full min-h-0 flex flex-col">
            <h2 className="retro-title text-[34px] leading-none mb-5">
                🎮 MINI GAME RANKING
            </h2>

            <div className="grid grid-cols-4 gap-8 flex-1 min-h-0">
                {titles.map((title) => {
                    const scores = gameScores[title] ?? [];

                    return (
                        <article
                            key={title}
                            className="retro-card rounded-[10px] px-5 py-4 h-full min-h-0"
                        >
                            <h3 className="text-center text-[22px] leading-[1.15] font-black text-[#fff45c] mb-3 h-[48px] flex items-center justify-center">
                                {title}
                            </h3>

                            {scores.length === 0 ? (
                                <div className="retro-empty text-[17px]">NO RECORD</div>
                            ) : (
                                <div>
                                    {scores.slice(0, 5).map((score, index) => {
                                        const rank = index + 1;
                                        const colorClass = getRankColorClass(rank);

                                        return (
                                            <div
                                                className={`game-row game-size-${rank}`}
                                                key={`${title}-${score.name}-${index}`}
                                            >
                                                <div className={`game-rank ${colorClass}`}>
                                                    {rank}
                                                </div>

                                                <div className={`game-name ${colorClass}`}>
                                                    {score.name}
                                                </div>

                                                <div className="game-score score-neon">
                                                    {score.score}점
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </article>
                    );
                })}
            </div>
        </section>
    );
};
