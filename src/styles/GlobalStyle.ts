import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css");
  @import url('https://fonts.googleapis.com/css2?family=Nanum+Myeongjo:wght@400;700&display=swap'); 
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    // 텍스트 선택 방지
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    
    // 확대 축소 방지
    touch-action: manipulation;
    -webkit-touch-callout: none;
    -webkit-tap-highlight-color: transparent;

    // Firefox 스크롤바 숨기기
    scrollbar-width: none;
    
    // IE and Edge 스크롤바 숨기기
    -ms-overflow-style: none;
    
    // Chrome, Safari 스크롤바 숨기기
    &::-webkit-scrollbar {
      display: none;
    }
  }

  html {
    font-size: 16px;
    
    @media screen and (max-width: 768px) {
      font-size: 14px;
    }
  }

  body {
    font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
    line-height: 1.5;
    letter-spacing: -0.04em;
    word-break: keep-all;
    background-color: ${({ theme }) => theme.colors.background.paper};
    color: ${({ theme }) => theme.colors.text.primary};
    
    // 확대 축소 방지
    touch-action: manipulation;
    -webkit-touch-callout: none;
    -webkit-tap-highlight-color: transparent;
    
    // 더블탭 줌 방지
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    text-size-adjust: 100%;

    // Firefox
    scrollbar-width: none;

    // IE and Edge
    -ms-overflow-style: none;

    // Chrome, Safari
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .container {
    width: 100%;
    max-width: 1280px; 
    margin: 0 auto;
    padding: 0 1rem;

    @media screen and (max-width: 1280px) {
      max-width: 1024px;
    }

    @media screen and (max-width: 1024px) {
      max-width: 768px;
    }

    @media screen and (max-width: 768px) {
      max-width: 100%;
      padding: 0 1rem;
    }
  }

  // 링크 스타일 초기화
  a {
    color: inherit;
    text-decoration: none;
  }

  // 버튼 스타일 초기화
  button {
    border: none;
    background: none;
    cursor: pointer;
  }

  // 목록 스타일 초기화
  ul, ol {
    list-style: none;
  }

  // 입력 필드 기본 스타일
  input, textarea {
    font-family: inherit;
    -webkit-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
    user-select: text;
  }

  input[type="radio"] {
    appearance: none;
    width: 16px;
    height: 16px;
    border: 2px solid ${({ theme }) => theme.colors.gray[400]};
    border-radius: 50%;
    outline: none;
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s;

    &:checked {
      background: ${({ theme }) => theme.colors.blue[500]};
      border-color: ${({ theme }) => theme.colors.blue[500]};
    }
  }

  // 이미지 확대 축소 방지
  img {
    touch-action: manipulation;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;
  }

  // 버튼 확대 축소 방지
  button {
    touch-action: manipulation;
  }

  // 링크 확대 축소 방지
  a {
    touch-action: manipulation;
  }
`;

export default GlobalStyle;
