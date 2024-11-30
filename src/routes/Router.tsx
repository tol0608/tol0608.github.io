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
  Header,
  Navigation,
  NavItem,
  SafeArea,
  HeaderTitle,
  HeaderSubTitle,
} from "../styles/layouts/MainLayout.styles";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

declare global {
  interface Window {
    ReactNativeWebView: {
      postMessage(message: string): void;
    };
  }
}

const MainLayout = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <MainContainer>
      <Header>
        <HeaderTitle>허리UP!</HeaderTitle>
        <HeaderSubTitle>우리가 백년해로 할 수 있을까?</HeaderSubTitle>
      </Header>

      <SafeArea>
        <ContentWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </ContentWrapper>
      </SafeArea>

      <Navigation>
        {/* <NavItem $isActive={isActive("/")}>
          <HomeOutlinedIcon sx={{ fontSize: 24 }} />
          <span>홈</span>
        </NavItem>
        <NavItem $isActive={isActive("/notifications")}>
          <NotificationsNoneOutlinedIcon sx={{ fontSize: 24 }} />
          <span>알림</span>
        </NavItem>
        <NavItem $isActive={isActive("/profile")}>
          <PersonOutlineOutlinedIcon sx={{ fontSize: 24 }} />
          <span>프로필</span>
        </NavItem>
        <NavItem $isActive={isActive("/settings")}>
          <SettingsOutlinedIcon sx={{ fontSize: 24 }} />
          <span>설정</span>
        </NavItem> */}
      </Navigation>
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
