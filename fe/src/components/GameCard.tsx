import React from "react";
import type { Ranking } from "../types/leaderboard";

interface Props {
  title: string;
  unit: string;
  rankings: Ranking[];
  left: number;
}

export const GameCard: React.FC<Props> = ({ title, unit, rankings, left }) => (
  <div className="w-[300px] h-[360px] absolute top-[100px]" style={{ left }}>
    <div className="w-full h-full bg-white rounded-[25px] shadow-[0_4px_20px_rgba(0,0,0,0.25)] relative px-4 pt-6 pb-4">
      <h3 className="text-3xl font-bold absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-center">
        {title}
      </h3>
      <div className="mt-[80px] flex flex-col items-center">
        <ol className="space-y-3">
          {rankings.slice(0, 5).map((ranking, index) => (
            <li key={`${ranking.rank}-${ranking.nickname}-${index}`} className="text-lg font-bold whitespace-nowrap">
              {ranking.rank} - {ranking.nickname} ({ranking.score}
              {unit})
            </li>
          ))}
        </ol>
      </div>
    </div>
  </div>
);
