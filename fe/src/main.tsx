import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const SCALE_WIDTH = 1920;
const SCALE_HEIGHT = 1080;

const ScalingWrapper = ({ children }: { children: React.ReactNode }) => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const scaleW = width / SCALE_WIDTH;
      const scaleH = height / SCALE_HEIGHT;
      // 전체가 다 보여야 하므로 작은 쪽 비율에 맞춤 (Contain)
      setScale(Math.min(scaleW, scaleH));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#030307] overflow-hidden">
      <div
        style={{
          width: SCALE_WIDTH,
          height: SCALE_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </div>
    </div>
  );
};

// 30초마다 페이지 새로고침 (실시간성 유지 보조)
setInterval(() => {
  window.location.reload();
}, 30000);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ScalingWrapper>
      <App />
    </ScalingWrapper>
  </React.StrictMode>
);
