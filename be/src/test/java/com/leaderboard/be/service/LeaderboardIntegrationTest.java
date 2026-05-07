package com.leaderboard.be.service;

import com.leaderboard.be.dto.ScoreSubmitRequest;
import com.leaderboard.be.dto.ScoreSubmitResponse;
import com.leaderboard.be.dto.UserProfileRequest;
import com.leaderboard.be.dto.UserProfileResponse;
import com.leaderboard.be.dto.LeaderboardResponse;
import com.leaderboard.be.entity.Game;
import com.leaderboard.be.entity.GameType;
import com.leaderboard.be.repository.GameRepository;
import com.leaderboard.be.repository.ScoreRepository;
import com.leaderboard.be.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
public class LeaderboardIntegrationTest {

    @Autowired private GameScoreService gameScoreService;
    @Autowired private UserService userService;
    @Autowired private LeaderboardService leaderboardService;

    @Autowired private GameRepository gameRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private ScoreRepository scoreRepository;

    private String testUserId;

    @BeforeEach
    void setUp() {
        // 1. 테스트용 게임 데이터 세팅 (실제 환경이라면 미리 들어가 있겠지만, 테스트를 위해 생성)
        for (GameType type : GameType.values()) {
            gameRepository.save(new Game(null, type));
        }

        // 2. 테스트용 유저 생성 (대현님 서비스 이용)
        UserProfileRequest userRequest = new UserProfileRequest("하은테스터", "01012345678");
        UserProfileResponse userResponse = userService.createUser(userRequest);
        testUserId = userResponse.userId();
    }

    @Test
    @DisplayName("신규 유저의 첫 점수 등록 시나리오 테스트")
    void firstScoreRegistrationTest() {
        // given: 하은님이 맡은 점수 등록 요청 (그린이 목 늘리기 - 낮은 점수일수록 좋음)
        ScoreSubmitRequest request = new ScoreSubmitRequest("green-neck", testUserId, 15.5);

        // when: 서비스 호출
        ScoreSubmitResponse response = gameScoreService.processGameResult(request);

        // then: 상태값 확인
        assertThat(response.status()).isEqualTo("CREATED");
        assertThat(response.gameNameKR()).isEqualTo("그린이 목 늘리기");
    }

    @Test
    @DisplayName("점수 업데이트 및 리더보드 순위 반영 통합 테스트")
    void rankingUpdateIntegrationTest() {
        // 1. 유저 점수 등록 (높을 수록 좋은 순발력 게임)
        gameScoreService.processGameResult(new ScoreSubmitRequest("quickness-game", testUserId, 100.0));

        // 2. 더 높은 점수로 갱신 시도
        ScoreSubmitResponse updateResponse = gameScoreService.processGameResult(new ScoreSubmitRequest("quickness-game", testUserId, 150.0));

        // 3. 리더보드 전체 순위 조회 (명준님 서비스 이용)
        LeaderboardResponse overallRanking = leaderboardService.getOverallRanking();

        // then 검증
        assertThat(updateResponse.status()).isEqualTo("UPDATED");
        assertThat(overallRanking.rankings()).isNotEmpty();
        assertThat(overallRanking.rankings().get(0).nickname()).isEqualTo("하은테스터");
    }

    @Test
    @DisplayName("낮은 점수가 좋은 게임(green-neck)에서 높은 점수 제출 시 점수 유지 테스트")
    void scoreUnchangedTest() {
        // 1. 처음 10초 기록 등록 (빌더 사용)
        ScoreSubmitRequest firstRequest = ScoreSubmitRequest.builder()
                .gameName("green-neck")
                .userId(testUserId)
                .score(10.0) // Double 타입으로 자동 박싱됩니다.
                .build();
        gameScoreService.processGameResult(firstRequest);

        // 2. 더 나쁜 기록(15초) 등록 시도 (빌더 사용)
        ScoreSubmitRequest secondRequest = ScoreSubmitRequest.builder()
                .gameName("green-neck")
                .userId(testUserId)
                .score(15.0)
                .build();

        ScoreSubmitResponse unchangedResponse = gameScoreService.processGameResult(secondRequest);

        // then: 기록은 10초로 유지되어야 함 (UNCHANGED)
        assertThat(unchangedResponse.status()).isEqualTo("UNCHANGED");
    }
}
