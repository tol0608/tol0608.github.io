import styled from "styled-components";
import { useEffect } from "react";
import ShareIcon from "@mui/icons-material/Share";
import Image from "../../assets/img/IMG_3613.jpeg";

declare global {
  interface Window {
    Kakao: any;
  }
}

const FloatingButton = () => {
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(import.meta.env.VITE_KAKAO_JS_API_KEY);
    }
  }, []);

  const handleShareKakao = () => {
    if (window.Kakao) {
      window.Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: "이재현 · 허정현의 결혼식에 초대합니다",
          description: "2025년 11월 9일 일요일 오후 1시\nW웨딩 더에스웨딩홀",
          imageUrl: Image,
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
    <FloatingButtonWrapper onClick={handleShareKakao}>
      <ShareIcon />
    </FloatingButtonWrapper>
  );
};

const FloatingButtonWrapper = styled.button`
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #fee500;
  border: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 1000;
  color: #000000;

  &:hover {
    background-color: #fdd700;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  svg {
    font-size: 24px;
  }
`;

export default FloatingButton;
