import { Suspense, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
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

declare global {
  interface Window {
    ReactNativeWebView: {
      postMessage(message: string): void;
    };
  }
}

const MainLayout = () => {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <MainContainer>
      {showSplash && <Splash onComplete={handleSplashComplete} />}
      <SafeArea>
        <Header/>
        <ContentWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </ContentWrapper>
        <FloatingButton />
        <Footer />
      </SafeArea>

    </MainContainer>
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
