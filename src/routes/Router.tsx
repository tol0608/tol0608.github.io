import { Suspense, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "../pages/home";
import {
  MainContainer,
  ContentWrapper,
  SafeArea    ,
} from "../styles/layouts/MainLayout.styles";
import Header from "../components/Header/Header";

declare global {
  interface Window {
    ReactNativeWebView: {
      postMessage(message: string): void;
    };
  }
}

const MainLayout = () => {
  const location = useLocation();

  return (
    <MainContainer>
      <SafeArea>
        <Header/>
        <ContentWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </ContentWrapper>
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
