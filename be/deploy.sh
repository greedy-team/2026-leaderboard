#!/bin/bash

# 환경변수 로드
source .env.deploy

ECR_REGISTRY="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"
ECR_IMAGE="${ECR_REGISTRY}/${ECR_REPO}:latest"

# ECR 로그인
aws ecr get-login-password --region "$AWS_REGION" | \
  docker login --username AWS --password-stdin "$ECR_REGISTRY"

# 최신 이미지 pull
docker pull "$ECR_IMAGE"

# 기존 컨테이너 내리고
docker compose -f docker-compose-prod.yml down app

# 새 컨테이너 올리기
docker compose -f docker-compose-prod.yml up -d app