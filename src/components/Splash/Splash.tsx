import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { useEffect, useState } from "react";
import SplitText from "../SplitText";

interface SplashProps {
  onComplete: () => void;
}

const Splash = ({ onComplete }: SplashProps) => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      setTimeout(onComplete, 500); // 페이드아웃 애니메이션 후 완료 콜백
    }, 3000); // 2초 후 스플래시 화면 종료

    return () => clearTimeout(timer);
  }, [onComplete]);

  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  return (
    <AnimatePresence>
      {showSplash && (
        <SplashOverlay
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ContentWrapper>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <MainText>이재현 · 허정현</MainText>
              <SubText>2025. 11. 09</SubText>
              <SplitText
                text="우리 결혼해요!"
                className="text-2xl font-semibold text-center"
                delay={100}
                duration={0.6}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="center"
                onLetterAnimationComplete={handleAnimationComplete}
              />
            </motion.div>
          </ContentWrapper>
        </SplashOverlay>
      )}
    </AnimatePresence>
  );
};

const SplashOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;

const ContentWrapper = styled.div`
  text-align: center;

  .text-2xl {
  }
`;

const MainText = styled.h1`
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 1rem;
  color: #333;
`;

const SubText = styled.p`
  font-size: 1rem;
  color: #666;
`;

export default Splash;
