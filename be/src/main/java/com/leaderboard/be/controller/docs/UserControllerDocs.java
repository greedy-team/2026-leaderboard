package com.leaderboard.be.controller.docs;

import com.leaderboard.be.dto.UserInfoResponse;
import com.leaderboard.be.dto.UserProfileRequest;
import com.leaderboard.be.dto.UserProfileResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;

@Tag(name = "User", description = "유저 관련 API")
public interface UserControllerDocs {

    @Operation(summary = "유저 생성", description = "닉네임과 전화번호로 신규 유저를 등록합니다. 이미 등록된 전화번호면 기존 유저 정보를 반환합니다.")
    ResponseEntity<UserProfileResponse> createUser(UserProfileRequest request);

    @Operation(summary = "유저 조회 (ID)", description = "userId로 유저 정보를 조회합니다.")
    ResponseEntity<UserInfoResponse> getUserById(String userId);

    @Operation(summary = "유저 조회 (전화번호)", description = "전화번호 뒷 8자리(숫자만)로 유저 정보를 조회합니다. 예: 12345678")
    ResponseEntity<UserProfileResponse> getUserByPhone(@RequestParam String phone);
}
