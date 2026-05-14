#!/bin/bash

log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] [$1] $2" | tee -a /home/ubuntu/app/deploy.log
}
log "INFO" "최신 코드 pull 시작"
git -C /home/ubuntu/app pull origin develop
log "INFO" "최신 코드 pull 완료"
source deploy.env

ECR_REGISTRY="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"
ECR_IMAGE="${ECR_REGISTRY}/${ECR_REPO}:latest"

# ECR 로그인
log "INFO" "ECR 로그인 시작"
aws ecr get-login-password --region "$AWS_REGION" | \
  docker login --username AWS --password-stdin "$ECR_REGISTRY"
log "INFO" "ECR 로그인 완료"

# 최신 이미지 pull
log "INFO" "이미지 pull 시작"
docker pull "$ECR_IMAGE"
log "INFO" "이미지 pull 완료"

# 기존 컨테이너 내리고
log "INFO" "기존 컨테이너 종료"
docker compose --env-file prod.env -f docker-compose-prod.yml down app

# 새 컨테이너 올리기
log "INFO" "새 컨테이너 시작"
docker compose --env-file prod.env -f docker-compose-prod.yml up -d app
log "INFO" "배포 완료"