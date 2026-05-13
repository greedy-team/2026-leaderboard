package com.leaderboard.be.repository;

public interface PlayCountInterface {
    String getUserId();
    String getNickname();
    int getPlayedGameCount();
    int getTotalPlayCount();
}
