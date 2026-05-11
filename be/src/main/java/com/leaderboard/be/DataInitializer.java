package com.leaderboard.be;

import com.leaderboard.be.entity.Game;
import com.leaderboard.be.entity.GameType;
import com.leaderboard.be.repository.GameRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements ApplicationRunner {

    private final GameRepository gameRepository;

    @Override
    public void run(ApplicationArguments args) {
        for (GameType type : GameType.values()) {
            if (!gameRepository.existsByGameType(type)) {
                gameRepository.save(new Game(null, type));
            }
        }
    }
}