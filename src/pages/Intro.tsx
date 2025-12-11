import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

const Intro = () => {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // 페이지 로드 시 자동 재생 시도
    const playAudio = async () => {
      if (audioRef.current) {
        try {
          audioRef.current.volume = 0.3;
          await audioRef.current.play();
        } catch {
          console.log("자동 재생 실패, 사용자 상호작용 필요");
        }
      }
    };

    playAudio();
  }, []);

  // 확대 축소 방지 이벤트 리스너 등록
  useEffect(() => {
    // 더블탭 줌 방지
    let lastTouchEnd = 0;
    const handleTouchEnd = (e: TouchEvent) => {
      const now = new Date().getTime();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    };

    // 핀치 줌 방지
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    // 더블클릭 줌 방지
    const handleDoubleClick = (e: MouseEvent) => {
      e.preventDefault();
    };

    // 키보드 줌 방지 (Ctrl + +/-)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === "+" || e.key === "-" || e.key === "=")
      ) {
        e.preventDefault();
      }
    };

    // 휠 줌 방지 (Ctrl + 휠)
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
      }
    };

    document.addEventListener("touchend", handleTouchEnd, { passive: false });
    document.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    document.addEventListener("dblclick", handleDoubleClick);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      document.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("dblclick", handleDoubleClick);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const handleEnter = () => {
    navigate("/home");
  };

  const handleContainerClick = async () => {
    if (audioRef.current && audioRef.current.paused) {
      try {
        await audioRef.current.play();
      } catch {
        console.log("오디오 재생 실패");
      }
    }
  };

  return (
    <Container onClick={handleContainerClick}>
      <audio ref={audioRef} src="/audio/inst.mp3" loop preload="auto" />

      <ContentSection>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <IntroText>
            결혼식에 함께해주시고
            <br />
            따뜻한 축하를 보내주셔서 감사합니다.
            <br />
            <br />
            그날의 설렘과 기쁨이 담긴
            <br />
            결혼식장에서 촬영된 소중한 순간들을
            <br />
            여러분과 함께 나누고자 합니다.
            <br />
            <br />
            함께 만들어준 아름다운 추억을
            <br />
            사진으로 간직해 가시길 바랍니다.
          </IntroText>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 1 }}
        >
          <QuestionText>사진첩에 입장하시겠습니까?</QuestionText>
        </motion.div>

        <motion.button
          onClick={handleEnter}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          입장하기
        </motion.button>
      </ContentSection>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 1000;
`;

const ContentSection = styled.div`
  text-align: center;
  padding: 40px;
  max-width: 500px;
  background: transparent;

  button {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    border: 2px solid #dee2e6;
    color: #495057;
    padding: 15px 40px;
    font-size: 18px;
    font-weight: 600;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 30px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

    &:hover {
      background: linear-gradient(135deg, #e9ecef 0%, #dee2e6 100%);
      border-color: #adb5bd;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    }
  }
`;

const IntroText = styled.p`
  font-size: 16px;
  line-height: 1.8;
  color: #444;
  margin-bottom: 30px;
  text-align: center;
`;

const QuestionText = styled.p`
  font-size: 20px;
  font-weight: 500;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

export default Intro;
