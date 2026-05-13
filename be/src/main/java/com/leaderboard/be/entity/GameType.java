package com.leaderboard.be.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.Getter;

import java.util.Arrays;

@Getter
public enum GameType {

    GREEN_NECK("green-neck", "그린이 목 늘리기", true, "초"),
    GREEN_BLUE_WHITE("green-blue-white", "그린이 청기 백기", false, "점"),
    PROTECT_BABY_GREEN("protect-baby-green", "아기 그린이 지키기", false, "점"),
    QUICKNESS_GAME("quickness-game", "순발력 게임", false, "점");

    private final String gameName;
    private final String gameNameKR;
    private final boolean lowBetter;
    private final String unit;

    GameType(String gameName, String gameNameKR, boolean lowBetter, String unit) {
        this.gameName = gameName;
        this.gameNameKR = gameNameKR;
        this.lowBetter = lowBetter;
        this.unit = unit;
    }

    @JsonCreator
    public static GameType from(String gameName) {
        return Arrays.stream(values())
                .filter(it -> it.gameName.equals(gameName))
                .findFirst()
                .orElseThrow();
    }
}
