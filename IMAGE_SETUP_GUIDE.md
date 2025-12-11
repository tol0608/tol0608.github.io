# 이미지 외부 호스팅 설정 가이드

프로젝트의 이미지들을 외부 호스팅으로 이동하여 저장소 크기를 줄였습니다.

## 구글 드라이브 사용 방법

### 1. 이미지 업로드

1. 구글 드라이브에 접속 (https://drive.google.com)
2. 새 폴더 생성 (예: "웨딩 사진")
3. 이미지들을 폴더에 업로드

### 2. 공유 설정

1. 각 이미지 파일을 우클릭
2. "공유" 선택
3. "링크가 있는 모든 사용자" 또는 "모든 사용자"로 설정
4. "링크 복사" 클릭

### 3. 파일 ID 추출

공유 링크 형식: `https://drive.google.com/file/d/FILE_ID/view`

예시:

- 공유 링크: `https://drive.google.com/file/d/1a2b3c4d5e6f7g8h9i0j/view?usp=sharing`
- 파일 ID: `1a2b3c4d5e6f7g8h9i0j`

### 4. 이미지 URL 생성

파일 ID를 사용하여 직접 이미지 URL 생성:

```
https://drive.google.com/uc?export=view&id=FILE_ID
```

예시:

```
https://drive.google.com/uc?export=view&id=1a2b3c4d5e6f7g8h9i0j
```

### 5. 설정 파일 업데이트

`src/config/images.ts` 파일을 열고:

1. **메인 이미지 URL 설정:**

   ```typescript
   export const MAIN_IMAGE_URL =
     "https://drive.google.com/uc?export=view&id=YOUR_FILE_ID";
   ```

2. **갤러리 이미지 URL 설정:**
   각 이미지의 파일 ID를 `YOUR_FILE_ID_1`, `YOUR_FILE_ID_2` 등에 입력:
   ```typescript
   { id: 1, url: "https://drive.google.com/uc?export=view&id=YOUR_FILE_ID_1", alt: "웨딩 사진 1" },
   ```

## 대안: 다른 이미지 호스팅 서비스

### Imgur 사용

1. https://imgur.com/upload 접속
2. 이미지 업로드
3. 업로드 후 이미지 URL 복사 (예: `https://i.imgur.com/xxxxx.jpg`)
4. `src/config/images.ts`에 URL 직접 입력

### Cloudinary 사용

1. https://cloudinary.com 가입
2. 이미지 업로드
3. 제공되는 URL 사용

### GitHub 사용 (public 폴더)

1. GitHub 저장소의 `public` 폴더에 이미지 업로드
2. URL 형식: `https://raw.githubusercontent.com/USERNAME/REPO/main/public/image.jpg`

## 주의사항

- 구글 드라이브의 경우 일일 트래픽 제한이 있을 수 있습니다
- 많은 이미지가 있는 경우 Imgur나 Cloudinary 같은 전문 이미지 호스팅 서비스를 권장합니다
- 이미지 URL이 변경되면 `src/config/images.ts` 파일만 수정하면 됩니다

## 빠른 시작

1. 이미지를 구글 드라이브에 업로드
2. 각 이미지의 파일 ID 추출
3. `src/config/images.ts` 파일 열기
4. `YOUR_FILE_ID` 부분을 실제 파일 ID로 교체
5. 저장 후 빌드 및 배포
