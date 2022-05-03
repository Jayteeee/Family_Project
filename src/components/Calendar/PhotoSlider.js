import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { DummyData } from "../../shared/DummyData";

const PhotoSlider = ({}) => {
  //전체값의 순서랑 게시물 하나의 번호 비교
  const settings = {
    arrows: false, //화살표 x
    dots: true, //이동 점
    infinite: false, //끝-처음 반복
    slidesToShow: 1, //한화면에 보이는 개수
    slidesToScroll: 1, //넘어가는 화면 수
  };

  const list = DummyData.photoModalList;

  console.log(list);
  return (
    <>
      <Styled_Slide
        {...settings}
        dotsClass="reset"
        className="res-ss res-reset"
      >
        {list.map((x) => {
          return (
            <div className="res-ss" key={x.photoId}>
              <p>날짜</p>
              <img
                key={x.photoId}
                alt="photoId"
                src={x.photoFile}
                className="res-ss"
              />
            </div>
          );
        })}
      </Styled_Slide>
    </>
  );
};
const Styled_Slide = styled(Slider)`
  .slick-list {
    //얘로 크기조정
    max-width: 100%;
    width: 90%;
    max-height: 100%;
    height: auto;
    object-fit: contain;
    border-radius: 10px;
    align-items: center;
    text-align: start;
    margin: auto;
    @media only screen and (max-width: 839px) {
      margin: 0px;
    }
  }
  img {
    height: 100%;
    width: 100%;
    align-items: center;
  }
  .reset {
    transform: none;
    list-style: none;
    align-items: center;
    justify-content: center;
    background-color: transparent;
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
    opacity: 0.75;
    color: #6d6968;
    cursor: pointer;
  }

  .reset li.slick-active button:before {
    opacity: 0.75;
    color: #000;
  }
`;
export default PhotoSlider;
