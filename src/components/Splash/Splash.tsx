import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

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
              <MainText>
                이재현 · 허정현
              </MainText>
              <SubText>
                2025. 11. 09
              </SubText>
              <SubText>
                살려주세요
              </SubText>
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
`;

const MainText = styled.h1`
  font-family: 'Nanum Myeongjo', serif;
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 1rem;
  color: #333;
`;

const SubText = styled.p`
  font-family: 'Nanum Myeongjo', serif;
  font-size: 1rem;
  color: #666;
`;

export default Splash; 