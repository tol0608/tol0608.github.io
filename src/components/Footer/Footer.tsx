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

  return (
    <FooterWrapper>
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

const Copyright = styled.p`
  font-size: 0.9rem;
  color: #666;
`;

export default Footer;
