package com.leaderboard.be.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record UserProfileRequest(
        @NotBlank String nickname,
        @Pattern(regexp = "^\\d{8}$", message = "전화번호는 8자리 숫자여야 합니다.") String phone
) {}
