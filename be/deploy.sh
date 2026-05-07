#!/bin/bash

# ECR 로그인
aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin 985818273436.dkr.ecr.ap-northeast-2.amazonaws.com

# 최신 이미지 pull
docker pull 985818273436.dkr.ecr.ap-northeast-2.amazonaws.com/leaderboard:latest

# 기존 컨테이너 내리고
docker compose -f docker-compose-prod.yml down app

# 새 컨테이너 올리기
docker compose -f docker-compose-prod.yml up -d app