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
            "서로의 마음을 알아가는 시간이었습니다."
            <br />
            <br />
            처음 만난 그 순간부터 지금까지
            <br />
            함께 웃고, 함께 울며, 함께 성장해온
            <br />
            저희 두 사람이 이제는 한 걸음 더 나아가
            <br />
            '부부'라는 이름으로 새로운 여정을 시작하려 합니다.
            <br />
            <br />
            저희의 특별한 순간을 함께 나누어 주시고
            <br />
            앞으로의 길을 축복해 주시면 감사하겠습니다.
          </IntroText>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 1 }}
        >
          <QuestionText>청첩장에 입장하시겠습니까?</QuestionText>
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
