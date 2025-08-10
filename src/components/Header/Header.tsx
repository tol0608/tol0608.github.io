import styled from "styled-components";
import { motion } from "framer-motion";
import TextType from "../TextType";

const Header = () => {
  return (
    <HeaderWrapper>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <HeaderText>
          {/* 잎새달 스무이레에 만나
          미틈달 아흐레에 하나가 되다 */}
          <TextType
            text={[
              "잎새달 스무이레에 만나",
              "미틈달 아흐이레에",
              "하나가 되다...",
            ]}
            typingSpeed={75}
            pauseDuration={1500}
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
  font-family: "Nanum Myeongjo", serif;
  font-size: 1rem;
  line-height: 1.8;
  color: #333;
  font-weight: 400;
  letter-spacing: 0.1em;
  word-break: keep-all;
  padding: 0 20px;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

export default Header;
