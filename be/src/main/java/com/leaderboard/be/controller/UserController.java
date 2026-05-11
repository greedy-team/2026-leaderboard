package com.leaderboard.be.controller;

import com.leaderboard.be.controller.docs.UserControllerDocs;
import com.leaderboard.be.dto.UserInfoResponse;
import com.leaderboard.be.dto.UserProfileRequest;
import com.leaderboard.be.dto.UserProfileResponse;
import com.leaderboard.be.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Validated
public class UserController implements UserControllerDocs {

    private final UserService userService;

    @PostMapping
    public ResponseEntity<UserProfileResponse> createUser(
            @RequestBody @Valid UserProfileRequest request
    ) {
        return ResponseEntity.ok(userService.createUser(request));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserInfoResponse> getUserById(
            @PathVariable String userId
    ) {
        return ResponseEntity.ok(userService.getUserById(userId));
    }

    @GetMapping("/phone")
    public ResponseEntity<UserProfileResponse> getUserByPhone(
            @RequestParam String phone
    ) {
        return ResponseEntity.ok(userService.getUserByPhone(phone));
    }
}
