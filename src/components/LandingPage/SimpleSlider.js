import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import image from "../../shared/images/noImage.png";
import landing1 from "../../shared/images/landing_page_1.png";
import landing2 from "../../shared/images/landing_page_2.png";
import landing3 from "../../shared/images/landing_page_3.png";
import landing4 from "../../shared/images/landing_page_4.png";
import landing5 from "../../shared/images/landing_page_5.png";

import { Text } from "../../elements";

const SimpleSlider = () => {
  //전체값의 순서랑 게시물 하나의 번호 비교
  const settings = {
    arrows: false, //화살표 x
    dots: true, //이동 점
    infinite: false, //끝-처음 반복
    slidesToShow: 1, //한화면에 보이는 개수
    slidesToScroll: 1, //넘어가는 화면 수
  };
  return (
    <>
      <Styled_Slide
        {...settings}
        dotsClass="reset"
        className="res-ss res-reset"
      >
        <Container className="res-ss">
          <img alt="description1" src={landing1} className="res-ss" />
        </Container>
        <Container className="res-ss">
          <img alt="description2" src={landing2} className="res-ss" />
        </Container>
        <Container className="res-ss">
          <img alt="description3" src={landing3} className="res-ss" />
        </Container>
        <Container className="res-ss">
          <img alt="description4" src={landing4} className="res-ss" />
        </Container>
        <Container className="res-ss">
          <img alt="description4" src={landing5} className="res-ss" />
        </Container>
      </Styled_Slide>
    </>
  );
};
const Styled_Slide = styled(Slider)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  .slick-list {
    //얘로 크기조정
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: 10px;
    align-items: center;
    @media only screen and (max-width: 839px) {
      margin: 0px;
    }
  }
  img {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .reset {
    transform: none;
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    @media only screen and (max-width: 839px) {
      display: flex;
      flex-direction: row;
      bottom: 0px;
      position: relative;
    }
  }
  .reset li {
    position: relative;
    display: inline-block;
    height: 1.8rem;
    width: 1.8rem;
    margin: 10px 0px;
  }

  .reset li button {
    font-size: 0;
    line-height: 0;
    display: block;
    height: 1.8rem;
    width: 1.8rem;
    color: transparent;
    border: 0;
    outline: 0;
    background: 0 0;
  }

  .reset li button:before {
    font-size: 3rem;
    position: absolute;
    top: 0;
    left: 0;
    height: 1.8rem;
    width: 1.8rem;
    content: "•";
    text-align: center;
    color: #dbdbdb;
    cursor: pointer;
  }

  .reset li.slick-active button:before {
    opacity: 0.75;
    color: #6371f7;
  }
`;

const Container = styled.div``;
export default SimpleSlider;
