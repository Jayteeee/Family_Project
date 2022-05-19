import React from "react";
import Slider from "react-slick";
import Slick from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { DummyData } from "../../shared/DummyData";
import { MdChevronLeft, MdChevronRight, MdClose } from "react-icons/md";
import { useSelector } from "react-redux";
import { Divider } from "@material-ui/core";

const PhotoSlider = ({ onClose }) => {
  // const list = DummyData.photoModalList;
  const list = useSelector((state) => state.calendar?.photoOneList);

  const settings = {
    arrows: false, //화살표 x
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

  return (
    <Container>
      <Styled_Slide
        {...settings}
        dotsClass="slick-dots slick-thumb"
        className="res-ss res-reset"
        ref={slider}
      >
        {list
          ? list.map((x) => {
              return (
                <PhotoBox className="res-ss" key={x.photoId}>
                  <Photo alt="photoId" src={x.photoFile} className="res-ss" />
                </PhotoBox>
              );
            })
          : null}
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
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;

const Styled_Slide = styled(Slider)`
  .slick-list {
    //얘로 크기조정
    display: flex;
    flex-direction: column;
    max-width: 800px;
    max-height: 800px;
    width: 100%;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin: auto;
  }

  .slick-dots.slick-thumb {
    position: absolute;
    left: -3%;
    list-style: none;
    display: flex !important;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    li {
      margin: 0 5%;
    }
    // Medium (Tablet)
    @media screen and (max-width: 1024px) {
      li {
        margin: 0 4%;
      }
    }
    @media only screen and (max-width: 839px) {
      li {
        margin: 0 3%;
      }
    }
  }
`;

const PhotoBox = styled.div`
  /* position: fixed; */
  display: flex;
  top: 50%;
  right: 50%;
  max-height: 800px;
  height: 800px;
  max-width: 800px;
  width: 800px;

  overflow: auto;
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    max-width: 600px;
    max-height: 600px;
  }
  @media only screen and (max-width: 839px) {
    max-width: 500px;
    max-height: 500px;
  }
  @media only screen and (max-width: 412px) {
    max-width: 300px;
    max-height: 300px;
  }
`;

const Photo = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  margin: auto;

  overflow: auto;
`;

const PagingAnchor = styled.a`
  /* position: absolute; */
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100px;
  height: 100px;
  img {
    width: 100%;
    height: 100%;
  }
`;
const Paging = styled.span`
  display: flex;
  width: 100%;
  height: 100%;
  /* vertical-align: end; */
  background: no-repeat url(${(props) => props.src});
  background-size: cover;

  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    width: 70%;
    height: 70%;
  }
  @media only screen and (max-width: 839px) {
    width: 50%;
    height: 50%;
  }
  @media only screen and (max-width: 412px) {
    width: 40%;
    height: 40%;
  }
`;

const XButton = styled.div`
  position: fixed;
  display: flex;
  width: 60px;
  height: 60px;
  padding: 0;
  font-size: 40px;
  color: white;
  align-items: center;
  justify-content: center;
  top: 5%;
  right: 5%;
  cursor: pointer;
  z-index: 1;
  & > svg {
    width: 100%;
    height: 100%;
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    width: 40px;
    height: 40px;
  }
  @media only screen and (max-width: 839px) {
    width: 30px;
    height: 30px;
  }
`;

const PButton = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  color: white;
  font-size: 80px;
  cursor: pointer;

  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    font-size: 40px;
  }
  @media only screen and (max-width: 839px) {
    font-size: 40px;
  }
`;
const NButton = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  color: white;
  font-size: 80px;
  cursor: pointer;

  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    font-size: 40px;
  }
  @media only screen and (max-width: 839px) {
    font-size: 40px;
  }
`;
export default PhotoSlider;
