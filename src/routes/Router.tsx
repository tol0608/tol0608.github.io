import { Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import {
  MainContainer,
  ContentWrapper,
  SafeArea,
} from "../styles/layouts/MainLayout.styles";
import Header from "../components/Header/Header";
import FloatingButton from "../components/FloatingButton/FloatingButton";
import Splash from "../components/Splash/Splash";
import Footer from "../components/Footer/Footer";
import Aurora from "../components/Background/Aurora";
import AudioPlayer from "../components/AudioPlayer/AudioPlayer";
import styled from "styled-components";

declare global {
  interface Window {
    ReactNativeWebView: {
      postMessage(message: string): void;
    };
  }
}

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
  z-index: 1;
  width: 100%;
  min-height: 100vh;
`;

const MainLayout = () => {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <>
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
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
            </ContentWrapper>
            <FloatingButton />
            <Footer />
          </SafeArea>
        </MainContainer>
      </OverlayContainer>

      {/* 배경음악 플레이어 */}
      <AudioPlayer
        audioSrc="/audio/backmusic.mp3"
        autoPlay={true}
        loop={true}
      />
    </>
  );
};

const RouterComponent = () => {
  useEffect(() => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify({}));
    }
  }, []);

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/*" element={<MainLayout />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default RouterComponent;
