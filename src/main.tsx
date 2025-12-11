import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { disableDevTools } from "./utils/disableDevTools";

// 개발자 도구 접근 방지
disableDevTools();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
