package com.leaderboard.be.repository;

import com.leaderboard.be.entity.Game;
import com.leaderboard.be.entity.GameType;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface GameRepository extends JpaRepository<Game, Long> {
    Optional<Game> findByGameType(GameType gameType);
}
