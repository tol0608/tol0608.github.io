import { useState, forwardRef, useCallback, useRef, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import sero3 from "../../assets/img/gallery/compressed/sero3-toledit.jpg";
import sero4 from "../../assets/img/gallery/compressed/sero4-toledit.jpg";
import sero5 from "../../assets/img/gallery/compressed/sero5-toledit.jpg";
import sero6 from "../../assets/img/gallery/compressed/sero6-toledit.jpg";
import sero7 from "../../assets/img/gallery/compressed/sero7-toledit.jpg";
import sero8 from "../../assets/img/gallery/compressed/sero8-toledit.jpg";
import sero9 from "../../assets/img/gallery/compressed/sero9-toledit.jpg";
import sero10 from "../../assets/img/gallery/compressed/sero10-toledit.jpg";
import sero11 from "../../assets/img/gallery/compressed/sero11.jpg";
import sero12 from "../../assets/img/gallery/compressed/sero12.jpg";
import sero13 from "../../assets/img/gallery/compressed/IMG_1732.JPG";
import sero14 from "../../assets/img/gallery/compressed/IMG_1733.JPG";
import studio1 from "../../assets/img/gallery/compressed/HCG_0079-toledit.jpg";
import studio2 from "../../assets/img/gallery/compressed/HCG_0301-toledit.jpg";
import studio3 from "../../assets/img/gallery/compressed/HCG_0597-toledit.jpg";
import studio4 from "../../assets/img/gallery/compressed/HCG_0564-toledit.jpg";
import studio5 from "../../assets/img/gallery/compressed/HCG_0626-toledit.jpg";
import studio6 from "../../assets/img/gallery/compressed/HCG_0840-toledit.jpg";
import studio7 from "../../assets/img/gallery/compressed/HCG_0025-toledit 2.jpg";
import studio8 from "../../assets/img/gallery/compressed/HCG_0678-toledit.jpg";
import studio9 from "../../assets/img/gallery/compressed/HCG_0766-toledit.jpg";
import studio10 from "../../assets/img/gallery/compressed/HCG_0533-toledit.jpg";
import studio11 from "../../assets/img/gallery/compressed/HCG_0517-toledit.jpg";
import studio12 from "../../assets/img/gallery/compressed/HCG_0328-toledit.jpg";

// 이미지 목록 (실제 이미지 경로로 교체 필요)
const images = [
  { id: 3, src: sero14, alt: "웨딩 사진 3" },
  { id: 4, src: sero3, alt: "웨딩 사진 4" },
  { id: 5, src: sero5, alt: "웨딩 사진 5" },
  { id: 6, src: sero6, alt: "웨딩 사진 6" },
  { id: 7, src: sero7, alt: "웨딩 사진 7" },
  { id: 9, src: sero9, alt: "웨딩 사진 9" },
  { id: 10, src: sero10, alt: "웨딩 사진 10" },
  { id: 8, src: sero8, alt: "웨딩 사진 8" },
  { id: 11, src: sero11, alt: "웨딩 사진 11" },
  { id: 12, src: sero13, alt: "웨딩 사진 12" },
  { id: 13, src: sero12, alt: "웨딩 사진 13" },
  { id: 14, src: sero4, alt: "웨딩 사진 14" },
  { id: 15, src: studio1, alt: "웨딩 사진 15" },
  { id: 16, src: studio7, alt: "웨딩 사진 18" },
  { id: 17, src: studio2, alt: "웨딩 사진 16" },
  { id: 18, src: studio12, alt: "웨딩 사진 25" },
  { id: 19, src: studio3, alt: "웨딩 사진 17" },
  { id: 20, src: studio4, alt: "웨딩 사진 16" },
  { id: 21, src: studio5, alt: "웨딩 사진 17" },
  { id: 22, src: studio6, alt: "웨딩 사진 18" },
  { id: 23, src: studio8, alt: "웨딩 사진 20" },
  { id: 24, src: studio9, alt: "웨딩 사진 21" },
  { id: 25, src: studio10, alt: "웨딩 사진 22" },
  { id: 26, src: studio11, alt: "웨딩 사진 23" },
];

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

  const goToNext = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % images.length);
    }
  };

  const goToPrev = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        selectedImageIndex === 0 ? images.length - 1 : selectedImageIndex - 1
      );
    }
  };

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
  }, [selectedImageIndex]);

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
