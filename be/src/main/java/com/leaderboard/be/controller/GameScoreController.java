package com.leaderboard.be.controller;

import com.leaderboard.be.controller.docs.GameScoreControllerDocs;
import com.leaderboard.be.dto.ScoreSubmitRequest;
import com.leaderboard.be.dto.ScoreSubmitResponse;
import com.leaderboard.be.dto.ScoreUpdateResponse;
import com.leaderboard.be.service.GameScoreService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class GameScoreController implements GameScoreControllerDocs {

    private final GameScoreService gameScoreService;
    //service 호출해서 처리 맡김

    @Value("${api.key}")
    private String apiKey;

    @PostMapping("/result") //post/api/result 요청 받음
    public ResponseEntity<ScoreSubmitResponse> registerGameResult(@Valid @RequestBody ScoreSubmitRequest request) {
        if (!apiKey.equals(request.apiKey())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ScoreSubmitResponse.builder()
                            .status("UNAUTHORIZED")
                            .message("인증 키가 올바르지 않습니다.")
                            .build());
        }
        //들어오는 데이터(id,gamename, score가 ScoreSubmitRequest request에 담김)
        ScoreSubmitResponse response = gameScoreService.processGameResult(request);
        //서비스가 처리
        if ("CREATED".equals(response.status())) {
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        }//새로 생성된 점수면 201 상태코드 반환
        return ResponseEntity.ok(response); //그 외에는 200 ok
        //처음 등록한 경우> CREATED(201) , 업데이트 및 유지 > OK(200)
    }

    @PostMapping("/scores/force") //점수 강제 수정 api
    public ResponseEntity<ScoreUpdateResponse> forceUpdateUserScore(@Valid @RequestBody ScoreSubmitRequest request) {
        if (!apiKey.equals(request.apiKey())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ScoreUpdateResponse.builder()
                            .status("UNAUTHORIZED")
                            .message("인증 키가 올바르지 않습니다.")
                            .build());
        }

        return ResponseEntity.ok(gameScoreService.forceUpdateScore(request));
        // OK(200)
    }
}
