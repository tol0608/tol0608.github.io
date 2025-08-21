import { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Intro from "../pages/Intro";
import HomeWithLayout from "../pages/HomeWithLayout";

declare global {
  interface Window {
    ReactNativeWebView: {
      postMessage(message: string): void;
    };
  }
}

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
          <Route path="/" element={<Intro />} />
          <Route path="/home" element={<HomeWithLayout />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default RouterComponent;
