package com.leaderboard.be.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record UserPhoneRequest(
        @NotBlank
        @Pattern(regexp = "^\\d{8}$") String phone
) {}
