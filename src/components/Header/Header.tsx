import styled from "styled-components";
import { motion } from "framer-motion";
import TextType from "../TextType";
import { useState, useEffect } from "react";

const Header = () => {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <HeaderWrapper>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={showAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <HeaderText>
          {/* 잎새달 스무이레에 만나
          미틈달 아흐레에 하나가 되다 */}
          <TextType
            text={[
              "잎새달 스무이레에 만나",
              "미틈달 아흐이레에",
              "하나가 되다.",
            ]}
            typingSpeed={50}
            pauseDuration={2500}
            showCursor={true}
            cursorCharacter="|"
          />
        </HeaderText>
      </motion.div>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  background-color: #fff;
  text-align: center;
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
`;

const HeaderText = styled.h1`
  font-size: 1.2rem;
  line-height: 1.6;
  color: #333;
  font-weight: 400;
  letter-spacing: 0.1em;
  word-break: keep-all;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export default Header;
