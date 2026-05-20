package com.leaderboard.be.service;

import com.leaderboard.be.dto.*;
import com.leaderboard.be.entity.User;
import com.leaderboard.be.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Random;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

    private final UserRepository userRepository;

    @Transactional
    public UserProfileResponse createUser(UserProfileRequest request) {
        if (request.phone() != null) {
            java.util.Optional<User> existingByPhone = userRepository.findByPhone(request.phone());
            if (existingByPhone.isPresent()) {
                User existing = existingByPhone.get();
                return new UserProfileResponse(existing.getUserId(), existing.getNickname(), existing.getPhone());
            }
        }

        if (userRepository.existsByNickname(request.nickname())) {
            throw new IllegalArgumentException("이미 사용 중인 닉네임입니다.");
        }

        String userId = generateUserId();
        User user = new User(userId, request.nickname(), request.phone());
        userRepository.save(user);

        return new UserProfileResponse(user.getUserId(), user.getNickname(), user.getPhone());
    }

    public UserInfoResponse getUserById(String userId) {
        User user = userRepository.findById(userId.toUpperCase())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 유저입니다."));
        return new UserInfoResponse(user.getUserId(), user.getNickname(), user.getPhone());
    }

    public UserProfileResponse getUserByPhone(String phone) {
        if (phone == null || !phone.matches("^\\d{8}$")) {
            throw new IllegalArgumentException("전화번호는 8자리 숫자여야 합니다.");
        }
        User user = userRepository.findByPhone(phone)
                .orElseThrow(() -> new IllegalArgumentException("해당 전화번호로 등록된 유저가 없습니다."));

        return new UserProfileResponse(user.getUserId(), user.getNickname(), user.getPhone());
    }

    private String generateUserId() {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        Random random = new Random();
        String userId;
        do {
            userId = random.ints(4, 0, chars.length())
                    .mapToObj(i -> String.valueOf(chars.charAt(i)))
                    .collect(Collectors.joining());
        } while (userRepository.existsById(userId));
        return userId;
    }
}
