import { useState, useRef, useEffect } from "react";
import {
  MainContainer,
  ContentWrapper,
  SafeArea,
} from "../../styles/layouts/MainLayout.styles";
import Header from "../Header/Header";
import FloatingButton from "../FloatingButton/FloatingButton";
import Splash from "../Splash/Splash";
import Footer from "../Footer/Footer";
import Aurora from "../Background/Aurora";
import styled from "styled-components";

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
`;

const OverlayContainer = styled.div`
  position: relative;
  z-index: 0;
  width: 100%;
  min-height: 100vh;
`;

const withMainLayout = (WrappedComponent: React.ComponentType) => {
  return function WithMainLayoutComponent(props: any) {
    const [showSplash, setShowSplash] = useState(true);
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);
    const [musicInitialized, setMusicInitialized] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const handleSplashComplete = () => {
      setShowSplash(false);
    };

    // 배경음악 초기화 및 자동재생 시도
    useEffect(() => {
      const audio = audioRef.current;
      if (!audio || musicInitialized) return;

      setMusicInitialized(true);

      // 55초부터 시작, 무한 루프
      audio.currentTime = 55.5;
      audio.loop = true;
      audio.volume = 0.3;

      // 자동재생 시도
      const attemptAutoPlay = async () => {
        try {
          await audio.play();
          setIsMusicPlaying(true);
          console.log("배경음악 자동재생 성공");
        } catch {
          console.log("배경음악 자동재생 실패, 사용자 상호작용 대기");
          setIsMusicPlaying(false);
        }
      };

      attemptAutoPlay();
    }, [musicInitialized]);

    // 사용자 상호작용 핸들러
    const handleUserInteraction = async () => {
      const audio = audioRef.current;
      if (!audio || isMusicPlaying) return;

      try {
        await audio.play();
        setIsMusicPlaying(true);
        console.log("사용자 상호작용으로 배경음악 재생 시작");

        // 이벤트 리스너 제거
        document.removeEventListener("click", handleUserInteraction);
        document.removeEventListener("touchstart", handleUserInteraction);
        document.removeEventListener("keydown", handleUserInteraction);
      } catch {
        console.log("사용자 상호작용 후 재생 실패");
      }
    };

    // 자동재생 실패 시 사용자 상호작용 이벤트 리스너 등록
    useEffect(() => {
      if (musicInitialized && !isMusicPlaying) {
        document.addEventListener("click", handleUserInteraction);
        document.addEventListener("touchstart", handleUserInteraction);
        document.addEventListener("keydown", handleUserInteraction);

        return () => {
          document.removeEventListener("click", handleUserInteraction);
          document.removeEventListener("touchstart", handleUserInteraction);
          document.removeEventListener("keydown", handleUserInteraction);
        };
      }
    }, [musicInitialized, isMusicPlaying]);

    return (
      <>
        {/* 배경음악 */}
        <audio ref={audioRef} src="/audio/main.mp3" preload="metadata" />

        <BackgroundContainer>
          <Aurora
            colorStops={["#f0f8ff", "#f6f6f6", "#ffffff"]}
            blend={0.8}
            amplitude={0.8}
            speed={0.5}
          />
        </BackgroundContainer>

        <OverlayContainer>
          <MainContainer>
            {showSplash && <Splash onComplete={handleSplashComplete} />}
            <SafeArea>
              <Header />
              <ContentWrapper>
                <WrappedComponent {...props} />
              </ContentWrapper>
              <FloatingButton />
              <Footer />
            </SafeArea>
          </MainContainer>
        </OverlayContainer>

        {/* 배경음악 플레이어 */}
        {/* <AudioPlayer
          audioSrc="/audio/main.mp3"
          autoPlay={true}
          loop={true}
          startTime={55}
          fadeIn={true}
          fadeInDuration={1000}
        /> */}
      </>
    );
  };
};

export default withMainLayout;
