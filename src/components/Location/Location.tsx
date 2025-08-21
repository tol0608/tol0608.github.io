import styled from "styled-components";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import DirectionsSubwayIcon from "@mui/icons-material/DirectionsSubway";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useEffect } from "react";

declare global {
  interface Window {
    naver: any;
  }
}

const Location = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const handleCopyAddress = () => {
    navigator.clipboard.writeText("부산광역시 남구 전포대로 26");
    alert("주소가 복사되었습니다.");
  };

  const handleNaverMap = () => {
    window.open(
      "https://map.naver.com/p/search/부산광역시%20남구%20전포대로%2026%20W웨딩%20더에스웨딩홀"
    );
  };

  const handleKakaoMap = () => {
    window.open(
      "https://map.kakao.com/link/search/부산광역시 남구 전포대로 26 W웨딩 더에스웨딩홀"
    );
  };

  useEffect(() => {
    const initializeMap = () => {
      const mapOptions = {
        center: new window.naver.maps.LatLng(35.139121, 129.06779),
        zoom: 17,
        minZoom: 15,
        zoomControl: false,
        draggable: false, // 드래그 비활성화
        pinchZoom: false, // 핀치 줌 비활성화
        scrollWheel: false, // 스크롤 줌 비활성화
        keyboardShortcuts: false, // 키보드 컨트롤 비활성화
        disableDoubleTapZoom: true, // 더블탭 줌 비활성화
        disableDoubleClickZoom: true, // 더블클릭 줌 비활성화
        disableTwoFingerTapZoom: true, // 두 손가락 탭 줌 비활성화
      };

      const map = new window.naver.maps.Map("map", mapOptions);

      // 마커 위치도 동일한 좌표로 수정
      new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(35.139121, 129.06779),
        map: map,
      });
    };

    if (window.naver && window.naver.maps) {
      initializeMap();
    }
  }, []);

  return (
    <Section ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <Title>오시는 길</Title>

        <MapContainer id="map" />

        <VenueInfo>
          <VenueName>W웨딩 더에스웨딩홀 그랜드홀</VenueName>
          <Address>
            부산광역시 남구 전포대로 26(문현동,삼성힐타워상가)
            <CopyButton onClick={handleCopyAddress}>
              <ContentCopyIcon sx={{ fontSize: 16 }} />
            </CopyButton>
          </Address>
          <Tel> 051-711-0777 </Tel>
        </VenueInfo>

        <NavigationButtons>
          <NavButton onClick={handleNaverMap}>네이버 지도</NavButton>
          <NavButton onClick={handleKakaoMap}>카카오 지도</NavButton>
        </NavigationButtons>

        <TransportSection>
          <TransportItem>
            <IconWrapper>
              <DirectionsSubwayIcon />
            </IconWrapper>
            <TransportInfo>
              <TransportTitle>지하철</TransportTitle>
              <TransportText>
                부산 도시철도 2호선 문현역 2번 출구에서 도보 1분
              </TransportText>
            </TransportInfo>
          </TransportItem>

          <TransportItem>
            <IconWrapper>
              <DirectionsBusIcon />
            </IconWrapper>
            <TransportInfo>
              <TransportTitle>버스</TransportTitle>
              <TransportText>
                문현역 정류장
                <br />
                문현2동 부산은행 정류장하차 138-1
              </TransportText>
            </TransportInfo>
          </TransportItem>

          <TransportItem>
            <IconWrapper>
              <DirectionsCarIcon />
            </IconWrapper>
            <TransportInfo>
              <TransportTitle>자가용</TransportTitle>
              <TransportText>
                내비게이션 "W웨딩 더에스웨딩홀" 검색
                <br />
                지하 주차장 무료
                <br />
                이마트 문현점 주차장 및 셔틀버스 지원
              </TransportText>
            </TransportInfo>
          </TransportItem>
        </TransportSection>
      </motion.div>
    </Section>
  );
};

const Section = styled.section`
  padding: 80px 20px;
  background-color: #fff;

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
  text-align: center;
  margin-bottom: 40px;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 300px;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const VenueInfo = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const VenueName = styled.h3`
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 10px;
`;

const Address = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  @media (max-width: 768px) {
    width: 100%;
    font-size: 0.8rem;
    word-break: nowrap;
  }
`;

const CopyButton = styled.button`
  border: none;
  background: none;
  padding: 4px;
  color: #999;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    color: #666;
  }

  @media (max-width: 768px) {
    padding: 0;
  }
`;

const Tel = styled.p`
  font-size: 1rem;
  color: #666;
`;

const NavigationButtons = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 40px;
`;

const NavButton = styled.button`
  padding: 12px 24px;
  border-radius: 25px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #eee;
  }
`;

const TransportSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  max-width: 500px;
  margin: 0 auto;
`;

const TransportItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
`;

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  border-radius: 50%;
  color: #666;
`;

const TransportInfo = styled.div`
  flex: 1;
`;

const TransportTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 8px;
`;

const TransportText = styled.p`
  font-size: 0.95rem;
  color: #666;
  line-height: 1.6;
`;

export default Location;
