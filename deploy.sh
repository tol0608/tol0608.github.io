#!/bin/bash

echo "🚀 SEO 최적화된 React 앱 배포 시작..."

# 환경 변수 설정
export NODE_ENV=production

# 의존성 설치
echo "📦 의존성 설치 중..."
yarn install --frozen-lockfile

# 빌드
echo "🔨 프로덕션 빌드 중..."
yarn build

# 빌드 결과 확인
if [ ! -d "dist" ]; then
    echo "❌ 빌드 실패!"
    exit 1
fi

echo "✅ 빌드 완료!"

# Docker 컨테이너 중지 및 제거
echo "🐳 기존 컨테이너 정리 중..."
docker-compose down

# 새 이미지 빌드 및 실행
echo "🐳 새 컨테이너 시작 중..."
docker-compose up -d --build

# 헬스체크
echo "🏥 헬스체크 중..."
sleep 10
if curl -f http://localhost/ > /dev/null 2>&1; then
    echo "✅ 배포 성공! 사이트가 정상적으로 실행 중입니다."
else
    echo "❌ 배포 실패! 사이트에 접근할 수 없습니다."
    exit 1
fi

# SEO 검증
echo "🔍 SEO 검증 중..."
echo "- robots.txt 확인: http://localhost/robots.txt"
echo "- sitemap.xml 확인: http://localhost/sitemap.xml"
echo "- 메타 태그 확인: 브라우저 개발자 도구에서 확인"

echo "🎉 배포 완료!"
