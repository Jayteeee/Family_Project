import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import image from "../../shared/images/profile_img.png";

const SimpleSlider = () => {
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
      <Styled_Slide
        {...settings}
        dotsClass="reset"
        className="res-ss res-reset"
      >
        <div className="res-ss">
          <h3 className="res-ss">
            도란도란의 캘린더 기능은
            <br />
            가족들의 일정을 한눈에 파악할 수 있도록 돕습니다.
          </h3>
          <h5 className="res-ss">
            부모님 생신 잊어버린 적 있으시죠? <br />
            그러고 싶지 않았지만 잊고 부랴부랴 챙기는 경험, 이제는 없어집니다!
          </h5>
          <img alt="description1" src={image} className="res-ss" />
        </div>
        <div className="res-ss">
          <h3 className="res-ss">
            도란도란의 미션 기능은
            <br />
            가족들과의 관계 개선을 돕습니다.
          </h3>
          <h5 className="res-ss">
            부모님께 연락드리기 잊으신 적 있으시죠? <br />
            중요하지만 미루게 되는 가족들과의 관계 개선! 다양한 미션을 통해
            해결해보세요.
          </h5>
          <img alt="description2" src={image} className="res-ss" />
        </div>
        <div className="res-ss">
          <h3 className="res-ss">
            도란도란의 갤러리 기능은
            <br />
            가족들과의 추억을 한눈에 파악할 수 있도록 돕습니다.
          </h3>
          <h5 className="res-ss">
            지난 번에 올렸던 귀여운 손주사진을 못찾으시겠다구요? <br />
            도란도란 캘린더 기능으로 소중한 추억 원할 때마다 편하게 찾아보세요!
          </h5>
          <img alt="description3" src={image} className="res-ss" />
        </div>
      </Styled_Slide>
    </>
  );
};
const Styled_Slide = styled(Slider)`
  .slick-list {
    //얘로 크기조정
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: 10px;
    align-items: center;
    text-align: start;
    margin-left: 40px;
    @media only screen and (max-width: 839px) {
      margin: 0px;
    }
  }
  img {
    height: auto;
    align-items: center;
  }
  .reset {
    bottom: 2rem;
    transform: none;
    list-style: none;
    text-align: end;
    position: absolute;
    display: flex !important;
    flex-direction: column;
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
    opacity: 0.75;
    color: #6d6968;
    cursor: pointer;
  }

  .reset li.slick-active button:before {
    opacity: 0.75;
    color: #000;
  }
`;
export default SimpleSlider;
