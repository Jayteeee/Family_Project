import React from "react";
import Slider from "react-slick";
import Slick from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { DummyData } from "../../shared/DummyData";
import { MdChevronLeft, MdChevronRight, MdClose } from "react-icons/md";

const PhotoSlider = ({ onClose }) => {
  const list = DummyData.photoModalList;

  const settings = {
    arrows: true, //화살표 o
    dots: true, //이동 점
    infinite: true, //끝-처음 반복
    slidesToShow: 1, //한화면에 보이는 개수
    slidesToScroll: 1, //넘어가는 화면 수
    customPaging: function (i) {
      const imgSrc = list[i].photoFile;
      return (
        <PagingAnchor>
          {" "}
          <Paging src={imgSrc} />{" "}
        </PagingAnchor>
      );
    },
  };
  //전체값의 순서랑 게시물 하나의 번호 비교

  const slider = React.useRef(null);
  const slickRef = React.useRef(null);

  return (
    <>
      <Styled_Slide
        {...settings}
        dotsClass="slick-dots slick-thumb"
        className="res-ss res-reset"
        ref={slider}
      >
        {list.map((x) => {
          return (
            <div className="res-ss" key={x.photoId}>
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
      <XButton
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        <MdClose />
      </XButton>
      <PButton onClick={() => slider?.current?.slickPrev()}>
        <MdChevronLeft />
      </PButton>
      <NButton onClick={() => slider?.current?.slickNext()}>
        <MdChevronRight />
      </NButton>
    </>
  );
};
const XButton = styled.div`
  position: absolute;
  display: flex;
  width: 40px;
  height: 40px;
  padding: 0;
  font-size: 40px;
  color: white;
  align-items: center;
  justify-content: center;
  top: 11%;
  right: 11%;
  cursor: pointer;
  z-index: 1;
`;

const Styled_Slide = styled(Slider)`
  .slick-list {
    //얘로 크기조정
    max-width: 80%;
    max-height: 80%;
    object-fit: contain;
    align-items: center;
    text-align: start;
    margin: auto;
    /* @media only screen and (max-width: 839px) {
      margin: 0px;
    } */
    img {
      height: 100%;
      width: 100%;
    }
  }

  .slick-dots.slick-thumb {
    position: absolute;
    display: flex;
    align-items: baseline;
    bottom: 5%;
    right: 27%;
    list-style: none;
    li {
      position: relative;
      display: inline-block;
      margin: 0 50px;
      &.slick-active {
        span {
          filter: none;
        }
      }
    }
  }
`;
const PagingAnchor = styled.a`
  display: block;
  width: 100px;
  height: 100px;
  img {
    width: 100%;
    height: 100%;
  }
`;
const Paging = styled.span`
  display: inline-block;
  width: 100%;
  height: 100%;
  vertical-align: end;
  background: no-repeat url(${(props) => props.src});
  background-size: 100% 100%;
`;

const PButton = styled.div`
  position: absolute;
  left: 0;
  color: white;
  font-size: 80px;
  cursor: pointer;
`;
const NButton = styled.div`
  position: absolute;
  right: 0;
  color: white;
  font-size: 80px;
  cursor: pointer;
`;
export default PhotoSlider;
