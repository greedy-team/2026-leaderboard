package com.leaderboard.be.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record UserProfileRequest(
        @NotBlank @Size(max = 8, message = "닉네임은 8자 이하여야 합니다.") String nickname,
        @Pattern(regexp = "^\\d{8}$", message = "전화번호는 8자리 숫자여야 합니다.") String phone
) {}
