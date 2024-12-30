import { useState, forwardRef, useCallback } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CloseIcon from '@mui/icons-material/Close';
import galleryImage1 from "../../assets/img/gallery/gallery_1.jpeg";
import galleryImage2 from "../../assets/img/gallery/gallery_2.jpeg";
import galleryImage3 from "../../assets/img/gallery/gallery_3.jpeg";
import galleryImage4 from "../../assets/img/gallery/gallery_4.jpeg";
import galleryImage5 from "../../assets/img/gallery/gallery_5.jpeg";
import galleryImage6 from "../../assets/img/gallery/gallery_6.jpeg";
import galleryImage7 from "../../assets/img/gallery/gallery_7.jpeg";
import galleryImage8 from "../../assets/img/gallery/gallery_8.jpeg";

// 이미지 목록 (실제 이미지 경로로 교체 필요)
const images = [
  { id: 1, src: galleryImage1, alt: '웨딩 사진 1' },
  { id: 2, src: galleryImage2, alt: '웨딩 사진 2' },
  { id: 3, src: galleryImage3, alt: '웨딩 사진 3' },
  { id: 4, src: galleryImage4, alt: '웨딩 사진 4' },
  { id: 5, src: galleryImage5, alt: '웨딩 사진 5' },
  { id: 6, src: galleryImage6, alt: '웨딩 사진 6' },
  { id: 7, src: galleryImage7, alt: '웨딩 사진 7' },
  { id: 8, src: galleryImage8, alt: '웨딩 사진 8' },
];

interface GalleryProps {
  ref?: React.RefObject<HTMLElement>;
}

const Gallery = forwardRef<HTMLElement, GalleryProps>((props, ref) => {
  const [showAll, setShowAll] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [inViewRef, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // ref 병합을 위한 콜백
  const setRefs = useCallback(
    (node: HTMLElement | null) => {
      // React.ForwardedRef는 함수일 수도 있으므로 체크
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
      inViewRef(node);
    },
    [inViewRef, ref]
  );
  
  const visibleImages = showAll ? images : images.slice(0, 4);

  const handleImageClick = (src: string) => {
    setSelectedImage(src);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
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
              onClick={() => handleImageClick(image.src)}
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
          <MoreButton onClick={() => setShowAll(true)}>
            더보기
          </MoreButton>
        ) : (
          <MoreButton onClick={() => setShowAll(false)}>
            접기
          </MoreButton>
        )}

        <AnimatePresence>
          {selectedImage && (
            <Modal
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
            >
              <ModalContent onClick={e => e.stopPropagation()}>
                <CloseButton onClick={handleCloseModal}>
                  <CloseIcon />
                </CloseButton>
                <ModalImage src={selectedImage} alt="확대된 이미지" />
              </ModalContent>
            </Modal>
          )}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
});

Gallery.displayName = 'Gallery';

const Section = styled.section`
  padding: 80px 20px;
  background-color: white;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
  text-align: center;
  margin-bottom: 40px;
  font-family: 'Nanum Myeongjo', serif;
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
  margin-top: ${({ $isEven }) => $isEven ? '0' : '24px'};

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
`;

const ModalImage = styled.img`
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
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

export default Gallery; 