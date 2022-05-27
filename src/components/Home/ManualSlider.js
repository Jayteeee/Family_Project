import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import web1 from "../../shared/images/Web_01.png";
import web2 from "../../shared/images/Web_02.png";
import web3 from "../../shared/images/Web_03.png";
import web4 from "../../shared/images/Web_04.png";
import web5 from "../../shared/images/Web_05.png";
import Mobile1 from "../../shared/images/Mobile_01.png";
import Mobile2 from "../../shared/images/Mobile_02.png";
import Mobile3 from "../../shared/images/Mobile_03.png";
import Mobile4 from "../../shared/images/Mobile_04.png";
import Mobile5 from "../../shared/images/Mobile_05.png";
import left from "../../shared/images/arrow_back.svg";
import right from "../../shared/images/arrow_forward.svg";

import { Text } from "../../elements";

const ManualSlider = () => {
  //전체값의 순서랑 게시물 하나의 번호 비교
  const settings = {
    arrows: true, //화살표 x
    dots: true, //이동 점
    infinite: false, //끝-처음 반복
    slidesToShow: 1, //한화면에 보이는 개수
    slidesToScroll: 1, //넘어가는 화면 수
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <img
        className={className}
        alt="prevArrow"
        src={left}
        style={{
          ...style,
          zIndex: "2",
          position: "absolute",
          left: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "30px",
          height: "30px",
        }}
        onClick={onClick}
      />
    );
  }

  function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <img
        className={className}
        alt="nextArrow"
        src={right}
        style={{
          ...style,
          zIndex: "2",
          position: "absolute",
          right: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "30px",
          height: "30px",
        }}
        onClick={onClick}
      />
    );
  }

  return (
    <>
      <Web>
        <Styled_Slide {...settings} dotsClass="reset">
          <Container>
            <TextBox>
              <Title>
                <Text H2>우리가족 소통공간, 도란도란</Text>
              </Title>
              <SubTitle>
                <Text B1>
                  우리 가족만의 공간에서 추억을 공유하고 소통해보세요.
                </Text>
              </SubTitle>
            </TextBox>
            <img alt="description1" src={web1} />
          </Container>
          <Container>
            <TextBox>
              <Title>
                <Text H2>함께 달성하는 재미를 느낄 수 있는 미션</Text>
              </Title>
              <SubTitle>
                <Text B1>
                  일상 속 작은 챌린지부터 가족의 버킷리스트도 좋아요!
                </Text>
              </SubTitle>
            </TextBox>
            <img alt="description2" src={web2} />
          </Container>
          <Container>
            <TextBox>
              <Title>
                <Text H2>가족 모두가 추가하고 편집할 수 있는 가족 캘린더</Text>
              </Title>
              <SubTitle>
                <Text B1>우리 가족의 일정을 한 눈에 파악할 수 있어요.</Text>
              </SubTitle>
            </TextBox>
            <img alt="description3" src={web3} />
          </Container>
          <Container>
            <TextBox>
              <Title>
                <Text H2>남는 건 사진인 거 아시죠? 우리 가족만의 갤러리</Text>
              </Title>
              <SubTitle>
                <Text B1>우리 가족의 일정을 한 눈에 파악할 수 있어요.</Text>
              </SubTitle>
            </TextBox>
            <img alt="description4" src={web4} />
          </Container>
          <Container>
            <TextBox>
              <Title>
                <Text H2>
                  듣고 싶은 목소리를 언제든 꺼내들을 수 있는 음성 메시지
                </Text>
              </Title>
              <SubTitle>
                <Text B1>
                  직접 하지 못했던 말, 음성 메시지로 전해보는 건 어때요?
                </Text>
              </SubTitle>
            </TextBox>
            <img alt="description4" src={web5} />
          </Container>
        </Styled_Slide>
      </Web>
      <Mobile>
        <Styled_Slide {...settings} dotsClass="reset">
          <Container>
            <TextBox>
              <Title>
                <Text S2>우리가족 소통공간, 도란도란</Text>
              </Title>
              <SubTitle>
                <Text C>
                  우리 가족만의 공간에서 추억을 공유하고 소통해보세요.
                </Text>
              </SubTitle>
            </TextBox>
            <img alt="description1" src={Mobile1} />
          </Container>
          <Container>
            <TextBox>
              <Title>
                <Text S2>함께 달성하는 재미를 느낄 수 있는 미션</Text>
              </Title>
              <SubTitle>
                <Text C>
                  일상 속 작은 챌린지부터 가족의 버킷리스트도 좋아요!
                </Text>
              </SubTitle>
            </TextBox>
            <img alt="description2" src={Mobile2} />
          </Container>
          <Container>
            <TextBox>
              <Title>
                <Text S2>가족 모두가 추가하고 편집할 수 있는 가족 캘린더</Text>
              </Title>
              <SubTitle>
                <Text C>우리 가족의 일정을 한 눈에 파악할 수 있어요.</Text>
              </SubTitle>
            </TextBox>
            <img alt="description3" src={Mobile3} />
          </Container>
          <Container>
            <TextBox>
              <Title>
                <Text S2>남는 건 사진인 거 아시죠? 우리 가족만의 갤러리</Text>
              </Title>
              <SubTitle>
                <Text C>차곡차곡 앨범별로 정리하고 댓글도 남겨보세요.</Text>
              </SubTitle>
            </TextBox>
            <img alt="description4" src={Mobile4} />
          </Container>
          <Container>
            <TextBox>
              <Title>
                <Text S2>
                  듣고 싶은 목소리를 언제든 꺼내들을 수 있는 음성 메시지
                </Text>
              </Title>
              <SubTitle>
                <Text C className="res-ss">
                  직접 하지 못했던 말, 음성 메시지로 전해보는 건 어때요?
                </Text>
              </SubTitle>
            </TextBox>
            <img alt="description4" src={Mobile5} className="res-ss" />
          </Container>
        </Styled_Slide>
      </Mobile>
    </>
  );
};
const Styled_Slide = styled(Slider)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-height: 100%;
  max-width: 1000px;
  height: 100%;
  width: 100%;
  padding: 5%;
  background-color: #eff1fe;
  & :focus-visible {
    outline: none;
  }
  @media screen and (max-width: 1199px) {
    border-radius: 2%;
  }
  @media only screen and (max-width: 839px) {
    padding: 5%;
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    padding: 2% 0;
  }
  .slick-list {
    //얘로 크기조정
    max-width: 100%;
    max-height: 100%;
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: auto;
  }
  img {
    height: 100%;
    width: 100%;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    @media only screen and (max-width: 839px) {
      width: 55%;
      height: 55%;
    }
    // XSmall (Mobile)
    @media screen and (max-width: 599px) {
      width: 60%;
      height: 60%;
    }
  }
  .reset {
    transform: none;
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }
  .PrevArrow {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
  }
  .NextArrow {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
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
    color: white;
    cursor: pointer;
  }

  .reset li.slick-active button:before {
    color: rgba(99, 113, 247, 1);
  }
`;

const Web = styled.div`
  @media only screen and (max-width: 839px) {
    display: none;
  }
`;
const Mobile = styled.div`
  display: none;
  @media only screen and (max-width: 839px) {
    display: unset;
    width: 100%;
    height: 100%;
  }
`;

const Container = styled.div``;
const TextBox = styled.div`
  margin: 24px 40px;
  @media only screen and (max-width: 839px) {
    margin: 12px 24px;
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    margin: 8px 12px;
  }
`;

const Title = styled.div`
  margin: 16px 0;
  @media only screen and (max-width: 839px) {
    margin: 8px 0;
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    margin: 4px 0;
  }
`;
const SubTitle = styled.div``;

export default ManualSlider;
