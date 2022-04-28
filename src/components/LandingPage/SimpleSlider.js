import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import image from "../../shared/images/profile_img.png";

const SimpleSlider = () => {
  const params = useParams();
  //전체값의 순서랑 게시물 하나의 번호 비교
  const settings = {
    arrows: false, //화살표 x
    dots: true, //이동 점
    infinite: false, //끝-처음 반복
    slidesToShow: 1, //한화면에 보이는 개수
    slidesToScroll: 1, //넘어가는 화면 수
    vertical: true,
    verticalSwiping: true,
  };
  return (
    <>
      <Styled_Slide {...settings} dotsClass="reset">
        <div>
          <div>두꺼운 글자</div>
          <div>글자도 넘어가나?</div>
          <img alt="description1" src={image} />
        </div>
        <div>
          <img alt="description2" src={image} />
        </div>
        <div>
          <img alt="description3" src={image} />
        </div>
      </Styled_Slide>
    </>
  );
};
const Styled_Slide = styled(Slider)`
  .slick-list {
    //얘로 크기조정
    max-width: 600px;
    max-height: 600px;
    object-fit: contain;
    background: #fff0f3;
    border-radius: 10px;
    align-items: center;
    text-align: start;
    font-size: 20px;
    margin-left: 40px;
  }
  img {
    width: 90%;
    height: auto;
    align-items: center;
  }
  .reset {
    height: auto;
    bottom: 2rem;
    transform: none;
    list-style: none;
    text-align: end;
    position: absolute;
    display: flex !important;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0;
    background-color: transparent;
    z-index: 1;
  }
  .reset li {
    position: relative;
    display: inline-block;
    height: 1.25rem;
    width: 1.25rem;
    padding: 0;
    cursor: pointer;
  }

  .reset li button {
    font-size: 0;
    line-height: 0;
    display: block;
    width: 20px;
    height: 20px;
    padding: 5px;
    cursor: pointer;
    color: transparent;
    border: 0;
    outline: 0;
    background: 0 0;
  }

  .reset li button:before {
    font-size: 2.7rem;
    line-height: 20px;
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    content: "•";
    text-align: center;
    opacity: 0.75;
    color: #6d6968;
  }

  .reset li.slick-active button:before {
    opacity: 0.75;
    color: #ffffff;
  }
`;
export default SimpleSlider;
