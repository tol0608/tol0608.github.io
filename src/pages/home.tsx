import styled from "styled-components";
import { motion } from "framer-motion";
import mainImage from "../assets/img/gallery/sero9.jpg";
import Calendar from "../components/Calendar/Calendar";
import Location from "../components/Location/Location";
import Account from "../components/Account/Account";
import Gallery from "../components/Gallery/Gallery";
// 방명록 서버 연동 예정
// import Guestbook from "../components/Guestbook/Guestbook";
// 스크롤 이미지 추가 고민중
// import HorizontalScroll from "../components/HorizontalScroll/HorizontalScroll";
import { useRef } from "react";
// import ScrollReveal from "../components/HorizontalScroll/ScrollReveal";

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  return (
    <Container ref={containerRef}>
      <MainImage>
        <ImageFrame>
          <motion.img
            src={mainImage}
            alt="메인 웨딩 이미지"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="main-image"
          />
        </ImageFrame>
      </MainImage>
      <TitleSection>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <SubTitle>WEDDING INVITATION</SubTitle>
          {/* <Relation>신랑  신부</Relation> */}
          <Names>이재현 · 허정현</Names>
          <Date>2025. 11. 9. SUNDAY PM 1:00</Date>
          <LocationView>W웨딩 더에스웨딩홀</LocationView>
        </motion.div>
      </TitleSection>
      <IntroSection ref={introRef}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          서로 마주 보며 다져온 사랑을
          <br />
          이제 함께 한 곳을 바라보며
          <br />
          걸어가고자 합니다.
          <br />
          저희 두 사람이 사랑의 이름으로
          <br />
          지켜나갈 수 있도록
          <br />
          앞날을 축복해 주시면 감사하겠습니다.
        </motion.p>
      </IntroSection>
      {/* <HorizontalScroll 
        triggerElement={introRef}
        endElement={galleryRef}
        containerRef={containerRef}
      /> */}
      {/* todo : 스크롤 텍스트 영역 다듬기 */}
      {/* <ScrollTextSection>
        <ScrollReveal
          scrollContainerRef={containerRef}
          baseOpacity={0}
          enableBlur={true}
          baseRotation={5}
          blurStrength={10}
          containerClassName="story-container"
          textClassName="story-text"
        >
          Our Story 처음 만난 날부터 지금까지 The Proposal 서로를 향한 약속 Our
          Future 함께할 미래
        </ScrollReveal>
      </ScrollTextSection> */}
      <Gallery ref={galleryRef} />
      <Calendar />
      <Location />
      {/* 방명록 서버 연동 예정  */}
      {/* <Guestbook /> */}
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
  height: 50vh;
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

const TitleSection = styled.div`
  text-align: center;
  padding: 60px 20px;
  background-color: #f9f9f9;
`;

const SubTitle = styled.h2`
  font-size: 14px;
  letter-spacing: 2px;
  color: #666;
  margin-bottom: 20px;
`;

const Names = styled.h1`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 20px;
  font-family: "Nanum Myeongjo", serif;
`;

const Date = styled.p`
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
`;

const LocationView = styled.p`
  font-size: 16px;
  color: #333;
`;

const IntroSection = styled.div`
  padding: 60px 20px;
  text-align: center;
  background-color: #fff;

  p {
    font-size: 16px;
    line-height: 1.8;
    color: #333;
    font-family: "Nanum Myeongjo", serif;
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
