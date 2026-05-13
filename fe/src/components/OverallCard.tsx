import React from "react";
import type { Ranking } from "../types/leaderboard";

interface OverallCardProps {
  ranking: Ranking;
  unit: string;
  left: number;
  barHeight: number;
  barTop: number;
  barColor: string;
  medal?: string;
  medalFs?: string;
}

export const OverallCard: React.FC<OverallCardProps> = ({
  ranking,
  unit,
  left,
  barHeight,
  barTop,
  barColor,
  medal,
  medalFs = "",
}) => {
  const nameTop = barTop - 83;

  return (
    <div className="w-60 h-[340px] absolute" style={{ left, top: 80 }}>
      <div
        className="w-48 absolute left-[23px]"
        style={{ height: barHeight, top: barTop, backgroundColor: barColor }}
      />

      {medal && (
        <p
          className={`absolute left-1/2 -translate-x-1/2 -translate-y-1/4 font-bold text-black ${medalFs}`}
          style={{ top: barTop + 25 }}
        >
          {medal}
        </p>
      )}

      <p
        className="absolute left-1/2 -translate-x-1/2 text-center font-bold text-black"
        style={{ top: nameTop }}
      >
        <span className="block text-[32px] whitespace-nowrap overflow-hidden text-ellipsis max-w-[220px]">
          {ranking.nickname}
        </span>
        <span className="text-2xl">
          {ranking.score}
          {unit}
        </span>
      </p>
    </div>
  );
};
