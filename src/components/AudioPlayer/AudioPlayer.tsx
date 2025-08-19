import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

interface AudioPlayerProps {
  audioSrc: string;
  autoPlay?: boolean;
  loop?: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audioSrc,
  autoPlay = true,
  loop = true,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [showControls, setShowControls] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // 초기 볼륨 설정
    audio.volume = volume;
    audio.loop = loop;

    // 오류 처리
    const handleError = (e: Event) => {
      console.error("오디오 로딩 오류:", e);
      console.error("오디오 소스:", audioSrc);
      setIsPlaying(false);
    };

    const handleLoadStart = () => {
      console.log("오디오 로딩 시작:", audioSrc);
    };

    const handleCanPlay = () => {
      console.log("오디오 재생 가능:", audioSrc);
      setAudioLoaded(true);

      // 오디오가 로딩 완료되면 자동 재생 시도
      if (autoPlay) {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log("오디오 로딩 후 자동 재생 성공");
              setIsPlaying(true);
            })
            .catch((error) => {
              console.log("오디오 로딩 후 자동 재생 실패:", error);
              setIsPlaying(false);
              // 사용자 상호작용 후 재생 시도
              const handleUserInteraction = () => {
                audio
                  .play()
                  .then(() => {
                    setIsPlaying(true);
                    document.removeEventListener(
                      "click",
                      handleUserInteraction
                    );
                    document.removeEventListener(
                      "touchstart",
                      handleUserInteraction
                    );
                  })
                  .catch(console.error);
              };
              document.addEventListener("click", handleUserInteraction);
              document.addEventListener("touchstart", handleUserInteraction);
            });
        }
      }
    };

    // 이벤트 리스너
    const handlePlay = () => {
      console.log("오디오 재생 시작");
      setIsPlaying(true);
    };
    const handlePause = () => {
      console.log("오디오 일시정지");
      setIsPlaying(false);
    };
    const handleEnded = () => {
      console.log("오디오 재생 종료");
      setIsPlaying(false);
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);
    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("canplay", handleCanPlay);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("loadstart", handleLoadStart);
      audio.removeEventListener("canplay", handleCanPlay);
    };
  }, [autoPlay, loop, audioSrc]);

  // 컨트롤러 영역 밖 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showControls &&
        controlsRef.current &&
        !controlsRef.current.contains(event.target as Node)
      ) {
        setShowControls(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showControls]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((error) => {
        console.log("재생 실패:", error);
      });
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = volume;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);

    const audio = audioRef.current;
    if (audio) {
      audio.volume = newVolume;
      if (newVolume === 0) {
        setIsMuted(true);
      } else if (isMuted) {
        setIsMuted(false);
      }
    }
  };

  const toggleControls = () => {
    setShowControls(!showControls);
  };

  return (
    <PlayerContainer>
      <audio ref={audioRef} src={audioSrc} preload="metadata" />

      {/* 플로팅 음표 버튼 */}
      <FloatingMusicButton
        onClick={toggleControls}
        $isPlaying={isPlaying && audioLoaded}
        $disabled={showControls}
        $show={!showControls}
      >
        <MusicNoteIcon />
      </FloatingMusicButton>

      {/* 컨트롤러 패널 */}
      <ControlsPanel
        ref={controlsRef}
        $show={showControls}
        onClick={(e) => e.stopPropagation()}
      >
        <ControlButton onClick={togglePlay}>
          {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
        </ControlButton>

        <VolumeControl>
          <VolumeButton onClick={toggleMute}>
            {isMuted || volume === 0 ? <VolumeOffIcon /> : <VolumeUpIcon />}
          </VolumeButton>

          <VolumeSlider
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
          />
        </VolumeControl>
      </ControlsPanel>
    </PlayerContainer>
  );
};

const PlayerContainer = styled.div`
  position: fixed;
  bottom: 100px;
  right: 22px;
  z-index: 1000;

  @media (max-width: 768px) {
    bottom: 20px;
    right: 10px;
  }
`;

const FloatingMusicButton = styled.button<{
  $isPlaying: boolean;
  $disabled: boolean;
  $show: boolean;
}>`
  position: relative;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: none;
  cursor: ${({ $disabled }) => ($disabled ? "default" : "pointer")};
  display: ${({ $show }) => ($show ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  z-index: 1001;
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  pointer-events: ${({ $disabled }) => ($disabled ? "none" : "auto")};

  &:hover {
    background: ${({ $disabled }) =>
      $disabled ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.95)"};
    box-shadow: ${({ $disabled }) =>
      $disabled
        ? "0 4px 12px rgba(0, 0, 0, 0.1)"
        : "0 6px 20px rgba(0, 0, 0, 0.15)"};
    transform: ${({ $disabled }) => ($disabled ? "scale(1)" : "scale(1.05)")};
  }

  svg {
    font-size: 24px;
    color: #333;
    animation: ${({ $isPlaying }) =>
      $isPlaying ? "musicWave 1s ease-in-out infinite" : "none"};
  }

  @keyframes musicWave {
    0%,
    100% {
      transform: translateX(0) translateY(0);
    }
    25% {
      transform: translateX(2px) translateY(-2px);
    }
    50% {
      transform: translateX(-1px) translateY(1px);
    }
    75% {
      transform: translateX(1px) translateY(-1px);
    }
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    bottom: 80px;
    right: 15px;

    svg {
      font-size: 20px;
    }
  }
`;

const ControlsPanel = styled.div<{ $show: boolean }>`
  position: absolute;
  bottom: 70px;
  right: 0;
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 12px 16px;
  border-radius: 50px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  visibility: ${({ $show }) => ($show ? "visible" : "hidden")};
  transform: ${({ $show }) => ($show ? "translateY(0)" : "translateY(10px)")};
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    bottom: 60px;
    right: 0;
    padding: 10px 14px;
    gap: 10px;
  }
`;

const ControlButton = styled.button`
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }

  svg {
    font-size: 24px;
  }

  @media (max-width: 768px) {
    padding: 6px;
    svg {
      font-size: 20px;
    }
  }
`;

const VolumeControl = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const VolumeButton = styled.button`
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }

  svg {
    font-size: 18px;
  }

  @media (max-width: 768px) {
    svg {
      font-size: 16px;
    }
  }
`;

const VolumeSlider = styled.input`
  width: 60px;
  height: 4px;
  border-radius: 2px;
  background: #ddd;
  outline: none;
  -webkit-appearance: none;
  appearance: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #333;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #333;
    cursor: pointer;
    border: none;
  }

  @media (max-width: 768px) {
    width: 50px;
  }
`;

export default AudioPlayer;
