import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/tol0608.github.io/",
  plugins: [react()],
  assetsInclude: [
    "**/*.JPG",
    "**/*.jpg",
    "**/*.jpeg",
    "**/*.png",
    "**/*.gif",
    "**/*.svg",
    "**/*.webp",
    "**/*.mp3",
    "**/*.mp4",
    "**/*.wav",
    "**/*.ogg",
  ],
  esbuild: {
    target: "es2020",
  },
  define: {
    global: "globalThis",
  },
  build: {
    // 청크 분할 최적화
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
          ui: ["styled-components"],
        },
      },
    },
    // 압축 최적화 (esbuild 사용)
    minify: "esbuild",
    // 소스맵 생성 (개발 시에만)
    sourcemap: false,
    // 청크 크기 경고 임계값
    chunkSizeWarningLimit: 1000,
  },
  // 서버 설정
  server: {
    headers: {
      "X-Frame-Options": "DENY",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
  },
  // 프리뷰 설정
  preview: {
    headers: {
      "X-Frame-Options": "DENY",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
  },
});
