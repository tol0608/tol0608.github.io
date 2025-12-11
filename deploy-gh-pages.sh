#!/bin/bash

# GitHub Pages 배포 스크립트
set -e

echo "🚀 GitHub Pages 배포 시작..."

# 빌드 확인
if [ ! -d "dist" ]; then
    echo "❌ dist 폴더가 없습니다. 먼저 빌드를 실행하세요."
    exit 1
fi

# 임시 디렉토리로 이동
cd dist

# git 초기화 (이미 있으면 무시)
git init || true
git config user.name "jaehyeon lee"
git config user.email "97492715+tol0608@users.noreply.github.com"

# 모든 파일 추가
git add -A

# 커밋
git commit -m "Deploy to GitHub Pages" || echo "변경사항이 없습니다."

# gh-pages 브랜치로 푸시
echo "📤 GitHub Pages로 푸시 중..."
GIT_SSH_COMMAND="ssh -i ~/.ssh/id_rsa_tol0608 -o IdentitiesOnly=yes" git push -f git@github.com-tol0608:tol0608/tol0608.github.io.git HEAD:gh-pages

echo "✅ 배포 완료!"

