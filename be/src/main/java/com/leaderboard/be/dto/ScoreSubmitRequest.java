package com.leaderboard.be.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record ScoreSubmitRequest (
    @NotBlank(message = "게임 이름은 필수입니다.")
    String gameName,

    @NotBlank(message = "유저 식별 정보는 필수입니다.")
    String userId,

    @NotNull(message = "점수는 필수 항목입니다.") // 숫자형은 NotNull로 존재 여부 체크
    @Min(value = 0, message = "점수는 0 이상이어야 합니다.") // 0 이상인지 체크
    Double score

){}
