import { useEffect } from "react";
import styled from "styled-components";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

interface HorizontalScrollProps {
  triggerElement: React.RefObject<HTMLElement>;
  endElement: React.RefObject<HTMLElement>;
  containerRef: React.RefObject<HTMLElement>;
}

const HorizontalScroll = ({
  triggerElement,
  endElement,
  containerRef,
}: HorizontalScrollProps) => {
  useEffect(() => {
    if (!triggerElement.current || !containerRef.current || !endElement.current)
      return;

    // GSAP 플러그인 등록
    gsap.registerPlugin(ScrollTrigger);

    // 초기 상태 설정
    gsap.set(".panel", { opacity: 0 });
    gsap.set(".panel-1", { opacity: 1 });

    ScrollTrigger.create({
      trigger: triggerElement.current,
      endTrigger: endElement.current,
      start: "top 90%", // 트리거 요소가 화면 상단 90% 지점에 도달했을 때 시작
      end: "bottom 0%", // 트리거 요소가 화면 하단 10% 지점에 도달했을 때 종료
      pin: false,
      pinSpacing: true,
      scrub: 1.5,
      markers: false,
      scroller: containerRef.current,
      onUpdate: (self) => {
        const progress = self.progress;
        // console.log('Progress:', progress);

        // 첫 번째 패널 (0 ~ 0.33)
        if (progress < 0.33) {
          gsap.to(".panel-1", {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: "power1.inOut",
          });
          gsap.to(".panel-2", {
            opacity: 0,
            y: 50,
            duration: 0.3,
            ease: "power1.inOut",
          });
          gsap.to(".panel-3", {
            opacity: 0,
            y: 50,
            duration: 0.3,
            ease: "power1.inOut",
          });
        }
        // 두 번째 패널 (0.33 ~ 0.66)
        else if (progress < 0.55) {
          gsap.to(".panel-1", {
            opacity: 0,
            y: -50,
            duration: 0.3,
            ease: "power1.inOut",
          });
          gsap.to(".panel-2", {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: "power1.inOut",
          });
          gsap.to(".panel-3", {
            opacity: 0,
            y: 50,
            duration: 0.3,
            ease: "power1.inOut",
          });
        }
        // 세 번째 패널 (0.66 ~ 1)
        else {
          gsap.to(".panel-1", {
            opacity: 0,
            y: -50,
            duration: 0.3,
            ease: "power1.inOut",
          });
          gsap.to(".panel-2", {
            opacity: 0,
            y: -50,
            duration: 0.3,
            ease: "power1.inOut",
          });
          gsap.to(".panel-3", {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: "power1.inOut",
          });
        }
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [triggerElement, endElement, containerRef]);

  return (
    <Section>
      <Wrapper>
        <Panel className=" panel-1">
          <h2>Our Story</h2>
          <p>처음 만난 날부터 지금까지...</p>
        </Panel>
        <Panel className=" panel-2">
          <h2>The Proposal</h2>
          <p>서로를 향한 약속...</p>
        </Panel>
        <Panel className=" panel-3">
          <h2>Our Future</h2>
          <p>함께할 미래...</p>
        </Panel>
      </Wrapper>
    </Section>
  );
};

const Section = styled.section`
  height: 500vh;
  width: 100%;
  position: relative;
  max-width: inherit;
  margin: 0 auto;
`;

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  position: sticky;
  top: 0;
  overflow: hidden;
  max-width: inherit;
`;

const Panel = styled.div`
  height: 80vh;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  max-width: inherit;
  will-change: opacity, transform;

  h2 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.5rem;
    color: #666;
  }
`;

export default HorizontalScroll;
