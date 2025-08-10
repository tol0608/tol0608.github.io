import styled from "styled-components";
import { useEffect } from "react";

declare global {
  interface Window {
    Kakao: any;
  }
}

const Footer = () => {
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY);
    }
  }, []);

  const handleShareKakao = () => {
    if (window.Kakao) {
      window.Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: "이재현 · 허정현의 결혼식에 초대합니다",
          description: "2025년 11월 9일 일요일 오후 1시\nW웨딩 더에스웨딩홀",
          imageUrl: "https://your-domain.com/wedding-thumbnail.jpg",
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
        buttons: [
          {
            title: "청첩장 보기",
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          },
        ],
      });
    }
  };

  return (
    <FooterWrapper>
      {/* <ShareButton onClick={handleShareKakao}>
        카카오톡으로 공유하기
      </ShareButton> */}
      <Copyright>© 2025 이재현 · 허정현</Copyright>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.footer`
  width: 100%;
  padding: 10px 0;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: -50px;
    left: 0;
    right: 0;
    height: 50px;
    background: linear-gradient(
      to bottom,
      rgba(249, 249, 249, 0) 0%,
      rgba(249, 249, 249, 1) 100%
    );
    pointer-events: none;
  }
`;

const ShareButton = styled.button`
  padding: 12px 24px;
  background-color: #fee500;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  color: #000000;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;

  &:hover {
    background-color: #fdd700;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const Copyright = styled.p`
  font-size: 0.9rem;
  color: #666;
`;

export default Footer;
