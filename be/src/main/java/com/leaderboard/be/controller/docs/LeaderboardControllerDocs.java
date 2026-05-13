package com.leaderboard.be.controller.docs;

import com.leaderboard.be.dto.GameRankingResponse;
import com.leaderboard.be.dto.LeaderboardResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Leaderboard", description = "리더보드 관련 API")
public interface LeaderboardControllerDocs {

    @Operation(summary = "게임별 순위 조회", description = """
            특정 게임의 상위 5명 순위를 조회합니다.

            사용 가능한 게임 이름 (gameName):
            - green-neck: 그린이 목 늘리기 (단위: 초, 낮을수록 좋음)
            - green-blue-white: 그린이 청기 백기 (단위: 점)
            - protect-baby-green: 아기 그린이 지키기 (단위: 점)
            - quickness-game: 순발력 게임 (단위: 점)

            응답의 unit 필드: 게임 점수 단위 (예: "초", "점")
            """)
    GameRankingResponse getSingleGameRankings(String gameName);

    @Operation(summary = "종합 순위 조회", description = "모든 게임을 합산한 종합 순위 상위 5명을 조회합니다.")
    LeaderboardResponse getOverallRanking();
}
