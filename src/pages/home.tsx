import styled from "styled-components";
import { motion } from "framer-motion";
import { MAIN_IMAGE_URL } from "../config/images";
import Calendar from "../components/Calendar/Calendar";
import Account from "../components/Account/Account";
import Gallery from "../components/Gallery/Gallery";
import { useRef } from "react";

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  return (
    <Container ref={containerRef}>
      <MainImage>
        <ImageFrame>
          <motion.img
            src={MAIN_IMAGE_URL}
            alt="메인 웨딩 이미지"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="main-image"
          />
        </ImageFrame>
      </MainImage>

      <IntroSection ref={introRef}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          결혼식에 함께해주시고
          <br /> 따뜻한 축하를 보내주셔서
          <br /> 진심으로 감사드립니다.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <br /> 그날의 설렘과 기쁨이 담긴
          <br /> 결혼식장에서 촬영된 소중한 순간들을
          <br /> 여러분과 함께 나누고자 합니다.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <br /> 함께 만들어준 아름다운 추억을
          <br /> 사진으로 간직해 가시길 바랍니다.
        </motion.p>
      </IntroSection>

      <Gallery ref={galleryRef} />
      {/* <Calendar /> */}

      <Account />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 568px;
  margin: 0 auto;
  background-color: #fff;
  position: relative;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
`;

const MainImage = styled.div`
  width: 100%;
  height: 85vh;
  position: relative;
  background-color: #fff;
  margin-bottom: 100px;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 255, 255, 0.9) 5%,
      rgba(255, 255, 255, 0.7) 10%,
      rgba(255, 255, 255, 0) 25%
    );
    /* background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 255, 255, 0.9) 5%,
      rgba(255, 255, 255, 0.7) 10%,
      rgba(255, 255, 255, 0.5) 15%,
      rgba(255, 255, 255, 0.2) 20%,
      rgba(255, 255, 255, 0) 25%,
      rgba(255, 255, 255, 0) 75%,
      rgba(255, 255, 255, 0.2) 80%,
      rgba(255, 255, 255, 0.5) 85%,
      rgba(255, 255, 255, 0.7) 90%,
      rgba(255, 255, 255, 0.9) 95%,
      rgba(255, 255, 255, 1) 100%
    ); */
    z-index: 3;
  }

  @media (max-width: 768px) {
    height: 70vh;
  }
`;

const ImageFrame = styled.div`
  width: calc(100% - 20px);
  height: 100%;
  position: relative;
  overflow: hidden;
  border: 1px solid #eaeaea;
  z-index: 2;
  margin: 0 auto;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const IntroSection = styled.div`
  padding: 60px 20px;
  text-align: center;
  background-color: #fff;

  p {
    font-size: 16px;
    line-height: 1.8;
    color: #333;
  }
`;

// 스크롤 텍스트 영역
//
// const ScrollTextSection = styled.div`
//   padding: 60px 20px;
//   text-align: center;
//   background-color: #fff;
//   min-height: 100vh;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

export default Home;
