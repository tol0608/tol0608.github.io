import { jsx as _jsx } from "react/jsx-runtime";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../assets/img/IMG_3608.jpeg";
import img2 from "../assets/img/IMG_3613.jpeg";
import img3 from "../assets/img/IMG_3708.jpeg";
import img4 from "../assets/img/IMG_3786.jpeg";
import img5 from "../assets/img/IMG_3912.jpeg";
const SliderWrapper = styled.div `
  width: 100%;
  height: 100%;

  .slick-slide {
    div {
      width: 100%;
      height: 50vh;
    }
  }

  .slick-slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const Home = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        fade: true,
        cssEase: "linear",
        arrows: false,
    };
    const images = [img1, img2, img3, img4, img5];
    return (_jsx(SliderWrapper, { children: _jsx(Slider, { ...settings, children: images.map((image, index) => (_jsx("div", { children: _jsx("img", { src: image, alt: `slide-${index}` }) }, index))) }) }));
};
export default Home;
