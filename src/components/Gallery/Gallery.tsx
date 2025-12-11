import { useState, forwardRef, useCallback, useRef, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { GALLERY_IMAGES } from "../../config/images";

// 이미지 목록 (외부 호스팅 URL 사용)
const images = GALLERY_IMAGES.map((img) => ({
  id: img.id,
  src: img.url,
  alt: img.alt,
}));

interface GalleryProps {
  ref?: React.RefObject<HTMLElement>;
}

const Gallery = forwardRef<HTMLElement, GalleryProps>((_, ref) => {
  const [showAll, setShowAll] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const [inViewRef, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    document.oncontextmenu = function () {
      return false;
    };
  }, []);

  // 스와이프 관련 상태
  const [dragStart, setDragStart] = useState<number>(0);
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // ref 병합을 위한 콜백
  const setRefs = useCallback(
    (node: HTMLElement | null) => {
      // React.ForwardedRef는 함수일 수도 있으므로 체크
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
      inViewRef(node);
    },
    [inViewRef, ref]
  );

  const visibleImages = showAll ? images : images.slice(0, 4);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setSelectedImageIndex(null);
    setDragOffset(0);
    document.body.style.overflow = "auto";
  };

  const goToNext = useCallback(() => {
    setSelectedImageIndex((prev) => {
      if (prev !== null) {
        return (prev + 1) % images.length;
      }
      return prev;
    });
  }, []);

  const goToPrev = useCallback(() => {
    setSelectedImageIndex((prev) => {
      if (prev !== null) {
        return prev === 0 ? images.length - 1 : prev - 1;
      }
      return prev;
    });
  }, []);

  // 키보드 이벤트 처리
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex !== null) {
        if (e.key === "ArrowRight") {
          goToNext();
        } else if (e.key === "ArrowLeft") {
          goToPrev();
        } else if (e.key === "Escape") {
          handleCloseModal();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex, goToNext, goToPrev]);

  // 터치/마우스 이벤트 처리
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setDragStart(clientX);
    setIsDragging(true);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const offset = clientX - dragStart;
    setDragOffset(offset);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (Math.abs(dragOffset) > 50) {
      if (dragOffset > 0) {
        goToPrev();
      } else {
        goToNext();
      }
    }
    setDragOffset(0);
  };

  return (
    <Section ref={setRefs}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <Title>우리의 아름다운 순간</Title>

        <GridContainer>
          {visibleImages.map((image, index) => (
            <GridItem
              key={image.id}
              $isEven={index % 2 === 0}
              onClick={() => handleImageClick(index)}
            >
              <motion.img
                src={image.src}
                alt={image.alt}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              />
            </GridItem>
          ))}
        </GridContainer>

        {!showAll && images.length > 6 ? (
          <MoreButton onClick={() => setShowAll(true)}>더보기</MoreButton>
        ) : (
          <MoreButton onClick={() => setShowAll(false)}>접기</MoreButton>
        )}

        <AnimatePresence>
          {selectedImageIndex !== null && (
            <Modal
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
            >
              <ModalContent
                ref={modalRef}
                onClick={(e) => e.stopPropagation()}
                onMouseDown={handleDragStart}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
                onTouchStart={handleDragStart}
                onTouchMove={handleDragMove}
                onTouchEnd={handleDragEnd}
                style={{
                  transform: `translateX(${dragOffset}px)`,
                  transition: isDragging ? "none" : "transform 0.3s ease-out",
                }}
              >
                <CloseButton onClick={handleCloseModal}>
                  <CloseIcon />
                </CloseButton>

                <NavigationButton
                  $direction="left"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrev();
                  }}
                >
                  <ArrowBackIosIcon />
                </NavigationButton>

                <NavigationButton
                  $direction="right"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNext();
                  }}
                >
                  <ArrowForwardIosIcon />
                </NavigationButton>

                <ModalImage
                  src={images[selectedImageIndex].src}
                  alt={images[selectedImageIndex].alt}
                />

                <ImageCounter>
                  {selectedImageIndex + 1} / {images.length}
                </ImageCounter>
              </ModalContent>
            </Modal>
          )}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
});

Gallery.displayName = "Gallery";

const Section = styled.section`
  padding: 80px 20px;
  background-color: white;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
  text-align: center;
  margin-bottom: 40px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  max-width: 768px;
  margin: 0 auto;
`;

const GridItem = styled.div<{ $isEven: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
  margin-top: ${({ $isEven }) => ($isEven ? "0" : "24px")};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px;
    aspect-ratio: 3/4;
  }
`;

const MoreButton = styled.button`
  display: block;
  margin: 40px auto 0;
  padding: 12px 32px;
  background-color: transparent;
  border: 1px solid #ddd;
  border-radius: 25px;
  font-size: 1rem;
  color: #666;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled.div`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;

const ModalImage = styled.img`
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
  user-select: none;
  -webkit-user-drag: none;
`;

const CloseButton = styled.button`
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 8px;
  z-index: 1001;
`;

const NavigationButton = styled.button<{ $direction: "left" | "right" }>`
  position: absolute;
  top: 50%;
  ${({ $direction }) =>
    $direction === "left" ? "left: -60px;" : "right: -60px;"}
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 1001;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  @media (max-width: 768px) {
    ${({ $direction }) =>
      $direction === "left" ? "left: 10px;" : "right: 10px;"}
    width: 35px;
    height: 35px;
  }
`;

const ImageCounter = styled.div`
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 0.9rem;
  background: rgba(0, 0, 0, 0.5);
  padding: 8px 16px;
  border-radius: 20px;
`;

export default Gallery;
