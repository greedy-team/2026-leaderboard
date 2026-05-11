package com.leaderboard.be.controller.docs;

import com.leaderboard.be.dto.ScoreSubmitRequest;
import com.leaderboard.be.dto.ScoreSubmitResponse;
import com.leaderboard.be.dto.ScoreUpdateResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;

@Tag(name = "GameScore", description = "게임 점수 관련 API")
public interface GameScoreControllerDocs {

    @Operation(summary = "게임 결과 등록", description = """
            유저의 게임 점수를 등록합니다. 기존 최고 점수보다 좋으면 갱신됩니다.

            사용 가능한 게임 이름 (gameName):
            - green-neck: 그린이 목 늘리기
            - green-blue-white: 그린이 청기 백기
            - protect-baby-green: 아기 그린이 지키기
            - quickness-game: 순발력 게임
            """)
    ResponseEntity<ScoreSubmitResponse> registerGameResult(ScoreSubmitRequest request);

    @Operation(summary = "점수 강제 수정", description = """
            관리자 권한으로 유저의 게임 점수를 강제로 수정합니다.

            사용 가능한 게임 이름 (gameName):
            - green-neck: 그린이 목 늘리기
            - green-blue-white: 그린이 청기 백기
            - protect-baby-green: 아기 그린이 지키기
            - quickness-game: 순발력 게임
            """)
    ResponseEntity<ScoreUpdateResponse> forceUpdateUserScore(ScoreSubmitRequest request);
}
