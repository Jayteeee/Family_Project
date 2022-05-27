import React from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import { RiCloseFill } from "react-icons/ri";

// 모달
import { ModalPortal } from "../portals";

// 엘리먼트
import { RactangleImage, Text } from "../../../elements";

// 이미지
import eventImg from "../../images/eventImg.svg";

const EventModal = (props) => {
  const { onClose, content } = props;

  return (
    <ModalPortal>
      <Background
        className="flex-row"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        <Content
          // 부모 태그에 onClose() 가 걸려있어서 모달 내부를 클릭했을때 창이 닫히지 않기위해 선언합니다
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          <a href="https://forms.gle/cKtMucXktf7et7hs9" target="_blank">
            <ImgBox>
              <EventImg src={eventImg} />
            </ImgBox>{" "}
          </a>
          <CloseBox
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            <RiCloseFill />
          </CloseBox>
        </Content>
      </Background>
    </ModalPortal>
  );
};

const Background = styled.div`
  z-index: 206;
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 205;
  min-height: 600px;
  max-width: 600px;
  width: 100%;
  border-radius: 20px;
  background-color: transparent;
  position: relative;

  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    min-height: 400px;
    max-width: 400px;
  }

  // XXSmall (Mobile)
  @media screen and (max-width: 414px) {
    min-height: 300px;
    max-width: 300px;
  }
`;

const ImgBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 300px;
  height: 300px;

  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    width: 200px;
    height: 200px;
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 414px) {
    width: 150px;
    height: 150px;
  }
`;

const EventImg = styled.div`
  width: 100%;
  padding: 100%;
  border-radius: 12px;
  ${({ src }) => `background-image: url(${src});`};
  background-position: center;
  background-size: cover;
`;

const CloseBox = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  svg {
    font-size: 20px;
    color: #fff;
  }
  top: 0;
  right: 0;
  margin: 16px;
  border-radius: 4px;
  :hover {
    background-color: #fff;
    svg {
      font-size: 20px;
      color: gray;
    }
  }
`;

export default EventModal;
