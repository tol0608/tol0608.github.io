import styled from 'styled-components';
import { motion } from 'framer-motion';
import mainImage from "../assets/img/IMG_3608.jpeg";
import Calendar from '../components/Calendar/Calendar';
import Location from '../components/Location/Location';
import Account from '../components/Account/Account';
import Header from '../components/Header/Header';

const Home = () => {
  return (
    <Container>
      <MainImage>
        <ImageFrame>
          <motion.img 
            src={mainImage} 
            alt="메인 웨딩 이미지"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
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
          <Names>신랑 · 신부</Names>
          <Date>2025. 11. 9. SUNDAY PM 1:00</Date>
          <LocationView>W웨딩 더에스웨딩홀</LocationView>
        </motion.div>
      </TitleSection>

      <IntroSection>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          서로 마주 보며 다져온 사랑을<br />
          이제 함께 한 곳을 바라보며<br />
          걸어가고자 합니다.<br />
          저희 두 사람이 사랑의 이름으로<br />
          지켜나갈 수 있도록<br />
          앞날을 축복해 주시면 감사하겠습니다.
        </motion.p>
      </IntroSection>

      <Calendar />
      <Location />
      <Account />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
  overflow-y: auto;
  background-color: #fff;
`;

const MainImage = styled.div`
  width: 100%;
  height: 40vh;
  position: relative;
  background-color: #fff;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    z-index: 1;
  }
`;

const ImageFrame = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 50% 50% 0 0;
  border: 1px solid #eaeaea;
  z-index: 2;
  
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
  font-family: 'Nanum Myeongjo', serif;
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
    font-family: 'Nanum Myeongjo', serif;
  }
`;

export default Home;
